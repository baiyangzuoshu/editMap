import DataManager from "./dataManager"

export  default class   MapManager{
    static  _instance:MapManager=null
    static  getInstance():MapManager{
        if(null==this._instance){
            this._instance=new MapManager()
        }
        return this._instance
    }

    initMap(spriteFrame:cc.SpriteFrame,mapNode:cc.Node){
        for(let i=0;i<6;i++){
            for(let j=0;j<6;j++){
                let item=new cc.Node()
                item.x=i*106+106/2
                item.y=-j*106-106/2
                item.parent=mapNode

                item.addComponent(cc.Sprite).spriteFrame=spriteFrame

                DataManager.getInstance().addRightMapItem(item)
            }
        }
    }

    ontouchstart(event:cc.Event.EventTouch){
        cc.log("ontouchstart")
    }
    ontouchmove(event:cc.Event.EventTouch){
        cc.log("ontouchmove")
    }
    ontouchend(event:cc.Event.EventTouch,mapNode:cc.Node,moveSp:cc.Node){
        let pos:cc.Vec2=event.getLocation()
        let nodePos=mapNode.convertToNodeSpaceAR(pos)
        let index=DataManager.getInstance().findRightMapItemByPos(nodePos)
        if(index>-1&&moveSp.active){
            let item=DataManager.getInstance().findRightMapItemByIndex(index)
            if(item){
                item.getComponent(cc.Sprite).spriteFrame=moveSp.getComponent(cc.Sprite).spriteFrame
            }
        }
        cc.log("ontouchend")
    }
    ontouchcancel(event:cc.Event.EventTouch){
        cc.log("ontouchcancel")
    }
}