import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import { getPayments } from '../database/statements';

export default function TestPaymentsScreen() {
    const [payments, setPayments] = useState([]);

    useFocusEffect(
        useCallback(() => {
            const data = getPayments();
            setPayments(data);
        }, [])
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Payments Debug</Text>
            </View>
            <FlatList
                data={payments}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        <Text style={styles.text}>{item.date} - ${item.amount}</Text>
                        <Text style={styles.subtext}>{item.description}</Text>
                        <Text style={styles.subtext}>Client: {item.clientId}</Text>
                        <Text style={[styles.status, { color: item.isPaid ? 'green' : 'red' }]}>
                            {item.isPaid ? 'PAID' : 'PENDING'}
                        </Text>
                    </View>
                )}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F3F4F6',
    },
    header: {
        padding: 16,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderColor: '#eee',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    item: {
        padding: 16,
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderColor: '#eee',
    },
    text: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    subtext: {
        color: '#666',
    },
    status: {
        fontWeight: 'bold',
        marginTop: 4,
    }
});
