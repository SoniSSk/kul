import { FC, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

import Text from '../../styled/Text';
import Spacer from '../../styled/Spacer';
import Button from '../../styled/Button';
import { DropzoneBox, FileName } from './UploadBox.styled';
import { getSignedUrl } from '../../utils/fileUploadUtilities';
import { errorToast } from '../../utils/toasts';

interface UploadBoxProps {
  files: Array<any>;
  setFiles: Function;
  setUrl: Function;
  url: Array<any>;
  notShowHeader?: boolean;
}

const UploadBox: FC<UploadBoxProps> = ({
  setFiles,
  files,
  setUrl,
  url,
  notShowHeader,
}) => {
  const addFiles = async (newFiles: Array<any>) => {
    try {
      const filesLessThan10MB = newFiles.filter((file: File) => (Math.round(file.size/1024/1024) < 5));
      if(filesLessThan10MB.length < newFiles.length){
        errorToast("You can upload a document upto a maximum size of 5MB. Please reduce document size and Upload.");
        return;

      }
      const promises = newFiles.map((file) => {
        return getSignedUrl(file.path);
      });
      const results = await Promise.all(promises);
      newFiles = newFiles.filter(
        (_, index) => results[index] !== undefined && results[index] !== null
      );
      const urls = results.filter(
        (result) => result !== undefined && result !== null
      );
      setUrl([...url, ...urls]);
      setFiles([
        ...files,
        ...newFiles.map((file) => ({ inputName: file.name, file })),
      ]);
    } catch (e) {
      errorToast(e.message);
    }
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
      <Text fontSize="xxl" fontFamily="montserrat" weight="bold">
        {notShowHeader ? '' : 'Upload Files'}
      </Text>
      <Spacer direction="vertical" size={12} />
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <DropzoneBox>
          <Text fontSize="sm" center>
            Drop the files here
          </Text>
        </DropzoneBox>
      </div>
      <Spacer direction="vertical" size={20} />
      {files.map((item, i) => (
        <div key={i} className="row m-0 align-items-center">
          <div className="col-5 p-0">
            <input
              className="form-control"
              placeholder="File Name"
              value={item.inputName}
              onChange={(e) => onInputChange(i, e)}
            />
          </div>
          <div className="col-5 p-0">
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
              backgroundColor="white"
            >
              <img src="/icons/delete_24px.svg" alt="Delete" width="22" />
            </Button>
          </div>
        </div>
      ))}
      <Spacer direction="vertical" size={10} />
      <Text fontSize="sm"> Maximum size upload is 5MB per document </Text>
    </>
  );
};

export default UploadBox;
