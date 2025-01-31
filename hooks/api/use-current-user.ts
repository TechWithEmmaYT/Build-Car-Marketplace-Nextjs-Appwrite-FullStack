import { getCurrentUserMutationFn } from "@/lib/fetcher";
import { useQuery } from "@tanstack/react-query";

const useCurrentUser = () => {
  return useQuery({
    queryKey: ["currentUser"],
    queryFn: getCurrentUserMutationFn,
    staleTime: 1000 * 60 * 60 * 24,
  });
};
export default useCurrentUser;
