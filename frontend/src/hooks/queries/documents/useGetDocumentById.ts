import API from "@/config/apiClient";
import { useAuth } from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";

const useGetDocumentById = (documentId: string) => {
  const { accessToken } = useAuth();
  const query = useQuery({
    queryKey: ["documents", documentId],
    queryFn: async () => {
      const response = await API.get(`/documents/${documentId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response.data;
    },
  });
  return query;
};

export default useGetDocumentById;
