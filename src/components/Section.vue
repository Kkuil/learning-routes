<script setup>

import { defineProps } from "vue"

const $props = defineProps(["title"])

</script>

<template>
    <div class="section">
        <div class="title">
            <div className="content-title-left">
                <div className="hot">
                    <div className="hot-left">HOT</div>
                    <div className="hot-right"></div>
                </div>
                <div className="txt">
                    <div className="txt-top">{{ $props.title }}</div>
                    <div className="txt-bottom"></div>
                </div>
            </div>
        </div>
        <div class="content">
            <slot name="content"></slot>
        </div>
</div>
</template>

<style scoped lang="scss">
.section {
    margin-top: 20px;

    .title {
        display: flex;
        margin-top: 40px;
        .content-title-left {
            display: flex;

            .hot {
                display: flex;
                height: 38px;

                .hot-left {
                    height: 38px;
                    font-size: 20px;
                    padding: 0 10px;
                    text-align: center;
                    line-height: 37px;
                    color: #ffffff;
                    border-radius: 8px 0 8px 8px;
                    background: linear-gradient(90deg, #ff727f 0%, #fc685c 100%);
                }

                .hot-right {
                    width: 0;
                    height: 0;
                    border: 6px solid #fc685c;
                    border-right-color: transparent;
                    border-bottom-color: transparent;
                }
            }

            .txt {
                position: relative;
                height: 38px;
                z-index: 50;

                .txt-top {
                    font-weight: bolder;
                    font-size: 24px;
                    padding: 0 5px;
                    color: #333333;
                    line-height: 31px;
                }

                .txt-bottom {
                    position: absolute;
                    top: 25px;
                    left: 0px;
                    width: 100%;
                    height: 13px;
                    background: linear-gradient(90deg, #fbf84f 0%, #fea935 100%);
                    border-radius: 7px;
                    z-index: -1;
                }
            }
        }
    }

    .content {
        margin-top: 20px;
    }
}
</style>