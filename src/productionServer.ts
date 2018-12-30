import * as fs from 'fs';

import createExpress, { 
  Extend,
  MakeHtml,
  Server,
} from './createExpress';
import { 
  parseWebpackBuildInfo,
} from './utils/serverUtils';
import { log } from './utils/log';

const tag = 'productionServer';

const productionServer: ProductionServer = function ({
  bundlePath,
  extend,
  makeHtml,
  publicPath,
  universalAppPath,
}) {
  return createExpress({
    _extend: (app, state) => {
      const bundleBuildJson = fs.readFileSync(`${bundlePath}/build.json`, 'utf-8');
      const buildInfo = JSON.parse(bundleBuildJson);
      log(`${tag} enhance(), build.json:\n%o`, buildInfo);
  
      const { error, assets } = parseWebpackBuildInfo(buildInfo);
          
      state.update({
        assets,
        ...error && { error },
        isLaunched: true,
        universalAppPath,
      });

      extend && extend(app, state);
    },
    makeHtml,
    publicPath,
  });
};

interface ProductionServer {
  (arg: {
    bundlePath: string;
    extend?: Extend;
    makeHtml: MakeHtml;
    publicPath: string;
    universalAppPath: string;
  }): Server;
} 

export default productionServer;
