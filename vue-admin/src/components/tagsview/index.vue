<template>
    <div class="tags-view-container">
        <router-link @contextmenu.native.prevent="openMenu($event,index)" :style="{background : isActive(item) ? $store.getters.cssVar.menuBg : '', borderColor :isActive(item) ? $store.getters.cssVar.menuBg : '' }" :class="isActive(item) ? 'active' : ''"  class="tags-view-item" :to="item.fullPath" v-for="(item,index) in $store.getters.tagsViewList" :key="item.path">
            {{generateTitle(item.meta.title)}}
            <i class="el-icon-close" @click.stop.prevent="onCloseClick(index)" v-if="!isActive(item)"></i>
        </router-link>
        <context-menu :index='selectIndex.toString()' v-show="visiable" :style="{left : x + 'px', top : y + 'px'}"></context-menu>
    </div>
</template>

<script>
import {generateTitle} from "../../utils/i18n"
import ContextMenu from "./ContextMenu.vue"
export default {
 name : "", 
 data(){
  return {
      visiable : false,
      x : "",
      y : "",
      selectIndex : ""
  }
 },
 watch : {
     visiable : function(newValue){
         if(newValue){
             document.body.addEventListener("click",this.closeMenu)
         }else{
             document.body.removeEventListener("click",this.closeMenu)
         }  
     }
 },
 methods : {
     generateTitle,
     isActive(item){
        return item.path == this.$route.path
    },
    openMenu(event,index){
        this.x = event.clientX;
        this.y = event.clientY
        this.selectIndex = index;
        this.visiable = true;
    },
    onCloseClick(i){
        this.$store.commit("app/removeTagsView",{type : 'index', index : i})
    },
    closeMenu(){
        this.visiable = false;
    }


 },
 components : {
     ContextMenu
 },
}
</script>


<style scoped lang="scss">
.tags-view-container{
  height: 34px;
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);

  .tags-view-item{
      display: inline-block;
      position: relative;
      cursor: pointer;
      height: 26px;
      line-height: 26px;
      border: 1px solid #d8dce5;
      color: #495060;
      background: #fff;
      padding: 0 8px;
      font-size: 12px;
      margin-left: 5px;
      margin-top: 4px;
  }

  .active{
    color: #fff;
     &::before {
          content: '';
          background: #fff;
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          position: relative;
          margin-right: 4px;
        }
  }

  .el-icon-close {
        width: 16px;
        height: 16px;
        line-height: 10px;
        vertical-align: 2px;
        border-radius: 50%;
        text-align: center;
        transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
        transform-origin: 100% 50%;
        &:before {
          transform: scale(0.6);
          display: inline-block;
          vertical-align: -3px;
        }
        &:hover {
          background-color: #b4bccc;
          color: #fff;
        }
      }
}
</style>