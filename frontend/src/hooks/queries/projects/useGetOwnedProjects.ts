import API from "@/config/apiClient";
import { useAuth } from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";

const useGetOwnedProjects = () => {
  const { accessToken } = useAuth();
  const query = useQuery({
    queryKey: ["projects", "owned"],
    queryFn: async () => {
      const response = await API.get("/projects/owned", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response.data;
    }
  });

  return query;
}

export default useGetOwnedProjects;
