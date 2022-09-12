import FindingCityComponent from "FindingCityComponent.vue"
<template>
    <div :class="$style.optionContainer">
        <div :class="$style.header">
            <div :class="$style.title">Setting</div>
            <img :class="$style.ico" src="../assets/gear.svg" @click="openOption($event.target)">
        </div>
        <div :class="$style.body" v-if="active">
            <div>
                <div v-for="element in locationArray" v-bind:key="element.cityName"
                                :class="$style.city" >
                    <div>
                        <img :class="$style.Hamburger" src="../assets/Hamburger.svg" @mousedown="drag($event)">     {{element.name}}
                    </div>
                    <img  :class="$style.trash" src="../assets/trash.svg" @click="$emit('deliteCity',element)">
                </div>
            </div>
            <FindingCityComponent @addLocation="newLocation" placeholder="What is your position"></FindingCityComponent>
        </div>
        
    </div>
</template>

<script lang="ts">
    import {Weather} from "../assets/Classes";
    export default {
        name: "optionComponent",
        props: ["locationArray"],
        data: function(){
            return {
                active: false as boolean,
            }
        },
        methods:{
            between(x:number,min:number,max:number):number{
                var result:number = x;
                if (result > max) {
                    result = max;
                }else if(result < min){
                    result = min;
                }
                return result
            },
            drag(event:any):void{    
                event.preventDefault()     
                var dragStartY:number = event.pageY;
                var moveY:number = 0; 
                var element:any = event.path.find((x:HTMLElement) => x.classList.contains((this as any).$style.city)) as HTMLElement; 
                
                var it:any = this;
                var cityArray:HTMLElement[] = [...element.parentElement.childNodes];
                var length:number = cityArray.length;
                var index:number = cityArray.indexOf(element);
                var newElementIndex:number = 0;
                if(element.parentElement.childNodes.length != 1){
                    element.classList.add((this as any).$style.dragging)  
                    function mouseup(e:MouseEvent) {
                        window.removeEventListener( 'mouseup', mouseup, false );
                        window.removeEventListener( 'mousemove', mousemove, false );
                        element.classList.remove(it.$style.dragging)
                        cityArray.forEach((el:HTMLElement) =>{el.style.transform = "";el.style.transition = "0s"}) 

                        it.locationArray[index].index = newElementIndex > index ?newElementIndex + 0.5 :newElementIndex - 0.5
                        it.$emit('sortCities');
                        it.locationArray.forEach((el:Weather,index:number) => {
                            el.index = index; 
                        });

                        setTimeout(()=>{cityArray.forEach((el:HTMLElement) =>{;el.style.transition = ""})},1)
                    }
                    function mousemove(e:MouseEvent) {
                        var elementHeight:number = (element.parentElement.offsetHeight / length);
                        var parentHeight:number = element.parentElement.offsetHeight;
                        var maxMove:number = parentHeight - (elementHeight * (index+1));
                        var minMove:number = (elementHeight * index )*-1;
                        moveY = it.between(e.pageY - dragStartY,minMove,maxMove);
                        
                        var elementOffsetIndex:number = Math.round(moveY / elementHeight);
                        newElementIndex = it.between(Math.round(moveY / elementHeight) +index,0,length-1);
                        cityArray[newElementIndex].style.transform = `translateY(${(it.between(elementOffsetIndex, -1 , 1) * elementHeight)*-1}px)`
                        switch (true) {
                            case elementOffsetIndex == 0:
                                cityArray.forEach((el:HTMLElement) =>{
                                    if (el != element) el.style.transform = "";
                                })
                                break;
                            case newElementIndex < index:
                                for (let i = 0; i < newElementIndex; i++) {
                                    var el:HTMLElement = cityArray[i];
                                    if (el.style.transform != "") {
                                        el.style.transform = "";
                                    }                             
                                }
                                break;
                            case newElementIndex > index:
                                for (let i = length -1 ; i > newElementIndex; i--) {
                                    var el:HTMLElement = cityArray[i];
                                    if (el.style.transform != "") {
                                        el.style.transform = "";
                                    }                             
                                }
                                break;
                        }
                        element.style.transform = `translateY(${moveY}px)`;       
                    }
                    window.addEventListener( 'mousemove', mousemove, false );
                    window.addEventListener( 'mouseup',   mouseup, false );
                }
            },
            openOption(e:HTMLElement): void{                
                var element:HTMLElement = (e.parentNode as HTMLElement).parentNode as HTMLElement;
                if ((this as any).active) {
                    (this as any).active = false;
                    element.classList.remove((this as any).$style.active);
                    return;
                } 
                (this as any).active = true;
                element.classList.add((this as any).$style.active)
            },
            newLocation(data:Weather){
                (this as any).$emit("addLocation",data);
            }
        }
        
    }
</script>
<style lang="scss" module>
    $shadow: 0px 2px 5px rgba(0, 0, 0, 0.5);
    $bg: #edebe9;
    $gray:#4d4c4b;
    .active{
        margin: -1rem;
        padding: 1rem;
        width: inherit;
        height: inherit;
        background: white;
        position: absolute;
        z-index: 1;
        .title{
            opacity: 1!important;
            user-select: none;
        }
        .ico{
            content: url(../assets/cross.svg);
        }
    }
    .optionContainer{
        margin-bottom: -1.8rem;
        img{
            width: 1.5rem;
            height: 1.5rem;
        }
        .header{
            display: flex;
            justify-content: space-between;
            align-items: center;
            .title{
                opacity: 0;
                font-weight: bold;
            }
        }
        .body{
            
            .dragging{
                transition: 0s!important;
                box-shadow: $shadow;
                z-index: 3!important;
            }
            .city{
                transition: 0.5s;
                padding: 0.5rem;
                margin: 0.5rem;
                background: $bg;
                display: flex;
                justify-content: space-between;
                align-content: center;
                user-select: none;
                color:$gray;
                >div{ 
                    font-size: 1.2rem;
                    align-items: center;
                    display: flex;
                    .Hamburger{
                        margin-right: 0.5rem;
                        cursor: grab;
                    }
                }
                .trash{
                    width: 1.3rem;
                    height: 1.4rem;
                    cursor: pointer;
                }
            }
            
            .place{
                height: 0.5rem;
                margin: 0.5rem;
                &:hover{
                    height: 2rem;
                    background: lightblue;
                }
            }
        }

    }
</style>