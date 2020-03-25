<template>
  <div id="tabbar">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: "Tabbar"
  }
</script>

<style scoped>
  #tabbar {
    display: flex;
    background-color: #f6f6f6;

    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
  }
</style>
