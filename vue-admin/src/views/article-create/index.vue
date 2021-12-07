<template>
  <div>
    <el-card class="article-create">
      <el-input
        class="title-input"
        clearable
        v-model="title"
        placeholder="请输入文章标题"
      ></el-input>
      <el-tabs v-model="activeName" >
        <el-tab-pane label="markdown" name="markdown">
          <markdown :title="title" :id="this.id" :content="content" @Success="success"></markdown>
        </el-tab-pane>
        <el-tab-pane label="富文本" name="editor">
          <editor :title="title" @Success="success"></editor>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import markdown from "./components/Markdown.vue"
import editor from "./components/Editor.vue"
import {ArticleDetail} from "../../api/article"
export default {
  name: "",
  data() {
    return {
      title: "",
      id : "",
      content : "",
      activeName : "markdown"
    };
  },
  created() {

    if(this.$route.params.id){
      this.id = this.$route.params.id;
       this.getArticleDetail()
    }
    
   

    
  },
  methods : {
    success(){
      this.title = ""
    },
    async getArticleDetail(){
      const res = await ArticleDetail(this.id)
      if(this.id){
        this.title = res.title
        this.content = res.content
      }
    }
  },
  components: {markdown,editor},
};
</script>

<style scoped lang="scss">
.article-create {
  margin-top: 10px;
}
.title-input {
  margin-bottom: 20px;
}
</style>
