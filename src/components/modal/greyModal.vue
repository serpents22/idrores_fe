<template>
<div class="modal">
  <slot></slot>
</div>
</template>

<script>
export default {

}
</script>

<style scoped>



.modal { 
  @apply  absolute z-20 flex flex-col px-10 py-14 rounded-2xl w-fit
          gap-8
         bg-[#353535]/40 text-white backdrop-blur-xl
}

</style>