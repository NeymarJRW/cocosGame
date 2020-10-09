// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
// var Switch = require("Switch");
cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        console.log("开始加载!")
        cc.director.preloadScene('main', function () {
            //预加载主场景
            console.log("主页预加载完成!");
        });
    },

    start () {
        Global.Switch.sendAjax("进入游戏");
    },

    update (dt) {},
    clcikGame(){
        Global.Switch.sendAjax("点击开始按钮")
        cc.director.loadScene("main");
    },
});
