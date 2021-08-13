import React from 'react';
import { useKeenSlider } from 'keen-slider/react';
import { TOptions } from 'keen-slider';

import { ArrowButton } from './KeenSlider.styled';

import 'keen-slider/keen-slider.min.css';

interface KeenSliderProps extends TOptions {
  children: React.ReactNode;
  showArrows?: boolean;
  slideTimer: number;
}

const KeenSlider = ({ children, showArrows, slideTimer, ...props }: KeenSliderProps) => {
  const [pause, setPause] = React.useState(false);
  const [sliderRef, slider] = useKeenSlider({
    ...props,
    duration: 1000,
    dragStart: () => {
      setPause(true);
    },
    dragEnd: () => {
      setPause(false);
    },
  });

  React.useEffect(() => {
    sliderRef.current?.addEventListener('mouseover', () => {
      setPause(true);
    });
    sliderRef.current?.addEventListener('mouseout', () => {
      setPause(false);
    });
  }, [sliderRef]);

  React.useEffect(() => {
    const timer = setInterval(() => {
      if (!pause && slider) {
        slider.next();
      }
    }, slideTimer);
    return () => {
      clearInterval(timer);
    };
  }, [pause, slider]);

  return (
    <div className="d-md-flex align-items-center" style={{ gap: '1rem' }}>
      {showArrows && (
        <ArrowButton
          onClick={() => slider.prev()}
          leftArrow
          className="d-none d-md-flex"
        >
          <svg
            width="16"
            height="8"
            viewBox="0 0 16 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M3.99 3H16V5H3.99V8L0 4L3.99 0V3Z" fill="#FFFBF4" />
          </svg>
        </ArrowButton>
      )}
      <div
        ref={sliderRef as React.RefObject<HTMLDivElement>}
        className="keen-slider"
      >
        {children}
      </div>
      {showArrows && (
        <ArrowButton
          onClick={() => slider.next()}
          rightArrow
          className="d-none d-md-flex"
        >
          <svg
            width="16"
            height="8"
            viewBox="0 0 16 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12.01 3H0V5H12.01V8L16 4L12.01 0V3Z" fill="#FFFBF4" />
          </svg>
        </ArrowButton>
      )}
      {showArrows && (
        <div
          className="d-flex justify-content-center"
          style={{ gap: '.25rem' }}
        >
          <ArrowButton
            onClick={() => slider.prev()}
            leftArrow
            className="d-flex d-md-none"
          >
            <svg
              width="16"
              height="8"
              viewBox="0 0 16 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M3.99 3H16V5H3.99V8L0 4L3.99 0V3Z" fill="#FFFBF4" />
            </svg>
          </ArrowButton>
          <ArrowButton
            onClick={() => slider.next()}
            rightArrow
            className="d-flex d-md-none"
          >
            <svg
              width="16"
              height="8"
              viewBox="0 0 16 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12.01 3H0V5H12.01V8L16 4L12.01 0V3Z" fill="#FFFBF4" />
            </svg>
          </ArrowButton>
        </div>
      )}
    </div>
  );
};

interface KeenSlideProps {
  children: React.ReactNode;
}

export const KeenSlide = ({ children }: KeenSlideProps) => {
  return <div className="keen-slider__slide p-3 h-100">{children}</div>;
};

export default KeenSlider;
