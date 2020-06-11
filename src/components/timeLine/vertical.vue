<template>
  <div id="uni_timeline">
    <!--<div
      :style="uni_space"
      v-for="(item,index) in uni_data"
      :key="index"
      :class="[uni_data.length==index+1?uni_listbox_last:uni_listbox_notlast,uni_listbox]"
    >
      <p>
        <img :src="uni_icon" :class="uni_timeline_icon">
        <span class="uni_timeline_title">{{item.title}}</span>
        <span class="uni_timeline_content">{{item.content}}</span>
      </p>    
    </div>-->
    <ul class="tab" ref="tabContent">
       <li :style="uni_space" v-for="(item,index) in uni_data" :key="index" :class="[uni_data.length==index+1?uni_listbox_last:uni_listbox_notlast,uni_listbox]" >
          <p>
            <img :src="uni_icon" :class="uni_timeline_icon">
            <span class="uni_timeline_title">{{item.title}}</span>
            <span class="uni_timeline_content">{{item.content}}</span>
          </p>    
      </li>
    </ul>
  </div>
</template>
<script>
import BScroll from 'better-scroll'
export default {
  data() {
    return {
      uni_timeline_icon: "uni_timeline_icon",
      uni_listbox_last: "uni_listbox_last",
      uni_listbox_notlast: "uni_listbox_notlast",
      uni_listbox: "uni_listbox"
    };
  },
  computed: {
    uni_space() {
      return "height:" + this.space;
    }
  },
  /*mounted(){
      this.$nextTick(() => {
        if(!this.scroll){
           this.scroll = new BScroll(this.$refs.tabContent,{
               startY:0,
               click:true,
               scrollX:false,
               scrollY:true,
               eventsPassthrough:'vertical'
           }) 
        }else {
            this.scroll.refersh()
        }  
      })  
  },*/
  props: {
    uni_data: {
      type: Array,
      default() {
        return [
          {
            title: "这是标题",
            content: "这是内容"
          },
          {
            title: "标题过长会显示省略号",
            content: "内容过长会隐藏"
          },
          {
            title: "更多效果可以自定义",
            content: "更多效果可以自定义"
          },
          {
            title: "这是标题",
            content: "这是内容"
          },
          {
            title: "标题过长会显示省略号",
            content: "内容过长会隐藏"
          },
          {
            title: "更多效果可以自定义",
            content: "更多效果可以自定义"
          },
          {
            title: "这是标题",
            content: "这是内容"
          },
          {
            title: "标题过长会显示省略号",
            content: "内容过长会隐藏"
          },
          {
            title: "更多效果可以自定义",
            content: "更多效果可以自定义"
          }
        ];
      }
    },
    space: {
      type: String,
      default: "100px"
    },
    uni_icon: {
      type: String,
      default: "http://qiniu.iborge.cn/dian.png"
    }
  }
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
#uni_timeline{
  padding-top:5%;
  padding-left:5%;
}
li{
  list-style-type: none;
}
.uni_listbox {
  box-sizing: border-box;
  margin: 20px;
  height: 60px;
  position: relative;
}
.uni_listbox_last {
  height: 20px;
}
.uni_listbox_notlast {
  height: 60px;
  margin-left: 18px;
  border-left: 3px solid rgb(228, 228, 228);
}
.uni_listbox p {
  position: absolute;
  top: 0;
  left: 0;
  /* transform: translateY(-50%); */
  margin-left: -9px;
  margin-top: -18px;
  vertical-align: middle;
  height: 16px;
  line-height: 16px;
}
.uni_timeline_icon {
  position: absolute;
  top: 0;
  left: 0;
  display: inline-block;
  width: 16px;
  height: 16px;
  vertical-align: middle;
}
.uni_timeline_title {
  font-weight: bold;
  text-align: left;
  display: inline-block;
  width: 300px;
  margin: 0 30px;
  color: rgb(100, 100, 100);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.uni_timeline_content {
  text-align: left;
  height: 70%;
  padding: 10px 21px;
  font-size: 14px;
  color: rgb(100, 100, 100);
  overflow: hidden;
}
</style>