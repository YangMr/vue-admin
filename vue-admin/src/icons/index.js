import Vue from "vue";
//0. 引入SvgIcon组件
import SvgIcon from "../components/SvgIcon"
//1. 查找svg目录下的所有图标
const svgRequire = require.context("./svg",false,/\.svg$/);
//2. 获取svg目录下的所有图标并加载
svgRequire.keys().forEach(svgIcon=>svgRequire(svgIcon))
//3. 全局注册引入SvgIcon组件   
Vue.component("svg-icon",SvgIcon)