<script setup>
import { ref } from 'vue'
import axios from 'axios'

const show = ref(true) 
const error = ref(null)

const User = ref({
    User_Name: '',
    User_LastName: '',
    User_email: '',
    User_Nit: '',
    User_CC: '',
    User_quota: 0,
    User_term: 0,
})

const handleSubmit = async (e) => {
  e.preventDefault()
  try {
    await axios.post('http://localhost:3000/Users/', User.value)
    alert('Usuario creado exitosamente')
    show.value = false
  } catch (err) {
    error.value = 'Error al crear usuario'
    console.error(err)
  }
}

const closePopup = () => {
  show.value = false
}
</script>

<template>
  <div v-if="show" class="popup-overlay">
    <div class="popup-content">
      <h2>Agregar Nuevo Usuario</h2>
      <form @submit="handleSubmit">
        <label>
          Nombre:
          <input type="text" v-model="User.User_Name" required />
        </label>
        <label>
          Apellido:
          <input type="text" v-model="User.User_LastName" required />
        </label>
        <label>
          Email:
          <input type="email" v-model="User.User_email" required />
        </label>
        <label>
          Nit:
          <input type="text" v-model="User.User_Nit" required />
        </label>
        <label>
          CC:
          <input type="text" v-model="User.User_CC" required />
        </label>
        <label>
          Cupo:
          <input type="number" v-model="User.User_quota" required />
        </label>
        <label>
          Plazo:
          <input type="number" v-model="User.User_term" required />
        </label>

        <p v-if="error" class="error">{{ error }}</p>

        <button class="buttonPopUpUser" type="submit">Guardar</button>
        <button class="buttonPopUpUser" type="button" @click="closePopup">Cancelar</button>
      </form>
    </div>
  </div>
</template>

<style scoped>
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.popup-content {
  background-color: white;
  padding: 30px;
  border-radius: 10px;
  width: 400px;
}

.popup-content label {
  display: block;
  margin-bottom: 10px;
}

.popup-content input {
  width: 100%;
  padding: 6px;
  margin-top: 4px;
}

.buttonPopUpUser {
  margin-right: 10px;
  background-color: #4caf50;
  color: white;
  padding: 10px 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

.error {
  color: red;
  margin-top: 10px;
}
</style>
