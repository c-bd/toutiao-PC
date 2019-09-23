<template>
    <el-card slot="title" v-loading="loading">
        <layout-right-content>
            <template slot="title">内容列表</template>
        </layout-right-content>
        <el-form class="artical" style="margin-left:50px">
            <el-form-item label="文章列表:">
                <el-radio-group v-model="formData.status" style="margin-left:20px" >
                     <el-radio-button  label="5">全部</el-radio-button>
                     <el-radio-button  label="0">草稿</el-radio-button>
                     <el-radio-button  label="1">待审核</el-radio-button>
                     <el-radio-button  label="2">审核通过</el-radio-button>
                     <el-radio-button  label="3">审核失败</el-radio-button>
                </el-radio-group>
            </el-form-item>
        </el-form>
        <el-form style="margin-left:50px">
             <el-form-item label="频道列表:">
                <el-select v-model="formData.channel_id" clearable placeholder="请选择" style="margin-left:20px">
                  <el-option
                    v-for="item in options"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
             </el-form-item>
        </el-form>
        <el-form style="margin-left:50px">
          <el-form-item label="时间选择:" >
          <el-date-picker
              style="margin-left:20px"
              v-model="formData.data"
              type="daterange"
              prefix-icon="el-icon-time"
              value-format="yyyy-MM-dd"
              range-separator="-"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
          {{formData.status}}{{formData.channel_id}}{{formData.data}}
        </el-form>
        <el-card class="box-card" :body-style="{ padding: '0px' , borderBottom:'5px solid #f2f3f4'}">
          <div slot="header" class="clearfix">
            <span>总共找到{{page.total}}条符合条件的内容</span>
          </div>
          <div class="img-item" v-for="item in list" :key="item.id">
                <div class="img-item-left">
                    <img :src="item.cover.images.length ? item.cover.images[0] : defaultImg" alt=''>
                    <div class="img-item-x">
                        <p style="margin:0 ; font-size:16px">{{item.title}}</p>
                        <!--在这里写过滤器 根据状态吗来判断状态 显示对应的样式和文字提示-->
                        <el-tag :type="item.status | statusType" plain size="small" style="margin:10px 0">{{item.status | statusText}}</el-tag>
                        <p style="margin:5px 0;font-size:12px">{{item.pubdate}}</p>
                    </div>
                </div>
                <div class="img-item-right">
                    <el-button type="text" style="color:black"><i class="el-icon-edit"></i>修改</el-button>
                    <el-button type="text" style="color:black"><i class="el-icon-delete" @click="delectMaterial(item.id)"></i>删除</el-button>
                </div>
          </div>
    </el-card>

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

</el-card>
</template>

<script>
export default {
  data () {
    return {
      defaultImg: require('../../assets/img/avatar.jpg'),
      list: [],
      options: [], // 这里是频道列表的数据
      loading: false,
      page: {
        total: 0, // 总页数
        currentPage: 1, // 当前页
        pageSize: 10// 一页几条
      },
      formData: {// 我们这里定义一个
        status: 5, // 文章状态默认值我们让她为全部
        channel_id: null, // 频道id值  默认为null空 因为是数字类型  所以就不能写成空字符串
        data: []// 时间  后台返回的是一个数组  所以这样定义
      }
    }
  },
  // 这里定义一个过滤器来判断当前的状态是什么样子的 然后根据状态吗显示不同的样式
  filters: {
    statusText (value) {
      switch (value) {
        case 0:
          return '草稿'
        case 1:
          return '待审核'
        case 2:
          return '审核通过'
        case 3:
          return '审核失败'
        case 4:
          return '已删除'
      }
    },
    statusType (value) {
      switch (value) {
        case 0:
          return 'warning'
        case 1:
          return 'info'
        case 2:
          return 'success'
        case 3:
          return 'warning'
      }
    }
  },
  methods: {
    // 获取频道列表
    getChannels () {
      this.$axios({
        url: '/channels'
      }).then(result => {
        this.options = result.data.channels
      })
    },
    //   删除素材
    delectMaterial (id) {
      this.$confirm('您确定要删除吗？').then(() => {
        this.$axios({
          url: `/articles/${id.toString()}`,
          method: 'delete'
        }).then(result => {

        })
      })
    },
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
    getCountent () {
      this.loading = true
      this.$axios({
        url: '/articles',
        params: { page: this.page.currentPage, per_page: this.page.pageSize }
      }).then(result => {
        this.list = result.data.results
        this.page.total = result.data.total_count
        this.loading = false
      })
    }
  },
  created () {
    this.getCountent()
    this.getChannels()
  }
}
</script>

<style lang="less" scoped>
.artical{
}
.box-card{
    margin-top:100px;
}
.img-item{
    padding:20px 10px;
    border-bottom:1px solid #f2f3f5;
     display:flex;
     justify-content:space-between;
    .img-item-left{
        display:flex;
        .img-item-x{
            margin-left:10px;
        }
        img{
            width:150px;
            height:100px;
            border-radius:4px;
        }
    }
    .img-item-right{
        height:100px;
    }
}
</style>
