<template>
   <div id="cardOuter">
      <div class="cardItem">
        <div class="cardTitleOuter">
          <div :class="[detailList.length > 0 ? 'cardTitleHasDeatil' : 'cardTitleNoDeatil',collapse ? 'noCollapseTitle' : '','cardTitle']">
            <a :href="`https://${title}`">{{ title }} <span v-if="detailList.length > 0">({{ detailList.length }})</span></a> 
          </div>
        </div>  
        <div class="cardDetailOuter" v-if="detailList.length > 0">
          <div :class="[collapse ? 'bridgeCollapse' : '','cardBridge']" @click="changeCollapse">
            <span>||</span>
          </div>
          <div class="cardDetail" v-show="collapse">
              <div :class="[index !== detailList.length -1 ? 'not-last' : '' ,'detailItem']" v-for="(item,index) in detailList" :key="index">
                  <a :href="`https://${item}`">{{ item }}</a>
              </div> 
          </div>
        </div>
      </div>
   </div>
</template>
<script>
  export default {
    name:'cardItem',
    data(){
      return {
        collapse:false,
      }
    },
    props:{
      title:{
        type:String,
        default:''  
      },
      detailList:{
        type:Array,
        default:[]  
      }  
    },
    methods:{
      changeCollapse(){
        this.collapse = !this.collapse;
        this.$nextTick(() => { 
           if(this.collapse){
              let outerHeight = this.$el.offsetHeight;
              let titleSelfHeight = document.getElementsByClassName('noCollapseTitle')[0].offsetHeight;
              let topDistance = (parseInt(outerHeight) - parseInt(titleSelfHeight)) / 2;         
              document.getElementsByClassName('noCollapseTitle')[0].style.marginTop = topDistance + 'px';
           }else{
             let elements = document.getElementsByClassName('cardTitle');
             let length = elements.length;
             for(let i=0;i< length;i++){
               let distance = elements[i].style.marginTop;
               if((distance !== '') && (distance !== '0px')){
                 elements[i].style.marginTop = '0px';
                 break;
               }else{
                 continue;
               }
             }
           }          
        })      
      }
    }  
  }
</script>
<style lang="less">
  #cardOuter{
    display:block;
    margin-bottom:3px;
    .cardItem{
      display:inline-flex;
       a:hover,a:focus{
          text-decoration: underline;  
          color:#409eff;
      }   
      .cardTitleOuter{ 
        .cardTitle{
          max-height:50px; 
          width:176px;
          padding:6px 3px 6px 3px;
          // text-overflow: ellipsis; 
          // white-space: nowrap;
          // overflow:hidden;
        }
        .cardTitleHasDeatil{
          border:1px solid #333;
          border-right:none;
        }
        .cardTitleNoDeatil{
          border:1px solid #eee;
        }
        .noCollapseTitle{
          //margin-top:~'calc((100% - 50px) / 2)';
        }
      }  
      .cardDetailOuter{
        flex:auto;
        display:flex;
        .cardBridge{
          width:15px;
          background-color: #333;
          position:relative;
          span{
            position:absolute;
            color:#fff;
            top: 50%;
            transform: translateY(-50%);
            left:3px;
          }  
        }
        .bridgeCollapse{
          height:auto;
        }
        .cardDetail{
          border:1px solid #333;
          flex:1;
          .not-last{
            border-bottom:1px solid #eee;
          }
          .detailItem{
            padding:6px 1px 6px 1px;
            width:200px;
          } 
        }
      } 
    }
  }
</style>