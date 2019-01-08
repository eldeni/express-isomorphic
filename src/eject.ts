import * as fs from 'fs';

import createExpress, { 
  MakeHtml,
} from './createExpress';
import { log } from './utils/log';
import { 
  parseWebpackBuildInfo,
} from './utils/serverUtils';

const logTag = 'eject';

const eject: Eject = async function ({
  ejectPath,
  makeHtml,
  publicPath,
  universalAppPath,
  webpackBuildJsonPath,
}) {
  log('eject():\n%o', arguments[0]);

  try {
    const bundleBuildJson = fs.readFileSync(webpackBuildJsonPath, 'utf-8');
    const buildInfo = JSON.parse(bundleBuildJson);
    log(`${logTag} enhance(), build.json:\n%o`, buildInfo);

    const { error, assets } = parseWebpackBuildInfo(buildInfo);

    const html = await makeHtml({
      assets,
      requestUrl: '/',
      universalAppPath,
    });

    fs.writeFileSync(ejectPath, html);
    
  } catch (err) {
    log(`${logTag} error while eject()`);
  }
};

export default eject;

interface Eject {
  (args: {
    ejectPath: string;
    makeHtml: MakeHtml;
    publicPath: string;
    universalAppPath: string;
    webpackBuildJsonPath: string;
  }): void;
}
