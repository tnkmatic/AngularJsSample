/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/*******************************************************************************
 * サービスの登録処理
 * @param {type} module
 * @returns {undefined}
 ******************************************************************************/
(function(module) {
    'use strict';
    
    module.factory('Items', function($rootScope){
        return new app.ArrayItems($rootScope);
    });
    
    /*
     * サービスの用途（ビジネスロジックの記述 or 汎用機能ユーティリティの記述）
     */
    
    /* 
     * 以下の記述でも問題ない(serviceメソッドでのサービス生成)
     * module.service('Items', ['$rootScope', app.ArrayItems])
     */
}(TodoModule));


