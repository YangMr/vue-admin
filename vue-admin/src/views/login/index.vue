<template>
    <div class="login-container">
        <el-form class="login-form">
            <!-- title -->
            <div class="title-container">
                <h3 class="title">用户登录</h3>
            </div>

            <!-- username -->
            <el-form-item>
                <el-input type="text" placeholder="username">
                    <i slot="prefix" class="el-input__icon el-icon-user-solid"></i>
                </el-input>
            </el-form-item>  

            <!-- password -->
            <el-form-item>
                <el-input type="password" placeholder="password">
                    <i slot="prefix" class="el-input__icon el-icon-user-solid"></i>
                    <i slot="suffix" class="el-input__icon el-icon-user-solid"></i>
                </el-input>
            </el-form-item>

            <!-- button -->
            <el-form-item>
                <el-button type="primary" style="width:100%;">登录</el-button>
            </el-form-item>

        </el-form>
    </div>
</template>

<script>
export default {
 name : "", 
 data(){
  return {

  }
 },
 components : {

 },
}
</script>


<style scoped>

</style>