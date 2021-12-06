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
          <markdown :title="title" @Success="success"></markdown>
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
export default {
  name: "",
  data() {
    return {
      title: "",
      activeName : "markdown"
    };
  },
  methods : {
    success(){
      this.title = ""
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
