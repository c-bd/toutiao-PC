<template>
<el-card>
    <layout-right-content>
        <template slot="title">评论列表</template>
    </layout-right-content>
    <!--下面用一个 table表格来收集和展示内容-->
      <el-table
    :data="list">
    <el-table-column
      prop="date"
      label="标题"
      width="580">
    </el-table-column>
    <el-table-column
      prop="name"
      label="评论状态"
      width="120">
    </el-table-column>
    <el-table-column
      prop="address"
      label="总评论数"
      width="120">
    </el-table-column>
    <el-table-column
      prop="fans-comment"
      label="粉丝评论数"
      width="120">
    </el-table-column>
    <el-table-column
      prop="operate"
      label="操作"
      >
    </el-table-column>
  </el-table>
</el-card>

</template>
<script>
export default {
  data () {
    return {

    }
  },
  methods: {
    //   我们在这里需要拉取数据将评论展示在评论列表内

  }
}
</script>

<style lang="less" scoped>

</style>
