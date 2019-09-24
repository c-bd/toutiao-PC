<template>
<el-card slot="header">
    <layout-right-content>
            <template slot="title">发布文章</template>
    </layout-right-content>
    <!-- 验证表单 -->
    <el-form style='margin-left:35px' label-width="100px" :model="loginForm" :rules="rules" ref="ruleForm">
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
        <el-form-item label="频道" prop="channel_id">
           <el-select v-model="loginForm.channel_id">
                <el-option v-for="(item,index) in channels" :key="index" :value="item.id" :label="item.name"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item >
          <!-- 在这里存入草稿和发布文章是一样的 唯一的区别就是点击存入草稿是将draft设置成true -->
             <el-button type='primary' @click="pubilshArticil(false)">发布文章</el-button>
             <el-button @click="pubilshArticil(true)">存入草稿</el-button>
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
        content: '', // 内容
        title: '', // 标题
        channel_id: null, // 频道id
        cover: {
          type: 0,
          images: []
        }
      },
      rules: {
        channel_id: [{ required: true, message: '请选择频道' }
        ],
        content: [{ required: true, message: '请输入内容' }],
        title: [{ required: true, message: '请输入标题' },
        // 这里限制一下标题的最小长度和最大长度
          { min: 5, max: 30, message: '标题长度要控制在5到30个字符之间' }]
      }
    }
  },
  methods: {
    // 获取文章列表的内容
    getArticilList (articleId) {
      this.$axios({
        url: `/articles/${articleId}`
      }).then(result => {
        this.loginForm = result.data
      })
    },
    // 我们发现编辑文章和发布文章调用的接口是一样的 唯一的区别就是编辑的时候需要将id传入 其余的数据都是一样的
    // 发表文章和存入草稿  首先我们先验证表单
    pubilshArticil (draft) {
      this.$refs.ruleForm.validate((isOK) => {
        if (isOK) {
          // 成功之后在获取这个id 可以优化代码 省去白白浪费加载一行代码
          let { articleId } = this.$route.params // 引入文章对应的id值 判断当前有没有id值
          // 成功之后我们可以发表内容
          this.$axios({
            url: articleId ? `/articles/${articleId}` : '/articles',
            method: articleId ? 'put' : 'post',
            params: { draft },
            data: this.loginForm
          }).then(result => {
            this.$router.push('/home/articles')
            // 成功之后跳转页面到articles页面
          })
        }
      })
    },
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
    // 这时候如果是修改的页面 那么我们就判断又没有id传递过来 如果有就是编辑 如果没有就是新增
    let { articleId } = this.$route.params
    // 如果存在那么就调用后面的方法 否则啥也不返回  调用的时候将路由参数id传进去
    articleId && this.getArticilList(articleId)
  }
}
</script>

<style>
</style>
