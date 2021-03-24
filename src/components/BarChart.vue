<template>
  <div class="control-section">
    <div align='center'>
        <ejs-chart style='display:block' :theme='theme' align='center' id='chartcontainer' :title='title' :primaryXAxis='primaryXAxis' :primaryYAxis='primaryYAxis'
            :chartArea='chartArea' :width='width' :tooltip='tooltip'>
            <e-series-collection>
                <e-series :dataSource='seriesData' type='Bar' xName='x' yName='y' name='Imports' :marker='marker'> </e-series>
                <e-series :dataSource='seriesData1' type='Bar' xName='x' yName='y' name='Exports' :marker='marker'> </e-series>
            </e-series-collection>
        </ejs-chart>
    </div>
    <div style="float: right; margin-right: 10px;dispaly:flex;justify-content: center; width: 100%; margin-top: 24px;">Source:
       <a href="https://www.gov.uk/" target="_blank">www.gov.uk</a>
    </div>

</div>

</template>

<script>
import Vue from "vue";
import { Browser } from '@syncfusion/ej2-base';
import { ChartPlugin, BarSeries, Category, Tooltip, Legend, DataLabel} from "@syncfusion/ej2-vue-charts";

Vue.use(ChartPlugin);

let selectedTheme = location.hash.split("/")[1];
selectedTheme = selectedTheme ? selectedTheme : "Material";
let theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark");

export default {
  data() {
    return {
      theme: theme,
      seriesData: [
        { x: 'Egg', y: 2.2 }, { x: 'Fish', y: 2.4 },
        { x: 'Misc', y: 3 }, { x: 'Tea', y: 3.1 }
      ],
      seriesData1: [
                { x: 'Egg', y: 1.2 }, { x: 'Fish', y: 1.3 },
                { x: 'Misc', y: 1.5 }, { x: 'Tea', y: 2.2 }

      ],

      //Initializing Primary X Axis
      primaryXAxis: {
        valueType: 'Category',
        title: 'Food',
        interval: 1,
        majorGridLines: { width: 0 }
      },

      //Initializing Primary Y Axis
      primaryYAxis:
        {
            labelFormat: '{value}B',
            edgeLabelPlacement: 'Shift',
            majorGridLines: { width: 0 },
            majorTickLines: { width: 0 },
            lineStyle: { width: 0 },
            labelStyle: {
                color: 'transparent'
            }
        },
        chartArea: {
            border: {
                width: 0
            }
        },
        marker: {
            dataLabel: {
                visible: true,
                position: 'Top',
                font: {
                    fontWeight: '600', color: '#ffffff'
                }
            }
        },
        width : Browser.isDevice ? '100%' : '60%',
        tooltip: { 
            enable: true
        },
        title: "UK Trade in Food Groups - 2015"
    };
  },
  provide: {
    chart: [BarSeries, Legend, Category, Tooltip, DataLabel]
  },
  methods: {
    load(args) {
        console.log(args);
        let selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        this.theme = selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1);
    }
  },
}
</script>

<style scoped>
#chartcontainer {
    width: 100%;
}
</style>