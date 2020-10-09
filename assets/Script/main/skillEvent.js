// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {

    },


    // onLoad () {},

    start() {
        var anim = this.getComponent(cc.Animation);

        switch (Global.skillIndex) {
            case "1":
                anim.play('技能');
                break;
            case "2":
                anim.play('技能2');
                break;
            case "3":
                anim.play('技能3');
                break;
            case "4":
                anim.play('技能4');
                break;
            case "5":
                anim.play('技能5');
                break;
        }


    },
    skillEnd() {
        this.node.destroy();
    }

    // update (dt) {},
});
