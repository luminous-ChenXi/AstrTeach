<template>
  <div class="error-page">
    <div class="error-code">4<span>0</span>4</div>
    <p class="error-desc">抱歉，您访问的页面不存在</p>
    <el-button type="primary" @click="$router.push('/')">返回首页</el-button>
  </div>
</template>

<style lang="scss" scoped>
.error-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: #f0f2f5;

  .error-code {
    font-size: 120px;
    font-weight: 700;
    color: #409eff;
    line-height: 1;

    span {
      color: #00d1b2;
    }
  }

  .error-desc {
    font-size: 20px;
    color: #606266;
    margin: 24px 0 36px;
  }
}
</style>
