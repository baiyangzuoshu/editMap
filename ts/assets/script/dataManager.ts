export  default class DataManager{
    private static  _instance:DataManager=null
    
    private leftMap:Array<cc.Node>=[]
    private rightMap:Array<cc.Node>=[]
    private pathMap:Array<cc.Node>=[]
    private gunMap:Array<cc.Node>=[]
    private editType:number=0
    private putType:number=0

    static  getInstance():DataManager{
        if(this._instance==null){
            this._instance=new DataManager
        }
        return this._instance
    }
    //
    getEditType():number{
        return this.editType
    }
    getPutType():number{
        return this.putType
    }
    setEditType(type:number){
        this.editType=type
    }
    setPutType(type:number){
        this.putType=type
    }
    reloadData(str){
        let _json=JSON.parse(str)
        let _map=_json["rightMap"]
        let _path=_json["pathMap"]
        let _gun=_json["gunMap"]


    }

    public outPutData():any{
        let data={}
        data["rightMap"]=[]
        this.rightMap.forEach(v=>{
            data["rightMap"].push({
                x:v.x,y:v.y
            })
        })
        data["pathMap"]=[]
        this.pathMap.forEach(v=>{
            data["pathMap"].push({
                x:v.x,y:v.y
            })
        })
        data["gunMap"]=[]
        this.gunMap.forEach(v=>{
            data["gunMap"].push({
                x:v.x,y:v.y
            })
        })
        console.log(data)
        return data
    }

    //
    addGunMapItem(item:cc.Node):void{
        if(item)this.gunMap.push(item)
    }
    findGunMapItemByPos(pos:cc.Vec2):number{
        for(let i=0;i<this.gunMap.length;i++){
            let item=this.gunMap[i]
            let _x=item.x
            let _y=item.y
            if(pos.x==_x&&pos.y==_y){//?
                return i
            }
        }
        return -1
    }
    getGunMapItemLength(){
        return this.gunMap.length
    }
    //
    addPathMapItem(item:cc.Node):void{
        if(item)this.pathMap.push(item)
    }
    findPathMapItemByPos(pos:cc.Vec2):number{
        for(let i=0;i<this.pathMap.length;i++){
            let item=this.pathMap[i]
            let _x=item.x
            let _y=item.y
            if(pos.x==_x&&pos.y==_y){//?
                return i
            }
        }
        return -1
    }
    getPathMapItemLength(){
        return this.pathMap.length
    }
    //
    addRightMapItem(item:cc.Node):void{
        if(item)this.rightMap.push(item)
    }
    findRightMapItemByPos(pos:cc.Vec2):number{
        for(let i=0;i<this.rightMap.length;i++){
            let item=this.rightMap[i]
            let _x=item.x
            let _y=item.y
            if(Math.abs(pos.x-_x)<=106/2&&Math.abs(pos.y-_y)<=106/2){//?
                return i
            }
        }
        return -1
    }
    findRightMapItemByIndex(index:number):cc.Node{
        if(index<=this.rightMap.length-1)
            return this.rightMap[index]

        return null
    }
    //
    addLeftMapItem(item:cc.Node):void{
        if(item)this.leftMap.push(item)
    }
    findLeftMapItemByIndex(index:number):cc.Node{
        if(index<=this.leftMap.length-1)
            return this.leftMap[index]

        return null
    }
    findLeftMapItemByPos(pos:cc.Vec2):number{
        for(let i=0;i<this.leftMap.length;i++){
            let item=this.leftMap[i]
            let _x=item.x
            let _y=item.y
            if(Math.abs(pos.x-_x)<=106/2&&Math.abs(pos.y-_y)<=106/2){//?
                return i
            }
        }
        return -1
    }
}