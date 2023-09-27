<template>
  <div v-bind="$attrs">
    <label v-show="label" :for="name">{{ label }}</label>
    <input :id="name" :name="name" :type="type" v-model="value" :placeholder="placeholder" />
    <span v-show="errorMessage">{{ errorMessage }}</span>
  </div>
</template>

<script>
import { useField } from 'vee-validate'
export default {
  props: [
    'name','label', 'type', 'placeholder', 'state'
  ],
  setup(props) {
    const { value, errorMessage } = useField(props.name)
    return {
      value, errorMessage
    }
  }
}
  

</script>

<style scoped>

.text-field {
  @apply flex flex-col mb-4
}

label {
  @apply  text-sm mb-2
          transition-all duration-200 transform font-normal
}

.text-field input {
  @apply  px-3 py-2
          rounded-lg border border-[#FFEE58] text-xs font-medium outline-[#FFEE58] bg-transparent !important
} 

.text-field input::placeholder {
  @apply text-[10px] font-medium text-[#9A9EA4]  !important
} 

span {
    @apply text-xs text-[#F15412] mt-1
  }

.checkbox {
  @apply flex gap-2 items-center
}

.checkbox input {
  @apply default:ring-2 checked:bg-black !important
}

</style>