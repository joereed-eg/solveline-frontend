import React from 'react';
import { DotLoader } from 'react-spinners';

const LoadingAnimated = () => {
    return (
        <section className='loader_background' >
            <div  className='loader_center'>
              <DotLoader color="#FF5402" />
            </div>
        </section>
    );
};

export default LoadingAnimated;
 