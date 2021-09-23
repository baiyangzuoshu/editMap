// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;
import DataManager from "./dataManager";
import EditManager from "./editNode";
import { EDITTYPE } from "./enum";
import GunManager from "./gunNode";
import MapManager from "./mapNode";
import PathManager from "./pathNode";

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    editNode:cc.Node=null
    @property(cc.Node)
    moveSp:cc.Node=null
    @property(cc.Node)
    mapNode:cc.Node=null
    @property(cc.Node)
    pathNode:cc.Node=null
    @property(cc.SpriteAtlas)
    spriteAtlas: cc.SpriteAtlas=null
    @property(cc.Prefab)
    pathSpPrefab:cc.Prefab=null
    @property(cc.Node)
    gunNode:cc.Node=null
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.moveSp.active=false
        this.moveSp.zIndex=1000
        let spriteFrame10=this.spriteAtlas.getSpriteFrames()[10]
        MapManager.getInstance().initMap(spriteFrame10,this.mapNode)

        this.node.on(cc.Node.EventType.TOUCH_START,this.ontouchstart,this)
        this.node.on(cc.Node.EventType.TOUCH_MOVE,this.ontouchmove,this)
        this.node.on(cc.Node.EventType.TOUCH_END,this.ontouchend,this)
        this.node.on(cc.Node.EventType.TOUCH_CANCEL,this.ontouchcancel,this)
    }

    ontouchstart(event:cc.Event.EventTouch){
        if(EDITTYPE.MAP==DataManager.getInstance().getEditType()){
            MapManager.getInstance().ontouchstart(event)
            EditManager.getInstance().ontouchstart(event,this.editNode, this.moveSp)
        }
    }
    ontouchmove(event:cc.Event.EventTouch){
        if(EDITTYPE.MAP==DataManager.getInstance().getEditType()){
            MapManager.getInstance().ontouchmove(event)
            EditManager.getInstance().ontouchmove(event,this.editNode,this.moveSp)
        }
    }
    ontouchend(event:cc.Event.EventTouch){
        if(EDITTYPE.MAP==DataManager.getInstance().getEditType()){
            MapManager.getInstance().ontouchend(event,this.mapNode,this.moveSp)
            EditManager.getInstance().ontouchend(event,this.moveSp)
        }
        else if(EDITTYPE.PATH==DataManager.getInstance().getEditType()){
            PathManager.getInstance().ontouchend(event,this.pathNode,this.pathSpPrefab)
        }
        else if(EDITTYPE.GUN==DataManager.getInstance().getEditType()){
            GunManager.getInstance().ontouchend(event,this.gunNode,this.pathSpPrefab)
        }
    }
    ontouchcancel(event:cc.Event.EventTouch){
        if(EDITTYPE.MAP==DataManager.getInstance().getEditType()){
            MapManager.getInstance().ontouchcancel(event)
            EditManager.getInstance().ontouchcancel(event,this.moveSp)
        }
    }

    start () {

    }

    // update (dt) {}
}
