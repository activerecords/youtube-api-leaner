/// <reference path="../angular/angular.d.ts" />
/// <reference path="../gapi/gapi.d.ts" />
/// <reference path="../underscore.string/underscore.string.d.ts" />
var app;
(function (app) {
    app.appController = null;
    var AppController = (function () {
        function AppController($timeout, $scope, $sce) {
            this.$timeout = $timeout;
            this.$scope = $scope;
            this.$sce = $sce;
            this.API_KEY = "AIzaSyDSFMdXNLfOLebDB6TIr19rUHFYJ6PrX-M";
            this.menu = "ApiTest";
            this.page = "VideoSearch";
            app.appController = this;
        }
        AppController.prototype.init = function () {
            gapi.client.setApiKey(this.API_KEY);
        };
        return AppController;
    })();
    app.AppController = AppController;
})(app || (app = {}));
