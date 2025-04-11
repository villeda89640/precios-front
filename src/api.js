import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; // URL de tu servidor backend

// Función para realizar login, pasando las credenciales necesarias
export const login = async () => {
  try {
    const response = await axios.post(
      `${API_URL}/login`, 
      {
        UserName: 'ADMINTOOL4',
        Password: '1234',
        CompanyDB: 'TEST_MUNDO_TOOL'
      },
      { withCredentials: true }  // Permite el envío y recepción de cookies
    );
    return response.data;
  } catch (error) {
    throw new Error('Error al realizar login');
  }
};

// Función para obtener el precio de un artículo
export const getItemPrice = async (itemCode) => {
  try {
    const response = await axios.get(
      `${API_URL}/precio/${itemCode}`,
      { withCredentials: true }  // Permite el envío y recepción de cookies
    );
    return response.data;
  } catch (error) {
    throw new Error('Error al obtener el precio');
  }
};