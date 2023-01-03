<template>
  <div class="navbar">
    <div @click="$router.push('/')">Vue 3</div>
    <div class="navbar-btns">
      <custom-button @click="$router.push('/posts')">Posts</custom-button>
      <custom-button style="margin-left: 20px" @click="$router.push('/about')">About us</custom-button>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.navbar {
  display: flex;
  align-items: center;
  height: 50px;
  padding: 0 15px;
  background-color: lightgray;
  box-shadow: 2px 2px 4px gray;
}

.navbar-btns {
  margin-left: auto;
}
</style>