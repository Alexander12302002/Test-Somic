<script setup>
import { ref, reactive, onMounted, watch } from 'vue'
import axios from 'axios'

const emitFn = defineEmits(['onClose', 'onSuccess'])

const clientes = ref([])
const productos = ref([])
const userWallet = ref(0)
const montoDisponible = ref(0)

const formData = reactive({
  Fac_Date: '',
  Fac_idUser: '',
  Fac_Articles: []
})

const currentProduct = reactive({
  Fac_idArticle: '',
  Fac_Amount: 1,
  Fac_Unit_Price: 0,
  Fac_cost: 0,
  Fac_Total_Product: 0,
  Fac_Total_cost: 0
})



const error = ref('')

const fetchClientes = async () => {
  const res = await axios.get('http://localhost:3000/users')
  clientes.value = res.data.users
}

const fetchProductos = async () => {
  const res = await axios.get('http://localhost:3000/articles')
  productos.value = res.data.articles
}

const handleChange = () => {
  const producto = productos.value.find(p => p._id === currentProduct.Fac_idArticle);
  if (!producto) return;

  if (currentProduct.Fac_Amount >= 0) {
    currentProduct.Fac_Unit_Price = 0; 
    currentProduct.Fac_cost = currentProduct.Fac_cost || producto.Art_cost; 
    currentProduct.Fac_Total_Product = 0;
    currentProduct.Fac_Total_cost = currentProduct.Fac_Amount * currentProduct.Fac_cost;
  } else {
    currentProduct.Fac_Unit_Price = producto.Art_sale_price;
    currentProduct.Fac_cost = producto.Art_cost; 
    currentProduct.Fac_Total_Product = currentProduct.Fac_Amount * currentProduct.Fac_Unit_Price;
    currentProduct.Fac_Total_cost = 0;
  }
};



const fetchUserWallet = async (id) => {
  try {
    const res = await axios.get(`http://localhost:3000/users/wallet/${id}`)
    userWallet.value = res.data.userWallet[0]?.totalUsuario || 0

    const usuario = clientes.value.find(c => c._id === id)
    if (usuario) {
      montoDisponible.value = usuario.User_quota - userWallet.value
    }
  } catch (err) {
    console.error('Error obteniendo cartera del usuario:', err)
    userWallet.value = 0
    montoDisponible.value = 0
  }
}

const calcularTotalFactura = () => {
  return formData.Fac_Articles.reduce((acc, prod) => {
    return acc + (prod.Fac_Unit_Price * prod.Fac_Amount)
  }, 0)
}

const calcularTotalCosto = () => {
  return formData.Fac_Articles.reduce((acc, prod) => {
    return acc + (prod.Fac_Total_cost || 0)
  }, 0)
}

const removeProduct = (index) => {
  formData.Fac_Articles.splice(index, 1)
}

watch(() => currentProduct.Fac_idArticle, handleChange);
watch(() => currentProduct.Fac_Amount, handleChange);
watch(() => formData.Fac_idUser, (newVal) => {
  if (newVal) fetchUserWallet(newVal)
})

const addProduct = () => {
  if (!currentProduct.Fac_idArticle || !currentProduct.Fac_Amount) {
    error.value = 'Debe seleccionar un producto y cantidad'
    return
  }

  if (currentProduct.Fac_Amount >= 0) {
    currentProduct.Fac_Unit_Price = 0;
    currentProduct.Fac_Total_Product = 0;
    currentProduct.Fac_Total_cost = currentProduct.Fac_cost * currentProduct.Fac_Amount;
  } else {
    currentProduct.Fac_cost = 0;
    currentProduct.Fac_Total_Product = currentProduct.Fac_Unit_Price * currentProduct.Fac_Amount;
    currentProduct.Fac_Total_cost = 0;
  }

  const nuevoTotal = calcularTotalFactura() + currentProduct.Fac_Total_Product;

  if (nuevoTotal > montoDisponible.value) {
    error.value = 'El monto total de la factura supera el monto disponible del cliente'
    return
  }

  error.value = ''
  formData.Fac_Articles.push({ ...currentProduct })

  // Reset
  currentProduct.Fac_idArticle = ''
  currentProduct.Fac_Amount = 1
  currentProduct.Fac_Unit_Price = 0
  currentProduct.Fac_cost = 0
}


const handleSubmit = async (e) => {
  e.preventDefault()
  try {
    const totalFactura = calcularTotalFactura()
    formData.Fac_Total = totalFactura
    formData.Fac_Total_cost = calcularTotalCosto()

    if (totalFactura > montoDisponible.value) {
      error.value = 'El monto total de la factura supera el monto disponible del cliente'
      return
    }

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
          <p v-if="montoDisponible !== null">
            Monto disponible: {{ montoDisponible.toLocaleString('es-CO', { style: 'currency', currency: 'COP' }) }}
          </p>
          <!-- Producto -->
          <label>
            Producto:
            <select v-model="currentProduct.Fac_idArticle" @change="onProductSelect" required>
              <option value="">Seleccione un producto</option>
              <option v-for="producto in productos" :key="producto._id" :value="producto._id">
                {{ producto.Art_Name }} - Saldo: {{ producto.Art_balance }}
              </option>
            </select>
          </label>
  
          <!-- Cantidad -->
          <label>
            Cantidad:
            <input type="number" v-model.number="currentProduct.Fac_Amount" @input="calculateTotalProduct" min="1" required />
          </label>

          <!-- Precio Unidad (solo visible cuando cantidad < 0, no editable) -->
          <label v-if="currentProduct.Fac_Amount < 0">
            Precio Unidad:
            <input
              type="number"
              v-model.number="currentProduct.Fac_Unit_Price"
              readonly
            />
          </label>

          <!-- Costo Unitario (editable solo si cantidad > 0, solo visible siempre) -->
          <label>
            Costo Unitario:
            <input
              type="number"
              v-model.number="currentProduct.Fac_cost"
              :readonly="currentProduct.Fac_Amount < 0"
            />
          </label>

          <p v-if="error" class="error">{{ error }}</p>
  
          <button type="button" class="popUpButtonFactura" @click="addProduct">Agregar Producto</button>
  
          <h3>Productos Agregados:</h3>
          <ul>
            <li v-for="(prod, index) in formData.Fac_Articles" :key="index">
              {{ getProductName(prod.Fac_idArticle) }} - Cantidad: {{ prod.Fac_Amount }}
              <button type="button" class="popUpButtonDelete" @click="removeProduct(index)">
                Eliminar
              </button>
            </li>
          </ul>
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
