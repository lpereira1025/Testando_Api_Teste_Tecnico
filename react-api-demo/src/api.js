import axios from "axios";

const baseURL = "http://127.0.0.1:8000";

export const getClientes = async () => {
  const response = await axios.get(`${baseURL}/clientes/`);
  return response.data;
};

export const addCliente = async (clienteData) => {
    console.log(clienteData); // Adicione esta linha para verificar o conteúdo dos dados antes do POST
    try {
        const response = await axios.post(`${baseURL}/clientes/`, clienteData);
        return response.data; // Retorna o cliente criado com o ID atribuído pelo servidor
    } catch (error) {
        throw error;
    }
};


export const updateCliente = async (id, cliente) => {
  const response = await axios.put(`${baseURL}/clientes/${id}/`, cliente);
  return response.data;
};

export const deleteCliente = async (id) => {
  const response = await axios.delete(`${baseURL}/clientes/${id}/`);
  return response.data;
};
