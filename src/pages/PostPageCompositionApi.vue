<script>
import PostForm from '@/components/PostForm.vue';
import PostList from '@/components/PostList.vue';
import { usePosts } from '@/hooks/usePosts';
import { useSortedAndSearchedPosts } from '@/hooks/useSortedAndSearchedPosts';
import { useSortedPosts } from '@/hooks/useSortedPosts';

export default {
    components: {
        PostForm, PostList
    },
    data(){
        return {
            dialogVisible: false,
            sortOptions: [
                {value: 'title', name: 'По названию'},
                {value: 'body', name: 'По описанию'},
            ]
        }
    },
    setup(props){
        const {isPostLoading, posts, totalPages} = usePosts(10)
        const {selectedSort, sortedPosts} = useSortedPosts(posts)
        const {searchQuery, sortedAndSearchedPosts} = useSortedAndSearchedPosts(sortedPosts)

        return {
            isPostLoading, 
            posts, 
            totalPages, 
            selectedSort, 
            sortedPosts,
            searchQuery, 
            sortedAndSearchedPosts
        }
    }
}
</script>

<template>
    <div>
        <h1>Страница с постами</h1>
        <my-input
            v-model="searchQuery"
            placeholder="Поиск..."
            v-focus
        />
        <div class="app_buttons">
            <my-button @click="showDialog">Создать пост</my-button>
            <my-select 
                v-model="selectedSort"
                :options="sortOptions"
            />
        </div>
        <my-dialog v-model:show="dialogVisible">
            <PostForm />
        </my-dialog>
        <PostList 
            :posts="sortedAndSearchedPosts" 
            v-if="!isPostLoading"
        />
        <h3 v-else>
            Загрузка постов...
        </h3>
    </div>
</template>

<style>


.app_buttons {
    display: flex;
    margin: 15px 0;
    justify-content: space-between;
}
.page__wrapper {
    display: flex;
    margin-top: 15px;
}


</style>