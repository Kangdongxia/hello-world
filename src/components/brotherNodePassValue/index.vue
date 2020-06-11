<template>
  <div>
    <firstChild></firstChild>
    <second-child></second-child>
  </div>
</template>

<script>
  import firstChild from './firstChild.vue'
  import secondChild from './secondChild.vue'
  export default {
    components:{
      firstChild,
      secondChild
    }
  };
</script>