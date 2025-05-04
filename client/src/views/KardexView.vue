<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const Kardexs = ref([]);
const searchId = ref('');
const apiUrl = 'http://localhost:3000/kardex/';

const fetchAllKardex = async () => {
  try {
    const response = await axios.get(apiUrl);
    Kardexs.value = response.data.Kardex;
  } catch (error) {
    console.error('Error al cargar Kardex:', error);
  }
};

const searchArticleById = async () => {
  if (!searchId.value) return;
  try {
    const response = await axios.get(`${apiUrl}${searchId.value}`);
    Kardexs.value = response.data.Kardex; 
  } catch (error) {
    console.error('Kardex no encontrado:', error);
    Kardexs.value = [];
  }
};

onMounted(fetchAllKardex);
</script>

<template>
  <div class="screen">
    <header>
      <h1>Facturas Kardex</h1>
      <div class="finder">
        <input
          v-model="searchId"
          type="text"
          placeholder="Buscar por nombre..."
        />
        <button @click="searchArticleById">Buscar</button>
        <button @click="fetchAllKardex">Ver Todo</button>
      </div>
    </header>

    <table>
      <thead>
        <tr>
          <th>Codigo</th>
          <th>Fecha ingreso</th>
          <th>Nombre</th>
          <th>Tipo</th>
          <th>Cantidad</th>
          <th>Saldo</th>
          <th>Costo</th>
          <th>Precio de Venta</th>
          <th>Total Venta</th>
          <th>Total Compra</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="k in Kardexs" :key="k._id">
          <td>{{ k._id }}</td>
          <td>{{ new Date(k.Kar_Date_Admission).toLocaleDateString() }}</td>
          <td>{{ k.Kar_Name_Article }}</td>
          <td>{{ k.Kar_kind }}</td>
          <td>{{ k.Kar_Amount }}</td>
          <td>{{ k.Kar_stock }}</td>
          <td>{{ k.Kar_cost }}</td>
          <td>{{ k.Kar_Unit_Price }}</td>
          <td>{{ k.Kar_Total_Product }}</td>
          <td>{{ k.Kar_Total_cost }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.screen {
  padding: 20px;
  font-family: Arial, sans-serif;
}
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
}
.finder {
  display: flex;
  gap: 10px;
}
input {
  padding: 5px;
  border-radius: 4px;
}
button {
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 10px 14px;
  border-radius: 4px;
  cursor: pointer;
}
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}
th, td {
  padding: 8px;
  border: 1px solid #ccc;
  text-align: center;
}
thead {
  background-color: #f0f0f0;
}
</style>
