"use client";
import React from 'react'
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';

const Dasboard = () => {
  const { logout } = useAuth();

  return (
    <div>
      Dasboard
      <Button onClick={() => logout()}>Logout</Button>
    </div>
  )
}

export default Dasboard