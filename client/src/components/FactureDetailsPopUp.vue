<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const props = defineProps(['factura'])
const emit = defineEmits(['onClose'])

const cliente = ref(null)
const productos = ref([])
const totalVentas = ref(0)
const totalCostos = ref(0)
const fechaVencimiento = ref(null)

const fetchCliente = async () => {
  try {
    const response = await axios.get(`http://localhost:3000/users/id/${props.factura.Fac_idUser}`)
    cliente.value = response.data.user
  } catch (error) {
    console.error('Error al obtener cliente:', error)
  }
}

const fetchProductos = async () => {
  const productosEnFactura = props.factura.Fac_Articles
  const productosConNombre = await Promise.all(
    productosEnFactura.map(async (item) => {
      try {
        const res = await axios.get(`http://localhost:3000/articles/${item.Fac_idArticle}`)
        const producto = res.data.Article

        let totalProducto = item.Fac_Amount * item.Fac_Unit_Price
        let totalCosto = item.Fac_Amount * item.Fac_cost

        if (item.Fac_Amount < 0) {
          totalProducto = Math.abs(totalProducto)
          totalCosto = Math.abs(totalCosto)
        }

        totalVentas.value += totalProducto
        totalCostos.value += totalCosto

        return {
          nombre: producto.Art_Name,
          cantidad: item.Fac_Amount,
          precio: item.Fac_Unit_Price,
          costo: item.Fac_cost,
          totalProducto,
          totalCosto
        }
      } catch (error) {
        return {
          nombre: 'No disponible',
          cantidad: item.Fac_Amount,
          precio: item.Fac_Unit_Price,
          costo: item.Fac_cost,
          totalProducto: item.Fac_Amount * item.Fac_Unit_Price,
          totalCosto: item.Fac_Amount * item.Fac_cost
        }
      }
    })
  )
  productos.value = productosConNombre
}

onMounted(async () => {
  await fetchCliente()
  await fetchProductos()

  if (cliente.value?.User_term != null) {
    const fechaFactura = new Date(props.factura.Fac_Date)
    fechaFactura.setDate(fechaFactura.getDate() + cliente.value.User_term)
    fechaVencimiento.value = fechaFactura.toLocaleDateString()
  }
})
</script>

<template>
  <div class="popup-overlay">
    <div class="popup-content">
      <h2>Detalles de la Factura</h2>
      <p><strong>Fecha:</strong> {{ new Date(factura.Fac_Date).toLocaleDateString() }}</p>
      <p><strong>Fecha de Vencimiento:</strong> {{ fechaVencimiento || 'Calculando...' }}</p>
      <p>
        <strong>Cliente:</strong>
        {{ cliente ? `${cliente.User_Name} ${cliente.User_LastName}` : 'Cargando...' }}
      </p>
      <p><strong>NIT:</strong> {{ cliente?.User_Nit || 'No disponible' }}</p>

      <div class="line"></div>

      <div class="productos-list">
        <div class="producto-header">
          <p><strong>PROD.</strong></p>
          <p><strong>CANT.</strong></p>
          <p><strong>P.UNITARIO</strong></p>
          <p><strong>COSTO</strong></p>
          <p><strong>TOTAL</strong></p>
        </div>
        <div
          class="producto-item"
          v-for="(producto, index) in productos"
          :key="index"
        >
          <p>{{ producto.nombre }}</p>
          <p>{{ producto.cantidad }}</p>
          <p>{{ producto.precio }}</p>
          <p>{{ producto.costo }}</p>
          <p>{{ producto.totalProducto }}</p>
        </div>
      </div>

      <div class="line"></div>
      <p class="total"><strong>Total Ventas:</strong> {{ totalVentas }}</p>
      <p class="total"><strong>Total Costos:</strong> {{ totalCostos }}</p>
      <button class="facturaDetailButton" @click="$emit('onClose')">Cerrar</button>
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
  background: white;
  padding: 20px;
  width: 800px; 
  max-height: 90vh;
  overflow-y: auto;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}

.line {
  border-top: 1px solid #ccc;
  margin: 10px 0;
}

.productos-list {
  margin-top: 10px;
  max-height: 60vh; 
  overflow-y: auto; 
}

.producto-header,
.producto-item {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 1fr; 
  gap: 10px;
  margin-bottom: 5px;
}

.producto-item p {
  margin: 0; 
  padding: 5px;
}

.total {
  font-weight: bold;
  margin-top: 15px;
}

.facturaDetailButton {
  margin-top: 20px;
  background-color: #4caf50;
  border: none;
  padding: 10px;
  color: white;
  cursor: pointer;
  border-radius: 4px;
  width: 100%;
  text-align: center;
}
</style>

