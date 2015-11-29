/// <reference path="../angular/angular.d.ts" />
/// <reference path="../gapi/gapi.d.ts" />
/// <reference path="../underscore.string/underscore.string.d.ts" />
var app;
(function (app) {
    var ChannelInformationController = (function () {
        function ChannelInformationController($timeout, $scope, $sce) {
            this.$timeout = $timeout;
            this.$scope = $scope;
            this.$sce = $sce;
            this.idChannel = "UCfeamq6EfNCsUDJnKCFx49Q";
            console.log("ChannelInformationController");
            this.channelItem = {
                country: "country",
                description: "description",
                publishedAt: "publishedAt",
                title: "title",
                thumbnail_default: "thumbnail_default",
                thumbnail_high: "thumbnail_high",
                thumbnail_medium: "thumbnail_medium"
            };
        }
        ChannelInformationController.prototype.getChannel = function () {
            var _this = this;
            console.log("getChannel");
            gapi.client.load("youtube", "v3", function () {
                var request = gapi.client.request({
                    path: "/youtube/v3/channels",
                    params: {
                        id: _this.idChannel,
                        part: "id, snippet, brandingSettings, contentDetails, invideoPromotion, statistics, topicDetails"
                    }
                });
                request.execute(_this.updateChannelData.bind(_this));
            });
        };
        ChannelInformationController.prototype.updateChannelData = function (json) {
            console.log(json);
            this.channelJson = "" + json.items[0].snippet;
            this.channelItem = {
                country: json.items[0].snippet.country,
                description: json.items[0].snippet.description,
                publishedAt: json.items[0].snippet.publishedAt,
                title: json.items[0].snippet.title,
                thumbnail_default: json.items[0].snippet.thumbnails.default.url,
                thumbnail_high: json.items[0].snippet.thumbnails.high.url,
                thumbnail_medium: json.items[0].snippet.thumbnails.medium.url
            };
            this.$scope.$apply();
            if (json.error) {
                alert(json.error.message);
                return;
            }
        };
        return ChannelInformationController;
    })();
    app.ChannelInformationController = ChannelInformationController;
})(app || (app = {}));
