import React from 'react';

export function Card({ children, className = '', hover = false, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-2xl p-5 shadow-card border border-gray-100/80 transition-all duration-200 ${
        hover ? 'hover:shadow-card-hover hover:-translate-y-0.5 cursor-pointer' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
}

export default Card;
