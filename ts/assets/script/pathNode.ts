import DataManager from "./dataManager"

export  default class   PathManager{
    private static _instance:PathManager=null
    public  static getInstance():PathManager{
        if(null==this._instance){
            this._instance=new PathManager()
        }
        return this._instance
    }
    
    ontouchstart(event:cc.Event.EventTouch,pathNode:cc.Node,pathSp:cc.Node){
        cc.log("ontouchstart")
    }
    ontouchmove(event:cc.Event.EventTouch,pathNode:cc.Node,pathSp:cc.Node){
        cc.log("ontouchmove")
    }
    ontouchend(event:cc.Event.EventTouch,pathNode:cc.Node,pathSp:cc.Prefab){
        let pos:cc.Vec2=event.getLocation()
        let nodePos=pathNode.convertToNodeSpaceAR(pos)
        let i=Math.floor(nodePos.x/106)
        let j=Math.floor(Math.abs(nodePos.y)/106)
        let item=cc.instantiate(pathSp)
        item.x=i*106
        item.y=-j*106
        let index=DataManager.getInstance().findPathMapItemByPos(item.getPosition())
        if(-1==index){
            item.parent=pathNode
            DataManager.getInstance().addPathMapItem(item)

            let js=item.getComponent("pathSp")
            js.setLabNumber(DataManager.getInstance().getPathMapItemLength())
        }
        
        cc.log("ontouchend",i,j)
    }
    ontouchcancel(event:cc.Event.EventTouch,pathSp:cc.Node){
        cc.log("ontouchcancel")
    }
}