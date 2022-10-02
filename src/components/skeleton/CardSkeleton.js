import React from 'react';
import PropTypes from 'prop-types';

export default function CardSkeleton({ count = 4 }) {
    const arrayCount = [...Array(count).keys()];
    return (
        <>
            {arrayCount.map((item) => (
                <div key={item} className="list-item">
                    <div className="skeleton skeleton-title"></div>
                    <div className="skeleton skeleton-subtitle"></div>
                    <div>
                        <div className="skeleton skeleton-content"></div>
                        <div className="skeleton skeleton-content"></div>
                        <div className="skeleton skeleton-content"></div>
                    </div>
                    <div className="list-item-button">
                        <div className="skeleton skeleton-button"></div>
                        <div className="skeleton skeleton-button"></div>
                    </div>
                </div>
            ))}
        </>
    );
}

CardSkeleton.propTypes = {
    count: PropTypes.number,
};
