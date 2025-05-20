"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pick = (obj, kyes) => {
    const finalObj = {};
    for (const key of kyes) {
        if (obj && Object.hasOwnProperty.call(obj, key)) {
            finalObj[key] = obj[key];
        }
    }
    return finalObj;
};
exports.default = pick;
