import chalk from 'chalk';
import express, {
  RequestHandler,
} from 'express';
import { logger } from '@nodekit/logger';

import { ServerState, State } from './ServerState';

const log = logger('[express-isomorphic]');

const createExpress: CreateExpress = function createExpress({
  bootstrap,
  extend,
  htmlGenerator,
}) {
  log('createExpress(): NODE_ENV: %s', process.env.NODE_ENV);

  const serverState = new ServerState();
  const app = express();

  if (extend) {
    log('createExpress(): extend is defined thus registered');
    extend(app, serverState);
  }
  bootstrap(app, serverState);

  app.get('*', [
    serveHtml(serverState, htmlGenerator),
  ]);

  return {
    app,
    serverState,
  };
};

function serveHtml(serverState: ServerState, htmlGenerator: HtmlGenerator): RequestHandler {
  return async (req, res) => {
    res.writeHead(200, {
      'Content-Type': 'text/html',
    });

    try {
      const html = await htmlGenerator({
        requestUrl: req.url,
        serverState,
      });

      res.end(html.toString());
    } catch (err) {
      log(`serveHtml(): ${chalk.red('failed')} to create html: %o`, err);
      res.end('Failed to create html');
    }
  };
}

export default createExpress;

export interface ServerCreation {
  app: express.Application;
  serverState: ServerState;
}

export interface MakeHtml {
  (arg: {
    assets: string[] | undefined;
    requestUrl: string;
    state: State;
  }): Promise<string> | string;
}

export interface WebpackStats {
  chunks: boolean;
  entrypoints: boolean;
  [key: string]: boolean;
}

export interface Extend {
  (app: express.Application, serverState: ServerState): void;
}

export interface WebpackConfig {
  output: {
    [key: string]: any;
  };
  [key: string]: any;
}

interface CreateExpress {
  (arg: {
    bootstrap: (
      app: express.Application,
      serverState: ServerState,
    ) => void;
    extend?: Extend;
    htmlGenerator: HtmlGenerator;
  }): ServerCreation;
}

interface HtmlGenerator {
  (arg: {
    requestUrl: string;
    serverState: ServerState;
  }): Promise<string>;
}
