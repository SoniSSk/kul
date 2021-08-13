import { Modal } from "react-bootstrap";
import styled from "styled-components";

const StyledModal = styled(Modal)`
    & .modal-content {        
        border-radius: 16px;
        border: none;

        & > .modal-body {
            padding: 30px;

            & > .close-icon {
                background-color: transparent;
                position: absolute;
                right: 20px;
                top: 20px;
                border: none;
            }
        }
    }
`;

export default StyledModal;