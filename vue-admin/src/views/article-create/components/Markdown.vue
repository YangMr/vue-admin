<template>
 <div class="markdown-container">
     <div id="markdown-box">
       
    </div>
    <div class="bottom">
        <el-button type="primary" @click="onSubmitClick">提交</el-button>   
    </div>
 </div>
</template>

<script>
import MkEditor from '@toast-ui/editor'
import '@toast-ui/editor/dist/toastui-editor.css'
import '@toast-ui/editor/dist/i18n/zh-cn'
import {commitArticle} from "./commit"
export default {
 name : "", 
 data(){
  return {
      mkEditor : null
  }
 },
 mounted() {
     this.initEditor()
 },
 watch: {
     "$store.getters.language" : function(){
        const htmlStr = this.mkEditor.getHTML()
        this.mkEditor.destroy()
        this.initEditor()
        this.mkEditor.setHTML(htmlStr)
     }
 },
 methods : {
     initEditor(){
         this.mkEditor = new MkEditor({
             el : document.getElementById("markdown-box"),
             height : "500px",
             previewStyle : "vertical",
             language : this.$store.getters.language == "zh" ? "zh-CN" : "en"
         })
     },
     onSubmitClick(){
        let title = this.title;
        let content = this.mkEditor.getHTML()
        commitArticle(title,content)
        this.$message.success("文章创建成功")
        this.$emit("Success")
        this.mkEditor.setHTML("")
     }
 },
 components : {

 },
}
</script>


<style scoped>
.bottom{
    text-align: right;
    margin-top:20px;
}
</style>