<template>
    <svg-icon id="screenfull-start" @click.native="onToggle" :icon="isScreenFull ? 'exit-fullscreen' : 'fullscreen' "></svg-icon>
</template>

<script>
import screenfull from "screenfull"
export default {
 name : "", 
 data(){
  return {
      isScreenFull : false
  }
 },
 methods : {
     onToggle(){
         screenfull.toggle()
     },
     change(){
         this.isScreenFull = screenfull.isFullscreen
     }
 },
 mounted() {
    screenfull.on("change",this.change) 
 },
 components : {

 },
}
</script>


<style scoped>

</style>