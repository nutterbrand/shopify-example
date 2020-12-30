"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearSession = exports.redirectToAuth = void 0;
function redirectToAuth(_a, ctx) {
    var fallbackRoute = _a.fallbackRoute, authRoute = _a.authRoute;
    var shop = ctx.query.shop;
    var routeForRedirect = shop == null ? fallbackRoute : authRoute + "?shop=" + shop;
    ctx.redirect(routeForRedirect);
}
exports.redirectToAuth = redirectToAuth;
function clearSession(ctx) {
    delete ctx.session.shop;
    delete ctx.session.accessToken;
}
exports.clearSession = clearSession;
