<template>
    <div class="infoshow">
        <div class="bg" :style="'background-image:url(' + imgs[0].imgUrl + ');'">
            <div class="info">
                <img src="../../assets/images/touxiang.png" alt="" class="avatar" />
                <span>{{ user.name }}</span>
            </div>
        </div>
        <div class="down">
            <div class="userinfo">
                <span class="content">{{ saying.hitokoto }}</span>
                <div class="author"><span>---{{ saying.from }}</span></div>
            </div>
            <div class="edit">
                <div v-for="(item, index) in imgs" :key="index" class="list">
                    <img :src="item.imgUrl" title="点击切换头图" @click="updateImg(index)">
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useStore } from "vuex";
import { ref, onMounted, getCurrentInstance } from "vue";
const { proxy } = getCurrentInstance();
const store = useStore();
const user = JSON.parse(JSON.stringify(store.getters.user))
const saying = ref({
    from: "",
    hitokoto: "",
})
const imgs = [
    { imgUrl: require('../../assets/images/top.webp') },
    { imgUrl: require('../../assets/images/top1.jpg') },
    { imgUrl: require('../../assets/images/top2.webp') },
    { imgUrl: require('../../assets/images/top3.png') },
    { imgUrl: require('../../assets/images/top4.webp') },
    { imgUrl: require('../../assets/images/top5.webp') },
]

const updateImg = (i) => {
    const e = document.querySelector('.bg');
    e.style.backgroundImage = 'url(' + imgs[i].imgUrl + ')';
}

const getSaying = () => {
    proxy.$axios.get('https://v1.hitokoto.cn').then((res) => {
        saying.value = res.data
    });
}
onMounted(() => {
    getSaying();
});
</script>
  
<style lang="less" scoped>
.infoshow {
    box-sizing: border-box;
    margin-left: 16vh;
    display: flex;
    flex-direction: column;

    @media screen and (min-width: 220px) and (max-width:600px) {
        margin-left: 0;
    }
}

.bg {
    background-size: cover;
    background-position: center;
    height: 25vh;
    width: 100%;
}

.info {
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-left: 15%;
    margin-top: 18vh;

    .avatar {
        height: 100px;
        width: 100px;
    }

    span {
        margin: 10px;
        font-size: 20px;
    }

    .hiddenInput {
        display: none;
    }

    @media screen and (min-width: 220px) and (max-width:600px) {
        margin-left: 40vw;
    }
}

.down {
    display: flex;
    height: 68vh;
}

.userinfo {
    height: 60%;
    width: 40%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    .content {
        width: 80%;
        text-align: center;
    }


    @media screen and (min-width: 220px) and (max-width:600px) {
        width: 100%;
    }
}

.author {
    width: 60%;
    position: relative;

    span {
        float: right;
    }
}

.edit {
    height: 80%;
    width: 58%;
    margin-top: 3%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-wrap: wrap;

    @media screen and (min-width: 220px) and (max-width:600px) {
        display: none;
    }
}

.list {
    height: 32%;
    width: 28%;

    img {
        height: 100%;
        width: 100%;
        border-radius: 5px;
    }
}
</style>