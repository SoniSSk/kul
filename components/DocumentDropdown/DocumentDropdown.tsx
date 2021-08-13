import React, {FC, useEffect, useRef, useState} from "react";
import Text from "../../styled/Text";
import CheckBox from "../CheckBox";
import {removeDocuments} from "../../redux/currentOrder/currentOrder.actions";

interface DropdownItem{
    name: string;
    url: string;
    status: string;
    id: string;

}


interface DocumentDropdownProps{
    dropdownItems: Array<DropdownItem>;
    fontSize: string;
    text: string;
    orderId: string;
}

const DocumentDropdown: FC<DocumentDropdownProps> = ({dropdownItems, fontSize, text, orderId}) => {

    const [checkedFiles, setCheckedFiles] = useState(Array<number>());
    const [show, setShow] = useState<boolean>(false);
    const downloadFile = (link: any) => {
        var element = document.createElement('a');
        element.setAttribute('download', '');
        element.setAttribute('target', '_blank');
        element.setAttribute('href', link);

        element.style.display = 'none';
        document.body.appendChild(element);

        element.click();

        document.body.removeChild(element);
    }

    const onCheckChange = (id: number, check: boolean) => {
        if(check){
            setCheckedFiles([...checkedFiles, id]);
        }else{
            setCheckedFiles(checkedFiles.filter(fileId => (fileId !== id)));
        }
    }

    const outsideClickListener = (ref: any) => {
        useEffect(() => {
            function handleOutsideClick(event: MouseEvent) {
                if (ref.current && !ref.current.contains(event.target)) {
                    setShow(false);
                }
            }

            document.addEventListener('mousedown', handleOutsideClick);

            return () => {
                document.removeEventListener('mousedown', handleOutsideClick);
            };
        }, [ref]);
    };

    const wrapperRef = useRef(null);
    outsideClickListener(wrapperRef);

    const downloadSelectedFiles = () => {
        console.log("Here", checkedFiles);
        checkedFiles.forEach((fileId: number) => {
            downloadFile(dropdownItems[fileId].url);
        })
    }

    const removeSelectedFiles = () => {
        const deleteData = checkedFiles.map((fileId: number) => {
            return {
                id: dropdownItems[fileId].id,
                orderId: orderId
            };
        });

        removeDocuments(deleteData).then(() => setShow(false));
    }

    return(
        <>
            <Text
                fontSize={fontSize === "md" ? "md" : "xs"}
                color="primary"
                style={{
                    cursor: "pointer"
                }}
                onClick={() => {
                setShow(!show);
            }}>
                {text}
            </Text>
            <div className="dottedbox"
                 style={{
                     textAlign: 'left',
                     position: "absolute",
                     zIndex: 100,
                     backgroundColor: "white",
                     width: "250px",
                     display: show ? "block" : "none"
                 }} ref={wrapperRef}>

                <div className="d-flex justify-content-between">
                    <Text color="primary" onClick={downloadSelectedFiles} style={{
                        cursor: "pointer"
                    }}>
                        <img
                            src="/icons/download_icon.svg"
                            alt="download-icon"/>
                        Download
                    </Text>

                    <Text color="primary" onClick={removeSelectedFiles} style={{
                        cursor: "pointer"
                    }}>
                        <img
                            src="/icons/delete_24px.svg"
                            alt="delete-icon"/>
                        Delete
                    </Text>
                </div>


                { dropdownItems?.map((docs: DropdownItem, i: number) => (
                    <>
                        <CheckBox key={docs.id} docId={i} name="Name Approvassssl Certificate" checkChanged={onCheckChange}>
                            <Text inline>
                                {docs.name}{"-"} <Text inline color="red">{`(${docs.status})`}</Text>
                            </Text>
                        </CheckBox>
                        <br />
                    </>
                ))}


            </div>
        </>

    );
}

export default DocumentDropdown;