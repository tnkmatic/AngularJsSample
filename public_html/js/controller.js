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
    module.controller('pageController', function($scope, $timeout) {
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
            // rootScopeからのイベント通知(broadcat = 自分自身から下位の子方向にイベントを通知)
            $scope.$root.$broadcast('changeItems');
            // 一覧の表示(画面遷移)
            $scope.changePage('list');
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
            alert('一覧が更新されました');
        });
        
        $scope.show = function(item) {
            $scope.$parent.active = item;
            $scope.$parent.changePage('info');
        };
    }); //listController
    
    /***************************************************************************
     *  addController TODOアイテム追加用コントローラ
     **************************************************************************/
    module.controller('addController', function($scope) {
        // 追加用のタスクViewモデル
        $scope.item = {};
        
        $scope.addItem = function() {
            if (!$scope.addItemForm.$valid) {
                alert('入力エラーです');
                return;
            }
            $scope.$parent.showMessage({
                type : 'alert-info',
                text : '追加しました',
                show : true
            });
            // イベントを発生させる(一覧更新通知用) 「一覧が更新されました」のアラート表示
            $scope.$root.$broadcast('changeItems');
            // リスト表示に切り替え
            $scope.$parent.changePage('list');
            $scope.item = {};
        }
    });
}(TodoModule));