<template>
    <div class="content">
        <header>
          <ul>
            <li>
              <a href="#first" class="current">第一部分</a> 
            </li>
            <li>
              <a href="#second">第二部分</a>
            </li>
            <li>
              <a href="#third">第三部分</a>
            </li>  
          </ul> 
         </header>
         <main>
           <div id="first" class="section">
              第一部分具体内容
           </div>
           <div id="second" class="section">
              第二部分具体内容
           </div>  
           <div id="third" class="section">
              第三部分具体内容
           </div>    
         </main> 
    </div>
</template>
<script>
  import $ from 'jquery'
  export default {
    mounted(){
     this.scrollHighLightNav();
     this.navClickScrollToSection(); //让模块的滑动有动态效果
    },
    methods:{
      scrollHighLightNav(){
        var $navs = $('.content ul li');
        var $sections = $('.section');
        var $window   = $(window)
        var navLength = $navs.length - 1;
        $window.on('scroll',function(){
           //distance与distance_1值相同 distance没有加上100之前
           let distance = $window.scrollTop() + 200;
          //  let distance_1 = document.documentElement.scrollTop;//与$window.scrollTop();相同
          //  let distance_2 = document.body.scrollTop; //恒为0
          //  let distance_3 = $(document).scrollTop(); //与$window.scrollTop();相同       
           let len = navLength;   
           for(; len > -1; len--){ 
            // 这种方法不适用的原因是 并不一定能保证每个内容每个块高度一致
            //  let singleSectionHeight = $sections.eq(0).innerHeight();     
            //  let startPos = len * singleSectionHeight;
            //  let endPos = (len + 1) * singleSectionHeight;
            //  console.log('posInfo',startPos,endPos,len);
            //  if((distance >= startPos) && (distance <= endPos)){
            //    let currNav = $navs.eq(len);
            //    currNav.siblings().find('a').removeClass('current');
            //    currNav.find('a').addClass('current');
            //    break;
            //  }
              let currSection = $sections.eq(len);      
              if(distance >= currSection.offset().top){
                 let currNav = $navs.eq(len);          
                 //$navs.removeClass('current');
                 currNav.siblings().find('a').removeClass('current'); 
                 currNav.find('a').addClass('current');                            
                 break;   
              } 
           }
        })
      },
      navClickScrollToSection(){
        var $navs = $('.content ul li a');
        $navs.on('click', function(e){
          e.preventDefault();
          $('html,body').animate({
            'scrollTop':$($(this).attr('href')).offset().top
          },1000); 
        }) 
      }
    }      
  }
  
</script>
<style lang="less">
    .content{
      display:flex;
      // margin-bottom:250px;
      margin-bottom:220px;
      header{
        width:200px;
        position:fixed;
        .current{
          background-color: #ff0000;
          color:#000;
        }
        a{
          display:block;
        }   
      }
      main{
        flex:1;
        margin-left:200px;
        .section{
          padding-top:20px;      
          height:600px;         
        }   
      }  
    }
    
</style>  