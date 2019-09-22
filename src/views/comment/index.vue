<template>
<el-card>
    <layout-right-content>
        <template slot="title">评论列表</template>
    </layout-right-content>
    <!--下面用一个 table表格来收集和展示内容-->
      <el-table
    :data="list">
    <el-table-column
      prop="title"
      label="标题"
      width="580">
    </el-table-column>
    <el-table-column
      prop="comment_status"
      label="评论状态"
      align="center"
      width="120">
    </el-table-column>
    <el-table-column
      prop="total_comment_count"
      label="总评论数"
      align="center"
      width="120">
    </el-table-column>
    <el-table-column
      prop="fans_comment_count"
      label="粉丝评论数"
      align="center"
      width="120">
    </el-table-column>
    <el-table-column
      label="操作"
      >
    </el-table-column>
    <template>
        <el-button type="text">修改</el-button>
        <el-button type="text" disabled>打开评论</el-button>
    </template>

  </el-table>
</el-card>

</template>
<script>
export default {
  data () {
    return {
      // 设置一个list空数组 将请求回来的结果直接给数组  就可以把所有的内容都显示出来
      list: []

    }
  },
  methods: {
    //   我们在这里需要拉取数据将评论展示在评论列表内
    loadComment () {
      this.loading = true // 显示遮罩
      this.$axios({
        url: '/articles',
        params: { response_type: 'comment' }
      }).then(result => {
        this.list = result.data.results // 把返回的数据赋值给list
        // this.page.total = result.data.total_count // 把总条数给 分页组件的总条数
        // this.loading = false // 关闭遮罩
      })
    }
  },
  created () {
    this.loadComment()
  }
}
</script>

<style lang="less" scoped>

</style>
