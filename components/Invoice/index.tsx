import React, {FC} from "react";
import InvoicePdf from "./InvoicePdf";
import { PDFDownloadLink } from '@react-pdf/renderer';
import Text from "../../styled/Text";

interface InvoiceProps{
    data: any;
    loggedInUser: any;
}

const Invoice: FC<InvoiceProps> = ({ data, loggedInUser }) => {
    return(
        <PDFDownloadLink document={<InvoicePdf data={data} loggedInUser={loggedInUser}/>} fileName="invoice.pdf">
            <Text color="primary" style={{
                cursor: "pointer"
            }}>
                <img
                    src="/icons/download_icon.svg"
                    alt="download-icon"/>
                &nbsp;&nbsp;Download Invoice
            </Text>
        </PDFDownloadLink>
    )
}

export default Invoice;