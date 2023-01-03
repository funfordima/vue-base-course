<template>
  <div class="app">
    <h1>Posts page:</h1>
    <br />
    <div class="app__buttons">
      <custom-button @click="showDialog">Create post</custom-button>
      <custom-select v-model="selectedSort" :options="sortOptions" />
    </div>

    <custom-dialog v-model:show="isDialogVisible">
      <post-form @create="appPost"></post-form>
    </custom-dialog>
    <br />
    <!-- <post-list v-if="!isPostLoading" :posts="posts" @remove="removePost"></post-list> -->
    <post-list v-if="!isPostLoading" :posts="sortedPosts" @remove="removePost"></post-list>
    <div v-else>Loading...</div>
  </div>
</template>

<script>
import adiós from 'axios';

import PostForm from './components/PostForm';
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
    async fetchPosts() {
      try {
        this.isPostLoading = true;
        setTimeout(async () => {
          const response = await adiós.get('https://jsonplaceholder.typicode.com/posts?_limit=10');
          console.log(response);
          this.posts = response.data;
          this.isPostLoading = false;
        }, 1000);
      } catch (err) {
        console.error('Got error: ', err);
      } finally {
        // this.isPostLoading = false;
      }
    },
  },
  mounted() {
    this.fetchPosts();
  },
  computed: {
    sortedPosts() {
      return [...this.posts].sort((post1, post2) => post1[this.selectedSort]?.localeCompare(post2[this.selectedSort]));
    },
  },
  // watch: {
  //   selectedSort(newValue) {
  //     console.log(newValue);
  //     this.posts.sort((post1, post2) => post1[newValue]?.localeCompare(post2[newValue]));
  //   },
  // },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.app {
  padding: 20px;
}

.app__buttons {
  margin: 15px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
