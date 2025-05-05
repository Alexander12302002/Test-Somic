<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import PopupNuevoUser from '../components/UserPopUp.vue'

const popupKey = ref(0)
const showPopup = ref(false)
const Users = ref([]);
const searchId = ref('');
const apiUrl = 'http://localhost:3000/users/';

const fetchAllUsers = async () => {
  try {
    const response = await axios.get(apiUrl);
    Users.value = response.data.users;
  } catch (error) {
    console.error('Error al cargar artículos:', error);
  }
};

const searchUsersById = async () => {
  if (!searchId.value) return;
  try {
    const response = await axios.get(`${apiUrl}${searchId.value}`);
    Users.value = [response.data.user]
  } catch (error) {
    console.error('Artículo no encontrado:', error);
    Users.value = [];
  }
};

const abrirPopup = () => {
  popupKey.value++ 
  showPopup.value = true
}
onMounted(fetchAllUsers);
</script>

<template>
    <div class="screen">
      <header>
      <h1>Usuarios</h1>
      <div class="finder">
        <input
          v-model="searchId"
          type="text"
          placeholder="Buscar por CC..."
        />
        <button @click="searchUsersById">Buscar</button>
        <button @click="fetchAllUsers">Ver Todos</button>
      </div>
      <button class="add-button" @click="abrirPopup">Agregar Nuevo Usuario</button>
    </header>

      <table v-if="Users.length > 0">
        <thead>
            <tr>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Contacto</th>
                <th>Nit</th>
                <th>Documento</th>
                <th>Cupo</th>
                <th>Plazo</th>
          </tr>
        </thead>
        <tbody>
        <tr v-for="user in Users" :key="user.User_CC">
          <td>{{ user.User_Name }}</td>
          <td>{{ user.User_LastName }}</td>
          <td>{{ user.User_email }}</td>
          <td>{{ user.User_Nit }}</td>
          <td>{{ user.User_CC }}</td>
          <td>{{ user.User_quota }}</td>
          <td>{{ user.User_term }}</td>
        </tr>
      </tbody>
      </table>
      <p v-else>No se encontraron artículos.</p>
      <PopupNuevoUser
      v-if="showPopup"
      :key="popupKey"
      @onClose="showPopup = false"
      @onSuccess="() => { fetchAllUsers(); showPopup = false }"
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