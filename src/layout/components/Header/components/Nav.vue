<script setup>
import { useRouter } from "vue-router"

const $router = useRouter()
</script>

<template>
    <div class="nav">
        <ul>
            <li>
                <RouterLink to="/index" active-class="active">首页</RouterLink>
            </li>
            <li>
                <RouterLink to="/course" active-class="active">课程</RouterLink>
            </li>
            <li>
                <RouterLink to="/vip" active-class="active">会员</RouterLink>
            </li>
            <li>
                <RouterLink to="/resume" active-class="active">简历</RouterLink>
            </li>
            <li>
                <RouterLink to="/boke" active-class="active">博客</RouterLink>
            </li>
            <li>
                <RouterLink to="/sys_class" active-class="active">系统班</RouterLink>
            </li>
        </ul>
    </div>
</template>

<style scoped lang="scss">
.nav {
    height: 100%;
    color: var(--second_ft_clr);
    font-weight: bolder;

    ul {
        height: 100%;

        li {
            height: 100%;

            a {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 80px;
                height: 100%;
                border-bottom: 4px solid transparent;
            }
        }
    }

    .active {
        color: var(--primary_ft_clr);
        border-bottom: 4px solid var(--primary_ft_clr);
    }
}
</style>