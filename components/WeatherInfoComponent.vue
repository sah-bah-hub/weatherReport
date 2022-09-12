<template>
    <div :class="$style.weatherReportContainer">
        <div :class="$style.header">
            {{element.name}}
        </div>
        <div :class="$style.imgContainer">
            <img :src="element.imgSrc" alt="">
            <div :class="$style.temperature">{{element.temperature}}°C</div>
        </div>
        <p :class="$style.description">Feels like {{element.feelsLike}}°C. {{element.description}}. {{element.windType}}</p>
        <div :class="$style.body">
            <div>
                <div>
                    <img :style="`transform: rotate(`+element.wind.deg+`deg);`" :class="$style.derectionIco" src="../assets/arrow.svg"> 
                    {{element.wind.speed}}m/s {{element.wind.direction}}
                </div>
                <div>
                    <img src="../assets/pressure.svg"> 
                    {{element.pressure}}hPa
                </div>
            </div>
            <div>
                <div>Humidity: {{element.humidity}}%</div>
                <div>Dew point: {{element.dewPoint}}°C</div>
            </div>
            <div>Visibility: {{element.visibility}}km</div>
        </div>
    </div>
</template>

<script lang="ts">
    // import {Weather} from "./Interfaces";

    export default {
        name: "FindingCityComponent",
        props: ["element"],
        methods:{
        }
    }
</script>
<style lang="scss" module>
    .weatherReportContainer{
        .header{
            display: flex;
            font-size: 2rem;
        }
        .imgContainer{
            display: flex;
            justify-content: center;
            img{
                width: 6rem;
                height: 6rem;
            }
            .temperature{
                color: black;
                display: flex;
                align-items: center;
                font-size: 2rem;
                font-weight: bold;
            }
        }
        .body{
            >div{
                margin: 1rem 0rem;
                display: flex;
                justify-content: space-between;
                > div{
                    display: flex;
                    align-items: center;
                }
            }
            img{
                width: 1.5rem;
                height: 1.5rem;

            }
        }
        
    }
</style>