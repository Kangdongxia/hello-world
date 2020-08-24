<template>
   <div id="formItem">
     <span v-if="isRequired" class='i-form-item-label-required'> * </span>
     <label v-if="label">{{ label }}</label>
     <div>
       <slot></slot>
       <span v-show="validateState === 'fail'" class="i-form-item-message"> {{ validateMessage }}</span>
     </div>
   </div>
</template>
<script>
  import Emitter from '../../mixins/emitter.js'
  import AsyncValidator from 'async-validator'
  export default {
     name:'iFormItem',
     mixins:[ Emitter ],
     inject:['form'], 
     data(){
      return {
        isRequired:false,
        initialValue:'',
        validateState:'', //校验的状态（true or false）
        validateMessage:''//校验后的提示信息
      }
     }, 
     computed:{
       //fieldValue => formValidate传来的初始值
       fieldValue:{
        //  return this.form.model[this.prop];
         get:function(){
           return this.form.model[this.prop];
         },
         set:function(val){
           this.form.model[this.prop] = val;
         } 
       } 
     },
     mounted(){
       //不传入prop,则不进行校验，也无需缓存
       if(this.prop){
         this.dispatch('iForm','on-form_item-add',this)
         this.initialValue = this.fieldValue;
         this.setRules();
       }     
     },
     beforeDestory(){
       if(this.prop){
         this.dispatch('iForm','on-form_item-remove',this)
       }     
     },
     methods:{
      //判断该规则是否要求必填并执行校验
      setRules(){
        let itemRule = this.form.rules[this.prop] || [];
        //console.log('itemRule',itemRule)
        itemRule.forEach((item) => {
          if(item.required){
            this.isRequired = true;
          }
        })
        this.$on('on-form-change',this.onFieldChange);
        this.$on('on-form-blur',this.onFieldBlur);
      }, 
      getRules(){
        let formRules = this.form.rules;
        let itemRule = formRules[this.prop] ? formRules[this.prop] : [];
        return itemRule; //这里与教程写的不一致 
      },
      getFilteredRule(trigger){
        const rules = this.getRules();
        //rules[0].trigger指校验规则的trigger属性值
        //console.log('接收到的trigger',trigger === '');
        //console.log('trigger-校验规则的trigger属性值****',rules[0].trigger,rules[0].trigger.indexOf(''));
        return rules.filter(rule => !rule.trigger || rule.trigger.indexOf(trigger) !== -1);
      },
      //校验核心代码
      validate(trigger,callback = function() {}){
        // console.log('trigger-调用valid所传的trigger值',trigger);
        let rules = this.getFilteredRule(trigger);
        // console.log('筛选后的rules',rules);
        if(!rules || rules.length === 0){
          return true;
        }
        this.validateState = 'validating';
        let descriptor = {};
        descriptor[this.prop] = rules;
        const validator = new AsyncValidator(descriptor); //form中prop对应的校验规则
        let model = {};
        model[this.prop] = this.fieldValue; //form中prop对应的值
        validator.validate(model, { firstFields: true }, errors => {
          this.validateState = errors ? 'fail' : 'success';
          this.validateMessage = errors ? errors[0].message : '';
          callback(this.validateMessage); 
        })
      },
      onFieldChange(){
        this.validate('change');
      },
      onFieldBlur(){
        this.validate('blur');
      },
      //重置
      resetField(){      
        this.validateState = '';
        this.validateMessage = '';
        this.fieldValue = this.initialValue;
        //this.form.model[this.prop] = this.initialValue;       
      }
     },
     props:{
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
<style>
 .i-form-item-label-required{
   content:'*';
   color:red;
 }
 .i-form-item-message{
   color:red;
 }
</style>