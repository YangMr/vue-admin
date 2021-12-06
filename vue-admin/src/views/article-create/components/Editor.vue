<template>
 <div class="editor-container">
    <div id="editor-box">

    </div>
    <div class="bottom">
        <el-button type="primary" @click="onSubmitClick">提交</el-button>   
    </div>
 </div>
</template>

<script>
import E from 'wangeditor'
import {commitArticle} from "./commit"
export default {
 name : "", 
 props : {
     title : {
         type : String,
         required : true
     }
 },
 data(){
  return {
      editor : null
  }
 },
 mounted() {
     let el = document.getElementById("editor-box")
    this.initEditor(el)
 },
 components : {

 },
 methods : {
     initEditor(el){
        this.editor = new E(el);
        this.editor.create();
     },
     onSubmitClick(){
        let title = this.title;
        let content = this.editor.txt.html();
        commitArticle(title,content)
        this.$message.success("文章创建成功")
        this.$emit("Success")
       this.editor.txt.html("");
     }
 }
}
</script>


<style scoped lang="scss">
.bottom{
    margin-top:20px;
    text-align: right;
}
</style>