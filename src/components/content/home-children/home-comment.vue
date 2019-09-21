<template>
    <el-breadcrumb separator=">">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>
        <!--这里是上面后面的信息 我们在这里做一个插槽 因为并不是固定的 所以我们定义一个具名插槽-->
            <slot name="title"></slot>
        </el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>

</style>
