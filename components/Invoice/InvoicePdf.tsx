import React, { FC } from "react";
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import {Image} from "react-bootstrap";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import InvoiceTableHeader from "./InvoiceTableHeader";
import InvoiceTableRow from "./InvoiceTableRow";
import InvoiceTableFooter from "./InvoiceTableFooter";
import {contactNumber, emailAddress} from "../../constants/contactInformation";
import InvoiceSubHeading from "./InvoiceSubHeading";

interface InvoiceProps{
    data: any;
    loggedInUser: any;
}

const styles = StyleSheet.create({
    page: {
        fontFamily: 'Helvetica',
        fontSize: 11,
        paddingTop: 30,
        paddingLeft:60,
        paddingRight:60,
        lineHeight: 1.5,
        flexDirection: 'column',
    },
    logo: {
        width: 74,
        height: 66,
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    titleContainer:{
        flexDirection: 'row',
        marginTop: 24,
    },
    reportTitle:{
        color: '#000000',
        letterSpacing: 4,
        fontSize: 25,
        textAlign: 'left',
        textTransform: 'uppercase',
    },
    invoiceNoContainer: {
        flexDirection: 'row',
        marginTop: 36,
        justifyContent: 'flex-end'
    },
    invoiceDateContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    invoiceDate: {
        fontSize: 12,
        fontStyle: 'bold',
    },
    label: {
        width: 60
    },
    headerContainer: {
        marginTop: 36
    },
    billTo: {
        marginTop: 20,
        paddingBottom: 2,
    },
    tableContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 24,
        borderWidth: 1,
        borderColor: '#000000',
    },
    invoiceFooter: {
        marginTop: 30,
        flexDirection: 'column'
    },
    thanks: {
        marginTop: 10,
        fontSize: 8,
        fontStyle: "italics",
        textAlign: "center"
    }
});

const InvoicePdf: FC<InvoiceProps> = ({ data, loggedInUser }) => {

    return(
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.titleContainer}>
                    <Text style={styles.reportTitle}> Invoice </Text>
                </View>

                {/*<View style={styles.invoiceNoContainer}>*/}
                {/*    <Text style={styles.label}>Invoice No:</Text>*/}
                {/*    <Text style={styles.invoiceDate}> 201906-28 </Text>*/}
                {/*</View >*/}
                {/*<View style={styles.invoiceDateContainer}>*/}
                {/*    <Text style={styles.label}>Date: </Text>*/}
                {/*    <Text> {new Date(data.created_at).toLocaleDateString()} </Text>*/}
                {/*</View >*/}

                <InvoiceSubHeading invoiceNumber={"IN0122312"}
                                   date={data.created_at}
                                   orderId={data._id}
                                   paymentMode={data.payment_method}
                                   loggedInUser={loggedInUser}/>


                <View style={styles.tableContainer}>
                    <InvoiceTableHeader />
                    <InvoiceTableRow items={data.products} />
                    <InvoiceTableFooter totalPrice={Number(data.tax)/2} header={"SGST@9%"}/>
                    <InvoiceTableFooter totalPrice={Number(data.tax)/2} header={"CGST@9%"}/>
                    <InvoiceTableFooter totalPrice={data.total_amount} header={"Total Amount"}/>
                </View>

                <View style={styles.invoiceFooter}>
                    <Text> For Terms of Use of ezyLegal Services and Refund Policy, please click here</Text>
                    <Text style={styles.thanks}> *This is a computer generated Invoice and does not require signature/stamp </Text>
                </View>

            </Page>
        </Document>
    )
}


export default InvoicePdf;