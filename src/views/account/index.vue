<template>
    <el-card slot="header" class="clearfix">
       <layout-right-content>
            <template slot="title">评论列表</template>
       </layout-right-content>
         <el-form style="padding:20px" ref="accountForm" :rules="accountRules" :model="formData">
             <div class="header-user">
                  <img class='head-img' :src="formData.photo ? formData.photo : defaultImg " alt="">
                  <el-button type="text" class="head">更换头像</el-button>
                  <div class="header-count" v-if="abc">
                      <p>{{formData.name}}</p>
                      <p>{{formData.intro}}</p>
                  </div>
                   <div v-if="over" class="abc">
                    <el-form-item prop="name" label="用户名">
                        <el-input v-model="formData.name" style="width:80px"></el-input>
                    </el-form-item>
                    <el-form-item label="简介" prop="intro">
                    <el-input v-model="formData.intro" style="width:80px"></el-input>
                    </el-form-item>
                    <el-button type="primary" @click="saveUser">修改</el-button>
                    <el-button @click="alterUse">取消</el-button>
                  </div>
                  <el-button type="text" @click="alterUser">修改</el-button>
             </div>
             <div class="user">
                <el-form-item label="账号信息" style="padding-top:20px">
                    <div class="user-left">
                        <div class="user-name">头条号类型
                            <span>个人</span>
                        </div>
                        <div class="user-id">头条号ID
                             <span>{{formData.id}}</span>
                        </div>
                    </div>
                </el-form-item>
             </div>
             <div class="photo">
                 <el-form-item label="登陆方式" style="padding-top:20px">
                    <div class="photo-left">绑定手机
                        <span>{{formData.mobile}}</span>
                    </div>
                 </el-form-item>
             </div>
              <div class="emile">
                 <el-form-item label="邮箱" style="padding-top:20px">
                    <div class="emile-left">{{formData.email}}
                    </div>
                    <div v-if="over" class="bcd">
                       <el-form-item label="邮箱" prop="email">
                        <el-input v-model="formData.email" style="width:300px"></el-input>
                        </el-form-item>

                    </div >

                 </el-form-item>
             </div>
         </el-form>
    </el-card>
</template>

<script>
// 在这里引入一个实例化的Vue
import Vue from '../../utils/evenbus.js'
export default {

  data () {
    return {
      defaultImg: require('../../assets/img/avatar.jpg'),
      formData: {

      },
      accountRules: {
        name: [ { required: true, message: '用户名不能为空' },
          { min: 1, max: 7, message: '用户名要控制在1到7个字符' }],
        intro: [{ required: true, message: '用户名不能为空' }],
        emile: [{ required: true, message: '邮箱不能为空' }, { pattern: /^\w+((.\w+)|(-\w+))@[A-Za-z0-9]+((.|-)[A-Za-z0-9]+).[A-Za-z0-9]+$/, message: '邮箱格式不正确' }]
      },
      over: false,
      abc: true
    }
  },
  methods: {
    //   修改个人信息
    saveUser () {
      this.$refs.accountForm.validate((isOk) => {
        if (isOk) {
          this.$axios({
            url: '/user/profile',
            method: 'patch',
            data: this.formData
          }).then(result => {
            //   这个时候需要跨模块获取数据 通过一个叫evenBus 公共实例来获取到数据 这里只需要抛出不需要携带参数
            Vue.$emit('getUserInfo')
            this.$message({ type: 'success', message: '保存成功' })
          })
        }
      })
    },
    alterUser () {
      this.over = true
      this.abc = false
    },
    alterUse () {
      this.over = false
      this.abc = true
    },
    getUserInfo () {
      this.$axios({
        url: '/user/profile'
      }).then(result => {
        this.formData = result.data
      })
    }

  },
  created () {
    this.getUserInfo()
  }
}
</script>

<style lang="less" scoped>
.clearfix{
    font-size: 14px;
    background-color: #f1f2f441;
    .header-user{
        display: flex;
        height: 170px;
        position: relative;
        justify-content: space-between;
        .abc{
            margin-right:400px;
        }
        img{
            width: 100px;
            height: 100px;
            border-radius: 50%;
        }
        .head{
            position: absolute;
            left:20px;
            bottom: 25px;
        }
        .header-count{
            margin-left:-500px;
        }
    }
    .user{
        border-top: 1px solid #ccc;
        overflow: hidden;
    .user-left{
        margin-left:120px;
        .user-id{
        padding-top: 10px;
        height: 50px;
        line-height: 50px;
        border-top: 1px solid #ccc;
        }
        span{
            padding-left:60px;
        }
    }
    }
    .photo{
        border-top:1px solid #ccc;
        .photo-left{
             margin-left:120px;
             span{
                  padding-left:70px;
             }
        }
    }
    .emile{
        border-top:1px solid #ccc;
        .emile-left{
             margin-left:120px;
        }
        .emile-right{
            float:right;
        }
        .bcd{
            margin-left: 300px;
            margin-top:-44px;
        }
    }
}
</style>
