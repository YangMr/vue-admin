<template>
    <div class="login-container">
        <el-form class="login-form">
            <!-- title -->
            <div class="title-container">
                <h3 class="title">用户登录</h3>
            </div>

            <!-- username -->
            <el-form-item>
                <span class="el-icon-user-solid"></span>
                <el-input type="text" placeholder="username"></el-input>
            </el-form-item>  

            <!-- password -->
            <el-form-item>
                <span class="el-icon-user-solid"></span>
                <el-input type="password" placeholder="password"></el-input>
                <span class="el-icon-user-solid showPwd"></span>
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


<style scoped lang="scss">
/*背景的颜色*/
$bg: #2d3a4b;
/*输入框图标的颜色*/
$dark_gray : #889aa4;
/*输入框文字的颜色*/
$light_gray : #eee;
/*光标的颜色*/
$cursor : #fff;   

.login-container{
    width : 100%;
    min-height : 100%;
    background-color : $bg;
    overflow: hidden;

    .login-form{
        width : 520px;
        max-width: 100%;
        margin: 0 auto;
        padding:160px 35px 0;
        overflow : hidden;

        /*修改ui框架样式不生效时,可以使用样式穿透  scss : ::v-deep*/
        ::v-deep .el-form-item{
            border:1px solid rgba(255,255,255,0.1);
            border-radius: 5px;
            background : rgba(0,0,0,0.1);
            color : #454545;

            .el-input{
                display: inline-block;
                height : 47px;
                width :85%;
                input{
                    background : transparent;
                    outline: none;
                    border:0;
                    -webkit-appearance: none;
                    border-radius: 0px;
                    padding: 12px 5px 12px 15px;
                    color : $light_gray;
                    height:47px;
                    caret-color: $cursor;  /*设置光标的颜色*/
                }
            }
        }

        .title-container{
            position: relative;

            .title{
                margin:0 auto 40px auto;
                font-size: 26px;
                color : $light_gray;
                text-align: center;
                font-weight: bold;
            }
        }


    }

    .showPwd{
        position:absolute;
        right : 10px;
        top:7px;
        font-size: 16px;
        color: $dark_gray;
        cursor: pointer;
        user-select: none;
    }
}


</style>