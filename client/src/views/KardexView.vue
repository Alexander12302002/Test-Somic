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

onMounted(fetchAllKardex);
</script>

<template>
    <div class="screen">
        <header>
        <h1>Facturas Kardex</h1>
        <div className="finder">
          <input
            type="text"
            placeholder="Buscar Facturas Kardex..."
          />
          <button onClick="">Buscar</button>
        </div>
        <button className="add-button" onClick="">Agregar Nueva Factura Kardex</button>
      </header>

      <table>
        <thead>
            <tr>
                <th>Fecha Ingreso</th>
                <th>Nombre</th>
                <th>Laboratorio</th>
                <th>Saldo</th>
                <th>Costo</th>
                <th>Precio de Venta</th>
          </tr>
        </thead>
      </table>
    </div>
</template>

<style scoped>

</style>