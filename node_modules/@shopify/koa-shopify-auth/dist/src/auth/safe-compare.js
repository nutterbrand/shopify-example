"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var crypto_1 = tslib_1.__importDefault(require("crypto"));
function safeCompare(stringA, stringB) {
    var aLen = Buffer.byteLength(stringA);
    var bLen = Buffer.byteLength(stringB);
    if (aLen !== bLen) {
        return false;
    }
    // Turn strings into buffers with equal length
    // to avoid leaking the length
    var buffA = Buffer.alloc(aLen, 0, 'utf8');
    buffA.write(stringA);
    var buffB = Buffer.alloc(bLen, 0, 'utf8');
    buffB.write(stringB);
    return crypto_1.default.timingSafeEqual(buffA, buffB);
}
exports.default = safeCompare;
