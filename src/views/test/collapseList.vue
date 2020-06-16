<template>
   <div id="cardList">
      <div class="singleItem">
          <cardItem v-for="(item,index) in cardListOne" :key="index" :title="item.title" :detailList="item.detailList">
          </cardItem>   
      </div>
      <div class="singleItem">
          <cardItem v-for="(item,index) in cardListTwo" :key="index" :title="item.title" :detailList="item.detailList">
          </cardItem>   
      </div> 
     <div class="singleItem">
          <cardItem v-for="(item,index) in cardListOne" :key="index" :title="item.title" :detailList="item.detailList">
          </cardItem>   
      </div>
      <div class="singleItem">
          <cardItem v-for="(item,index) in cardListTwo" :key="index" :title="item.title" :detailList="item.detailList">
          </cardItem>   
      </div> 
      <div class="singleItem">
          <cardItem v-for="(item,index) in cardListOne" :key="index" :title="item.title" :detailList="item.detailList">
          </cardItem>   
      </div>
      <div class="singleItem">
          <cardItem v-for="(item,index) in cardListTwo" :key="index" :title="item.title" :detailList="item.detailList">
          </cardItem>   
      </div> 
      <div class="singleItem">
          <cardItem v-for="(item,index) in cardListOne" :key="index" :title="item.title" :detailList="item.detailList">
          </cardItem>   
      </div>
      <div class="singleItem">
          <cardItem v-for="(item,index) in cardListTwo" :key="index" :title="item.title" :detailList="item.detailList">
          </cardItem>   
      </div> 
     <div class="singleItem">
          <cardItem v-for="(item,index) in cardListOne" :key="index" :title="item.title" :detailList="item.detailList">
          </cardItem>   
      </div>
      <div class="singleItem">
          <cardItem v-for="(item,index) in cardListTwo" :key="index" :title="item.title" :detailList="item.detailList">
          </cardItem>   
      </div> 
      <div class="singleItem">
          <cardItem v-for="(item,index) in cardListOne" :key="index" :title="item.title" :detailList="item.detailList">
          </cardItem>   
      </div>
      <div class="singleItem">
          <cardItem v-for="(item,index) in cardListTwo" :key="index" :title="item.title" :detailList="item.detailList">
          </cardItem>   
      </div>       
   </div>
</template>
<script>
  import collapseItem from '../../components/collapseCard/collapseItem'
  export default {
    data(){
      return {
        cardListOne:[
          {
            title:'Command and Scripting interpreter',
            detailList:['PowerShell','AppleScript','Windows Command Shell','Bash','VBScript','Python']   
          },
          {
            title:'Phishing',
            detailList:['Spearphishing Attachment','Spearphishing Link','Spearphishing via Service']   
          },
          {
            title:'Vaild Accounts',
            detailList:['Default Accounts','Domain Accounts','Local Accounts','Cloud Accounts']   
          },
          {
            title:'Driver-by Compromise',
            detailList:[]  
          }  
        ],
         cardListTwo:[
          {
            title:'Phishing',
            detailList:['Spearphishing Attachment','Spearphishing Link','Spearphishing via Service']   
          }
        //   {
        //     title:'Driver-by Compromise',
        //     detailList:[]  
        //   }  
        ]
      }    
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
   }
 }
</style>