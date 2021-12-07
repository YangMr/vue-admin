<template>
  <div class="article-ranking">
    <el-card class="header">
      <div class="dynamic-box">
        <span class="title">{{ $t("msg.article.dynamicTitle") }}</span>
     
        <el-checkbox-group v-model="selectLabel">
          <el-checkbox v-for="(item,index) in dynamicData" :key="index" :label="item.label">{{item.label}}</el-checkbox>
        </el-checkbox-group>
      </div>
    </el-card>

    <el-card>
      <el-table ref="tableRef" :data="articleList" border style="width: 100%">
        <el-table-column
          v-for="(item, index) in tableColumns"
          :prop="item.prop"
          :key="index"
          :label="item.label"
          :width="item.width"
          :formatter="item.formatter"
        >
          <template v-if="item.prop == 'action'" #default="{ row }">
            <el-button size="mini" type="primary" @click="handleToDetail(row._id)">{{ $t("msg.article.show") }}</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(row)">{{
              $t("msg.article.remove")
            }}</el-button>
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
import { ArticleList,DeleteArticle,ArticleRanking } from "../../api/article";
import { watchSwitchLang } from "../../utils/i18n";
import i18n from "../../i18n/index";
import dayjs from "../../utils/dayjs";
import Sortable from 'sortablejs'
watchSwitchLang(function () {
  initArticleList();
});
export default {
  name: "",
  data() {
    return {
      page: 1,
      size: 10,
      total: 0,
      articleList: [],
      // 声明 table 的列数据
       tableColumns : [],
      //复选框选中的列的数据 , 被勾选的列数据
      selectLabel: [],
      //源数据  动态列数据
      dynamicData: [
        {
          label: i18n.t("msg.article.ranking"),
          width: "120px",
          prop : "ranking"
        },
        {
          label: i18n.t("msg.article.title"),
          prop: "title",
        },
        {
          label: i18n.t("msg.article.author"),
          prop: "author",
        },
        {
          label: i18n.t("msg.article.publicDate"),
          prop: "publicDate",
          formatter: function (value) {
            value = value.publicDate
            if (!isNaN(value)) {
              value = parseInt(value);
            }
            return dayjs().to(dayjs(value));
          },
        },
        {
          label: i18n.t("msg.article.desc"),
          prop: "desc",
        },
        {
          label: i18n.t("msg.article.action"),
          prop: "action",
        },
      ],
    };
  },
  watch : {
    selectLabel : {
      handler : function(val){
        this.tableColumns = []
        const selectData = this.dynamicData.filter((item,index)=>{
         return val.includes(item.label)
        })
        this.tableColumns.push(...selectData)
      }
    }
  },
  components: {},
  created() {
    this.initArticleList();
    window.initArticleList = this.initArticleList;
  },
  mounted() {
    this.initSelectDynamicLabel();
    console.log(this.selectDynamicLabel);
    this.initSortable()
  },

  methods: {
    initSortable(){
       let el = this.$refs["tableRef"].$el.querySelectorAll(".el-table__body-wrapper > table > tbody")[0]

       Sortable.create(el,{
         ghostClass : "sortStyle",
          onEnd : async (event) =>{
           await ArticleRanking({
            initRanking:parseInt(this.articleList[event.oldIndex].ranking),
            finalRanking:parseInt(this.articleList[event.newIndex].ranking)
           })
           this.$message.success("文章排名修改成功")
           this.articleList = [];
           this.initArticleList()
          }
       })
    },
    handleDelete(row){
       this.$confirm(`确定删除文章${row.title}, 吗?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          const res = await DeleteArticle(row._id);
          
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.page = 1;
          this.initArticleList()
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
    async initArticleList() {
      
      let res = await ArticleList(this.page, this.size);
      this.articleList = res.list;
   
      this.total = res.total;
      console.log(res);
    },
    handleSizeChange(val) {
      this.size = val;
      this.initArticleList();
    },
    handleCurrentChange(val) {
      this.page = val;
      this.initArticleList();
    },
    initSelectDynamicLabel() {
      this.selectLabel = this.dynamicData.map(item => item.label);
    },
    handleToDetail(id){
      this.$router.push(`/article/${id}`)
    }
  },
};
</script>

<style scoped lang="scss">
.el-pagination {
  margin-top: 20px;
  text-align: center;
}
.header {
  margin-top: 10px;
  padding: 10px;
  margin-bottom: 20px;
  .dynamic-box {
    display: flex;
    align-items: center;
    .title {
      margin-right: 20px;
      font-size: 14px;
      font-weight: bold;
    }
  }
}

::v-deep .sortStyle{
  opacity: 0.6;
  color: #fff !important;
  background: #304156 !important;
}
</style>
