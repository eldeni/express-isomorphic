import React from 'react';
import { useIsomorphicContext } from 'express-isomorphic-react';

/**
 * Feature still in construction
 */
const useFetch = (fetch, fetchParam, options) => {
  const store = useIsomorphicContext();
  const { key } = options;

  // if (store[key]) {
    
  // }

  const data = React.useRef(null);

  React.useEffect(() => {
    fetch(fetchParam);

    return () => {
      console.log('1111');
    };
  }, [key]);

  // const [result, setResult] = React.useState(undefined);
  // console.log(result);

  // React.useEffect(() => {
    // async function getData() {
    //   const data = await fetcher(fetcherParam);
    //   setResult(data);
    // }
    // getData();
  // }, []);

  return {
    result: 3,
  };
};

export default useFetch;