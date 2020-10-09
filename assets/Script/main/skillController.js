
cc.Class({
    extends: cc.Component,

    properties: {

    },


    // onLoad () {},

    start() {
        this.one = cc.find("技能一层", this.node);
        this.two = cc.find("技能二层", this.node);
        this.three = cc.find("技能三层", this.node);
        this.one.active = false;
        this.two.active = false;
        this.three.active = false;

        this.one.active = true;
        var count = 1;
        if(Global.skillIndex!=5){
            var timer=setInterval(()=>{
                switch (count) {
                    case 1:
                        this.two.active = true;
                        break;
                    case 2:
                        this.three.active = true;
                        break;
                    case 3:
                            clearInterval(timer);
                            setTimeout(()=>{
                                this.node.destroy();
                            },1500)
                            break;
                }
                count++;
            },400)
        }else{
            // this.one.active = true;
            setTimeout(()=>{
                this.node.destroy();
            },1000)
        }


    },

    // update (dt) {},
});
