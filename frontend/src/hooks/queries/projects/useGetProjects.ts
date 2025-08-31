import API from "@/config/apiClient";
import { useAuth } from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";

const useGetProjects = () => {
  const { accessToken } = useAuth();
  const query = useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      const response = await API.get("/projects", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response.data;
    }
  });

  return query;
}

export default useGetProjects;
