<script setup>

</script>

<template>
    <div class="screen">
        <header>
        <h1>Facturas</h1>
        <div className="finder">
          <input
            type="text"
            placeholder="Buscar Facturas..."
          />
          <button onClick="">Buscar</button>
        </div>
        <button className="add-button" onClick="">Agregar Nueva Factura</button>
      </header>

      <table>
        <thead>
            <tr>
                <th>Numero Factura</th>
                <th>Fecha</th>
                <th>Detalles</th>
          </tr>
        </thead>
      </table>
    </div>
</template>

<style scoped>

</style>