import React from 'react';

const Loader = () => {
    return (
        <div className="flex items-center justify-center h-screen">
            <div className="flex flex-col items-center">
                <div className="lds-hourglass"></div>
            </div>
        </div>
    );
};

export default Loader;
