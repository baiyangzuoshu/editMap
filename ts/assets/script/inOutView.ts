// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import DataManager from "./dataManager";
import { PUTTYPE } from "./enum";

const {ccclass, property} = cc._decorator;

@ccclass
export default class InOutView extends cc.Component {
    
    @property(cc.EditBox)
    inOutEditBox:cc.EditBox=null
    
    // LIFE-CYCLE CALLBACKS:
    onClickEvent(ref,data){
        cc.log(data)
        if("cancel"==data){
            this.node.destroy()
        }
        else if("confirm"==data){
            this.node.destroy()
            DataManager.getInstance().reloadData(this.inOutEditBox.string)
        }
    }
    //默认为private
    public setEditBoxString(str:string):void{
        this.inOutEditBox.string=str
    }

    onLoad () {
        
    }

    start () {

    }

    // update (dt) {}
}
