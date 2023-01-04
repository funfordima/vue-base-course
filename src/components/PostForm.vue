<template>
  <form @submit.prevent>
    <h4>Create post:</h4>
    <custom-input v-model="post.title" v-focus type="text" placeholder="Post title" />
    <custom-input v-model="post.body" type="text" placeholder="Post description" />
    <custom-button style="align-self: flex-end; margin-top: 15px" @click="createPost">Create!</custom-button>
  </form>
</template>

<script>

export default {
  data() {
    return {
      post: {
        title: '',
        body: '',
      },
    };
  },
  methods: {
    createPost() {
      this.post.id = Date.now();

      this.$emit('create', this.post);

      this.post = {
        title: '',
        body: '',
      };
    },
  },
}
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
}
</style>