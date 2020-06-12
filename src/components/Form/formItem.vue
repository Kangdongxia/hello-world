<template>
   <div id="formItem">
     <label v-if="label"> {{ label }} </label>
     <div>
       <slot></slot>
     </div>
   </div>
<template>
<script>
  import Emitter from '../../mixins/emitters.js'
  export default {
     name:'iFormItem',
     mixins:[ Emitter ]
     mounted(){
       if(this.prop){
         this.$dispatch('iForm','on-form_item-add',this)
       }     
     },
     beforeDestory(){
       if(this.prop){
         this.$dispatch('iForm','on-form_item-remove',this)
       }     
     }
     props"{
       label:{
         type:String,
         default:''  
       },
       prop:{
         type:String,
         default:''  
       }  
     }
  } 
</script>