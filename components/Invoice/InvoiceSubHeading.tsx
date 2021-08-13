import {Text, View, StyleSheet } from '@react-pdf/renderer';
import {FC} from "react";

const borderColor = '#000000';

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        borderBottomColor: borderColor,
        borderBottomWidth: 1,
        alignItems: 'center',
        fontSize: 12,
        fontStyle: 'bold',
    },
    tableContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 24,
        borderWidth: 1,
        borderColor: borderColor,
    },
    column: {
        width: '25%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        borderWidth: 1,
        borderRightColor: borderColor,
        borderLeftColor: borderColor
    },
    label: {
        fontSize: 12,
        fontWeight: "bold"
    },
    data: {
        fontSize: 8
    },
    addressColumn: {
        width: '50%',
        display: 'flex',
        flexDirection: 'column',
        borderWidth: 1,
        borderRightColor: borderColor,
        borderLeftColor: borderColor,
        paddingLeft: 10
    },
    space: {
        marginTop: 10
    }
});

interface InvoiceSubHeadingProps{
    invoiceNumber: string;
    date: string;
    orderId: string;
    paymentMode: string;
    loggedInUser: any;
}


const InvoiceSubHeading: FC<InvoiceSubHeadingProps> = ({invoiceNumber,
                                                           date,
                                                           orderId,
                                                           paymentMode,
                                                           loggedInUser}) => {
    return(
        <View style={styles.tableContainer}>
            <View style={styles.column}>
                <Text style={styles.label}> INVOICE NO.: </Text>
                <Text style={styles.data}> {invoiceNumber} </Text>
            </View>

            <View style={styles.column}>
                <Text style={styles.label}> INVOICE DATE: </Text>
                <Text style={styles.data}> {new Date(date).toLocaleDateString()} </Text>
            </View>

            <View style={styles.column}>
                <Text style={styles.label}> ORDER ID: </Text>
                <Text style={styles.data}> {orderId} </Text>
            </View>

            <View style={styles.column}>
                <Text style={styles.label}> PAYMENT MODE: </Text>
                <Text style={styles.data}> {paymentMode} </Text>
            </View>

            <View style={styles.addressColumn}>
                <Text style={styles.label}> BILL FROM </Text>
                <Text style={styles.space}></Text>
                <Text style={styles.data}> NEO Online Ventures Pvt. Ltd. </Text>
                <Text style={styles.data}> Gurugram, Haryana - (India) </Text>
                <Text style={styles.data}> GST No.: 06AAHCN1X10522 </Text>
                <Text style={styles.data}> PAN No.: AABBEF2123 </Text>
            </View>


            <View style={styles.addressColumn}>
                <Text style={styles.label}> BILLED TO </Text>
                <Text style={styles.space}></Text>
                <Text style={styles.data}> {loggedInUser.name} </Text>
                <Text style={styles.data}>
                    Registered Mobile No.: +{loggedInUser.country_code} {loggedInUser.mobile}
                </Text>
                <Text style={styles.data}> {loggedInUser.city}, {loggedInUser.state} - {loggedInUser.country_code == 91 ? "India" : "USA"} </Text>
                {loggedInUser.gst ? <Text style={styles.data}> GST No.: {loggedInUser.gst} </Text> : null}
                <Text style={styles.space}></Text>
                <Text style={styles.data}> Place of supply: {loggedInUser.state} </Text>
            </View>
        </View>
    );
}
export default InvoiceSubHeading;