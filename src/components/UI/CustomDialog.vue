<template>
  <div v-if="show" class="dialog" @click.stop="hideDialog">
    <div class="dialog__content" @click.stop>
      <slot></slot>
    </div>
  </div>
</template>

<script>
import toggleMixin from '@/mixins/toggleMixin';

export default {
  name: 'custom-dialog',
  mixins: [toggleMixin],
  mounted() {
    console.log('dialog mounted');
  },
}
</script>

<style scoped>
.dialog {
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  display: flex;
}

.dialog__content {
  margin: auto;
  padding: 20px;
  background: #fff;
  border-radius: 12px;
  min-height: 50px;
  min-width: 300px;
}
</style>