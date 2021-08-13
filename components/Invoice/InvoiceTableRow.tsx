import React, {FC, Fragment} from 'react';
import {Text, View, StyleSheet } from '@react-pdf/renderer';

const borderColor = '#90e5fc'
const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        borderBottomColor: '#bff0fd',
        borderBottomWidth: 1,
        alignItems: 'center',
        height: 24,
        fontStyle: 'bold',
    },
    description: {
        width: '75%',
        textAlign: 'left',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        paddingLeft: 8,
    },
    qty: {
        width: '10%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        textAlign: 'right',
        paddingRight: 8,
    },
    amount: {
        width: '15%',
        textAlign: 'right',
        paddingRight: 8,
    },
});

interface InvoiceTableRowProps{
    items: Array<any>;
}

const InvoiceTableRow: FC<InvoiceTableRowProps> = ({items}) => {
    const rows = items.map( (item, index) =>
        <View style={styles.row} key={(index+1).toString()}>
            <Text style={styles.description}>{item.product_name}</Text>
            <Text style={styles.qty}> 1 </Text>
            <Text style={styles.amount}>{item.amount}</Text>
        </View>
    )
    return (<Fragment>{rows}</Fragment> )
};

export default InvoiceTableRow