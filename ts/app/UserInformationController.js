/// <reference path="../angular/angular.d.ts" />
/// <reference path="../gapi/gapi.d.ts" />
/// <reference path="../underscore.string/underscore.string.d.ts" />
var app;
(function (app) {
    var UserInformationController = (function () {
        function UserInformationController($timeout, $scope, $sce) {
            this.$timeout = $timeout;
            this.$scope = $scope;
            this.$sce = $sce;
            this.userName = "Active Records";
            console.log("UserInformationController");
        }
        UserInformationController.prototype.getUserInformation = function () {
            var _this = this;
            console.log("getUserInformation");
            gapi.client.load("youtube", "v3", function () {
                var request = gapi.client.request({
                    path: "youtube/v3/channels",
                    params: {
                        part: "id",
                        forUsername: _this.userName
                    }
                });
                request.execute(_this.showData.bind(_this));
            });
        };
        UserInformationController.prototype.showData = function (json) {
            if (json.error) {
                alert(json.error.message);
                return;
            }
            console.log(json);
        };
        return UserInformationController;
    })();
    app.UserInformationController = UserInformationController;
})(app || (app = {}));
