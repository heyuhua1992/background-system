<template>
  <section>
    <!--工具条-->
    <el-col :span="24"
            class="toolbar"
            style="padding-bottom: 0px;">
      <el-form :inline="true"
               :model="filters">
        <el-form-item>
          <el-select v-model="filters.province"
                     filterable
                     @change="showCity"
                     placeholder="请选择">
            <el-option
              v-for="item in provinces"
              :key="item.name"
              :label="item.name"
              :value="item.name">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="newCity">
          <el-input v-model="filters.newCity"
                    :disabled="!filters.province ? true : false"
                    placeholder="请输入新的城市名">
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                     @click.native="addCity">
            添加
          </el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <!--列表-->
    <el-table :data="citys"
              highlight-current-row
              v-loading="listLoading"
              @selection-change="selsChange"
              style="width: 100%;">
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column type="index" width="60">
      </el-table-column>
      <el-table-column prop="city" label="城市名" width="180" show-overflow-tooltip>
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
      <el-button type="danger"
                 @click="batchRemove"
                 :disabled="this.sels.length===0">
        批量删除
      </el-button>
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
        <el-form-item label="城市名" prop="city">
          <el-input v-model="editForm.city" auto-complete="off"></el-input>
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
import { getProvince, getCity } from '../../api/api'
export default {
  mounted () {
    getProvince()
      .then(data => {
        if (data.header.isSuccess === 0) {
          this.provinces = data.body
        } else {
          alert(data.header.msg)
        }
      })
      .catch(() => {
        console.log('api.getProvince 连接服务器失败')
      })
  },
  data () {
    return {
      filters: {
        province: '',
        newCity: '',
        city: ''
      },
      citys: [],
      provinces: [],
      total: 0,
      page: 1,
      pageSize: 20,
      listLoading: false,
      sels: [], // 列表选中列
      editFormVisible: false, // 编辑界面是否显示
      editLoading: false,
      editFormRules: {
        name: [
          { required: true, message: '请输入城市名', trigger: 'blur' }
        ]
      },
      // 编辑界面数据
      editForm: {
        city: ''
      }
    }
  },
  methods: {
    handleCurrentChange (val) {
      this.page = val
    },
    // 删除
    handleDel: function (index, row) {
      this.$confirm('确认删除该记录吗?', '提示', {
        type: 'warning'
      }).then(() => {
        this.listLoading = true
        this.listLoading = false
        this.$message({
          message: '删除成功',
          type: 'success'
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
            this.editLoading = false
            this.$message({
              message: '提交成功',
              type: 'success'
            })
            this.$refs['editForm'].resetFields()
            this.editFormVisible = false
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
        this.listLoading = true
        setTimeout(() => {
        }, 1000)
        this.listLoading = false
      }).catch(() => {
      })
    },
    handleChange (value) {
      console.log(value)
    },
    showCity (val) {
      if (val) {
        this.loading = true
        getCity()
          .then(data => {
            if (data.header.isSuccess === 0) {
              this.citys = data.body
            } else {
              alert(data.header.msg)
            }
            this.loading = false
          })
          .catch(() => {
            console.log('api.getCity 连接服务器失败')
          })
      } else {
        this.citys = []
      }
    },
    addCity () {
      if (this.filters.newCity) {
        this.$message({
          message: `添加城市：${this.filters.newCity}, 成功`,
          type: 'success'
        })
      }
    }
  }
}
</script>

<style scoped>

</style>
