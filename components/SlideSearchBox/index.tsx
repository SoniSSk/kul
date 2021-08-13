import { ChangeEventHandler, FC, RefObject, useCallback, useEffect, useRef, useState } from "react";

import { IconButton, Input, SlideSearchBoxWrapper } from "./SlideSearchBox.styled";

interface SlideSearchBoxProps {
    value?: string | ReadonlyArray<string> | number;
    onChange?: ChangeEventHandler<HTMLInputElement>;
}

const SlideSearchBox: FC<SlideSearchBoxProps> = ({ value, onChange }) => {
    const [className, setClassName] = useState("");
    const nodeRef = useRef<any>();

    const onClick = useCallback(() => {
        setClassName("show");
    }, []);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (nodeRef.current && nodeRef.current.contains(e.target)) {
                // inside click
                return;
            }

            // outside click
            setClassName("");
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <SlideSearchBoxWrapper ref={nodeRef}>
            <Input type="text" className={className} value={value} onChange={onChange}/>
            <IconButton onClick={onClick}>
                <img src="/icons/search_24px.svg" alt="Search" width="20" />
            </IconButton>
        </SlideSearchBoxWrapper>
    );
};

export default SlideSearchBox;