import React from 'react';
import * as Icons from 'lucide-react';

interface IconProps {
  name: string;
  className?: string;
  size?: number;
}

export const LucideIcon = ({ name, className, size = 20 }: IconProps) => {
  const IconComponent = (Icons as unknown as Record<string, React.ComponentType<{ className?: string; size?: number }>>)[name] || Icons.HelpCircle;
  return <IconComponent className={className} size={size} />;
};

export default LucideIcon;
