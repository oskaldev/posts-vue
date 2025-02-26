import axios from "axios"
export const postModule = {
  state: () => ({
    posts: [],
    isLoading: false,
    page: 1,
    limit: 10,
    selectedSort: '',
    searchQuery: '',
    totalPages: 0,
    sortOptions: [
      { value: 'title', name: 'По названию' },
      { value: 'body', name: 'По описанию' },
    ]
  }),
  getters: {
    sortedPosts(state) {
      return [ ...state.posts ].sort((post1, post2) =>
        post1[ state.selectedSort ]?.localeCompare(post2[ state.selectedSort ]))
    },
    sortedSearchPosts(state, getters) {
      return getters.sortedPosts.filter(post => post.title.toLowerCase().includes(state.searchQuery.toLowerCase()))
    }
  },
  mutations: {
    // сюда пишем то что будет изменяться
    setPosts(state, posts) {
      state.posts = posts
    },
    setLoading(state, bool) {
      state.isLoading = bool
    },
    setPage(state, page) {
      state.page = page
    },
    setSelectedSort(state, selectedSort) {
      state.selectedSort = selectedSort
    },
    setSearchQuery(state, searchQuery) {
      state.searchQuery = searchQuery
    },
    setTotalPages(state, totalPages) {
      state.totalPages = totalPages
    },
    setRemovePost(state, postId) {
      state.posts = state.posts.filter((post) => post.id !== postId)
    },
  },
  actions: {
    async fetchPosts({ state, commit }) {
      try {
        commit('setLoading', true)
        const response = await axios.get(
          'https://jsonplaceholder.typicode.com/posts', {
          params: {
            _page: state.page,
            _limit: state.limit
          }
        },
        )
        commit('setTotalPages', Math.ceil(response.headers[ 'x-total-count' ] / state.limit))
        commit('setPosts', response.data)
      } catch (error) {
        console.log(error)
      } finally {
        commit('setLoading', false)
      }
    },
    async loadMorePosts({ state, commit }) {
      try {
        commit('setPage', state.page += 1)
        const response = await axios.get(
          'https://jsonplaceholder.typicode.com/posts', {
          params: {
            _page: state.page,
            _limit: state.limit
          }
        },
        )
        commit('setTotalPages', Math.ceil(response.headers[ 'x-total-count' ] / state.limit))
        commit('setPosts', [ ...state.posts, ...response.data ])
      } catch (error) {
        console.log(error)
      }
    },
  },
  namespaced: true
}
