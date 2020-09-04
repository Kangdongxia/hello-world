<template>
  <div id="Form">
    <slot></slot>
  </div>
</template>
<script>
  export default {
    name:"iForm",
    provide(){
      return {
        form:this
      }
    },
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
      validateForm(callback){
        return new Promise((resolve) => {
          let valid = true;
          let count = 0;
          this.itemList.forEach(item => {
            //去掉空字符串试试 =>出错
            //调用item.validate()方法，其中''为所传参数且只能传''，errorMessage为validate()的返回值
            item.validate('',errorMessage => {
              console.log('errorMessage',errorMessage);
              if(!Object.is(errorMessage,'')){
                valid = false;
              }
              if( ++count === this.itemList.length){
                console.log('valid',valid);
                resolve(valid);
                if(typeof (callback) === 'function'){
                  callback(valid);
                }
              }
            });
          });
        })     
      },
      resetForm(){
        this.itemList.forEach(item => {
          item.resetField();
        })
      }
    }  
  }
</script>
<style>
 #Form{
   padding:10px;
 }
</style>