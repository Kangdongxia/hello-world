<template>
    <!--滑动banner -->
  <div class="swiperbanner_container">
    <swiper :options="swiperOption" ref="mySwiper">
      <swiper-slide v-for="(item) in BannerList" :key="item.bannerid">
        <img :src="item.imgurl" alt="" class="banner_img">
      </swiper-slide>
    </swiper>
    <div class="swiper-pagination"></div>
  </div>
</template>
<script>
  import 'swiper/dist/css/swiper.css'
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  import bannerurl1 from '../../assets/404_images/404.png'
  import bannerurl2 from '../../assets/404_images/404_cloud.png'
  import bannerurl3 from '../../assets/logo.png'
    export default {
      name: "SwiperBanner",
      components: {
        swiper,
        swiperSlide
      },
      data() {
        return {
          swiperOption:{
              direction:'horizontal',
              spaceBetween:10,
              observeParents: true, //观察父组件，当父组件变化时，自己随着变化
              observer: true, //观察自己，自己的参数变化时，更新
              /*centeredSlides:true,   //设置为true时，活动块居中显示，默认下居左显示*/
              loop:false,   //滑动过程中会在前后复制多个slider,效果看起来是循环的
              /*loopedSlides:1,   //设置滑动过程中所要用到的loop个数*/
              slidesPerView:4,   //同时显示的slide数量
              initialSlide:2,//初始化第一个显示的slide的索引
              freeMode:true
              /*loopAdditionalSlides:0,*/
              /*autoPlay:{
                  delay:3000,
                  disableOnInteraction:false  //鼠标移动上去时是否继续播放
              },*/
              /*pagination : '.swiper-pagination',
              paginationType : 'bullets',
              paginationElement:'span'*/
          }
        }
      },
      props:{
       BannerList:{
         type:Array,
         default:function(){
           return [
             {
               bannerid:0,
               imgurl:bannerurl1,
               bannerlink:'',
               index:0
             },{
               bannerid:1,
               imgurl:bannerurl2,
               bannerlink:'',
               index:1
             },
             {
               bannerid:2,
               imgurl:bannerurl3,
               bannerlink:'',
               index:2
             },
             {
               bannerid:3,
               imgurl:bannerurl1,
               bannerlink:'',
               index:3
             },
             {
               bannerid:4,
               imgurl:bannerurl2,
               bannerlink:'',
               index:4
             },
             {
               bannerid:5,
               imgurl:bannerurl3,
               bannerlink:'',
               index:5
             }
           ]
          }
       }
      },
      methods: {
 
      },
      /*computed: {
        swiper() {
          return this.$refs.mySwiper.swiper
        }
      },*/
      mounted() {
        console.log('this is current swiper instance object', this.swiper)
        //this.swiper.slideTo(0, 1000, false); 设置默认滑动到哪里
      }
    }
</script>
 
<style scoped>
  .swiperbanner_container{
    width:100%;
    height:160px;
    overflow: visible !important;
  }
  .swiper-pagination{
    bottom:2px !important;
  }
  .banner_img{
      height:116px;
  }
  /**重写swiper-slider的属性**/
  .swiper-slide{
    /*width:85%;*/
    /*margin-left: 5px;*/
    /*margin-right: 5px;*/
  }
  .swiper-slide-active>img{
    height:136px !important;
  }
  .swiper-slide-prev,.swiper-slide-next{
    margin-top:10px;
  }
</style>