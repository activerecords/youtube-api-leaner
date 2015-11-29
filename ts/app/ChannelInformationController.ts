/// <reference path="../angular/angular.d.ts" />
/// <reference path="../gapi/gapi.d.ts" />
/// <reference path="../underscore.string/underscore.string.d.ts" />

module app {
  interface ChannelItem {
    country: string
    description: string
    publishedAt: string
    title: string
    thumbnail_default: string
    thumbnail_high: string
    thumbnail_medium: string
  }

  export class ChannelInformationController {
    private idChannel: string = "UCfeamq6EfNCsUDJnKCFx49Q";
    private channelJson: any;
    private channelItem: ChannelItem;

    constructor(private $timeout: ng.ITimeoutService, private $scope: ng.IRootScopeService, private $sce) {
      console.log("ChannelInformationController")
      
      this.channelItem = {
        country: "country",
        description: "description",
        publishedAt: "publishedAt",
        title: "title",
        thumbnail_default: "thumbnail_default",
        thumbnail_high: "thumbnail_high",
        thumbnail_medium: "thumbnail_medium",
      }
    }

    public getChannel() {
      console.log("getChannel")

      gapi.client.load("youtube", "v3", () => {
        var request = gapi.client.request({
          path: "/youtube/v3/channels",
          params: {
            id: this.idChannel,
            part: "id, snippet, brandingSettings, contentDetails, invideoPromotion, statistics, topicDetails"
          }
        })

        request.execute(this.updateChannelData.bind(this))
      })
    }

    private updateChannelData(json) {
      console.log(json)
      this.channelJson = "" + json.items[0].snippet

      this.channelItem = {
        country: json.items[0].snippet.country,
        description: json.items[0].snippet.description,
        publishedAt: json.items[0].snippet.publishedAt,
        title: json.items[0].snippet.title,
        thumbnail_default: json.items[0].snippet.thumbnails.default.url,
        thumbnail_high: json.items[0].snippet.thumbnails.high.url,
        thumbnail_medium: json.items[0].snippet.thumbnails.medium.url
      }

      this.$scope.$apply()

      if (json.error) {
        alert(json.error.message)

        return
      }
    }
  }
}
