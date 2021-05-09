<!--500页面-->
<template>
  <div class="wrapper">
    <img src="../../assets/img/500.png" alt="500"/>
    <div style="margin: 20px 0;">连接服务器失败，请刷新页面</div>
  </div>
</template>

<script>
export default {
  name: 'InternetServerError',
};
</script>

<style scoped lang="scss">
.wrapper {
  width: 100%;
  margin-top: 120px;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: auto;
}
</style>
