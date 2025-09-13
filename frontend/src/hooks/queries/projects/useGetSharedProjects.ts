import API from "@/config/apiClient";
import { useAuth } from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";

const useGetSharedProjects = () => {
  const { accessToken } = useAuth();
  const query = useQuery({
    queryKey: ["projects", "shared"],
    queryFn: async () => {
      const response = await API.get("/projects/shared", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response.data;
    },
  });

  return query;
};

export default useGetSharedProjects;
