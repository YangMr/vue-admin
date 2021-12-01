<template>
 <div>
    <upload-excel :onSuccess="onSuccess" ></upload-excel>
 </div>
</template>

<script>
import UploadExcel from "../../components/UploadExcel"
export default {
 name : "", 
 data(){
  return {

  }
 },
 methods : {
    beforeUpload(file){
        
    },
    onSuccess(data){
        console.log(data)
    }
 },
 components : {
    UploadExcel
 },
}
</script>


<style scoped>

</style>