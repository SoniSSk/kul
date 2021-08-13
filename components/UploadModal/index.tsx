import {FC, useEffect, useState} from "react";
import StyledModal from "../../styled/StyledModal";
import Text from "../../styled/Text";
import UploadBox from "../UploadBox";
import Button from "../../styled/Button";
import {uploadFileToS3} from "../../utils/fileUploadUtilities";
import backendApi from "../../api/backendApi";
import {Uploard_Document_Url} from "../../constants/queries/order";
import {errorToast, successToast} from "../../utils/toasts";

interface UploadModalProps{
  orderId: string;
  show: boolean;
  setShow: Function;
}

const UploadModal: FC<UploadModalProps> = ({ orderId, show, setShow }) => {

  const [files, setFiles] = useState<Array<any>>([]);
  const [url, setUrl] = useState<Array<any>>([]);
  const [buttonDisabled, setButtonDisabled] = useState(false);

  useEffect(function (){
    setFiles([]);
  }, [show]);

  const UploadData = async () => {
    try{
      setButtonDisabled(true);
      const fileData = files.map(file => file.file);
      const promises = uploadFileToS3(fileData, url);
      await Promise.all(promises);
      const uploadPromises = files.map((file, index) => {
          return backendApi.post('/', {
            query: Uploard_Document_Url,
            variables: {
              _id: orderId,
              document_name: file.inputName,
              document_url: url[index].split("?")[0]
            }
          })
      });
      setButtonDisabled(false);
      await Promise.all(uploadPromises);
      successToast('Uploaded all files successfully');
      setShow(false);
    }catch (e) {
      setButtonDisabled(false);
      errorToast(e.message);
    }
  }

  return(
    <StyledModal show={show} onHide={() => setShow(false)}>
      <StyledModal.Header closeButton >
        <Text fontSize="lg" weight="bold"> Upload Documents </Text>
      </StyledModal.Header>
      <StyledModal.Body>
        <UploadBox files={files} setFiles={setFiles} setUrl={setUrl} url={url} notShowHeader={true}/>
      </StyledModal.Body>

      <StyledModal.Footer>
        <Button size={"md"} backgroundColor={"primary"} rounded={true} onClick={UploadData} disabled={buttonDisabled}>
          Upload Documents
        </Button>
      </StyledModal.Footer>
    </StyledModal>
  );
}

export default UploadModal;