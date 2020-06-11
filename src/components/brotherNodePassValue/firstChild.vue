<template lang="html">
  <div class="firstChild">
     <h2>firstChild组件</h2>
     <button @click="sendMsg">向组件传值</button>
  </div>
</template>
<script>
  import bus from '../../utils/eventBus'
  export default {
    methods:{
      sendMsg: function(){
         bus.$emit("userDefinedEvent","this message is from firstChild") 
      }  
    } 
  }
</script>