// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
       m_itemPrefab:cc.Prefab
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        window.m_gPathNode=this;
        this.m_itemArray=[];
        this.m_pathArray=[];
        this.initMap();
    },

    initMap(){
        for(let i=0;i<6;i++){
            for(let j=0;j<6;j++){
                let item=cc.instantiate(this.m_itemPrefab);
                item.parent=this.node;
                item.y=-106*i-106/2;
                item.x=106*j+106/2;

                item.active=false;
                let js=item.getComponent("pathItem");
                js.setTab(i*6+j+1);

                this.m_itemArray.push(item);
            }
        }
    },

    ontouchstart(event){
        
    },

    ontouchmove(event){

    },

    ontouchend(event){
        let _x=this.node.convertToNodeSpaceAR(event.getLocation()).x;
        let _y=this.node.convertToNodeSpaceAR(event.getLocation()).y;
        //cc.log("ontouchstart",_x,_y)
        let sp=this.getClickPathSprite(cc.v2(_x,_y));
        if(sp){
            sp.active=true;
            this.m_pathArray.push({
                index:this.m_pathArray.length+1,
                x:sp.x,
                y:sp.y
            });

            let js=sp.getComponent("pathItem");
            js.setTab(this.m_pathArray.length);
        }
    },

    ontouchcancle(event){

    },

    loadPathItem(arr){
        this.m_pathArray=[];
        for(let i=0;i<arr.length;i++){
            let item=arr[i];
            let sp=this.getClickPathSprite(cc.v2(item.x,item.y));
            if(sp){
                sp.active=true;
                this.m_pathArray.push({
                    index:item.index,
                    x:sp.x,
                    y:sp.y
                });
    
                let js=sp.getComponent("pathItem");
                js.setTab(item.index);
            }
        }
    },

    callBack(){
        let item=this.m_pathArray.pop();
        let sp=this.getClickPathSprite(cc.v2(item.x,item.y));
        if(sp){
            sp.active=false;
        }
    },

    getClickPathSprite(pos){
        //cc.log("getClickMapSprite",pos);
        for(let i=0;i<this.m_itemArray.length;i++){
            let _x=this.m_itemArray[i].x;
            let _y=this.m_itemArray[i].y;
            //cc.log("getClickMapSprite",_x,_y);
            if(pos.x>=_x-106/2&&pos.x<=_x+106/2&&pos.y>=_y-106/2&&pos.y<=_y+106/2){
               // cc.log("getClickMapSprite",i);
                return this.m_itemArray[i];
            }
        }
        return null;
    },

    getEditPathData(){
        let arr=[];
        for(let i=0;i<this.m_pathArray.length;i++){
            arr.push({
                index:this.m_pathArray[i].index,
                x:this.m_pathArray[i].x,
                y:this.m_pathArray[i].y
            });
        }
        return arr;
    },

    start () {

    },

    // update (dt) {},
});
