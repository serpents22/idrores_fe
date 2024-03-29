<template>
    <draggable 
      :list="[value]"
      :group="cell"
      :itemKey="String(index)"
      :disabled="!canDrag" 
      @start="startDrag"
      :move="onMobileMove"
      @end="onMobileEnd"
      tag="td"
      class="itemCell"
      dragClass="itemCell"
      :class="{canDrop, cannotDrop}"
      :data-cell-type="cell"
      :data-row="JSON.stringify(item)"
      v-bind="dragOptions"
      :data-action="dataAction"
    >
      <template #item="{element}">
        <span class="itemCell" :class="{canDrop, cannotDrop}" >
          {{ getFormattedItemCell(cell, element) }}
        </span>
      </template>
    </draggable>
  </template>
  
<script setup>
  import { computed } from 'vue';
  import draggable from 'vuedraggable'
  
  const props = defineProps({
    cell: {
      type: String,
      required: true
    },
    item: {
      type: Object,
      required: true
    },
    index: {
      type: String,
      required: true
    },
    isEditing: {
      type: Boolean,
      required: true
    },
    getFormattedItemCell: {
      type: Function,
      required: true
    },
    getCellKey: {
      type: Function,
      required: true
    },
    draggedCellType: {
      type: String
    },
    itemIndexAsValue: {
      type: Boolean,
      default: false
    },
    dataAction: { // used to handle cell drop from card to list, but cell is dropped on top of cell in list
      type: String,
      default: ''
    }
  })

  const emit = defineEmits(['start-drag', 'mobile-move', 'mobile-end', 'drop', 'end-drag'])
  const value = computed(() => {
    if (props.itemIndexAsValue) {
      return props.item.index
    }

    return props.item[props.getCellKey(props.cell)]
  })
  const canDrag = computed(() => props.isEditing)
  const canDrop = computed(() => props.item.stazione > 0 && props.draggedCellType == props.cell)
  const cannotDrop = computed(() => props.item.stazione > 0 && ![props.cell, undefined].includes(props.draggedCellType))
  const dragOptions = computed(() => {
    return {
        scrollSensitive: 200,
        forceFallback: false,
        fallbackTolerance: 1,        
    }
  })

  const startDrag = event => {
    const { cell, item: { stazione, id } } = props
    emit('start-drag', event, cell, stazione, value.value, id)
  }

  const onMobileMove = event => {
    emit('mobile-move', event)
    return false // needed to make target list hidden
  }

  const onMobileEnd = () => {
    emit('mobile-end')
  }

  const onDrop = () => {
    const { cell, item } = props
    emit('drop', cell, item.stazione, item)
  }

  const endDrag = () => {
    emit('end-drag')
  }
</script>