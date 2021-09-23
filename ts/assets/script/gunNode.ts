import DataManager from "./dataManager"

export  default class   GunManager{
    private static _instance:GunManager=null
    public  static getInstance():GunManager{
        if(null==this._instance){
            this._instance=new GunManager()
        }
        return this._instance
    }
    
    ontouchstart(event:cc.Event.EventTouch,GunNode:cc.Node,pathSp:cc.Node){
        cc.log("ontouchstart")
    }
    ontouchmove(event:cc.Event.EventTouch,GunNode:cc.Node,pathSp:cc.Node){
        cc.log("ontouchmove")
    }
    ontouchend(event:cc.Event.EventTouch,GunNode:cc.Node,pathSp:cc.Prefab){
        let pos:cc.Vec2=event.getLocation()
        let nodePos=GunNode.convertToNodeSpaceAR(pos)
        let i=Math.floor(nodePos.x/106)
        let j=Math.floor(Math.abs(nodePos.y)/106)
        let item=cc.instantiate(pathSp)
        item.x=i*106
        item.y=-j*106
        let index=DataManager.getInstance().findGunMapItemByPos(item.getPosition())
        if(-1==index){
            item.parent=GunNode
            DataManager.getInstance().addGunMapItem(item)

            let js=item.getComponent("pathSp")
            js.setLabNumber(DataManager.getInstance().getGunMapItemLength())
        }
        
        cc.log("ontouchend",i,j)
    }
    ontouchcancel(event:cc.Event.EventTouch,pathSp:cc.Node){
        cc.log("ontouchcancel")
    }
}