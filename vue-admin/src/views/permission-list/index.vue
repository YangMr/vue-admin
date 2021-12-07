<template>
  <div class="premission-list">
    <el-card>
      <el-table
        :data="permissionList"
        style="width: 100%; margin-bottom: 20px"
        row-key="id"
        border
        default-expand-all
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      >
        <el-table-column prop="permissionName" label="权限名称" sortable width="180"> </el-table-column>
        <el-table-column prop="permissionMark" label="权限标识" sortable width="180"> </el-table-column>
        <el-table-column prop="permissionDesc" label="权限描述"> </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { permissionList } from "../../api/permission";
import {watchSwitchLang} from "../../utils/i18n"
watchSwitchLang(function(){
    loadPermissionList()
})
export default {
  name: "",
  data() {
    return {
      permissionList: [],
    };
  },
  created() {
    window.loadPermissionList = this.loadPermissionList
    this.loadPermissionList();
  },
  methods: {
    async loadPermissionList() {
      const res = await permissionList();
      console.log(res);
      this.permissionList = res;
    },
  },
  components: {},
};
</script>

<style scoped lang="scss">
.premission-list {
  margin-top: 10px;
}
</style>
