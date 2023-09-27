<template>
  <div class="tab">
    <select @change="onChange($event)">
      <option 
        v-for="(tab, index) in tabs" :key="tab.value"
        class="nav"
        @click="onClick(tab.value)"
        :value="index"
        :id="tab.title">{{tab.title}}</option>
    </select>
  </div>
</template>

<script>
import { emit } from 'process';

export default {
  props:[
    'tabs'
  ],
  setup(props, {emit}) {
    function onChange(e) {
      emit('clicked', e.target.value)
      // console.log(e.target.value);
    }

    function changeTable(event) {
      var subNavs = document.getElementsByClassName("nav")
      for (var i of subNavs) {
        console.log(i)
        i.classList.remove("active");
      }
      event.target.className += " active"
    }
    return {
      changeTable, onChange
    }
  }
}
</script>

<style scoped>

.tab {
  @apply flex justify-center w-full gap-4 sm:gap-8 items-center mb-4
}
select {
  @apply cursor-pointer w-[200px] rounded-md px-4 py-2
}
  
.active {
  @apply bg-[#1363df] text-white  
  transition-colors duration-300 
}




</style>