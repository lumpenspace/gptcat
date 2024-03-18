import React from 'react';
import Icon from './Icon';
import './Button.scss';

interface ButtonProps {
  iconName: string
  label: string
  color?: 'primary' | 'secondary' | 'tertiary'
  showText?: boolean
  onClick: () => void
}

const Button: React.FC<ButtonProps> = ({ iconName, label, showText, color, onClick }) => {
  return (
    <div className="gptcat--button-container mr-1.5 h-8 w-8">
      <button
        type="button"
        onClick={onClick}
        name={label}
        className={`
          inline-flex
          items-center
          justify-center
          transition-colors
          relative
          ring-offset-2
          ring-offset-bg-300
          ring-accent-main-100
          focus-visible:outline-none
          focus-visible:ring-1
          disabled:pointer-events-none
          disabled:opacity-50
          disabled:shadow-none
          disabled:drop-shadow-none bg-accent-main-100
                  text-oncolor-100
                  font-medium
                  font-styrene
                  hover:bg-accent-main-200 h-8 w-8 rounded-md active:scale-95 !rounded-xl
          `
        }
        title={label}
      >
        <Icon name={iconName} />
      </button>
    </div>
  );
};

export default Button
