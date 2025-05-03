<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import PopupNuevoFactura from '../components/FacturePopUp.vue'
import FacturaDetalle from '../components/FactureDetailsPopUp.vue'

const popupKey = ref(0)
const showPopup = ref(false)
const facturaDetalle = ref(null)
const showDetallePopup = ref(false)
const Factures = ref([]);
const searchId = ref('');
const apiUrl = 'http://localhost:3000/factures/';

const fetchAllFactures = async () => {
  try {
    const response = await axios.get(apiUrl);
    Factures.value = response.data.Factures;
  } catch (error) {
    console.error('Error al cargar artículos:', error);
  }
};

const searchFacturesById = async () => {
  if (!searchId.value) return;
  try {
    const response = await axios.get(`${apiUrl}${searchId.value}`);
    Factures.value = [response.data.Facture]; 
  } catch (error) {
    console.error('Artículo no encontrado:', error);
    Factures.value = [];
  }
}

const abrirDetalleFactura = async (id) => {
  try {
    const response = await axios.get(`http://localhost:3000/factures/${id}`)
    facturaDetalle.value = response.data.Facture 
    showDetallePopup.value = true
  } catch (error) {
    console.error('Error al obtener detalles de la factura:', error)
  }
}

const borrarFactura = async (id) => {
  try {
    await axios.delete(`http://localhost:3000/factures/${id}`)
    await fetchAllFactures()
  } catch (error) {
    console.error('Error al borrar detalles de la factura:', error)
  }
}

const cerrarDetallePopup = () => {
  showDetallePopup.value = false
  facturaDetalle.value = null
}

const abrirPopup = () => {
  popupKey.value++ 
  showPopup.value = true
}
onMounted(fetchAllFactures);
</script>

<template>
    <div class="screen">
        <header>
          <h1>Facturas</h1>
      <div class="finder">
        <input
          v-model="searchId"
          type="text"
          placeholder="Buscar por código..."
        />
        <button @click="searchFacturesById">Buscar</button>
        <button @click="fetchAllFactures">Ver Todos</button>
      </div>
      <button class="add-button" @click="abrirPopup">Agregar Nueva Factura</button>
    </header>

      <table v-if="Factures.length > 0">
        <thead>
            <tr>
                <th>Numero Factura</th>
                <th>Fecha</th>
                <th>Detalles</th>
          </tr>
        </thead>
        <tbody>
        <tr v-for="facture in Factures" :key="facture._id">
          <td>{{ facture._id }}</td>
          <td>{{ facture.Fac_Date }}</td>
          <td>
            <button class="button-details" @click="abrirDetalleFactura(facture._id)">Ver Detalles</button>
            <button class="button-delete" @click="borrarFactura(facture._id)">Borrar Factura</button>
          </td>
        </tr>
      </tbody>
      </table>
      <p v-else>No se encontraron artículos.</p>
      <PopupNuevoFactura
      v-if="showPopup"
      :key="popupKey"
      @onClose="showPopup = false"
      @onSuccess="() => { fetchAllFactures(); showPopup = false }"
    />
    <FacturaDetalle
      v-if="showDetallePopup"
      :factura="facturaDetalle"
      @onClose="cerrarDetallePopup"
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

.button-details{
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 10px 14px;
  border-radius: 4px;
  cursor: pointer;
}

.button-delete{
  background-color: #d43e3e;
  color: white;
  border: none;
  margin-left: 10px;
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