<template>
  <div class="outer">  
    <div class="light">
		  <span>文本文本文本文本</span>
	  </div>
    <div class="lightBorder">
	     	<span>文本文本文本文本</span>
        <div class="demo"> 
        </div> 
 	  </div>
    <div class="dark">
		  <span>文本文本文本文本</span>
   	</div>
    <div class="darkBorder">
		    <span>文本文本文本文本</span>
        <div class="demo"> 
        </div> 
	  </div>
    <div style="margin-top:30px;margin-bottom:30px;">
       <el-popover
        placement="top-start"
        title="标题"
        width="200"
        trigger="click"
        content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。"
        popperClass="poperClass"	>
      <el-button slot="reference">click 激活</el-button>
      </el-popover>
    </div>
    
    <div style="margin-top:30px;margin-bottom:30px;">
       <el-popover
        placement="top-start"
        title="标题"
        width="200"
        trigger="click"
        content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。"	>
      <el-button slot="reference">click 激活</el-button>
      </el-popover>
    </div>

    <el-tooltip content="Changed" placement="top" popperClass="poperTipClass"  effect="dark">
      <el-button>DarkToLight</el-button>
    </el-tooltip> 

    <el-tooltip content="Top center" placement="top"  effect="light">
      <el-button>Light</el-button>
    </el-tooltip>

    <el-tooltip content="Top center" placement="top">
      <el-button>Dark</el-button>
    </el-tooltip>

    <el-tooltip content="Top center" placement="top" popperClass="poperTip2Class" effect="light">
      <el-button>LightToDark</el-button>
    </el-tooltip>
                 
  </div>  
</template>    
<script>
  export default {
    name:'test'  
  }
</script>
<style rel="stylesheet/scss" lang="scss">
       .outer{
         background: #eee;  
       }
       .light{
          span{
            background-color: #fff;
            padding: 5px 8px;
            display: inline-block;
            border-radius: 4px;
            margin:10px 0 10px 10px;
            position: relative;
          } 
          span::after{
            //content:''必须有，否则尾巴消失
            content: '';
            width: 0;
            height: 0;
            border: 8px solid transparent;
            //决定尾巴的颜色
            border-right: 8px solid #fff;
            position: absolute;
            top: 6px;
            left: -16px;
            }
       }

       .lightBorder{
          span{
            background-color: #fff;
            padding: 5px 8px;
            display: inline-block;
            border-radius: 4px;
            margin:10px 0 10px 10px;
            position: relative;
            border:1px solid #333;	
          }
          //尾巴的边框部分
          .demo {
            width: 0;
            height: 0;
            position: relative;
            border: 8px solid transparent;
            //边框部分
            border-left: 8px solid black;
            display:inline-block;
            left:-1px;
            top:2px;
         }
         //尾巴的内容部分
         .demo:after {
            //content:''必须有，否则尾巴消失
            content: "";
            width: 0;
            height: 0;
            position: absolute;
            left: -7px;
            top: -6px;
            border: 6px solid transparent;
            //内容部分
            border-left:6px solid white;
         }  
       }

       .dark{
          span{
            background-color: #333;
            padding: 5px 8px;
            display: inline-block;
            border-radius: 4px;
            margin:10px 0 10px 10px;
            position: relative;
            color:#fff;			
          }
          //尾巴在右侧 
            //span::after{
            // 	content: '';
            // 	border: 8px solid transparent;
            // 	border-left: 8px solid #333;
            // 	position: absolute;
            // 	top: 6px;
            // 	left: 144px;
            // }
           span::after{
            //content:''必须有，否则尾巴消失 
            content: '';
            width: 0;
            height: 0;
            border: 8px solid transparent;
            //决定尾巴的颜色          
            border-bottom: 8px solid #333;
            position: absolute;
            top: -15px;
            left: 58px;
          }
       }

       .darkBorder{
          span{
            background-color: #333;
            padding: 5px 8px;
            display: inline-block;
            border-radius: 4px;
            margin:10px 0 10px 10px;
            position: relative;
            color:#fff;
            border:1px solid #fff;			
		      }
          //尾巴的边框部分
          .demo {
            width: 0;
            height: 0;
            position: relative;
            border: 8px solid transparent;
            //边框部分
            border-top:8px solid #fff;
            display:inline-block;
            left:-90px;
            top:25px;
         }
         //尾巴的内容部分
         .demo:after {
            //content:''必须有，否则尾巴消失
            content: "";
            width: 0;
            height: 0;
            position: absolute;
            left:-6px;
            top: -8px;
            // left:5px;
            // top:-16px;
            border: 6px solid transparent;
            //内容部分
            border-top:6px solid  #333;
         }        
       }
       .poperClass{
         background: #333;
         color:#fff;
        //不需要边框的时候.popper__arrow的display也不能为none, position也不能为relative
        //popover尾巴部分默认外白里白-》外黑里黑，.popper__arrow:after里的
        //border-top:7px solid #333 !important;不能省略,.popper__arrow里的
        // border-top: 8px solid  #333 !important;可以省略，
        .el-popover__title{
          color:#fff;
        }
        .popper__arrow {
              width: 0;
              height: 0;
              position: absolute;
              //border: 8px solid transparent;
              //边框部分
              border-top: 8px solid  #333 !important;
              display:block;
              top:120px !important;
              left:43px !important;
          }
         .popper__arrow:after {
            //content: "";
            width: 0;
            height: 0;
            position: absolute;
            left:0px;
            top: -7px !important;
            border: 6px solid transparent;
            //内容部分
            border-top:7px solid #333 !important;
            //z-index:2005;
         }
       }
       .poperTipClass{
         background: #fff !important;
         color:#333 !important;
         border:1px solid #333;
         margin-bottom:30px;
         //尾巴边框部分
         //effect为dark的tooltip,尾巴部分默认外黑里黑-》外黑里白的效果，所以.popper__arrow:after里的
         //border-top:6px solid #fff !important;不能省略，.popper__arrow里的
         //border-top:7px solid  #333 !important;可以省略，
        .popper__arrow {
              width: 0;
              height: 0;
              position: absolute;
              //border: 7px solid transparent;
              //边框部分
              //border-top:7px solid  #333 !important;
              display:block;
              top:34px !important;
              left:28px !important;             
          }
          //尾巴内容部分
         .popper__arrow:after {
           // content: "";
            width: 0;
            height: 0;
            position: absolute;
            left:-1.5px;
            //调节top值使得尾巴在合适的位置，遮住poperTipClass不应该漏出的边框
            top: -7px;
            border: 6px solid transparent;
            //内容部分
            border-top:6px solid #fff !important;
            //z-index:2008;
         }
       }
       .poperTip2Class{
         background: #333 !important;
         color:#fff !important;
        // border:1px solid #333;
         margin-bottom:30px;
        .popper__arrow {
              width: 0;
              height: 0;
              position: absolute;
              //border: 7px solid transparent;
              //边框部分
              //border-top: 7px solid #333 !important;
              display:block;
              top:34px !important;
              left:31px !important;             
          }
          //effect为light的tooltip,尾巴部分默认外黑里白-》外黑里黑的效果，.popper__arrow:after里的
          //border-top:6px solid #333 !important; 不能省略，.popper__arrow里的
          //border-top: 7px solid #333 !important;可以省略
         .popper__arrow:after {
            //content: "";
            width: 0;
            height: 0;
            position: absolute;
            left:-1.5px;
            top: -7px;
            border: 6px solid transparent;
            //内容部分
            border-top:6px solid #333 !important;
            //z-index:2008;
         }
       }  
	
</style>