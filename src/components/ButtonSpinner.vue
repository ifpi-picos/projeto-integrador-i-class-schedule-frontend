<template>
  <span id="loading">
    <span>&bull;</span>
    <span>&bull;</span>
    <span>&bull;</span>
  </span>
</template>

<script>
export default {
  name: 'ButtonSpinner'
}
</script>

<style scoped>
/* Loading dots styles */
@-webkit-keyframes opacity {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
@-moz-keyframes opacity {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

#loading {
  text-align: center;
}

/* #loading span {
  padding: 0px;
  background-color: #fff;
  border-radius: 50%;
  display: block;
  height: 5px;
  width: 5px;
} */

#loading span:not(:last-child) {
  margin-right: 5px;
}

#loading span {
  -webkit-animation-name: opacity;
  -webkit-animation-duration: 1s;
  -webkit-animation-iteration-count: infinite;

  -moz-animation-name: opacity;
  -moz-animation-duration: 1s;
  -moz-animation-iteration-count: infinite;
}

#loading span:nth-child(2) {
  -webkit-animation-delay: 100ms;
  -moz-animation-delay: 100ms;
}

#loading span:nth-child(3) {
  -webkit-animation-delay: 300ms;
  -moz-animation-delay: 300ms;
}
</style>
