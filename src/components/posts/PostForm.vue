<template>
  <form @submit.prevent>
    <h4>Создание поста</h4>
    <MyInput v-model.trim="post.title" placeholder="Название" />
    <MyInput v-model.trim="post.body" placeholder="Описание" />
    <MyButton @click="createPost">Создать</MyButton>
  </form>
</template>
<script>
export default {
  data() {
    return {
      post: {
        title: '',
        body: '',
      },
    }
  },
  methods: {
    createPost() {
      this.$emit('create', this.post)
      this.post.id = Date.now()
      this.post = {
        title: '',
        body: '',
      }
    },
  },
}
</script>
<style scoped>
form {
  display: flex;
  flex-direction: column;
}
</style>
