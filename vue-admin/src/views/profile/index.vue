<template>
  <div class="my-container">
    <el-row :gutter="20">
      <el-col :span="6">
        <project-card :featureArray="featureArray" class="user-card"></project-card>
      </el-col>
      <el-col class="user-card" :span="18">
        <el-card>
          <el-tabs v-model="activeName">
            <el-tab-pane :label="$t('msg.profile.feature')" name="feature">
              <feature :featureArray="featureArray"></feature>
            </el-tab-pane>
            <el-tab-pane :label="$t('msg.profile.chapter')" name="chapter">
              <chapter :chapterArray="chapterArray"></chapter>
            </el-tab-pane>
            <el-tab-pane :label="$t('msg.profile.author')" name="author">
              <author></author>
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {feature as userFeature, chapter as userChapter} from "../../api/user";
import ProjectCard from "./components/ProjectCard.vue";
import feature from "./components/feature.vue";
import chapter from "./components/chapter.vue";
import author from "./components/author.vue";
import {watchSwitchLang} from "../../utils/i18n"

watchSwitchLang(function(){
  getFeature()
  getChapter()
})
export default {
  name: "",
  data() {
    return {
      activeName: "feature",
      featureArray : [],
      chapterArray : []
    };
  },
   created(){
      this.getFeature();
      this.getChapter();

      window.getFeature = this.getFeature;
      window.getChapter = this.getChapter;
  },
  methods : {
      //定义获取项目功能数据方法
      async getFeature(){
          let res = await userFeature()
          console.log("功能:==》",res)
          this.featureArray = res;
      },
      //定义获取项目章节数据方法
      async getChapter(){
           let res = await userChapter()
           console.log("章节:==》",res)
           this.chapterArray = res;
      }
  },
  components: {
    ProjectCard,
    feature,
    chapter,
    author,
  },
};
</script>

<style scoped lang="scss">
.my-container{
  padding:10px 0;
}
</style>
