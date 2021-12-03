<template>
    <el-dialog :title="title" :visible.sync="visible" width="380px"
    :before-close="handleClose">
        <el-form :rules="rules" ref="formData" :model="formData" label-width="100px" 
            label-position="right" style="width: 300px" status-icon>
            <el-form-item label="新密码：" prop="newPassword">
                <el-input type="password" v-model="formData.newPassword" placeholder="请输入新密码" maxlength="40"></el-input>
            </el-form-item>
            <el-form-item label="确认密码：" prop="repPassword">
                <el-input type="password"  v-model="formData.repPassword" placeholder="请输入确认密码" maxlength="40"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('formData')" size="mini">确定</el-button>
                <el-button size="mini" @click="handleClose">取消</el-button>
            </el-form-item>
            </el-form>
    </el-dialog>
</template>

<script>

import * as api from '@/api/user'

export default {
    props: {
        userId: null, // 用户id
        visible: {
            type: Boolean,
            default: false
        },
        title: {
            type: String,
            default: ''
        },
        remoteClose: Function
    },

    data() {
        // 自定义校验器，校验再次输入的密码是否一致
        var validateRepPassword = (rule, value, callback) => {
            // value就是确认密码，
            if (value !== this.formData.newPassword) {
                callback(new Error('两次输入密码不一致!'))
            } else {
                callback()
            }
        };

        return {
            formData: {}, // 提交的表单数据
            rules: {
                newPassword: [
                    {required: true, message: '新密码不能为空', trigger: 'blur'},
                    {min: 6, max: 30, message: '长度在 6 到 40 个字符', trigger: 'blur'}
                ],
                repPassword: [
                    {required: true, message: '确认密码不能为空', trigger: 'blur'},
                    {validator: validateRepPassword, trigger: 'blur'}
                ]
            }
        }
    },

    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    // 校验通过，提交表单数据
                    // 要将userId进行提交给后台
                    this.formData.userId = this.userId
                    api.updatePassword(this.formData).then(response => {
                        if(response.code === 20000) {
                            this.$message({message: '修改密码成功', type: 'success'})
                            this.handleClose()
                        }else {
                            this.$message({message: response.message, type: 'error'})
                        }
                    })

                } else {
                    // console.log('error submit!!');
                    return false;
                }
            })
        },

        handleClose() {
           this.$refs['formData'].resetFields()
           this.remoteClose() 
        }
    }
}
</script>