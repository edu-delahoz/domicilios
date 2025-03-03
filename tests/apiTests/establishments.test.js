const axios = require("axios");

const API_URL = "http://localhost:4000/api/establishments";

const establishments = Array.from({ length: 20 }, (_, i) => ({
  name: `Tienda ${i + 1}`,
  description: "Descripción de prueba",
  address: `Calle ${i + 1} #45-67`,
  phone: `30012345${i}`,
  email: `tienda${i + 1}@prueba.com`,
  category: "Supermercado",
  website: `http://tienda${i + 1}.com`,
  latitude: 4.60971 + Math.random() * 0.01,
  longitude: -74.08175 + Math.random() * 0.01,
  imageUrl: "http://imagen.com/logo.png"
}));

(async () => {
  try {
    console.log("📌 Creando 20 establecimientos...");
    const createdEstablishments = await Promise.all(
      establishments.map(data => axios.post(API_URL, data))
    );
    
    console.log("Establecimientos creados con éxito.");

    console.log("Obteniendo todos los establecimientos...");
    const allEstablishments = await axios.get(API_URL);
    console.log(`Se obtuvieron ${allEstablishments.data.length} establecimientos.`);

    const firstId = createdEstablishments[0].data.id;
    console.log("Obteniendo un establecimiento por ID...");
    const singleEstablishment = await axios.get(`${API_URL}/${firstId}`);
    console.log("Establecimiento obtenido:", singleEstablishment.data);

    console.log("Actualizando un establecimiento...");
    await axios.put(`${API_URL}/${firstId}`, { name: "Tienda Actualizada" });
    console.log("Establecimiento actualizado.");

    console.log("Eliminando un establecimiento...");
    await axios.delete(`${API_URL}/${firstId}`);
    console.log("Establecimiento eliminado.");
  } catch (error) {
    console.error("Error en la prueba:", error.response?.data || error.message);
  }
})();
