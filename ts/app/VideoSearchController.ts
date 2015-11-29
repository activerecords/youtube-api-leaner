/// <reference path="../angular/angular.d.ts" />
/// <reference path="../gapi/gapi.d.ts" />
/// <reference path="../underscore.string/underscore.string.d.ts" />

module app {
  interface VideoItem {
    number: number;
    id: string;
    title: string;
    description: string;
    publishedAt: string;
    image: string;
  }

  export class VideoSearchController {
    private messageAuth = "";
    private isVisibleAuth = true;
    private searchWords = "VGM";
    private page = "VideoSearch";
    private pageNumber = 0;
    private nextPageToken = null;
    private prevPageToken = null;
    private maxResults = 50;
    private query = "";

    private videoItemList: VideoItem[];

    constructor(private $timeout: ng.ITimeoutService, private $scope: ng.IRootScopeService, private $sce) {
      console.log("VideoSearchController")

      this.videoItemList = []
    }

    public trustSrc(src) {
      return this.$sce.trustAsResourceUrl("http://www.youtube.com/embed/" + src)
    }

    private search() {
      this.pageNumber = 0
      this.query = this.searchWords

      gapi.client.load("youtube", "v3", () => {
        var request = gapi.client.request({
          path: "/youtube/v3/search",
          params: {
            part: "snippet",
            type: "video",
            q: this.query,
            maxResults: this.maxResults,
            order: "viewCount"
          }
        })

        request.execute(this.updateData.bind(this))
      })
    }

    private next() {
      this.pageNumber++

      gapi.client.load( "youtube", "v3", () => {
        var request = gapi.client.request({
          path: "/youtube/v3/search",
          params: {
            part: "snippet",
            type: "video",
            q: this.query,
            maxResults: this.maxResults,
            order: "viewCount",
            pageToken: this.nextPageToken
          }
        })

        request.execute(this.updateData.bind(this))
      })
    }

    private prev() {
      this.pageNumber--

      gapi.client.load( "youtube", "v3", () => {
        var request = gapi.client.request({
          path: "/youtube/v3/search",
          params: {
            part: "snippet",
            type: "video",
            q: this.query,
            maxResults: this.maxResults,
            order: "viewCount",
            pageToken: this.prevPageToken
          }
        })

        request.execute(this.updateData.bind(this))
      })
    }

    private updateData(json) {
      console.log(json)

      if (json.error) {
        alert(json.error.message)

        return
      }

      this.nextPageToken = json.nextPageToken
      this.prevPageToken = json.prevPageToken

      this.videoItemList = []

      $.each(json.items, (i, item) => {
        if (item.id.videoId != null) {
          var thumbnail;

          if (item.snippet.thumbnails != null) {
            $.each( item.snippet.thumbnails, ( size, src ) => {
              if (size == "default") {
                thumbnail = src.url
              }
            })
          }

          this.videoItemList.push({
            number: this.maxResults * this.pageNumber + 1 + i,
            id: item.id.videoId,
            title: item.snippet.title,
            description: item.snippet.description,
            publishedAt: item.snippet.publishedAt,
            image: thumbnail
          })
        }
      })

      this.$scope.$apply()
    }

    public onSelectVideo(videoItem) {
      videoItem.isShow = true
    }
  }
}
