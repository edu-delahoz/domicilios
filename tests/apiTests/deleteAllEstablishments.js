const axios = require("axios");

const API_URL = "http://localhost:4000/api/establishments";

const deleteAllEstablishments = async () => {
  try {
    const { data: establishments } = await axios.get(API_URL); // Obtener todos los establecimientos
    if (establishments.length === 0) {
      console.log("✅ No hay establecimientos para eliminar");
      return;
    }

    await Promise.all(
      establishments.map((store) =>
        axios.delete(`${API_URL}/${store.id}`)
      )
    );

    console.log("✅ Todos los establecimientos han sido eliminados");
  } catch (error) {
    console.error("❌ Error al eliminar establecimientos:", error.response?.data || error.message);
  }
};

deleteAllEstablishments();
