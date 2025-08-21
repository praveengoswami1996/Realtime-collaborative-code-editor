import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";

const ProtectedRoutes = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerSession(authOptions);

  if(!session || !session.user) {
    redirect("/api/auth/signin")
  }

  return <>{children}</>;
};

export default ProtectedRoutes;
