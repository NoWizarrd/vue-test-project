<script>
import PostForm from '@/components/PostForm.vue';
import PostList from '@/components/PostList.vue';
import axios from 'axios';

export default {
    components: {
        PostForm, PostList
    },
    data(){
        return {
            posts: [],
            dialogVisible: false,
            isPostLoading: false,
            selectedSort: '',
            searchQuery: '',
            page: 1,
            limit: 10,
            totalPages: 0,
            sortOptions: [
                {value: 'title', name: 'По названию'},
                {value: 'body', name: 'По описанию'},
            ]
        }
    },
    methods: {
        createPost(post){
            this.posts.push(post)
            this.dialogVisible = false
        },
        removePost(post){
            this.posts = this.posts.filter(p => p.id != post.id)
        },
        showDialog(){
            this.dialogVisible = true
        },
        // changePage(pageNumber){
        //     this.page = pageNumber
        // },
        async fetchPosts(){
            try {
                this.isPostLoading = true
                this.page += 1
                const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                    params: {
                        _limit: this.limit,
                        _page: this.page
                    }
                })
                this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit)
                this.posts = [...this.posts, ...response.data]
            } catch (error) {
                alert(error.message)
            } finally {
                this.isPostLoading = false
            }
        },
        async loadMorePosts(){
            try {
                this.page += 1
                const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                    params: {
                        _limit: this.limit,
                        _page: this.page
                    }
                })
                this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit)
                this.posts = [...this.posts, ...response.data]
            } catch (error) {
                alert(error.message)
            } 
        }
    },
    mounted(){
        this.fetchPosts()
        // const options = {
        //     rootMargin: '0px',
        //     threshold: 1.0
        // }
        // const callback = (entries, observer) => {
        //     if(entries[0].isIntersecting && this.page < this.totalPages){
        //         this.loadMorePosts()
        //     }
        // }
        // const observer = new IntersectionObserver(callback, options);
        // observer.observe(this.$refs.observer)
    },
    computed: {
        sortedPosts() {
            return [...this.posts].sort((post1, post2)=> {
                return post1[this.selectedSort]?.localeCompare(post2[this.selectedSort])
            })
        },
            sortedAndSearchedPosts(){
                return this.sortedPosts.filter(post=>post.title.toLowerCase().includes(this.searchQuery.toLowerCase()))
            }
    },
    watch: {
        // page(){
        //     this.fetchPosts()
        // }
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
            <PostForm @create="createPost"/>
        </my-dialog>
        <PostList 
            :posts="sortedAndSearchedPosts" 
            @remove="removePost"
            v-if="!isPostLoading"
        />
        <h3 v-else>
            Загрузка постов...
        </h3>
        <div v-intersection="loadMorePosts" class="observer"></div>
        <!-- <div class="page__wrapper">
            <div 
                v-for="pageNumber in totalPages" 
                :key="pageNumber" 
                class="page"
                :class="{
                    'current-page': page === pageNumber
                }"
                @click="changePage(pageNumber)"
            >
                {{ pageNumber }}
            </div>
        </div> -->
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
.page {
    border: 1px solid gray;
    padding: 10px;
}
.current-page {
    border: 2px solid green
}

</style>