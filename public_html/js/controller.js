/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

(function(module) {
    'use strict';       // Strictモードを指定
    
    /***************************************************************************
     *  pageController ページ全体制御用コントローラ
     **************************************************************************/
    // タイムアウト処理を実現するため$timeoutを注入できるよう引数に$timeoutを指定
    module.controller('pageController', function($scope, $timeout, Items) {
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
           if (type === 'info') {
               var item = Items.getCurrentItem();
               $scope.active = item;
           }
       };
       
       // タスクの削除
       $scope.deleteItem = function(item) {
           var item = Items.getCurrentItem();
           Items.remove(item, function() {
               $scope.changePage('list');
               $scope.showMessage({
                    type : 'alert-warning',
                    text : '削除しました',
                    show : true
                });
           });
       };
       
       // メッセージ表示
       $scope.showMessage = function(msg) {
           $scope.message = msg;
           // 3秒後にメッセージを非表示にする
           $timeout(function(){
               $scope.message.show = false;
           }, 3000);
       };
    }); //pageController

    /***************************************************************************
     *  listController 一覧表示用コントローラ
     **************************************************************************/
    module.controller('listController', function($scope, Items) {
        $scope.items = [];
        
        // 一覧データを取得する
        Items.list(function(list) {
            $scope.items = list;
        });

        $scope.show  = function(item) {
            Items.setCurrentItem(item);
            $scope.$parent.changePage('info');
        };
        
        // イベント受信(changeItem)
        $scope.$on('changeItems', function() {
            Items.list(function(list) {
                $scope.items = list;
            });
        });
        
    }); //listController
    
    /***************************************************************************
     *  addController TODOアイテム追加用コントローラ
     **************************************************************************/
    module.controller('addController', function($scope, Items) {
        // 追加用のタスクViewモデル
        $scope.item = {};
        
        $scope.addItem = function() {
            if (!$scope.addItemForm.$valid) {
                alert('入力エラーです');
                return;
            }
            Items.add($scope.item, function(data) {
                // 登録された場合には一覧を表示する
                $scope.$parent.showMessage({
                    type : 'alert-info',
                    text : '追加しました',
                    show : true
                });
                // リスト表示に切り替え
                $scope.$parent.changePage('list');
                $scope.item = {};
            });
        }
    });
}(TodoModule));