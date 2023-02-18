<script>
import { getAgreement } from "@/api/agreement"
import { ElSkeleton } from "element-plus"

export default {
    data() {
        return {
            info: {
                content: "",
                createTime: "1970-01-01 08:00:00",
                updateTime: "1970-01-01 08:00:00",
                title: "小鹿线用户服务协议"
            }
        }
    },
    created() {
        this.getContent()
    },
    methods: {
        async getContent() {
            const { content, createTime, updateTime, title } = await getAgreement(this.$route.query.agreement_type)
            this.info = {
                content,
                createTime,
                updateTime,
                title
            }
        }
    }
}
</script>

<template>
    <div class="container">
        <div class="agreement" v-html="info.content"></div>
        <div class="skeleton">
            <el-skeleton v-show="!info.content" :rows="5" animated />
            <el-skeleton v-show="!info.content" :rows="5" animated />
            <el-skeleton v-show="!info.content" :rows="5" animated />
            <el-skeleton v-show="!info.content" :rows="5" animated />
            <el-skeleton v-show="!info.content" :rows="5" animated />
        </div>
    </div>
</template>

<style scoped>

</style>