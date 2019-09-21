<template>
<el-card shadow="hover">
    <el-breadcrumb separator=">">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>
        <!--这里是上面后面的信息 我们在这里做一个插槽 因为并不是固定的 所以我们定义一个具名插槽  因为每一页都是独立的 需要我们单独去开发  所以就在这里定义一个插槽容器 所有的都可以找到这里-->
            <slot name="title"></slot>
        </el-breadcrumb-item>
    </el-breadcrumb>
</el-card>

</template>

<script>
export default {

}
</script>

<style>

</style>
