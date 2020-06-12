<template>
  <div id="Form">
    <slot></slot>
  </div>
</template>
<script>
  export default {
    name:"iForm",
    data(){
      return {
        itemList:[]
      }
    },
    created(){
      this.$on('on-form_item-add',item => {
        if(item){
           this.itemList.push(item); 
        }
      })
      this.$on('on-form_item-remove',item => {
         let itemIndex = this.itemList.indexOf(item);
         if(item.prop) {
           itemList.splice(itemIndex,1); 
         }
      })
    },
    props:{
      model:{
        type:Object,
        default:function(){
            return null
        }  
      },
      rules:{
        type:Object,
        default:function(){
            return null
        }  
      }  
    },
    methods:{
      valiadteForm(){
        this.$broadcast('iFormItem','valudate_item');
      }
    }  
  }
</script>