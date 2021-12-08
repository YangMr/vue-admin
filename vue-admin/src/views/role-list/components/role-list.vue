<template>
  <el-dialog title="分配权限"  :visible.sync="visiableDialog">
    <el-tree
      :data="premissinData"
      show-checkbox
      node-key="id"
      check-strictly
      default-expand-all
      :props="defaultProps"
      ref="tree"
    >
    </el-tree>

    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="submitPermisssion">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import {permissionList} from "../../../api/permission"
import {rolePremissionList,distributePermission} from "../../../api/role"
export default {
  name: "",
  props: {
   
    id : {
        type : String || Number,
        required: true,
    },
    loadRoleList : Function
  },
  data() {
    return {
        visiableDialog : false,
        premissinData: [],
         defaultProps: {
          children: 'children',
          label: 'permissionName'
        }
    };
  },
 
  watch : {
    //   premissionVisiable : {
    //       handler : function(newValue){
    //           if(newValue){
               
    //               this.loadPermissinList()
    //           }
    //       },
    //       immediate: true
    //   },
      id : {
          handler : function(newValue){
 
             if(newValue){
                 this.loadRolePremissionList(newValue)
             }
          },
          immediate: true
      }
  },
  methods: {
    async loadPermissinList(){
        let res = await permissionList()
        this.premissinData = res
    },
    async loadRolePremissionList(id){
        let res = await rolePremissionList(id)
        this.$refs["tree"].setCheckedKeys(res)
    },
    async submitPermisssion(){
        const treeKeys = this.$refs["tree"].getCheckedKeys();
        const res = await distributePermission(this.id,treeKeys)
        this.$message.success("角色权限更新成功")
        this.close()
        this.loadRoleList()
    },
    open(){
        this.visiableDialog = true;
        this.loadPermissinList()
    },
    close(){
        this.visiableDialog = false;
    },
   
  },
  components: {},
};
</script>

<style scoped></style>
