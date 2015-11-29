/// <reference path="App.ts" />
/// <reference path="AppController.ts" />
/// <reference path="OAuthController.ts" />
/// <reference path="VideoSearchController.ts" />
/// <reference path="ChannelInformationController.ts" />
/// <reference path="ChannelVideoController.ts" />
/// <reference path="UserInformationController.ts" />

module app {
  declare var FastClick: any

  FastClick.attach(document.body)

  var app = new App("app", ["ui.bootstrap", "ngSanitize"])

  app.addController("AppController", AppController)
  app.addController("OAuthController", OAuthController)
  app.addController("VideoSearchController", VideoSearchController)
  app.addController("ChannelInformationController", ChannelInformationController)
  app.addController("ChannelVideoController", ChannelVideoController)
  app.addController("UserInformationController", UserInformationController)
}
