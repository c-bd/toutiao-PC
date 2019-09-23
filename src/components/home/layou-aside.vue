<template>
<div class='layout-aside'>
      <div class="layout-aside-img">
          <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1568886052763&di=aa6492d855bf3d1b77f9f8e5ce435192&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2Fe0926a826379b7241fe381c50b47af2c4a06749e29dcf-aQDFS1_fw658">
      </div>
    <el-row class="tac">
    <el-col :span="12">
    <!--这时候我们给整个表单设置router属性那么下面就可以用index代替push来实现路由跳转-->
      <el-menu class="tac-continiu" router>
      <el-menu-item index="/home">
        <i class="el-icon-s-home"></i>
        <span slot="title">首页</span>
      </el-menu-item>
        <el-submenu index="/home">
        <template slot="title">
          <i class="el-icon-s-order"></i>
          <span>内容管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/home/publish">发布文章</el-menu-item>
          <el-menu-item index="/home/articles">内容列表</el-menu-item>
        </el-menu-item-group>
          <el-menu-item index="/home/comment">评论列表</el-menu-item>
          <el-menu-item index="/home/material">素材管理</el-menu-item>
         </el-submenu>
        <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-user"></i>
          <span>粉丝管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/home/fansdata">图文数据</el-menu-item>
          <el-menu-item index="/home/fansinfo">粉丝概况</el-menu-item>
        </el-menu-item-group>
          <el-menu-item index="/home/fanslist">粉丝画像</el-menu-item>
          <el-menu-item index="/home/fansimg">粉丝列表</el-menu-item>
      </el-submenu>
      <el-menu-item index="/home/account">
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
    background-image:url(https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1568872886228&di=17ad7d611351a323e79e737eea9acf70&imgtype=0&src=http%3A%2F%2Fpic141.nipic.com%2Ffile%2F20170918%2F21948267_135654045000_2.jpg);
    height: 100vh;
    width:300px;
    position:fixed;
.layout-aside-img{
  img{
  height:90px;
  width:201px;
   opacity:0.555;
  }
}
.tac{
    .tac-continiu{
        width:301px;
        background-image:url(https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1568872886228&di=17ad7d611351a323e79e737eea9acf70&imgtype=0&src=http%3A%2F%2Fpic141.nipic.com%2Ffile%2F20170918%2F21948267_135654045000_2.jpg);
    }
}

}
</style>
