// 摇杆代码 joystick.js

cc.Class({
    extends: cc.Component,

    properties: {

        Rocker: {
            type: cc.Node,
            default: null,
        },
        Hero: {
            type: cc.Node,
            default: null,
        },

        Max_r: 50,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {

        this.Rocker.x = 0;
        this.Rocker.y = 0;
        this.dir = cc.v2(0, 0);
        this.Rocker.setPosition(cc.v2(0, 0));
        // console.log(this.Rocker.node.getLocation())
        this.Rocker.on(cc.Node.EventType.TOUCH_START, function (e) {
            Global.Switch.sendAjax("移动人物");

            if (Global.win) return;

            // this.Rocker.setPosition(cc.v2(0, 0));
            this.Hero.getComponent(cc.Animation).play("人物奔跑");
            var w_pos = e.getLocation();

            var pos = this.node.convertToNodeSpaceAR(w_pos);//将世界坐标转化为父节点的相对坐标

            var len = pos.mag();
            this.dir.x = pos.x / len;
            this.dir.y = pos.y / len;

            if (len > this.Max_r) {
                pos.x = this.Max_r * pos.x / len;
                pos.y = this.Max_r * pos.y / len;
            }

            this.Rocker.setPosition(pos);
        }.bind(this), this);

        this.Rocker.on(cc.Node.EventType.TOUCH_MOVE, function (e) {
            if (Global.win) return;


            var w_pos = e.getLocation();
            var pos = this.node.convertToNodeSpaceAR(w_pos);//将世界坐标转化为父节点的相对坐标

            //    console.log(pos)
            var len = pos.mag();
            this.dir.x = pos.x / len;
            this.dir.y = pos.y / len;
            if (len > this.Max_r) {
                pos.x = this.Max_r * pos.x / len;
                pos.y = this.Max_r * pos.y / len;
            }
            this.Rocker.setPosition(pos);
        }.bind(this), this);

        this.Rocker.on(cc.Node.EventType.TOUCH_END, function (e) {
            if (Global.win) return;


            this.Rocker.setPosition(cc.v2(0, 0));
            this.dir = cc.v2(0, 0);
            this.Hero.getComponent(cc.Animation).play("hero");



        }.bind(this), this);

        this.Rocker.on(cc.Node.EventType.TOUCH_CANCEL, function (e) {
            if (Global.win) return;

            this.Hero.getComponent(cc.Animation).play("hero");

            this.Rocker.setPosition(cc.v2(0, 0));
            this.dir = cc.v2(0, 0);
        }.bind(this), this);
    },

    update(dt) {
    },
});