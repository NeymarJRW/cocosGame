
cc.Class({
    extends: cc.Component,

    properties: {
        privacyPage: {
            type: cc.Node,
            default: null
        },
        winPage: {
            type: cc.Node,
            default: null
        },
        targetNum: {
            type: cc.Label,
            default: null
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {


        //开启物理碰撞!!必须写在 onload方法中
        let p = cc.director.getPhysicsManager();
        p.enabled = true;
        p.gravity = cc.v2();
        // p.debugDrawFlags = cc.PhysicsManager.DrawBits.e_aabbBit |
        //     cc.PhysicsManager.DrawBits.e_pairBit |
        //     cc.PhysicsManager.DrawBits.e_centerOfMassBit |
        //     cc.PhysicsManager.DrawBits.e_jointBit |
        //     cc.PhysicsManager.DrawBits.e_shapeBit;

        //开启碰撞检测
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
        // manager.enabledDebugDraw = true;
        ;
        // this.privacyPage.active=true;
        // this.winPage.active=true;

        // Global.win = false;

    },
    start() {
        Global.Switch.sendAjax("进入主界面");

        this.privacyPage.scale = cc.v2(0, 0);
        this.winPage.scale = cc.v2(0, 0);
        this.targetNum.string = `${Global.destoryEnemy}/20`;
    },
    showPrivacy() {
        Global.Switch.sendAjax("打开隐私页");

        if (Global.win) return;

        cc.tween(this.privacyPage)
            .to(0.3, { scale: 1 })
            .start()
    },
    closePrivacy() {
        Global.Switch.sendAjax("关闭隐私页");

        cc.tween(this.privacyPage)
            .to(0.2, { scale: 0 })
            .start()
    },
    showWinPage() {
        Global.Switch.sendAjax("出现胜利页");

        cc.tween(this.winPage)
            .to(0.3, { scale: 1 })
            .start()
    },
    restart() {
        cc.director.loadScene("main");
    },
    nextLevel() {
        cc.director.loadScene("main");
    },
    backStart() {
        if (Global.win) return;

        cc.director.loadScene("start");
    },
    share() {
        Global.Switch.sendAjax("点击分享");

        if (cc.sys.isNative && cc.sys.os == cc.sys.OS_IOS) {//判断是否是源生平台并且是否是iOS平台
            //调用APPController类中的Share方法，并且传递参数
            jsb.reflection.callStaticMethod("AppController", "Share:title:", "title", "message");
        }
    },
    update(dt) {
        if (Global.destoryEnemy >= 20) {
            //胜利
            Global.win = true;
            this.showWinPage();
            Global.destoryEnemy = 0;
            this.targetNum.string="20/20";
        }
        // if(!this.targetNum.string) return;
    },
});
