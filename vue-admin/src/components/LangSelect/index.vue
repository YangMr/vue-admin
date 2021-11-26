<template>
    <el-dropdown trigger="click" @command="handleLanguage">
      <span class="el-dropdown-link">
        <svg-icon icon="language"></svg-icon>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item :disabled="language == 'zh'" command="zh">中文</el-dropdown-item>
        <el-dropdown-item :disabled="language == 'en'" command="en">English</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
</template>

<script>
import i18n from "../../i18n/index"
export default {
 name : "", 
 data(){
  return {

  }
 },
 computed : {
     language(){
        return this.$store.getters.language
     }
 },
 methods : {
   handleLanguage(val){
       this.$store.commit("app/setLanguage",val)
       
       i18n.locale = this.language
       console.log(i18n)
   }
 },
 components : {

 },
}
</script>


<style scoped>

</style>