/// <reference path="../angular/angular.d.ts" />
/// <reference path="../gapi/gapi.d.ts" />
/// <reference path="../underscore.string/underscore.string.d.ts" />

module app {
  export var channelVideoController: ChannelVideoController = null

  interface VideoItem {
    number: number
    id: string
    title: string
    description: string
    publishedAt: string
    image: string
    isShow: boolean
  }

  export class ChannelVideoController {
    private messageAuth = "";
    private isVisibleAuth = true;
    private idChannel = "UCfeamq6EfNCsUDJnKCFx49Q";
    private page = "Search";
    private pageNumber = 0;
    private nextPageToken = null;
    private prevPageToken = null;
    private maxResults = 50;
    private query = "";

    private videoItemList: VideoItem[];

    constructor(private $timeout: ng.ITimeoutService, private $scope: ng.IRootScopeService, private $sce) {
      console.log("ChannelVideoController")

      this.videoItemList = []
    }

    public trustSrc(src) {
      return this.$sce.trustAsResourceUrl("https://www.youtube.com/embed/" + src)
    }

    private next() {
      this.pageNumber++

      gapi.client.load( "youtube", "v3", () => {
        var request = gapi.client.request( {
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

        request.execute( this.updateData.bind(this) )
      })
    }

    private prev() {
      this.pageNumber--

      gapi.client.load( "youtube", "v3", () => {
        var request = gapi.client.request( {
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

    private getChannelVideo() {
      console.log("getChannelVideo")

      this.pageNumber = 0
      this.query = this.idChannel

      gapi.client.load("youtube", "v3", () => {
        var request = gapi.client.request({
          path: "/youtube/v3/search",
          params: {
            part: "snippet",
            channelId: this.query,
            type: "video",
            maxResults: this.maxResults,
            order: "viewCount"
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
          var thumbnail

          if (item.snippet.thumbnails != null) {
            $.each(item.snippet.thumbnails, (size, src) => {
              if (size == "default") {
                thumbnail = src.url
              }
            })
          }

          this.videoItemList.push( {
            number: this.maxResults * this.pageNumber + 1 + i,
            id: item.id.videoId,
            title: item.snippet.title,
            description: item.snippet.description,
            publishedAt: item.snippet.publishedAt,
            image: thumbnail,
            isShow: false
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
