
cc.Class({
    extends: cc.Component,

    properties: {
        Rocker: {
            type: require("joystick"),
            default: null,
        },
        Skill: {
            default: null,
            type: cc.Prefab,
        },
        enemy: {
            default: null,
            type: cc.Prefab,
        },
        speed: 100,

    },

    onLoad() {

    },

    start() {
        this.ani = this.getComponent(cc.Animation);
        this.ani.play("hero");
        this.createEnemy();

        this.hideAllShadow();

    },

    update(dt) {

        //技能冷却
        Array.from(new Array(4).keys())
            .map(i => i + 1)
            .forEach(t => {
                // cc.find(`Canvas/main/技能图标${t}/shadow`).active = false;
                this.skillCD(cc.find(`Canvas/main/技能图标${t}/shadow`));
            })

        //随机生成两个新的敌人
        if (Global.autoCreateEnemy) {
            console.log("生成了新敌人!!!!!!")
            Global.autoCreateEnemy = false;
            var enemyNode = cc.instantiate(this.enemy);
            enemyNode.parent = cc.find(`Canvas/世界地图`);
            enemyNode.position = cc.find(`Canvas/世界地图/敌人出现位置/位置${Math.round(Math.random()*3+1)}`).position;
            var enemyNode1 = cc.instantiate(this.enemy);
            enemyNode1.parent = cc.find(`Canvas/世界地图`);
            enemyNode1.position = cc.find(`Canvas/世界地图/敌人出现位置/位置${Math.round(Math.random()*3+1)}`).position;
        }
        if (this.Rocker.dir.mag() < 0.5) {
            return;
        }

        var vx = this.Rocker.dir.x * this.speed;
        var vy = this.Rocker.dir.y * this.speed;

        if (vx > 0) {
            this.node.scaleX = 1;

        } else {
            this.node.scaleX = -1;
        }
        var sx = vx * dt;
        var sy = vy * dt;
        // console.log(dt)

        //移动
        this.node.x += sx;
        this.node.y += sy;
        //方向计算

    },
    createEnemy() {
        //创造敌人生成四个 
        Array.from(new Array(4).keys()).map(i => i + 1).forEach(i => {
            var enemyNode = cc.instantiate(this.enemy);
            enemyNode.parent = cc.find(`Canvas/世界地图`);
            enemyNode.position = cc.find(`Canvas/世界地图/敌人出现位置/位置${i}`).position;
        })
    },
    clickSkill(e, i) {
        Global.Switch.sendAjax("点击技能攻击");

        if (Global.win) return;
        var shadow = cc.find("shadow", e.currentTarget);
        if (!shadow.activeInHierarchy) {
            //没在 技能冷却中
            Global.skillIndex = i;
            // this.ani.play("人物攻击");
            //发动技能
            var skillNode = cc.instantiate(this.Skill);
            skillNode.parent = cc.find("Canvas/世界地图");
            skillNode.position = this.node.position;
            skillNode.position = cc.v2(this.node.position.x - 200, this.node.position.y - 100);
            shadow.active = true;
        }
    },
    normalSkill() {
        Global.Switch.sendAjax("点击技能攻击");

        if(Global.win) return;
        Global.skillIndex = "5";
        //发动技能
        var skillNode = cc.instantiate(this.Skill);
        skillNode.parent = cc.find("Canvas/世界地图");
        skillNode.position = this.node.position;
        skillNode.position = cc.v2(this.node.position.x - 200, this.node.position.y - 100);
    },

    //隐藏所有的技能阴影
    hideAllShadow() {
        Array.from(new Array(4).keys())
            .map(i => i + 1)
            .forEach(t => {
                cc.find(`Canvas/main/技能图标${t}/shadow`).active = false;
            })
    },
    //技能冷却方法
    skillCD(shadowNode) {
        if (shadowNode.activeInHierarchy) {
            //出现后开始冷却
            shadowNode.getComponent(cc.Sprite).fillRange -= 0.007;
            if (shadowNode.getComponent(cc.Sprite).fillRange <= 0) {
                shadowNode.active = false;
                shadowNode.getComponent(cc.Sprite).fillRange = 1;
            }
        }
    },
    toStand() {
        this.ani.play("hero");
    },

});