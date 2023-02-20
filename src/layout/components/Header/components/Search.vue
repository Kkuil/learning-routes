<script setup>

</script>

<template>
    <div class="search">
        <input type="text" placeholder="请输入要搜索的课程">
        <i class="iconfont icon-fangdajing flex_center"></i>
    </div>
</template>

<style scoped lang="scss">	
.search {
    display: flex;
    width: 200px;
    height: 48px;
    background-color: #f0f2f4;
    padding: 10px;
    border-radius: 10px;

    input {
        font-size: 14px;
        width: 80%;
        height: 100%;
        background-color: transparent;
    }

    i {
        width: 20%;
        height: 100%;
        font-size: 20px;
        color: #ccc;
    }
}
</style>