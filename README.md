# vue-admin
后台管理系统通用模版

## 项目环境搭建

- 创建项目

- 集成element-ui

## 登录解决方案

- 创建登录页面

- 配置登录页面路由

- 实现登录页面结构

- 实现登录页面UI样式

- svg图标解决方案

- 登录表单验证方案

- 密码明文与密文的切换

- 通用后台登录方案

    - 配置环境变量

    - 封装axios

    - 封装api

    - vuex内定义登录方法

    - 本地缓存方案

    - 响应数据处理

    - 登录后操作

    - 登录鉴权


- 动态菜单实现方案

    - 用户登录

    - 调用获取权限列表的接口

    - 获取到权限列表的数据,并将权限列表的数据转化为路由数据

    - 获取到完整的路由表

        router.options.routes

    - 将完整的路由表数据处理成菜单所需要的数据

    - 将处理之后的菜单数据通过menu菜单进行动态渲染


- 菜单收缩功能

    控制的开关:    flag : true   展开    flag : false

        当菜单展开的时候,我们点击按钮就让菜单进行收缩
        当菜单是收缩的时候,我们点击按钮就让菜单展开


- vue项目中使用国际化(vue-i18n) 

    - 具体实现思路

        1. 安装vue-i8n

           ``` 
            npm install vue-i18n --save
           ``` 

        2. 在src目录下创建i8n文件夹

        3. 在i18n文件夹内创建index.js

            ```
                //1. 引入i8n
                    import VueI18n from 'vue-i18n'
                    import Vue from "vue"
                    import store from "../store"

                    //引入自定义的语言包
                    import zh from "./lang/zh"
                    import en from "./lang/en"

                    //处理element 国际化
                    import enLocale from 'element-ui/lib/locale/lang/en'
                    import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
                    import ElementLocale from 'element-ui/lib/locale'


                    //2. 创建数据
                    const messages = {
                        en: {
                        msg: {
                            ...en
                        },
                        ...enLocale
                        },
                        zh: {
                        msg: {
                            ...zh
                        },
                        ...zhLocale
                        }
                    }

                    //3. 控制语言切换的环境变量
                    const locale =  store.getters.language;

                    //4. 注册i8n
                    Vue.use(VueI18n)

                    //5. 初始化i18n
                    let i18n = new VueI18n({
                        messages,
                        locale
                    })



                    ElementLocale.i18n((key, value) => i18n.t(key, value))

                    //6. 导出i18n的实例对象
                    export default i18n
            ```

        4. 将i18n初始化的实例挂载到vue的实例上面

            ```
                import i18n from "./i18n"

                

                new Vue({
                    router,
                    store,
                    i18n,
                    render: (h) => h(App),
                }).$mount("#app");

            ```

        5. 在vuex里面定义语言的切换

            ```
                //app.js
                import { LANG } from "../../constant"
                import {setItem,getItem} from "../../utils/storage"
                export default {
                    namespaced: true,
                    state : {
                        sidebarOpened : true,
                        language : getItem(LANG) || "en"
                    },
                    mutations : {
                        triggerSidebarOpened(state){
                            state.sidebarOpened = !state.sidebarOpened
                        },
                        /*设置国际化*/
                        setLanguage(state,lang){
                            state.language = lang;
                            setItem(LANG,lang)
                        }
                    },
                    actions :  {

                    }
                }

                //getter.js
                 language : state => state.app.language

            ```    

        6. 封装国际化组件
            6.1 在components目录下创建LangSelect文件夹

            6.2 在该文件夹内创建index.vue

            6.3 实现国际化组件的封装

                ```
                <template>
                    <el-dropdown trigger="click" @command="handleLanguage">
                    <span class="el-dropdown-link">
                        <svg-icon icon="language"></svg-icon>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item :disabled="language == 'zh'" command="zh">中文</el-dropdown-item>
                        <el-dropdown-item :disabled="language == 'en'" command="en">English</el-dropdown-item>
                    </el-dropdown-menu>
                    </el-dropdown>
                </template>

                <script>
                import i18n from "../../i18n/index"
                export default {
                name : "", 
                data(){
                return {

                }
                },
                computed : {
                    language(){
                        return this.$store.getters.language
                    }
                },
                methods : {
                handleLanguage(val){
                    this.$store.commit("app/setLanguage",val)
                    
                    i18n.locale = this.language
                    
                    this.$message.success(i18n.t('msg.toast.switchLangSuccess'))
                }
                },
                components : {

                },
                }
                </script>


                <style scoped>

                </style>
                ```

        7. 使用t函数处理我们需要进行中英文切换的内容




- 导出excel

  /***
       *
       * 导出 excel
       *  -1 : 点击导出这个按钮, 触发对应的方法
       * 
       *  0. 这个方法里面调用获取用户列表接口
       * 
       * 
       * 
       * 
       *  1. 下载Export2Excel.js  这个文件的作用可以将json结构的数据转化为excel所需要的数据
       *
       *  2. 复制到utils这个文件夹
       *
       *  3. 下载npm i file-saver@2.0.5 --save 这个  这个插件的作用就是将excel文件下载下来
       *
       *  4. 在导出excel方法里面导入下载的Export2Excel.js文件
       *      const excel = await import("../../../utils/Export2Excel")
       *  5. 复制将json数据转化为二维数组的方法
       * 
       *      formatJson(headers, rows) {
                return rows.map((item) => {
                  return Object.keys(headers).map((key) => {
                    // 角色特殊处理
                    if (headers[key] === "role") {
                      const roles = item[headers[key]];

                      return JSON.stringify(roles.map((role) => role.title));
                    }
                    return item[headers[key]];
                  });
                });
              },

       *  6. 创建一个excel表头映射表, 里面定义的是表头所需要的字段,以及对应所需要的数据的属性名
       * 
       *    export const USER_KEY = {
                "姓名" : "username",
                "联系方式" : "mobile",
                "角色" : "role",
                "开通时间" : "openTime",
                "入职时间" : ""
            }
       * 
       *  7. 调用转化为二维数组的方法
       * 
       *      const data = formatJson(USER_KEY,res)
       * 
       *   8. 调用Export2Excel.js 文件的export_json_to_excel这个方法, 将表头的映射表, 二维数组,文件名称, 是否自动列表,文件的类型等这几个参数
       *    传递到export_json_to_excel这个方法里面,就可以实现导出excel表格了
       *      
       *    excel.export_json_to_excel({
              header : Object.keys(USER_KEY),
              data,
              filename : this.excelForm.name,
              bookType : "xlsx"
            })
            

            9. 解决下载的excel文件内的开通为时间戳的问题

                解决方案: 在formatJson这个方法里面做一个判断,拿到对应的时间戳,将时间戳转化为年月日
       * 
                 formatJson(headers, rows) {
                    return rows.map((item) => {
                      return Object.keys(headers).map((key) => {
                        // 角色特殊处理
                        if (headers[key] === "role") {
                          const roles = item[headers[key]];

                          return JSON.stringify(roles.map((role) => role.title));
                        }
                        if(headers[key] == "openTime"){
                          return this.$dateFilter(item[headers[key]],"YYYY-MM-DD")
                        }

                        return item[headers[key]];
                      });
                    });
                  },
       * 
       */

   