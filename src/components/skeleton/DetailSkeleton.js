import React from 'react';

export default function DetailSkeleton() {
    return (
        <div className="skeleton-detail">
            <div className="skeleton skeleton-back"></div>
            <div className="skeleton skeleton-title"></div>
            <div className="skeleton skeleton-subtitle"></div>
            <div>
                <div className="skeleton skeleton-content"></div>
                <div className="skeleton skeleton-content"></div>
                <div className="skeleton skeleton-content"></div>
            </div>
            <div>
                <div className="detail-button">
                    <div className="skeleton skeleton-button skeleton-detail-button"></div>
                    <div className="skeleton skeleton-button skeleton-detail-button"></div>
                </div>
            </div>
        </div>
    );
}
