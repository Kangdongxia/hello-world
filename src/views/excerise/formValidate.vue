<template>
  <div>
    <i-form :model="formValidate" :rules="ruleValidate" ref="iForm">
       <i-form-item label="用户名" prop="name">
          <i-input v-model="formValidate.name"></i-input> 
       </i-form-item> 
       <i-form-item label="邮箱" prop="mail">
          <i-input v-model="formValidate.mail"></i-input>
       </i-form-item>
       <i-form-item label="同意协议" prop="protocol">
          <i-checkbox v-model="formValidate.protocol"  :trueValue="1" :falseValue="0">协议内容</i-checkbox>
       </i-form-item>
    </i-form>
    <el-button @click="validateForm" type="primary">提交</el-button>
    <el-button @click="resetForm">重置</el-button>
  </div>
</template>
<script>
  import iForm from '../../components/Form/form.vue'
  import iFormItem from '../../components/Form/formItem.vue'
  import iInput from '../../components/Form/input.vue'
  import iCheckbox from '../../components/checkbox/checkbox.vue'
  export default {
   components:{iForm, iFormItem, iInput,iCheckbox},
   data(){
       var validateProtocol = (rule,value,callback) => {
        //console.log('judgeValue',Boolean(value))
         if(Boolean(value)){
           callback();
         }else{
           callback('协议内容必须选择');
         }
       };
       return {
         formValidate:{
            name:'kdx',
            mail:'2557381271@qq.com',
            protocol:false
         },
         ruleValidate:{
            name:[
              { required: true, message:'用户名不能为空', trigger:'blur'}
            ],
            mail:[
              { required:true, message:'邮箱不能为空', trigger:'blur'},
              { type: 'email', message:'邮箱格式不正确', trigger:'blur'} 
            ],
            //因为要判断得到的值是否为true,所以采用了自定义校验规则
            protocol:[
              { trigger:'change',validator:validateProtocol}
            ]
         }
       } 
   },
   methods:{
     validateForm(){
       this.$refs.iForm.validateForm((valid) => {
         if(valid){
           console.log('验证成功');
         }else{
           console.log('验证失败');
         }
       })
      //  .catch((e) => {
      //    console.log('error',e);
      //  })
     },
     resetForm(){
       this.$refs.iForm.resetForm();
     }
   }
  }
</script>