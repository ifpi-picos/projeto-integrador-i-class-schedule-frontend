// export function debounce (fn, delay) {
//   let timeoutID = null
//   return function () {
//     clearTimeout(timeoutID)
//     let args = arguments
//     let that = this
//     timeoutID = setTimeout(function () {
//       fn.apply(that, args)
//     }, delay)
//   }
// }

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

export { debounce }
