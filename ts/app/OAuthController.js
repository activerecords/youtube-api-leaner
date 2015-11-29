/// <reference path="../angular/angular.d.ts" />
/// <reference path="../gapi/gapi.d.ts" />
/// <reference path="../underscore.string/underscore.string.d.ts" />
var app;
(function (app) {
    app.oAuthController = null;
    var OAuthController = (function () {
        function OAuthController($timeout, $scope, $sce) {
            this.$timeout = $timeout;
            this.$scope = $scope;
            this.$sce = $sce;
            this.OAUTH2_CLIENT_ID = "503189536948-oor9fcsc3jprak5629jsba0p3trfo2gf.apps.googleusercontent.com";
            this.OAUTH2_SCOPES = ["https://www.googleapis.com/auth/youtube.readonly"];
            this.messageAuth = "";
            this.isVisibleAuth = true;
            console.log("OAuthController");
            app.oAuthController = this;
        }
        OAuthController.prototype.init = function () {
            gapi.auth.authorize({
                client_id: this.OAUTH2_CLIENT_ID,
                scope: this.OAUTH2_SCOPES,
                immediate: true
            }, this.handleAuthResult.bind(this));
        };
        OAuthController.prototype.handleAuth = function () {
            console.log("handleAuthClick");
            gapi.auth.authorize({
                client_id: this.OAUTH2_CLIENT_ID,
                scope: this.OAUTH2_SCOPES,
                immediate: false
            }, this.handleAuthResult);
            return false;
        };
        OAuthController.prototype.handleAuthResult = function (authResult) {
            console.log("handleAuthResult");
            if (authResult.error == false) {
                this.messageAuth = "OAUTH2は認証済みです。";
                this.isVisibleAuth = false;
            }
            else {
                this.messageAuth = "OAUTH2は認証済みではありません。";
                this.isVisibleAuth = true;
            }
        };
        return OAuthController;
    })();
    app.OAuthController = OAuthController;
})(app || (app = {}));
