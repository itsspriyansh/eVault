import fetcher from "@/lib/fetcher";
import useSwr from "swr";

const useCurrentUser = () => {
  const { data, error, isLoading, mutate } = useSwr("/api/current", fetcher);

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default useCurrentUser;
