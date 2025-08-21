import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

export const useAuth = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const login = useCallback(async (credentials: { email: string; password: string }) => {
    const result = await signIn("credentials", {
      ...credentials,
      redirect: false,
    });

    if (result?.error) {
      throw new Error(result.error);
    }

    return result;
  }, []);

  const logout = useCallback(async () => {
    try {
      // Call backend logout to clear cookies
      await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:4004'}/api/auth/logout`, {
        method: 'POST',
        headers: {
          "Authorization": `Bearer ${session?.accessToken}`
        }
      });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Always clear NextAuth session
      await signOut({ redirect: false });
      router.push("/login");
    }
  }, [router, session]);

  const isAuthenticated = status === "authenticated";
  const isLoading = status === "loading";
  const user = session?.user;
  const accessToken = session?.accessToken;

  return {
    user,
    accessToken,
    isAuthenticated,
    isLoading,
    login,
    logout,
    session
  };
};
