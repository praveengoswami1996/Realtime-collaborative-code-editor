import API from "@/config/apiClient";
import { useAuth } from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";

const useGetProjectDetailsById = (projectId: string) => {
  const { accessToken } = useAuth();
  const query = useQuery({
    queryKey: ["projects", projectId],
    queryFn: async () => {
      const response = await API.get(`/projects/${projectId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response.data;
    },
  });
  return query;
};

export default useGetProjectDetailsById;
