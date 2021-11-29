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


   