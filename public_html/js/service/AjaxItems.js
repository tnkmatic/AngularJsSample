/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


(function(app){
    'use strict';
    var AjaxItems = function($scope, $http) {
        this.init($scope, $http);
    };
    
    var p = AjaxItems.prototype;
    
    p.init = function($scope, $http) {
        this.$http = $http;
        this.$scope = $scope;
    };
    
    p.setCurrentItem = function(item) {
        this.current = item;
    };
    
    p.getCurrentItem = function(item) {
        return this.current;
    };
    
    p.list = function(callback) {
        this.$http({
            method : 'GET',
            url : 'rest.php',
            params : {
                method : 'list'
            }
        }).success(function(
                response, status, headers, config, statusText) {
                    console.log(config);
                    callback.call(this, response.data);
                });
    };
    
    p.add = function(item, callback) {
        var $scope = this.$scope;
        this.$http({
            method : 'POST',
            url : 'rest.php',
            data : {
                method : 'add',
                title : item.title,
                memo : item.memo
            }
        }).success(function(response) {
            //データが変更されたことを通知
            $scope.$broadcast('changeItems');
            callback.call(this, response.data);
        });
    };
    
    p.remove = function(item, callback) {
        var $scope = this.$scope;
        this.$http({
            method : 'POST',
            url : 'rest.php',
            data : {
                method : 'delete',
                id : item.id
            }
        }).sccuss(function(response) {
            $scope.$broadcast('changeItems');
            callback.call(this, response);
        });
    };
    
    app.AjaxItems = AjaxItems;
}(this.app));