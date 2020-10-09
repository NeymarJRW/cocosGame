// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
cc.Class({
    extends: cc.Component,

    properties: {
        moveSpeed: 0,
    },

    start() {
        this.heroNode = cc.find("Canvas/世界地图/人物");
        this.anim = this.getComponent(cc.Animation);
        this.anim.play("敌人1等待");
        this.state = {}
        this.blood = cc.find("血条", this.node).getComponent(cc.Sprite);

        this.heroBlood=cc.find("Canvas/main/头像/血").getComponent(cc.Sprite);
        // console.log(this.heroBlood)
    },
    update(dt) {
        if (Global.win) return;
        //判断血量
        if (this.blood.fillRange <= 0) {
            Global.destoryEnemy++;
            cc.find("Canvas/main/任务/消灭目标数").getComponent(cc.Label).string=`${Global.destoryEnemy}/20`
            Global.autoCreateEnemy=true;
            this.node.destroy();
            
        }

        if (this.juageDistance() > 250 && this.juageDistance() < 800) {
            delete this.state["攻击"];
            delete this.state["等待"];
            if (!this.state["走动"]) {
                this.anim.play("敌人1走动");
                this.state["走动"] = "走动";
            }
            // if(anim.clip=="")
            this.lookAtObject();

            //旋转角度转化为弧度
            let angle = this.rotations * 2 / 360 * Math.PI;
            //计算基于Y轴的方向向量
            let dirs = cc.v2(Math.sin(angle), Math.cos(angle));
            //方向向量进行单位化
            dirs.normalizeSelf();
            //根据方向向量移动位置
            this.node.x += dt * dirs.x * this.moveSpeed;
            this.node.y += dt * dirs.y * this.moveSpeed;
        } else if (this.juageDistance() > 800) {
            delete this.state["走动"];
            delete this.state["攻击"];
            if (!this.state["等待"]) {
                this.anim.play("敌人1等待");
                this.state["等待"] = "等待";
            }
        } else {
            delete this.state["走动"];
            delete this.state["等待"];
            if (!this.state["攻击"]) {
                this.anim.play("敌人1攻击");
                this.state["攻击"] = "攻击";
                this.heroBlood.fillRange-=0.002;
            }
        }

    },
    moveTo() {


    },
    lookAtObject() {
        //计算朝向
        let orientationX = this.heroNode.x - this.node.x;
        let orientationY = this.heroNode.y - this.node.y;
        let dir = cc.v2(orientationX, orientationY);
        //计算夹角弧度(cc.v2(0,1)表示物体基于Y轴方向)
        let angle2 = dir.signAngle(cc.v2(0, 1))
        //弧度转换成欧拉角
        let olj = angle2 / Math.PI * 180;
        //物体朝向
        this.rotations = olj;

    },
    juageDistance() {
        let p1 = this.node.position
        let p2 = this.heroNode.position
        let distance = p1.sub(p2).mag()

        if (p1.x <= p2.x) {
            //正向 
            this.node.scaleX = 2.19;
        } else {
            this.node.scaleX = -2.19;

        }
        return distance;

    },

    //碰撞检测减少血量 
    onCollisionEnter(other, self) {
        if(!this.blood) return;
        this.blood.fillRange -= 0.1;
        if(this.blood.fillRange>0.1){
            this.turnToRed();
        }
    },

    //受到攻击时颜色变红
    turnToRed() {
        var normalColor = cc.color(255, 255, 255, 255);//正常
        var redColor = cc.color(255, 0, 0, 255);//变红
        var int = 0;
        var timer = setInterval(() => {
            if(!this.node) return;
            // console.log(555555555555555);
            if (int % 2 == 0)
                this.node.color = redColor;
            else
                this.node.color = normalColor;

            int++;
            if(int>15){
                this.node.color = normalColor;
                clearInterval(timer);
            }
        },100)
    }
});
