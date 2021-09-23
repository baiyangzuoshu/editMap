// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;
import DataManager from "./dataManager";
import { EDITTYPE, PUTTYPE } from "./enum";

@ccclass
export default class NewClass extends cc.Component {
    @property(cc.SpriteAtlas)
    spriteAtlas: cc.SpriteAtlas=null;
    @property(cc.Node)
    editNode:cc.Node=null
    @property(cc.Node)
    mapNode:cc.Node=null
    @property(cc.Node)
    pathNode:cc.Node=null
    @property(cc.Node)
    gunNode:cc.Node=null
    @property(cc.Prefab)
    inOutViewPrefab:cc.Prefab=null
    // LIFE-CYCLE CALLBACKS:
    onClickEvent(ref,data){
        let inOutView=cc.instantiate(this.inOutViewPrefab)
        this.node.addChild(inOutView)
        let js=inOutView.getComponent("inOutView")
        if("out"==data){
            cc.log("out")
            let data=DataManager.getInstance().outPutData()
            js.setEditBoxString(JSON.stringify(data))
            DataManager.getInstance().setPutType(PUTTYPE.OUTPUT)
        }
        else if("in"==data){
            cc.log("in")
            let data=DataManager.getInstance().outPutData()
            js.setEditBoxString(JSON.stringify(data))
            DataManager.getInstance().setPutType(PUTTYPE.INPUT)
        }
    }

    onToggleEvent(ref){
        if("mapToggle"==ref.node.name){
            this.pathNode.active=false
            this.gunNode.active=false
            DataManager.getInstance().setEditType(EDITTYPE.MAP)
        }
        else if("pathToggle"==ref.node.name){
            this.pathNode.active=true
            this.gunNode.active=false
            DataManager.getInstance().setEditType(EDITTYPE.PATH)
        }
        else if("gunToggle"==ref.node.name){
            this.pathNode.active=false
            this.gunNode.active=true
            DataManager.getInstance().setEditType(EDITTYPE.GUN)
        }
    }

    onLoad () {
        let spriteFrames=this.spriteAtlas.getSpriteFrames()
        for(let i=0;i<spriteFrames.length;i++){
            let spriteFrame=spriteFrames[i]
            let node=new cc.Node()
            node.parent=this.editNode
            node.x=Math.floor(i%5)*109+106/2
            node.y=-Math.floor(i/5)*109-106/2

            let sprite=node.addComponent(cc.Sprite)
            sprite.spriteFrame=spriteFrame

            DataManager.getInstance().addLeftMapItem(node)
        }
    }

    start () {

    }

    // update (dt) {}
}
