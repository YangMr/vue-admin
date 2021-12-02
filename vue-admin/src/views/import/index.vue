<template>
 <div>
    <upload-excel  :onSuccess="onSuccess" ></upload-excel>
 </div>
</template>

<script>
import UploadExcel from "../../components/UploadExcel"
import {userBatchImport} from "../../api/staff"
import {generateData} from "./utils"
import i18n from "../../i18n"
export default {
 name : "", 
 data(){
  return {

  }
 },
 methods : {
    beforeUpload(file){
      console.log(file)
    },
    async onSuccess(data){

        let results = generateData(data.results);
   
        let res = await userBatchImport(results)

        this.$message.success(results.length + i18n.t('msg.excel.importSuccess'))

         this.$router.push('/user/manage')
    }
 },
 components : {
    UploadExcel
 },
}
</script>


<style scoped>

</style>