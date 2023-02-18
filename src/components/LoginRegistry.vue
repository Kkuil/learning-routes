<template>
    <div class="box flex_center">
        <div class="container flex">
            <slot name="left"></slot>
            <slot name="right"></slot>
        </div>
    </div>
</template>

<style scoped lang="scss">
.box {
    height: 100vh;
    background: url(https://oss.xuexiluxian.cn/xiaoluxian-vcr/loginbg.jpg) no-repeat;
    background-size: cover;

    .container {
        width: 950px;
        height: 500px;
        background-color: #fff;
        border-radius: 20px;
        overflow: hidden;
    }
}
</style>