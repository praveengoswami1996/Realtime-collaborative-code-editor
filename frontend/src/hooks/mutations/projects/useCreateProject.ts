import API from "@/config/apiClient";
import { useAuth } from "@/hooks/useAuth";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

interface CreateProjectFormData {
  name: string;
}

const useCreateProject = () => {
  const { accessToken } = useAuth();
  const mutation = useMutation({
    mutationFn: async (data: CreateProjectFormData) => {
      const response = await API.post("/projects", data, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response.data;
    },
    onSuccess: (data) => {
      toast.success(data.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return mutation;
};

export default useCreateProject;
