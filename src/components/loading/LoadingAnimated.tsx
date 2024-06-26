import React from 'react';
import { DotLoader } from 'react-spinners';

const LoadingAnimated = () => {
    return (
        <section className='loader_background' >
            <div  className='loader_center'>
              <DotLoader color="#CB333B" />
            </div>
        </section>
    );
};

export default LoadingAnimated;
 