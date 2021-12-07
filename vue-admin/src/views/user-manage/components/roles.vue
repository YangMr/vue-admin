<template>
  <div class="roles">
    <el-dialog title="配置角色" @close="handleClose" :visible.sync="value">

      <el-checkbox-group v-model="checkList">
        <el-checkbox v-for="(item,index) in roleList" :key="index" :label="item.title">{{item.title}}</el-checkbox>
      </el-checkbox-group>

      <div slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="handleSubmitRole">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { roleList } from "../../../api/role";
import {updateStaffRole} from "../../../api/staff"
export default {
  name: "",
  props: {
    value: {
      type: Boolean,
      required: true,
    },
    roleInfo : {
        type : Object,
        required : true

    }
  },
  data() {
    return {
      roleList: [],
      checkList : [],
      roleData : []
    };
  },
  watch : {
      roleInfo : {
          handler : function(newValue){
              if(newValue){
                   this.checkList = newValue.role.map(item=>item.title)
              }
            
          },
      },
      checkList : {
          handler : function(newValue){
              let that = this;
             this.roleData = []
              let selectRole =  this.roleList.filter(item=>{
                return that.checkList.includes(item.title)
             });

             this.roleData.push(...selectRole)
          }
      }
  },
  created() {
    this.loadRoleList();
  },
  methods: {
    handleClose() {
      this.$emit("input", false);
    },
    async loadRoleList() {
      const res = await roleList();
      this.roleList = res;
    },
    async handleSubmitRole(){
        let id = this.roleInfo._id;
        let res = await updateStaffRole(id,this.roleData);
        this.$message.success("用户角色更新成功");
        this.$emit("Success")
        this.handleClose()
    }
  },
  components: {},
};
</script>

<style scoped></style>
