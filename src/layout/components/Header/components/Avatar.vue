<script setup>
import { mapState } from "pinia"
import { useUserStore } from "@/stores/user"

const userInfo = {
    ...mapState(useUserStore, ["userInfo"])
}
</script>

<template>
    <div class="login_avatar">
        <div v-if="!userInfo.userInfo()" class="login">登录</div>
        <img v-else :src="userInfo.userInfo().avatar" alt="avatar" :title="userInfo.userInfo().username" class="avatar">
    </div>
</template>

<style scoped lang="scss">
.login_avatar {
    cursor: pointer;

    .avatar {
        width: 60px;
        height: 60px;
        border-radius: 50%;
    }

    .login {
        font-weight: bolder;
        transition: color .3s;

        &:hover {
            color: var(--primary_clr);
        }
    }
}
</style>