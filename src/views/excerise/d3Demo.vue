<template>
   <div id="d3Demo">
      <h3>一个简单的图表</h3>
      <!-- <svg ref="baseBarChart" class="base-bar-chart"></svg> -->
      <svg width = "500" height = "500">
        <rect x = "0" y = "0" width = "300" height = "200" fill = "yellow"></rect>
      </svg>
   </div>
</template>
<script>
import * as d3 from 'd3'
export default {
  name:'d3Demo',
  created(){
    //this.init();
  },
  methods:{
    init(){
      const margin = 60;
      const width = 1000 - 2 * margin;
      const height = 600 - 2 * margin;
      let chartSvg = d3.select(this.$refs.baseBarChart)
          .attr('width',width)
          .attr('height',height)
      const chart = chartSvg.append('g')
          .attr('transform', `translate(${margin}, ${margin})`);
      let xScale = d3.scaleLinear()
          .domain([0, 100])
          .range([0, width])
    } 
  }
}
</script>