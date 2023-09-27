<template>
  <div class="header">
    <img src="@/assets/logo.png" id="logo" class="mb-4 sm:mb-20">
    <span>
      <h1 class="title">{{title}} {{ name }}</h1>
      <slot></slot>
    </span>
  </div>
</template>

<script>
export default {
  props:['title','name']
}
</script>

<style scoped>
.header {
  @apply 
  relative
    flex flex-col justify-center h-fit w-full items-center 
    gap-[10px] mt-[10px] mb-[16px] md:my-[40px]
}
.header img {
  @apply 
  w-[80px] sm:w-[80px] md:w-[100px] lg:w-[120px] xl:w-[200px] 2xl:w-[280px]
  transition-all ease-in-out duration-300

}
.title {
  @apply 
  relative flex h-full
    font-semibold
    text-xs sm:text-[14px] md:text-[16px] lg:text-[20px] xl:text-[30px] 2xl:text-[36px]
    transition-all ease-in-out duration-300
}
</style>