<template>
 <div>
     <!-- 数组: 
        push
        pop
        shift
        unshift
        reserver
        sort
        splice
        join
        slice
        concat

        ... -->


        <ul class="tag">
            <li v-for="(item,index) in arr" :key="index" @contextmenu.prevent="test($event,index)">
                <span>{{item.meta.title}}</span>
                <i class="el-icon-close close" v-if="arr.length !== 1" @click.stop.prevent="del(index)"></i>

               
            </li>
             <div class="drowdown" v-if="showDrowdown" :style="{left : x  - 300 + 'px', top : y - 50 + 'px'}">
                    <div class="drowdown-item" @click="refresh">刷新</div>
                    <div class="drowdown-item" @click="closeRight('right')">关闭右侧</div>
                    <div class="drowdown-item" @click="closeOuther('outher')">关闭其他</div>
                </div>
        </ul>

      

        {{x}} -- {{y}}
 </div>
</template>

<script>
export default {
 name : "", 
 data(){
  return {
      x : "",
      y : "",
      showDrowdown : false,
      selectIndex : "",
      arr : [
          {
              path : "/profile",
              name : "profile",
              meta : {
                  title : "个人中心"
              }
          },
          {
              path : "/profile",
              name : "profile",
              meta : {
                  title : "员工管理"
              }
          },
          {
              path : "/profile",
              name : "profile",
              meta : {
                  title : "角色管理"
              }
          },
          {
              path : "/profile",
              name : "profile",
              meta : {
                  title : "权限管理"
              }
          },
          {
              path : "/profile",
              name : "profile",
              meta : {
                  title : "文章管理"
              }
          }
      ]
  }
 },

 watch : {
     showDrowdown : function(newValue){
         console.log(newValue);
         let that = this;
         if(newValue){
             document.body.addEventListener("click",function(){
                 that.closeMenu()
             })
         }else{
             document.body.removeEventListener("click",that.closeMenu)
         }
     }
 },
 methods : {
     del(i){
         this.arr.splice(i,1)
     },
     test(e,index){
         this.x = e.clientX;
         this.y = e.clientY;
         this.showDrowdown = true;
         this.selectIndex = index
     },
     closeMenu(){
         console.log("aaa")
         this.showDrowdown = false;
         
     },
     refresh(){
         this.$router.go(0)
     },
     removeArr(type,index){
         if(type == "right"){
             this.arr.splice(index + 1,this.arr.length - index );
         }
         if(type == 'outher'){
             this.arr.splice(0,index);
             console.log(this.arr)
             this.arr.splice(1, this.arr.length - 1)
         }
     },
     closeRight(type){
         this.removeArr(type,this.selectIndex)
     },
     closeOuther(type){
         this.removeArr(type,this.selectIndex)
     }

 },
 components : {

 },
}
</script>


<style scoped lang="scss">
.tag{
    border-bottom:1px solid #ccc;
    list-style: none;
    display : flex;
    padding:10px 0;
     position: relative;
    li{
         margin :0 10px;
         font-size:12px;
         border:1px solid #333;
         padding:5px 10px;
         background : #fff;
         cursor : pointer;
        

         .close{
             font-size:12px;
             margin-left:5px;
             display : inline-block;
             width:15px;
             height:15px;
             border-radius: 50%;
            
            text-align: center;
            line-height:15px;

             &:hover{
                 background : red;
                color : #fff;
             }
         }
    }
}

.drowdown{
    box-shadow: 1px 1px 1px 1px #333;
    width:100px;
    font-size:12px;
    background-color: #fff;
    padding:10px;
    position: absolute;


    .drowdown-item{
        height:25px;
        line-height:25px;
        cursor: pointer;
        &:hover{
            background-color: #eee;
        }
    }
}
</style>