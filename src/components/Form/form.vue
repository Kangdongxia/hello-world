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
      //表单控件绑定的数据对象
      model:{
        type:Object,
        default:function(){
            return null
        }  
      },
      //表单校验规则
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