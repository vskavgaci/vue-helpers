// vue directive for to detech mouse wheel right or left
// for one time and stop wheeling after detech

import Vue from 'vue'

Vue.directive('mousewheel', {
  inserted: function (el, binding) {
    let status = false
    el.addEventListener("wheel", e => {
      if(e.deltaX != 0) {
        e.preventDefault();
      }

      if(e.deltaX > 10 && !status) {
        status = true
        binding.value("next")

        setTimeout(() => {
          status = false
        }, 750)
      } else if (e.deltaX < -10 && !status) {
        status = true
        binding.value("previous")

        setTimeout(() => {
          status = false
        }, 750)
      }
    })
  }
})
