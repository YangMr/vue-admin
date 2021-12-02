<template>
 <div class="upload-excel">
    <div class="btn-upload">
        <el-button :loading="loading" type="primary" @click="handleUpload">
            {{$t('msg.uploadExcel.upload')}}
        </el-button>
    </div>
    <input @change="handleChange" ref="excelUploadInput" class="excel-upload-input" type="file" accept=".xlsx, .xls" />
    <div class="drop" @drop.stop.prevent="handleDrop" @dragover.stop.prevent="handleDragover" @dragenter.stop.prevent="handleDragover">
        <i class="el-icon-upload"></i>
        <span>将文件拖到此处</span>
    </div>
 </div>
</template>

<script>
import XLSX from "xlsx"
import {getHeaderRow,isExcel} from "./utils"
export default {
 name : "", 
 props : {
     beforeUpload : Function,
     onSuccess : Function
 },
 data(){
  return {
      loading : false
  }
 },
 methods : {
     handleDrop(e){
         let files = e.dataTransfer.files;

         if(files.length !== 1){
             this.$message.error("必须要有一个文件");
             return;
         }
         
         let rawFile = files[0];

         if(!isExcel(rawFile)){
             this.$message.error("文件必须是 .xlsx, .xls, .csv 格式")
             return ;
         };

        this.upload(rawFile)

     },
     handleDragover(e){
        e.dataTransfer.dropEffect = 'copy'
     },
     handleUpload(){
        this.loading = true;
        this.$refs["excelUploadInput"].click()
     },
     handleChange(e){
         // 1. 获取到当前上传的文件
         let files = e.target.files[0];
         // 2. 判断有没有获取到上传的文件,如果没有文件,就不能去读取文件的内容
         if(!files) return;

         // 3. 调用读取文件内容的方法 
        this.upload(files)
     },
     //触发上传事件
     upload(files){
         if(!this.beforeUpload){
             this.readerData(files)
             return;
         }

         let before = this.beforeUpload(files);
         if(before){
            this.readerData(files)
            return;
         }
     },
     //读取文件数据的方法
     readerData(rawFile){
         //读取文件内容的时候,让loading加载状态
         this.loading = true;

         //实例化promise
         return new Promise((resolve,reject)=>{
             //1. 实例化FileReader方法,通过这个文件可以读取文件的内容
             let reader = new FileReader();

             //3. 当读取指定文件的内容完成时会出发这个方法,注意: 这个方法一定要写到读取文件内容上面
            reader.onload = (e)=>{
                //4. 获取读取到的文件内容(buffer)
                let data = e.target.result;

                //5. 利用 XLSX 对数据进行解析
                let workbook = XLSX.read(data,{type : "array"});

                //6. 获取第一张表格(工作簿)名称
                let firstSheetName = workbook.SheetNames[0];

                //7. 只读取 Sheet1（第一张表格）的数据
                let worksheet = workbook.Sheets[firstSheetName]

                //8. 读取第一张表格th表头的数据
                let header = getHeaderRow(worksheet)

                //9. 读取第一张表格td的所有数据
                let results = XLSX.utils.sheet_to_json(worksheet)


                //10.  传入解析之后的数据
                this.generateData({header,results})

                //11. 让loading消失
                this.loading = false;

                //12. 执行resolve
                resolve()
            }

            //2. 读取指定文件的内容
            reader.readAsArrayBuffer(rawFile)
         })
     },
     // 10-1 将解析之后的文件数据传递给父组件
     generateData(excelData){
         this.onSuccess && this.onSuccess(excelData)
     }

 },
 components : {

 },
}
</script>


<style scoped lang="scss">
.upload-excel{
    display : flex;
    justify-content : center;
    margin-top:100px;

    .btn-upload,.drop{
        border:1px dashed #bbb;
        width:350px;
        height :160px;
        text-align:center;
        line-height:160px;
    }

    .excel-upload-input{
        display : none;
    }

    .drop{
        display :flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        line-height: 60px;
        color: #bbb;
        i{
            font-size:60px;
            display:block;
        }
    }

}
</style>