import { getServerSession } from "next-auth";
import SessionProvider from "@/providers/SessionProvider";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";

const AppLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerSession(authOptions);
  return (
    <SessionProvider session={session}>
      {children}
    </SessionProvider>
  )
};

export default AppLayout;
