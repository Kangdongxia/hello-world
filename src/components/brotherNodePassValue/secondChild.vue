<template lang="html">
  <div class="secondChild">
     <h2>secondChild组件</h2>
     <p>从firstChild接收的字符串：{{msg}}</p>
  </div>
</template>
<script>
  import bus from '../../utils/eventBus'
  export default {
    data(){
      return {
        msg:'default'  
      }  
    },
    mounted(){
       bus.$on("userDefinedEvent",(msg) =>{
             this.msg = msg;
       })    
    } 
  }
</script>