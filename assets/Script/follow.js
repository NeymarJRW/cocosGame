
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
        hero:{
            type:cc.Node,
            default:null
        }
    },


    onLoad () {
        // this.node.runAction(cc.follow(this.hero));

    },

    start () {
        var follow = cc.follow(this.hero, cc.rect(0,0, 3724-200,2799+200));
        // follow.easing(cc.easeIn(0));
        this.node.runAction(follow);
    },

    update (dt) {},
});
