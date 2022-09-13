import FindingCityComponent from "FindingCityComponent.vue"
import WeatherInfoComponent from "WeatherInfoComponent.vue"
<template>
  <div :class="$style.container">
    <optionComponent v-if="locationArray.length" @addLocation="addLocation" @deliteCity="deliteCity" @sortCities="sortCities" @openOption="openOption" :locationArray="locationArray"></optionComponent>
    <FindingCityComponent v-if="!locationArray.length" @addLocation="addLocation" placeholder="What is your position"></FindingCityComponent>
    <template v-if="!optionIsOpen">
      <WeatherInfoComponent v-for="city in locationArray" :element="city" v-bind:key="city.name"></WeatherInfoComponent>
    </template>
  </div>
</template>

<script lang="ts">
import {Weather} from "../assets/Classes";
  
import Vue, { nextTick } from 'vue'

export default Vue.extend({
  name: 'weatherReport',
  data: function(){
    return {
      locationArray: [] as Weather[],
      optionIsOpen: false as boolean,
    }
  },
  created(){
    var storage:Weather[]|null = JSON.parse(window.localStorage.getItem('locations') as string );
    if (storage != null) {
      this.locationArray = storage;
    }
  },
  mounted() {
    parent.postMessage(document.documentElement.scrollHeight, '*');
  },
  updated(){
    parent.postMessage(document.documentElement.scrollHeight, '*');
  },  
  watch:{
    locationArray: {
      handler(newValue) {
        window.localStorage.setItem("locations",JSON.stringify(newValue))
      },
      deep: true
    }
  },  
  methods:{
    openOption(isopen:boolean){
      this.optionIsOpen = isopen
    },
    sortCities(){
      this.locationArray.sort(( a:Weather, b:Weather ) => a.index - b.index)
    },
    deliteCity(city:Weather){
        this.locationArray = this.locationArray.filter( (item:Weather) => item != city);
    },
    addLocation(location: object): void{
      (this.locationArray as object[]) .push(location);
    }
  }
})
</script>
<style lang="scss" module>
  
  @media (max-width: 800px) {
    .cotalogContainer {
      width: 100% !important;
    }
  }
  
::-webkit-scrollbar {
  width: 7px;
  background-color: white;
}

::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background: #b4b4b4;
}

::-webkit-scrollbar-track {
  background-color: white;
}
  .container {
    font-family: "Source Sans Pro", sans-serif;
    width: 15rem;
    max-height: 40rem;
    margin: auto;
    padding: 1rem;   
    background-color: white;
    color: #4d4c4b;
    overflow-y: scroll;
  }
</style>

