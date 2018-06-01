<template>
  <section>
    <!--工具条-->
    <el-col :span="24"
            class="toolbar"
            style="padding-bottom: 0px;">
      <el-form :inline="true"
               :model="add"
               :rules="addRules"
               ref="add">
        <el-form-item prop="newProvinceName">
          <el-input v-model="add.newProvinceName"
                    placeholder="请输入城市名">
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                     @click.native="addProvince"
                     :loading="editLoading">
            添加
          </el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <!--列表-->
    <el-table :data="province"
              highlight-current-row
              v-loading="listLoading"
              style="width: 100%;">
      <el-table-column type="index" width="60">
      </el-table-column>
      <el-table-column prop="id" label="ID" width="200" sortable>
      </el-table-column>
      <el-table-column prop="name" label="省份名称" width="200" show-overflow-tooltip>
      </el-table-column>
      <el-table-column label="操作" width="250">
        <template slot-scope="scope">
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
      <el-pagination layout="prev, pager, next"
                     @current-change="handleCurrentChange"
                     :page-size="pageSize"
                     :total="total"
                     style="float:right;">
      </el-pagination>
    </el-col>

    <!--编辑界面-->
    <el-dialog title="编辑"
               :visible.sync="editFormVisible"
               v-model="editFormVisible"
               :close-on-click-modal="false">
      <el-form :model="editForm" label-width="100px" :rules="editFormRules" ref="editForm">
        <el-form-item label="城市名" prop="cityName">
          <el-input v-model="editForm.name" auto-complete="off"></el-input>
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
/* eslint-disable no-unused-vars */
import { editProvince, addProvince, delProvince, getProvince } from '../../api/api'
export default {
  mounted () {
    this.setProvince()
  },
  data () {
    return {
      province: [],
      add: {
        newProvinceName: ''
      },
      addRules: {
        newProvinceName: [
          { required: true, message: '请输入省份名称', trigger: 'blur' }
        ]
      },
      total: 1,
      page: 1,
      pageSize: 20,
      listLoading: false,
      editFormVisible: false, // 编辑界面是否显示
      editLoading: false,
      editFormRules: {
        name: [
          { required: true, message: '请输入省份名称', trigger: 'blur' }
        ]
      },
      // 编辑界面数据
      editForm: {
        name: ''
      }
    }
  },
  methods: {
    setProvince () {
      this.listLoading = true
      getProvince()
        .then(data => {
          if (data.header.isSuccess === 0) {
            data = data.body
            this.total = Math.ceil(data.length / this.pageSize) + 1
            this.province = data.slice((this.page - 1) * (this.pageSize), this.page * this.pageSize)
          } else {
            alert(data.header.msg)
          }
          this.listLoading = false
        })
        .catch(() => {
          console.log('api.getProvince 连接服务器失败')
        })
    },
    handleCurrentChange (val) {
      this.page = val
      this.setProvince()
    },
    // 删除
    handleDel: function (index, row) {
      this.$confirm('确认删除该记录吗?', '提示', {
        type: 'warning'
      }).then(() => {
        this.listLoading = true
        this.$message({
          message: `删除${row.name}成功`,
          type: 'success'
        })
        setTimeout(() => { this.listLoading = false }, 1000)
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
            this.editLoading = false
            this.editFormVisible = false
          })
        }
      })
    },
    addProvince () {
      this.$refs.add.validate((valid) => {
        if (valid) {
          this.$confirm('确认提交吗？', '提示', {})
            .then(() => {
              this.editLoading = true
              setTimeout(() => {
                for (let i of this.province) {
                  if (i.name === this.add.newProvinceName) {
                    this.$message({
                      message: '添加城市已存在',
                      type: 'warning'
                    })
                    this.editLoading = false
                    return
                  }
                }
                this.$refs['add'].resetFields()
                this.editLoading = false
              }, 1000)
            }).catch(() => {})
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
