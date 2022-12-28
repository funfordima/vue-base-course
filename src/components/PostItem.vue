<template>
  <div class="post">
    <div>
      <div>
        <strong>Title:</strong>
        {{ post.title }}
      </div>
      <div>
        <strong>Description:</strong>
        {{ post.description }}
      </div>
    </div>
    <div class="action-block">
      <custom-button>Delete</custom-button>
    </div>
  </div>
</template>

<script>
// import CustomButton from '@/components/UI/CustomButton';

export default {
  // components: {
  //   CustomButton,
  // },
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style scoped>
.post {
  padding: 15px;
  margin-top: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 2px solid teal;
}
</style>