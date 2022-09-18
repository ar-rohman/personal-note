import React from 'react';
import PropTypes from 'prop-types';

export default function TertiaryButton(props) {
    const { type, className, onClick, children } = props;
    return (
        <button
            type={type}
            className={`button button-tertiary ${className ?? ''}`}
            onClick={onClick}>
            {children}
        </button>
    );
}

TertiaryButton.propTypes = {
    type: PropTypes.string,
    className: PropTypes.string,
    onClick: PropTypes.func,
    children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)])
        .isRequired,
};
