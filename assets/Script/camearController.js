// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        hero: {
            type: cc.Node,
            default: null
        },
        camera: {
            type: cc.Camera,
            default: null
        },
        main: {
            type: cc.Node,
            default: null
        },
        minX: 0,
        maxX: 0,
        minY: 0,
        maxY: 0,

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        // var follow = cc.follow(this.hero, cc.rect(0,0, 3700,2700));
        // this.node.runAction(follow);
     },

    start() {
console.log(this.hero.position)
    },

    update(dt) {
        var pos = this.camera.node.position;
        pos.x = this.hero.position.x;
        if (pos.x > this.maxX) {
            pos.x = this.maxX;
        }
        if (pos.x < this.minX) {
            pos.x = this.minX;
        }

        pos.y = this.hero.position.y;
        if (pos.y > this.maxY) {
            pos.y = this.maxY;
        }
        if (pos.y < this.minY) {
            pos.y = this.minY;
        }
        this.camera.node.position = pos;
        // this.main.position = pos;


    },
});
