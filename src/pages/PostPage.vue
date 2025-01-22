<template>
  <div>
    <h1>Страница с постами</h1>
    <MyInput v-model="searchQuery" placeholder="Поиск..." />
    <div class="app__btns">
      <MyButton @click="showDialog">
        Создать пост
      </MyButton>
      <MySelect v-model="selectedSort" :options="sortOptions"></MySelect>
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

<script>
  import PostList from '@/components/posts/PostList.vue'
  import PostForm from '@/components/posts/PostForm.vue'
  import axios from 'axios'

  export default {
    components: {
      PostList,
      PostForm,
    },
    data() {
      return {
        posts: [],
        dialogVisible: false,
        isLoading: false,
        selectedSort: '',
        searchQuery: '',
        page: 1,
        limit: 10,
        totalPages: 0,
        sortOptions: [
          { value: 'title', name: 'По названию' },
          { value: 'body', name: 'По описанию' },
        ]
      }
    },
    methods: {
      createPost(post) {
        this.posts.push(post)
        this.dialogVisible = false
      },
      removePost(post) {
        this.posts = this.posts.filter((p) => p.id !== post.id)
      },
      showDialog() {
        this.dialogVisible = true
      },
      // changePage(pageNumber) {
      //   this.page = pageNumber
      //   this.fetchPosts()
      // },
      async fetchPosts() {
        try {
          this.isLoading = true
          const response = await axios.get(
            'https://jsonplaceholder.typicode.com/posts', {
            params: {
              _page: this.page,
              _limit: this.limit
            }
          },
          )
          this.totalPages = Math.ceil(response.headers[ 'x-total-count' ] / this.limit)
          this.posts = response.data
        } catch (error) {
          alert('Ошибка', console.log(error))
        } finally {
          this.isLoading = false
        }
      },
      async loadMorePosts() {
        try {
          this.page += 1
          const response = await axios.get(
            'https://jsonplaceholder.typicode.com/posts', {
            params: {
              _page: this.page,
              _limit: this.limit
            }
          },
          )
          this.totalPages = Math.ceil(response.headers[ 'x-total-count' ] / this.limit)
          this.posts = [ ...this.posts, ...response.data ]
        } catch (error) {
          alert('Ошибка', console.log(error))
        }
      },
    },
    mounted() {
      this.fetchPosts()
    },
    computed: {
      sortedPosts() {
        return [ ...this.posts ].sort((post1, post2) =>
          post1[ this.selectedSort ]?.localeCompare(post2[ this.selectedSort ]))
      },
      sortedSearchPosts() {
        return this.sortedPosts.filter(post => post.title.toLowerCase().includes(this.searchQuery.toLowerCase()))
      }
    },
    // watch: {
    //   page() {
    //     this.fetchPosts()
    //   }
    // },
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
