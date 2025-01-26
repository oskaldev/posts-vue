import { ref, onMounted } from "vue"
export function usePost() {
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
}
