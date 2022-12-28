<template>
  <div class="app">
    <post-form @create="appPost"></post-form>
    <post-list :posts="posts"></post-list>
  </div>
</template>

<script>
import PostForm from './components/PostForm';
import PostList from '@/components/PostList';

export default {
  components: {
    PostForm,
    PostList,
  },
  data() {
    return {
      posts: [
        {
          id: 1,
          title: 'Post about JS',
          description: 'Javascript is the best programming language!'
        },
        {
          id: 2,
          title: 'Post about JS 2',
          description: 'Javascript is the best programming language 2!'
        },
        {
          id: 3,
          title: 'Post about JS 3',
          description: 'Javascript is the best programming language 3!'
        },
      ],
    };
  },
  methods: {
    appPost(post) {
      this.posts.push(post);
    }
  },
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
</style>
