<template>
<el-card slot="title">
    <layout-right-content>
            <template slot="title">发布文章</template>
    </layout-right-content>
    <el-form style='margin-left:100px' label-width="100px">
        <el-form-item label="标题" style='width:400px'>
            <el-input></el-input>
        </el-form-item>
        <el-form-item label="内容">
           <el-radio-group>
                    <el-radio>单选</el-radio>
                    <el-radio>三图</el-radio>
                    <el-radio>无图</el-radio>
                    <el-radio>自动</el-radio>
                </el-radio-group>
        </el-form-item>
        <el-form-item label="频道">
           <el-select>
                <el-option v-for="item in channels" :key="item.id" :value="item.id" :label="item.name"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item >
             <el-button type='primary'>发布文章</el-button>
             <el-button>存入草稿</el-button>
        </el-form-item>
    </el-form>
</el-card>

</template>

<script>
export default {
  data () {
    return {
      channels: []
    }
  },
  methods: {
    //   获取频道的下拉内容
    getChannels () {
      this.$axios({
        url: '/channels'
      }).then(result => {
        this.channels = result.data.channels
      })
    }
  },
  created () {
    this.getChannels()
  }
}
</script>

<style>
</style>
