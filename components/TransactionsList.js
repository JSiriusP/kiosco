import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Info } from 'lucide-react-native';

const transactions = [
    { id: '1', title: 'Lunch money', date: '06 April 2023', amount: '-$10.00', color: '#FDBA74' },
    { id: '2', title: 'April Bonus', date: '05 April 2023', amount: '+$500.00', color: '#86EFAC' },
    { id: '3', title: 'Allowance', date: '05 April 2023', amount: '+$500.00', color: '#86EFAC' },
    { id: '4', title: 'Pay David', date: '05 April 2023', amount: '-$50.00', color: '#67E8F9' },
    { id: '5', title: 'Netflix subscription', date: '05 April 2023', amount: '-$10.00', color: '#FDE047' },
];

export default function TransactionsList() {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Transactions</Text>
                <Info color="#9CA3AF" size={16} />
            </View>

            <View>
                {transactions.map((item) => (
                    <View key={item.id} style={styles.item}>
                        <View style={[styles.icon, { backgroundColor: item.color }]} />
                        <View style={styles.details}>
                            <Text style={styles.itemTitle}>{item.title}</Text>
                            <Text style={styles.itemDate}>{item.date}</Text>
                        </View>
                        <Text style={[
                            styles.amount,
                            { color: item.amount.startsWith('+') ? '#10B981' : '#EF4444' }
                        ]}>
                            {item.amount}
                        </Text>
                    </View>
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 16,
        marginBottom: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 2,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
        color: '#374151',
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    icon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 12,
    },
    details: {
        flex: 1,
    },
    itemTitle: {
        fontSize: 14,
        fontWeight: '500',
        color: '#111827',
    },
    itemDate: {
        fontSize: 12,
        color: '#6B7280',
    },
    amount: {
        fontSize: 14,
        fontWeight: '600',
    },
});
