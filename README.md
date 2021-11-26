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

    1. 安装vue-i18n

        npm install vue-i18n --save

    2. 操作

       在src目录下,创建i18n文件夹,在在该文件夹内创建index.js

        //1. 引入i8n
        import VueI18n from 'vue-i18n'
        import Vue from "vue"

        //2. 创建数据源

        const messages = {
            en: {
            msg: {
                test: 'hello world'
            }
            },
            zh: {
            msg: {
                test: '你好世界'
            }
            }
        }

        //3. 控制语言切换的环境变量
        const locale = 'zh'


        //4. 注册i8n
        Vue.use(VueI18n)

        //5. 初始化i18n
        let i18n = new VueI18n({
            messages,
            locale
        })

        //6. 导出i18n的实例对象
        export default i18n    


        //7. main.js里面将i18n实例挂载到vue实例上面

        new Vue({
            router,
            store,
            i18n,
            render: (h) => h(App),
        }).$mount("#app");


        //8. 在页面展示国际化的数据
          {{$t('msg.test')}}