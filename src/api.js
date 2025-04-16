import axios from 'axios';

const API_URL = 'http://192.168.1.162:7000/api'; // Usamos variable de entorno



// Función para realizar login
export const login = async () => {
  try {
    const response = await axios.post(
      `${API_URL}/login`,
      {
        UserName: 'ADMINTOOL4',
        Password: '1234',
        CompanyDB: 'SBO_MUNDO_TOOL'
      },
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('Error al realizar login');
  }
};

// Función para obtener el precio de un artículo
export const getItemPrice = async (itemCode) => {
  try {
    const response = await axios.get(
      `${API_URL}/precio/${itemCode}`,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('Error al obtener el precio');
  }
};