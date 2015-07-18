/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

(function(module) {
    'use strict';       // Strictモードを指定
    
    /***************************************************************************
     *  pageController
     **************************************************************************/
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
       
       // タスクの削除
       $scope.deleteItem = function(item) {
           $scope.showMessage({
                type : 'alert-warning',
                text : '削除しました',
                show : true
            });
            // rootScopeからのイベント通知
            $scope.$root.$boroadcast('changeItems');
            // 一覧の表示(画面遷移)
            $scope.changePage('list');
       };
       
       // メッセージ表示
       $scope.showMessage = function(msg) {
           $scope.message = msg;
           // 3秒後にメッセージを非表示にする
           $timeout(function(){
               $scope.message = false;
           }, 3000);
       };
    }); //pageController

    /***************************************************************************
     *  listController
     **************************************************************************/
    module.controller('listController', function($scope) {
        // 一覧に表示データの初期設定
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
        
        // イベント受信(changeItem)
        $scope.$on('changeItems', function() {
            $scope.$parent.a
        });
        
        
    }); //listController
    
}(TodoModule));