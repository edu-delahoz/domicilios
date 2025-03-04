const request = require("supertest");
const sequelize  = require("../../src/config/database");
const User = require("../../src/domain/models/User");
const app = require("../../src/index"); // Ajusta la ruta según tu estructura

describe("Authentication Endpoints", () => {
  let accessToken;
  let refreshToken;
  const testUser = {
    username: `testuser_${Date.now()}`,
    email: `testuser_${Date.now()}@example.com`,
    password: "TestPass123",
  };

  beforeAll(async () => {
    // Limpiar la tabla de usuarios antes de ejecutar las pruebas
    await User.destroy({ where: {} });
  });

  afterAll(async () => {
    // Cerrar la conexión a la base de datos para que Jest termine
    await sequelize.close();
  });

  it("should register a new user", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send(testUser);
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("user");
  });

  it("should login and return access and refresh tokens", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({
        email: testUser.email,
        password: testUser.password,
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("accessToken");
    expect(res.body).toHaveProperty("refreshToken");

    accessToken = res.body.accessToken;
    refreshToken = res.body.refreshToken;
  });

  it("should get authenticated user data", async () => {
    const res = await request(app)
      .get("/api/auth/me")
      .set("Authorization", `Bearer ${accessToken}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("id");
    expect(res.body).toHaveProperty("email", testUser.email);
  });

  it("should refresh the access token", async () => {
    const res = await request(app)
      .post("/api/auth/refresh-token")
      .send({ refreshToken });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("accessToken");
    accessToken = res.body.accessToken; // Actualizamos el access token para futuros tests
  });

  it("should logout and revoke the refresh token", async () => {
    const res = await request(app)
      .post("/api/auth/logout")
      .set("Authorization", `Bearer ${accessToken}`)  // Agregamos el header de autorización
      .send({ refreshToken });
    expect(res.statusCode).toEqual(200);
  });

  it("should fail to refresh token after logout", async () => {
    const res = await request(app)
      .post("/api/auth/refresh-token")
      .send({ refreshToken });
    expect(res.statusCode).toEqual(401);
  });
});
