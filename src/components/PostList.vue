<template>
  <div v-if="posts.length">
    <h3>Post list:</h3>
    <transition-group name="post-list">
      <post-item v-for="post in posts" :post="post" :key="post.id" @remove="$emit('remove', post)"></post-item>
    </transition-group>
  </div>
  <h2 v-else style="color: red">Post list is empty!</h2>
</template>

<script>
import PostItem from '@/components/PostItem';

export default {
  components: {
    PostItem,
  },
  props: {
    posts: {
      type: Array,
      required: true,
    },
  },
}
</script>

<style scoped>
.post-list-move,
/* apply transition to moving elements */
.post-list-enter-active,
.post-list-leave-active {
  transition: all 0.5s ease;
}

.post-list-enter-from,
.post-list-leave-to {
  opacity: 0;
  transform: translateX(130px);
}
</style>