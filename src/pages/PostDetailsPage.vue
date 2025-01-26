<template>
  <div class="post__details">
    <h1>Пост с ID = {{ post.id }}</h1>
    <div><strong>Название:</strong> {{ post.title }}</div>
    <div><strong>Описание:</strong> {{ post.body }}</div>
    <MyButton @click="goBack">Назад</MyButton>
  </div>
</template>

<script>
  import { usePost } from '@/hooks/usePostDetails'



  export default {
    setup() {
      const { post, goBack } = usePost()
      return {
        post, goBack
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
