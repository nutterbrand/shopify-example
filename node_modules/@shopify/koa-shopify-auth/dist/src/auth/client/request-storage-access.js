"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Copied from https://github.com/Shopify/shopify_app
var requestStorageAccess = function (shop, prefix) {
    if (prefix === void 0) { prefix = ''; }
    return "(function() {\n      function redirect() {\n        var targetInfo = {\n          myshopifyUrl: \"https://" + encodeURIComponent(shop) + "\",\n          hasStorageAccessUrl: \"" + prefix + "/auth/inline?shop=" + encodeURIComponent(shop) + "\",\n          doesNotHaveStorageAccessUrl: \"" + prefix + "/auth/enable_cookies?shop=" + encodeURIComponent(shop) + "\",\n          appTargetUrl: \"" + prefix + "/?shop=" + encodeURIComponent(shop) + "\"\n        }\n\n        if (window.top == window.self) {\n          // If the current window is the 'parent', change the URL by setting location.href\n          window.top.location.href = targetInfo.hasStorageAccessUrl;\n        } else {\n          var storageAccessHelper = new StorageAccessHelper(targetInfo);\n          storageAccessHelper.execute();\n        }\n      }\n\n      document.addEventListener(\"DOMContentLoaded\", redirect);\n    })();";
};
exports.default = requestStorageAccess;
