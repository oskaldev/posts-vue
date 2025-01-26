<template>
  <NavbarPage></NavbarPage>
  <div class="app">
    <RouterView></RouterView>
  </div>
</template>

<script>
  import NavbarPage from '@/components/UI/MyNavbar.vue'


  export default {
    components: {
      NavbarPage
    },
  }
</script>

<style>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  .app {
    padding: 20px;
  }
</style>
