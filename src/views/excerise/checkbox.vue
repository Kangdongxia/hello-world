<template>
  <div>
     <el-checkbox-group v-model="chooseData" @change="getChoose">
        <el-checkbox label="option1">选项1</el-checkbox> 
        <el-checkbox label="option2">选项2</el-checkbox> 
        <el-checkbox label="option3">选项3</el-checkbox> 
        <el-checkbox label="option4">选项4</el-checkbox> 
        <el-checkbox label="option5">选项5</el-checkbox> 
     </el-checkbox-group> 
  </div>
</template>
<script>
  export default{
    data(){
      return {
        chooseData:[]  
      }  
    },
    methods:{
      getChoose(){
        console.log('chooseData',this.chooseData);  
      }  
    } 
  }
</script>