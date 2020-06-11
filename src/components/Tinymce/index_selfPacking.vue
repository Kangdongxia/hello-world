<template>
    <div>
      <!--tinyMceAbc,tiny-mceAbc,tiny-mce-abc,tiny-mce-Abc都可以-->
      <tinyMceAbc ref="tinyMce"
      :disabled="disabled" 
      :toolbar="toolBar"
      :menuBar="menuBar"
      v-model="content"  
      @changeValue="change" >
      </tinyMceAbc>
      <el-button type="primary" @click="clear">清空</el-button>
      <el-button type="success" @click="getValue">获取值</el-button>
      <el-button type="danger" @click="disable">{{disabledTip}}</el-button>
    </div>
    
</template>
<script>
 
 import tinyMceAbc from './tinymce.vue' 
 export default {
    name:'usePakageTinymce',
    components:{
      tinyMceAbc 
    },
    data(){
     return {
       content:'测试小样',
       disabled:false,
       disabledTip:'禁用',
       //tooBar:'',
       //menuBar:'file insert table tools',
       //toolBar:'undo redo | formatselect | bold italic forecolor  | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |  image media preview emoticons hr fullscreen table wordcount | removeformat',
       //menuBar:'file edit insert tools', //menuBar为''和false效果一样 
       menuBar:'file edit insert hr view format table tools',
       toolBar:'undo redo |  formatselect | bold italic forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link lists image hr media preview emoticons fullscreen table wordcount | removeformat'
     }     
    },
    methods:{
      clear(){
         this.$refs.tinyMce.clear();
      },
      disable(){
        this.disabled = !this.disabled;
        this.disabledTip = this.disabled ? '恢复' : '禁用';
      },
      getValue(){
        let value = this.$refs.tinyMce.sendValue();
        console.log('value',value);
      },
      //改变Value值
      change(){
         this.content = '值被改变'; 
      }   
    }
 }
</script>
