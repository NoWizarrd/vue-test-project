import axios from 'axios'
import { onMounted, ref } from 'vue'

export function usePosts(limit) {
    const posts = ref([])
    const totalPages = ref(0)
    const isPostLoading = ref(true)
    const page = ref(1) 

    const fetching = async () => {
        try {
            isPostLoading.value = true
            const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                params: {
                    _limit: limit,
                    _page: page.value 
                }
            })
            totalPages.value = Math.ceil(response.headers['x-total-count'] / limit)
            posts.value = [...posts.value, ...response.data] 
            page.value += 1 // увеличиваем page
        } catch (error) {
            alert(error.message)
        } finally {
            isPostLoading.value = false
        }
    }

    onMounted(fetching)
    return {
        posts, isPostLoading, totalPages
    }
}
