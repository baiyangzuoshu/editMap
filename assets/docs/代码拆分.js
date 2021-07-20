/**
1.第一版的时候，touchControl写了具体的逻辑功能，挂载了一些控件。这使得它并不纯粹，需要分离。
因此我把touchControl具体逻辑移到了game中，并且把mapNode一些事件处理移到game中，这样可以做到统一处理，
mapNode提供函数即可！ 
2.当一份代码需要重复的时候，就应该拆分重组代码了，只在一处存在。
*/

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    // update (dt) {},
});
