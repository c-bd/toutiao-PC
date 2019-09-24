<template>
    <div class='cover-image'>
        <div class='cover-item' v-for="(item,index) in image" :key="index" @click="uploadImg">
            <img src="../../assets/img/pic_bg.png" alt="">
        </div>
        <!-- 现在我们需要循环 当循环的时候将下面的图片渲染出来 点击前面的封面选项 判断当前图片数组内有无图片 如果没有则生成0个标签  其他情况则生成多个标签 -->
        <el-dialog :visible="dialogVisible">
                <!-- 这里放弹窗出来的内容 -->
                <pop-image></pop-image>
        </el-dialog>
    </div>
</template>

<script>
export default {
  // 这里我们需要把状态吗对应的照片的数组传过来
  props: ['image'],
  data () {
    return {
      dialogVisible: false
    }
  },
  methods: {
    uploadImg () {
      this.dialogVisible = true
    }
  }
}
</script>

<style lang="less" scoped>
.cover-image{
   display: flex;
   margin: 22px;
   margin-left:100px;
    .cover-item{
        border: 1px solid #ccc;
        padding: 10px;
        img{
            width: 100%;
            height: 100%;
            border:1px solid #f2f5c2;
        }
    }
}
</style>
