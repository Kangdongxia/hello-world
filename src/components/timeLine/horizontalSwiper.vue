
<template>
  <div class="timeLine">
        <div class="content">
            <p class="tit">{{timeLineList[timeIndex].year}}</p>
            <p>{{timeLineList[timeIndex].info}}</p>
        </div>           
         <div class="swiperbanner_container" ref="contentOuter">
              <swiper :options="swiperOption" class="my_timeline" ref="mytimeline">
                    <swiper-slide class="my_timeline_prev">
                        <img src="http://qiniu.iborge.cn/dian.png" class="my_timeline_node"/>
                        <div class="my_timeline_item_line" style="margin-top: -21px;margin-left:29px"></div>
                        <div class="my_timeline_item_content" style="color: rgba(0,0,0,0);">上</div>
                    </swiper-slide>
                    <swiper-slide class="my_timeline_item" v-for="(item,index) in timeLineList" :key="index">                       
                        <div class="my_timeline_node" :style = " {backgroundColor: item.bgcolor, width: item.size + 'px', height: item.size + 'px'}" @click="changeActive(index)" :class="{active: index <= timeIndex}"></div>                 
                        <div class="my_timeline_item_line"></div>                        
                        <div class="my_timeline_item_content" :style="{color: item.color, fontSize: item.fontsize + 'px'}">
                            {{item.timestamp}}
                        </div>
                    </swiper-slide>
                    <swiper-slide class="my_timeline_next">
                        <img src="http://qiniu.iborge.cn/dian.png" class="my_timeline_node"/>
                        <div class="my_timeline_item_content" style="color: rgba(0,0,0,0);">下</div>
                    </swiper-slide>
              </swiper>   
         </div> 
         <!--<el-button @click="changeData">修改数据</el-button>-->
    </div>
</template>

<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
      name: "HelloWorld",
      components: {
          swiper,
          swiperSlide
      },
      data() {
          return {
            timeIndex: 2,
            swiperOption:{
              direction:'horizontal',
              slidesPerView:5,   //同时显示的slide数量
              spaceBetween:0,
              observeParents: true,   //观察父组件，当父组件变化时，自己随着变化
              observer: true,     //观察自己，自己的参数变化时，更新
              /*centeredSlides:true,   //设置为true时，活动块居中显示，默认下居左显示*/
              /*initialSlide:10,//初始化第一个显示的slide的索引*/
              freeMode:true,//false  普通模式：slide滑动时只滑动一格，并自动贴合wrapperture   free模式：slide会根据惯性滑动且不会自动贴合
              //freeModeMomentumBounce:false,//false  禁用free模式下的动量反弹，slide通过惯性滑动到边缘时，无反弹效果 ture   默认值，有反弹效果
              //freeModeMomentumBounceRatio:00, //值越大，产生的边界反弹效果越明显，反弹距离越大。
              //freeModeSticky:true //ture  使得freeMode也能自动贴合 false 默认值  在此处没起作用
            },
          }
      },
      props:{
       timeLineList:{
         type:Array,
         default:function(){
           return [
             {
                  timestamp: '2012年',
                  color: '#999',
                  fontsize: 18,
                  size: '28',
                  bgcolor: '#e4e7ed',
                  icon: 'el-iconprev',
                  year: '2012',
                  info: 'chengli'
                }, {
                  timestamp: '2013年',
                  color: '#999',
                  fontsize: 18,
                  size: '28',
                  bgcolor: '#e4e7ed',
                  year: '2013',
                  info: '工作室更名为：西安拓美网络科技有限公司'
                }, {
                  timestamp: '2014年',
                  color: '#999',
                  fontsize: 18,
                  size: '28',
                  bgcolor: '#e4e7ed',
                  year: '2014',
                  info: '工作室更名为：西安拓美网络科技有限公司'
                }, {
                  timestamp: '2015年',
                  color: '#999',
                  fontsize: 18,
                  year: '2015',
                  size: '28',
                  bgcolor: '#e4e7ed',
                  info: '工作室更名为：西安拓美网络科技有限公司'
                }, {
                  timestamp: '2016年',
                  color: '#999',
                  fontsize: 18,
                  size: '28',
                  year: '2016',
                  bgcolor: '#e4e7ed',
                  info: '工作室更名为：西安拓美网络科技有限公司'
                }, {
                  timestamp: '2017年',
                  color: '#999',
                  fontsize: 18,
                  size: '28',
                  bgcolor: '#e4e7ed',
                  year: '2017',
                  info: '工作室更名为：西安拓美网络科技有限公司'
                }, {
                  timestamp: '2018年',
                  color: '#999',
                  fontsize: 18,
                  size: '28',
                  bgcolor: '#e4e7ed',
                  year: '2018',
                  info: '工作室更名为：西安拓美网络科技有限公司'
                }, {
                  timestamp: '2019年',
                  color: '#999',
                  fontsize: 18,
                  year: '2019',
                  bgcolor: '#e4e7ed',
                  size: '28',
                  info: '工作室更名为：西安拓美网络科技有限公司'
                }
           ]
         }
       }
      },
      methods: {
        changeActive(index) {
          this.timeIndex = index;
        },
        /*changeData(){
          this.timeLineList = [
             {
                  timestamp: '2019年',
                  color: '#999',
                  fontsize: 18,
                  size: '28',
                  bgcolor: '#e4e7ed',
                  icon: 'el-iconprev',
                  year: '2012',
                  info: 'chengli'
                }, {
                  timestamp: '2018年',
                  color: '#999',
                  fontsize: 18,
                  size: '28',
                  bgcolor: '#e4e7ed',
                  year: '2013',
                  info: '工作室更名为：西安拓美网络科技有限公司'
                }, {
                  timestamp: '2017年',
                  color: '#999',
                  fontsize: 18,
                  size: '28',
                  bgcolor: '#e4e7ed',
                  year: '2014',
                  info: '工作室更名为：西安拓美网络科技有限公司'
                }, {
                  timestamp: '2016年',
                  color: '#999',
                  fontsize: 18,
                  year: '2015',
                  size: '28',
                  bgcolor: '#e4e7ed',
                  info: '工作室更名为：西安拓美网络科技有限公司'
                }, {
                  timestamp: '2015年',
                  color: '#999',
                  fontsize: 18,
                  size: '28',
                  year: '2016',
                  bgcolor: '#e4e7ed',
                  info: '工作室更名为：西安拓美网络科技有限公司'
                }, {
                  timestamp: '2014年',
                  color: '#999',
                  fontsize: 18,
                  size: '28',
                  bgcolor: '#e4e7ed',
                  year: '2017',
                  info: '工作室更名为：西安拓美网络科技有限公司'
                }, {
                  timestamp: '2018年',
                  color: '#999',
                  fontsize: 18,
                  size: '28',
                  bgcolor: '#e4e7ed',
                  year: '2018',
                  info: '工作室更名为：西安拓美网络科技有限公司'
                }, {
                  timestamp: '2019年',
                  color: '#999',
                  fontsize: 18,
                  year: '2019',
                  bgcolor: '#e4e7ed',
                  size: '28',
                  info: '工作室更名为：西安拓美网络科技有限公司'
                }
          ];
        }*/
      },
      computed: {
        swiper() {
          return this.$refs.mytimeline.swiper
        }
      },
      mounted() {
        /*var list = document.getElementsByClassName("swiper-slide");
        list.forEach(listItem=>{
          listItem.removeAttribute("style");
        });*/
        var totalLength = this.timeLineList.length+2;
        this.timeIndex = totalLength-5;
        //this.swiper.slideTo(9, 100, false);
        this.swiper.slideTo( this.timeIndex+3, 100, false);
        var clientWidth = parseInt(document.documentElement.clientWidth);
        var itemWidth = clientWidth /11;
        let width = (totalLength+0.9) * itemWidth;
        this.$refs.contentOuter.style.width = width + "px";
        /*console.log('this is current swiper instance object', this.swiper)
        this.swiper.slideTo(3, 1000, false);*/
      },
      watch:{
        timeLineList(val){
           this.timeLineList = val;
        } 
      }
}
</script>
 
<style scoped>
  .swiperbanner_container {
      width: 100%;
      height: 160px;
      overflow: visible !important;
  }
  .timeLine{
      position:absolute;
      overflow:hidden;
      z-index:1;
  }
  li{
    list-style-type: none;
  }
  .my_timeline{
    padding-right:0;
  }
  .my_timeline_prev, .my_timeline_next {
      display: inline-block;
      background-color: #fff;
      cursor: pointer;
  }
  .my_timeline_prev {
      width: 100%;
      float: left;
  }
  .my_timeline_next {
      width: 100%;
      float:right;
      margin-left:26px;
      margin-top:-1px;
  }
  
  .my_timeline_item {
      display: inline-block;
      width: 100%;
  }
  .my_timeline_node {
      box-sizing: border-box;
      border-radius: 50%;
      cursor: pointer;
  }
  .my_timeline_node.active {
      background-color: #fff !important;
      border: 6px solid #f68720;
  }
  .my_timeline_item_line {
      width: 100%;
      height: 28px;
      margin: -14px 0 0 28px;
      border-top: 2px solid #E4E7ED;
      border-left: none;
  }
  .my_timeline_item_content {
      margin: 10px 0 0 -14px;
  }
</style>