<template>
 <el-row type="flex" class="flex-count" justify="space-between" align="middle">
    <el-col :span="6">
         <i class="el-icon-user"></i>
        <span>山西臻货自媒体有限公司</span>
    </el-col>
    <el-col :span="4">
            <img :src="userInfo.photo?userInfo.photo:defaultImg" class="userimg">
            <el-dropdown trigger="click" @command="handleCommand">
      <span class="el-dropdown-link">
        {{userInfo.name}}<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="account">个人信息</el-dropdown-item>
        <el-dropdown-item command="git">git地址</el-dropdown-item>
        <el-dropdown-item command="lyout">退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    </el-col>
 </el-row>
</template>

<script>
import evenBus from '../../utils/evenbus'
export default {
  data () {
    return {
      userInfo: {},
      defaultImg: require('../../assets/img/avatar.jpg')// 转换成base64位字符串
    }
  },
  methods: {
    getUserInfo () {
      this.$axios({
        url: '/user/profile' }).then(result => {
        console.log(result)
        this.userInfo = result.data // 接收数据对象
      })
    },
    handleCommand (command) {
      // 判断我当前点击的是哪一个
      if (command === 'account') {
        this.$router.push('/home/account')
      } else if (command === 'git') {
        window.location.href = 'https://github.com/shuiruohanyu/83heimatoutiao'
      } else {
        //   在推出之前将本地的缓存删掉
        window.localStorage.clear()
        this.$router.push('/login')
      }
    }
    //   获取用户的头像和名字但是必须携带token令牌才可以拿到
  },
  created () {
    this.getUserInfo()
    // 一旦监听到事件 就会触发执行后面的函数
    evenBus.$on('getUserInfo', () => {
      this.getUserInfo()
    })
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
