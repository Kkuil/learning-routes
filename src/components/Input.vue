<template>
    <div class="input flex_center">
        <slot name="icon"></slot>
        <slot name="input"></slot>
        <slot name="helper"></slot>
</div>
</template>

<style lang="scss">
.input {
    width: 100%;
    height: 45px;
    color: #666666;
    border-bottom: 1px solid #b3b3b3;
    transition: border-color .3s;

    >i {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 10%;
        height: 100%;
        font-size: 20px;
        transition: color .3s;
    }

    >input {
        width: 95%;
        padding-left: 10px;
        font-size: 15px;
    }
}

.isFocus {
    border-color: var(--primary_clr);

    i {
        color: var(--primary_clr);
    }
}
</style>