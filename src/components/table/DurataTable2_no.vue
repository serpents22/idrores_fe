<template>
  <select 
    class="cursor-pointer w-[200px] rounded-md px-2 py-1 sm:px-4 sm:py-2 self-center" 
    @change="changeOption($event)">
      <option 
        v-for="tab in tabs" :key="tab.value"
        class="nav"
        :id="tab">{{tab}}</option>
  </select>
  <form @submit.prevent="onSubmit" class="table-container">
    <table :tableHeader="tableHeader">
      <thead>
        <tr>
          <th v-for="tHead in tableHeader" :key="tHead">
            {{tHead}}
          </th>
        </tr>
      </thead>
      <tr v-show="evConfigIsLoading || satConfigIsLoading || evStationIsLoading || isLoading" >
        <td>
          <div role="status" class="max-w-sm animate-pulse">
            <div class="h-6 bg-gray-100 rounded-full dark:bg-gray-700 w-full"></div>
          </div>
        </td>
        <td>
          <div role="status" class="max-w-sm animate-pulse">
            <div class="h-6 bg-gray-100 rounded-full dark:bg-gray-700 w-full"></div>
          </div>
        </td>
        <td>
          <div role="status" class="max-w-sm animate-pulse">
            <div class="h-6 bg-gray-100 rounded-full dark:bg-gray-700 w-full"></div>
          </div>
        </td>
        <td>
          <div role="status" class="max-w-sm animate-pulse">
            <div class="h-6 bg-gray-100 rounded-full dark:bg-gray-700 w-full"></div>
          </div>
        </td>
        <td>
          <div role="status" class="max-w-sm animate-pulse">
            <div class="h-6 bg-gray-100 rounded-full dark:bg-gray-700 w-full"></div>
          </div>
        </td>
        <td>
          <div role="status" class="max-w-sm animate-pulse">
            <div class="h-6 bg-gray-100 rounded-full dark:bg-gray-700 w-full"></div>
          </div>
        </td>
      </tr>
      <tr v-for="(tData,index) in groupedTableData" :key="tData.ev">
        <td>
          <p>{{ tData[0].stazione }}</p>
        </td>
        <td>
          <p v-for="valve in tData" :key="valve">{{ valve.ev }}</p>
        </td>
        <td>
          <select v-model="tData[0].ordinare" name="ingresso-1" class="dropdown" @change="updateOrdinareValue(index)">
            <option value="0">OFF</option>
            <option value="1">ON</option>
          </select>
        </td>
        <td>
          <input
            class="w-32" 
            type="text"
            value="Nome Stazione"
            enabled>
        </td>
        <td>
          <input
            class="w-20" :disabled="tempo !== 'ore'"
            type="number"
            v-model="tData[0].min">
        </td>
        <td>
          <input
            class="w-20" :disabled="tempo !== 'ore'"
            type="number"
            v-model="tData[0].sec">
        </td>
      </tr>
    </table>
    <div class="button-wrapper">
      <MyButton type="submit" class="filled"  :label="$t('save')" :loading="postControlIsLoading" />
    </div>
  </form>
</template>

<script setup>
import { useDataStore } from '@/stores/DataStore';
import { useDevicesStore } from '@/stores/DevicesStore'
import { storeToRefs } from 'pinia'
import { defineAsyncComponent,  computed,  onMounted,  ref } from '@vue/runtime-core'
import MyButton from '@/components/button/BaseButton.vue'
import { toInteger } from 'lodash';

  //props
  const props = defineProps({
    id: String
  })

  //state
  const devicesStore = useDevicesStore()
  const dataStore = useDataStore()
  const { evConfigIsLoading, satConfigIsLoading, evStationIsLoading,  postControlIsLoading } = storeToRefs(useDataStore())
  const { isLoading } = storeToRefs(useDevicesStore())

  //variable declaration
  const newData = computed(() => {
      return [devicesStore.deviceData]
    })
  const title = ref()
  const evData = ref([])
  const groupedTableData = ref([])
  const optionValue = ref(1)
  const tabs = ref(['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30'])
  const evConfigParams = ref({
    fields: 'S2000,S2001,S2002,S2003,S2004,S2005,S2006,S2007,S2008,S2009,S2010,S2011,S2012,S2013,S2014,S2015,S2016,S2017,S2018,S2019,S2020,S2021,S2022,S2023,S2024,S2025,S2026,S2027,S2028,S2029,S2030,S2031,S2032,S2033,S2034,S2035,S2036,S2037,S2038,S2039,S2040,S2041,S2042,S2043,S2044,S2045,S2046,S2047,S2048,S2049,S2050,S2051,S2052,S2053,S2054,S2055,S2056,S2057,S2058,S2059,S2060,S2061,S2062,S2063,S2064,S2065,S2066,S2067,S2068,S2069,S2070,S2071,S2072,S2073,S2074,S2075,S2076,S2077,S2078,S2079,S2080,S2081,S2082,S2083,S2084,S2085,S2086,S2087,S2088,S2089,S2090,S2091,S2092,S2093,S2094,S2095,S2096,S2097,S2098,S2099,S2100,S2101,S2102,S2103,S2104,S2105,S2106,S2107,S2108,S2109,S2110,S2111,S2112,S2113,S2114,S2115,S2116,S2117,S2118,S2119,S2120,S2121,S2122,S2123,S2124,S2125,S2126,S2127,S2128,S2129,S2130,S2131,S2132,S2133,S2134,S2135,S2136,S2137,S2138,S2139,S2140,S2141,S2142,S2143,S2144,S2145,S2146,S2147,S2148,S2149,S2150,S2151,S2152,S2153,S2154,S2155,S2156,S2157,S2158,S2159,S2160,S2161,S2162,S2163,S2164,S2165,S2166,S2167,S2168,S2169,S2170,S2171,S2172,S2173,S2174,S2175,S2176,S2177,S2178,S2179,S2180,S2181,S2182,S2183,S2184,S2185,S2186,S2187,S2188,S2189,S2190,S2191,S2192,S2193,S2194,S2195,S2196,S2197,S2198,S2199,S2200,S2201,S2202,S2203,S2204,S2205,S2206,S2207,S2208,S2209,S2210,S2211,S2212,S2213,S2214,S2215,S2216,S2217,S2218,S2219,S2220,S2221,S2222,S2223,S2224,S2225,S2226,S2227,S2228,S2229,S2230,S2231,S2232,S2233,S2234,S2235,S2236,S2237,S2238,S2239,S2240,S2241,S2242,S2243,S2244,S2245,S2246,S2247,S2248,S2249,S2250,S2251,S2252,S2253,S2254,S2255,S2256,S2257,S2258,S2259,S2260,S2261,S2262,S2263,S2264,S2265,S2266,S2267,S2268,S2269,S2270,S2271,S2272,S2273,S2274,S2275,S2276,S2277,S2278,S2279,S2280,S2281,S2282,S2283,S2284,S2285,S2286,S2287,S2288,S2289,S2290,S2291,S2292,S2293,S2294,S2295,S2296,S2297,S2298,S2299,S2300,S2301,S2302,S2303,S2304,S2305,S2306,S2307,S2308,S2309,S2310,S2311,S2312,S2313,S2314,S2315,S2316,S2317,S2318,S2319,S2320,S2321,S2322,S2323,S2324,S2325,S2326,S2327,S2328,S2329,S2330,S2331,S2332,S2333,S2334,S2335,S2336,S2337,S2338,S2339,S2340,S2341,S2342,S2343,S2344,S2345,S2346,S2347,S2348,S2349,S2350,S2351,S2352,S2353,S2354,S2355,S2356,S2357,S2358,S2359,S2360,S2361,S2362,S2363,S2364,S2365,S2366,S2367,S2368,S2369,S2370,S2371,S2372,S2373,S2374,S2375,S2376,S2377,S2378,S2379,S2380,S2381,S2382,S2383,S2384,S2385,S2386,S2387,S2388,S2389,S2390,S2391,S2392,S2393,S2394,S2395,S2396,S2397,S2398,S2399,S2400,S2401,S2402,S2403,S2404,S2405,S2406,S2407,S2408,S2409,S2410,S2411,S2412,S2413,S2414,S2415,S2416,S2417,S2418,S2419,S2420,S2421,S2422,S2423,S2424,S2425,S2426,S2427,S2428,S2429,S2430,S2431,S2432,S2433,S2434,S2435,S2436,S2437,S2438,S2439,S2440,S2441,S2442,S2443,S2444,S2445,S2446,S2447,S2448,S2449,S2450,S2451,S2452,S2453,S2454,S2455,S2456,S2457,S2458,S2459,S2460,S2461,S2462,S2463,S2464,S2465,S2466,S2467,S2468,S2469,S2470,S2471,S2472,S2473,S2474,S2475,S2476,S2477,S2478,S2479,S2480,S2481,S2482,S2483,S2484,S2485,S2486,S2487,S2488,S2489,S2490,S2491,S2492,S2493,S2494,S2495,S2496,S2497,S2498,S2499,S2500,S2501,S2502,S2503,S2504,S2505,S2506,S2507,S2508,S2509,S2510,S2511,S2512,S2513,S2514,S2515,S2516,S2517,S2518,S2519,S2520,S2521,S2522,S2523,S2524,S2525,S2526,S2527,S2528,S2529,S2530,S2531,S2532,S2533,S2534,S2535,S2536,S2537,S2538,S2539,S2540,S2541,S2542,S2543,S2544,S2545,S2546,S2547,S2548,S2549,S2550,S2551,S2552,S2553,S2554,S2555,S2556,S2557,S2558,S2559,S2560,S2561,S2562,S2563,S2564,S2565,S2566,S2567,S2568,S2569,S2570,S2571,S2572,S2573,S2574,S2575,S2576,S2577,S2578,S2579,S2580,S2581,S2582,S2583,S2584,S2585,S2586,S2587,S2588,S2589,S2590,S2591,S2592,S2593,S2594,S2595,S2596,S2597,S2598,S2599,S2600,S2601,S2602,S2603,S2604,S2605,S2606,S2607,S2608,S2609,S2610,S2611,S2612,S2613,S2614,S2615,S2616,S2617,S2618,S2619,S2620,S2621,S2622,S2623,S2624,S2625,S2626,S2627,S2628,S2629,S2630,S2631,S2632,S2633,S2634,S2635,S2636,S2637,S2638,S2639,S2640,S2641,S2642,S2643,S2644,S2645,S2646,S2647,S2648,S2649,S2650,S2651,S2652,S2653,S2654,S2655,S2656,S2657,S2658,S2659,S2660,S2661,S2662,S2663,S2664,S2665,S2666,S2667,S2668,S2669,S2670,S2671,S2672,S2673,S2674,S2675,S2676,S2677,S2678,S2679,S2680,S2681,S2682,S2683,S2684,S2685,S2686,S2687,S2688,S2689,S2690,S2691,S2692,S2693,S2694,S2695,S2696,S2697,S2698,S2699,S2700,S2701,S2702,S2703,S2704,S2705,S2706,S2707,S2708,S2709,S2710,S2711,S2712,S2713,S2714,S2715,S2716,S2717,S2718,S2719,S2720,S2721,S2722,S2723,S2724,S2725,S2726,S2727,S2728,S2729,S2730,S2731,S2732,S2733,S2734,S2735,S2736,S2737,S2738,S2739,S2740,S2741,S2742,S2743,S2744,S2745,S2746,S2747,S2748,S2749,S2750,S2751,S2752,S2753,S2754,S2755,S2756,S2757,S2758,S2759,S2760,S2761,S2762,S2763,S2764,S2765,S2766,S2767,S2768,S2769,S2770,S2771,S2772,S2773,S2774,S2775,S2776,S2777,S2778,S2779,S2780,S2781,S2782,S2783,S2784,S2785,S2786,S2787,S2788,S2789,S2790,S2791,S2792,S2793,S2794,S2795,S2796,S2797,S2798,S2799,S2800,S2801,S2802,S2803,S2804,S2805,S2806,S2807,S2808,S2809,S2810,S2811,S2812,S2813,S2814,S2815,S2816,S2817,S2818,S2819,S2820,S2821,S2822,S2823,S2824,S2825,S2826,S2827,S2828,S2829,S2830,S2831,S2832,S2833,S2834,S2835,S2836,S2837,S2838,S2839,S2840,S2841,S2842,S2843,S2844,S2845,S2846,S2847,S2848,S2849,S2850,S2851,S2852,S2853,S2854,S2855,S2856,S2857,S2858,S2859,S2860,S2861,S2862,S2863,S2864,S2865,S2866,S2867,S2868,S2869,S2870,S2871,S2872,S2873,S2874,S2875,S2876,S2877,S2878,S2879,S2880,S2881,S2882,S2883,S2884,S2885,S2886,S2887,S2888,S2889,S2890,S2891,S2892,S2893,S2894,S2895,S2896,S2897,S2898,S2899,S2900,S2901,S2902,S2903,S2904,S2905,S2906,S2907,S2908,S2909,S2910,S2911,S2912,S2913,S2914,S2915,S2916,S2917,S2918,S2919,S2920,S2921,S2922,S2923,S2924,S2925,S2926,S2927,S2928,S2929,S2930,S2931,S2932,S2933,S2934,S2935,S2936,S2937,S2938,S2939,S2940,S2941,S2942,S2943,S2944,S2945,S2946,S2947,S2948,S2949,S2950,S2951,S2952,S2953,S2954,S2955,S2956,S2957,S2958,S2959,S2960,S2961,S2962,S2963,S2964,S2965,S2966,S2967,S2968,S2969,S2970,S2971,S2972,S2973,S2974,S2975,S2976,S2977,S2978,S2979,S2980,S2981,S2982,S2983,S2984,S2985,S2986,S2987,S2988,S2989,S2990,S2991,S2992,S2993,S2994,S2995,S2996,S2997,S2998,S2999,S3000,S3001,S3002,S3003,S3004,S3005,S3006,S3007,S3008,S3009,S3010,S3011,S3012,S3013,S3014,S3015,S3016,S3017,S3018,S3019,S3020,S3021,S3022,S3023,S3024,S3025,S3026,S3027,S3028,S3029,S3030,S3031,S3032,S3033,S3034,S3035,S3036,S3037,S3038,S3039,S3040,S3041,S3042,S3043,S3044,S3045,S3046,S3047,S3048,S3049,S3050,S3051,S3052,S3053,S3054,S3055,S3056,S3057,S3058,S3059,S3060,S3061,S3062,S3063,S3064,S3065,S3066,S3067,S3068,S3069,S3070,S3071,S3072,S3073,S3074,S3075,S3076,S3077,S3078,S3079,S3080,S3081,S3082,S3083,S3084,S3085,S3086,S3087,S3088,S3089,S3090,S3091,S3092,S3093,S3094,S3095,S3096,S3097,S3098,S3099,S3100,S3101,S3102,S3103,S3104,S3105,S3106,S3107,S3108,S3109,S3110,S3111,S3112,S3113,S3114,S3115,S3116,S3117,S3118,S3119,S3120,S3121,S3122,S3123,S3124,S3125,S3126,S3127,S3128,S3129,S3130,S3131,S3132,S3133,S3134,S3135,S3136,S3137,S3138,S3139,S3140,S3141,S3142,S3143,S3144,S3145,S3146,S3147,S3148,S3149,S3150,S3151',
    measurement: 'EVCONFIG',
    device_code: null
  })

  const satConfigParams = ref({
    fields: 'S10001,S10006',
    measurement: 'SATPRGCONFIG1',
    device_code: null
  })

  
  const evStationParams = ref({
    fields: 'S10100,S10100,S10101,S10102,S10103,S10104,S10105,S10106,S10107,S10108,S10109,S10110,S10111,S10112,S10113,S10114,S10115,S10116,S10117,S10118,S10119,S10120,S10121,S10122,S10123,S10124,S10125,S10126,S10127,S10128,S10129,S10130,S10131,S10132,S10133,S10134,S10135,S10136,S10137,S10138,S10139,S10140,S10141,S10142,S10143,S10144,S10145,S10146,S10147,S10148,S10149,S10150,S10151,S10152,S10153,S10154,S10155,S10156,S10157,S10158,S10159,S10160,S10161,S10162,S10163,S10164,S10165,S10166,S10167,S10168,S10169,S10170,S10171,S10172,S10173,S10174,S10175,S10176,S10177,S10178,S10179,S10180,S10181,S10182,S10183,S10184,S10185,S10186,S10187,S10188,S10189,S10190,S10191,S10192,S10193,S10194,S10195,S10200,S10201,S10202,S10203,S10204,S10205,S10206,S10207,S10208,S10209,S10210,S10211,S10212,S10213,S10214,S10215,S10216,S10217,S10218,S10219,S10220,S10221,S10222,S10223,S10224,S10225,S10226,S10227,S10228,S10229,S10230,S10231,S10232,S10233,S10234,S10235,S10236,S10237,S10238,S10239,S10240,S10241,S10242,S10243,S10244,S10245,S10246,S10247,S10248,S10249,S10250,S10251,S10252,S10253,S10254,S10255,S10256,S10257,S10258,S10259,S10260,S10261,S10262,S10263,S10264,S10265,S10266,S10267,S10268,S10269,S10270,S10271,S10272,S10273,S10274,S10275,S10276,S10277,S10278,S10279,S10280,S10281,S10282,S10283,S10284,S10285,S10286,S10287,S10288,S10289,S10290,S10291,S10292,S10293,S10294,S10295',
    measurement: 'SATPRGTIMES1',
    device_code: null
  })
  let counterDebug = ref(0)
  let tempo = ref('')
  
  function fillEvConfigData() {
    postEvStationData.value.payload = {}
    evData.value = []
    let evIndex = 2000
    let evStationIndex2 = 10200
    let evStationIndex1 = 10100
    let satConfigIndex1 = 10001
    let satConfigIndex6 = 10006
    let i = 0
    for (let iFor = 0; iFor < dataStore.evConfigLength / 5; iFor++) {

      if (dataStore.evConfig.hasOwnProperty('S' + evIndex)) {
        if (dataStore.evConfig['S' + evIndex] !== "FFFFFF") {
        counterDebug.value++
        const min = ref('')
        const sec = ref('')

        let tmpS1 = dataStore.satConfig === undefined ? '0' : dataStore.satConfig['S' + (((optionValue.value - 1) * 1000) +  satConfigIndex1)]
        let tmpS6 = dataStore.satConfig === undefined ? '1' : dataStore.satConfig['S' + (((optionValue.value - 1) * 1000) +  satConfigIndex6)]
 
        if (tmpS6 === '0') {
        tempo.value = 'volume'
        } else if (tmpS1 === '0') {
          tempo.value = 'min'
        } else {
          tempo.value = 'ore'
        }
        
        switch (tempo.value) {
          case 'min':
            console.log('min')
            let tmpMinSec = dataStore.evStation === undefined ? undefined : dataStore.evStation['S' + (((optionValue.value - 1) * 1000) + (evStationIndex1+(dataStore.evConfig['S' + (evIndex+2)]-1)))].split('.')
            min.value = tmpMinSec === undefined ? 0 : tmpMinSec[0]
            sec.value = tmpMinSec === undefined ? 0 : tmpMinSec[1]
            break;
          case 'ore':
            console.log('ore')
            let tmpOreMin = dataStore.evStation === undefined ? undefined : dataStore.evStation['S' + (((optionValue.value - 1) * 1000) + (evStationIndex1+(dataStore.evConfig['S' + (evIndex+2)]-1)))].split('.')
            min.value = tmpOreMin === undefined ? 0 : tmpOreMin[0]
            sec.value = tmpOreMin === undefined ? 0 : tmpOreMin[1]
            break;
          case 'volume':
            console.log('volume')
            min.value = 0
            sec.value = 0
            break;
        }


        let tmpOrdinare = dataStore.evStation === undefined ? undefined : dataStore.evStation['S' + (((optionValue.value - 1) * 1000) + (evStationIndex2+(dataStore.evConfig['S' + (evIndex+2)]-1)))].split(',')

        let obj = {
          id: i,
          ev: dataStore.evConfig === undefined ? 'no name' : dataStore.evConfig['S' + evIndex], 
          stazione: dataStore.evConfig === undefined ? '0' : dataStore.evConfig['S' + (evIndex+2)],
          ordinareValue: tmpOrdinare === undefined ? '0' : tmpOrdinare[0],
          ordinare: tmpOrdinare === undefined ? '0' : tmpOrdinare[1],
          min: min.value,
          sec: sec.value,
        }
        evData.value.push(obj)
        postEvStationData.value.payload['S' + (((optionValue.value - 1) * 1000) +(evStationIndex2+(dataStore.evConfig['S' + (evIndex+2)]-1)))] = String(evData.value[i].ordinareValue + ',' + evData.value[i].ordinare)
        postEvStationData.value.payload['S' + (((optionValue.value - 1) * 1000) + (evStationIndex1+(dataStore.evConfig['S' + (evIndex+2)]-1)))] = String(evData.value[i].min + '.' + evData.value[i].sec)        
        i++
      }
      } else {
        //i--
      }
      evIndex += 6
      // evStationIndex1 += 1
      // evStationIndex2 += 1
    }
  }

  
  function groupingTableData() {
    groupedTableData.value = evData.value.reduce((r, a) => {
      r[a.stazione] = [...r[a.stazione] || [], a];
    return r;
    }, {})
    console.log(groupedTableData.value)
  }

  //Lifecycle function
  onMounted( async () => {    
    await devicesStore.loadDevice(props.id)
    satConfigParams.value.device_code = devicesStore.deviceData.code
    evConfigParams.value.device_code = devicesStore.deviceData.code
    evStationParams.value.device_code = devicesStore.deviceData.code
    title.value = 'Idrosat:' + devicesStore.deviceData.name
    await dataStore.getLastEvConfig(evConfigParams.value)
    await dataStore.getLastSatConfig(satConfigParams.value)
    await dataStore.getLastEvStation(evStationParams.value)
    fillEvConfigData()
    groupingTableData()
  })
  
  async function changeOption(e) {
    optionValue.value = e.target.value
    satConfigParams.value.fields = String(
      'S' + (((e.target.value - 1) * 1000) + 10001) + ',' +
      'S' + (((e.target.value - 1) * 1000) + 10006))

    evStationParams.value.fields = String(
      'S' + (((e.target.value - 1) * 1000) + 10100) + ',' +
      'S' + (((e.target.value - 1) * 1000) + 10101) + ',' +
      'S' + (((e.target.value - 1) * 1000) + 10102) + ',' +
      'S' + (((e.target.value - 1) * 1000) + 10103) + ',' +
      'S' + (((e.target.value - 1) * 1000) + 10104) + ',' +
      'S' + (((e.target.value - 1) * 1000) + 10105) + ',' +
      'S' + (((e.target.value - 1) * 1000) + 10106) + ',' +
      'S' + (((e.target.value - 1) * 1000) + 10107) + ',' +
      'S' + (((e.target.value - 1) * 1000) + 10108) + ',' +
      'S' + (((e.target.value - 1) * 1000) + 10109) + ',' +
      'S' + (((e.target.value - 1) * 1000) + 10110) + ',' +
      'S' + (((e.target.value - 1) * 1000) + 10111) + ',' +
      'S' + (((e.target.value - 1) * 1000) + 10112) + ',' +
      'S' + (((e.target.value - 1) * 1000) + 10113) + ',' +
      'S' + (((e.target.value - 1) * 1000) + 10114) + ',' +
      'S' + (((e.target.value - 1) * 1000) + 10115) + ',' +
      'S' + (((e.target.value - 1) * 1000) + 10116) + ',' +
      'S' + (((e.target.value - 1) * 1000) + 10117) + ',' +
      'S' + (((e.target.value - 1) * 1000) + 10118) + ',' +
      'S' + (((e.target.value - 1) * 1000) + 10119) + ',' +
      'S' + (((e.target.value - 1) * 1000) + 10120) + ',' +
      'S' + (((e.target.value - 1) * 1000) + 10121) + ',' +
      'S' + (((e.target.value - 1) * 1000) + 10122) + ',' +
      'S' + (((e.target.value - 1) * 1000) + 10123) + ',' +
      'S' + (((e.target.value - 1) * 1000) + 10124) + ',' +
      'S' + (((e.target.value - 1) * 1000) + 10125) + ',' +
      'S' + (((e.target.value - 1) * 1000) + 10126) + ',' +
      'S' + (((e.target.value - 1) * 1000) + 10127) + ',' +
      'S' + (((e.target.value - 1) * 1000) + 10128) + ',' +
      'S' + (((e.target.value - 1) * 1000) + 10129) + ',' +
      'S' + (((e.target.value - 1) * 1000) + 10130) + ',' +
      'S' + (((e.target.value - 1) * 1000) + 10131) + ',' +
      'S' + (((e.target.value - 1) * 1000) + 10132) + ',' +
      'S' + (((e.target.value - 1) * 1000) + 10133) + ',' +
      'S' + (((e.target.value - 1) * 1000) + 10134) + ',' +
      'S' + (((e.target.value - 1) * 1000) + 10135) + ',' +
      'S' + (((e.target.value - 1) * 1000) + 10136) + ',' +
      'S' + (((e.target.value - 1) * 1000) + 10137) + ',' +
      'S' + (((e.target.value - 1) * 1000) + 10138) + ',' +
      'S' + (((e.target.value - 1) * 1000) + 10139) + ',' +
      'S' + (((e.target.value - 1) * 1000) + 10140) + ',' +
      'S' + (((e.target.value - 1) * 1000) + 10141) + ',' +
      'S' + (((e.target.value - 1) * 1000) + 10142) + ',' +
      'S' + (((e.target.value - 1) * 1000) + 10143) + ',' +
      'S' + (((e.target.value - 1) * 1000) + 10144) + ',' +
      'S' + (((e.target.value - 1) * 1000) + 10145) + ',' +
      'S' + (((e.target.value - 1) * 1000) + 10146) + ',' +
      'S' + (((e.target.value - 1) * 1000) + 10147) + ',' +
      'S' + (((e.target.value - 1) * 1000) + 10148) + ',' +
      'S' + (((e.target.value - 1) * 1000) + 10149) + ',' +
      'S' + (((e.target.value - 1) * 1000) + 10150) + ',' +
      'S' + (((e.target.value - 1) * 1000) + 10151) + ',' +
      'S' + (((e.target.value - 1) * 1000) + 10152) + ',' +
      'S' + (((e.target.value - 1) * 1000) + 10153) + ',' +
      'S' + (((e.target.value - 1) * 1000) + 10154) + ',' +
      'S' + (((e.target.value - 1) * 1000) + 10155) + ',' +
      'S' + (((e.target.value - 1) * 1000) + 10156) + ',' +
      'S' + (((e.target.value - 1) * 1000) + 10157) + ',' +
      'S' + (((e.target.value - 1) * 1000) + 10158) + ',' +
      'S' + (((e.target.value - 1) * 1000) + 10159) + ',' +
      'S' + (((e.target.value - 1) * 1000) + 10160) + ',' +
      'S' + (((e.target.value - 1) * 1000) + 10161) + ',' +
      'S' + (((e.target.value - 1) * 1000) + 10162) + ',' +
      'S' + (((e.target.value - 1) * 1000) + 10163) + ',' +
      'S' + (((e.target.value - 1) * 1000) + 10164) + ',' +
      'S' + (((e.target.value - 1) * 1000) + 10165) + ',' +
      'S' + (((e.target.value - 1) * 1000) + 10166) + ',' +
      'S' + (((e.target.value - 1) * 1000) + 10167) + ',' +
      'S' + (((e.target.value - 1) * 1000) + 10168) + ',' +
      'S' + (((e.target.value - 1) * 1000) + 10169) + ',' +
      'S' + (((e.target.value - 1) * 1000) + 10170) + ',' +
      'S' + (((e.target.value - 1) * 1000) + 10171) + ',' +
      'S' + (((e.target.value - 1) * 1000) + 10172) + ',' +
      'S' + (((e.target.value - 1) * 1000) + 10173) + ',' +
      'S' + (((e.target.value - 1) * 1000) + 10174) + ',' +
      'S' + (((e.target.value - 1) * 1000) + 10175) + ',' +
      'S' + (((e.target.value - 1) * 1000) + 10176) + ',' +
      'S' + (((e.target.value - 1) * 1000) + 10177) + ',' +
      'S' + (((e.target.value - 1) * 1000) + 10178) + ',' +
      'S' + (((e.target.value - 1) * 1000) + 10179) + ',' +
      'S' + (((e.target.value - 1) * 1000) + 10180) + ',' +
      'S' + (((e.target.value - 1) * 1000) + 10181) + ',' +
      'S' + (((e.target.value - 1) * 1000) + 10182) + ',' +
      'S' + (((e.target.value - 1) * 1000) + 10183) + ',' +
      'S' + (((e.target.value - 1) * 1000) + 10184) + ',' +
      'S' + (((e.target.value - 1) * 1000) + 10185) + ',' +
      'S' + (((e.target.value - 1) * 1000) + 10186) + ',' +
      'S' + (((e.target.value - 1) * 1000) + 10187) + ',' +
      'S' + (((e.target.value - 1) * 1000) + 10188) + ',' +
      'S' + (((e.target.value - 1) * 1000) + 10189) + ',' +
      'S' + (((e.target.value - 1) * 1000) + 10190) + ',' +
      'S' + (((e.target.value - 1) * 1000) + 10191) + ',' +
      'S' + (((e.target.value - 1) * 1000) + 10192) + ',' +
      'S' + (((e.target.value - 1) * 1000) + 10193) + ',' +
      'S' + (((e.target.value - 1) * 1000) + 10194) + ',' +
      'S' + (((e.target.value - 1) * 1000) + 10195) + ',' +
      'S' + (((e.target.value - 1) * 1000) + 10200) + ',' +
      'S' + (((e.target.value - 1) * 1000) + 10201) + ',' +
      'S' + (((e.target.value - 1) * 1000) + 10202) + ',' +
      'S' + (((e.target.value - 1) * 1000) + 10203) + ',' +
      'S' + (((e.target.value - 1) * 1000) + 10204) + ',' +
      'S' + (((e.target.value - 1) * 1000) + 10205) + ',' +
      'S' + (((e.target.value - 1) * 1000) + 10206) + ',' +
      'S' + (((e.target.value - 1) * 1000) + 10207) + ',' +
      'S' + (((e.target.value - 1) * 1000) + 10208) + ',' +
      'S' + (((e.target.value - 1) * 1000) + 10209) + ',' +
      'S' + (((e.target.value - 1) * 1000) + 10210) + ',' +
      'S' + (((e.target.value - 1) * 1000) + 10211) + ',' +
      'S' + (((e.target.value - 1) * 1000) + 10212) + ',' +
      'S' + (((e.target.value - 1) * 1000) + 10213) + ',' +
      'S' + (((e.target.value - 1) * 1000) + 10214) + ',' +
      'S' + (((e.target.value - 1) * 1000) + 10215) + ',' +
      'S' + (((e.target.value - 1) * 1000) + 10216) + ',' +
      'S' + (((e.target.value - 1) * 1000) + 10217) + ',' +
      'S' + (((e.target.value - 1) * 1000) + 10218) + ',' +
      'S' + (((e.target.value - 1) * 1000) + 10219) + ',' +
      'S' + (((e.target.value - 1) * 1000) + 10220) + ',' +
      'S' + (((e.target.value - 1) * 1000) + 10221) + ',' +
      'S' + (((e.target.value - 1) * 1000) + 10222) + ',' +
      'S' + (((e.target.value - 1) * 1000) + 10223) + ',' +
      'S' + (((e.target.value - 1) * 1000) + 10224) + ',' +
      'S' + (((e.target.value - 1) * 1000) + 10225) + ',' +
      'S' + (((e.target.value - 1) * 1000) + 10226) + ',' +
      'S' + (((e.target.value - 1) * 1000) + 10227) + ',' +
      'S' + (((e.target.value - 1) * 1000) + 10228) + ',' +
      'S' + (((e.target.value - 1) * 1000) + 10229) + ',' +
      'S' + (((e.target.value - 1) * 1000) + 10230) + ',' +
      'S' + (((e.target.value - 1) * 1000) + 10231) + ',' +
      'S' + (((e.target.value - 1) * 1000) + 10232) + ',' +
      'S' + (((e.target.value - 1) * 1000) + 10233) + ',' +
      'S' + (((e.target.value - 1) * 1000) + 10234) + ',' +
      'S' + (((e.target.value - 1) * 1000) + 10235) + ',' +
      'S' + (((e.target.value - 1) * 1000) + 10236) + ',' +
      'S' + (((e.target.value - 1) * 1000) + 10237) + ',' +
      'S' + (((e.target.value - 1) * 1000) + 10238) + ',' +
      'S' + (((e.target.value - 1) * 1000) + 10239) + ',' +
      'S' + (((e.target.value - 1) * 1000) + 10240) + ',' +
      'S' + (((e.target.value - 1) * 1000) + 10241) + ',' +
      'S' + (((e.target.value - 1) * 1000) + 10242) + ',' +
      'S' + (((e.target.value - 1) * 1000) + 10243) + ',' +
      'S' + (((e.target.value - 1) * 1000) + 10244) + ',' +
      'S' + (((e.target.value - 1) * 1000) + 10245) + ',' +
      'S' + (((e.target.value - 1) * 1000) + 10246) + ',' +
      'S' + (((e.target.value - 1) * 1000) + 10247) + ',' +
      'S' + (((e.target.value - 1) * 1000) + 10248) + ',' +
      'S' + (((e.target.value - 1) * 1000) + 10249) + ',' +
      'S' + (((e.target.value - 1) * 1000) + 10250) + ',' +
      'S' + (((e.target.value - 1) * 1000) + 10251) + ',' +
      'S' + (((e.target.value - 1) * 1000) + 10252) + ',' +
      'S' + (((e.target.value - 1) * 1000) + 10253) + ',' +
      'S' + (((e.target.value - 1) * 1000) + 10254) + ',' +
      'S' + (((e.target.value - 1) * 1000) + 10255) + ',' +
      'S' + (((e.target.value - 1) * 1000) + 10256) + ',' +
      'S' + (((e.target.value - 1) * 1000) + 10257) + ',' +
      'S' + (((e.target.value - 1) * 1000) + 10258) + ',' +
      'S' + (((e.target.value - 1) * 1000) + 10259) + ',' +
      'S' + (((e.target.value - 1) * 1000) + 10260) + ',' +
      'S' + (((e.target.value - 1) * 1000) + 10261) + ',' +
      'S' + (((e.target.value - 1) * 1000) + 10262) + ',' +
      'S' + (((e.target.value - 1) * 1000) + 10263) + ',' +
      'S' + (((e.target.value - 1) * 1000) + 10264) + ',' +
      'S' + (((e.target.value - 1) * 1000) + 10265) + ',' +
      'S' + (((e.target.value - 1) * 1000) + 10266) + ',' +
      'S' + (((e.target.value - 1) * 1000) + 10267) + ',' +
      'S' + (((e.target.value - 1) * 1000) + 10268) + ',' +
      'S' + (((e.target.value - 1) * 1000) + 10269) + ',' +
      'S' + (((e.target.value - 1) * 1000) + 10270) + ',' +
      'S' + (((e.target.value - 1) * 1000) + 10271) + ',' +
      'S' + (((e.target.value - 1) * 1000) + 10272) + ',' +
      'S' + (((e.target.value - 1) * 1000) + 10273) + ',' +
      'S' + (((e.target.value - 1) * 1000) + 10274) + ',' +
      'S' + (((e.target.value - 1) * 1000) + 10275) + ',' +
      'S' + (((e.target.value - 1) * 1000) + 10276) + ',' +
      'S' + (((e.target.value - 1) * 1000) + 10277) + ',' +
      'S' + (((e.target.value - 1) * 1000) + 10278) + ',' +
      'S' + (((e.target.value - 1) * 1000) + 10279) + ',' +
      'S' + (((e.target.value - 1) * 1000) + 10280) + ',' +
      'S' + (((e.target.value - 1) * 1000) + 10281) + ',' +
      'S' + (((e.target.value - 1) * 1000) + 10282) + ',' +
      'S' + (((e.target.value - 1) * 1000) + 10283) + ',' +
      'S' + (((e.target.value - 1) * 1000) + 10284) + ',' +
      'S' + (((e.target.value - 1) * 1000) + 10285) + ',' +
      'S' + (((e.target.value - 1) * 1000) + 10286) + ',' +
      'S' + (((e.target.value - 1) * 1000) + 10287) + ',' +
      'S' + (((e.target.value - 1) * 1000) + 10288) + ',' +
      'S' + (((e.target.value - 1) * 1000) + 10289) + ',' +
      'S' + (((e.target.value - 1) * 1000) + 10290) + ',' +
      'S' + (((e.target.value - 1) * 1000) + 10291) + ',' +
      'S' + (((e.target.value - 1) * 1000) + 10292) + ',' +
      'S' + (((e.target.value - 1) * 1000) + 10293) + ',' +
      'S' + (((e.target.value - 1) * 1000) + 10294) + ',' +
      'S' + (((e.target.value - 1) * 1000) + 10295))

    satConfigParams.value.measurement = String('SATPRGCONFIG' + e.target.value)
    evStationParams.value.measurement = String('SATPRGTIMES' + e.target.value)
    await dataStore.getLastEvConfig(evConfigParams.value)
    await dataStore.getLastSatConfig(satConfigParams.value)
    await dataStore.getLastEvStation(evStationParams.value)

    fillEvConfigData()
    groupingTableData()

  }




  const postEvStationData = ref({
    command: 'SATPRGTIMES1',
    payload: {}
  })

  function updateOrdinareValue(index) {
    evData.value[index-1].ordinareValue = index
    groupingTableData()
  }

  function updatePostData() {
    postEvStationData.value.payload = {}
    let evIndex = 2000
    let evStationIndex2 = 10200
    let evStationIndex1 = 10100
    let i = 0

    for (let iFor = 0; iFor < dataStore.evConfigLength / 5; iFor++) {

      if (dataStore.evConfig.hasOwnProperty('S' + evIndex)) {
        if (dataStore.evConfig['S' + evIndex] !== "FFFFFF") {
        counterDebug.value++
        postEvStationData.value.payload['S' + (((optionValue.value - 1) * 1000) + (evStationIndex2+(dataStore.evConfig['S' + (evIndex+2)]-1)))] = String(groupedTableData.value[(dataStore.evConfig['S' + (evIndex+2)])][0].ordinareValue + ',' + groupedTableData.value[(dataStore.evConfig['S' + (evIndex+2)])][0].ordinare)
        postEvStationData.value.payload['S' + (((optionValue.value - 1) * 1000) + (evStationIndex1+(dataStore.evConfig['S' + (evIndex+2)]-1)))] = String(groupedTableData.value[(dataStore.evConfig['S' + (evIndex+2)])][0].min + '.' + groupedTableData.value[(dataStore.evConfig['S' + (evIndex+2)])][0].sec)
      i++  
      }
      } else {
        //i--
      }
      evIndex += 6
      // evStationIndex1 += 1
      // evStationIndex2 += 1
    }
  }

  function onSubmit() {
    updatePostData()
    console.log(evData.value)
    postEvStationData.value.command = String('SATPRGTIMES' + optionValue.value)
    console.log(postEvStationData.value)
    dataStore.postControl(evConfigParams.value.device_code,postEvStationData.value)
  }

  const tableHeader = ['Step Programma', 'Stazione selezionata', 'Nome', 'Stazione ON/OFF', 'Ore', 'Minuti']

</script>

<style scoped>

.button-wrapper {
  @apply mt-3 flex w-[100px] mx-auto
}

input[type=text], input[type=password], input[type=number] {
  @apply pl-2 rounded py-2 min-w-[30px] flex w-full
}

select {
  @apply pl-2 rounded py-2 min-w-[30px] cursor-pointer flex w-full
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


.table-container th {
  @apply 
    font-semibold py-[10px] px-[10px] text-left sticky top-0 
    border-b-2 border-[#3a3a3e] bg-[#DDE8FA]/60 backdrop-blur-lg z-10
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


</style>
