<template>
  <div>
    <h1>Posts page:</h1>
    <br />
    <custom-input :model-value="searchQuery" @update:model-value="setSearchQuery" v-focus
      placeholder="Search by name"></custom-input>
    <div class="app__buttons">
      <custom-button @click="showDialog">Create post</custom-button>
      <custom-select :model-value="selectedSort" @update:model-value="setSelectedSort" :options="sortOptions" />
    </div>

    <custom-dialog v-model:show="isDialogVisible">
      <post-form @create="appPost"></post-form>
    </custom-dialog>
    <br />
    <post-list v-if="!isPostLoading" :posts="sortedAndSearchedPosts" @remove="removePost"></post-list>
    <div v-else>Loading...</div>
    <div class="observer" v-intersection="loadMorePosts"></div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';

import PostForm from '@/components/PostForm';
import PostList from '@/components/PostList';

export default {
  components: {
    PostForm,
    PostList,
  },
  data() {
    return {
      isDialogVisible: false,
    };
  },
  methods: {
    ...mapMutations({
      setPage: 'post/setPage',
      setSearchQuery: 'post/setSearchQuery',
      setSelectedSort: 'post/setSelectedSort',
    }),
    ...mapActions({
      loadMorePosts: 'post/loadMorePosts',
      fetchPosts: 'post/fetchPosts',
    }),
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
  },
  mounted() {
    this.fetchPosts();
  },
  computed: {
    ...mapState({
      isPostLoading: (state) => state.post.isPostLoading,
      posts: (state) => state.post.posts,
      selectedSort: (state) => state.post.selectedSort,
      searchQuery: (state) => state.post.searchQuery,
      page: (state) => state.post.page,
      limit: (state) => state.post.limit,
      totalPages: (state) => state.post.totalPages,
      sortOptions: (state) => state.post.sortOptions,
    }),
    ...mapGetters({
      sortedPosts: 'post/sortedPosts',
      sortedAndSearchedPosts: 'post/sortedAndSearchedPosts',
    }),
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
