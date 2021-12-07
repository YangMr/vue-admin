<template>
  <div class="role-list">
    <el-card>
      <el-table :data="roleList" border style="width: 100%">
        <el-table-column prop="id" label="序号" width="120px"> </el-table-column>
        <el-table-column prop="title" label="名称" > </el-table-column>
        <el-table-column prop="describe" label="描述"> </el-table-column>
        <el-table-column label="操作"> 
            <template #default>
               <el-button type="primary" size="mini">分配权限</el-button>
            </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { roleList } from "../../api/role";
import {watchSwitchLang} from "../../utils/i18n"
watchSwitchLang(function(){
    loadRoleList()
})
export default {
  name: "",
  data() {
    return {
      roleList: [],
    };
  },
  created() {
    window.loadRoleList = this.loadRoleList
    this.loadRoleList();
  },
  methods: {
    async loadRoleList() {
      const res = await roleList();
      console.log(res);
      this.roleList = res;
    },
  },
  components: {},
};
</script>

<style scoped lang="scss">
.role-list {
  margin-top: 10px;
}
</style>
