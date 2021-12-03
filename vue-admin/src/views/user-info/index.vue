<template>
  <div class="user-info-container">
    <el-card class="print-box">
      <el-button type="primary" v-print="printObj" 
        >打印</el-button
      >
    </el-card>

    <el-card id="userInfoBox">
      <div class="user-info-box">
        <h2 class="title">员工信息</h2>
      </div>

      <div class="header">
        <el-descriptions class="margin-top" :column="2" border>
          <el-descriptions-item>
            <template slot="label"> 姓名 </template>
            {{ staffDetail.username }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label"> 性别 </template>
            {{ staffDetail.gender }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label"> 民族 </template>
            {{ staffDetail.nationality }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label"> 手机号 </template>
            {{ staffDetail.mobile }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label"> 居住地 </template>
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label"> 入职时间 </template>
            {{ $dateFilter(staffDetail.openTime, "YYYY-MM-DD") }}
          </el-descriptions-item>
          <el-descriptions-item :span="2">
            <template slot="label"> 备注 </template>
            <el-tag v-for="(item, index) in staffDetail.remark" :key="index">{{
              item
            }}</el-tag>
          </el-descriptions-item>
          <el-descriptions-item :span="2">
            <template slot="label"> 联系地址 </template>
            {{ staffDetail.address }}
          </el-descriptions-item>
        </el-descriptions>
        <el-image
          class="avatar"
          :src="staffDetail.avatar"
          :preview-src-list="[staffDetail.avatar]"
        ></el-image>
      </div>
      <div class="body">
        <el-descriptions direction="vertical" :column="1" border>
          <el-descriptions-item label="经历">
            <!-- <p v-for="(item,index) in staffDetail.experience" :key="index">{{item}}</p> -->
            <ul>
              <li v-for="(item, index) in staffDetail.experience" :key="index">
                <span
                  >{{ $dateFilter(item.startTime, "YYYY-MM") }} ----
                  {{ $dateFilter(item.endTime, "YYYY-MM") }}</span
                >
                <span>{{ item.title }}</span>
                <span>{{ item.desc }}</span>
              </li>
            </ul>
          </el-descriptions-item>
          <el-descriptions-item label="专业">{{
            staffDetail.major
          }}</el-descriptions-item>
          <el-descriptions-item label="荣耀">{{
            staffDetail.glory
          }}</el-descriptions-item>
        </el-descriptions>
      </div>
      <div class="footer">签字：___________日期:___________</div>
    </el-card>
  </div>
</template>

<script>
import { staffDetail } from "../../api/staff";
export default {
  name: "",
  data() {
    return {
      id: "",
      staffDetail: {},
      loadingPrint: false,
      printObj: {
        //打印的区域id
        id: "userInfoBox",
        //打印内容标题
        popTitle: "imooc-vue-element-admin",

      },
    };
  },
  created() {
    this.id = this.$route.params.id;
    console.log("id:", this.id);
    this.initStaffDetail();
  },
  methods: {
    //初始化员工详情数据的方法
    async initStaffDetail() {
      let res = await staffDetail(this.id);
      console.log("res=>", res);
      this.staffDetail = res;
    },
    
  },
  components: {},
};
</script>

<style scoped lang="scss">
.user-info-container {
  padding-top: 10px;
}
.print-box {
  text-align: right;
  margin-bottom: 20px;
}
.title {
  text-align: center;
  margin-bottom: 18px;
}
.header {
  display: flex;

  .el-descriptions {
    flex: 1;
  }

  .avatar {
    width: 187px;
    box-sizing: border-box;
    padding: 30px 20px;
    border: 1px solid #ebeef5;
    border-left: none;
  }
  .el-tag {
    margin-right: 13px;
  }
}
.body {
  ul {
    list-style-type: none;

    span {
      margin-right: 60px;
    }
  }
}
.footer {
  margin-top: 42px;
  text-align: right;
}
</style>
