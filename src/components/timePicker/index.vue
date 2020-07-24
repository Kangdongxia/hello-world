<template>
  <div class="block">
    <span class="demonstration">带快捷选项</span>
    <!--format决定展示在输入框里的时间格式，默认yyyy-MM-dd HH:mm:ss-->
    <!--value-format决定v-model里绑定的数据格式，即change方法里获取的参数的格式value-format="yyyy-MM-dd H:mm:s"-->
    <!--value-format不进行设置，获取到的值格式Tue Feb 01 2000 12:00:13 GMT+0800 (中国标准时间),-->
    所选时间间隔{{ interValTime }}
    <el-date-picker
      type="datetimerange"
      v-model="value2"
      :picker-options="pickerOptions"      
      start-placeholder="开始日期"
      range-separator="至"
      end-placeholder="结束日期"
      :clearable="false"
      :editable="false"      
      size="small"     
      @change="timeChange"    
      :default-time="['12:00:13','8:07:00']"
      align="right">
    </el-date-picker>
    <el-button @click="getInterValTime" type="primary" >转化时间</el-button>
    <el-button @click="toOtherPart" type="primary" >跳转界面</el-button>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(new Date().getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        value1: [new Date('2000-2-10 2:02:03'), new Date(2000, 1, 7, 5, 8, 3)],
        value2: [new Date(new Date().getTime()-1000*60*60*24*2),new Date()],
        interValTime:'2天'
      };
    },
    methods:{
      timeChange(val){
        console.log('val',val);  
      },
      formatTime(interval){
        console.log('interval',interval);    
        let hour = 0;
        let day = 0;
        let week = 0;
        let month = 0;
        let year = 0;
        let minute = interval/(1000 * 60);
        console.log('minute',minute);
        if(minute < 60){
          minute = Math.ceil(minute);
          return minute + '分钟'; 
        }else{
          hour = interval/(1000 * 3600);
          if(hour < 24){
            let inthour = (interval/(1000 * 60))%60;
            if(inthour === 0){
                return hour + '小时';
            }else{
                if(inthour > 59){
                  return Math.floor(hour)+ '小时' + '59分钟';
                }else if(hour < 1){
                  return Math.ceil(inthour) + '分钟'; 
                }else{
                  return Math.floor(hour)+ '小时' + Math.ceil(inthour) + '分钟'; 
                }               
            }              
          }else{
            day = interval/(1000 * 3600 * 24);
            if(day < 7){
              let intday = (interval/(1000 * 3600))%24;
              if(intday === 0){
                return day + '天';
              }else{
                if(intday > 23){
                   return Math.floor(day)+ '天' +'23小时';
                }else if(day < 1){
                   return Math.ceil(intday) + '小时';
                }else{
                   return Math.floor(day)+ '天' + Math.ceil(intday) + '小时';
                }              
              }              
            }else{
              week = interval/(1000 * 3600 * 24 * 7);             
              let monthJudge = (interval/(1000 * 3600 * 24)) % 30;
              //console.log('monthJudge',monthJudge);           
              if((week < (30/7)) && (monthJudge !== 0)){
                let intWeek = (interval/(1000 * 3600 * 24)) % 7;
                if(intWeek === 0){
                  return week + '周';
                }else{
                  if(intWeek > 6){
                    return Math.floor(week)+ '周'+ '6天';  
                  }else{
                    return Math.floor(week)+ '周' + Math.ceil(intWeek) + '天';
                  }                 
                }              
              }else{
                month = interval/(1000 * 3600 * 24 * 30);
                console.log('month1',month);  
                //console.log('month2',day/30);           
                if(month < 12){
                  let intmonth = (interval/(1000 * 3600 * 24)) % 30;
                  console.log('intmonth',intmonth);
                  if(intmonth === 0){
                    return month + '月'; 
                  }else{               
                      if(intmonth > 29){
                        return Math.floor(month)+ '月' + '29天';
                      }else{
                        return Math.floor(month)+ '月' + Math.ceil(intmonth) + '天';
                      }                                       
                  }                 
                }else{
                  year = interval/(1000 * 3600 * 24 * 30 * 12);
                  let intyear = (interval/(1000 * 3600 * 24  * 30)) % 12;
                  console.log('intyear',intyear);
                  if(intyear === 0){
                    return year + '年'; 
                  }else{
                    if(intyear > 11){
                       return Math.floor(year)+ '年'+ '11个月';
                    }else{
                       return Math.floor(year)+ '年' +  Math.ceil(intyear) + '个月';
                    }                    
                  }                 
                }
              } 
            }
          }
        }
      },
      getInterValTime(){
        console.log('router',this.$router); //this.$router.history.current的内容与this.$route一样
        console.log('route0',this.$route); 
        console.log('route1',this.$router.history.current.name); 
        console.log('route2',this.$route.name);
        let timeList = this.value2;
        let startTime = timeList[0].getTime();
        let endTime = timeList[1].getTime();
        let interVal = endTime - startTime;
        //console.log('interVal',interVal);
        this.interValTime = this.formatTime(interVal);      
      },
      toOtherPart(){                                                                               
        //this.$router.push({name:'柱状图995462',query:{id:7777}})  //path: "/" fullPath : "/?id=7777"
        //this.$router.push({path:'/eCharts/bar/:id',query:{id:3333}}) //path: "/eCharts/bar/:id" fullPath: "/eCharts/bar/:id?id=3333" params: {id: ":id"}
        //this.$router.push({path:`/eCharts/bar/${333}`,params:{id:3333}}) //params被忽略 //path与fullPath相同 " "/eCharts/bar/333" params: {id: "333"}
        //this.$router.push({path:`/eCharts/bar/${3335}`})  //path与fullPath相同  "/eCharts/bar/3335"
        //this.$router.push({name:'柱状图995462',params:{id:5623}}) //path与fullPath相同 "/eCharts/bar/5623"

        //对应路由为path: '/eCharts/bar/:id' path:"/" fullPath : "/?id=7777" 浏览器导航栏 http://localhost:5050/?id=7777（可正常跳转，this.$route.query.id 为7777）
        //对应路由为path: '/eCharts/bar/:name'  path:"/" fullPath : "/?id=7777" 浏览器导航栏 http://localhost:5050/?id=7777（可正常跳转，this.$route.query.id 为7777）
        //对应路由为path: '/eCharts/bar' path: "/eCharts/bar" fullPath : "/eCharts/bar?id=7777" 浏览器导航栏 http://localhost:5050/eCharts/bar?id=7777 （可正常跳转，this.$route.query.id 为7777）
        //this.$router.push({name:'柱状图995462',query:{id:7777}}) 
        
        //对应路由为path: '/eCharts/bar/:id'   无匹配路由跳转失败 浏览器导航栏 http://localhost:5050/eCharts/bar?id=3333
        //对应路由为path: '/eCharts/bar/:name'  无匹配路由跳转失败 浏览器导航栏 http://localhost:5050/eCharts/bar?id=3333
        //对应路由为path: '/eCharts/bar' path: "/eCharts/bar" fullPath : "/eCharts/bar?id=3333" 浏览器导航栏 http://localhost:5050/eCharts/bar?id=3333（可正常跳转，this.$route.query.id 为3333）
        //this.$router.push({path:'/eCharts/bar',query:{id:3333}})

        //对应路由为path: '/eCharts/bar/:id' 跳转成功 path: "/eCharts/bar/:id" 浏览器导航栏 http://localhost:5050/eCharts/bar/:id?id=3333 fullPath: "/eCharts/bar/:id?id=3333"  params: {id: ":id"} 
        //对应路由为path: '/eCharts/bar/:name' 跳转成功 path: "/eCharts/bar/:id" 浏览器导航栏 http://localhost:5050/eCharts/bar/:id?id=3333 params: {name: ":id"} fullPath: "/eCharts/bar/:id?id=3333"  
        //对应路由为path: '/eCharts/bar' 无匹配路由跳转失败 浏览器导航栏 http://localhost:5050/eCharts/bar/:id?id=3333
        this.$router.push({path:'/eCharts/bar/:id',query:{id:3333}}) 

        //对应路由为path: '/eCharts/bar/:id' 跳转成功 path: "/eCharts/bar/:name" 浏览器导航栏 http://localhost:5050/eCharts/bar/:name?id=3333 fullPath: ""/eCharts/bar/:name?id=3333"  params: {id: ":name"}
        //对应路由为path: '/eCharts/bar/:name' 跳转成功 path: "/eCharts/bar/:name" 浏览器导航栏 http://localhost:5050/eCharts/bar/:name?id=3333 fullPath: "/eCharts/bar/:name?id=3333"  params: {name: ":name"} 
        //对应路由为path: '/eCharts/bar' 无匹配路由跳转失败 浏览器导航栏 http://localhost:5050/eCharts/bar/:name?id=3333
        //this.$router.push({path:'/eCharts/bar/:name',query:{id:3333}}) 

        //params被忽略 //path与fullPath相同 " "/eCharts/bar/333" params: {id: "333"}
        //this.$router.push({path:`/eCharts/bar/${333}`,params:{id:3333}}) 
        
        //对应路由为path: '/eCharts/bar/:id' 跳转失败，无匹配路由 导航栏 http://localhost:5050/eCharts/bar
        //对应路由为path: '/eCharts/bar/:name' 跳转失败，无匹配路由 导航栏 http://localhost:5050/eCharts/bar 
        //对应路由为path: '/eCharts/bar', 跳转成功 path与fullPath相同  "/eCharts/bar"  浏览器导航栏 http://localhost:5050/eCharts/bar (无参数 params: {})
        this.$router.push({path:`/eCharts/bar`}) 

        //对应路由为path: '/eCharts/bar/:id' path与fullPath相同  "/eCharts/bar/3335" 浏览器导航栏 http://localhost:5050/eCharts/bar/3335（可正常跳转，可正常获取参数,所传参数名为id,this.$route.params.id为3335）
        //对应路由为path: '/eCharts/bar/:name'  path与fullPath相同  "/eCharts/bar/3335" 浏览器导航栏 http://localhost:5050/eCharts/bar/3335 (可正常跳转，所传参数名为name,this.$route.params.name为3335)
        //对应路由为path: '/eCharts/bar', 跳转失败，无匹配路由 导航栏 http://localhost:5050/eCharts/bar/3335
        //this.$router.push({path:`/eCharts/bar/${3335}`}) 
        
        

        //对应路由为path: '/eCharts/bar/:id', path与fullPath相同 "/eCharts/bar/5623" 浏览器导航栏http://localhost:5050/eCharts/bar/5623 （可正常跳转，可正常获取参数,所传参数名为id,this.$route.params.id为5623）
        //对应路由为path: '/eCharts/bar/:name' path与fullPath相同  "/" 浏览器导航栏 http://localhost:5050/ （可正常跳转，可正常获取参数,所传参数名为id,this.$route.params.id为5623）
        //对应路由为path: '/eCharts/bar',  path与fullPath相同 "/eCharts/bar" 浏览器导航栏 http://localhost:5050/eCharts/bar （可正常跳转,可正常获取参数,所传参数名为id,this.$route.params.id为5623）
        //this.$router.push({name:'柱状图995462',params:{id:5623}}) 

        //对应路由为path: '/eCharts/bar/:id' path与fullPath相同  "/" 浏览器导航栏 http://localhost:5050/ （可正常跳转，可正常获取参数,所传参数名为name,this.$route.params.name为5623）
        //对应路由为path: '/eCharts/bar/:name' path与fullPath相同  "/eCharts/bar/5623" 浏览器导航栏 http://localhost:5050/eCharts/bar/5623 （可正常跳转，可正常获取参数,所传参数名为name,this.$route.params.name为5623）
        //对应路由为path: '/eCharts/bar',  path与fullPath相同 "/eCharts/bar" 浏览器导航栏 http://localhost:5050/eCharts/bar （可正常跳转,可正常获取参数,所传参数名为name,this.$route.params.name为5623）
        //this.$router.push({name:'柱状图995462',params:{name:5623}}) 
      }
    }
    
  };
</script>