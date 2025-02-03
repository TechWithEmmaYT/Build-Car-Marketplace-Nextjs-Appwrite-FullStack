import { getCurrentUserMutationFn } from "@/lib/fetcher";
import { useQuery } from "@tanstack/react-query";

const useCurrentUser = () => {
  return useQuery({
    queryKey: ["currentUser"],
    queryFn: getCurrentUserMutationFn,
    staleTime: 0,
  });
};
export default useCurrentUser;
