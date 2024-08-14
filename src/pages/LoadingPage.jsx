import React from 'react';
import { ProgressSpinner } from 'primereact/progressspinner';

function Loading() {
    return (
        <div className="spinner">
            <ProgressSpinner style={{ width: "50px", height: "50px" }} strokeWidth="8" fill="var(--surface-ground)" animationDuration=".5s"/>
        </div>
    );
}

export default Loading;