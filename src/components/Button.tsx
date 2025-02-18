import React from 'react';

interface ButtonProps {
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
    label: string;
    disabled?: boolean;
}

const styles = {
    button: {
        fontFamily: 'Poppins, sans-serif',
        minWidth: '120px',
        padding: '.5rem',
        margin: '0 10px 0 10px',
        border: '1px solid #222',
        borderRadius: '5px',
        fontWeight: 'bold',
        cursor: 'pointer',
        transition: 'all .25s linear',
        backgroundColor: '#0070f3',
        color: '#FFF',
    },
    buttonHover: {
        backgroundColor: '#005bb5',
    }
};

const Button: React.FC<ButtonProps> = ({ onClick, label, disabled = false }) => {


    return (
        <button
            onClick={onClick}
            disabled={disabled}
            style={styles.button}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = styles.button.backgroundColor}
        >
            {label}
        </button>
    );
};

export default Button;