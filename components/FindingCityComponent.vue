<template>
    <div>
        <div :class="$style.title"> Add location:</div>
        <div :class="$style.findingContainer">
            <div :class="$style.inputContainer">
                <input type="text" v-model="location" :placeholder="placeholder" v-on:keyup.enter="validation" v-on:keyup.up="selectItem('up')" v-on:keyup.down="selectItem('down')">
                <div :class="$style.citysContainer">
                    <p @click="validation(element)" v-for="element,idx in locationArray" v-bind:key="idx+element.lat" >{{element.name}}</p>
                </div>
            </div>
            <img src="../assets/enter.svg" alt="">
        </div>
    </div>
</template>

<script lang="ts">
    import {City,Weather} from "../assets/Classes";

    export default {
        name: "FindingCityComponent",
        props: ["placeholder"],
        data: function(){
            return {
                location:"" as string,
                locationArray:[] as City[],
            }
        },
        watch:{
            location(cur: string): void{
                if (cur != "") {
                    (this as any).updateCitysArray(cur);
                    return                    
                }
                (this as any).locationArray = [];
            }
        },
        methods:{
            selectItem(direction:string):void{
                if ((this as any).locationArray.lenght-1) {
                    return
                }
                var item:HTMLElement|null = document.querySelector(`.${(this as any).$style.inputContainer} .${(this as any).$style.selected}`);
                var offset:number = direction == 'down' ? 1: -1;
                if (item == null){
                    var childselector:string = direction == 'down' ? "first-child": "last-child"
                    item = document.querySelector(`.${(this as any).$style.inputContainer} p:${childselector}`) as HTMLElement;
                    item.classList.add((this as any).$style.selected)
                    return
                }
                var parent:HTMLElement = item.parentElement as HTMLElement;
                let allItems:HTMLElement[] = Array.from(parent.childNodes) as HTMLElement[];
                var index:number = allItems.indexOf(item);
                var newIndex:number = index + offset;
                item.classList.remove((this as any).$style.selected)
                switch (true) {
                    case newIndex < 0:
                        newIndex = parent.childNodes.length - 1
                        break;
                    case newIndex > parent.childNodes.length - 1:
                        newIndex = 0
                        break;
                }
                allItems[newIndex].classList.add((this as any).$style.selected)
            },
            validation(argument:City|null):void{
                if (argument instanceof City) {
                    this.findInfo(argument.lat,argument.lon);
                    return
                }
                if ((this as any).locationArray.lenght == 0) {
                    return
                }
                var item:any = null;
                var input:HTMLElement = document.querySelector(`.${(this as any).$style.inputContainer} .${(this as any).$style.selected}`) as HTMLElement;
                if (input == null) {
                    item = (this as any).locationArray[0];
                } else{
                    item = (this as any).locationArray.find( (e:City) => e.name == input.innerText);
                }
                
                this.findInfo(item.lat,item.lon);

            },
            findInfo(lat:number,lon:number): void{
                let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=e8157b3a99bf0d5c82e7c5b17138366c&units=metric`;
                fetch(url).then(res => res.json())
                    .then(data => {
                        (this as any).$emit("addLocation",new Weather(data));
                        (this as any).location = "";
                    })
            },
            updateCitysArray(str: string): void{
                let url = `http://api.openweathermap.org/geo/1.0/direct?q=${str}&limit=5&appid=e8157b3a99bf0d5c82e7c5b17138366c`;
                fetch(url).then(res  => res.json())
                    .then(data => {
                        var cities:City[] = [];
                        data.forEach((e:object) => {
                            cities.push(new City(e)) 
                        });
                        (this as any).locationArray = cities;
                    }) 
            }
        }
    }
</script>
<style lang="scss" module>
    $shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
    $gray: #b4b4b4;
    $lightgray: #eeeeee;
    .title{
        font-weight: bold;
    }
    .findingContainer{
        display: flex;
        margin: 0.2rem 0.5rem;
        .inputContainer{
            display: inline;
            align-items: center;
            width: -webkit-fill-available;  
            border-radius: 4px; 
            background-color: white;
            box-shadow: $shadow;
            input {
                width: inherit;
                padding: 0.5rem;
                margin: auto;
                border: lightgray;
                border-radius: 4px;
                &::placeholder {
                    color: $gray;
                }
                &:focus {
                    outline: 0;
                    box-shadow: $shadow;
                }
            }
            .selected{
                background: #eeeeee;;
            }
            p{
                cursor: pointer;
                padding: 0.5rem;
                margin: 0;
                &:hover{
                    background-color: $lightgray;
                }
            }
        }
        img{
            height: 1.75rem;
            width: 1.75rem;
            padding-left: 0.5rem;
        }
    }
</style>