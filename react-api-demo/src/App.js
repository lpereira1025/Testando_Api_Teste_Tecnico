import React, { useState, useEffect } from "react";
import { getClientes, addCliente, updateCliente, deleteCliente } from "./api";
import { v4 as uuidv4 } from 'uuid';
import "./App.css";

function App() {
  const [clientes, setClientes] = useState([]);
  const [formData, setFormData] = useState({
    id: "",
    nome: "",
    cnpj: "",
    logradouro: "",
    bairro: "",
    cidade: "",
    estado: "",
    pais: "",
    status: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSalvarCliente = async (e) => {
    e.preventDefault();
    try {
      if (formData.id) {
        await updateCliente(formData.id, formData);
      } else {
        await handleNovoCliente();
      }
      resetForm();
    } catch (error) {
      console.error("Erro ao salvar cliente:", error);
    }
  };

  const handleNovoCliente = async () => {
    const novoCliente = {
      ...formData,
      id: parseInt(uuidv4()),
      cnpj: formData.cnpj.toUpperCase(), // Convertendo para letras maiúsculas
      logradouro: formData.logradouro.toUpperCase(), // Convertendo para letras maiúsculas
      bairro: formData.bairro.toUpperCase(), // Convertendo para letras maiúsculas
    };
    await addCliente(novoCliente);
    setClientes([...clientes, novoCliente]);
  };
  

  const handleEditCliente = (cliente) => {
    setFormData({ ...cliente });
  };

  const handleDeleteCliente = async (id) => {
    try {
      await deleteCliente(id);
      fetchClientes();
    } catch (error) {
      console.error(error);
    }
  };

  const fetchClientes = async () => {
    try {
      const response = await getClientes();
      setClientes(response);
    } catch (error) {
      console.error("Erro ao obter lista de clientes:", error);
    }
  };

  const resetForm = () => {
    setFormData({
      id: "",
      nome: "",
      cnpj: "",
      logradouro: "",
      bairro: "",
      cidade: "",
      estado: "",
      pais: "",
      status: "",
    });
  };

  useEffect(() => {
    fetchClientes();
  }, []);

  return (
    <div className="App">
      <h1>Clientes</h1>
      <form onSubmit={handleSalvarCliente}>
        <input
          type="text"
          name="id"
          placeholder="ID (Preenchido automaticamente)"
          disabled
          value={formData.id}
          onChange={handleChange}
        />
        <input
          type="text"
          name="nome"
          placeholder="Nome"
          value={formData.nome}
          onChange={handleChange}
        />
        <input
          type="text"
          name="cnpj"
          placeholder="CNPJ"
          value={formData.cnpj}
          onChange={handleChange}
        />
        <input
          type="text"
          name="logradouro"
          placeholder="Logradouro"
          value={formData.logradouro}
          onChange={handleChange}
        />
        <input
          type="text"
          name="bairro"
          placeholder="Bairro"
          value={formData.bairro}
          onChange={handleChange}
        />
        <input
          type="text"
          name="cidade"
          placeholder="Cidade"
          value={formData.cidade}
          onChange={handleChange}
        />
        <input
          type="text"
          name="estado"
          placeholder="Estado"
          value={formData.estado}
          onChange={handleChange}
        />
        <input
          type="text"
          name="pais"
          placeholder="País"
          value={formData.pais}
          onChange={handleChange}
        />
        <input
          type="text"
          name="status"
          placeholder="Status"
          value={formData.status}
          onChange={handleChange}
        />
        {formData.id ? (
          <button type="submit" className="edit" >Salvar Edição</button>
        ) : (
          <button type="submit">Salvar Novo Cliente</button>
        )}
      </form>

      <h2>Lista de Clientes</h2>
      <ul>
        {clientes.map((cliente) => (
          <li key={cliente.id}>
            <span>{cliente.nome}</span>
            <button onClick={() => handleEditCliente(cliente)} className="edit">Editar</button>
            <button onClick={() => handleDeleteCliente(cliente.id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
