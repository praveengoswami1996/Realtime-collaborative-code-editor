import API from "@/config/apiClient"
import { useMutation } from "@tanstack/react-query"
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface RegisterFormData {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

const useRegister = () => {
    const router = useRouter();
    const mutation = useMutation({
        mutationFn: async (data: RegisterFormData) => {
            const response = await API.post("/auth/register", data);
            return response.data;
        },
        onSuccess: (data) => {
            toast.success(data.message);
            router.replace("/api/auth/signin");
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })

    return mutation;
}

export default useRegister;