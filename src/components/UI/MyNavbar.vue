<template>
  <div class="navbar">
    <div>Vue 3</div>
    <div class="navbar__btns">
      <RouterLink to="/">
        <MyButton>Главная</MyButton>
      </RouterLink>
      <RouterLink to="/about">
        <MyButton>О сайте</MyButton>
      </RouterLink>
      <RouterLink to="/posts">
        <MyButton>Посты</MyButton>
      </RouterLink>
      <RouterLink to="/store">
        <MyButton>Посты store</MyButton>
      </RouterLink>
      <RouterLink to="/composition">
        <MyButton>Посты composition API</MyButton>
      </RouterLink>

    </div>
  </div>
</template>

<script>

  export default {
  }
</script>

<style scoped>
  .navbar {
    height: 50px;
    background: rgba(117, 174, 203, 0.285);
    box-shadow: 2px 2px 4px gray;
    display: flex;
    align-items: center;
    padding: 0 15px;
  }

  .navbar__btns {
    margin-left: auto;
  }
</style>
