<template>
 <el-row type="flex" class="flex-count" justify="space-between" align="middle">
    <el-col :span="6">
         <i class="el-icon-user"></i>
        <span>山西臻货自媒体有限公司</span>
    </el-col>
    <el-col :span="4">
            <img src="../../assets/img/avatar.jpg" class="userimg">
            <el-dropdown trigger="click">
      <span class="el-dropdown-link">
        {{}}<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item >个人信息</el-dropdown-item>
        <el-dropdown-item>git地址</el-dropdown-item>
        <el-dropdown-item >退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    </el-col>
 </el-row>
</template>

<script>
export default {
  data () {
    return {
      userInfo: {}
    }
  }
}
</script>
<style lang="less" scoped>
.flex-count{
    height:60px;
    line-height:60px;
    background-color:#f3f8f1;
    padding:0 20px;
    font-family: "NSimSun";
    .el-icon-user{
        margin-right:5px;
    }
    .userimg{
        vertical-align:top;
        border-radius: 50%;
        height:40px;
        width:40px;
        margin-top:8px;
    }
}
</style>
