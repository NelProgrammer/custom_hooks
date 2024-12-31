import { useEffect, useState } from 'react';

const useFetch = (fetchFn, initialValue) => {
  // fetchFn could be any function. in this case it was fetching places data from https.js
  const [isFetching, setIsFetching] = useState();
  const [error, setError] = useState();
  const [fetchedData, setFetchedData] = useState(initialValue); // We don't know the innitial value upfront. It could be empty array or anything.

  useEffect(() => {
    async function fetchData() {
      setIsFetching(true);
      try {
        const data = await fetchFn();
        setFetchedData(data);
      } catch (error) {
        setError({ message: error.message || 'Failed to fetch Data.' });
      }

      setIsFetching(false);
    }

    fetchData();
  }, [fetchFn]);

  return { isFetching, error, fetchedData, setFetchedData };
};

export default useFetch;
