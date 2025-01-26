import { ref, computed } from 'vue'
export default function useSortedPosts(sortedPosts) {
  const searchQuery = ref('')

  const sortedSearchPosts = computed(() => {
    return sortedPosts.value.filter(post => post.title.toLowerCase().includes(searchQuery.value.toLowerCase()))
  })

  return {
    searchQuery, sortedSearchPosts
  }
}
