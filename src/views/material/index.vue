<template>
<el-card>
<layout-right-content>
    <template slot="title">素材管理</template>
</layout-right-content>
<el-tabs v-model="activeName">
    <el-tab-pane label="全部素材" name="all">
         <div class="img-list">
          <el-card class="img-item" v-for="item in list" :key="item.id">
            <img :src="item.url" alt />
            <div class="operate">
              <i :style="{color: item.is_collected ? 'red' : '#000'}" class="el-icon-star-on"></i>
              <i class="el-icon-delete-solid"></i>
            </div>
          </el-card>
        </div>
    </el-tab-pane>
    <el-tab-pane label="收藏素材" name="collect">
    </el-tab-pane>
</el-tabs>
</el-card>

</template>

<script>
export default {
  data () {
    return {
      activeName: 'all',
      list: [],
      page: {
        total: 0,
        currentPage: 1,
        pageSize: 10
      }
    }
  },
  methods: {
    getMaterial () {
      this.$axios({
        url: '/user/images',
        // 我们判断当前点击的是否是collect  如果是那么则传入一个
        params: { collect: this.activeName === 'collect', page: this.page.currentPage, per_page: this.page.pageSize }
      }).then(result => {
        this.list = result.data.results
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
            justify-content:space-around;
            align-items:center;
            i{
                font-size:18px;
            }
        }
    }
}
</style>
