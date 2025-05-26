import { useQueryClient } from "@tanstack/react-query";
export function usePrefetch() {
  const queryClient = useQueryClient();

  return (key, identifier, queryFunc) => {
    const queryKey = Array.isArray(key)
      ? [...key, identifier]
      : [key, identifier];

    if (!queryClient.getQueryData(queryKey)) {
      queryClient.prefetchQuery({
        queryKey,
        queryFn: () => (identifier ? queryFunc(identifier) : queryFunc()),
      });
    }
  };
}
