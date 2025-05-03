<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import PopupNuevoArticulo from '../components/ArticlePopUp.vue'

const popupKey = ref(0)
const showPopup = ref(false)
const Articles = ref([]);
const searchId = ref('');
const apiUrl = 'http://localhost:3000/articles/';

const fetchAllArticles = async () => {
  try {
    const response = await axios.get(apiUrl);
    Articles.value = response.data.articles;
  } catch (error) {
    console.error('Error al cargar artículos:', error);
  }
};

const searchArticleById = async () => {
  if (!searchId.value) return;
  try {
    const response = await axios.get(`${apiUrl}${searchId.value}`);
    Articles.value = [response.data.Article];
  } catch (error) {
    console.error('Artículo no encontrado:', error);
    Articles.value = [];
  }
};


const abrirPopup = () => {
  popupKey.value++ 
  showPopup.value = true
}
onMounted(fetchAllArticles);
</script>

<template>
  <div class="screen">
    <header>
      <h1>Artículos</h1>
      <div class="finder">
        <input
          v-model="searchId"
          type="text"
          placeholder="Buscar por código..."
        />
        <button @click="searchArticleById">Buscar</button>
        <button @click="fetchAllArticles">Ver Todos</button>
      </div>
      <button class="add-button" @click="abrirPopup">Agregar Nuevo Artículo</button>
    </header>

    <table v-if="Articles.length > 0">
      <thead>
        <tr>
          <th>Código</th>
          <th>Nombre</th>
          <th>Laboratorio</th>
          <th>Saldo</th>
          <th>Costo</th>
          <th>Precio Venta</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="article in Articles" :key="article._id">
          <td>{{ article._id }}</td>
          <td>{{ article.Art_Name }}</td>
          <td>{{ article.Art_laboratory }}</td>
          <td>{{ article.Art_balance }}</td>
          <td>{{ article.Art_cost }}</td>
          <td>{{ article.Art_sale_price }}</td>
        </tr>
      </tbody>
    </table>
    <p v-else>No se encontraron artículos.</p>
    <PopupNuevoArticulo
      v-if="showPopup"
      :key="popupKey"
      @onClose="showPopup = false"
      @onSuccess="() => { fetchAllArticles(); showPopup = false }"
    />
  </div>
</template>

<style scoped>
.screen {
  padding: 20px;
}

header {
  display: flex;
  gap: 15px;
  flex-direction: row;
  justify-content: space-between;
}

.finder {
  display: flex;
  gap: 10px;
}

.finder input{
  padding: 10px;
  border-radius: 4px;
}

.finder button{
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 10px 14px;
  border-radius: 4px;
  cursor: pointer;
}

.add-button {
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

thead {
  background-color: #f4f4f4;
}

th, td {
  padding: 10px;
  border: 1px solid #ddd;
}
</style>
