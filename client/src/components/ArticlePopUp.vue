<script setup>
import { ref } from 'vue'
import axios from 'axios'

const show = ref(true) // controla visibilidad
const error = ref(null)

const article = ref({
  Art_Date_Admission: '',
  Art_Name: '',
  Art_laboratory: '',
  Art_balance: 0,
  Art_cost: 0,
  Art_sale_price: 0,
})

const handleSubmit = async (e) => {
  e.preventDefault()
  try {
    await axios.post('http://localhost:3000/articles/', article.value)
    alert('Artículo creado exitosamente')
    show.value = false
  } catch (err) {
    error.value = 'Error al crear artículo'
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
      <h2>Agregar Nuevo Artículo</h2>
      <form @submit="handleSubmit">
        <label>
          Fecha:
          <input type="date" v-model="article.Art_Date_Admission" required />
        </label>
        <label>
          Nombre:
          <input type="text" v-model="article.Art_Name" required />
        </label>
        <label>
          Laboratorio:
          <input type="text" v-model="article.Art_laboratory" required />
        </label>
        <label>
          Saldo:
          <input type="number" v-model="article.Art_balance" required />
        </label>
        <label>
          Costo:
          <input type="number" v-model="article.Art_cost" required />
        </label>
        <label>
          Precio de venta:
          <input type="number" v-model="article.Art_sale_price" required />
        </label>

        <p v-if="error" class="error">{{ error }}</p>

        <button class="buttonPopUpArticle" type="submit">Guardar</button>
        <button class="buttonPopUpArticle" type="button" @click="closePopup">Cancelar</button>
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

.buttonPopUpArticle {
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
