"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = require("@nodekit/logger");
const createExpress_1 = __importDefault(require("./createExpress"));
const serverUtils_1 = require("./utils/serverUtils");
const log = logger_1.logger('[express-isomorphic]');
const productionServer = function productionServer({ extend, makeHtmlPath, webpackBuild, }) {
    return createExpress_1.default({
        bootstrap: (app, serverState) => {
            log(`bootstrap(): webpackBuild:\n%j`, webpackBuild);
            const { error, assets } = serverUtils_1.parseWebpackBuild(webpackBuild);
            const makeHtml = require(makeHtmlPath).default || require(makeHtmlPath);
            serverState.update(Object.assign({ assets }, error && {
                error: {
                    errorObj: error,
                    type: 'WEBPACK_BUILD_ERROR',
                },
            }, { isLaunched: true, makeHtml }));
        },
        extend,
        htmlGenerator: ({ requestUrl, serverState, }) => __awaiter(this, void 0, void 0, function* () {
            const { assets, makeHtml = () => 'makeHtml not loaded', state, } = serverState;
            return makeHtml({
                assets,
                requestUrl,
                state,
            });
        }),
    });
};
exports.default = productionServer;
