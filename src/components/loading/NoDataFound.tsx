import { useRef, useEffect } from 'react';
import Lottie, { AnimationItem } from 'lottie-web';
import animationData from '../../../public/exponent-loader.json';

type Props = {
    loading: boolean;
};

const NoDataGIF = (props: Props) => {
    const container = useRef<HTMLDivElement>(null);
    const animation = useRef<AnimationItem | null>(null);

    useEffect(() => {
        if (container.current) {
            animation.current = Lottie.loadAnimation({
                container: container.current,
                renderer: 'svg',
                loop: true,
                autoplay: true,
                animationData: animationData,
            });
        }

        return () => {
            if (animation.current) {
                animation.current.destroy();
            }
        };
    }, [props.loading]);

    useEffect(() => {
        if (animation.current && props.loading) {
            animation.current.play();
        }
    }, [props.loading]);

    return (
        <>
            {props.loading && (
                    <div className='flex items-center justify-center w-full mx-auto' style={{height:"75vh"}}>
                        <div
                            className='mx-auto'
                            ref={container}
                        />
                    </div>
            )}
        </>
    );
};

export default NoDataGIF;
