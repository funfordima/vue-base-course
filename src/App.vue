<template>
  <div class="action-block">
    <button @click="addLike">Like</button>
    <button v-on:click="addDislike">Dislike</button>
  </div>
  <div class="">
    <p>Likes count: <strong>{{ likes }}</strong></p>
    <p>Dislikes count: <strong>{{ dislikes }}</strong></p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      likes: 0,
      dislikes: 0,
    };
  },
  methods: {
    addLike() {
      this.likes += 1;
    },
    addDislike() {
      this.dislikes += 1;
    },
  },
};
</script>

<style>

</style>
