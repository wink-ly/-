<template>
    <div class="main">
        <div class="top">
            <div class="count1">
                <span>书籍总数</span>
                <text><el-icon><Management /></el-icon>{{ books }}</text>
            </div>
            <div class="count2">
                <span>累计用户数</span>
                <text><el-icon><UserFilled /></el-icon>{{ users }}</text>
            </div>
        </div>
        <div class="charts">
            <div id="line" class="line"></div>
            <div class="column">
                <div id="pie" class="pie1"></div>
                <div id="pie" class="pie2"></div>
            </div>
        </div>
    </div>
</template>

<script setup>
import * as echarts from 'echarts';
import { onMounted, getCurrentInstance } from "vue";
import { Management, UserFilled } from "@element-plus/icons";
const { proxy } = getCurrentInstance();
let books = localStorage.getItem("data");
let users = localStorage.getItem("user");
const category = ["经典文学", "亲子共读", "科幻畅想", "心灵成长", "科学技术"]
var array = [];

const getPie = async () => {
    var chartDom = document.getElementById('pie');
    var chartPie = echarts.init(chartDom);
    let option;

    for (let i = 0; i < 5; i++) {
        await proxy.$axios
            .post(`/book/category/${category[i]}`)
            .then((res) => {
                array[i] = res.data.length
            })
    }
    option = {
        title: {
            text: '分类情况',
            left: 'center'
        },
        tooltip: {
            trigger: 'item'
        },
        legend: {
            orient: 'vertical',
            left: 'left'
        },
        series: [
            {
                type: 'pie',
                radius: '50%',
                data: [
                    { value: array[0], name: category[0] },
                    { value: array[1], name: category[1] },
                    { value: array[2], name: category[2] },
                    { value: array[3], name: category[3] },
                    { value: array[4], name: category[4] }
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
    option && chartPie.setOption(option);
}

const getLine = () => {
    var chartDom = document.getElementById('line');
    var chartLine = echarts.init(chartDom);
    let option;

    option = {
        title: {
            text: '折线图'
        },
        legend: {
            data: ['email', 'Union Ads']
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                name: 'email',
                type: 'line',
                stack: 'Total',
                data: [120, 132, 101, 134, 90, 230, 210]
            },
            {
                name: 'Union Ads',
                type: 'line',
                stack: 'Total',
                data: [220, 182, 191, 234, 290, 330, 310]
            },
        ]
    };

    option && chartLine.setOption(option);
}
const getProfile = () => {
    proxy.$axios
        .post("/user/allUsers")
        .then((res) => {
            localStorage.setItem("user", res.data.length)
        })
};
//监听浏览器窗口大小改变
window.addEventListener('resize', () => {
    location.reload()
});

onMounted(() => {
    getPie();
    getLine();
    getProfile();
})
</script>

<style lang="less" scoped>
.main {
    height: 92vh;
    background-color: #f7f8fc;
    padding: 20px;
    overflow: scroll;
}

.top {
    display: flex;
    color: #141313;
}

span {
    font-size: 16px;
    font-weight: bold;
    margin: 10px;
}

.count1 {
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 16vh;
    width: 20%;
    margin: 20px;
    padding: 10px;
    margin-left: 20vh;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);

    @media screen and (min-width: 220px) and (max-width:600px) {
        width: 100%;
        margin-left: 10px;
        margin-top: 60px;
    }
}

.count2 {
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 20%;
    margin: 20px;
    padding: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);

    @media screen and (min-width: 220px) and (max-width:600px) {
        width: 100%;
        margin-left: 0;
        margin-top: 60px;
    }
}

.charts {
    display: flex;
    height: 70%;
    overflow: scroll;

    @media screen and (min-width: 220px) and (max-width:600px) {
        height: 60vh;
        display: block;
        width: 100%;
    }
}

.line {
    height: 98%;
    width: 100%;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
    padding: 30px;
    margin: 5px;
    margin-left: 20vh;

    @media screen and (min-width: 220px) and (max-width:600px) {
        margin-left: 0;
        margin: 10px;
        padding: 5px;
        width: 95%;
    }
}

.column {
    height: auto;
    width: 60%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    @media screen and (min-width: 220px) and (max-width:600px) {
        height: 95%;
        width: 100%;
    }
}

.pie1 {
    height: 46%;
    width: 90%;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
    padding: 10px;
    margin: 10px;
}

.pie2 {
    height: 46%;
    width: 90%;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
    padding: 10px;
    margin: 10px;
}

::-webkit-scrollbar {
    display: none;
}
</style>