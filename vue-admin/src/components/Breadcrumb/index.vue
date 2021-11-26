<template>
  <el-breadcrumb class="breadcrumb" separator="/">
    <!-- [] 2   1 == 1-->
    <el-breadcrumb-item v-for="(item,index) in breadcrumbData" :key="index" >
        <span v-if="index==breadcrumbData.length - 1" class="no-redirect">{{generateTitle(item.meta.title)}}</span>
         <a v-else class="redirect" @click.prevent="onLinkClick(item)">
             {{generateTitle(item.meta.title) }}
        </a>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
import {generateTitle} from "../../utils/i18n"
export default {
  name: "",
  data() {
    return {
      breadcrumbData: [],
    };
  },
  watch: {
    $route: {
      handler(newRouter) {
       this.breadcrumbData = this.$route.matched.filter(item=>{
            return item.meta && item.meta.title
        });

      },

      immediate: true,
    },
  },
  methods: {
      onLinkClick(item){
          console.log("--",item.path)
          this.$router.push(item.path)
      },
      generateTitle
  },
  components: {},
};
</script>

<style scoped lang="scss">
.breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;
  position: relative;
  top: 2px;

  .no-redirect {
    ::v-deep .el-breadcrumb__inner {
      color: #97a8be;
      cursor: text;
    }
  }
}
</style>
