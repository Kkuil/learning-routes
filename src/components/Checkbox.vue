<script>
export default {
    props: {
        width: {
            type: String,
            default: "20px"
        },
        height: {
            type: String,
            default: "20px"
        },
        borderRadius: {
            type: String,
            default: "5px"
        },
        checkedBg: {
            type: String,
            default: "#0094ff"
        },
        uncheckedBg: {
            type: String,
            default: "#ccc"
        },
        Checked: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            isChecked: false
        }
    },
    methods: {
        checked() {
            this.isChecked = !this.isChecked
            this.$emit("check", this.isChecked)
        }
    }
}
</script>

<template>
    <div @click="checked" class="checkbox"
        :style="{ width, height, borderRadius, backgroundColor: uncheckedBg }">
        <transition name="checked">
            <div v-show="isChecked" class="checked flex_center" :style="{ backgroundColor: checkedBg }">
                <slot name="checkedIcon"></slot>
                <i class="iconfont icon-duigou_kuai"></i>
            </div>
        </transition>
    </div>
</template>

<style scoped lang="scss">
.checkbox {
    cursor: pointer;
    overflow: hidden;

    .checked {
        width: 100%;
        height: 100%;
        color: #fff;
    }
    .checked-enter-active {
        animation: scale 0.3s;
    }
    .checked-leave-active {
        animation: scale 0.3s reverse;
    }

    @keyframes scale {
        0% {
            transform: scale(0.1);
        }
        75% {
            transform: scale(1.2);
        }
        90% {
            transform: scale(0.8);
        } 
        100% {
            transform: scale(1);
        }
    }
}</style>