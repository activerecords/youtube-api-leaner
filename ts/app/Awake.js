/// <reference path="App.ts" />
/// <reference path="AppController.ts" />
/// <reference path="OAuthController.ts" />
/// <reference path="VideoSearchController.ts" />
/// <reference path="ChannelInformationController.ts" />
/// <reference path="ChannelVideoController.ts" />
/// <reference path="UserInformationController.ts" />
var app;
(function (app_1) {
    FastClick.attach(document.body);
    var app = new app_1.App("app", ["ui.bootstrap", "ngSanitize"]);
    app.addController("AppController", app_1.AppController);
    app.addController("OAuthController", app_1.OAuthController);
    app.addController("VideoSearchController", app_1.VideoSearchController);
    app.addController("ChannelInformationController", app_1.ChannelInformationController);
    app.addController("ChannelVideoController", app_1.ChannelVideoController);
    app.addController("UserInformationController", app_1.UserInformationController);
})(app || (app = {}));
