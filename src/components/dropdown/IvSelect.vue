<template>
  <div id="select-wrapper">
    <select 
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        v-bind="$attrs" 
        :name="name" 
        class="select">
      <option v-for="data in option" :key="data" :value="data" >{{data}}</option>
    </select>
    <label :for="name">{{label}}</label>
  </div>

</template>

<script>
export default {
  props: [ 'label', 'name', 'option', 'modelValue' ]
}
</script>

<style scoped>
#select-wrapper {
  @apply flex gap-2
}
</style>