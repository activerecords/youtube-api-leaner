/// <reference path="../angular/angular.d.ts" />
/// <reference path="../gapi/gapi.d.ts" />
/// <reference path="../underscore.string/underscore.string.d.ts" />

module app {
  export var appController: AppController = null;

  export class AppController {
    private API_KEY = "AIzaSyDSFMdXNLfOLebDB6TIr19rUHFYJ6PrX-M";

    public menu = "ApiTest";
    public page = "VideoSearch";

    constructor(private $timeout: ng.ITimeoutService, private $scope: ng.IRootScopeService, private $sce) {
      appController = this
    }

    public init() {
      gapi.client.setApiKey(this.API_KEY)
    }
  }
}
