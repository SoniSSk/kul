import { FC, useCallback } from "react";
import { useDropzone } from "react-dropzone";

import Text from "../../styled/Text";
import Spacer from "../../styled/Spacer";
import Button from "../../styled/Button";
import { DropzoneBox, FileName } from "./UploadDocs.styled";

interface UploadDocs {
  files: Array<any>;
  setFiles: Function;
}

const UploadDocs: FC<UploadDocs> = ({ setFiles, files }) => {
  const addFiles = (newFiles: Array<any>) => {
    setFiles([...files, ...newFiles.map((file) => ({ inputName: "", file }))]);
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const onDrop = useCallback(
    (acceptedFiles) => {
      addFiles(acceptedFiles);
    },
    [files]
  );

  const onInputChange = (index: number, e: any) => {
    setFiles(
      files.map((item, i) =>
        i === index ? { ...item, inputName: e.target.value } : item
      )
    );
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });
  return (
    <>
      {files.length == 0 ? (
        <>
          <Spacer direction="vertical" size={12} />
          <div {...getRootProps()} className="w100">
            <input {...getInputProps()} />
            <DropzoneBox>
              <Text fontSize="md" center>
                Drop the files here
              </Text>
            </DropzoneBox>
          </div>
        </>
      ) : (
        <>
          {files.map((item, i) => (
            <div key={i} className="row m-0 align-items-left">
              <div className="col-10 p-0">
                <FileName>
                  <img
                    src="/icons/attachment_24px.svg"
                    alt="attachment"
                    width="20"
                  />
                  {item?.file.name}
                </FileName>
              </div>
              <div className="col-2 p-0">
                <Button
                  size="xs"
                  className="p-1"
                  onClick={() => removeFile(i)}
                  backgroundColor="lightSkyBlue"
                >
                  <img src="/icons/delete_24px.svg" alt="Delete" width="22" />
                </Button>
              </div>
            </div>
          ))}
        </>
      )}
    </>
  );
};

export default UploadDocs;
