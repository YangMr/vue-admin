<template>
 <ul class="context-menu-container">
     <li @click="onRefreshClick">刷新</li>
     <li @click="onCloseRightClick">关闭右侧</li>
     <li @click="onCloseOtherClick">关闭其他</li>
 </ul>
</template>

<script>
export default {
 name : "", 
 props : {
     index : {
         type :String,
     }
 },
 data(){
  return {

  }
 },
 methods : {
     onRefreshClick(){
         this.$router.go(0)
     },
     onCloseRightClick(){
         this.$store.commit("app/removeTagsView",{type : 'right', index : this.index})
     },
     onCloseOtherClick(){
         this.$store.commit("app/removeTagsView",{type : 'other', index : this.index})
     }
 },
 components : {

 },
}
</script>


<style scoped lang="scss">
.context-menu-container{
  position: fixed;
  background: #fff;
  z-index: 3000;
  list-style-type: none;
  padding: 5px 0;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 400;
  color: #333;
  box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
  li {
    margin: 0;
    padding: 7px 16px;
    cursor: pointer;
    &:hover {
      background: #eee;
    }
  }
}
</style>