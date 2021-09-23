// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        m_editNode:cc.Node,
        m_clickSp:cc.Sprite,
        m_spriteAtlas:cc.SpriteAtlas
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        window.m_gMapNode=this;
        this.m_mapArray=[];
        this.m_editArray=[];
      
        this.m_clickSp.node.active=false;
        this.initMap();
    },

    ontouchstart(event){
        let _x=this.node.convertToNodeSpaceAR(event.getLocation()).x;
        let _y=this.node.convertToNodeSpaceAR(event.getLocation()).y;
        //cc.log("ontouchstart",_x,_y)
        let sp=this.getClickMapSprite(cc.v2(_x,_y));
        if(sp){
            this.m_clickSp.node.x=_x;
            this.m_clickSp.node.y=_y;
            this.m_clickSp.node.active=true;
            this.m_clickSp.spriteFrame=sp.spriteFrame;
        }
    },
    ontouchmove(event){
        if(this.m_clickSp.node.active){
            let _x=this.node.convertToNodeSpaceAR(event.getLocation()).x;
            let _y=this.node.convertToNodeSpaceAR(event.getLocation()).y;
            
            this.m_clickSp.node.x=_x;
            this.m_clickSp.node.y=_y;
        }
    },
    ontouchend(event){
        if(!this.m_clickSp.node.active)return;

        let _x=this.m_editNode.convertToNodeSpaceAR(event.getLocation());
        let _y=this.m_editNode.convertToNodeSpaceAR(event.getLocation());
        let sp=this.getClickEditSprite(cc.v2(_x,_y));
        if(sp){
            sp.spriteFrame=this.m_clickSp.spriteFrame;
        }
        this.m_clickSp.node.active=false;
    },
    ontouchcancel(event){
        this.m_clickSp.node.active=false;
    },

    getClickMapSprite(pos){
        //cc.log("getClickMapSprite",pos);
        for(let i=0;i<this.m_mapArray.length;i++){
            let _x=this.m_mapArray[i].node.x;
            let _y=this.m_mapArray[i].node.y;
            //cc.log("getClickMapSprite",_x,_y);
            if(pos.x>=_x-106/2&&pos.x<=_x+106/2&&pos.y>=_y-106/2&&pos.y<=_y+106/2){
               // cc.log("getClickMapSprite",i);
                return this.m_mapArray[i];
            }
        }
        return null;
    },

    getClickEditSprite(pos){
        for(let i=0;i<this.m_editArray.length;i++){
            let _x=this.m_editArray[i].node.x;
            let _y=this.m_editArray[i].node.y;
            if(pos.x>=_x-106/2&&pos.x<=_x+106/2&&pos.y>=_y-106/2&&pos.y<=_y+106/2){
                return this.m_editArray[i];
            }
        }
        return null;
    },

    getEditMapData(){
        let arr=[];
        for(let i=0;i<this.m_editArray.length;i++){
            arr.push({
                spriteFrame:this.m_editArray[i].spriteFrame.name,
                x:this.m_editArray[i].node.x,
                y:this.m_editArray[i].node.y
            });
        }
        return arr;
    },

    initMap(){
        for(let i=0;i<5;i++){
            for(let j=1;j<6;j++){
                let index=5*i+j;
                let spriteFrame=this.m_spriteAtlas.getSpriteFrame(index+"");
                if(!spriteFrame)break;

                let node=new cc.Node();
                node.parent=this.node;

                let sp=node.addComponent(cc.Sprite);
                sp.spriteFrame=spriteFrame;
                node.x=j*115-106/2;
                node.y=-i*115-106/2;

                this.m_mapArray.push(sp);
            }
        }

        for(let i=0;i<6;i++){
            for(let j=0;j<6;j++){
                let spriteFrame=this.m_spriteAtlas.getSpriteFrame("11");

                let node=new cc.Node();
                node.parent=this.m_editNode;
                node.y=-i*106-106/2;
                node.x=j*106+106/2;

                let sp=node.addComponent(cc.Sprite);
                sp.spriteFrame=spriteFrame;

                this.m_editArray.push(sp);
            }
        }
    },

    loadMapItem(arr){
        for(let i=0;i<this.m_editArray.length;i++){
            let spriteFrame=this.m_spriteAtlas.getSpriteFrame(arr[i].spriteFrame);
            this.m_editArray[i].spriteFrame=spriteFrame;
        }
    }
});
