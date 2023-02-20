<script setup>
import { computed, defineProps } from "vue"
import { useRouter } from "vue-router"

const $router = useRouter()
const $props = defineProps(["item"])

const isShowVipFree = computed(() => {
    return $props.item.isMember == 1 && $props.item.discountPrice > 0
})

const isShowFreeStudy = computed(() => {
    return $props.item?.discountPrice == 0 && $props.item.isMember == 0
})

const isShowDiscount = computed(() => {
    return $props.item?.discountPrice > 0
})

const goDetails = async () => {
    $router.push(`/course/detail/${$props.item}`)
}

</script>

<template>
    <div class="course-card" @click="goDetails">
        <div class="li-top">
            <div class="li-img">
                <img :src="$props.item?.courseCover" :alt="$props.item?.courseName" :title="$props.item?.courseName" />
            </div>
            <div v-show="isShowVipFree" class="vip-icon">
                <img src="/images/vipLogo.png" alt="vip" title="vip" />
            </div>
        </div>
        <div class="li-bottom">
            <div class="li-name nowrap" title={props.item?.courseName}>
                {{ $props.item?.courseName }}
            </div>
            <div class="li-desc">
                <span class="level">初级</span>
                <span class="dot">·</span>
                <span class="count">
                    {{ $props.item?.purchaseCnt + $props.item?.purchaseCounter || 0 }}人报名
                </span>
            </div>
            <div class="li-sale-price">
                <div v-show="isShowVipFree" class="memberfree">会员免费</div>
                <div class="memberprice">
                    <span v-show="isShowFreeStudy" class="free-learn">免费学习</span>
                    <span v-show="isShowDiscount" class="not-free-learn">
                        ￥{{ $props.item?.discountPrice?.toFixed(2) }}
                    </span>
                </div>
            </div>
        </div>
</div>
</template>

<style scoped lang="scss">
.course-card {
    position: relative;
    width: 270px;
    height: 275px;
    margin-bottom: 30px;
    box-shadow: 1px 1px 10px rgb(27 39 94 / 40%);
    border-radius: 8px;
    transition: margin-top 0.2s;
    -webkit-transition: margin-top 0.2s;
    overflow: hidden;
    color: var(--first_ft_clr);
    &:hover {
        margin-top: -5px;
    }

    .li-top {
        position: relative;
        height: 165px;

        .li-img,
        .li-img img {
            width: 100%;
            height: 100%;
            cursor: pointer;
        }

        .vip-icon img {
            position: absolute;
            right: 8px;
            top: 8px;
        }
    }

    .li-bottom {
        padding: 10px;

        .li-name {
            font-size: 16px;
            font-weight: 700;
            cursor: pointer;

            &:hover {
                color: var(--primaryColor);
            }
        }

        .li-desc {
            font-size: 12px;
            color: #808080;
            padding: 10px 0;

            .dot {
                padding: 0 4px;
            }
        }

        .li-sale-price {
            display: flex;
            align-items: center;

            .memberfree {
                padding: 4px 12px;
                height: 24px;
                margin-right: 12px;
                color: #fff;
                font-size: 12px;
                background: linear-gradient(90deg, #ff928e, #fe7062 99%);
                border-radius: 24px 0 24px 0;
            }

            .not-free-learn {
                color: #fe7062;
                font-weight: bold;
                font-size: 16px;
            }
        }
    }
}
</style>