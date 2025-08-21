"use client";
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import React from 'react'

const Project = () => {
  const { logout } = useAuth();

  return (
    <>
      <div>Project</div>
      <Button onClick={() => logout()}>Logout</Button>
    </>
  );
}

export default Project