import React from 'react';
import { RotatingTriangles } from 'react-loader-spinner';

function Loading() {
    return (
        <div className="custom-rotating-triangle">
            <RotatingTriangles
                visible={true}
                height="80"
                width="80"
                colors={['#FF5733', '#C70039', '#900C3F']}
            />
        </div>
    );
}

export default Loading;