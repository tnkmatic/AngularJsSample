/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/*******************************************************************************
 * 
 * @param {type} app
 * @returns {undefined}
 ******************************************************************************/
(function(app) {
    'use strict';
    
    // コンストラクタ
    var ArrayItems = function($scope) {
        this.init($scope);
    };
    
    var p = ArrayItems.prototype;    
    
    // initメソッド
    p.init = function($scope) {
        this.$scope = $scope;
        this.items = new Array();
        this.serial = 0;
    };
    
    // 選択中アイテムのsetter
    p.setCurrentItem = function(item) {
        this.current = item;
    };
    
    // 選択中アイテムのgetter
    p.getCurrentItem = function() {
        return this.current;
    };
    
    // 一覧取得メソッド(参照)
    p.list = function(callback) {
        callback.call(this, this.items);
    };
    
    // アイテム追加メソッド
    p.add = function(item, callback) {
        this.serial++;
        item.id = "id_" + this.serial;
        var $scope = this.$scope;
        this.items.push(item);
        // データが更新されたことを通知(イベント)
        $scope.$broadcast('changeItems');
        callback.call(this, item);
    };
    
    // アイテム削除メソッド
    p.remove = function(item, callback) {
        var id = item.id;
        var tmp = new Array();
        for (var i = 0; i < this.items.length; i++) {
            if (item.id != this.items[i].id) {
                tmp.push(this.items[i]);
            }
        }
        this.items = tmp;
        // rootScopeからのイベント通知(broadcat = 自分自身から下位の子方向にイベントを通知)
        this.$scope.$broadcast('changeItems');
        callback.call(this, item);
    };
    
    app.ArrayItems = ArrayItems;
    
}(this.app));
