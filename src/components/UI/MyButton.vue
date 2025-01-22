<template>
  <button class="btn">
    <slot></slot>
  </button>
</template>

<script>
  export default {
    name: 'MyButton'
  }
</script>

<style scoped>
  .btn {
    margin: 5px;
    align-self: flex-end;
    padding: 10px 15px;
    background: none;
    color: teal;
    border: 1px solid teal;
    cursor: pointer;
  }

  .btn:hover {
    background: red;
    color: white;
    transition: 0.4s;
  }
</style>
