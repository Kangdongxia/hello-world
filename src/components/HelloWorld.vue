<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      auto-complete="on"
      label-position="left"
    >
      <h3 class="title">登录标题</h3>
      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          v-model="loginForm.username"
          name="username"
          type="text"
          auto-complete="on"
          placeholder="用户名"
        />
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :type="pwdType"
          v-model="loginForm.password"
          name="password"
          auto-complete="on"
          placeholder="密码"
          @keyup.enter.native="handleLogin"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="pwdType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>
      <el-form-item>
        <!--阻止原生的默认行为@click.native.prevent-->
        <el-button
          :loading="loading"
          type="primary"
          style="width:100%;"
          @click.native.prevent="handleLogin"
        >
         请登录
        </el-button>
      </el-form-item>
      <div class="tips">
        <span style="margin-right:20px;">username: admin</span>
        <span> password: admin</span>
      </div>
    </el-form>
    <v-notification
      :options.sync="options"
      :show.sync="showNotification" @close="closeNotification">
    </v-notification>
    <!--<v-notification :show="showNotification" :options="options" @close="closeNotification"></v-notification>-->
    <!--关于弹框-->
    <!--<v-dialog
      v-show="showDialog"
      :dialog-option="dialogOption"
      ref="dialog"
    ></v-dialog>-->
  </div>
</template>

<script>
import { isvalidUsername } from "@/utils/validate";
//import dialog from "../components/Dialog/index";
import Notification from "../components/Notification/index"
export default {
  name: "Login",
  /*关于Dialog*/
  /*components: {
    "v-dialog": dialog
  },*/
  //组件的局部注册
  components:{
    "v-notification": Notification
  },
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!isvalidUsername(value)) {
        callback(new Error("请输入正确的用户名"));
      } else {
        callback();
      }
    };
    const validatePass = (rule, value, callback) => {
      if (value.length < 5) {
        callback(new Error("密码不能小于5位"));
      } else {
        callback();
      }
    };
    return {
      //对表单的值进行初始化
      loginForm: {
        username: "admin11",
        password: "123456"
      },
      loginRules: {
        username: [
          { required: true, trigger: "blur", validator: validateUsername }
        ],
        password: [{ required: true, trigger: "blur", validator: validatePass }]
      },
      loading: false,
      pwdType: "password",
      /*关于Dialog*/
      //showDialog: false,
      //dialogOption: {},
      showNotification:false,
      options:{},
      redirect: undefined
    };
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true
    }
  },
  methods: {
    showPwd() {
      if (this.pwdType === "password") {
        this.pwdType = "";
      } else {
        this.pwdType = "password";
      }
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true;
          this.$store
            .dispatch("Login", this.loginForm)
            .then(response => {
              this.loading = false;
              if (response !== undefined && response !== "") {
                var message = response;
                /*关于Dialog*/
                /*this.dialogOption = {
                  text: message
                };
                this.deleteBook();*/
                this.options = {
                  autoClose:true,
                  countdownBar:true,
                  content:message
                };
                this.showNotification = true;
              } else {
                console.log('登录成功');
                //this.$router.push({ path: this.redirect || '/home' })
                this.$router.push("/Dashboard");
                //this.$router.push("eCharts");
              }
            })
            .catch(() => {
              this.loading = false;
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    /*关于Dialog*/
    deleteBook() {
      this.showDialog = true;
      this.$refs.dialog
        .confirm()
        .then(() => {
          this.showDialog = false;
        })
        .catch(() => {
          this.showDialog = false;
        });
    },
    closeNotification(){
      console.log("关闭提示框");
      this.showNotification = false;
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
$bg: #2d3a4b;
$light_gray: #eee;
/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;
    text-align: left;
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      &:-webkit-autofill {
        // -webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: #fff !important;
      }
    }
    .svg-container {
      padding: 6px 5px 6px 15px;
      color: #889aa4;
      vertical-align: middle;
      width: 30px;
      display: inline-block;
    }
  }
  .el-form-item__content {
    line-height: 40px;
    position: relative;
    font-size: 14px;
    .svg-icon {
      width: 1em;
      height: 1em;
      vertical-align: -0.15em;
      fill: currentColor;
      overflow: hidden;
    }
    .el-button {
      display: inline-block;
      line-height: 1;
      white-space: nowrap;
      cursor: pointer;
      background: #fff;
      border: 1px solid #dcdfe6;
      color: #606266;
      -webkit-appearance: none;
      text-align: center;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      outline: 0;
      margin: 0;
      -webkit-transition: 0.1s;
      transition: 0.1s;
      font-weight: 500;
      padding: 12px 20px;
      font-size: 14px;
      border-radius: 4px;
    }
    .el-button--primary {
      color: #fff;
      background-color: #409eff;
      border-color: #409eff;
    }
  }
  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
    margin-bottom: 22px;
  }
}
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;
.login-container {
  position: fixed;
  height: 100%;
  width: 100%;
  background-color: $bg;
  .login-form {
    position: absolute;
    left: 0;
    right: 0;
    width: 520px;
    max-width: 100%;
    padding: 35px 35px 15px 35px;
    margin: 120px auto;
  }
  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;
    text-align: left;
    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }
  .title {
    font-size: 26px;
    font-weight: 400;
    color: $light_gray;
    margin: 0px auto 40px auto;
    text-align: center;
    font-weight: bold;
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
<style module>
.red {
  color: red;
}
.bold {
  font-weight: bold;
}
</style>
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
        输出的是为激活面板改变时呈现展开状态的面板的name值的集合
        console.log(val);
      }
    }
  }
</script>-->
<!--走马灯，可实现轮播，示例为卡片模式-->
<!--<template>
  <el-carousel :interval="2000" type="card" height="200px">
    <el-carousel-item v-for="item in 6" :key="item">
      <h3>{{ item }}</h3>
    </el-carousel-item>
  </el-carousel>
</template>

<style>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>-->
<!--card卡片，阴影的展示可控-->
<!--<template>
  <div>
    <el-row :gutter="12">
      <el-col :span="8">
        <el-card shadow="never">
          总是显示
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card shadow="hover">
          鼠标悬浮时显示
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card shadow="never">
          从不显示
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>-->
<!--popover弹框-->
<!--<template>
  <div>
    <el-popover
      placement="right-start"
      width="160"
      v-model="visible2"
      offset = 600>
      <p>这是一段内容这是一段内容确定删除吗？</p>
      <div style="text-align: right; margin: 0">
        <el-button size="mini" type="text" @click="visible2 = false">取消</el-button>
        <el-button type="primary" size="mini" @click="visible2 = false">确定</el-button>
      </div>
      <el-button slot="reference">删除</el-button>
    </el-popover>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        visible2: false,
      };
    }
  }
</script>-->
<!--toolTip transition为none后即可取消显示或隐藏的动画-->
<!--<template>
  <div class="box">
    <el-tooltip :disabled="disabled" content="点击关闭 tooltip 功能" placement="bottom" effect="light" hide-after=2000 transition="none">
      <el-button @click="disabled = !disabled">点击{{disabled ? '开启' : '关闭'}} tooltip 功能</el-button>
    </el-tooltip>
    <el-tooltip placement="top">
      提示信息并没有直接写在el-tooltip的content属性上，而是由一个slot为content的div的内容确定
     <div slot="content">多行信息<br/>第二行信息</div>
     <el-button>Top center</el-button>
    </el-tooltip>
  </div>
</template>
<style lang="scss">
  .box {
    width: 400px;
    .top {
      text-align: center;
    }
    .left {
      float: left;
      width: 60px;
    }
    .right {
      float: right;
      width: 60px;
    }
    .bottom {
      clear: both;
      text-align: center;
    }
    .item {
      margin: 4px;
    }
    .left .el-tooltip__popper,
    .right .el-tooltip__popper {
      padding: 8px 10px;
    }
  }
</style>
<script>
  export default{
    data(){
      return {
       disabled:false 
      }
    }
  }
</script>-->
<!--弹框示例，所显示的消息是变量且触发handleClose()方法后消息的内容可更改-->
<!--<template>
  <div>
    <el-button type="text" @click="dialogVisible = true">点击打开 Dialog</el-button>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
      center>
      <span>{{message}}</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        dialogVisible: false,
        message:'这是一段消息'
      };
    },
    methods: {
      /*点击遮罩层，右上角的x或者esc关闭弹框触发该事件,点击footer里的取消或确定则不触发*/
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done(); //done方法是beforeClose属性的参数之一，用于关闭实例
          })
          .catch(_ => {this.message = "开开心心啦啦啦啦"});
      }
    }
  };
</script>-->
<!--关于步骤条-->
<!--<template>
  <el-steps :space="200" :active="2" finish-status="finish" align-center direction="vertical" simple>
  <el-step title="已完成" description="这是一段很长很长很长的描述性文字" icon="el-icon-edit"></el-step>
  <el-step title="进行中" description="这是一段很长很长很长的描述性文字" icon="el-icon-upload"></el-step>
  <el-step title="步骤 3" description="这是一段很长很长" icon="el-icon-picture"></el-step>
</el-steps>
</template>-->
<!--下拉菜单四种尺寸-->
<!--<template>
  <div>
    <el-dropdown split-button type="primary">
         默认尺寸
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>黄金糕</el-dropdown-item>
        <el-dropdown-item>狮子头</el-dropdown-item>
        <el-dropdown-item>螺蛳粉</el-dropdown-item>
        <el-dropdown-item>双皮奶</el-dropdown-item>
        <el-dropdown-item>蚵仔煎</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>

    <el-dropdown size="medium" split-button type="primary">
      中等尺寸
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>黄金糕</el-dropdown-item>
        <el-dropdown-item>狮子头</el-dropdown-item>
        <el-dropdown-item>螺蛳粉</el-dropdown-item>
        <el-dropdown-item>双皮奶</el-dropdown-item>
        <el-dropdown-item>蚵仔煎</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>

    <el-dropdown size="small" split-button type="primary">
      小型尺寸
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>黄金糕</el-dropdown-item>
        <el-dropdown-item>狮子头</el-dropdown-item>
        <el-dropdown-item>螺蛳粉</el-dropdown-item>
        <el-dropdown-item>双皮奶</el-dropdown-item>
        <el-dropdown-item>蚵仔煎</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>

    <el-dropdown size="mini" split-button type="primary">
      超小尺寸
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>黄金糕</el-dropdown-item>
        <el-dropdown-item>狮子头</el-dropdown-item>
        <el-dropdown-item>螺蛳粉</el-dropdown-item>
        <el-dropdown-item>双皮奶</el-dropdown-item>
        <el-dropdown-item>蚵仔煎</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>
<style>
  .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
</style>
<script>
  export default {
    methods: {
      handleCommand(command) {
        this.$message('click on item ' + command);
      }
    }
  }
</script>-->
<!--Tabs页，每一项tab可删除，可添加新tab-->
<!--<template>
  <div>
    <div style="margin-bottom: 20px;">
      <el-button
        size="small"
        @click="addTab(editableTabsValue2)"
      >
        add tab
      </el-button>
    </div>
    <el-tabs v-model="editableTabsValue2" type="card" closable @tab-remove="removeTab">
      <el-tab-pane
        v-for="(item) in editableTabs2"
        :key="item.name"
        :label="item.title"
        :name="item.name"
      >
        {{item.content}}
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        editableTabsValue2: '2',
        editableTabs2: [{
          title: 'Tab 1',
          name: '1',
          content: 'Tab 1 content'
        }, {
          title: 'Tab 2',
          name: '2',
          content: 'Tab 2 content'
        }],
        tabIndex: 2
      }
    },
    methods: {
      addTab() {
        let newTabName = ++this.tabIndex + '';
        this.editableTabs2.push({
          title: 'New Tab',
          name: newTabName,
          content: 'New Tab content'
        });
        this.editableTabsValue2 = newTabName;
      },
      removeTab(targetName) {
        let tabs = this.editableTabs2;
        let activeName = this.editableTabsValue2;
        if (activeName === targetName) {
          tabs.forEach((tab, index) => {
            if (tab.name === targetName) {
              let nextTab = tabs[index + 1] || tabs[index - 1];
              if (nextTab) {
                activeName = nextTab.name;
              }
            }
          });
        }
        this.editableTabsValue2 = activeName;
        this.editableTabs2 = tabs.filter(tab => tab.name !== targetName);
      }
    }
  }
</script>-->
<!--tabs标签页位置可设定-->
<!--<template>
  <div>
  <el-radio-group v-model="tabPosition" style="margin-bottom: 30px;">
    <el-radio-button label="top">top</el-radio-button>
    <el-radio-button label="right">right</el-radio-button>
    <el-radio-button label="bottom">bottom</el-radio-button>
    <el-radio-button label="left">left</el-radio-button>
  </el-radio-group>
  <el-tabs :tab-position="tabPosition" style="height: 200px;">
    <el-tab-pane label="用户管理">用户管理</el-tab-pane>
    <el-tab-pane label="配置管理">配置管理</el-tab-pane>
    <el-tab-pane label="角色管理">角色管理</el-tab-pane>
    <el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane>
  </el-tabs>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        tabPosition: 'top'
      };
    }
  };
</script>-->
<!--导航栏可展开收缩-->
<!--<template>
  <div>
        <h5>默认颜色</h5>
        <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
          <el-radio-button :label="false">展开</el-radio-button>
          <el-radio-button :label="true">收起</el-radio-button>
        </el-radio-group>
        <el-menu
          default-active="1-4-1"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          :collapse="isCollapse">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>导航一</span>
            </template>
            <el-menu-item-group>
              //slot具名设组
              <template slot="title">分组一</template>
              <el-menu-item index="1-1">选项1</el-menu-item>
              <el-menu-item index="1-2">选项2</el-menu-item>
            </el-menu-item-group>
            //title设组
            <el-menu-item-group title="分组2">
              <el-menu-item index="1-3">选项3</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="1-4">
              <template slot="title">选项4</template>
              <el-menu-item index="1-4-1">选项1</el-menu-item>
            </el-submenu>
          </el-submenu>
          <el-menu-item index="2">
            <i class="el-icon-menu"></i>
            <span slot="title">导航二</span>
          </el-menu-item>
          <el-menu-item index="3" disabled>
            <i class="el-icon-document"></i>
            <span slot="title">导航三</span>
          </el-menu-item>
          <el-menu-item index="4">
            <i class="el-icon-setting"></i>
            <span slot="title">导航四</span>
          </el-menu-item>
        </el-menu>
  </div>
</template>
<style>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
</style>
<script>
  export default {
    data() {
      return {
        isCollapse: false
      };
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>-->

<!--Notification示例-->
<!--<template>
  <div>
    <el-button
      plain
      @click="open3">
      成功
    </el-button>
    <el-button
      plain
      @click="open4">
      警告右下角
    </el-button>
    <el-button
      plain
      @click="open5">
      消息左下角
    </el-button>
    <el-button
      plain
      @click="open6">
      错误
    </el-button>
  </div>
</template>

<script>
  export default {
    methods: {
      open3() {
        this.$notify({
          title: '成功',
          message: '这是一条成功的提示消息',
          type: 'success'
        });
      },
      open4() {
        this.$notify({
          title: '警告',
          position:"bottom-right",
          message: '这是一条警告的提示消息',
          type: 'warning',
          onClose:function(){
            console.log('关闭警告弹框');
          }
        });
      },
      open5() {
        this.$notify.info({
          title: '消息',
          position:"bottom-left",
          message: '这是一条消息的提示消息',
          offset: 100
        });
      },
      open6() {
        this.$notify.error({
          title: '错误',
          message: '这是一条错误的提示消息',
          duration:0,
          showClose:false
        });
      }
    }
  }
</script>-->
<!--MessageBox实例 -->
<!--<template>
  <el-button type="text" @click="open6">点击打开 Message Box</el-button>
</template>
<script>
  export default {
    methods: {
      open6() {
        this.$confirm('检测到未保存的内容，是否在离开页面前保存修改？', '确认信息', {
          distinguishCancelAndClose: true,
          confirmButtonText: '保存',
          roundButton:false,//两个按钮是圆角按钮（border-radius会大一些）
          cancelButtonText: '放弃修改'//都起到关闭messagebox的作用，点击放弃修改action的值才为cancel,如果是点击message框右上侧的x或是esc,或是遮罩层，action的值不是cancel
        })
          .then(() => {
            this.$message({
              type: 'info',
              message: '保存修改'
            });
          })
          .catch(action => {
            this.$message({
              type: 'info',
              message: action === 'cancel'
                ? '放弃保存并离开页面'
                : '停留在当前页面'
            })
          });
      }
    }
  }
</script>-->
<!--Message框message信息为HTML字段,onClose属性的使用-->
<!--<template>
  <el-button :plain="true" @click="openHTML">使用 HTML 片段</el-button>
</template>
<script>
  export default {
    methods: {
      openHTML() {
        this.$message({
          dangerouslyUseHTMLString: true,
          type:"success",
          message: '<strong>这是HTML片段</strong>',
          showClose:true,
          duration:0,
          onClose:function(messageDemo){
             console.log('111',messageDemo);
          }
        });
      }
    }
  }
</script>-->
<!--alert框样例-->
<!--<template>
  <div class="outer">
    <el-alert
      title="成功提示的文案"
      type="success"
      description="文字说明文字说明文字说明文字说明文字说明文字说明"
      show-icon
    >
    </el-alert>
    <el-alert title="消息提示的文案" type="info" description="文字说明文字说明文字说明文字说明文字说明文字说明" show-icon> </el-alert>
    <el-alert title="警告提示的文案" type="warning" description="文字说明文字说明文字说明文字说明文字说明文字说明" show-icon> </el-alert>
    <el-alert title="错误提示的文案" type="error" description="文字说明文字说明文字说明文字说明文字说明文字说明" show-icon> </el-alert>
  </div>
</template>
<style>
  .outer {
    padding:10%;
  } 
</style>-->
<!--分页部分的例子-->
<!--<template>
 <div>
  <div class="block">
    <span class="demonstration">显示总数</span>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage1"
      :page-size="100"
      layout="total, prev, pager, next"
      :total="1000">
    </el-pagination>
  </div>
  <div class="block">
    <span class="demonstration">调整每页显示条数</span>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage2"
      :page-sizes="[100, 200, 300, 400]"
      :page-size="100"
      layout="sizes, prev, pager, next"
      :total="1000">
    </el-pagination>
  </div>
  <div class="block">
    <span class="demonstration">直接前往</span>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage3"
      :page-size="100"
      layout="prev, pager, next, jumper"
      :total="1000">
    </el-pagination>
  </div>
  <div class="block">
    <span class="demonstration">完整功能</span>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[100, 200, 300, 400]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400">
    </el-pagination>
  </div>
  </div>
</template>
<script>
  export default {
    methods: {
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      }
    },
    data() {
      return {
        currentPage1: 5,
        currentPage2: 5,
        currentPage3: 5,
        currentPage4: 4
      };
    }
  }
</script>-->
<!--tree的拖拽-->
<!--<template>
  <div>
    <el-tree
      :data="data6"
      node-key="id"
      default-expand-all
      @node-drag-start="handleDragStart"
      @node-drag-enter="handleDragEnter"
      @node-drag-leave="handleDragLeave"
      @node-drag-over="handleDragOver"
      @node-drag-end="handleDragEnd"
      @node-drop="handleDrop"
      draggable
      :allow-drop="allowDrop"
      :allow-drag="allowDrag">
    </el-tree>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        data6: [{
          id: 1,
          label: '一级 1',
          children: [{
            id: 4,
            label: '二级 1-1',
            children: [{
              id: 9,
              label: '三级 1-1-1'
            }, {
              id: 10,
              label: '三级 1-1-2'
            }]
          }]
        }, {
          id: 2,
          label: '一级 2',
          children: [{
            id: 5,
            label: '二级 2-1'
          }, {
            id: 6,
            label: '二级 2-2'
          }]
        }, {
          id: 3,
          label: '一级 3',
          children: [{
            id: 7,
            label: '二级 3-1'
          }, {
            id: 8,
            label: '二级 3-2',
            children: [{
             id: 11,
              label: '三级 3-2-1'
            }, {
              id: 12,
              label: '三级 3-2-2'
            }, {
              id: 13,
              label: '三级 3-2-3'
            }]
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      };
    },
    methods: {
      handleDragStart(node) {
        console.log("drag start", node);
      },
      handleDragEnter(draggingNode, dropNode) {
        console.log('tree drag enter: ', dropNode.label);
      },
      handleDragLeave(draggingNode, dropNode) {
        console.log('tree drag leave: ', dropNode.label);
      },
      handleDragOver(draggingNode, dropNode) {
        console.log('tree drag over: ', dropNode.label);
      },
      handleDragEnd(draggingNode, dropNode, dropType) {
        console.log('tree drag end: ', dropNode && dropNode.label, dropType);
      },
      handleDrop(draggingNode, dropNode, dropType) {
        console.log('tree drop: ', dropNode.label, dropType);
      },
      allowDrop(draggingNode, dropNode, type) {
        if (dropNode.data.label === '二级 3-1') {
          //二级3-1不能插入目标节点
          return type !== 'inner';
        } else {
          return true;
        }
      },
      allowDrag(draggingNode) {
        //只有该节点无法拖拽
        return draggingNode.data.label.indexOf('三级 3-2-2') === -1;
      }
    }
  };
</script>-->

<!--动态编辑标签-->
<!--<template>
  <div>
    <el-tag
    :key="tag"
    v-for="tag in dynamicTags"
    closable
    :disable-transitions="false"
    @close="handleClose(tag)">
    {{tag}}
  </el-tag>
  <el-input
    class="input-new-tag"
    v-if="inputVisible"
    v-model="inputValue"
    ref="saveTagInput"
    size="small"
    @keyup.enter.native="handleInputConfirm"
    @blur="handleInputConfirm"
  >
  </el-input>
  <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
  </div> 
</template>

<style>
  .el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
</style>

<script>
  export default {
    data() {
      return {
        dynamicTags: ['标签一', '标签二', '标签三'],
        inputVisible: false,
        inputValue: ''
      };
    },
    methods: {
      handleClose(tag) {
        this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
      },

      showInput() {
        this.inputVisible = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },

      handleInputConfirm() {
        let inputValue = this.inputValue;
        if (inputValue) {
          this.dynamicTags.push(inputValue);
        }
        this.inputVisible = false;
        this.inputValue = '';
      }
    }
  }
</script>-->
<!--表格排序测试-->
<!--<template>
  <el-table
    :data="tableData"
    style="width: 100%"
    :default-sort = "{prop: 'date', order: 'ascending'}"
    >
    <el-table-column
      prop="date"
      sortable
      label="日期"
      width="180">
    </el-table-column>
    <el-table-column
      prop="name"
      label="姓名"
      width="180">
    </el-table-column>
    <el-table-column
      prop="age"
      sortable
      label="年龄"
      width="180">
    </el-table-column>
    <el-table-column
      prop="address"
      label="地址"
      :formatter="formatter">
    </el-table-column>
  </el-table>
</template>

<script>
  export default {
    data() {
      return {
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          age:'16',
          address: '上海市普陀区金沙江路 1518 弄'
        }, 
         {
          date: '2016-05-04',
          name: '王莉莉',
          age:'14',
          address: '上海市普陀区金沙江路 1516 弄'
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          age:'14',
          address: '上海市普陀区金沙江路 1517 弄'
        },
        {
          date: '2016-05-04',
          name: '软软',
          age:'14',
          address: '上海市普陀区金沙江路 1517 弄'
        }, 
        {
          date: '2016-05-02',
          name: '王莉莉',
           age:'12',
          address: '上海市普陀区金沙江路 1519 弄'
        }]
      }
    },
    methods: {
      formatter(row, column) {
        return row.address;
      }
    }
  }
</script>-->

<!--<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
      For a guide and recipes on how to configure / customize this project,<br />
      check out the
      <a href="https://cli.vuejs.org" target="_blank" rel="noopener">vue-cli documentation</a>.
    </p>
    <h3>Installed CLI Plugins</h3>
    <ul>
      <li>
        <a
          href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-babel"
          target="_blank"
          rel="noopener"
          >babel</a
        >
      </li>
      <li>
        <a
          href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-router"
          target="_blank"
          rel="noopener"
          >router</a
        >
      </li>
      <li>
        <a
          href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-vuex"
          target="_blank"
          rel="noopener"
          >vuex</a
        >
      </li>
      <li>
        <a
          href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-eslint"
          target="_blank"
          rel="noopener"
          >eslint</a
        >
      </li>
    </ul>
    <h3>Essential Links</h3>
    <ul>
      <li>
        <a href="https://vuejs.org" target="_blank" rel="noopener">Core Docs</a>
      </li>
      <li>
        <a href="https://forum.vuejs.org" target="_blank" rel="noopener"
          >Forum</a
        >
      </li>
      <li>
        <a href="https://chat.vuejs.org" target="_blank" rel="noopener"
          >Community Chat</a
        >
      </li>
      <li>
        <a href="https://twitter.com/vuejs" target="_blank" rel="noopener"
          >Twitter</a
        >
      </li>
      <li>
        <a href="https://news.vuejs.org" target="_blank" rel="noopener">News</a>
      </li>
    </ul>
    <h3>Ecosystem</h3>
    <ul>
      <li>
        <a href="https://router.vuejs.org" target="_blank" rel="noopener"
          >vue-router</a
        >
      </li>
      <li>
        <a href="https://vuex.vuejs.org" target="_blank" rel="noopener">vuex</a>
      </li>
      <li>
        <a
          href="https://github.com/vuejs/vue-devtools#vue-devtools"
          target="_blank"
          rel="noopener"
          >vue-devtools</a
        >
      </li>
      <li>
        <a href="https://vue-loader.vuejs.org" target="_blank" rel="noopener"
          >vue-loader</a
        >
      </li>
      <li>
        <a
          href="https://github.com/vuejs/awesome-vue"
          target="_blank"
          rel="noopener"
          >awesome-vue</a
        >
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String
  }
};
</script>
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>-->
