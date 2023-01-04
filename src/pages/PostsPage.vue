<template>
  <div>
    <h1>Posts page:</h1>
    <br />
    <custom-input v-model="searchQuery" v-focus placeholder="Search by name"></custom-input>
    <div class="app__buttons">
      <custom-button @click="showDialog">Create post</custom-button>
      <custom-select v-model="selectedSort" :options="sortOptions" />
    </div>

    <custom-dialog v-model:show="isDialogVisible">
      <post-form @create="appPost"></post-form>
    </custom-dialog>
    <br />
    <!-- <post-list v-if="!isPostLoading" :posts="posts" @remove="removePost"></post-list> -->
    <post-list v-if="!isPostLoading" :posts="sortedAndSearchedPosts" @remove="removePost"></post-list>
    <div v-else>Loading...</div>
    <!-- <div ref="observer" class="observer" v-intersection></div> -->
    <div class="observer" v-intersection="loadMorePosts"></div>
    <!-- <div class="page-wrapper">
      <div v-for="pageNumber in totalPages" :key="pageNumber" class="page" :class="{
          'current-page': pageNumber === page
        }" @click="changePage(pageNumber)"> {{ pageNumber }}</div>
    </div> -->
  </div>
</template>

<script>
import axios from 'axios';

import PostForm from '@/components/PostForm';
import PostList from '@/components/PostList';

export default {
  components: {
    PostForm,
    PostList,
  },
  data() {
    return {
      isPostLoading: false,
      isDialogVisible: false,
      posts: [],
      selectedSort: '',
      searchQuery: '',
      page: 1,
      limit: 10,
      totalPages: 0,
      sortOptions: [
        {
          value: 'title',
          name: 'Sort by name',
        },
        {
          value: 'body',
          name: 'Sort by description',
        },
      ],
    };
  },
  methods: {
    appPost(post) {
      this.posts.push(post);
      this.isDialogVisible = false;
    },
    removePost(post) {
      this.posts = this.posts.filter(({ id }) => id !== post.id);
    },
    showDialog() {
      this.isDialogVisible = true;
    },
    // changePage(pageNumber) {
    //   this.page = pageNumber;
    //   // this.fetchPosts();
    // },
    async fetchPosts() {
      try {
        this.isPostLoading = true;
        setTimeout(async () => {
          const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
            params: {
              _limit: this.limit,
              _page: this.page,
            },
          });
          console.log(response);
          this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit);
          this.posts = response.data;
          this.isPostLoading = false;
        }, 1000);
      } catch (err) {
        console.error('Got error: ', err);
      } finally {
        // this.isPostLoading = false;
      }
    },
    async loadMorePosts() {
      try {
        this.page += 1;
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
          params: {
            _limit: this.limit,
            _page: this.page,
          },
        });

        this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit);
        this.posts = [...this.posts, ...response.data];
      } catch (err) {
        console.error('Got error: ', err);
      }
    },
  },
  mounted() {
    this.fetchPosts();

    // const options = {
    //   rootMargin: '0px',
    //   threshold: 1.0
    // };

    // const callback = (entries) => {
    //   if (entries[0].isIntersecting && this.page < this.totalPages) {
    //     this.loadMorePosts();
    //   }
    // };

    // const observer = new IntersectionObserver(callback, options);
    // observer.observe(this.$refs.observer);
  },
  computed: {
    sortedPosts() {
      return [...this.posts].sort((post1, post2) => post1[this.selectedSort]?.localeCompare(post2[this.selectedSort]));
    },
    sortedAndSearchedPosts() {
      return this.sortedPosts.filter((post) => post.title.toLowerCase().includes(this.searchQuery.toLowerCase()));
    },
  },
  watch: {
    // selectedSort(newValue) {
    //   console.log(newValue);
    //   this.posts.sort((post1, post2) => post1[newValue]?.localeCompare(post2[newValue]));
    // },
    // page() {
    //   this.fetchPosts();
    // },
  },
};
</script>

<style>
.app__buttons {
  margin: 15px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.page-wrapper {
  display: flex;
  margin-top: 15px;
}

.page {
  padding: 15px;
  border: 1px solid black;
  cursor: pointer;
}

.current-page {
  border: 2px solid teal;
}

.observer {
  height: 30px;
  background-color: darksalmon;
}
</style>
