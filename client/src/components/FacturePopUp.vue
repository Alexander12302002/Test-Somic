<script setup>
import { ref, reactive, onMounted, watch } from 'vue'
import axios from 'axios'

const emitFn = defineEmits(['onClose', 'onSuccess'])

const clientes = ref([])
const productos = ref([])
const userWallet = ref(0)
const montoDisponible = ref(0)
const tipoOperacion = ref('entrada')
const error = ref('')

// Formulario principal
const formData = reactive({
  Fac_Date: '',
  Fac_idUser: '',
  Fac_Articles: [],
  Fac_Total: 0,
  Fac_Total_cost: 0
})

// Producto actual a agregar
const currentProduct = reactive({
  Fac_idArticle: '',
  Fac_Amount: 1,
  Fac_Unit_Price: null,
  Fac_cost: null,
  Fac_Total_Product: 0,
  Fac_Total_cost: 0
})

const fetchClientes = async () => {
  const res = await axios.get('http://localhost:3000/users')
  clientes.value = res.data.users
}

const fetchProductos = async () => {
  const res = await axios.get('http://localhost:3000/articles')
  productos.value = res.data.articles
}

const fetchUserWallet = async (id) => {
  try {
    const res = await axios.get(`http://localhost:3000/users/wallet/${id}`)
    userWallet.value = res.data.userWallet[0]?.totalUsuario || 0

    const usuario = clientes.value.find(c => c._id === id)
    if (usuario) {
      const disponible = usuario.User_quota - userWallet.value
      montoDisponible.value = disponible < 0 ? 0 : disponible
    }
  } catch (err) {
    console.error('Error obteniendo cartera del usuario:', err)
    userWallet.value = 0
    montoDisponible.value = 0
  }
}

// Este se ejecuta al seleccionar un nuevo producto
const handleInitialChange = () => {
  const producto = productos.value.find(p => p._id === currentProduct.Fac_idArticle)
  if (!producto) return

  // Solo establecer si no han sido modificados manualmente
  if (currentProduct.Fac_cost === null) {
    currentProduct.Fac_cost = Number(producto.Art_cost) || 0
  }
  if (currentProduct.Fac_Unit_Price === null) {
    currentProduct.Fac_Unit_Price = Number(producto.Art_sale_price) || 0
  }

  handleChange()
}

const handleChange = () => {
  const cantidad = Math.abs(currentProduct.Fac_Amount) || 0

  currentProduct.Fac_Total_Product = cantidad * (currentProduct.Fac_Unit_Price || 0)
  currentProduct.Fac_Total_cost = cantidad * (currentProduct.Fac_cost || 0)
}

const calcularTotalFactura = () => {
  return formData.Fac_Articles.reduce((acc, prod) => acc + (prod.Fac_Total_Product || 0), 0)
}

const calcularTotalCosto = () => {
  return formData.Fac_Articles.reduce((acc, prod) => acc + (prod.Fac_Total_cost || 0), 0)
}

const removeProduct = (index) => {
  formData.Fac_Articles.splice(index, 1)
}

watch(() => currentProduct.Fac_idArticle, handleInitialChange)
watch(() => currentProduct.Fac_Amount, handleChange)
watch(() => currentProduct.Fac_cost, handleChange)
watch(() => currentProduct.Fac_Unit_Price, handleChange)
watch(() => formData.Fac_idUser, (newVal) => {
  if (newVal) fetchUserWallet(newVal)
})

const addProduct = () => {
  const producto = productos.value.find(p => p._id === currentProduct.Fac_idArticle)
  if (!producto) {
    error.value = 'Producto no válido'
    return
  }

  const cantidad = Math.abs(currentProduct.Fac_Amount)
  if (cantidad <= 0) {
    error.value = 'Debe ingresar una cantidad válida'
    return
  }

  if (tipoOperacion.value === 'salida') {
    if (cantidad > producto.Art_balance) {
      error.value = 'La cantidad solicitada supera el saldo del producto'
      return
    }
    if (currentProduct.Fac_Unit_Price < currentProduct.Fac_cost) {
      error.value = 'El precio de venta no puede ser menor al costo del producto'
      return
    }
  }

  const nuevoTotal = calcularTotalFactura() + currentProduct.Fac_Total_Product

  if (nuevoTotal > montoDisponible.value) {
    error.value = 'El monto total de la factura supera el monto disponible del cliente'
    return
  }

  error.value = ''
  formData.Fac_Articles.push({
    ...currentProduct,
    Fac_Amount: cantidad,
    Fac_Operation: tipoOperacion.value
  })

  // Limpiar campos del producto actual
  currentProduct.Fac_idArticle = ''
  currentProduct.Fac_Amount = 1
  currentProduct.Fac_Unit_Price = null
  currentProduct.Fac_cost = null
  currentProduct.Fac_Total_Product = 0
  currentProduct.Fac_Total_cost = 0
}

const handleSubmit = async () => {
  formData.Fac_Total = calcularTotalFactura()
  formData.Fac_Total_cost = calcularTotalCosto()

  if (formData.Fac_Total > montoDisponible.value) {
    error.value = 'El monto total de la factura supera el monto disponible del cliente'
    return
  }

  try {
    await axios.post('http://localhost:3000/factures', formData)
    emitFn('onSuccess')
  } catch (err) {
    error.value = 'Error al guardar la factura.'
    console.error(err)
  }
}

const getProductName = (id) => {
  const prod = productos.value.find(p => p._id === id)
  return prod ? prod.Art_Name : 'Desconocido'
}

onMounted(() => {
  fetchClientes()
  fetchProductos()
})
</script>

<template>
  <div class="popup-overlay">
    <div class="popup-content">
      <h2>Agregar Nueva Factura</h2>
      <form @submit.prevent="handleSubmit">
        <!-- Fecha -->
        <label>
          Fecha:
          <input type="date" v-model="formData.Fac_Date" required />
        </label>

        <!-- Cliente -->
        <label>
          Cliente:
          <select v-model="formData.Fac_idUser" required>
            <option value="">Seleccione un cliente</option>
            <option v-for="cliente in clientes" :key="cliente._id" :value="cliente._id">
              {{ cliente.User_Name }} {{ cliente.User_LastName }} - NIT: {{ cliente.User_Nit }}
            </option>
          </select>
        </label>

        <p v-if="formData.Fac_idUser">
          Monto disponible:
          {{ montoDisponible.toLocaleString('es-CO', { style: 'currency', currency: 'COP' }) }}
        </p>

        <!-- Producto -->
        <label>
          Producto:
          <select v-model="currentProduct.Fac_idArticle" required>
            <option value="">Seleccione un producto</option>
            <option v-for="producto in productos" :key="producto._id" :value="producto._id">
              {{ producto.Art_Name }} - Saldo: {{ producto.Art_balance }} - Laboratorio: {{ producto.Art_laboratory }}
            </option>
          </select>
        </label>

        <!-- Tipo de operación -->
        <label>
          Tipo de operación:
          <select v-model="tipoOperacion">
            <option value="entrada">Entrada (Compra)</option>
            <option value="salida">Salida (Venta/Devolución)</option>
          </select>
        </label>

        <!-- Cantidad -->
        <label>
          Cantidad:
          <input
            type="number"
            v-model.number="currentProduct.Fac_Amount"
            min="1"
            required
          />
        </label>

        <!-- Precio Unidad -->
        <label>
          Precio Unidad:
          <input
            type="number"
            v-model.number="currentProduct.Fac_Unit_Price"
            step="0.01"
            :readonly="tipoOperacion === 'entrada'"
          />
        </label>

        <!-- Costo Unitario -->
        <label>
          Costo Unitario:
          <input
            type="number"
            v-model.number="currentProduct.Fac_cost"
            step="0.01"
            :readonly="tipoOperacion === 'salida'"
          />
        </label>

        <p v-if="error" class="error">{{ error }}</p>

        <button type="button" class="popUpButtonFactura" @click="addProduct">
          Agregar Producto
        </button>

        <h3>Productos Agregados:</h3>
        <ul>
          <li v-for="(prod, index) in formData.Fac_Articles" :key="index">
            {{ getProductName(prod.Fac_idArticle) }} - Cantidad: {{ prod.Fac_Amount }}
            | Venta: {{ prod.Fac_Total_Product.toLocaleString('es-CO', { style: 'currency', currency: 'COP' }) }}
            | Costo: {{ prod.Fac_Total_cost.toLocaleString('es-CO', { style: 'currency', currency: 'COP' }) }}
            <button type="button" class="popUpButtonDelete" @click="removeProduct(index)">Eliminar</button>
          </li>
        </ul>
        <p>
          <strong>Total Venta:</strong>
          {{ calcularTotalFactura().toLocaleString('es-CO', { style: 'currency', currency: 'COP' }) }}
        </p>

        <p>
          <strong>Total Costo:</strong>
          {{ calcularTotalCosto().toLocaleString('es-CO', { style: 'currency', currency: 'COP' }) }}
        </p>
        <button type="submit" class="popUpButtonFactura">Guardar</button>
        <button type="button" class="popUpButtonFactura" @click="emitFn('onClose')">Cancelar</button>
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
  background-color: rgba(0,0,0,0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.popup-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 600px;
  max-height: 90vh;
  overflow-y: auto;
}

label {
  display: block;
  margin-top: 10px;
}

input, select {
  width: 100%;
  padding: 8px;
  margin-top: 5px;
}

.popUpButtonDelete{
  background-color: #d43e3e;
  color: white;
  border-radius: 4px;
  cursor: pointer;
  margin: 10px 5px;
  padding: 5px;
}

ul li{
  list-style-type: none;
  padding: 0;
}

.popUpButtonFactura {
  margin: 10px 5px;
  padding: 10px;
  border: none;
  background-color: #4caf50;
  color: white;
  border-radius: 4px;
  cursor: pointer;
}

.error {
  color: red;
}
</style>
