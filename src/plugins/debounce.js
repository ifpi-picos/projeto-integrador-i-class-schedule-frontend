import Vue from 'vue'

const debounce = function (func, threshold, execAsap) {
  let timeout

  return function debounced () {
    const obj = this

    const args = arguments
    function delayed () {
      if (!execAsap) func.apply(obj, args)
      timeout = null
    }

    if (timeout) clearTimeout(timeout)
    else if (execAsap) func.apply(obj, args)

    timeout = setTimeout(delayed, threshold || 100)
  }
}

Vue.use({
  install (Vue) {
    Vue.prototype.$debounce = debounce
  }
})
