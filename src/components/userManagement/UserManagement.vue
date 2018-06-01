<template>
  <section>
    <!--工具条-->
    <el-col :span="24"
            class="toolbar"
            style="padding-bottom: 0px;">
      <el-form :inline="true"
               :model="filters">
        <el-form-item>
          <el-input v-model="filters.phone"
                    placeholder="手机">
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                     @click="getUsers">
            查询
          </el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <!--列表-->
    <el-table :data="users"
              highlight-current-row
              v-loading="listLoading"
              @selection-change="selsChange"
              style="width: 100%;">
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column type="index" width="60">
      </el-table-column>
      <el-table-column prop="phone" label="手机" width="120" sortable>
      </el-table-column>
      <el-table-column prop="email" label="邮箱" width="180" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="nickname" label="昵称" width="100" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="100">
      </el-table-column>
      <el-table-column prop="gender" label="性别" width="100" :formatter="formatSex" sortable>
      </el-table-column>
      <el-table-column prop="birth" label="生日" width="100" sortable>
      </el-table-column>
      <el-table-column prop="IDNumber" label="身份证" width="180" sortable show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="address" label="地址" min-width="120" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="joinDate" label="加入时间" min-width="100" sortable>
      </el-table-column>
      <el-table-column prop="accountStatus" label="状态" min-width="70" sortable>
      </el-table-column>
      <el-table-column label="操作" width="250">
        <template slot-scope="scope">
          <el-button size="small"
                     type="warning"
                     @click="handleEdit(scope.$index, scope.row)"
                     :plain="scope.row.accountStatus === 'OK' ? true : false">
            {{scope.row.accountStatus === 'OK'? '冻结' : '解冻' }}
          </el-button>
          <el-button size="small"
                     @click="handleEdit(scope.$index, scope.row)">
            编辑
          </el-button>
          <el-button type="danger"
                     size="small"
                     @click="handleDel(scope.$index, scope.row)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--工具条-->
    <el-col :span="24" class="toolbar">
      <el-button type="danger"
                 @click="batchRemove"
                 :disabled="this.sels.length===0">
        批量删除
      </el-button>
      <el-pagination layout="prev, pager, next"
                     @current-change="handleCurrentChange"
                     :page-size="20"
                     :total="total"
                     style="float:right;">
      </el-pagination>
    </el-col>
    <!--编辑界面-->
    <el-dialog title="编辑"
               :visible.sync="editFormVisible"
               v-model="editFormVisible"
               :close-on-click-modal="false">
      <el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
        <el-form-item label="手机" prop="phone">
          <el-input v-model="editForm.phone" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="editForm.password" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editForm.email" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="昵称" prop="nickname">
          <el-input v-model="editForm.nickname" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="editForm.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group v-model="editForm.gender">
            <el-radio class="radio" :label="1">男</el-radio>
            <el-radio class="radio" :label="0">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="生日" prop="birth">
          <el-date-picker type="date" placeholder="选择日期" v-model="editForm.birth"></el-date-picker>
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-input v-model="editForm.address" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="身份证" prop="IDNumber">
          <el-input v-model="editForm.IDNumber" disabled auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="editFormVisible = false">
          取消
        </el-button>
        <el-button type="primary"
                   @click.native="editSubmit"
                   :loading="editLoading">
          提交
        </el-button>
      </div>
    </el-dialog>
  </section>
</template>

<script>
import util from '@/common/js/util'
import { removeUser, editUser } from '../../api/api'
export default {
  data () {
    return {
      filters: {
        phone: ''
      },
      users: [],
      total: 0,
      page: 1,
      listLoading: false,
      sels: [], // 列表选中列
      editFormVisible: false, // 编辑界面是否显示
      editLoading: false,
      editFormRules: {
        phone: [
          { required: true, message: '请输入手机号码', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      },
      // 编辑界面数据
      editForm: {
        id: 0,
        phone: '',
        email: '',
        nickname: '',
        name: '',
        gender: -1,
        birth: '',
        address: '',
        joinDate: '',
        accountStatus: '',
        password: '',
        IDType: '身份证',
        IDNumber: '532822199405247133'
      }
    }
  },
  methods: {
    // 性别显示转换
    formatSex: function (row, column) {
      return row.gender === 1 ? '男' : row.gender === 0 ? '女' : '未知'
    },
    handleCurrentChange (val) {
      this.page = val
      this.getUsers()
    },
    // 获取用户列表
    getUsers () {
      let para = {
        page: this.page,
        phone: this.filters.phone
      }
      console.log(para)
      this.listLoading = true
      setTimeout(() => {
        let data = require('./data2')
        this.total = data.total
        this.users = data.users
        this.listLoading = false
      }, 1000)
    },
    // 删除
    handleDel: function (index, row) {
      this.$confirm('确认删除该记录吗?', '提示', {
        type: 'warning'
      }).then(() => {
        this.listLoading = true
        // NProgress.start()
        let para = { id: row.id }
        removeUser(para).then((res) => {
          this.listLoading = false
          // NProgress.done()
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          this.getUsers()
        })
      }).catch(() => {
      })
    },
    // 显示编辑界面
    handleEdit: function (index, row) {
      this.editFormVisible = true
      this.editForm = Object.assign({}, row)
    },
    // 编辑
    editSubmit: function () {
      this.$refs.editForm.validate((valid) => {
        if (valid) {
          this.$confirm('确认提交吗？', '提示', {}).then(() => {
            this.editLoading = true
            // NProgress.start()
            let para = Object.assign({}, this.editForm)
            para.birth = (!para.birth || para.birth === '') ? '' : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd')
            editUser(para).then((res) => {
              this.editLoading = false
              // NProgress.done()
              this.$message({
                message: '提交成功',
                type: 'success'
              })
              this.$refs['editForm'].resetFields()
              this.editFormVisible = false
              this.getUsers()
            })
          })
        }
      })
    },
    selsChange: function (sels) {
      this.sels = sels
    },
    // 批量删除
    batchRemove: function () {
      this.$confirm('确认删除选中记录吗？', '提示', {
        type: 'warning'
      }).then(() => {
      }).catch(() => {
      })
    }
  },
  mounted () {
    this.getUsers()
  }
}
</script>

<style scoped>

</style>
