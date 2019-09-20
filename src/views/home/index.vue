<template>
    <el-container >
        <el-aside >
        <!--左侧导航组件-->
             <layout-aside></layout-aside>
        </el-aside>
        <!--右侧导航组件-->
        <el-container>
          <!--右侧头部-->
            <el-header style="padding:0">
              <layout-right-header></layout-right-header>
            </el-header>
              <!--右侧容器内容-->
            <el-main>
                <router-view>
                </router-view>
            </el-main>
        </el-container>
    </el-container>
</template>
<script>
export default {
}
</script>

<style>

</style>
