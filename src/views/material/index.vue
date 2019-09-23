<template>
<el-card slot="title">
<layout-right-content>
    <template slot="title">素材管理</template>
</layout-right-content>
<el-upload
  class="upload-demo"
  action=""
:show-file-list="false"
:http-request="uploadImg"
>
  <el-button  type="primary">点击上传</el-button>

</el-upload>
<el-tabs v-model="activeName" @tab-click="changeTab ()">
    <el-tab-pane label="全部素材" name="all">
         <div class="img-list">
          <el-card class="img-item" v-for="item in list" :key="item.id" :body-style="{ padding: '0px'}">
            <img :src="item.url" alt />
            <div class="operate">
              <i  @click="collectmaterial(item)" :style="{color: item.is_collected ? 'red' : '#000'}" class="el-icon-star-on"></i>
              <i class="el-icon-delete-solid" @click="delectmaterial(item.id)"></i>
            </div>
          </el-card>
        </div>
    </el-tab-pane>
    <el-tab-pane label="收藏素材" name="collect">
     <div class="img-list">
          <el-card class="img-item" v-for="item in list" :key="item.id" :body-style="{ padding: '0px'}">
            <img :src="item.url" alt />
            <div class="operate">

            </div>
          </el-card>
        </div>
    </el-tab-pane>
</el-tabs>
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
      activeName: 'all',
      list: [],
      page: {
        total: 0, // 总页数
        currentPage: 1, // 当前页
        pageSize: 10// 一页几条
      }
    }
  },
  methods: {
    // 收藏方法
    collectmaterial (item) {
      let mess = item.is_collected ? '取消' : ''
      this.$confirm(`你确定要${mess}收藏吗？`).then(() => {
        // 现在收藏是false是反的  所以我们在这里需要取反
        this.$axios({
          url: `/user/images/${item.id}`,
          method: 'put',
          data: { collect: !item.is_collected }
        }).then(result => {
          this.getMaterial()
        })
      })
    },
    // 删除方法
    delectmaterial (id) {
      this.$confirm('你确定要删除吗？').then(() => {
        this.$axios({
          url: `/user/images/${id}`,
          method: 'delete'
        }).then(result => {
          this.open2()
          this.getMaterial()
        })
      })
    },
    open2 () {
      this.$message({
        message: '删除成功',
        type: 'success'
      })
    },
    // 图片上传的方法
    uploadImg (params) {
      // 这里图片上传时 接口规定必须以form-data的方式上传才可以  我们默认的请求头需要重新设置一下
      const data = new FormData()
      data.append('image', params.file)
      // 发送请求
      this.$axios({
        url: '/user/images',
        method: 'post',
        data
      }).then(result => {
        this.getMaterial()
      })
    },
    // 改变当前页码发送请求获取数据
    handleCurrentChange (val) {
      this.page.currentPage = val
      this.getMaterial()
      //  这时候当我们改变页码时 会传入一个参数这个参数就是当前页码的数  我们把这个数重新传入  然后发送请求  就会把这一夜的数据给你返回来
    },
    // 改变一页几条
    handleSizeChange (val) {
      this.page.pageSize = val
      this.getMaterial()
    },
    changeTab () {
      // 如果直接传入下面的 那么如果从第N也开始那么会找不到收藏的页面里的东西 所以我们应该在切换的时候 将页码重新变成第一页 这样才合理
      this.page.currentPage = 1
      this.getMaterial()
    },
    getMaterial () {
      this.$axios({
        url: '/user/images',
        // 我们判断当前点击的是否是collect  如果是那么则传入一个
        params: { collect: this.activeName === 'collect', page: this.page.currentPage, per_page: this.page.pageSize }
      }).then(result => {
        this.list = result.data.results
        // 赋值总数 每次总条数都会被重新赋值  我们请求回来后收藏和总数有可能会发生变化 所以总条数我们应该重新赋值才可以
        this.page.total = result.data.total_count
      })
    }
  },
  created () {
    this.getMaterial()
  }
}
</script>
<style lang="less" scoped>

.img-list{
    display:flex;
    flex-wrap:wrap;
    justify-content:center;
    .img-item{
        width:180px;
        height:180px;
        border-radius:6px;
        margin:30px;
        position:relative;
        img{
            width:100%;
            height:100%;
        }
        .operate{
            background-color:#f4f5f6;
            position:absolute;
            left:0;
            bottom:0;
            width:100%;
            display:flex;
            padding:0;
            justify-content:space-around;
            align-items:center;
            i{
                font-size:18px;
            }
        }
    }
}
</style>
