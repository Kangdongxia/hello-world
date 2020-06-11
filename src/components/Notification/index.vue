/*eslint-disable*/
<template>
  <div>
    <transition name="slide">
      <!--.notification如果v-if改成v-show,会导致在关闭提示框的最后提示框变色-->
      <div class="notification fixed"
           v-if="myShow"
           :style="setStyle">
        <div class="delete"
             @click="close()"></div>
        <!--<div class="delete"
             v-if="!myOptions.autoClose"
             @click="close()"></div>-->
        <div class="content" v-html="myOptions.content">
        </div>
      </div>
    </transition>
    <!--.countdown如果v-if改成v-show，在第一个提示框未关闭时如果再出现第二个弹框，第二个弹框不会自动关闭，-->
    <div class="countdown" 
         v-if="myShow && myOptions.autoClose && myOptions.countdownBar" 
         :style="setTime"
         :class="barControl">
    </div>
  </div>
</template>

<script>
  export default{
    name: 'Notification',
    data () {
      return {
        timers: [],
        barControl: '',
        myOptions: this.options,
        myShow: this.show
      }
    },
    props: {
      'options': {
        type: Object,
        default: {}
      },
      'show': {
        type: Boolean,
        default: false
      }
    },
    computed: {
      setStyle () {
        return {
          color: this.myOptions.textColor || '#fff',
          background: this.myOptions.backgroundColor || '#21e7b6'
        }
      },
      setTime () {
        return {
          transition: `all ${(this.myOptions.showTime / 1000) || 5}s linear`,
          background: this.myOptions.barColor || '#03D6D2'
        }
      }
    },
    methods: {
      countdown () {
        if (this.myOptions.autoClose) {
          if (this.myOptions.countdownBar) {
            setTimeout(() => {
              this.barControl = 'count-leave'
            }, 10)
          }
          const t = setTimeout(() => {
            this.close()
          }, this.myOptions.showTime || 3000)
          this.timers.push(t)
        }
      },
      close () {
        this.$emit('close') // should to emit to change parent components status
        this.myOptions = {}
      }
    },
    watch: {
      options (val) {
        /*this.options和val值相同*/
        /*this.myOptions = val*/
        this.myOptions = this.options
        this.barControl = ''
        this.timers.forEach((timer) => {
          /*取消定时器*/
          window.clearTimeout(timer)
        })
        /*清空timers数组*/
        this.timers = []
        this.countdown()
      },
      show (val) {
        /*this.show和val值相同*/
        this.myShow = val
      }
    }
  }
</script>

<style scoped>
  .slide-transition {
    transition: all .5s linear;
    transform: translateZ(0);
  }

  .slide-enter-active, .slide-leave-active {
    transition: all .5s linear;
    transform: translateZ(0);
  }
  
  /* 使得提示框的出现和消失有动画效果*/
  .slide-enter, .slide-leave-active {
    transform: translate3d(0, -100%, 0);
  }

  /*1.提示框出现时会出现从上而下的跳动*/
  /* .slide-enter-active, .slide-leave-active {
    transition: all .5s linear;
    transform: translate3d(0, -100%, 0);
  }
 
  .slide-enter, .slide-leave-active {
    transform: translate3d(0, -100%, 0);
  }*/

  /*2.提示框的出现和消失没有动画/*
  /*.slide-enter, .slide-leave-active {
    transition: all .5s linear;
    transform: translate3d(0, -100%, 0);
    transform: translateZ(0);
  }*/

  /*3.提示框的出现和消失没有动画/*
  /*.slide-enter-active, .slide-leave-active {
    transition: all .5s linear;
    transform: translate3d(0, -100%, 0);
    transform: translateZ(0);
  }*/

  /*4.正常*/
  /*.slide-enter-active, .slide-leave-active {
    transition: all .3s linear;
  }

  .slide-enter, .slide-leave-active {
    transform: translate3d(0, -100%, 0);
  }*/

  .delete {
    -moz-appearance: none;
    -webkit-appearance: none;
    background: rgba(51, 51, 51, .2);
    cursor: pointer;
    display: inline-block;
    height: 18px;
    position: relative;
    vertical-align: top;
    width: 18px;
    float: right;
    margin-top:0.9rem;
    margin-right:1.6rem;
  }

  .delete:after,
  .delete:before {
    background: #fff;
    content: "";
    display: block;
    height: 2px;
    left: 50%;
    margin-left: -25%;
    margin-top: -1px;
    position: absolute;
    top: 50%;
    width: 50%;
  }

  .delete:before {
    transform: rotate(45deg);
  }

  .delete:after {
    transform: rotate(-45deg);
  }

  .delete:hover {
    background: rgba(51, 51, 51, .5);
  }

  .notification {
    width: 20%;
    line-height: 2;
    z-index: 3;
    position: fixed;
    top: 5%;
    left: 41%; 
    border-radius:5px;
  }

  .notification .content {
    padding: .6rem 0 .6rem 1.4rem;
    font-size:14px;
  }

  .countdown {
    width: 100%;
    height: 4px;
    background: #000;
    z-index: 3;
    position: fixed;
    top: 0;
    left: 0;
    transform: translateZ(0);
  }

  .count-leave {
    transform: translate3d(-100%, 0, 0);
  }
</style>
