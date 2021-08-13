import { Modal } from "react-bootstrap";
import styled from "styled-components";

export const LoginModal = styled(Modal)`
    & .modal-content {
        border: none;
        border-radius: 15px;
        width:70%;
        margin:auto;
        position:relative;
        top:-80px

    }
`;

export const ModalBody = styled(Modal.Body)`
    padding: 40px;
`;

