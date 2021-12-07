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
import {editArticleDetail} from "../../../api/article"
import {commitArticle} from "./commit"
import {watchSwitchLang} from "../../../utils/i18n"
watchSwitchLang(function(){
  
    resetEditor()
})

export default {
 name : "", 
 props : {
     id : {
         type : String || Number,
         default : ""
     },
     title : {
         type : String,
         required : true
     },
     content : {
         type : String
     }
 },
 data(){
  return {
      mkEditor : null
  }
 },
 created(){
     window.resetEditor = this.resetEditor
 },
 mounted() {
     this.initEditor()

     
     
 },
//  watch: {
//      "$store.getters.language" : function(){
        // const htmlStr = this.mkEditor.getHTML()
        // this.mkEditor.destroy()
        // this.initEditor()
        // this.mkEditor.setHTML(htmlStr)
//      }
//  },
// watch: {
//     "content" : {
//         handler : function(val){
//             if(val){
//                     this.mkEditor.setHTML(val)
//             }
//             console.log("test123")
//         },
//         immediate: true
//     }
// },

 watch: {
     "content" : {
         handler : function(val){
             if(val){
                  this.mkEditor.setHTML(val)
             }
            
         },
         immediate: true 
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
    async  onSubmitClick(){
        if(this.id){
            const res = await editArticleDetail({
                id : this.id,
                title : this.title,
                content : this.mkEditor.getHTML(),
            })
            this.$message.success("文章修改成功")
            this.$emit("Success")
            this.mkEditor.setHTML("")
            return;
        }else{
             let title = this.title;
            let content = this.mkEditor.getHTML()
            commitArticle(title,content)
            this.$message.success("文章创建成功")
            this.$emit("Success")
            this.mkEditor.setHTML("")
        }
       
     },
     resetEditor(){
            const htmlStr = this.mkEditor.getHTML()
            this.mkEditor.destroy()
            this.initEditor()
            this.mkEditor.setHTML(htmlStr)
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