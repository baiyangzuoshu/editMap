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

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.node.on("touchstart",this.ontouchstart,this);
        this.node.on("touchmove",this.ontouchmove,this);
        this.node.on("touchend",this.ontouchend,this);
        this.node.on("touchcancel",this.ontouchcancel,this);
    },

    ontouchstart(event){
        window.m_gGame.ontouchstart(event);
    },
    ontouchmove(event){
        window.m_gGame.ontouchmove(event);
    },
    ontouchend(event){
        window.m_gGame.ontouchend(event);
    },
    ontouchcancel(event){
        window.m_gGame.ontouchcancel(event);
    },

    update (dt) {
        
    },
});
