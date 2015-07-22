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
    p.setCurrentItems = function(item) {
        this.current = item;
    };
    
    // 選択中アイテムのgetter
    p.getCurrentItems = function() {
        return this.current;
    };
    
    実装中。
    
}(this.app));
