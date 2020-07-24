<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name:{{ name }}</div>
    <div class="dashboard-text">roles:<span v-for="role in roles" :key="role">{{ role }}</span></div>
    <div>
       <p><img src="data:image/jpeg;base64,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" alt="" width="211" height="117" />值被改变</p>
       <p>😉值被改变</p>
       <p>😊🤑666666</p>
       <el-table
        :data="tableData"
        style="width: 100%"
        >
        <el-table-column
          prop="id"
          sortable
          label="编号"
          width="180">
        </el-table-column>
        <el-table-column
          prop="userName"
          label="姓名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="role"
          sortable
          label="角色"
          width="180">
        </el-table-column>
        <el-table-column
          prop="password"
          label="密码">
        </el-table-column>
      </el-table>
      <el-button type="primary" round @click="updateData">修改</el-button>
      <v-notification :options.sync="options" :show.sync="showNotification" @close="closeNotification">
      </v-notification>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Notification from "@/components/Notification/index"
import { formatRole } from "@/utils/format" //引入设置了名字的函数或变量，函数或变量要用{}包起来，多个用逗号隔开
export default {
  name: 'Dashboard',
  components:{
    "v-notification": Notification
  },
  data() {
      return {
        tableData: [],
        showNotification:false,
        options:{}
      } 
  },
  created(){
    //this.getData();
  },
  computed: {
    //使用对象展开运算符将getter混入computed对象中
    ...mapGetters([
      'name',//如果想改名称，可以用对象的方式name1: 'name'
      'roles'
    ])
  },
  watch:{
    tableData(val){
       this.tableData = val;
    } 
  },
  methods:{
    formatter(row, column) {
        return row.address;
    },
    getData(){
        let params = {
          currentPage:1,
          currentPerNum:6
        }
        this.$store .dispatch("GetTableInfo", {params}).then(response => {
            if (response===0) {
                var message = response;
                this.options = {
                    autoClose:false,
                    countdownBar:true,
                    content:message
                  };
                  this.showNotification = true;
                } else {
                  let tableList = response;
                  tableList.forEach((listItem)=>{
                      listItem.role  = formatRole(listItem.role);
                  })               
                  this.tableData = tableList;
                }
              })
              .catch(() => {
                this.loading = false;
              });
    },
    closeNotification(){
        console.log("关闭提示框");
        this.showNotification = false;
    },
    updateData(){
      /*this.tableData[0] = {
        "id": 8,
        "userName": "11111",
        "password": "99999",
        "role": 1
      }*/
      this.$set(this.tableData,0,{
        "id": 8,
        "userName": "11111",
        "password": "99999",
        "role": 1
      })
      /*this.tableData = [
          {
              "id": 8,
              "userName": "11111",
              "password": "99999",
              "role": 1
          },
          {
              "id": 7,
              "userName": "22222",
              "password": "88888",
              "role": 2
          },
          {
              "id": 6,
              "userName": "33333",
              "password": "99999",
              "role": 0
          },
          {
              "id": 5,
              "userName": "44444",
              "password": "77777",
              "role": 0
          },
          {
              "id": 4,
              "userName": "55555",
              "password": "666666",
              "role": 0
          },
          {
              "id": 3,
              "userName": "77777777",
              "password": "88888888",
              "role": 0
          }
      ];*/ 
    }
 }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
