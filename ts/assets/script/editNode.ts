import DataManager from "./dataManager"

export  default class   EditManager{
    static  _instance:EditManager=null
    static  getInstance():EditManager{
        if(null==this._instance){
            this._instance=new EditManager()
        }
        return  this._instance
    }

    ontouchstart(event:cc.Event.EventTouch,editNode:cc.Node,moveSp:cc.Node){
        let pos:cc.Vec2=event.getLocation()
        let nodePos=editNode.convertToNodeSpaceAR(pos)
        let index=DataManager.getInstance().findLeftMapItemByPos(nodePos)
        if(index>-1){
            let item=DataManager.getInstance().findLeftMapItemByIndex(index)
            if(item){
                moveSp.active=true
                moveSp.x=nodePos.x
                moveSp.y=nodePos.y
    
                moveSp.getComponent(cc.Sprite).spriteFrame=item.getComponent(cc.Sprite).spriteFrame
            }
        }
        else{
            moveSp.active=false
        }
        cc.log("ontouchstart",nodePos.x,nodePos.y,index)
    }
    ontouchmove(event:cc.Event.EventTouch,editNode:cc.Node,moveSp:cc.Node){
        let pos:cc.Vec2=event.getDelta()
        if(moveSp.active){
            moveSp.x+=pos.x
            moveSp.y+=pos.y
        }
        cc.log("ontouchmove",pos.x,pos.y)
    }
    ontouchend(event:cc.Event.EventTouch,moveSp:cc.Node){
        moveSp.active=false
        cc.log("ontouchend")
    }
    ontouchcancel(event:cc.Event.EventTouch,moveSp:cc.Node){
        moveSp.active=false
        cc.log("ontouchcancel")
    }
}