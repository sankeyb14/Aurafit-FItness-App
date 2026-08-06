import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

export function MacroChart({ protein = 0, carbs = 0, fat = 0, totalCalories = 0 }) {
  const data = [
    { name: 'Protein', value: protein, color: '#6366F1' },
    { name: 'Carbs', value: carbs, color: '#FF8C42' },
    { name: 'Fats', value: fat, color: '#10B981' }
  ];

  const hasData = protein > 0 || carbs > 0 || fat > 0;

  const displayData = hasData
    ? data
    : [
        { name: 'Protein', value: 30, color: '#E2E8F0' },
        { name: 'Carbs', value: 40, color: '#CBD5E1' },
        { name: 'Fats', value: 30, color: '#94A3B8' }
      ];

  return (
    <div className="flex flex-col items-center">
      <div className="w-full h-44 relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={displayData}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={70}
              paddingAngle={4}
              dataKey="value"
              stroke="none"
            >
              {displayData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value, name) => [`${value}g`, name]}
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-xl font-bold text-textDark">{totalCalories}</span>
          <span className="text-xs text-gray-400 font-medium">kcal</span>
        </div>
      </div>

      <div className="flex justify-around w-full mt-2 text-xs font-semibold text-gray-600">
        <div className="flex items-center space-x-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-primary inline-block"></span>
          <span>Prot: {protein}g</span>
        </div>
        <div className="flex items-center space-x-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-secondary inline-block"></span>
          <span>Carb: {carbs}g</span>
        </div>
        <div className="flex items-center space-x-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-success inline-block"></span>
          <span>Fat: {fat}g</span>
        </div>
      </div>
    </div>
  );
}

export default MacroChart;
