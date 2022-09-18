import React from 'react';
import PropTypes from 'prop-types';

export default function SecondaryButton(props) {
    const { type, className, onClick, children } = props;
    return (
        <button
            type={type}
            className={`button button-secondary ${className ?? ''}`}
            onClick={onClick}>
            {children}
        </button>
    );
}

SecondaryButton.propTypes = {
    type: PropTypes.string,
    className: PropTypes.string,
    onClick: PropTypes.func,
    children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)])
        .isRequired,
};
