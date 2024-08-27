import { useCallback, useState } from "react";

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const request = useCallback(async (requestConfig) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        requestConfig.url,
        {
          method: requestConfig.method ? requestConfig.method : 'GET',
          headers: requestConfig.headers ? requestConfig.headers : {},
          body: requestConfig.body ? requestConfig.body : null,
        }
      );

      if (!response?.ok) throw new Error ('Algo salió mal!');

      setIsLoading(false)

      return await response.json()
    } catch(error) {
      setError(error.message)
    }
    setIsLoading(false);
  }, []);

  return {isLoading, error, request};
}

export default useHttp;