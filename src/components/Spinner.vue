<template>
  <div>
    <div v-show="showLoad" class="load">
      <div class="spin mb-4"></div>
      <div class="loading ml-3">Loading...</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'spinner',
  props: {
    showLoad: Boolean
  }
}
</script>

<style scoped>
  .load {
    position: absolute;
    top: 100%;
    left: 45%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 50px;
  }
  .spin {
    height: 50px;
    width: 50px;
    border-radius: 50vh;
    border: 5px solid #2dce89;
    border-top: 5px solid #fff;
    animation: loading 1.1s linear infinite;
  }
  .loading {
    bottom: 0;
    position: absolute;
    color: #000;
    animation:  1.1s linear infinite;  
  }
  @keyframes loading {
    100% {
      transform: rotate(360deg);
    }
  }
</style>