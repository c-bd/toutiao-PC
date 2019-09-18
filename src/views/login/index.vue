<template>
    <div class="login">
        <el-card class="box-card">
        <div class="title"><img src="../../assets/img/logo_index.png" alt="">
        </div>
        <el-form>
          <el-form-item style="margin-top:20px">
                <el-input></el-input>
          </el-form-item>
          <el-form-item style="width:65%">
                <el-input></el-input>
          </el-form-item>
          <el-form-item>
          <el-checkbox v-model="loginForm.agree" class="box-card-checked">我已同意以下条款</el-checkbox>
          </el-form-item>
          <el-form-item>
          <el-button type="primary" style="width:100%">主要按钮</el-button>
          </el-form-item>

        </el-form>
    </el-card>

    </div>
</template>

<script>
export default {
  data () {
    return {
      loginForm: {
        mobile: '', // 手机号
        code: '', // 验证码
        agree: false // 是否同意协议
      }
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
