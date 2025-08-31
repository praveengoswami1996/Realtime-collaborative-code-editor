"use client";
import { Filter, LogOut, Search, Settings, Target, User } from 'lucide-react'
import React from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { useAuth } from '@/hooks/useAuth'

const Header = () => {
  const { user, isLoading } = useAuth();

  if(isLoading) {
    return (
        <div>Please wait....</div>
    )
  }

  return (
    <header className="sticky top-0 z-50 glass border-b bg-emerald-900">
      <div className="flex h-16 items-center justify-between px-6 max-w-7xl mx-auto">
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

        <div className="flex items-center space-x-4">

          <div className="hidden lg:flex flex-col items-end">
            <span className="text-sm font-medium text-primary-foreground">
              {user.name}
            </span>
            <span className="text-xs text-primary-foreground/80">
              {user.email}
            </span>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="relative h-10 w-10 rounded-full ring-2 ring-transparent hover:ring-white/30 transition-all duration-300 hover:bg-white/20"
              >
                
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-64 p-2 glass border-border/50"
              align="end"
            >
              <div className="flex items-center gap-3 p-3 border-b border-border/50 mb-2">
                <Avatar className="h-10 w-10">
                  <AvatarImage
                    src={user.avatar || "/placeholder.svg"}
                    alt={user.name}
                  />
                  <AvatarFallback className="bg-gradient-to-br from-secondary to-accent text-white">
                    <User className="h-5 w-5" />
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="font-medium text-sm">{user.name}</span>
                  <span className="text-xs text-primary-foreground/80">
                    {user.email}
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
        </div>
      </div>
    </header>
  );
}

export default Header

