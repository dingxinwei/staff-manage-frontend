<template>
    <div class="line1">
        <div id="line1"  style="height:100%;"></div>
    </div>
</template>

<script>
import * as echarts from 'echarts/core'
import {
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent
} from 'echarts/components'
import {
  LineChart
} from 'echarts/charts'
import {
  CanvasRenderer
} from 'echarts/renderers'

echarts.use(
  [TitleComponent, ToolboxComponent, TooltipComponent, GridComponent, LegendComponent, LineChart, CanvasRenderer]
)
export default {
  mounted () {
    this.myChart = echarts.init(document.getElementById('line1'))
    this.initData()
  },
  methods: {
    initData () {
      const option = {
        title: {
          text: '考勤统计'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['迟到人数', '未迟到人数']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '未迟到人数',
            type: 'line',
            stack: '总量',
            data: [220, 182, 191, 234, 290, 330, 310]
          },
          {
            name: '迟到人数',
            type: 'line',
            stack: '总量',
            data: [150, 232, 201, 154, 190, 330, 410]
          }
        ]
      }

      this.myChart.setOption(option)
    }
  }
}
</script>

<style >
    .line1{
      height: 100%;
      width: 100%;
    }
</style>
