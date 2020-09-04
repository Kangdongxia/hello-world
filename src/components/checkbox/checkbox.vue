<template>
   <div>
     <!--slot部分是显示的文本内容-->
     <label>
        <input 
         v-if="group"
         type="checkbox"
         :disabled="disabled"
         :value="label"
         v-model="model"
        />
        <input
         v-else 
         type="checkbox" 
         :disabled="disabled"
         :checked="currentValue"
         @change="chooseChange"/>
         <slot></slot> 
     </label>
     <!--label和input标签分开写，只有点击多选框的小框才能选中，影响用户体验-->
     <!--<input 
        type="checkbox" 
        :disabled="disabled"
        :checked="currentValue"
        @change="chooseChange"/>
    <label> {{ label }}</label> -->
   </div>  
</template>
<script>
  import Emitter from '../../mixins/emitter.js'
  export default {
    name:'iCheckbox',
    mixins:[ Emitter ],
    data(){
      return {
        currentValue:Boolean(this.value)
      }  
    },
    props:{
      value:{
        type:[Boolean,String,Number],
        default:false  
      },
      disabled:{
        type:Boolean,
        default:false  
      },
      trueValue:{
        type:[Boolean,String,Number],
        default:true
      },
      falseValue:{
        type:[Boolean,String,Number],
        default:false  
      },
      group:{
        type:Boolean,
        default:false  
      } 
    },
    watch:{
      //父组件传递的value发生变化时及时更新组件currentValue
      value(nowValue){
        /*this.currentValue = nowValue; //这样写不严谨，因为currentValue需要的是boolean值，
        nowValue则是boolean,string和number中的一种*/
        console.log('nowValue',nowValue)
        if((nowValue === this.trueValue) || (nowValue === this.falseValue)){
          this.currentValue = (nowValue === this.trueValue); //此处和教程不一致
          //this.updateModel(); 
        }else{
          console.log('所传递的value值不符合要求');  
        }  
      }
    },
    // created(){
    //   console.log('value',this.value);
    //   console.log('trueValue',this.trueValue);
    //   console.log('falseValue',this.falseValue);
    // },
    methods:{
      updateModel () {
        this.currentValue = this.value === this.trueValue;
      },
      chooseChange(event){
         //没考虑禁用时的情况
         if(this.disabled){
            return false; 
         }else{
            //发生change事件后， currentValue值不会自动变化
            //console.log('currentValue',this.currentValue);
            //checkbox取值也是取得checked
            let checked = event.target.checked;
            this.currentValue = checked;
            let value =  checked ? this.trueValue : this.falseValue;
            console.log('changedValue',value);
            //修改父组件传过来的value值 按照普通input框对待
            this.$emit('input', value);
            //父组件的on-change事件 不起作用
            //this.$emit('on-change',value);
            this.dispatch('iFormItem','on-form-change',value);
         }       
      }
    }  
  }
</script>