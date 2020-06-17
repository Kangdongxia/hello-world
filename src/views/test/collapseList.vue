<template>
   <div id="cardList">
      <div class="singleItem" v-for="(item,index) in cardData" :key="index">
          <header>
             <div class="title">{{ item.title }}</div>
             <div class="subTitle">{{ item.cardList.length }} techniques</div>
          </header>
          <main>
            <cardItem v-for="(item,index) in item.cardList" :key="index" :title="item.title" :detailList="item.detailList">
            </cardItem> 
          </main>        
      </div>
   </div>
</template>
<script>
  import collapseItem from '../../components/collapseCard/collapseItem'
  import { mapState } from 'vuex'
  export default {
    data(){
      return {   
        cardData:[]
      }    
    },
    computed:{
      ...mapState({
        cardListOne: state => state.collapse.cardListOne,
        cardListTwo: state => state.collapse.cardListTwo
      })
    },
    mounted(){
      this.cardData = [
        {
          title:'initial Access',
          cardList:this.cardListOne
        },
        {
          title:'Execution',
          cardList:this.cardListTwo
        },
        {
          title:'initial Access',
          cardList:this.cardListOne
        },
        {
          title:'Execution',
          cardList:this.cardListTwo
        },
        {
          title:'initial Access',
          cardList:this.cardListOne
        },
        {
          title:'Execution',
          cardList:this.cardListTwo
        },
        {
          title:'initial Access',
          cardList:this.cardListOne
        },
        {
          title:'Execution',
          cardList:this.cardListTwo
        },
        {
          title:'initial Access',
          cardList:this.cardListOne
        },
        {
          title:'Execution',
          cardList:this.cardListTwo
        },
        {
          title:'initial Access',
          cardList:this.cardListOne
        },
        {
          title:'Execution',
          cardList:this.cardListTwo
        }
      ]  
    },
    components:{
      cardItem:collapseItem  
    }  
  }
</script>
<style lang="less">
 #cardList{
   //padding:20px 20px 20px 20px;
   padding:0px;
   display:inline-flex;
   overflow-x: auto !important;
   .singleItem{
     margin:10px;
     header{
       text-align:center;
       margin-bottom: 7px;
       .title{
         font-size:16px;
         color:#4F7CAC;
         margin-bottom:5px;
       }
       .subTitle{
         color:#39434C;
         font-size:13px;
       }
     }  
   }
 }
</style>