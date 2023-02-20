class Goods {
    constructor(goods) {
        this.goods = goods
        this.isChecked = false
    }

    // 设置选中或未选中
    checkedOrNot(isChecked) {
        this.isChecked = isChecked
    }

    computeSumPrice() {
        return this.goods.counter * this.goods.discountPrice
    }
}

export default class Cart {
    constructor(GoodsList) {
        // 包装类
        this.goodsList = []
        this.sumPrice = 0
        this.checkedGoods = []
        this.isAllChecked = false
        for (let i = 0; i < GoodsList.length; i++) {
            const temp = new Goods(GoodsList[i])
            this.goodsList.push(temp)
        }
    }

    reactiveOperation() {
        this.setCheckedNum()
        this.setSumPrice()
        this.setIsAllChecked()
    }

    // 是否全选
    setIsAllChecked() {
        this.isAllChecked = this.getCheckedNum().length === this.goodsList.length
    }

    // 选中商品
    checkedOrNot(goodsId, isChecked) {
        this.goodsList.forEach(item => {
            if (item.goods.id === goodsId) {
                item.isChecked = isChecked
            }
        })
        this.reactiveOperation()
    }

    //获取选中商品
    getCheckedNum() {
        return this.goodsList.filter(item => item.isChecked)
    }

    // 设置选中商品
    setCheckedNum() {
        this.checkedGoods = this.getCheckedNum()
    }

    // 全选或全不选商品
    setAllCheckedOrNot(isAllChecked) {
        this.goodsList.forEach(goods => {
            goods.isChecked = isAllChecked
        })
        this.reactiveOperation()
    }

    // 设置总价
    setSumPrice() {
        const checkedGoods = this.getCheckedNum()
        if (!checkedGoods.length) {
            this.sumPrice = 0
            return
        }
        let result = 0
        checkedGoods.forEach(item => {
            result += item.computeSumPrice()
        })
        this.sumPrice = result
    }

    // 删除商品
    delGoods(goodsId) {
        this.goodsList = this.goodsList.filter(item => item.goods.id !== goodsId)
    }
}