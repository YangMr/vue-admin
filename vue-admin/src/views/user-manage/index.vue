<template>
  <div class="">
    <!-- 1. 封装api
    2. 调用封装的api
    3. 获取请求到的数据
    4. 渲染数据 -->
    <el-card class="staff-header">
      <el-button type="primary">excel导入</el-button>
      <el-button type="danger">excel导出</el-button>
    </el-card>

    <el-card>
      <!-- 员工列表展示 -->
      <el-table :data="staffList" border style="width: 100%">
        <el-table-column type="index" label="#"> </el-table-column>
        <el-table-column prop="username" label="姓名"> </el-table-column>
        <el-table-column prop="mobile" label="联系方式"> </el-table-column>
        <el-table-column prop="avatar" label="头像">
          <template slot-scope="scope">
            <div class="user-avatar">
              <el-avatar :size="50" :src="scope.row.avatar"></el-avatar>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="role" label="角色">
          <template slot-scope="scope">
            <div>
              <el-tag v-for="item in scope.row.role" :key="item.id">{{
                item.title
              }}</el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="openTime" label="开通时间">
          <template slot-scope="scope">
            <div>
              {{ scope.row.openTime | formatTime }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="date" label="操作" width="240">
          <template slot-scope="scope">
            <el-button size="mini" type="primary">查看</el-button>
            <el-button size="mini" type="info">角色</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 员工列表分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-sizes="[2, 5, 10, 20]"
        :page-size="size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>

    <!-- 1. 自己封装一个日期格式化的方法, 可以用老师封装的库
    2. 插件 :  moment.js   其他日期格式化插件 -->

    <!-- 1. 安装
    2. 引入 -->
  </div>
</template>

<script>
import dayjs from "dayjs";
import { getStaffList,deleteStaff } from "../../api/staff";
export default {
  name: "userManage",
  data() {
    return {
      page: 1,
      size: 2,
      total: 0,
      staffList: [],
    };
  },
  filters: {
    formatTime(val) {
      if (!isNaN(val)) {
        val = parseInt(val);
      }
      return dayjs(val).format("YYYY-MM-DD");
    },
  },
  created() {
    //调用获取员工列表接口
    this.getStaffList();

    // console.log("dayjs=>",dayjs(1433088000000).format('YYYY-MM-DD'))
    // console.log("dayjs=>",dayjs(1559318400000).format('YYYY-MM-DD'))
  },
  methods: {
    //初始化员工列表数据
    async getStaffList() {
      let res = await getStaffList(this.page, this.size);
      this.staffList = res.list;
      this.total = res.total;
    },
    handleSizeChange(val) {
      this.size = val;
      this.getStaffList();
    },
    handleCurrentChange(val) {
      this.page = val;
      this.getStaffList();
    },
    async handleDelete(row){
      this.$confirm(`确定要删除用户 ${row.username} 吗？`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          let res = await deleteStaff(row._id)

          if(res == null){
            this.$message({
              type: 'info',
              message: "删除成功"
            });  
          }
          this.page = 1;
          this.getStaffList();
  
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      
    }
  },
};
</script>

<style lang="scss" scoped>
.user-avatar {
  display: flex;
  align-items: center;
  justify-content: center;
}
.el-tag {
  margin-right: 3px;
}
.staff-header {
  text-align: right;
  margin : 10px 0 20px 0;
}
.el-pagination{
  margin-top:20px;
  text-align: center;
}
</style>
