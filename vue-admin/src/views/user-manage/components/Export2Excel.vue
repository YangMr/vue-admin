<template>
  <el-dialog title="导出为 excel" @close="closed" :visible.sync="value" width="30%">
    <el-form :model="excelForm">
      <el-input v-model="excelForm.name" autocomplete="off"></el-input>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="closed">取 消</el-button>
      <el-button type="primary" @click="onConfirm">导 出</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { getAllUser } from "../../../api/staff";
import { USER_KEY } from "./Export2ExcelConstants";
export default {
  name: "",
  props: {
    value: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      excelForm: {
        name: "员工管理表",
      },
    };
  },
  methods: {
    closed() {
      this.$emit("input", false);
    },
    //将json数据处理成二维数组
    formatJson(headers, rows) {
      return rows.map((item) => {
        return Object.keys(headers).map((key) => {
          // 角色特殊处理
          if (headers[key] === "role") {
            const roles = item[headers[key]];

            return JSON.stringify(roles.map((role) => role.title));
          }
          if(headers[key] == "openTime"){
            return this.$dateFilter(item[headers[key]],"YYYY-MM-DD")
          }
          return item[headers[key]];
        });
      });
    },
    async onConfirm() {
      //用户列表的数据
      let res = (await getAllUser()).list;
      const excel = await import("../../../utils/Export2Excel")
      const data = this.formatJson(USER_KEY,res)
      excel.export_json_to_excel({
        header : Object.keys(USER_KEY),
        data,
        filename : this.excelForm.name,
        bookType : "xlsx"
      })
      this.closed();
    },
  },
  components: {},
};
</script>

<style scoped lang="scss">
.el-dialog {
  .el-dialog__body {
    height: 40px;
  }
}
</style>
