<template>
  <div>
    <h1>Страница с постами</h1>
    <MyInput v-focus :model-value="searchQuery" @update:model-value="setSearchQuery" placeholder="Поиск..." />
    <div class="app__btns">
      <MyButton @click="showDialog">
        Создать пост
      </MyButton>
      <MySelect :model-value="selectedSort" @update:model-value="setSelectedSort" :options="sortOptions"></MySelect>
    </div>
    <MyModal v-model:show="dialogVisible">
      <PostForm @create="createPost" />
    </MyModal>
    <TransitionGroup name="post-list-load">
      <PostList :posts="sortedSearchPosts" @remove="removePost" v-if="!isLoading" />
      <div v-else>Идёт загрузка...</div>
    </TransitionGroup>
    <div v-intersection="loadMorePosts" class="observer" />
    <!-- <div class="page__wrapper">
      <div v-for="pageNumber in totalPages" :key="pageNumber" class="page" :class="{
        'current-page': page === pageNumber
      }" @click="changePage(pageNumber)">{{ pageNumber }}</div>
    </div> -->
  </div>
</template>

<script scoped>
  import PostList from '@/components/posts/PostList.vue'
  import PostForm from '@/components/posts/PostForm.vue'
  import MyInput from '@/components/UI/MyInput.vue'
  import { mapState, mapActions, mapGetters, mapMutations } from 'vuex'
  export default {
    components: {
      PostList,
      PostForm,
      MyInput
    },
    data() {
      return {
        dialogVisible: false,
      }
    },
    methods: {
      ...mapMutations({
        setPage: 'post/setPage',
        setSearchQuery: 'post/setSearchQuery',
        setSelectedSort: 'post/setSelectedSort',
        setRemovePost: 'post/setRemovePost'

      }),
      ...mapState({

      }),
      ...mapActions({
        loadMorePosts: 'post/loadMorePosts',
        fetchPosts: 'post/fetchPosts'
      }),
      ...mapGetters({

      }),
      removePost(post) {
        this.setRemovePost(post.id)
      },
      createPost(post) {
        this.posts.push(post)
        this.dialogVisible = false
      },
      showDialog() {
        this.dialogVisible = true
      },
      // changePage(pageNumber) {
      //   this.page = pageNumber
      //   this.fetchPosts()
      // },

    },
    mounted() {
      this.fetchPosts()
    },
    computed: {
      ...mapState('post', {
        posts: state => state.posts,
        isLoading: state => state.isLoading,
        page: state => state.page,
        limit: state => state.limit,
        selectedSort: state => state.selectedSort,
        searchQuery: state => state.searchQuery,
        totalPages: state => state.totalPages,
        sortOptions: state => state.sortOptions,
      }),
      ...mapMutations({

      }),
      ...mapActions({

      }),
      ...mapGetters('post', [ 'sortedPosts', 'sortedSearchPosts' ]),
    },
  }
</script>
<style>


  .app__btns {
    display: flex;
    justify-content: space-between;
    margin: 15px 0
  }

  .post-list-load-move,
  /* применять переход к движущимся элементам */
  .post-list-load-enter-active,
  .post-list-load-leave-active {
    transition: all 0.9s ease;
  }

  .post-list-load-enter-from,
  .post-list-load-leave-to {
    opacity: 0;
    transform: translateY(30px);
  }

  /* убедитесь, что удаляющиеся элементы выведены из потока, чтобы
анимации перемещения могли быть рассчитаны правильно. */
  .post-list-load-leave-active {
    position: absolute;
  }

  .page__wrapper {
    display: flex;
    margin-top: 15px;
  }

  .page {
    cursor: pointer;
    border: 1px solid black;
    padding: 10px;
  }

  .current-page {
    border: 2px solid teal
  }

  /*
  .observer {
    height: 30px;
    background: rgb(0, 128, 81);
  } */
</style>
