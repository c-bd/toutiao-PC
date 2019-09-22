<template>
    <el-card slot="title" v-loading="loading">
<layout-right-content>
    <template slot="title">内容列表</template>
</layout-right-content>
<div class="artical">
    <span>文章状态:</span>
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
    <span>频道列表</span>
    <el-tab-pane label="全部" name="first" class="el-pane"></el-tab-pane>
        <el-tab-pane label="草稿" name="second" class="el-pane"></el-tab-pane>
        <el-tab-pane label="待审核" name="third" class="el-pane"></el-tab-pane>
        <el-tab-pane label="审核通过" name="fourth" class="el-pane"></el-tab-pane>
        <el-tab-pane label="审核失败" name="five" class="el-pane"></el-tab-pane>
  </el-tabs>
</div>
<el-card class="box-card">
  <div slot="header" class="clearfix">
    <span>总共找到{{page.total}}条符合条件的内容</span>
  </div>
  <el-card class="img-item" v-for="item in list" :key="item.id" :body-style="{ padding: '0px'}">
        <div class="img-item-left">
            <img src="../../assets/img/avatar.jpg">
            <div class="img-item-x">
                <p style="margin:0">{{item.title}}</p>
                <el-button type="primary" plain size="small" style="margin:10px 0">{{item.status==="1"? "待审核":"未通过"}}</el-button>
                <p style="margin:5px 0">{{item.pubdate}}</p>
            </div>
        </div>
        <div class="img-item-right">
            <el-button type="text" style="color:black"><i class="el-icon-edit"></i>修改</el-button>
            <el-button type="text" style="color:black"><i class="el-icon-delete"></i>删除</el-button>
        </div>
  </el-card>
</el-card>
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
      activeName: 'first',
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
      this.getCountent()
      //  这时候当我们改变页码时 会传入一个参数这个参数就是当前页码的数  我们把这个数重新传入  然后发送请求  就会把这一夜的数据给你返回来
    },
    // 改变一页几条
    handleSizeChange (val) {
      this.page.pageSize = val
      this.getCountent()
    },
    handleClick (tab, event) {
      console.log(tab, event)
    },
    getCountent () {
      this.loading = true
      this.$axios({
        url: '/articles',
        params: { response_type: 'statistic', page: this.page.currentPage, per_page: this.page.pageSize }
      }).then(result => {
        this.list = result.data.results
        this.page.total = result.data.total_count
        this.loading = false
      })
    }
  },
  created () {
    this.getCountent()
  }
}
</script>

<style lang="less" scoped>
.artical{
    display:flex;
    align-items:center;
    span{
        margin-right:30px;
    }
}
.box-card{
    margin-top:100px;
}
.img-item{

    .img-item-left{
        display:flex;
        .img-item-x{
            margin-left:10px;
        }
        img{
            width:150px;
            height:100px;
        }
    }
    .img-item-right{
        float:right;

    }
}
</style>
