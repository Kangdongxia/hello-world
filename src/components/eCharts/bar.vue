<template>
  <div class="outer">
    <div id="myChart" style="width:900px;height:400px;"></div>
    <el-button @click="changeData">更改数据</el-button>
    <el-button @click="getArray">获取数组</el-button>
  </div>  
</template>
<script>
// 引入基本模板
/*let echarts = require('echarts/lib/echarts')
// 引入柱状图组件
require('echarts/lib/chart/bar')
// 引入提示框和title组件
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')*/
export default {
  name: 'echarts',
  data() {
    return {
      xData:['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      yData:[120, 200, 150, 80, 70, 110, 130]
    }
  },
  created(){
    console.log('route',this.$route);    
    console.log('name',this.$route.name);
    console.log('id',this.$route.query.id);
    //console.log('id',this.$route.params.name);
  },
  mounted() {
    this.drawLine();
  },
  methods: {
    changeData(){
      this.xData = ['1','2','3','4','5','6','7'];
      this.yData = [50,190,70,210,65,170,120];
      this.drawLine();
    },
    getArray(){
      //let hours = Array.from({ length: 24 }, (value, index) => index + '时');
      // let hours = Array.from({ length: 3 },(v, i) => 2*i);
      // console.log('hours',hours);  
         let targetLevel = '2';
         let percentObj = {
           '1':33.3,
           '2':66.6,
           '3':100
         } 
         console.log('percent',percentObj[targetLevel]);
    },
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById('myChart'));
      /*var sin = Math.sin;
      var cos = Math.cos;
      var pow = Math.pow;//幂函数，pow(x,y)返回x的y次幂
      var sqrt = Math.sqrt;//平方根
      var cosh = Math.cosh; //双曲余弦
      var sinh = Math.sinh;//双曲正弦
      var exp = Math.exp;//以e为底数的对数
      var PI = Math.PI;//圆周率
      var square = function (x) {
          return x*x;
      }
      var mod2 = function (a, b) {
          var c = a % b;
          return c > 0 ? c : (c + b);
      }

      var theta1 = -(20/9) * PI;
      var theta2 = 15 * PI;
      function getParametricEquation() {
          return {
              u: {
                  min: 0,
                  max: 1,
                  step: 1 / 24
              },
              v: {
                  min: theta1,
                  max: theta2,
                  step: (theta2 - theta1) / 575
              },
              x: function (x1, theta) {
                  var phi = (PI/2)*exp(-theta/(8*PI));
                  var y1 = 1.9565284531299512*square(x1)*square(1.2768869870150188*x1-1)*sin(phi);
                  var X = 1-square(1.25*square(1-mod2((3.6*theta),(2*PI))/PI)-0.25)/2;
                  var r = X*(x1*sin(phi)+y1*cos(phi));
                  return r * sin(theta);
              },
              y: function (x1, theta) {
                  var phi = (PI/2)*exp(-theta/(8*PI));
                  var y1 = 1.9565284531299512*square(x1)*square(1.2768869870150188*x1-1)*sin(phi);
                  var X = 1-square(1.25*square(1-mod2((3.6*theta),(2*PI))/PI)-0.25)/2;
                  var r = X*(x1*sin(phi)+y1*cos(phi));
                  return r * cos(theta);
              },
              z: function (x1, theta) {
                  var phi = (PI/2)*exp(-theta/(8*PI));
                  var y1 = 1.9565284531299512*square(x1)*square(1.2768869870150188*x1-1)*sin(phi);
                  var X = 1-square(1.25*square(1-mod2((3.6*theta),(2*PI))/PI)-0.25)/2;
                  var r = X*(x1*sin(phi)+y1*cos(phi));
                  return X*(x1*cos(phi)-y1*sin(phi));
              }
          };
      }
      var option = {
          toolbox: {
              feature: {
                  saveAsImage: {
                      backgroundColor: '#111'//所保存图片的背景色
                  }
              },
              iconStyle: {
                  normal: {
                      borderColor: '#fff'//所画图形的描边颜色
                  }
              },
              left: 0
          },
          xAxis3D: {
              type: 'value'//坐标轴类型，可选的有四种，值为value代表代表数值轴，适用于连续数据
          },
          yAxis3D: {
              type: 'value'//坐标轴类型，可选的有四种，值为value代表代表数值轴，适用于连续数据
          },
          zAxis3D: {
              type: 'value'//坐标轴类型，可选的有四种，值为value代表代表数值轴，适用于连续数据
          },
          grid3D: {
              show: true,//是否显示三维笛卡尔坐标系，此处设置不显示
              axisPointer: {
                  show: true,//是否显示坐标轴指示线，此处设置不显示，默认显示,对于选中的点，可用黑色的线注明x,y和z轴的坐标
                  lineStyle:{
                    color:'#333' //设置选中某个点时，展示其三维坐标时坐标轴轴线的颜色（默认为透明度为0.8的黑色）
                  },
                  label:{
                    textStyle:{
                      color:'#00ff00'//具体坐标值显示内容的字体颜色
                    }
                  }
              },
              axisLine: {
                  lineStyle: {
                    color: '#0000ff' //坐标轴线线条的颜色（有刻度的部分）
                  }
              },
              axisTick:{
                 lineStyle:{
                    color:'#ff0000' //坐标轴刻度的颜色
                 }
              },
              splitLine:{
                 lineStyle:{
                    color:'#562312' //构成三维网格状平面线条的颜色
                 }
              },
              splitArea:{
                 show:true,
                 areaStyle:{
                    color:'#000000' //三维网格状平面每个网格的填充色
                 }
              },
              //后处理特效的相关配置
              postEffect: {
                  enable: true,//是否开启后处理特效，默认关闭，此处设为开启特效
                  SSAO: {
                      enable: true,//是否开启环境光遮蔽，默认不开启，此处开启
                      radius: 10,//环境光遮蔽的采样半径，半径越大效果越自然，但是要设置较高的quality
                      intensity: 2//环境光遮蔽的强度，值越大颜色越深
                  },
                  edge: {
                      enable: true
                  }
              },
              temporalSuperSampling: {
                  enable: true //是否开启分帧超采样，默认开启postEffect后也会开启，此处设置开启，通过分帧超采样来解决锯齿的问题
              },
              light: {
                  main: {
                      intensity: 3,//场景主光源的光源强度
                      shadow: true,//主光源是否投射阴影，默认关闭，此处设置有投射阴影
                  },
                  ambient: {
                      intensity: 0 //全局环境光的强度
                  },
                  ambientCubemap: {
                      texture:'/imgPre/data-gl/asset/canyon.hdr',//环境光贴图的url
                      exposure: 0,
                      diffuseIntensity: 1,//漫反射的强度
                      specularIntensity: 0.5//高光反射的强度
                  }
              },
              //用于鼠标的旋转，缩放等视角控制
              viewControl: {
                  //projection: 'orthographic' //投影方式，默认为透视投影（点光源），也可以设成正交投影（平行光源）
              }
          },
          series: [{
              type: 'surface',
              parametric: true,//是否为参数曲面，默认不是，此处设置为是
              shading: 'realistic',//曲面图中三维图形的着色效果，此处设置为realistic,真实感渲染
              silent: true,//图形是否不响应和触发鼠标事件，默认为false，此处设为true，意为不响应，不触发鼠标事件,设为false则图形可在鼠标点击时有所反应
              wireframe: {
                  show: false //是否显示网格线，默认为true，此处设为false，意为不显示网格线
              },
              realisticMaterial: {
                  baseTexture:'/imgPre/asset/get/s/data-1494250104909-SkZtfeAyZ.jpg',
                  roughness: 0.7, //材质的粗糙度（0为完全光滑，1是完全粗糙）
                  metalness: 0,//材质是金属还是非金属（0为非金属，1为金属）
                  textureTiling: [200,20]//材质纹理的平铺，默认为1，即拉伸填满，大于1时，则表示纹理平铺重复的次数
              },
              itemStyle: {
                  color: '#fff'//曲面图形的颜色
              },
              parametricEquation: getParametricEquation() //曲面的参数方程，在data没被设置的时候，可用parametricEquation声明，在parametric为true时有效
          }]
      };
      myChart.setOption(option);*/
      // 绘制图表
      myChart.setOption({
        title: { text: 'ECharts 入门示例' },
        tooltip: {},
        xAxis: {
          data: this.xData
        },
        yAxis: {},
        series: [{
          name: '销量',
          type: 'bar',
          data: this.yData
        }]
      });    
    }
  }
}
</script>
<!--<template>
  <div>
    <el-collapse v-model="activeNames" @change="handleChange" accordion>
      <el-collapse-item   name="1">
        <template slot="title">
           一致性 Consistency<i class="header-icon el-icon-info"></i>
        </template>
        <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
        <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
      </el-collapse-item>

      <el-collapse-item title="反馈 Feedback" name="2">
        <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
        <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
      </el-collapse-item>

      <el-collapse-item title="效率 Efficiency" name="3">
        <div>简化流程：设计简洁直观的操作流程；</div>
        <div>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>
        <div>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>
      </el-collapse-item>

      <el-collapse-item title="可控 Controllability" name="4">
        <div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
        <div>结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>
      </el-collapse-item>
    </el-collapse> 
  </div>
</template>
<script>
  export default {
    data() {
      return {
        activeNames: ['3']
      };
    },
    methods: {
      handleChange(val) {
        //输出的是为激活面板改变时呈现展开状态的面板的name值的集合
        console.log(val);
      }
    }
  }
</script>-->
<!--<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>
<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
export default {
  name: "home",
  components: {
    HelloWorld
  }
};
</script>-->
