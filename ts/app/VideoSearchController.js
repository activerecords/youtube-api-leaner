/// <reference path="../angular/angular.d.ts" />
/// <reference path="../gapi/gapi.d.ts" />
/// <reference path="../underscore.string/underscore.string.d.ts" />
var app;
(function (app) {
    var VideoSearchController = (function () {
        function VideoSearchController($timeout, $scope, $sce) {
            this.$timeout = $timeout;
            this.$scope = $scope;
            this.$sce = $sce;
            this.messageAuth = "";
            this.isVisibleAuth = true;
            this.searchWords = "VGM";
            this.page = "VideoSearch";
            this.pageNumber = 0;
            this.nextPageToken = null;
            this.prevPageToken = null;
            this.maxResults = 50;
            this.query = "";
            console.log("VideoSearchController");
            this.videoItemList = [];
        }
        VideoSearchController.prototype.trustSrc = function (src) {
            return this.$sce.trustAsResourceUrl("http://www.youtube.com/embed/" + src);
        };
        VideoSearchController.prototype.search = function () {
            var _this = this;
            this.pageNumber = 0;
            this.query = this.searchWords;
            gapi.client.load("youtube", "v3", function () {
                var request = gapi.client.request({
                    path: "/youtube/v3/search",
                    params: {
                        part: "snippet",
                        type: "video",
                        q: _this.query,
                        maxResults: _this.maxResults,
                        order: "viewCount"
                    }
                });
                request.execute(_this.updateData.bind(_this));
            });
        };
        VideoSearchController.prototype.next = function () {
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
        VideoSearchController.prototype.prev = function () {
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
        VideoSearchController.prototype.updateData = function (json) {
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
                        image: thumbnail
                    });
                }
            });
            this.$scope.$apply();
        };
        VideoSearchController.prototype.onSelectVideo = function (videoItem) {
            videoItem.isShow = true;
        };
        return VideoSearchController;
    })();
    app.VideoSearchController = VideoSearchController;
})(app || (app = {}));
