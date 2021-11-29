<template>
  <div class="app-main">
    <router-view></router-view>
  </div>
</template>

<script>
import {isTags} from "../../utils/tags"

export default {
  name: "",
  data() {
    return {};
  },
  watch : {
    $route : {
      handler : function(newValue,oldValue){
        if(isTags(newValue.path)){
          let {fullPath,meta,path} = newValue;
          this.$store.commit("app/addTagsViewList",{
            fullPath,
            meta,
            path
          })
        }
        
      },
      immediate : true
    }
  },
  components: {
   
  },
};
</script>

<style scoped lang="scss">
.app-main {
  min-height: calc(100vh - 84px);
  width: 100%;
  position: relative;
  overflow: hidden;
  padding: 95px 20px 20px 20px;
  box-sizing: border-box;
}
</style>
