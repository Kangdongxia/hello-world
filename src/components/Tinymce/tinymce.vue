<template>
 <div class="tinymce-editor">
   <editor  
   v-model="myValue" 
   :init="init" 
   :disabled="disabled"
   @onClick="changeValue"
   @sendValue="sendValue"
   >
   </editor>
   <!-- <el-button @click="sendValue">获取值</el-button>  -->
 </div> 
</template>
<script>
  import tinymce from 'tinymce/tinymce'
  import Editor from '@tinymce/tinymce-vue'
  //主题来自于node_modules文件夹
  //主题被注释直接富文本框不出现 ,console控制台报错（Uncaught SyntaxError: Unexpected token '<'）
  /*被注释后在Network部分theme.js对应的Preview可以看到关于theme.js如下提示
  We're sorry but hello-world doesn't work properly without JavaScript enabled. Please enable it to continue.*/
  import 'tinymce/icons/default/icons.js' //解决图标为not found的问题
  import 'tinymce/themes/silver' 
  //插件来自于node_modules文件夹
  import 'tinymce/plugins/link' //链接插件
  // 插入上传图片插件 被注释后界面正常，工具栏无图片图标,控制台部分雷同table
  import 'tinymce/plugins/image'
  import 'tinymce/plugins/media'// 插入视频插件
  //表格插件 被注释后界面正常，工具栏无表格图标,console控制台报错（Uncaught SyntaxError: Unexpected token '<'）
  /*被注释后在Network部分plugin.js对应的Preview可以看到关于plugins/table/plugin.js如下提示
  We're sorry but hello-world doesn't work properly without JavaScript enabled. Please enable it to continue.*/
  import 'tinymce/plugins/table' 
  import 'tinymce/plugins/lists'// 列表插件
  import 'tinymce/plugins/wordcount'// 字数统计插件
  import 'tinymce/plugins/quickbars' //快速栏插件
  import 'tinymce/plugins/fullscreen' //全屏插件
  import 'tinymce/plugins/imagetools' //图片工具插件
  import 'tinymce/plugins/preview' 
  import 'tinymce/plugins/emoticons' 
  import 'tinymce/plugins/hr' 
  export default {
     name:'vueTinyMceKDX1224333',
     components:{
         Editor
     },
     props: {
       baseUrl:{
          type:String,
          default:''
       },
       menuBar:{
           type:[String,Array],
           default:'file edit insert hr view format table tools',//顶部菜单栏显示
       },
       plugins:{
           type:String,
           default:'link lists image media preview emoticons hr fullscreen table wordcount'
       },
       toolbar:{
           type:String,
           default:'undo redo |  formatselect | bold italic forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link lists image media preview emoticons hr fullscreen table wordcount | removeformat'
       },
       disabled:{
           type:Boolean,
           default:false
       },
       value:{
           type:String,
           default:'欢迎使用tinyMce'
       }     
     },
     data () {
         return {
            init:{
                //语言包的路径(用的是public下的语言包),路径前不能加public,
                //`${this.baseUrl}public/tinymce/langs/zh_CN.js` 是错的
                //init里用到tinymce里plugin,skins类的文件路径前全部不加public,,否则（加了）报错      
                language_url: `${this.baseUrl}/tinymce/langs/zh_CN.js`,
                language: 'zh_CN',//语言
                //如果路径出错，写成`${this.baseUrl}public/tinymce/skins/ui/oxide` 富文本编辑器不出现，控制台无错
                skin_url: `${this.baseUrl}/tinymce/skins/ui/oxide`,// skin路径
                //路径写成`${this.baseUrl}public/tinymce/skins/content/default/content.css 对界面无可见影响，控制台无错，但应该获取不到文件
                /*被注释，对界面无可见影响，控制台无错
                 在Network部分content.css对应的Preview可以看到关于content/default/content.css如下提示
                 We're sorry but hello-world doesn't work properly without JavaScript enabled. Please enable it to continue.*/
                content_css: `${this.baseUrl}/tinymce/skins/content/default/content.css`,
                min_height: 300,//编辑器高度
                max_height:1500,
                branding: false,//是否禁用“Powered by TinyMCE”
                menubar: this.menuBar,
                plugins: this.plugins,
                toolbar: this.toolbar,
                //用public目录下的文件,路径前加public报错
                //即`${this.baseUrl}public/tinymce/plugins/emoticons/js/emojis.js`
                emoticons_database_url: `${this.baseUrl}/tinymce/plugins/emoticons/js/emojis.js`,
                //自定义表情
                emoticons_append: {
                  custom_mind_explode: {
                    keywords: ["brain", "mind", "explode", "blown"],//keywords自己改动显示不受影响
                    char: "🤯"
                  }
                },
                image_advtab: true, //为true选择图片后出现高级选项
                image_caption: true,
                image_description: false,
                automatic_uploads: true,
                image_uploadtab:true, //为true时上传选项才出现
                images_reuse_filename: false, //为true时单纯选择图片失败
                images_upload_credentials: true,
                //有了images_upload_handler选择图片才出现上传选项
                images_upload_handler: (blobInfo, success, failure) => {
                    const img = 'data:image/jpeg;base64,' + blobInfo.base64()
                    success(img)
                }  
            },
            myValue:this.value            
         }
     },
     mounted () {
       tinymce.init({})
     },
     watch:{
       //监视父组件的value值变化  
       value(newValue){ 
          this.myValue = newValue;
       },
       //监视myValue值的变化，目前用不到
       myValue (newMyValue) {
         //console.log('newMyValue',newMyValue);
         //this.$emit('input', newMyValue)
       }
     },
     methods:{
        //  sendValue(){
        //     this.$emit('getValue', this.myValue);
        //  },
         sendValue(){
           return  this.myValue;
         },
         clear(){
             this.myValue = '';
         },
         changeValue(){
             this.$emit('changeValue');
         }
     }     
  }
</script>
