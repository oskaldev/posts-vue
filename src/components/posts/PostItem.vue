<template>
  <div class="post">
    <div>
      <div><strong>Название:</strong> {{ post.title }}</div>
      <div><strong>Описание:</strong> {{ post.body }}</div>
    </div>
    <div class="post__btns">
      <MyButton @click="$router.push(`/posts/${post.id}`)" style="margin-top: 0">Открыть</MyButton>
      <MyButton @click="$emit('remove', post)" style="margin-top: 0">Удалить</MyButton>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      post: {
        type: Object,
        required: true,
      },
    },
  }
</script>
<style>
  .post {
    margin: 1rem;
    padding: 15px;
    border: 2px solid teal;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .post__btns {
    display: flex;
  }
</style>
