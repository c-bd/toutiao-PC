<template>
    <div class='cover-image'>
        <!-- 判断当前有没有图片 -->
        <div class='cover-item' v-for="(item,index) in image" :key="index" @click="uploadImg(index)">
            <!-- 只要一写：那么本地的图片没法转换成base64位所以需要require一下本地的路径才能显示 -->
            <img :src="item ? item : defaultImg" alt="" >
             <!-- <el-progress v-if="isoks" type="circle" :percentage="100" status="success" stroke-width='2' width="80" style="margin-left:15px"></el-progress> -->
        </div>
        <!-- 现在我们需要循环 当循环的时候将下面的图片渲染出来 点击前面的封面选项 判断当前图片数组内有无图片 如果没有则生成0个标签  其他情况则生成多个标签 -->
        <el-dialog :visible="dialogVisible" @close="dialogVisible = false">
                <!-- 这里放弹窗出来的内容 -->

                <pop-image @selectOneImg="getPhoto"></pop-image>
        </el-dialog>
    </div>
</template>

<script>
export default {
  // 这里我们需要把状态吗对应的照片的数组传过来
  props: ['image'],
  data () {
    return {

      dialogVisible: false,
      defaultImg: require('../../assets/img/pic_bg.png'),
      upload_index: 0
    }
  },
  methods: {
    // 这里是打开层的信息方法
    uploadImg (index) {
      this.dialogVisible = true
      this.upload_index = index
    },
    getPhoto (url) {
      // 这里我们点击的时候 需要拿到当前点击的数组的下标 来判定到底是地几张图片被电击了
      this.$emit('indexImg', url, this.upload_index)
      this.dialogVisible = false
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
        width: 220px;
        height: 220px;
        img{
            width: 100%;
            height: 100%;
            border:1px solid #f2f5c2;
        }
    }
}
</style>
