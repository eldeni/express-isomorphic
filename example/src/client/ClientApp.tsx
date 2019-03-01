import { hot } from 'react-hot-loader';
import * as React from 'react';

import Universal from '../universal/Universal';
import UniversalContext from '../universal/contexts/UniversalContext';

const ClientApp = ({
  predefinedState,
}) => {
  const { UniversalContext } = Universal.contexts;
  return (
    <UniversalContext.Provider value={predefinedState}>
      <Universal />
    </UniversalContext.Provider>
  );
};

export default hot(module)(ClientApp);
