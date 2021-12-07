<template>
  <div class="">
    
    <el-card class="staff-header">
      <el-button type="primary" @click="onImportExcelClick">{{$t('msg.excel.importExcel')}}</el-button>
      <el-button type="danger" @click="onToExcelClick">{{$t('msg.excel.exportExcel')}}</el-button>
    </el-card>

    <el-card>
      <!-- 员工列表展示 -->
      <el-table :data="staffList" border style="width: 100%">
        <el-table-column type="index" label="#"> </el-table-column>
        <el-table-column prop="username" :label="$t('msg.excel.name')"> </el-table-column>
        <el-table-column prop="mobile" :label="$t('msg.excel.mobile')"> </el-table-column>
        <el-table-column prop="avatar" :label="$t('msg.excel.avatar')">
          <template slot-scope="scope">
            <div class="user-avatar">
              <el-avatar :size="50" :src="scope.row.avatar"></el-avatar>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="role" :label="$t('msg.excel.role')">
          <template slot-scope="scope">
            <div>
              <el-tag v-for="item in scope.row.role" :key="item.id">{{
                item.title
              }}</el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="openTime" :label="$t('msg.excel.openTime')">
          <template slot-scope="scope">
            <div>
              {{ scope.row.openTime | formatTime }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="date" :label="$t('msg.excel.action')" width="240">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="toUserInfo(scope.row._id)">{{$t('msg.excel.show')}}</el-button>
            <el-button size="mini" type="info" @click="openRole(scope.row._id)">{{$t('msg.excel.showRole')}}</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.row)">{{$t('msg.excel.remove')}}</el-button>
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

    <ExportExcel v-model="exportToExcelVisible"></ExportExcel>
    <roles :roleInfo="roleInfo" @Success="success"   v-model="roleVisible"></roles>
  </div>
</template>

<script>
import dayjs from "dayjs";
import i18n from "../../i18n"
import ExportExcel from "./components/Export2Excel.vue"
import { getStaffList,deleteStaff } from "../../api/staff";
import {watchSwitchLang} from "../../utils/i18n"
import roles from "./components/roles.vue"
import {staffRole} from "../../api/staff"
watchSwitchLang(function(){
  console.log("test")
  initGetStaffList()
})
export default {
  name: "userManage",
  data() {
    return {
      page: 1,
      size: 2,
      total: 0,
      roleInfo : {},
      staffList: [],
      roleVisible : false,
      exportToExcelVisible : false
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
    window.initGetStaffList = this.getStaffList
    //调用获取员工列表接口
    this.getStaffList();
    
    // console.log("dayjs=>",dayjs(1433088000000).format('YYYY-MM-DD'))
    // console.log("dayjs=>",dayjs(1559318400000).format('YYYY-MM-DD'))
  },
  methods: {
    async openRole(id){

      this.roleVisible = true;
      const res = await staffRole(id)
      this.roleInfo = res
    },
    //初始化员工列表数据
    async getStaffList() {
      let res = await getStaffList(this.page, this.size);
      this.staffList = res.list;
      this.total = res.total;
    },
    onToExcelClick(){
      this.exportToExcelVisible = true;
    },
    toUserInfo(id){
      this.$router.push(`/user/info/${id}`)
    },
    handleSizeChange(val) {
      this.size = val;
      this.getStaffList();
    },
    handleCurrentChange(val) {
      this.page = val;
      this.getStaffList();
    },
    onImportExcelClick(){
      this.$router.push("/user/import")
    },
    async handleDelete(row){
      this.$confirm(`${i18n.t('msg.excel.dialogTitle1')} ${row.username} ${i18n.t('msg.excel.dialogTitle2')}？`, {
          confirmButtonText: i18n.t('msg.excel.confirm'),
          cancelButtonText: i18n.t('msg.excel.close'),
          type: 'warning'
        }).then(async () => {
          let res = await deleteStaff(row._id)

          if(res == null){
            this.$message({
              type: 'info',
              message: i18n.t('msg.excel.removeSuccess')
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
    },
    success(){
      this.getStaffList()
    }
  },
  components : { 
    ExportExcel,
    roles
  }
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
