// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        m_numberLab:cc.Label
    },

    // LIFE-CYCLE CALLBACKS:

    setTab(str){
        this.m_numberLab.string=""+str;
    },

    onLoad () {},

    start () {

    },

    // update (dt) {},
});
