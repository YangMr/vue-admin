//自定义密码校验规则
export const validatePassword = (rule, value, callback) => {
  if(value.length < 6) {
    callback(new Error("密码不能小于6位"))
  }else{
    callback()
  }
}