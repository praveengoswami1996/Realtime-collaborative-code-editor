"use client";
import { cn } from '@/lib/utils';
import React from 'react';

interface InfoItemProps {
    icon: React.ElementType;
    iconBgColor: string;
    iconColor: string;
    text: string;
    subText: string | number;
}

const InfoItem: React.FC<InfoItemProps> = ({ icon: Icon, iconBgColor, iconColor, text, subText }) => {
  return (
    <div className="flex items-center space-x-3">
      <div
        className={cn(
          "w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center",
          iconBgColor
        )}
      >
        <Icon className={cn("w-5 h-5 text-indigo-600", iconColor)} />
      </div>
      <div>
        <h2 className="text-lg font-semibold text-gray-900">{text}</h2>
        <p className="text-sm text-gray-600">{subText}</p>
      </div>
    </div>
  );
}

export default InfoItem