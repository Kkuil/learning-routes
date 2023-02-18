import { createApp } from "vue"
import { styled } from "@styils/vue"

const Model = styled("div", {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100vh",
    backgroundColor: "#ccc",
    ".box": {
        padding: "25px 15px",
        position: "absolute",
        backgroundColor: "#fff",
        borderRadius: "10px",
        i: {
            cursor: "pointer",
            position: "absolute",
            top: "10px",
            right: "10px",
            transition: "color .3s",
            "&:hover": {
                color: "#0094ff"
            }
        }
    }
})

const model = {
    props: {
        el: {
            type: String,
            required: true
        }
    },
    render({ $props, $emit }) {
        setTimeout(() => {
            const modelContainer = document.querySelector(".model_container")
            modelContainer.innerHTML = $props.el
        })
        return (
            <Model class="flex_center">
                <div className="box">
                    <div className="model_container"></div>
                    <i className="iconfont icon-close-bold" onClick={$emit("onClick")} title="关闭"></i>
                </div>
            </Model>
        )
    }
}

export default function createModel(el, onClose) {
    const loader = document.createElement("div")
    document.body.appendChild(loader)
    const app = createApp(model, {
        el,
        onClick: () => {
            onClose(() => {
                app.unmount()
                loader.remove()
            })
        }
    })
    app.mount(loader)
}