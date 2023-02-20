<template>
    <div class="bgc"></div>
</template>

<style scoped lang="scss">
.bgc {
    z-index: 999;
    width: 100%;
    height: 200px;
    background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
    background-size: 400% 400%;
    transition: background-position .3s;
    animation: gradient 15s ease alternate-reverse infinite;
}

@keyframes gradient {
    to {
        background-position: 100% 100%;
    }
}
</style>