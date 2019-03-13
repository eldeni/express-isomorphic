import express from "express";
import { State } from './state';
declare const createExpress: CreateExpress;
export default createExpress;
export interface ServerCreation {
    app: express.Application;
    state: State;
}
export interface MakeHtml {
    (arg: {
        assets: string[] | undefined;
        requestUrl: string;
        resLocals: ResLocals;
        universalAppPath: string | undefined;
    }): Promise<string>;
}
export interface WebpackStats {
    chunks: boolean;
    entrypoints: boolean;
    [x: string]: boolean;
}
export interface Extend {
    (app: any, state: any): any;
}
interface CreateExpress {
    (arg: {
        _extend: (app: express.Application, state: State) => void;
        makeHtml: MakeHtml;
        publicPath: string;
    }): ServerCreation;
}
interface ResLocals {
    [key: string]: any;
}
