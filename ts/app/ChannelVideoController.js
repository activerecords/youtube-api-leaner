/// <reference path="../angular/angular.d.ts" />
/// <reference path="../gapi/gapi.d.ts" />
/// <reference path="../underscore.string/underscore.string.d.ts" />
var app;
(function (app) {
    app.channelVideoController = null;
    var ChannelVideoController = (function () {
        function ChannelVideoController($timeout, $scope, $sce) {
            this.$timeout = $timeout;
            this.$scope = $scope;
            this.$sce = $sce;
            this.messageAuth = "";
            this.isVisibleAuth = true;
            this.idChannel = "UCfeamq6EfNCsUDJnKCFx49Q";
            this.page = "Search";
            this.pageNumber = 0;
            this.nextPageToken = null;
            this.prevPageToken = null;
            this.maxResults = 50;
            this.query = "";
            console.log("ChannelVideoController");
            this.videoItemList = [];
        }
        ChannelVideoController.prototype.trustSrc = function (src) {
            return this.$sce.trustAsResourceUrl("https://www.youtube.com/embed/" + src);
        };
        ChannelVideoController.prototype.next = function () {
            var _this = this;
            this.pageNumber++;
            gapi.client.load("youtube", "v3", function () {
                var request = gapi.client.request({
                    path: "/youtube/v3/search",
                    params: {
                        part: "snippet",
                        type: "video",
                        q: _this.query,
                        maxResults: _this.maxResults,
                        order: "viewCount",
                        pageToken: _this.nextPageToken
                    }
                });
                request.execute(_this.updateData.bind(_this));
            });
        };
        ChannelVideoController.prototype.prev = function () {
            var _this = this;
            this.pageNumber--;
            gapi.client.load("youtube", "v3", function () {
                var request = gapi.client.request({
                    path: "/youtube/v3/search",
                    params: {
                        part: "snippet",
                        type: "video",
                        q: _this.query,
                        maxResults: _this.maxResults,
                        order: "viewCount",
                        pageToken: _this.prevPageToken
                    }
                });
                request.execute(_this.updateData.bind(_this));
            });
        };
        ChannelVideoController.prototype.getChannelVideo = function () {
            var _this = this;
            console.log("getChannelVideo");
            this.pageNumber = 0;
            this.query = this.idChannel;
            gapi.client.load("youtube", "v3", function () {
                var request = gapi.client.request({
                    path: "/youtube/v3/search",
                    params: {
                        part: "snippet",
                        channelId: _this.query,
                        type: "video",
                        maxResults: _this.maxResults,
                        order: "viewCount"
                    }
                });
                request.execute(_this.updateData.bind(_this));
            });
        };
        ChannelVideoController.prototype.updateData = function (json) {
            var _this = this;
            console.log(json);
            if (json.error) {
                alert(json.error.message);
                return;
            }
            this.nextPageToken = json.nextPageToken;
            this.prevPageToken = json.prevPageToken;
            this.videoItemList = [];
            $.each(json.items, function (i, item) {
                if (item.id.videoId != null) {
                    var thumbnail;
                    if (item.snippet.thumbnails != null) {
                        $.each(item.snippet.thumbnails, function (size, src) {
                            if (size == "default") {
                                thumbnail = src.url;
                            }
                        });
                    }
                    _this.videoItemList.push({
                        number: _this.maxResults * _this.pageNumber + 1 + i,
                        id: item.id.videoId,
                        title: item.snippet.title,
                        description: item.snippet.description,
                        publishedAt: item.snippet.publishedAt,
                        image: thumbnail,
                        isShow: false
                    });
                }
            });
            this.$scope.$apply();
        };
        ChannelVideoController.prototype.onSelectVideo = function (videoItem) {
            videoItem.isShow = true;
        };
        return ChannelVideoController;
    })();
    app.ChannelVideoController = ChannelVideoController;
})(app || (app = {}));
