<template>
 <div class="article-detail">
    <div class="detail-header">
        <h2>{{detailData.title}}</h2>
        <div class="description">
            <div class="description-info">
                <span class="author">作者：{{detailData.author}}</span>
                <span class="time">发布时间：{{detailData.publicDate|relativeTime}}</span>
            </div>
            <span class="edit">编辑</span>
        </div>
    </div>
    <div class="detail-content" v-html="detailData.content"></div>
 </div>
</template>

<script>
import {ArticleDetail} from "../../api/article"
export default {
 name : "", 
 data(){
  return {
      detailData : {}
  }
 },
 created() {
     let params = this.$route.params.id
     this.initArticleDetail(params)
 },
 methods : {
     async initArticleDetail(params){
         const res = await ArticleDetail(params);
         console.log(res)
         this.detailData = res;
     }
 },   
 components : {

 },
}
</script>


<style scoped lang="scss">
.detail-header{
    border-bottom:1px solid #ccc;
    padding:10px 0 20px 0;

    h2{
        text-align: center;
        font-size: 22px
    }

    .description{
        display:flex;
        align-items: center;
        justify-content: space-between;
        margin-top:50px;
        
        .author{
             font-size: 14px;
            color: #555666;
            margin-right: 20px;
        }

        .time{
             font-size: 14px;
            color: #999aaa;
            margin-right: 20px;
        }

        .edit{
            font-size:14px;
            color : blue;
            cursor: pointer;
        }
    }
}
.detail-content{
    padding:20px 0;
    font-size: 14px;
}
</style>