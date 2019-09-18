<template>

    <el-container >
        <el-aside >
        <!--左侧导航组件-->
             <layout-aside></layout-aside>
        </el-aside>
        <!--右侧导航组件-->
        <el-container>
            <el-header>Header</el-header>
            <el-main>Main</el-main>
        </el-container>
    </el-container>

</template>

<script>
import layoutAside from '../../components/home/layou-aside'
export default {
  comments: {
    'layout-aside': layoutAside
  }
}
</script>

<style lang="less" scoped>

</style>
