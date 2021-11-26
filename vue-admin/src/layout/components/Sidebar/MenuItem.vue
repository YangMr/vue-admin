<template>
 <div>
     <i v-if="icon.includes('el-icon')" :class="icon"></i>
     <svg-icon v-else :icon="icon"></svg-icon>
     <span slot="title">{{generateTitle(title)}}</span>
 </div>
</template>

<script>
import {generateTitle} from "../../../utils/i18n"
export default {
 name : "MenuItem",
 props : {
     icon : {
         type : String,
         default : ""
     },
     title : {
         type : String,
         default : ""
     }
 }, 
 data(){
  return {

  }
 },
 components : {

 },
 methods : {
     generateTitle
 }
}
</script>


<style scoped>

</style>