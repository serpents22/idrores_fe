<template>
    <img class="w-[30px]" src="@/assets/ledOff.png">
    <!-- <img class="w-[30px]" src="@/assets/ledOn.png"> -->
</template>

<script>
import { ref } from '@vue/reactivity'
export default {
  props:[
    'state'
  ],
  setup() {
    const source = ref()
  }

}
</script>

<style>

</style>