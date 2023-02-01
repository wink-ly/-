<template>
    <div class="main">
        <div class="left">
            <div class="count">
                <img class="count_img" src="../../assets/images/book.png" alt="">
                <span>书籍总数</span>
                <span>{{ count }}</span>本
            </div>
            <div id="myChart" class="charts"></div>
        </div>
        <div class="right">
            <div class="count">
                <img class="count_img" src="../../assets/images/book.png" alt="">
                <span>sdfsddsfsdf</span>
                <span>{{ count }}</span>本
            </div>
            <div id="myChart" class="charts"></div>
        </div>
    </div>
</template>

<script setup>
import * as echarts from 'echarts';
import { onMounted, getCurrentInstance } from "vue";
const { proxy } = getCurrentInstance();
let count = localStorage.getItem("data");

const getChart = async () => {
    var chartDom = document.getElementById('myChart');
    var myChart = echarts.init(chartDom);
    var option;
    var array = [];

    const category = ["亲子共读", "科幻畅想", "心灵成长", "科学技术"]
    for (let i = 0; i < 4; i++) {
        await proxy.$axios
            .post(`/book/category/${category[i]}`)
            .then((res) => {
                array[i] = res.data.length
            })
    }
    option = {
        title: {
            text: '分类情况',
            left: 'left'
        },
        tooltip: {
            trigger: 'item'
        },
        // legend: {
        //     orient: 'vertical',
        //     left: 'left'
        // },
        series: [
            {
                type: 'pie',
                radius: '50%',
                data: [
                    { value: array[0], name: category[0] },
                    { value: array[1], name: category[1] },
                    { value: array[2], name: category[2] },
                    { value: array[3], name: category[3] }
                ],
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };
    option && myChart.setOption(option);
}

//监听浏览器窗口大小改变
window.addEventListener('resize', () => {
    location.reload()
});

onMounted(() => {
    getChart();
})
</script>

<style lang="less" scoped>
.main {
    height: 100vh;
    width: 100vw;
    background-color: #f7f8fc;
    padding: 20px;
    display: flex;
    flex-direction: row;

    @media screen and (min-width: 220px) and (max-width:600px) {
        flex-direction: column;
    }
}

.left {
    height: 100%;
    width: 36%;
    flex-direction: column;
    margin-left: 16vh;

    @media screen and (min-width: 220px) and (max-width:600px) {
        width: 70%;
    }
}

.count {
    background-color: #12c3b1;
    color: #fff;
    border-radius: 10px;
    height: 20%;
    display: flex;
    padding: 10px;
    margin: 20px;
}

.count_img {
    height: 60px;
    width: 60px;
    margin: 10px;
}

.charts {
    background-color: #fff;
    height: 40%;
    width: 100%;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
    padding: 10px;
    margin-top: 20px;
}
</style>