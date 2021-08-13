import React from 'react';
import { useKeenSlider } from 'keen-slider/react';
import {
  Arrow,
  KeenChild,
  NavigationWrapper,
  Dots,
  Dot,
  KeenChild2,
  KeenChild3,
  KeenChild4,
} from './KeenDotSlider.styled';

const KeenSlider = (props: any) => {
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [pause, setPause] = React.useState(false);
  const [sliderRef, slider] = useKeenSlider<HTMLDivElement>({
    initial: 0,
    slideChanged(s) {
      setCurrentSlide(s.details().relativeSlide);
    },
    duration: 1000,
    dragStart: () => {
      setPause(true);
    },
    dragEnd: () => {
      setPause(false);
    },
    loop: true,
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
    }, 2000);
    return () => {
      clearInterval(timer);
    };
  }, [pause, slider]);

  return (
    <>
      <NavigationWrapper className="navigation-wrapper">
        <div ref={sliderRef} className="keen-slider d-flex">
          {[...new Array(1)].map((_, i) => (
            <>
              <KeenChild className="keen-slider__slide"></KeenChild>
              <KeenChild2 className="keen-slider__slide"></KeenChild2>
              <KeenChild3 className="keen-slider__slide"></KeenChild3>
              <KeenChild4 className="keen-slider__slide"></KeenChild4>
            </>
          ))}
        </div>
        {slider && (
          <>
            <ArrowLeft
              onClick={(e: any) => e.stopPropagation() || slider.prev()}
              disabled={currentSlide === 0}
            />
            <ArrowRight
              onClick={(e: any) => e.stopPropagation() || slider.next()}
              disabled={currentSlide === slider.details().size - 1}
            />
          </>
        )}
      </NavigationWrapper>

      {slider && (
        <Dots>
          {Array.from(Array(slider.details().size).keys()).map((idx) => {
            return (
              <Dot
                key={idx}
                onClick={() => {
                  slider.moveToSlideRelative(idx);
                }}
                className={'dot' + (currentSlide === idx ? ' active' : '')}
              />
            );
          })}
        </Dots>
      )}
    </>
  );
};

function ArrowLeft(props: any) {
  return (
    <Arrow leftArrow onClick={props.onClick}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#757575"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M15 18l-6-6 6-6" />
      </svg>
    </Arrow>
  );
}

function ArrowRight(props: any) {
  return (
    <Arrow onClick={props.onClick} rightArrow>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#757575"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M9 18l6-6-6-6" />
      </svg>
    </Arrow>
  );
}

export default KeenSlider;
