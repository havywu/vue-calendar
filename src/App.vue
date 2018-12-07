<template>
  <div id="routeContainer">
    <!-- 路由出口 -->
    <!-- 路由匹配到的组件将渲染在这里 -->
    <article class="main"><router-view></router-view></article>
  </div>
</template>

<script>
export default {
  name: 'routeContainer',
}
</script>

<style lang="less">
// 样式初始化
@import "./assets/reset.css";
</style>
