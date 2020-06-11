<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name:{{ name }}</div>
    <div class="dashboard-text">roles:<span v-for="role in roles" :key="role">{{ role }}</span></div>
    <div>
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
    this.getData();
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
