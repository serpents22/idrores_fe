<template>
  <div class="card">
    <div class="card-header">
      <div class="show-entries">
        <span>Show</span>
        <select 
          v-model="currentEntries" 
          class="select-entries"
          @change="filterEntries">
          <option v-for="se in showEntries" :key="se" :value="se">{{se}}</option>
        </select>
        <span>entries</span>
      </div>
      <div class="search-field">
        <SearchBar v-model="searchValue" @input="searchEntries"/>
      </div>
    </div> 
    <div class="card-body">
      <TableBase :tableHeader="props.tableHeader" >
        <tr v-for="tData in filteredEntries" :key='tData.gatewayName' >
              <td>{{ tData.id }}</td>
              <td>{{ tData.gatewayName }}</td>
              <td>{{ tData.maxDevice }}</td>
              <td>{{ tData.description }}</td>
        </tr>
      </TableBase>
    </div>
    <div class="card-footer">
      <span class="text-xs">
        <p>Showing {{ firstData }} to {{ lastData }} of {{ props.totalData }} entries</p>
      </span>
      <div id="pagination-wrapper">
      <div v-for="page in pageRange" :key="page.number">
        <button 
            :disabled="page.isDisabled" 
            :class="page.isSelected? 'selected' :''" 
            class="navigation" 
            @click="changePage(page.number)">
          <span>{{page.number}}</span>
        </button>
      </div>
      </div>
    </div>
  </div>
</template>

<script setup>

import TableBase from '@/components/table/TableBase.vue';
import SearchBar from '@/components/SearchBar.vue';
import { onMounted, ref } from 'vue';

const props = defineProps({
  tableHeader:Array,
  tableData:Array,
  totalData:Number,
})

const showEntries = ['10', '20', '30', '40', '50']
const currentEntries = ref('10')
const currentPage = ref(1)
const allPages = ref(1)
const pageRange = ref([])
const searchValue = ref('')
const filteredEntries = ref()
const firstData = ref()
const lastData = ref()

onMounted( async () => {
  setTimeout(filterEntries, 3000) 
})

 function filterEntries() {
  filteredEntries.value = props.tableData.slice(0,currentEntries.value)
  allPages.value = Math.ceil(props.totalData/currentEntries.value)
  pageRange.value = []
  for (let i = 1; i <= allPages.value; i+= 1 ) {
		pageRange.value.push({
			number: i,
			// isDisabled: i === currentPage.value,
			isSelected: i === currentPage.value
		});
	}
  firstData.value = (filteredEntries.value.length*currentPage.value) - (currentEntries.value - 1)
  lastData.value = filteredEntries.value.length*currentPage.value
}

function searchEntries() {
  console.log(props.tableData)
  console.log(props.totalData)
  filteredEntries.value = props.tableData.filter((data)=> data.gatewayName.toLocaleLowerCase().match(searchValue.value.toLocaleLowerCase()))
  if (searchValue.value === '') {
    filterEntries()
  }
}

function changePage(page) {
  currentPage.value = page  
  filterEntries()
  filteredEntries.value = props.tableData.slice((currentEntries.value*page)-currentEntries.value,currentEntries.value*page)
}



</script>

<style scoped>
.card {
  @apply  
          flex flex-col 
          w-16 md:w-32 lg:w-[800px] gap-4
          mx-auto
}
.show-entries {
  @apply flex gap-2 justify-center items-center
}
.card-header {
  @apply flex justify-between items-center px-10 pt-6
}

.card-footer {
  @apply flex justify-between items-center
}
#pagination-wrapper {
  @apply flex my-2
}
.navigation {
  @apply px-4 py-2 bg-[#F5F8FA] text-[#616D76] text-sm transition-colors duration-300 hover:bg-[#1363DF]/40 hover:text-[#1363DF] 
}

.selected {
  @apply bg-[#1363DF] text-white
} 

.first-page {
  @apply rounded-tl-lg rounded-bl-lg
}
.last-page {
  @apply rounded-tr-lg rounded-br-lg
}

</style>