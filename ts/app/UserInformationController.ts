/// <reference path="../angular/angular.d.ts" />
/// <reference path="../gapi/gapi.d.ts" />
/// <reference path="../underscore.string/underscore.string.d.ts" />

module app {
  export class UserInformationController {
    private userName = "Active Records";

    constructor(private $timeout: ng.ITimeoutService, private $scope: ng.IRootScopeService, private $sce) {
      console.log("UserInformationController")
    }

    public getUserInformation() {
      console.log("getUserInformation")

      gapi.client.load("youtube", "v3", () => {
        var request = gapi.client.request({
          path: "youtube/v3/channels",
            params: {
            part: "id",
            forUsername: this.userName
          }
        })

        request.execute(this.showData.bind(this))
      })
    }

    private showData(json) {
      if (json.error) {
        alert(json.error.message)

        return
      }

      console.log(json)
    }
  }
}
