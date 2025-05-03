<script setup>

</script>

<template>
    <div className="side-menu">
      <h1>Menu</h1>
      <ul>
        <li><router-link to="/articles">Artículos</router-link></li>
        <li><router-link to="/users">Clientes</router-link></li>
        <li><router-link to="/factures">Facturas</router-link></li>
        <li><router-link to="/kardex">Kardex</router-link></li>
      </ul>
    </div>
</template>

<style scoped>
.side-menu{
    background-color: #b4d2e4;
    display: flex;
    height: 100vh;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 5vh;
    box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
}

.side-menu h1{
    font-size: 40px;
}

.side-menu ul{
    list-style-type: none;
    padding: 0;
}

.side-menu ul li{
    font-size: 30px;
    margin-top: 40px;
    list-style: none;
}

.side-menu ul li a{
    text-decoration: none;
    color:  #000000;
}

.side-menu ul li a:hover {
  color: #003e81;
}
</style>