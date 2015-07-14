/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

http://codezine.jp/article/detail/8311

(function(module) {
    'use strict';       // Strictモードを指定
    
    module.controller('pageController', function($scope) {
       // 表示する要素の管理
       $scope.show = {
           list : true,
           add  : false,
           info : false
       };
       
       // ワーニング等のメッセージ表示
       $scope.message = {
           type : 'alert-info',
           text : '',
           show : false
       };
       
       // 表示する要素を変更する
       $scope.changePage = function(type) {
           for (var name in $scope.show) {
               if (name === type) {
                   $scope.show[name] = true;
               } else {
                   $scope.show[name] = false;
               }
           }
       };
       
       $scope.deleteItem = function(item) {
           $scope.showMessage({
                type : 'alert-warning',
                text : '削除しました',
                show : true
            });
            $scope.$root.$boroadcast('changeItems');
            $scope.changePage('list');
       };
       
    });

    module.controller('listController', function($scope) {
        $scope.items = [
            {
                title : 'お買い物リスト',
                memo : '大根と豆腐を買ってくる'
            },
            {
                title : '通帳記入する',
                memo : 'XX銀行の貯金通帳に記入する'
            }
        ];
    });
    
}(TodoModule));