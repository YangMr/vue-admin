<template>
    <div class="app-container">

        <!-- 条件查询 -->
        <el-form :inline="true" :model="query" size="mini">
            <el-form-item label="用户名:">
                <el-input v-model.trim="query.username" ></el-input>
            </el-form-item>
            <el-form-item label="手机号:">
                <el-input v-model.trim="query.mobile" ></el-input>
            </el-form-item>
            <el-form-item>
                <el-button icon="el-icon-search" type="primary" @click="queryData">查询</el-button>
                <el-button icon="el-icon-refresh"  @click="reload">重置</el-button>
                <el-button icon="el-icon-circle-plus-outline" type="primary" @click="openAdd" >新增</el-button>
            </el-form-item>
        </el-form>

        <el-table
            :data="list"
            stripe
            border
            style="width: 100%">
            <el-table-column  align="center" type="index" label="序号" width="60"></el-table-column>
            <el-table-column  align="center" prop="username" label="用户名" ></el-table-column>
            <el-table-column  align="center" prop="nickName" label="昵称" ></el-table-column>
            <el-table-column  align="center" prop="mobile" label="手机号" ></el-table-column>
            <el-table-column  align="center" prop="email" label="邮箱" ></el-table-column>
            <el-table-column  align="center" prop="isAccountNonExpired" label="帐号过期" >
                <!-- (1 未过期，0已过期) -->
                <template slot-scope="scope">
                    <el-tag v-if="scope.row.isAccountNonExpired === 0" type="danger">过期</el-tag>
                    <el-tag v-if="scope.row.isAccountNonExpired === 1" type="success">正常</el-tag>
                </template>
            </el-table-column>
            <el-table-column  align="center" prop="isAccountNonLocked" label="帐号锁定" >
                <!-- (1 未锁定，0已锁定) -->
                <template slot-scope="scope">
                    <el-tag v-if="scope.row.isAccountNonLocked === 0" type="danger">锁定</el-tag>
                    <el-tag v-if="scope.row.isAccountNonLocked === 1" type="success">正常</el-tag>
                </template>
            </el-table-column>
            <el-table-column  align="center" prop="isCredentialsNonExpired" label="密码过期" >
                <!-- (1 未过期，0已过期) -->
                <template slot-scope="scope">
                    <el-tag v-if="scope.row.isCredentialsNonExpired === 0" type="danger">过期</el-tag>
                    <el-tag v-if="scope.row.isCredentialsNonExpired === 1" type="success">正常</el-tag>
                </template>
            </el-table-column>
            <el-table-column  align="center" prop="isEnabled" label="是否可用" >
                <!-- (1 可用，0 删除用户) -->
                <template slot-scope="scope">
                    <el-tag v-if="scope.row.isEnabled === 0" type="danger">已删除</el-tag>
                    <el-tag v-if="scope.row.isEnabled === 1" type="success">可用</el-tag>
                </template>
            </el-table-column>
            <el-table-column  align="center" label="操作" width="330">
                <template slot-scope="scope" v-if="scope.row.isEnabled === 1">
                    <el-button type="success" @click="handleEdit(scope.row.id)" size="mini">编辑</el-button>
                    <el-button type="danger"  @click="handleDelete(scope.row.id)"  size="mini">删除</el-button>
                    <el-button type="primary" @click="handleRole(scope.row.id)" size="mini">设置角色</el-button>
                    <el-button type="primary"  @click="handlePwd(scope.row.id)"  size="mini">密码修改</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!-- 分页组件 -->
         <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="page.current"
            :page-sizes="[10, 20, 50]"
            :page-size="page.size"
            layout="total, sizes, prev, pager, next, jumper"
            :total="page.total">
        </el-pagination>

        <!-- 编辑组件 -->
        <edit :title="edit.title" :formData="edit.formData" :visible="edit.visible" :remoteClose="remoteClose" />

        <el-dialog title="设置角色" :visible.sync="role.visible" width="65%">
            <!-- roleIds是当前用户所拥有的角色id, saveUserRole事件是子组件进行触发提交选择的角色id -->
            <Role :roleIds="role.roleIds" @saveUserRole="saveUserRole"/>
        </el-dialog>

        <!-- 密码修改 -->
        <Password title="修改密码" :userId="pwd.userId" :visible="pwd.visible" :remoteClose="remotePwdClose"/>
    </div>
</template>

<script>

import * as api from '@/api/user'

import Edit from './edit'
import Role from '../role'
import Password from './password'

export default {
    name: 'User', // 和对应路由表中配置的name值一致
    
    components: {Edit, Role, Password},

    data() {
        return {
            list: [],
            page: {
                current: 1,
                size: 20,
                total: 0
            },

            query: {},

            edit: {
                title: '',
                visible: false,
                formData: {}
            },

            role: { // 弹出设置角色组件
                visible: false,
                // 传递到子组件中时,至少会传递一个空数据[], 子组件判断是否有roleIds值 
                roleIds: [], // 封装当前用户所拥有的 角色id

                userId: null // 点击哪个用户，就是哪个用户id,当保存用户角色时，需要使用
            },

            pwd: { // 修改密码组件
                userId: null, //修改哪一个用户
                visible: false
            }
        }
    },

    created() {
        this.fetchData()
    },

    methods: {
        async fetchData() {
            const {data} = await api.getList(this.query, this.page.current, this.page.size)
            this.list = data.records
            this.page.total = data.total
        },

       // val 是切换之后的每页显示多少条
        handleSizeChange(val) {
            this.page.size = val
            this.fetchData()
        },

        // 当页码改变后触发到此方法，val 是当前点击（或输入）的那个页码，
        handleCurrentChange(val) {
            this.page.current = val
            this.fetchData()
        },

        // 条件查询
        queryData() {
            // 将页码变为1，第1页
            this.page.current = 1
            this.fetchData()
        },

        // 重置
        reload() {
            this.query = {}
            this.fetchData()
        },

        // 编辑
        handleEdit(id) {
            api.getById(id).then(response => {
                if(response.code === 20000) {
                    this.edit.formData = response.data
                    this.edit.title  = '编辑'
                    this.edit.visible = true
                }
            })
        },

        // 删除
         handleDelete(id) {
           this.$confirm('确认删除这条记录吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                // 发送删除请求
                api.deleteById(id).then(response => {
                    // 处理响应结果提示
                    this.$message({
                        type: response.code === 20000 ? 'success': 'error',
                        message: response.message
                    })
                })
                // 刷新列表数据
                this.fetchData()
            }).catch(() => {
                // 取消删除，不用理会        
            })
        },

        // 设置角色
        handleRole(id) {
            this.role.userId = id
            api.getRoleIdsByUserId(id).then(response => {
                // 角色id 传递给子组件
                this.role.roleIds = response.data
                // 弹出
                this.role.visible = true
            })
        },

        

        // 弹出新增窗口
        openAdd() {
            this.edit.title = "新增——默认密码与用户名一致"
            this.edit.visible = true
        },

        // 关闭弹窗
        remoteClose() {
            this.edit.formData = {}
            this.edit.visible = false
            this.fetchData()
        },

        // 角色列表子组件会触发此方法来保存当前用户选择的角色id
        saveUserRole(roleIds) {
            // console.log('saveUserRole', roleIds)
            // 保存用户角色信息
            api.saveUserRole(this.role.userId, roleIds).then(response => {
                if(response.code === 20000) {
                    this.$message( {message: '分配角色成功', type: 'success'} )
                    this.role.visible = false
                }else {
                    this.$message( {message: '分配角色失败', type: 'error'} )
                }
            })
        },

        // 关闭密码窗口
        remotePwdClose() {
            this.pwd.userId = null
            this.pwd.visible = false
            this.fetchData()
        },

        // 密码修改
        handlePwd(id) {
            // 要修改的用户id
            this.pwd.userId = id
            this.pwd.visible = true
        },
    }
}
</script>