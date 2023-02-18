<script setup>
import { RouterLink } from "vue-router"

</script>

<template>
    <div class="footer flex_center">
        <div class="container flex_center">
            <img src="/images/logo02.png" alt="小鹿线" title="小鹿线" class="logo">
            <img src="/images/foot-factory.png" alt="factory" title="factory" class="factory">
            <div class="copyright flex_center">
                <div class="feedback_tools">
                    <ul>
                        <li>
                            <a>关于我们</a>
                        </li>
                        <li>|</li>
                        <li>
                            <a>联系我们</a>
                        </li>
                        <li>|</li>
                        <li>
                            <RouterLink to="/feedback">意见反馈</RouterLink>
                        </li>
                        <li>|</li>
                        <li>
                            <a>版权声明</a>
                        </li>
                    </ul>
                </div>
                <div class="rights">Copyright © 2018~2038 小鹿线 www.xuexiluxian.cn 24小时服务热线：010-86483040</div>
                <div class="bottom">
                    <RouterLink to="/agreement?agreement_type=agreement" class="agreement">《小鹿线用户服务协议》</RouterLink>
                    <RouterLink to="/agreement?agreement_type=policy" class="policy">《小鹿线隐私政策》</RouterLink>
                    <a href="https://beian.miit.gov.cn/" class="icp">京ICP备18061704号</a>
                </div>
            </div>
            <div class="wx-official flex_center">
                <img src="https://oss.xuexiluxian.cn/xiaoluxian-vcr/775debc713214fdbab4ee6a2f51851da.jpg" alt="官网微信"
                    title="官网微信" />
                <span>官网微信</span>
            </div>
            <div class="wx-guider flex_center">
                <img src="https://oss.xuexiluxian.cn/xiaoluxian-vcr/d9f204b427634984a85ddf5f34902cc2.jpg" alt="官网微信"
                    title="官网微信" />
                <span>指导老师微信</span>
            </div>
        </div>
</div>
</template>

<style scoped lang="scss">
.footer {
    min-width: 1140px;
    height: 150px;
    background-color: var(--primary_clr);

    .container {
        width: 1140px;
        height: 100%;
        justify-content: space-around;

        .logo {
            width: 120px;
        }

        .factory {
            height: 80%;
        }

        .copyright {
            flex-direction: column;
            width: 500px;
            height: 40%;
            color: #fff;

            .feedback_tools {
                font-size: 13px;

                ul {
                    display: flex;
                    justify-content: center;
                    width: 100%;

                    li {
                        margin: 0 10px;
                    }
                }
            }

            .rights {
                margin-top: 10px;
                font-size: 5px;
                transform: scale(0.9);
            }

            .agreement,
            .policy,
            .icp {
                cursor: pointer;
                font-size: 10px;

                &:hover {
                    text-decoration: underline;
                }
            }
        }

        [class^=wx] {
            flex-direction: column;

            img {
                width: 80px;
            }

            span {
                margin-top: 3px;
                font-size: 12px;
                color: #fff;
            }
        }
    }
}
</style>