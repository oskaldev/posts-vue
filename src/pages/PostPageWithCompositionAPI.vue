<template>
  <div>
    <h1>Страница с постами</h1>
    <MyInput v-model="searchQuery" placeholder="Поиск...." v-focus />
    <div class="app__btns">
      <my-button @click="showDialog">
        Создать пост
      </my-button>
      <my-select v-model="selectedSort" :options="sortOptions" />
    </div>
    <MyModal v-model:show="dialogVisible">
      <PostForm @create="createPost" />
    </MyModal>
    <post-list :posts="sortedSearchPosts" @remove="removePost" v-if="!isLoading" />
    <div v-else>Идет загрузка...</div>
  </div>
</template>

<script>
  import PostForm from "@/components/posts/PostForm.vue"
  import PostList from "@/components/posts/PostList.vue"
  import MyButton from "@/components/UI/MyButton.vue"
  import MySelect from "@/components/UI/MySelect.vue"
  import MyInput from "@/components/UI/MyInput.vue"
  import { usePosts } from "@/hooks/usePosts"
  import useSortedPosts from "@/hooks/useSortedPosts"
  import useSortedSearchPosts from "@/hooks/useSortedSearchPosts"

  export default {

    components: {
      MyInput,
      MySelect,
      MyButton,
      PostList, PostForm
    },
    data() {
      return {
        dialogVisible: false,
        sortOptions: [
          { value: 'title', name: 'По названию' },
          { value: 'body', name: 'По содержимому' },
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
    },
    setup() {
      const { posts, totalPages, isLoading } = usePosts(10)
      const { sortedPosts, selectedSort } = useSortedPosts(posts)
      const { searchQuery, sortedSearchPosts } = useSortedSearchPosts(sortedPosts)

      return {
        posts,
        totalPages,
        isLoading,
        sortedPosts,
        selectedSort,
        searchQuery,
        sortedSearchPosts,
      }
    }
  }
</script>

<style scoped>

  .app__btns {
    margin: 15px 0;
    display: flex;
    justify-content: space-between;
  }

  .page__wrapper {
    display: flex;
    margin-top: 15px;
  }

  .page {
    border: 1px solid black;
    padding: 10px;
  }

  .current-page {
    border: 2px solid teal;
  }

  .observer {
    height: 30px;
  }
</style>
