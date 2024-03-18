import React from 'react';
import './Button.scss';

interface ButtonProps {
  icon: React.ReactNode
  label: string
  color: 'primary' | 'secondary' | 'tertiary'
  onClick: () => void
}

const Button: React.FC<ButtonProps> = ({ icon, label, color, onClick }) => {
  return (
    <div className="gptcat--button-container">
      <button
        type="button"
        className={`gptcat--button ${color}`}
        onClick={onClick}
        name={label}
      >
        {icon}
      </button>
    </div>
  );
};

export default Button
