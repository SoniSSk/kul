import { FC } from 'react';
import { SlideDrawerWrapper } from './SlideDrawer.styled';

interface SlideDrawerProps {
    isOpen: boolean;
    nodeRef: any;
};

const SlideDrawer: FC<SlideDrawerProps> = ({ nodeRef, isOpen, children }) => {
    return (
        <SlideDrawerWrapper ref={nodeRef} isOpen={isOpen}>
            { children }
        </SlideDrawerWrapper>
    );
};

export default SlideDrawer;