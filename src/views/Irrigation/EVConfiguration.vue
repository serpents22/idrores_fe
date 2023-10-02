<template>
<loading :loading="isLoading" />
<div class="flussi-container">
  <sidebar 
    :noSocial="true" 
    :backOn="true" 
    />
  <div class="device-container">
    <deviceCard 
      :small=true
      :content="newData" 
      />
    <div class="xs-icon-card">
      <img src="@/assets/impostazioni_generali.png">
      <p>{{ $t('generalSetting') }}</p>
    </div>
  </div>
  <div class="content">
    <IdroTitle :title="title"/>
    <div class="main">
      <form @submit.prevent="registerEV" class="table-container">
        <table>
          <thead>
            <tr>
              <th>
                <span>{{$t('evConfiguration')}}</span>
              </th>
              <th>
                <span> </span>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <label>{{$t('stationsNumber')}}</label>
              </td>
              <td>
                <span class="flex gap-2 items-center">
                  <select name="stationNumber" class="dropdown" v-model="registerEVData.stationNumber">
                    <option v-for="item in emptyData" :value="item.stationNumber">{{ item.stationNumber }}</option>
                  </select>
                </span>
              </td>
            </tr>
            <tr>
              <td>
                <label>{{$t('idSerial')}}</label>
              </td>
              <td>
                <span class="flex gap-2 items-center">
                  <input
                    v-model="registerEVData.serial"
                     type="text" >
                </span>
              </td>
            </tr>
            <tr>
              <td>
                <label>{{$t('group')}}</label>
              </td>
              <td>
                <span class="flex gap-2 items-center">
                  <input 
                    v-model="registerEVData.group"
                    type="number" >
                </span>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="button-wrapper">
          <MyButton type="submit" class="filled"  :label="$t('save')" :loading="dataStore.postControlIsLoading" />
        </div>
      </form>
      <table class="table-container mt-10">
        <thead>
          <tr>
            <th>
              <span>{{$t('idSerial')}}</span>
            </th>
            <th>
              <span>{{$t('group')}}</span>
            </th>
            <th>
              <span>{{$t('action')}}</span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="ev in tableData">
            <td>
              <p>{{ ev.ev }}</p>
            </td>
            <td>
              <p>{{ ev.stazione }}</p>
            </td>
            <td>
              <span class="flex gap-2 items-center">
                <MyButton type="button" class="filled__red"  :label="deleteButtonLabel" @click="deleteEV(ev)"  />
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</div>
</template>

<script setup>
  import { useDevicesStore } from '@/stores/DevicesStore'
  import { useDataStore } from '@/stores/DataStore';
  import { storeToRefs } from 'pinia'
  import { defineAsyncComponent,  computed,  onMounted,  ref } from '@vue/runtime-core'
  import MyButton from '@/components/button/BaseButton.vue'
  import { useI18n } from 'vue-i18n';

  const { t } = useI18n()
  //props
  const props = defineProps({
    id: String
  })

  //asynchronus component
  const deviceCard = defineAsyncComponent(
    () => import('@/components/cards/deviceCard.vue'),
  )
  //state
  const devicesStore = useDevicesStore()
  const dataStore = useDataStore()
  const { postControlIsLoading } = storeToRefs(useDataStore())
  const { isLoading } = storeToRefs(useDevicesStore())

  const newData = computed(() => {
      return [devicesStore.deviceData]
    })
  const deleteButtonLabel = ref(t('delete'))
  const title = ref()


  const evConfigParams = ref({
    fields: 'S2000,S2001,S2002,S2003,S2004,S2005,S2006,S2007,S2008,S2009,S2010,S2011,S2012,S2013,S2014,S2015,S2016,S2017,S2018,S2019,S2020,S2021,S2022,S2023,S2024,S2025,S2026,S2027,S2028,S2029,S2030,S2031,S2032,S2033,S2034,S2035,S2036,S2037,S2038,S2039,S2040,S2041,S2042,S2043,S2044,S2045,S2046,S2047,S2048,S2049,S2050,S2051,S2052,S2053,S2054,S2055,S2056,S2057,S2058,S2059,S2060,S2061,S2062,S2063,S2064,S2065,S2066,S2067,S2068,S2069,S2070,S2071,S2072,S2073,S2074,S2075,S2076,S2077,S2078,S2079,S2080,S2081,S2082,S2083,S2084,S2085,S2086,S2087,S2088,S2089,S2090,S2091,S2092,S2093,S2094,S2095,S2096,S2097,S2098,S2099,S2100,S2101,S2102,S2103,S2104,S2105,S2106,S2107,S2108,S2109,S2110,S2111,S2112,S2113,S2114,S2115,S2116,S2117,S2118,S2119,S2120,S2121,S2122,S2123,S2124,S2125,S2126,S2127,S2128,S2129,S2130,S2131,S2132,S2133,S2134,S2135,S2136,S2137,S2138,S2139,S2140,S2141,S2142,S2143,S2144,S2145,S2146,S2147,S2148,S2149,S2150,S2151,S2152,S2153,S2154,S2155,S2156,S2157,S2158,S2159,S2160,S2161,S2162,S2163,S2164,S2165,S2166,S2167,S2168,S2169,S2170,S2171,S2172,S2173,S2174,S2175,S2176,S2177,S2178,S2179,S2180,S2181,S2182,S2183,S2184,S2185,S2186,S2187,S2188,S2189,S2190,S2191,S2192,S2193,S2194,S2195,S2196,S2197,S2198,S2199,S2200,S2201,S2202,S2203,S2204,S2205,S2206,S2207,S2208,S2209,S2210,S2211,S2212,S2213,S2214,S2215,S2216,S2217,S2218,S2219,S2220,S2221,S2222,S2223,S2224,S2225,S2226,S2227,S2228,S2229,S2230,S2231,S2232,S2233,S2234,S2235,S2236,S2237,S2238,S2239,S2240,S2241,S2242,S2243,S2244,S2245,S2246,S2247,S2248,S2249,S2250,S2251,S2252,S2253,S2254,S2255,S2256,S2257,S2258,S2259,S2260,S2261,S2262,S2263,S2264,S2265,S2266,S2267,S2268,S2269,S2270,S2271,S2272,S2273,S2274,S2275,S2276,S2277,S2278,S2279,S2280,S2281,S2282,S2283,S2284,S2285,S2286,S2287',
    measurement: 'EVCONFIG',
    device_code: null
  }) 

  const postEVConData = ref({
    command: 'EVCONFIG',
    payload: {}
  })

  onMounted( async () => {
    await devicesStore.loadDevice(props.id)
    evConfigParams.value.device_code = devicesStore.deviceData.code
    title.value = 'Idrosat:' + devicesStore.deviceData.name
    await dataStore.getLastEvConfig(evConfigParams.value)    
    fillTableData()
    groupingTableData()
  })


  const tableData = ref([])
  const emptyData = ref([])
  const registerEVData = ref({
    stationNumber:null,
    serial:null,
    group:null
  })
  const groupedTableData = ref([]) 
  const numeroStazioni = ref() 

  function fillTableData() {
    let evIndex = 2000    
    let i = 0
    tableData.value = []
    emptyData.value = []
    for (let iFor = 0; iFor < dataStore.evConfigLength / 5; iFor++) {
      if (dataStore.evConfig.hasOwnProperty('S' + evIndex)) {
        if (dataStore.evConfig['S' + evIndex] !== "FFFFFF") {
          let mainDataObj = {
            id: i,
            stationNumber: i+1,
            ev: dataStore.evConfig === undefined ? undefined : dataStore.evConfig['S' + evIndex], 
            stazione: dataStore.evConfig === undefined ? undefined : dataStore.evConfig['S' + (evIndex+2)], 
            pompa: dataStore.evConfig === undefined ? undefined : dataStore.evConfig['S' + (evIndex+3)], 
            masterv: dataStore.evConfig === undefined ? undefined : dataStore.evConfig['S' + (evIndex+4)], 
          }
          tableData.value.push(mainDataObj)
          i++
        } else {
          let mainDataObj = {
            id: i,
            stationNumber: i+1,
            ev: dataStore.evConfig === undefined ? undefined : dataStore.evConfig['S' + evIndex], 
            stazione: dataStore.evConfig === undefined ? undefined : dataStore.evConfig['S' + (evIndex+2)], 
            pompa: dataStore.evConfig === undefined ? undefined : dataStore.evConfig['S' + (evIndex+3)], 
            masterv: dataStore.evConfig === undefined ? undefined : dataStore.evConfig['S' + (evIndex+4)], 
          }
          emptyData.value.push(mainDataObj)
          i++
        }
      } else {
        //i--
      }
      evIndex += 6
    }
    console.log(tableData.value)
    console.log(emptyData.value)
  }

  async function getEV() {
    await dataStore.getLastEvConfig(evConfigParams.value)    
    fillTableData()
    groupingTableData()
  }

  async function deleteEV(value) {
    postEVConData.value.payload = {}
    let evIndex = 2000
    let groupIndex = 2002
    let factor = 6 * value.id
    postEVConData.value.payload['S' + (evIndex+factor)] = 'FFFFFF'
    postEVConData.value.payload['S' + (groupIndex+factor)] = '0'
    await dataStore.postControl(devicesStore.deviceData.code,postEVConData.value)
    getEV()
  }

  async function registerEV() {
    console.log(registerEVData.value)
    postEVConData.value.payload = {}
    let evIndex = 2000
    let groupIndex = 2002
    let factor = 6 * registerEVData.value.stationNumber
    postEVConData.value.payload['S' + (evIndex+factor)] = registerEVData.value.serial
    postEVConData.value.payload['S' + (groupIndex+factor)] = registerEVData.value.group.toString()
    await dataStore.postControl(devicesStore.deviceData.code,postEVConData.value)
    getEV()
  }

  function groupingTableData() {
    groupedTableData.value = tableData.value.reduce((r, a) => {
      r[a.stazione] = [...r[a.stazione] || [], a];
    return r;
    }, {});
    numeroStazioni.value = Object.keys(groupedTableData.value).length
  }


</script>

<style scoped>
.flussi-container {
  @apply 
    relative flex flex-col 
    px-[16px] md:px-[200px] lg:px-[260px] xl:px-[320px] 2xl:px-[360px]
    
}
.main {
  @apply flex flex-col w-full justify-center items-center relative
}

.device-container {
  @apply 
    flex sm:flex-col fixed items-end sm:items-center gap-2
    bottom-0 left-4
    pb-4 sm:pb-8
}

.content {
  @apply 
    flex flex-col justify-center
    gap-2
    w-full
    sm:gap-4
    sm:my-[20px] 
}


input[type=text], input[type=password], input[type=number] {
  @apply pl-2 rounded w-20 sm:w-60 py-2 sm:py-3
}
input[type=radio] {
  @apply cursor-pointer
}
.dropdown {
  @apply pl-2 rounded w-20 sm:w-60 py-2 sm:py-3 cursor-pointer
}

.button-wrapper {
  @apply mt-3 flex w-[100px] mx-auto
}


/* Table Style */
.table-container {
  @apply 
    w-full
    relative
    h-[300px] sm:h-full
    overflow-auto sm:overflow-visible
}
.table-container table {
  @apply 
    mb-10 w-full
}

input:disabled, select:disabled {
  @apply cursor-default
}


.table-container th {
  @apply 
    font-semibold py-[10px] px-[10px] text-left sticky top-0 
    border-b border-[#3a3a3e] bg-[#DDE8FA]/60 backdrop-blur-lg z-10
}
.table-container td {
  @apply 
    py-[10px] px-[10px]
    bg-[#DDE8FA]/60 backdrop-blur-lg 
}
.table-container th,td {
  @apply text-[10px] md:text-[16px]
}

.table-container tr {
  @apply text-left 
} 

.field-wrapper {
  @apply flex py-2 px-4 items-center
}

</style>