/// <reference path="../angular/angular.d.ts" />
/// <reference path="../gapi/gapi.d.ts" />
/// <reference path="../underscore.string/underscore.string.d.ts" />

module app {
  export var oAuthController: OAuthController = null;

  export class OAuthController {
    private OAUTH2_CLIENT_ID = "";
    private OAUTH2_SCOPES = ["https://www.googleapis.com/auth/youtube.readonly"];

    private messageAuth = "";
    private isVisibleAuth = true;

    constructor(private $timeout: ng.ITimeoutService, private $scope: ng.IRootScopeService, private $sce) {
      console.log("OAuthController")

      oAuthController = this
    }

    public init() {
      gapi.auth.authorize({
        client_id: this.OAUTH2_CLIENT_ID,
        scope: this.OAUTH2_SCOPES,
        immediate: true
      }, this.handleAuthResult.bind(this))
    }

    public handleAuth() {
      console.log("handleAuthClick")

      gapi.auth.authorize( {
          client_id: this.OAUTH2_CLIENT_ID,
          scope: this.OAUTH2_SCOPES,
          immediate: false
        },
        this.handleAuthResult
      )

      return false
    }

    private handleAuthResult(authResult) {
      console.log("handleAuthResult")

      if (authResult.error == false) {
        this.messageAuth = "OAUTH2は認証済みです。"

        this.isVisibleAuth = false
      } else {
        this.messageAuth = "OAUTH2は認証済みではありません。"

        this.isVisibleAuth = true
      }
    }
  }
}
