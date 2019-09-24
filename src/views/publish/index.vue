<template>
<el-card slot="header">
    <layout-right-content>
            <template slot="title">发布文章</template>
    </layout-right-content>
    <el-form style='margin-left:35px' label-width="100px" :model="loginForm">
        <el-form-item label="标题" style='width:400px' prop="title">
            <el-input v-model="loginForm.title"></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="content">
        <!--自定义富文本编辑器组件-->
           <quitor-editor v-model="loginForm.content" style="height:300px"></quitor-editor>
        </el-form-item>
        <el-form-item label="封面" prop="cover" style='margin-top:120px'>
          <!-- 我们给这个注册一个值改变事件 这样就可以监听值改变时的状态 -->
           <el-radio-group  v-model="loginForm.cover.type" @change="getCover">
              <el-radio :label="1">单选</el-radio>
              <el-radio :label="3">三图</el-radio>
              <el-radio :label="0">无图</el-radio>
              <el-radio :label="-1">自动</el-radio>
           </el-radio-group>
        </el-form-item>
        <!-- 父给子传递数据时 我们在父组件中写上要传递的值 在子中通过prop属性来获取 然后渲染到页面上 -->
        <cover-image :image="loginForm.cover.images"></cover-image>
        <el-form-item label="频道" prop="channel">
           <el-select v-model="loginForm.shannel">
                <el-option v-for="(item,index) in channels" :key="index" :value="item.id" :label="item.name"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item >
             <el-button type='primary'>发布文章</el-button>
             <el-button>存入草稿</el-button>
        </el-form-item>
    </el-form>
</el-card>

</template>

<script>
export default {
  data () {
    return {
      channels: [],
      loginForm: {
        title: '',
        cover: {
          type: 0,
          images: []
        }

      }
    }
  },
  methods: {
    // 封面内容改变时获取label的内容
    getCover () {
      // 值改变的时候 我们判断当前的type的状态是什么  如果是0.-1那么images数组的长度为0 1的时候数组长度为1  3的时候数组长度为3
      if (this.loginForm.cover.type === 1) {
        this.loginForm.cover.images = ['']
      } else if (this.loginForm.cover.type === 3) {
        this.loginForm.cover.images = ['', '', '']
      } else {
        this.loginForm.cover.images = []
      }
    },
    //   获取频道的下拉内容
    getChannels () {
      this.$axios({
        url: '/channels'
      }).then(result => {
        this.channels = result.data.channels
      })
    }
  },
  created () {
    this.getChannels()
  }
}
</script>

<style>
</style>
