<template>
 <div>
     <i v-if="icon.includes('el-icon')" :class="icon"></i>
     <svg-icon v-else :icon="icon"></svg-icon>
     <span slot="title">{{title}}</span>
 </div>
</template>

<script>
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
}
</script>


<style scoped>

</style>