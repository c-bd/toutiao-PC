<template>
<el-card v-loading="loading" text>
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
      :formatter="stateFormatter"
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
    <el-table-column label="操作" >
          <template slot-scope="obj">
        <!--通过 (作用域插槽)`Scoped slot` 可以获取到 row, column, $index 和 store（table 内部的状态管理）的数据-->
            <el-button type="text" size="small">修改</el-button>
            <el-button type="text"
              :style="{color:obj.row.comment_status?'#E6A23C' : '#409EFF'}"
              size="small"
              @click="closeOrOpen(obj.row)"
            >
             <!--这时候我们把所有的状态全部都传进去-->{{obj.row.comment_status? "关闭评论"  : "打开评论"}}</el-button>
        </template>
    </el-table-column>
  </el-table>
  <div class="block">

    <el-row type="flex" justify="center">
    <el-pagination
      background
      layout="total, sizes, prev, pager, next, jumper"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page.currentPage"
      :page-size="page.pageSize"
      :total="page.total">
    </el-pagination>
    </el-row>

  </div>
</el-card>

</template>
<script>
export default {
  data () {
    return {
      // 设置一个list空数组 将请求回来的结果直接给数组  就可以把所有的内容都显示出来
      list: [],
      loading: false,
      page: {
        total: 0, // 总页数
        currentPage: 1, // 当前页
        pageSize: 10// 一页几条
      }
    }
  },
  methods: {
    handleCurrentChange (val) {
      this.page.currentPage = val
      this.loadComment()
      //  这时候当我们改变页码时 会传入一个参数这个参数就是当前页码的数  我们把这个数重新传入  然后发送请求  就会把这一夜的数据给你返回来
    },
    // 改变一页几条
    handleSizeChange (val) {
      this.page.pageSize = val
      this.loadComment()
    },
    changeTab () {
      // 如果直接传入下面的 那么如果从第N也开始那么会找不到收藏的页面里的东西 所以我们应该在切换的时候 将页码重新变成第一页 这样才合理
      this.page.currentPage = 1
      this.loadComment()
    },
    // formatter用来格式化内容的方法
    stateFormatter (row, column, cellValue, index) {
      // 因为直接布尔值是无法显示在表格中的  所以我们需要判断当前的状态 如果时true那么就显示正常 false就显示关闭
      return cellValue ? ' 正常 ' : '关闭'
    },
    // 这里是改变后面打开还是关闭评论的处理函数
    closeOrOpen (row) {
      let mess = row.comment_status ? '关闭' : '打开'
      this.$confirm(`您确定要${mess}评论嘛？`).then(() => {
        // 成功之后我们需要调用接口获取数据
        this.$axios({
          url: 'comments/status', // 地址
          method: 'put',
          params: { article_id: row.id.toString() },
          data: { allow_comment: !row.comment_status }// 我们发过去 状态吗和当前的状态是反正的 我们请求当前的开是为了关 所以要取反
        }).then(result => {
          this.loadComment()
        })
      })
    },
    //   我们在这里需要拉取数据将评论展示在评论列表内
    loadComment () {
      this.loading = true // 显示遮罩
      this.$axios({
        url: '/articles',
        params: { response_type: 'comment', page: this.page.currentPage, per_page: this.page.pageSize }
      }).then(result => {
        this.list = result.data.results
        this.page.total = result.data.total_count
        this.loading = false
        // 把返回的数据赋值给list
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
