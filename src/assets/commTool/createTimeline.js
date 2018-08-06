import echarts from 'echarts'

function createTime () {
  var myChart = echarts.init(document.getElementById('timelineecharts'))
  var option = {
    //timeline基本配置都写在baseoption 中
    baseOption: {
    timeline: {
        loop: false,        
        axisType: 'category',
        show: true,
        autoPlay: true,
        playInterval: 1000,
        data: ['1', '2', '3']
    },
    grid: { containLabel: true },
    xAxis: [{
        type: 'category',
        name: '时间',
    }, ],
    yAxis: { type: 'value', name: '降雨量(mm)' },
    series: [{ type: 'line' }, ],
    tooltip: {}
    },
    //变量则写在options中
    options:[
    {
    xAxis: [{
        data: ['能化国际电力股份有限公司', '大唐国际发电公司', '北京华夏发电公司']
    }],
    title: {
        text: '电量使用总计',
        subtext: '单位:Mwh'
    },
    series: [
        {
            data: [120, 450, 140]
        },
    ]
    },
    {
        xAxis: [{
            data: ['能化国际电力股份有限公司', '大唐国际发电公司', '北京华夏发电公司']
        }],
        title: {
            text: '电量使用总计',
            subtext: '单位:Mwh'
        },
        series: [
            {
                data: [530, 130, 780]
            },
        ]
    },
    {
        xAxis: [{
            data: ['能化国际电力股份有限公司', '大唐国际发电公司', '北京华夏发电公司']
        }],
        title: {
            text: '电量使用总计',
            subtext: '单位:Mwh'
        },
        series: [
            {
                data: [560, 350, 180]
            },

        ]
    },
    ]
  }
  myChart.setOption(option)

  myChart.on('timelinechanged', function (param) {
    console.log(param.currentIndex+1)
    console.log('dj')
  })
}
export default {
  createTime
}
