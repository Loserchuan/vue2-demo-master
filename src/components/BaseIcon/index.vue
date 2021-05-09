<template>
  <i class="iconfont" :class="'icon'+type"></i>
</template>

<script>
  export default {
    name: 'BaseIcon',
    props: {
      type: {
        type: String,
        required: true,
      },
    },
  };
</script>
