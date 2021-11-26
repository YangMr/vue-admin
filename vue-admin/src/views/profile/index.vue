<template>
 <div>
     个人中心



    <el-pagination
    
      :current-page="1"
      :page-sizes="[100, 200, 300, 400]"
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400">
    </el-pagination>
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