"use client";
import { LogOut, Settings, Target, User } from 'lucide-react'
import React from 'react'
import { Button } from '../ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { Avatar, AvatarFallback } from '../ui/avatar'
import { useAuth } from '@/hooks/useAuth'

const Header = () => {
  const { user, isLoading, logout } = useAuth();

  if(isLoading) {
    return (
        <div>Please wait....</div>
    )
  }

  return (
    <header className="sticky top-0 z-50 glass border-b bg-rose-700">
      <div className="flex h-18 items-center justify-between px-6 max-w-7xl mx-auto">
        <div className="flex items-center space-x-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-secondary to-accent flex items-center justify-center shadow-lg shadow-secondary/25">
              <Target className="h-5 w-5 " />
            </div>
            <div>
              <h1 className="text-xl font-bold text-primary-foreground">
                RCCE
              </h1>
              <p className="text-xs text-primary-foreground/80">
                Realtime Collaborative Code Editor
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-3">
            <Avatar className="h-10 w-10">
              <AvatarFallback className="bg-gradient-to-br from-secondary to-accent text-white">
                <User className="h-5 w-5" />
              </AvatarFallback>
            </Avatar>
            <div className="hidden md:block">
              <p className="text-sm font-medium text-white">{user?.name}</p>
              <p className="text-xs text-white">{user?.email}</p>
            </div>
          </div>

          <div className="h-6 w-px bg-gray-300" />

          <div className="flex items-center space-x-2">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Button
                  variant="ghost"
                  size="icon"
                  asChild
                >
                  <Settings className="w-6 h-6 text-white" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-64 p-2 glass border-border/50"
                align="end"
              >
                <div className="flex items-center gap-3 p-3 border-b border-border/50 mb-2">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-gradient-to-br from-secondary to-accent text-white">
                      <User className="h-5 w-5" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="font-medium text-sm">{user?.name}</span>
                    <span className="text-xs">
                      {user?.email}
                    </span>
                  </div>
                </div>
                <DropdownMenuItem className="rounded-lg">
                  <User className="mr-3 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="rounded-lg">
                  <Settings className="mr-3 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => logout()}
                  className="rounded-lg text-destructive focus:text-destructive"
                >
                  <LogOut className="mr-3 h-4 w-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button onClick={() => logout()} variant={"destructive"} className='text-white'>
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline text-sm font-medium">
                Logout
              </span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header

