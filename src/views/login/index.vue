<template>
    <div class="login">
        <el-card class="box-card">
        <div class="title"><img src="../../assets/img/logo_index.png" alt="">
        </div>
        <!--2.在form上设置:model="loginForm" :rules="loginRules"属性-->
        <el-form :model="loginForm" :rules="loginRules" ref="ruleForm">
        <!--3.设置prop为里面的内容-->
          <el-form-item style="margin-top:20px"  prop="mobile">
            <!--4.设置v-model为下面data中的内容-->
                <el-input v-model="loginForm.mobile" placeholder="请输入手机号" ></el-input>
          </el-form-item>
          <el-form-item  prop="code">
                <el-input v-model="loginForm.code" placeholder="请输入验证码" style="width:60%"></el-input>
                 <el-button style="float:right">请输入验证码</el-button>
          </el-form-item>
          <el-form-item prop="agree">
                <el-checkbox v-model="loginForm.agree" class="box-card-checked">我已同意以下条款</el-checkbox>
          </el-form-item>
          <el-form-item>
          <el-button type="primary" @click="login()" style="width:100%">提交</el-button>
          </el-form-item>

        </el-form>
    </el-card>

    </div>
</template>

<script>
export default {
  data () {
    //   我们在这里定义复选框的规则
    // validator验证器(自定义效验函数 帮我们效验复选框)
    // rule当前规则 value当前值 callback回调函数
    let validator = function (rule, value, callBack) {
      value ? callBack() : callBack(new Error('您必须同意无条件被我们蒙骗'))
    }
    return {
      loginForm: {
        //   1.写出内容
        mobile: '', // 手机号
        code: '', // 验证码
        agree: false // 是否同意协议
      },
      loginRules: {
        // 5.表单验证功能的最终实现 设置为true则表示该字段必填
        mobile: [{ required: true, message: '请输入您的手机号' },
          { pattern: /^1[3456789]\d{9}$/, message: '请正确输入手机号' }],
        code: [{ required: true, message: '请输入验证码' },
          { pattern: /^\d{6}$/, message: '请正确输入验证码,为6位数字' }],
        agree: [{ validator }]
      }
    }
  },
  methods: {
    login () {
    // 效验全部表单的方法 通过获取整个表单的dom节点 然后通过一个回调函数来验证 函数的参数有两个 是否成功和未通过效验的字段
      this.$refs.ruleForm.validate((isOk) => {
        if (isOk) {
          // 如果成功则发送sxios请求 将用户信息携带到主页中去
          this.$axios({
            url: '/authorizations',
            method: 'post',
            // 提交的内容是表单的数据
            data: this.loginForm
          }).then(
            result => {
            //   我们这里需要把这个值存入本地存储器中 token令牌 存储用户的信息
              window.localStorage.setItem('user-token', result.data.data.token)
              this.$router.push('./home')
            }
          ).catch(
            () => {
              this.$message({
                message: '手机号或者验证码错误',
                type: 'warning'
              })
            }
          )
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login{
    background-image:url('../../assets/img/login_bg.jpg');
    height:100vh;
    background-size:cover;
    display:flex;
    justify-content:center;
    align-items:center;
    .box-card{
        width:440px;
        height:330px;
        .title{
            text-align: center;
            img{
            height:35px;
        }
        }
    }
}
</style>
