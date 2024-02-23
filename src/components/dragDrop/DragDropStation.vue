<template>
    <alert 
    :message ="modalMessage"
    :modalActive="modalActive"
    :isError="isError"
     @close="closeNotification" />

    <div class="absolute w-screen">
        <div class="fixed top-[20%] right-0 hidden md:grid gap-3 font-medium z-10">
            <p class="listButton" @click="showList('ev')">{{  $t('ev')  }}</p>
            <p class="listButton" @click="showList('pump')">{{  $t('pump')  }}</p>
            <p class="listButton" @click="showList('master')">{{  $t('evMaster')  }}</p>
        </div>

        <div v-show="showEvList" class="modalListContainer">
            <div class="modalList">

                <div class="modalListHeader">
                    <p>{{  $t('ev')  }}</p>
                    <p @click="showEvList = !showEvList">Close</p>
                </div>

                <draggable
                    group="ev"
                    :list="props.unassignedEvs"
                    itemKey="ev-list"
                    class="modalListBody"
                    :class="{
                        canDrop: draggedCell && draggedStazione != 0 && draggedCellType == 'ev',
                        cannotDrop: draggedCell && draggedStazione != 0 && draggedCellType != 'ev'
                    }"
                    data-cell-type="ev"
                    data-action="moveCellToList"
                >
                    <template #item="{element: item, index}">
                        <DragDropCell 
                            cell="ev"
                            :item="item"
                            :index="'ev-list-' + index"
                            :isEditing="isEditing"
                            :getFormattedItemCell="getFormattedItemCell"
                            :getCellKey="getCellKey"
                            :draggedCellType="draggedCellType"
                            @start-drag="startDrag"
                            @mobile-move="onMobileMove"
                            @mobile-end="onMobileEnd"
                        />
                    </template>
                </draggable>
            </div>
        </div>

        <div v-show="showPumpList" class="modalListContainer">
            <div class="modalList">

                <div class="modalListHeader">
                    <p>{{  $t('pump')  }}</p>
                    <p @click="showPumpList = !showPumpList">Close</p>
                </div>

                <draggable
                    group="pump"
                    :list="props.pumpList"
                    itemKey="pump-list"
                    class="modalListBody"
                    :class="{
                        canDrop: draggedCell && draggedStazione != 0 && draggedCellType == 'pump',
                        cannotDrop: draggedCell && draggedStazione != 0 && draggedCellType != 'pump'
                    }"
                    data-cell-type="pump"
                    data-action="moveCellToList"
                >
                    <template #item="{element: item, index}">
                        <DragDropCell 
                            cell="pump"
                            :item="item"
                            :index="'pump-list-' + index"
                            :isEditing="isEditing"
                            :getFormattedItemCell="getFormattedItemCell"
                            :getCellKey="getCellKey"
                            :draggedCellType="draggedCellType"
                            :itemIndexAsValue="true"
                            @start-drag="startDrag"
                            @mobile-move="onMobileMove"
                            @mobile-end="onMobileEnd"
                        />
                    </template>
                </draggable>
            </div>
        </div>

        <div v-show="showMasterList" class="modalListContainer">
            <div class="modalList">

                <div class="modalListHeader">
                    <p>{{  $t('evMaster')  }}</p>
                    <p @click="showMasterList = !showMasterList">Close</p>
                </div>

                <draggable
                    group="master"
                    :list="props.masterList"
                    itemKey="master-list"
                    class="modalListBody"
                    :class="{
                        canDrop: draggedCell && draggedStazione != 0 && draggedCellType == 'master',
                        cannotDrop: draggedCell && draggedStazione != 0 && draggedCellType != 'master'
                    }"
                    data-cell-type="master"
                    data-action="moveCellToList"
                >
                    <template #item="{element: item, index}">
                        <DragDropCell 
                            cell="master"
                            :item="item"
                            :index="'master-list-' + index"
                            :isEditing="isEditing"
                            :getFormattedItemCell="getFormattedItemCell"
                            :getCellKey="getCellKey"
                            :draggedCellType="draggedCellType"
                            :itemIndexAsValue="true"
                            @start-drag="startDrag"
                            @mobile-move="onMobileMove"
                            @mobile-end="onMobileEnd"
                        />
                    </template>
                </draggable>
            </div>
        </div>
    </div>

    <div class="flex flex-col space-y-4 h-[60vh] md:h-full">

        <!-- header row, edit button -->
        <div class="flex flex-col gap-4 lg:flex-row space-x-4 justify-between">
            <div class="bg-white flex flex-row justify-between items-center space-x-4 rounded px-4 py-2 w-full shadow-card">
                <h2 class="text-sm">{{ $t('stationsManagement') }}</h2>

                <IveButton v-if="!isEditing" @click="toggleEdit()" class="filled__blue w-fit text-xs" :label="$t('edit')" :loading="isLoading" />
                <div v-else class="flex flex-row space-x-2">
                    <IveButton @click="shouldReset ? reset() : confirmReset()" class="filled w-fit text-xs" :label="$t(shouldReset ? 'dataLost' : 'cancel')" :loading="isLoading" />
                    <IveButton @click="saveData()" class="filled__blue w-fit text-xs" :label="$t('save')" :loading="isLoading" />
                </div>
            </div>

            <div v-if="isEditing" class="flex flex-row justify-center items-center space-x-4">
                <select class="dropdown text-xs" v-model="selectedGroup">
                    <option value="" disabled>{{ $t('group') }}</option>
                    <option v-for="({ address, title }) in props.availableGroup" :value="address">{{ title }}</option>
                </select>

                <IveButton @click="addGroup()" class="filled__blue text-xs w-fit py-3" :label="$t('addGroup')" :loading="isLoading" />
            </div>
            <!-- <div v-else /> -->
        </div>

        <div class="card-container h-5/6 sm:h-5/6 overflow-auto">
            <div v-for="(group, index) in props.newGroups" :key="index" v-if="isEditing" class="card">
                <div class="card-title text-xs">
                    <p class="stationId">{{ $t('station') }} {{ group.stazione }}</p>
                    <div class="flex flex-row gap-1 justify-center items-center cursor-pointer" v-if="editedNameStation != group.stazione" @click="editName(group.stazione)">
                        <p>{{ group.title }}</p>
                        <img src="@/assets/material_edit.png" id="editName" class="w-4 h-4">
                    </div>
                    <div v-if="editedNameStation == group.stazione" class="flex flex-row gap-1 justify-center items-center w-2/3">
                        <input type="text" class="border p-1 text-xs w-full" v-model="group.title">
                        <IveButton @click="saveName(group.stazione, group.title)" class="filled__blue !text-xs h-[24px] w-[fit-content]" :label="$t('save')" :loading="isLoading"/>
                    </div>
                </div>

                <div class="card-body py-3">
                    <table class="w-full text-xs border-separate border-spacing-2">
                        <thead class="font-semibold">
                            <tr>
                                <th />
                                <th>{{ $t('ev') }}</th>
                                <th>{{ $t('pump') }}</th>
                                <th>{{ $t('evMaster') }}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <!-- empty row placeholder for index and ev cell -->
                            <tr
                                :class="{
                                        'invisible': !draggedCell || draggedCellType != 'ev' || draggedStazione == group.stazione
                                    }" >
                                <td 
                                    class="itemCell w-10 hover:cursor-not-allowed transition-height duration-200 ease-in-out"
                                    :class="{
                                        '!h-0': !draggedCell || draggedCellType != 'ev' || draggedStazione == group.stazione
                                    }" />

                                <draggable
                                    :list="[]"
                                    group="ev"
                                    :itemKey="String(index)"
                                    tag="td" 
                                    class="itemCell transition-height duration-200 ease-in-out canDrop" 
                                    :class="{
                                        '!h-0': !draggedCell || draggedCellType != 'ev' || draggedStazione == group.stazione
                                    }"
                                    data-cell-type="ev"
                                    data-action="addRowToNewGroup"
                                    :data-new-group="JSON.stringify(group)"
                                >
                                    <template #item="{element}">
                                        {{ element }}
                                    </template>
                                </draggable>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div v-for="(tData, index) in groups" 
                :key="index" 
                v-show="tData.length > 0 && tData[0].stazione != 0" 
                class="card"
            >
                <div class="card-title text-xs">
                    <p class="stationId">{{ $t('station') }} {{ tData[0].stazione }}</p>
                    <div class="flex flex-row gap-1 justify-center items-center cursor-pointer" v-if="editedNameStation != tData[0].stazione" @click="editName(tData[0].stazione)">
                        <p>{{ tData[0].group }}</p>
                        <img src="@/assets/material_edit.png" id="editName" class="w-4 h-4">
                    </div>
                    <div v-if="editedNameStation == tData[0].stazione" class="flex flex-row gap-1 justify-center items-center w-2/3">
                        <input type="text" class="border p-1 text-xs w-full" v-model="tData[0].group">
                        <IveButton @click="saveName(tData[0].stazione, tData[0].group, tData)" class="filled__blue !text-xs h-[24px] w-[fit-content]" :label="$t('save')" :loading="isLoading"/>
                    </div>
                </div>

                <div class="card-body py-3">
                    <table class="w-full text-xs border-separate border-spacing-2">
                        <thead class="font-semibold">
                            <tr>
                                <th />
                                <th>{{ $t('ev') }}</th>
                                <th>{{ $t('pump') }}</th>
                                <th>{{ $t('evMaster') }}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item, index) in tData" :key="index">
                                <td class="itemCell w-10 hover:cursor-not-allowed">{{ index + 1 }}</td>

                                <DragDropCell 
                                    cell="ev"
                                    :item="item"
                                    :index="'ev-card-' + index"
                                    :isEditing="isEditing"
                                    :getFormattedItemCell="getFormattedItemCell"
                                    :getCellKey="getCellKey"
                                    :draggedCellType="draggedCellType"
                                    @start-drag="startDrag"
                                    @mobile-move="onMobileMove"
                                    @mobile-end="onMobileEnd"
                                />

                                <DragDropCell 
                                    cell="pump"
                                    :item="item"
                                    :index="'pump-card-' + index"
                                    :isEditing="isEditing"
                                    :getFormattedItemCell="getFormattedItemCell"
                                    :getCellKey="getCellKey"
                                    :draggedCellType="draggedCellType"
                                    @start-drag="startDrag"
                                    @mobile-move="onMobileMove"
                                    @mobile-end="onMobileEnd"
                                />

                                <DragDropCell 
                                    cell="master"
                                    :item="item"
                                    :index="'master-card-' + index"
                                    :isEditing="isEditing"
                                    :getFormattedItemCell="getFormattedItemCell"
                                    :getCellKey="getCellKey"
                                    :draggedCellType="draggedCellType"
                                    @start-drag="startDrag"
                                    @mobile-move="onMobileMove"
                                    @mobile-end="onMobileEnd"
                                />
                            </tr>

                            <!-- empty row placeholder for index and ev cell -->
                            <tr 
                                :class="{
                                    'invisible': !draggedCell || draggedCellType != 'ev' || draggedStazione == tData[0].stazione
                                }" 
                            >
                                <td 
                                    class="itemCell w-10 hover:cursor-not-allowed transition-height duration-200 ease-in-out"
                                    :class="{
                                        '!h-0': !draggedCell || draggedCellType != 'ev' || draggedStazione == tData[0].stazione
                                    }" />
                                
                                <draggable
                                    :list="[]"
                                    group="ev"
                                    :itemKey="index"
                                    tag="td" 
                                    class="itemCell transition-height duration-200 ease-in-out canDrop" 
                                    :class="{
                                        '!h-0': !draggedCell || draggedCellType != 'ev' || draggedStazione == tData[0].stazione
                                    }"
                                    data-cell-type="ev"
                                    :data-new="JSON.stringify({ group: tData[0].group, stazione: tData[0].stazione })"
                                >
                                    <template #item="{element}">
                                        {{ element }}
                                    </template>
                                </draggable>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <div class="flex flex-row space-x-4 md:hidden">
            <IveButton class="text-xs filled green" @click="showList('ev')" :label="$t('ev')" />
            <IveButton class="text-xs filled green" @click="showList('pump')" :label="$t('pump')" />
            <IveButton class="text-xs filled green" @click="showList('master')" :label="$t('evMaster')" />
        </div>
    </div>
</template>

<script setup>
import { ref } from '@vue/reactivity';
import IveButton from '@/components/button/BaseButton.vue';
import { useDataStore } from '@/stores/DataStore';
import { computed, toRef } from 'vue';
import DragDropCell from '@/components/dragDrop/DragDropCell.vue';
import draggable from 'vuedraggable'

const props = defineProps({
    deviceCode: String,
    pumpList: null,
    masterList: null,
    groups: null,
    rawData: {
        type: Array,
        required: true
    },
    unassignedEvs: null,
    availableGroup: null,
    newGroups: null,
    loadData: Function
})

const emit = defineEmits(['reset'])
const dataStore = useDataStore()
const dataRef = toRef(props, 'rawData')

const isLoading = ref(false)
const isEditing = ref(false)
const shouldReset = ref(false)

const isError = ref(false)
const modalActive = ref(false)
const modalMessage = ref('')

// groups
const selectedGroup = ref('')

// name editing
const isEditingName = ref(false)
const editedNameStation = ref(null)

const showEvList = ref(false)
const showPumpList = ref(false)
const showMasterList = ref(false)

const draggedCell = ref(null)
const draggedCellType = computed(() => draggedCell.value?.cellType)
const draggedStazione = computed(() => draggedCell.value?.stazione)
const openedListProgrammaticaly = ref(false)

// store data for mobile view
const currentCellType = ref(null)
const currentRowData = ref(null)
const newRow = ref(null)
const newGroup = ref(null)
const dragAction = ref(null)

const postData = ref({
    command: 'EVCONFIG',
    payload: {}
})

const postGroupData = ref({
    command: 'GROUPCONFIG',
    payload: {}
})

function getDataById(id) {
    return dataRef.value.find(x => x.id == id)
}

function getDataIndexById(id) {
    return dataRef.value.findIndex(x => x.id == id)
}

function toggleEdit() {
    isEditing.value = !isEditing.value
}

function editName(station) {
    isEditingName.value = true
    editedNameStation.value = station
}

function saveName(stationId, groupName, tData) {
    postGroupData.value.payload = {}

    if (tData) {
        setGroupName(stationId, groupName, tData)
    }

    let address = 6000 + Number(stationId) - 1
    postGroupData.value.payload['S' + address] = groupName
    dataStore.postControl(props.deviceCode, postGroupData.value)

    if (isEditingName.value) {
        isEditingName.value = false
        editedNameStation.value = null
    }
}

function getFormattedItemCell(type, id) {
    // type: ev, pump, master
    
    var item
    switch (type) {
        case 'ev':
            item = getDataById(id)
            return item ? `${item.id}: ${item.ev}` : 'OFF'
        case 'pump':
            item = props.pumpList.find(x => x.index == id)
            return item ? `${item.index}: ${item.title}` : 'OFF'
        case 'master':
            item = props.masterList.find(x => x.index == id)
            return item ? `${item.index}: ${item.title}` : 'OFF'
        default:
            return 'OFF'
    }
}

function showList(listType) {
    switch (listType) {
        case 'ev':
            showEvList.value = !showEvList.value
            showPumpList.value = false
            showMasterList.value = false
            break;
        case 'pump':
            showEvList.value = false
            showPumpList.value = !showPumpList.value
            showMasterList.value = false
            break;
        case 'master':
            showEvList.value = false
            showPumpList.value = false
            showMasterList.value = !showMasterList.value
            break;
        default:
            break;
    }
}

function setGroupName(stationId, groupName, groupData){      
    for(var i=0; i < groupData.length; i++){
        groupData[i].group = groupName
        groupData[i].stazione = stationId
    }
   
    return;
}

function startDrag(event, cellType, stazione, id, rowId, serial) {
    if (event?.dataTransfer) {
        event.dataTransfer.dropEffect = "move"
        event.dataTransfer.effectAllowed = "move"
    }

    const showListState = {
        'ev': showEvList.value,
        'pump': showPumpList.value,
        'master': showMasterList.value
    }

    // only show list if it's not opened yet
    if (!showListState[cellType]) {
        openedListProgrammaticaly.value = true
        showList(cellType)
    }

    draggedCell.value = { id, rowId, stazione, cellType, serial }
}

function isMobileDevice() {
    return window.matchMedia("(max-width: 640px)").matches;
}

function onMobileMove(event) {
    const { from, to } = event;
    const fromCellType = from.getAttribute('data-cell-type')
    const toCellType = to.getAttribute('data-cell-type')
    const toRow = JSON.parse(to.getAttribute('data-row'))
    const action = to.getAttribute('data-action')

    // cell type must be the same
    if (fromCellType != toCellType) {
        console.log('cell type must be the same', fromCellType, toCellType)
        return false; // cancel move
    }

    currentCellType.value = toCellType
    currentRowData.value = toRow

    // adding new row to existing group
    newRow.value = JSON.parse(to.getAttribute('data-new'))

    if (action == 'addRowToNewGroup') { // adding new row to new group
        newGroup.value = JSON.parse(to.getAttribute('data-new-group'))
        dragAction.value = 'addRowToNewGroup'
    } else if (action  == 'moveCellToList') { // moving cell to list
        dragAction.value = 'moveCellToList'
    } else {
        dragAction.value = null
    }

    return false; // disable sort
}

function onMobileEnd() {
    // stopped on new row
    if (newRow.value) {
        addRowToExistingGroup(newRow.value.stazione, newRow.value.group, draggedCell.value.id)
        endDrag()
        return
    }

    // stopped on list
    if (dragAction.value == 'moveCellToList') {
        moveCellToList(currentCellType.value)
        endDrag()
        return
    } else if (dragAction.value == 'addRowToNewGroup') {
        addRowToNewGroup(newGroup.value, draggedCell.value.id)
        endDrag()
        return
    }

    if (!currentCellType.value || !currentRowData.value) {
        endDrag()
        return
    }

    onDrop(currentCellType.value, currentRowData.value.stazione, currentRowData.value)
    endDrag()
}

function endDrag() {
    dragAction.value = null
    newGroup.value = null
    newRow.value = null
    draggedCell.value = null
    currentCellType.value = null
    currentRowData.value = null

    // if list is opened programmaticaly, close it after certain delay
    if (openedListProgrammaticaly.value) {
        openedListProgrammaticaly.value = false

        setTimeout(() => {
            showEvList.value = false
            showPumpList.value = false
            showMasterList.value = false
        }, 300)
    }
}

function onDrop(currentCellType, currentStazione, currentItem) {
    let draggedId = draggedCell.value.id
    let draggedCellType = draggedCell.value.cellType
    let draggedStazione = draggedCell.value.stazione
    let draggedRowId = draggedCell.value.rowId
    
    let fromList = draggedStazione == 0
    let fromPumpList = fromList && draggedCellType == 'pump'
    let fromMasterList = fromList && draggedCellType == 'master'
    let isEvCell = currentCellType == 'ev'

    let tempCurrentItem = { ...currentItem }
    let draggedItem = { ...getDataById(draggedRowId) }

    if (currentStazione == 0) {
        return
    }

    if (draggedCellType != currentCellType) {
        return
    }

    let cellKey = getCellKey(currentCellType)
    let currentId = currentItem[cellKey]

    if (draggedId == currentId ) {
        return
    }

    let currentItemIndex = getDataIndexById(currentItem.id)
    let draggedItemIndex = getDataIndexById(draggedItem.id)

    // set current cell ev value to dragged item ev value
    if (isEvCell) {
        currentItem.ev = draggedItem.ev
    }

    currentItem[cellKey] = draggedId
    
    // set dragged cell value to current item value
    if (!fromPumpList && !fromMasterList) {
        if (isEvCell) {
            draggedItem.ev = tempCurrentItem.ev
        }
        
        draggedItem[cellKey] = tempCurrentItem[cellKey]
    }

    props.rawData[currentItemIndex] = currentItem
    props.rawData[draggedItemIndex] = draggedItem
    
}

function getCellKey(cellType) {
    switch (cellType) {
        case 'ev':
            return 'id'
        case 'pump':
            return 'pompa'
        case 'master':
            return 'masterv'
        default:
            throw new Error('Invalid cell type: ' + cellType)
    }
}

function moveCellToList(currentCellType) {
    let draggedCellType = draggedCell.value.cellType
    let draggedStazione = draggedCell.value.stazione
    let draggedRowId = draggedCell.value.rowId

    // cancel if moving from list to list
    if (draggedStazione == 0) {
        return
    }

    if (draggedCellType != currentCellType) {
        return
    }

    let draggedItem = {...props.rawData.find(x => x.id == draggedRowId)}
    let isEvCell = currentCellType == 'ev'

    if (isEvCell) { // remove row from group
        draggedItem.stazione = 0
    } else {
        let cellKey = getCellKey(currentCellType)
        draggedItem[cellKey] = 0
    }

    const index = getDataIndexById(draggedRowId)
    props.rawData[index] = draggedItem
}

// id is used to calculate the address of the new row
function addRowToExistingGroup(stationId, group, id) {
    const item = {...getDataById(id)}
    item.stazione = stationId
    item.group = group

    const index = getDataIndexById(id)
    props.rawData[index] = item
}

function addRowToNewGroup(group, id) {
    const item = getDataById(id)
    item.group = group.title
    item.stazione = group.stazione

    const index = getDataIndexById(id)
    props.rawData[index] = item

    const groupIndex = props.newGroups.findIndex(x => x.address == group.address)
    props.newGroups.splice(groupIndex, 1)
}

function confirmReset() {
    shouldReset.value = true
}

async function reset() {
    shouldReset.value = false
    toggleEdit()
    isLoading.value = true

    emit('reset')
    await props.loadData()

    isLoading.value = false
}

async function saveData() {
    toggleEdit()
    isLoading.value = true
    postData.value.payload = {}
        props.rawData.forEach((valve) => {
        let localId = valve.id == 0 ? 1 : valve.id
        let localStation = Number(valve.stazione) ?? 0

        // set new data
        postData.value.payload['S' + (2000 + ((localId - 1) * 6))] = valve.ev
        postData.value.payload['S' + (2002 + ((localId - 1) * 6))] = localStation
        postData.value.payload['S' + (2003 + ((localId - 1) * 6))] = valve.pompa
        postData.value.payload['S' + (2004 + ((localId - 1) * 6))] = valve.masterv
    })

    const error = await dataStore.postControl(props.deviceCode, postData.value) // this return error object if error

    if (error) {
        // modalMessage.value = error.message
        modalMessage.value = 'Failed to save data'
        isError.value = true
    } else {
        await props.loadData()
        await props.loadData() // fetch twice to get latest data

        modalMessage.value = 'Data saved successfully'
        isError.value = false
    }

    isLoading.value = false
    modalActive.value = true
    setTimeout(closeNotification, 3000)
}

const closeNotification = () => {
    modalActive.value = false
}

function addGroup() {
    if (selectedGroup.value == '') {
        return
    }

    let index = props.availableGroup.findIndex(x => x.address == selectedGroup.value)
    const removedArr = props.availableGroup.splice(index, 1)
    const group = removedArr[0]
    group.stazione = Number(group.address.slice(1)) + 1 - 6000 // get 4 from S6003, 5 from S6004, etc
    
    props.newGroups.push(group)
    selectedGroup.value = ''
}


</script>

<style scoped>
.card-container {
    @apply grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-4 p-2;
}

.card {
    @apply p-3 bg-white rounded-lg shadow-card;
}

.card.disabled {
    @apply bg-gray-300 opacity-50;
}

.card-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #e2e8f0;

    @apply font-medium pb-2 gap-4;
}

.dropdown {
    @apply pl-2 rounded w-20 sm:w-60 py-2 sm:py-3 cursor-pointer
}

::v-deep(.itemCell) {
    @apply
    w-[75px]
    h-[40px]
    text-xs
    justify-center
    rounded
    bg-gray-100
    transition-colors
    duration-100
    ease-in
    select-none;

    cursor: v-bind('isEditing ? "pointer" : "default"');
}

::v-deep(.itemCell > span) {
    @apply flex flex-col justify-center items-center h-full w-full;
}

::v-deep(.canDrop) {
    @apply bg-green-300;
}

::v-deep(.cannotDrop) {
    @apply bg-red-300;
}

.listButton {
    @apply bg-green-400 p-4 rounded-s-lg shadow-lg cursor-pointer hover:bg-green-300 hover:shadow-xl transition-all duration-200 ease-in-out;
}

.stationId {
    border-radius: 3px;
    @apply text-xs py-1 px-2 bg-gray-200 rounded-sm;
}

.modalListContainer {
    @apply 
    fixed p-4 z-10 bottom-0 w-full h-[200px]
    md:right-0 md:w-1/5 md:h-full md:bottom-auto
}

.modalList {
    @apply
     flex flex-col bg-white shadow-2xl rounded-2xl py-6 px-4 h-full
     md:h-1/2
}

.modalListHeader {
    @apply flex flex-row justify-between items-center border-b-2 pb-4;
}

.modalListHeader p:first-child {
    @apply font-medium;
}

.modalListHeader p:last-child {
    @apply text-sm cursor-pointer;
}

.modalListBody {
    @apply p-2 mt-2 grid grid-cols-3 md:grid-cols-2 auto-rows-min gap-x-1 gap-y-3 overflow-auto max-h-[85%] transition-all duration-200 ease-in-out
    flex-grow;
}

::v-deep(.modalListBody .itemCell) {
    @apply justify-self-center;
}

.modal {
  background: linear-gradient(45.06deg, #010AD1 -8.2%, #1BF728 108.15%);
  border: 2px solid #FFEE58;
}

</style>