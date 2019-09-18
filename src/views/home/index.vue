<template>

    <el-container >
        <el-aside >
        <!--左侧导航组件-->
             <layout-aside></layout-aside>
        </el-aside>
        <!--右侧导航组件-->
        <el-container>
          <!--右侧头部-->
            <el-header>Header</el-header>
              <!--右侧容器内容-->
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
import layoutAside from '../../components/home/layou-aside'
export default {
  components: {
    'layout-aside': layoutAside
  }
}
</script>

<style>

</style>
