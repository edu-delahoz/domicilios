const axios = require("axios");

const API_URL = "http://localhost:4000/api/establishments";

const establishments = Array.from({ length: 20 }).map((_, i) => ({
  name: `Tienda ${i + 1}`,
  description: `Descripción de Tienda ${i + 1}`,
  address: `Calle ${i + 1} #${i + 10}`,
  phone: `300123456${i}`,
  email: `tienda${i + 1}@correo.com`,
  category: "General",
  website: `https://tienda${i + 1}.com`,
  latitude: (Math.random() * (11 - 10) + 10).toFixed(8),
  longitude: (Math.random() * (-74 + 75) - 75).toFixed(8),
  imageUrl: `https://picsum.photos/200?random=${i + 1}`,
}));

const addEstablishments = async () => {
  try {
    const responses = await Promise.all(
      establishments.map((store) => axios.post(API_URL, store))
    );
    console.log("20 establecimientos añadidos correctamente");
    console.log(responses.map((res) => res.data));
  } catch (error) {
    console.error("Error al añadir establecimientos:", error.response?.data || error.message);
  }
};

addEstablishments();
