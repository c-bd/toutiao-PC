<template>
<div class='layout-aside'>
     <div class='title'>
         <img src="../../assets/img/logo_admin.png" alt="">
     </div>
<el-row class="tac">
  <el-col :span="12">
    <el-menu
     style="width:201px"
      background-color="#353b4e"
      text-color="#adafb5"
      active-text-color="#ffd04b">
      <el-menu-item index="4">
        <i class="el-icon-s-home"></i>
        <span slot="title">首页</span>
      </el-menu-item>
        <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-s-order"></i>
          <span>内容管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="1-1">选项1</el-menu-item>
          <el-menu-item index="1-2">选项2</el-menu-item>
        </el-menu-item-group>
          <el-menu-item index="1-3">选项3</el-menu-item>
      </el-submenu>
        <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-user"></i>
          <span>粉丝管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="1-1">选项1</el-menu-item>
          <el-menu-item index="1-2">选项2</el-menu-item>
        </el-menu-item-group>
          <el-menu-item index="1-3">选项3</el-menu-item>
      </el-submenu>

      <el-menu-item index="4">
        <i class="el-icon-s-tools"></i>
        <span slot="title">账户管理</span>
      </el-menu-item>
    </el-menu>
  </el-col>
</el-row>

     </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.layout-aside{
    background-color: #323745;
    height: 100vh;
    width:200px;
    .title{
        text-align: center;
        background-color: #2e2f32;
        padding:15px 0;
        img{
            height:30px;
        }
    }
}
</style>
