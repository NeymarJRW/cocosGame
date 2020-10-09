
cc.Class({
    extends: cc.Component,
    properties: {
        enemy: cc.Node,
        hero: cc.Node
    },
    onLoad() {
        Global.win = true;
    },
    start() {
        this.showEnemy();
    },
    update(dt) {

    },
    showEnemy() {
        cc.tween(this.enemy)
            .to(1.5, { position: cc.v2(-603, 336) }, { easing: 'elasticInOut' })
            .call(() => { this.showHero() })
            .start()
    },
    showHero() {
        cc.tween(this.hero)
            .to(1.5, { position: cc.v2(600, -318) }, { easing: 'elasticInOut' })
            .call(() => {
                console.log("执行完毕!!");
                setTimeout(() => {
                    this.endFun()
                }, 500);
            })
            .start()
    },
    endFun() {
        cc.tween(this.enemy)
            .to(1, { position: cc.v2(-603, 1336) }, { easing: 'elasticInOut' })
            .call(() => { this.enemy.active = false; Global.win = false; })
            .start()
        cc.tween(this.hero)
            .to(1, { position: cc.v2(600, -1318) }, { easing: 'elasticInOut' })
            .call(() => { this.enemy.active = true; Global.win = false; })
            .start()
    }
});
