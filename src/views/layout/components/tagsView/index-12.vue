<template>
  <div id="tags-view-container" class="tags-view-container">
    <scroll-pane ref="scrollPane" class="tags-view-wrapper">
      <span v-for="(item,index) in array" :key="index" class="itemContent">
        {{ item }}
      </span>
    </scroll-pane>
    <!---->
    <!-- <ul v-show="visible" :style="{left:left+'px',top:top+'px'}" class="contextmenu">
      <li @click="refreshSelectedTag(selectedTag)">Refresh</li>
      <li v-if="!isAffix(selectedTag)" @click="closeSelectedTag(selectedTag)">Close</li>
      <li @click="closeOthersTags">Close Others</li>
      <li @click="closeAllTags(selectedTag)">Close All</li>
    </ul> -->
  </div>
</template>
<script>
 import ScrollPane from './ScrollPane'
 export default {
   data(){
     return {
       array:['1','2','3','4','1','2','3','4','1','2','3','4','1','2','3','4']  
     }  
   },
   components: { ScrollPane }  
 }
</script>
<style lang="scss">
  .tags-view-wrapper{
     .itemContent{
       width:50px;
       margin-right:200px;  
     } 
  } 
</style>