// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        m_btnBack:cc.Node,
        m_editBox:cc.EditBox,
        m_spriteAtlas:cc.SpriteAtlas
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        window.m_gGame=this;

        this.m_inputMode="out";//out,in
        this.m_editBox.node.active=false;
        this.m_btnBack.active=false;
        this.m_editMode="editMapToggle";
    },

    clickEvent(target,data){
        if("导出"==data){
            let arr=[];
            if("editMapToggle"==this.m_editMode){
                arr=window.m_gMapNode.getEditMapData();
            }
            else if("editPathToggle"==this.m_editMode){
                arr=window.m_gPathNode.getEditPathData();
            }
           
            let arrStr=JSON.stringify(arr);
            this.m_editBox.string=arrStr;
            this.m_editBox.node.active=true;
            this.m_inputMode="out";
        }
        else if("导入"==data){
            this.m_editBox.string="";
            this.m_editBox.node.active=true;
            this.m_inputMode="in";
        }
        else if("取消"==data){
            this.m_editBox.node.active=false;
        }
        else if("确定"==data){
            this.m_editBox.node.active=false;
            if(this.m_inputMode=="in"){
                let arrStr=this.m_editBox.string;
                let arr=JSON.parse(arrStr);
                if("editMapToggle"==this.m_editMode){
                    window.m_gMapNode.loadMapItem(arr);
                }
                else if("editPathToggle"==this.m_editMode){
                    window.m_gPathNode.loadPathItem(arr);
                }
            }
        }
        else if("单选"==data){
            this.m_editMode=target.node.name;
            this.m_btnBack.active="editPathToggle"==this.m_editMode;
        }
        else if("回退"==data){
            window.m_gPathNode.callBack();
        }
    },

    ontouchstart(event){
        if("editMapToggle"==this.m_editMode)
            window.m_gMapNode.ontouchstart(event);
        else if("editPathToggle"==this.m_editMode)
            window.m_gPathNode.ontouchstart(event);
    },
    ontouchmove(event){
        if("editMapToggle"==this.m_editMode)
            window.m_gMapNode.ontouchmove(event);
        else if("editPathToggle"==this.m_editMode)
            window.m_gPathNode.ontouchmove(event);
    },
    ontouchend(event){
        if("editMapToggle"==this.m_editMode)
            window.m_gMapNode.ontouchend(event);
        else if("editPathToggle"==this.m_editMode)
            window.m_gPathNode.ontouchend(event);
    },
    ontouchcancel(event){
        if("editMapToggle"==this.m_editMode)
            window.m_gMapNode.ontouchcancel(event);
        else if("editPathToggle"==this.m_editMode)
            window.m_gPathNode.ontouchcancel(event);
    },

    start () {
    },

    update (dt) {
    },
});
