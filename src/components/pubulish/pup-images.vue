<template>
        <el-tabs type="border-card">
        <el-tab-pane label="素材库">
            <el-radio-group v-model="radio1">
                <el-radio-button label="全部"></el-radio-button>
                <el-radio-button label="收藏"></el-radio-button>
                <div class="img-item-box">
                    <el-card class="img-item" v-for="(item,index) in list" :key="index" :body-style="{ padding: '0px'}">
                        <img :src="item.url" alt="" @click="getImgUrl(item)"/>
                    </el-card>
                </div>
            </el-radio-group>
        </el-tab-pane>
        <el-tab-pane label="图片上传">
             <el-upload :show-file-list="false" action="" :http-request="uploadImg">
             <i class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
        </el-tab-pane>
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
        </el-tabs>

</template>

<script>
export default {
  data () {
    return {
      radio1: '全部',
      list: [],
      page: {
        total: 0, // 总页数
        currentPage: 1, // 当前页
        pageSize: 10// 一页几条
      }
    }
  },
  methods: {
    // 图片上传：
    uploadImg (params) {
      debugger
      // 因为图片上传是form-data格式  所以需要使用new FormData
      let data = new FormData()
      data.append('image', params.file)
      this.$axios({
        url: '/user/images',
        method: 'post',
        data
      }).then(result => {
        this.$emit('selectOneImg', result.data.url)
      })
    },
    //  --------------------------关于页码的改变
    handleCurrentChange (val) {
      this.page.currentPage = val
      this.getUserIma()
      //  这时候当我们改变页码时 会传入一个参数这个参数就是当前页码的数  我们把这个数重新传入  然后发送请求  就会把这一夜的数据给你返回来
    },
    // ---------------------------改变一页几条
    handleSizeChange (val) {
      this.page.pageSize = val
      this.getUserIma()
    },
    getUserIma () {
      this.$axios({
        url: '/user/images',
        params: { collect: this.activeName === 'collect', page: this.page.currentPage, per_page: this.page.pageSize }
      }).then(result => {
        this.list = result.data.results
      })
    },
    // 获取到图片的地址  我们需要把这个地址传到前面的组件内
    getImgUrl (item, e) {
      // 通过自定义事件来将参数带过去 这样我们就可以在上级拿到子级里面的数据
      this.$emit('selectOneImg', item.url)
    }
  },
  created () {
    this.getUserIma()
  }
}
</script>

<style lang='less' scoped>
.img-item-box{
  display: flex;
  flex-wrap: wrap;
.img-item{
  margin: 20px 8px 8px 8px;
  width: 110px;
  height: 80px;
    img{
      width: 100%;
      height: 100%;
    }
}
}
.el-icon-plus{
height: 200px;
width: 200px;
line-height: 200px;
text-align: center;
border:1px solid #ccc;
font-size: 25px;
}

</style>
