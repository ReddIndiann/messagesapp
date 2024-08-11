// src/app/Components/Widgets/WidgetCard.tsx
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface WidgetCardProps {
  value: number;
  label: string;
  icon: any;
  color: string;
}

const WidgetCard: React.FC<WidgetCardProps> = ({ value, label, icon, color }) => {
  return (
    <div className="flex items-center bg-white shadow-lg rounded-lg p-6">
      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${color} text-white`}>
        <FontAwesomeIcon icon={icon} size="lg" />
      </div>
      <div className="ml-4">
        <div className="text-3xl font-semibold text-gray-700">{value}</div>
        <div className="text-sm text-gray-500">{label}</div>
      </div>
    </div>
  );
};

export default WidgetCard;
