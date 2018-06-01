<template>
<div>
  <el-table
    :data="tableData"
    border
    style="width: 100%">
    <el-table-column
      prop="date"
      label="日期"
      width="180">
    </el-table-column>
    <el-table-column
      prop="type"
      label="类别"
      width="100">
    </el-table-column>
    <el-table-column
      prop="title"
      label="标题"
      width="300">
    </el-table-column>
    <el-table-column
      prop="content"
      label="内容">
    </el-table-column>
    <el-table-column label="操作" width="200">
      <template slot-scope="scope">
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</div>
</template>

<script>
export default {
  beforeMount () {
    this.reWrite()
  },
  data () {
    return {
      tableData: [
        {
          type: 1,
          date: '2016-05-03',
          title: '身份核验结果有哪几种状态？',
          content: '简略内容'
        },
        {
          type: 2,
          date: '2016-05-03',
          title: '如何了解自己的身份信息核验结果？',
          content: '简略内容'
        },
        {
          type: 3,
          date: '2016-05-03',
          title: '《铁路旅客信用记录管理办法（试行）》制定依据是什么？',
          content: '简略内容'
        },
        {
          type: 0,
          date: '2016-05-03',
          title: '关于调整互联网、电话订票起售时间的公告',
          content: '简略内容'
        },
        {
          type: 1,
          date: '2016-05-03',
          title: '中国铁路广州局集团有限公司关于2018年6月1日、6月3日增开部分旅客...',
          content: '简略内容'
        },
        {
          type: 2,
          date: '2016-05-03',
          title: '中国铁路广州局集团有限公司关于2018年6月1日、6月3日增开部分旅客...',
          content: '简略内容'
        },
        {
          type: 3,
          date: '2016-05-03',
          title: '中国铁路广州局集团有限公司关于2018年6月1日、6月3日增开部分旅客...',
          content: '简略内容'
        },
        {
          type: 0,
          date: '2016-05-03',
          title: '中国铁路广州局集团有限公司关于2018年6月1日、6月3日增开部分旅客...',
          content: '简略内容'
        }
      ],
      types: [
        {
          title: '最近新闻',
          name: 'recentNews'
        },
        {
          title: '使用须知',
          name: 'noticeForUse'
        },
        {
          title: '相关规章',
          name: 'rules'
        },
        {
          title: '常见问题',
          name: 'questions'
        }
      ]
    }
  },
  methods: {
    handleDelete (index, row) {
      console.log(index, row)
    },
    reWrite () {
      this.tableData.map(item => {
        item.type = this.types[item.type].title
        return item
      })
    }
  }
}
</script>

<style scoped>

</style>
