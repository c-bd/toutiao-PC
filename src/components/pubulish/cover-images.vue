<template>
    <div class='cover-image'>
        <div class='cover-item' v-for="(item,index) in image" :key="index">
            <img src="../../assets/img/pic_bg.png" alt="">
        </div>
        <!-- 现在我们需要循环 当循环的时候将下面的图片渲染出来 点击前面的封面选项 判断当前图片数组内有无图片 如果没有则生成0个标签  其他情况则生成多个标签 -->

    </div>
</template>

<script>
export default {
  // 这里我们需要把状态吗对应的照片的数组传过来
  props: ['image'],
  data () {
    return {

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
    }
}
</style>
