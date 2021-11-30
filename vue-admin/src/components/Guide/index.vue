<template>
 <div>
    <svg-icon id="guide-start" @click.native="onClick" icon="guide"></svg-icon>
 </div>
</template>

<script>
import Driver from 'driver.js'
import 'driver.js/dist/driver.min.css'
import steps from "./step"
import i18n from "../../i18n/index"
export default {
 name : "", 
 data(){
  return {
      driver : null
  }
 },
 methods : {
     onClick(){
        this.driver.defineSteps(steps(i18n))
        this.driver.start()
     }
 },
 mounted(){
     this.driver = new Driver({
         //禁止点击蒙版关闭
        allowClose: false,
        closeBtnText : i18n.t('msg.guide.close'),
        nextBtnText : i18n.t('msg.guide.next'),
        prevBtnText : i18n.t('msg.guide.prev')
     })
 },
 components : {

 },
}
</script>


<style scoped>

</style>