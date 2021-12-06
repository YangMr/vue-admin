<template>
  <div class="article-ranking">
    <el-card>
      <el-table :data="articleList" border style="width: 100%">
        <el-table-column type="index" :label="$t('msg.article.ranking')" width="120px"> </el-table-column>
        <el-table-column prop="title" :label="$t('msg.article.title')"> </el-table-column>
        <el-table-column prop="author" :label="$t('msg.article.author')"> </el-table-column>
        <el-table-column prop="publicDate" :label="$t('msg.article.publicDate')"> 
            <template slot-scope="scope">
               {{scope.row.publicDate | relativeTime}}
            </template>
        </el-table-column>
        <el-table-column prop="desc" :label="$t('msg.article.desc')"> </el-table-column>
        <el-table-column :label="$t('msg.article.action')">
          <template>
            <el-button size="mini" type="primary">{{$t('msg.article.show')}}</el-button>
            <el-button size="mini" type="danger">{{$t('msg.article.remove')}}</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-sizes="[5, 10, 20, 50]"
        :page-size="size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import { ArticleList } from "../../api/article";
import {watchSwitchLang} from "../../utils/i18n"
watchSwitchLang(function(){
    initArticleList()
})
export default {
  name: "",
  data() {
    return {
      page: 1,
      size: 10,
      total: 0,
      articleList: [],
    };
  },
  components: {},
  created() {
    this.initArticleList();
    window.initArticleList = this.initArticleList

  },
  methods: {
    async initArticleList() {
      let res = await ArticleList(this.page, this.size);
      this.articleList = res.list;
      this.total = res.total;
      console.log(res);
    },
    handleSizeChange(val){
        this.size = val;
        this.initArticleList()
    },
    handleCurrentChange(val){
        this.page = val;
        this.initArticleList()
    }
  },
};
</script>

<style scoped lang="scss">
.el-pagination{
    margin-top:20px;
    text-align: center;
}
</style>
