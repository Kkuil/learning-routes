<script setup>

import { Swiper, SwiperSlide } from "swiper/vue"
import { Pagination } from "swiper"
import { getBanners } from "@/api/nav";
import { onMounted } from "@vue/runtime-core";
import { reactive } from "vue";
import { useRouter } from "vue-router";

const modules = [Pagination]
const $router = useRouter()
const banners = reactive({
    images: []
})

onMounted(() => {
    getBannersData()
})

const getBannersData = async () => {
    const data = await getBanners()
    banners.images.push(...data)
}

const checkDetail = (path) => {
    $router.push(path)
}

</script>

<template>
    <div class="banner">
        <swiper :pagination="true" :autoplay="true" :loop="true" :modules="modules" class="swiper">
            <swiper-slide v-for="item in banners.images" class="swiper-slide" @click="checkDetail(item.pcHref)" :key="item.pcHref">
                <img :src="item.imageUrl" :alt="item.imageName" :title="item.imageName" />
            </swiper-slide>
        </swiper>
</div>
</template>

<style scoped lang="scss">
.banner {
    width: 840px;
    height: 100%;

    .swiper {
        width: 100%;
        height: 100%;

        .swiper-slide {
            cursor: pointer;
            width: 100%;
            height: 100%;
            img {
                display: block;
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }
    }
}</style>