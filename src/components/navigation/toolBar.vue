<template>
  <!-- <div class="sidebar-container"> -->
    <div class="nav-wrapper">
      <div class="xs-icon-card add"  @click="addClick" v-show="!noAdd">
        <img src="@/assets/aggiungiimpianto.png">
        <p>{{ $t('createPlant') }}</p>
      </div>
      <div class="xs-icon-card edit"  @click="editClick" v-show="!noAdd">
        <img src="@/assets/modificaimpianto.png">
        <p>{{ $t('editPlant') }}</p>
      </div>
      <div class="xs-icon-card delete"  @click="deleteClick" v-show="!noAdd">
        <img src="@/assets/eliminaimpianto.png">
        <p>{{ $t('deletePlant') }}</p>
      </div>
    </div>
  <!-- </div> -->

</template>

<script>
export default {
  props: [
    'noAdd'
  ],

  setup(props, {emit}) {
    const addClick = () => {
      emit('addClick')
    }
    const editClick = () => {
      emit('editClick')
    }
    const deleteClick = () => {
      emit('deleteClick')
    }

    return {
      addClick, editClick, deleteClick
    }
  } 
  
}
</script>

<style scoped>
.sidebar-container {
  @apply 
    fixed top-0 left-0 h-screen items-center justify-end 
    ml-2 md:ml-4
    flex flex-col 
    transition-all duration-200 ease-in-out
}

.nav-wrapper {
  @apply 
    fixed z-10 flex flex-col gap-2
    bottom-0 left-4
    pb-4 sm:pb-6
}

.nav-wrapper div {
  @apply 
    items-center justify-center flex cursor-pointer
    transition-all ease-in-out duration-200 hover:scale-110

}
</style>