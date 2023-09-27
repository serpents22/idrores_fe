<template>
  <div 
    class="sidebar-icon group"
    :class="`${isExpand ? 'expanded' : ''}`">
    <span class="text">
      wowowo
      {{menuText}}
    </span>
    <div class="icon">
      <slot></slot>
    </div>
    <span 
      class="sidebar-tooltip group-hover:scale-100">
      {{text}} Fire
    </span>
  </div>
</template>

<script>
export default {
  props:[
    'tooltipText','menuText','isExpand'
  ]
}
</script>

<style>
.sidebar-icon {
  @apply  relative flex items-center justify-center 
          h-12 w-12 my-2 mx-auto
          bg-gray-800
          hover:bg-green-500
          cursor-pointer
          rounded-3xl hover:rounded-xl
          transition-all duration-200 ease-linear
}

.expanded {
  @apply justify-between px-3 !important
}
.expanded .text {
  @apply flex !important
}
.sidebar-icon:hover svg  {
  @apply  fill-white !important
}

.sidebar-icon svg {
  @apply  fill-green-500  !important
}

.sidebar-icon .text {
  @apply hidden 
}

.sidebar-tooltip {
  @apply absolute w-auto p-2 m-2 min-w-max left-14
  rounded-md shadow-md
  text-white bg-gray-900
  text-xs font-bold
  transition-all duration-200 origin-left scale-0
}

</style>