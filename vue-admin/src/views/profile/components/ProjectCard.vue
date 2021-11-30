<template>
  <el-card class="box-card">
    <template #header>
      <span>{{$t('msg.profile.introduce')}}</span>
    </template>
    <div class="user-profile">
      <div class="profile-logo">
        <img :src="$store.getters.userInfo.avatar" alt="" />
      </div>
      <div class="profile-title">
          <h4>super-admin</h4>
          <span>超级管理员</span>
      </div>
    </div>

    <div class="project">
        <div class="project-title">
            <svg-icon icon="introduce"></svg-icon>
            <span>{{$t('msg.profile.projectIntroduction')}}</span>    
        </div>
        <div class="project-content">
            {{$t('msg.profile.muted')}}
        </div>
    </div>

    <div class="feature">
        <div class="feature-title">
            <svg-icon icon="reward"></svg-icon>
            <span>{{$t('msg.profile.projectFunction')}}</span>    
        </div>
        <div class="feature-content" v-for="(item,index) in featureArray" :key="index">
            <div class="feature-content-title">
                {{item.title}}
            </div>
            <div class="feature-content-progress">
                <el-progress :percentage="item.percentage" status="success"></el-progress>
            </div>
        </div>
    </div>
  </el-card>
</template>

<script>
export default {
  name: "",
  props : {
      featureArray : {
          type : Array,
          default : []
      }
  },
  data() {
    return {
        
    };
  },
 
  components: {},
};
</script>

<style scoped lang="scss">
// .el-card {
//     height:100vh;
// }
.user-profile {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .profile-logo {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .profile-title{
      margin-top:10px;
      text-align: center;
      span{
          font-size:14px;
          padding-top:10px;
          color : #777;
          
      }
  }

  
}

.project{
    margin-top:10px;
    .project-title{
        padding:10px 0;
        font-weight: 700;
        color : #777;
        border-bottom:1px solid #ccc;

        span{
            margin-left:5px;
        }
    }
    .project-content{
        padding:10px 0;
        font-size:14px;
        color : #777;
    }
  }

  .feature{
    margin-top:10px;
    .feature-title{
        padding:10px 0;
        font-weight: 700;
        color : #777;
        border-bottom:1px solid #ccc;

        span{
            margin-left:5px;
        }
    }
    .feature-content{
        padding:10px 0;
        font-size:14px;
        color : #777;
    }
  }
</style>
