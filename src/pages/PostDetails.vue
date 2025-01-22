<template>
  <div class="post__details">
    <h1>Пост с ID = {{ post.id }}</h1>
    <div><strong>Название:</strong> {{ post.title }}</div>
    <div><strong>Описание:</strong> {{ post.body }}</div>
    <MyButton @click="goBack">Назад</MyButton>
  </div>
</template>

<script>
import { ref, onMounted } from "vue"

  export default {
    setup() {
      const post = ref({}) // Сохраняем загруженные данные поста
      const id = parseInt(window.location.pathname.split('/').pop(), 10) // Получение ID из маршрута

      const fetchPost = async () => {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
        post.value = await response.json()
      }
      onMounted(fetchPost) // Загружаем данные при монтировании компонента

      const goBack = () => {
        window.history.back()
      }

      return {
        post,
        goBack
      }
    },
  }
</script>

<style scoped>
  .post__details {

    margin: 1rem;
    padding: 15px;
    border: 2px solid teal;
    display: flex;
    flex-direction: column;
    align-items: baseline;
  }
</style>
