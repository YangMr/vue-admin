import  i18n from "../../i18n"
//自定义密码校验规则
export const validatePassword = (rule, value, callback) => {
  if(value.length < 6) {
    callback(new Error(i18n.t('msg.login.passwordRule')))
  }else{
    callback()
  }
}