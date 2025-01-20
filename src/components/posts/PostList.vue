<template>
  <div v-if="posts.length > 0">
    <h3>Список постов</h3>
    <TransitionGroup name="post-list">
      <PostItem v-for="post in posts" :key="post.id" :post="post" @remove="$emit('remove', post)" />
    </TransitionGroup>
  </div>
  <h2 v-else style="color: brown">Список постов пуст !</h2>
</template>
<script>
  import PostItem from './PostItem.vue'

  export default {
    components: {
      PostItem,
    },
    props: {
      posts: {
        type: Array,
        required: true,
      },
    },
  }
</script>
<style scoped>

  .post-list-move,
  /* применять переход к движущимся элементам */
  .post-list-enter-active,
  .post-list-leave-active {
    transition: all 1s ease;
  }

  .post-list-enter-from,
  .post-list-leave-to {
    opacity: 0;
    transform: translateX(30px);
  }

  /* убедитесь, что удаляющиеся элементы выведены из потока, чтобы
анимации перемещения могли быть рассчитаны правильно. */
  .post-list-leave-active {
    position: absolute;
  }
</style>
