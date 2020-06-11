<template>
    <!--时间线-->
    <div class="timeLine">
        <div class="content">
            <p class="tit">{{timeLineList[timeIndex].year}}</p>
            <p>{{timeLineList[timeIndex].info}}</p>
        </div>
            <!--<div class="my_timeline_prev">
                <img src="http://qiniu.iborge.cn/dian.png" class="my_timeline_node"/>
                <div class="my_timeline_item_line" style="margin-top: -18px;"></div>
                <div class="my_timeline_item_content" style="color: rgba(0,0,0,0);">上</div>
            </div>-->
         <div class="ul_box" ref="contentOuter">
                <ul class="my_timeline" ref="mytimeline">
                    <li class="my_timeline_prev">
                        <img src="http://qiniu.iborge.cn/dian.png" class="my_timeline_node"/>
                        <div class="my_timeline_item_line" style="margin-top: -18px;"></div>
                        <div class="my_timeline_item_content" style="color: rgba(0,0,0,0);">上</div>
                    </li>
                    <li class="my_timeline_item" v-for="(item,index) in timeLineList" :key="index">
                        <!--圈圈节点-->
                        <div class="my_timeline_node" :style = " {backgroundColor: item.bgcolor, width: item.size + 'px', height: item.size + 'px'}" @click="changeActive(index)" :class="{active: index <= timeIndex}"></div>
                        <!--线-->
                        <div class="my_timeline_item_line"></div>
                        <!--标注-->
                        <div class="my_timeline_item_content" :style="{color: item.color, fontSize: item.fontsize + 'px'}">
                            {{item.timestamp}}
                        </div>
                    </li>
                    <li class="my_timeline_next">
                        <img src="http://qiniu.iborge.cn/dian.png" class="my_timeline_node"/>
                        <div class="my_timeline_item_content" style="color: rgba(0,0,0,0);">下</div>
                    </li>
                </ul>   
        </div> 
            <!--<div class="my_timeline_next" >
                <img src="http://qiniu.iborge.cn/dian.png" class="my_timeline_node"/>
                <div class="my_timeline_item_content" style="color: rgba(0,0,0,0);">下</div>
            </div>--> 
    </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
    name: 'timeLine',
    data() {
        return {
            timeIndex: 2,
            timeLineList: [
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
                }]
        }
    },
    mounted(){
      /*var listLength = this.$refs.mytimeline.children.length;
      console.log('listLength',listLength);*/
      //this.ok=true;
      let width = (this.timeLineList.length+2) * 200+69;
      this.$refs.mytimeline.style.width = width + "px";
      this.$nextTick(() => {
        if(!this.scroll){
           this.scroll = new BScroll(this.$refs.contentOuter,{
               startX:0,
               click:true,
               scrollX:true,
               scrollY:false,
               eventsPassthrough:true
           }) 
        }else {
            this.scroll.refersh()
        } 
      })  
    },
    methods: {
        changeActive(index) {
            this.timeIndex = index;
        },
        /*moveLeft()  {
            let marginLeft = parseInt(this.$refs.mytimeline.style.marginLeft);
            let listNum = 0;
            if(marginLeft <= 28 && (marginLeft >= -650)){
                this.$refs.mytimeline.style.marginLeft = marginLeft - 220 + 'px';
            }
        },
        moveRight() {
            let marginLeft = parseInt(this.$refs.mytimeline.style.marginLeft);
            if(marginLeft < (-200)){
                this.$refs.mytimeline.style.marginLeft = marginLeft + 220 + 'px';
            }
        }*/
    }
}
</script>

<style scoped lang="scss">
.timeLine{
    position:absolute;
    overflow:hidden;
    z-index:1;
}
li{
  list-style-type: none;
}
.my_timeline{
    margin-left:-10px;
}
.my_timeline_prev, .my_timeline_next {
    display: inline-block;
    background-color: #fff;
    cursor: pointer;
}
.my_timeline_prev {
    width: 200px;
    /*float: left;*/
}
.my_timeline_next {
    width: 200px;
    float:right;
}
.ul_box {
    width: fit-content;
    height: 50%;
    display: inline-block;
    float: left;
    margin-top: 2px;
    overflow: hidden;
}
.my_timeline_item {
    display: inline-block;
    width: 200px;
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
    width: 10%;
    height: 28px;
    margin: -14px 0 0 28px;
    border-top: 2px solid #E4E7ED;
    border-left: none;
}
.my_timeline_item_content {
    margin: 10px 0 0 -14px;
}
</style>