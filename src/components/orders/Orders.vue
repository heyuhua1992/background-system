<template>
  <section>
    <!--工具条-->
    <el-col :span="24"
            class="toolbar"
            style="padding-bottom: 0px;">
      <el-form :inline="true"
               :model="filters">
        <el-form-item>
          <el-input v-model="filters.orderId"
                    placeholder="订单号">
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                     @click="getOrders">
            查询
          </el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <!--列表-->
    <el-table :data="orders"
              highlight-current-row
              v-loading="listLoading"
              style="width: 100%;">
      <el-table-column type="index" width="60">
      </el-table-column>
      <el-table-column prop="userid" label="用户ID" width="200" sortable show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="ticketId" label="车票ID" width="200" sortable show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="orderId" label="订单ID" width="200" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" width="250" sortable>
      </el-table-column>
      <el-table-column prop="amount" label="订单金额" width="150" sortable>
      </el-table-column>
      <el-table-column prop="state" label="状态" width="150" sortable :formatter="formatState">
      </el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button type="primary"
                     size="small"
                     @click="handleEdit(scope.$index, scope.row)">
            查看详情
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--工具条-->
    <el-col :span="24" class="toolbar">
      <el-pagination layout="prev, pager, next"
                     @current-change="handleCurrentChange"
                     :page-size="20"
                     :total="total"
                     style="float:right;">
      </el-pagination>
    </el-col>
    <!--订单详情-->
    <el-dialog title="订单详情"
               custom-class="order-list"
               :visible.sync="editFormVisible"
               v-model="editFormVisible"
               :close-on-click-modal="false">
      <el-form :model="editForm" label-width="80px" ref="editForm">
        <el-form-item label="用户ID" prop="userid">
          <el-input v-model="editForm.userid" auto-complete="off" readonly></el-input>
        </el-form-item>
        <el-form-item label="车票ID" prop="ticketId">
          <el-input v-model="editForm.ticketId" auto-complete="off" readonly></el-input>
        </el-form-item>
        <el-form-item label="订单ID" prop="orderId">
          <el-input v-model="editForm.orderId" auto-complete="off" readonly></el-input>
        </el-form-item>
        <el-form-item label="创建时间" prop="createTime">
          <el-input v-model="editForm.createTime" auto-complete="off" readonly></el-input>
        </el-form-item>
        <el-form-item label="订单金额" prop="amount">
          <el-input v-model="editForm.amount" auto-complete="off" readonly></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="state">
          <el-input v-model="editForm.state" auto-complete="off" readonly></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="editFormVisible = false">
          关闭
        </el-button>
      </div>
    </el-dialog>
  </section>
</template>

<script>
export default {
  data () {
    return {
      filters: {
        orderId: ''
      },
      orders: [],
      total: 0,
      page: 1,
      listLoading: false,
      editFormVisible: false, // 编辑界面是否显示
      editLoading: false,
      // 编辑界面数据
      editForm: {
        id: 0,
        userid: '',
        createTime: '',
        amount: '',
        state: 1,
        orderId: '',
        ticketId: ''
      }
    }
  },
  methods: {
    // 性别显示转换
    formatState: function (row, column) {
      return row.state === 1 ? 'OK' : row.state === 0 ? 'noOK' : '未知'
    },
    handleCurrentChange (val) {
      this.page = val
      this.getOrders()
    },
    // 获取数据列表
    getOrders () {
      let para = {
        page: this.page,
        phone: this.filters.phone
      }
      console.log(para)
      this.listLoading = true
      setTimeout(() => {
        let data = require('./data')
        this.total = data.total
        this.orders = data.orders
        this.listLoading = false
      }, 1000)
    },
    // 显示编辑界面
    handleEdit: function (index, row) {
      this.editFormVisible = true
      this.editForm = Object.assign({}, row)
    }
  },
  mounted () {
    this.getOrders()
  }
}
</script>

<style lang="scss">
.order-list {
  input {
    border: 0;
  }
}
</style>
