import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, CreditCard } from 'lucide-react-native';
import { useFocusEffect } from '@react-navigation/native';
import { getPaymentsByClient } from '../database/statements';

export default function ClientPaymentsScreen({ route, navigation }) {
    const { client } = route.params;
    const [payments, setPayments] = useState([]);

    useFocusEffect(
        useCallback(() => {
            const data = getPaymentsByClient(client.dni);
            setPayments(data);
        }, [client.dni])
    );

    const renderEmptyState = () => (
        <View style={styles.emptyContainer}>
            <View style={styles.iconContainer}>
                <CreditCard color="#9CA3AF" size={48} />
            </View>
            <Text style={styles.emptyTitle}>No se encontraron pagos</Text>
            <Text style={styles.emptyText}>Este cliente no tiene pagos registrados.</Text>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
             <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <ArrowLeft color="#111827" size={24} />
                </TouchableOpacity>
                <View>
                    <Text style={styles.headerTitle}>{client.name}</Text>
                    <Text style={styles.headerSubtitle}>DNI: {client.dni}</Text>
                </View>
                <View style={{ width: 24 }} />
            </View>

            {payments.length === 0 ? (
                renderEmptyState()
            ) : (
                <FlatList
                    data={payments}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                         <View style={styles.paymentItem}>
                             <View style={styles.paymentInfo}>
                                <Text style={styles.paymentAmount}>${item.amount.toFixed(2)}</Text>
                                <Text style={styles.paymentDate}>{item.date}</Text>
                             </View>
                             <View style={styles.paymentDetails}>
                                <Text style={styles.paymentDescription} numberOfLines={1}>
                                    {item.description || ''}
                                </Text>
                                <Text style={[styles.paymentStatus, { color: item.isPaid ? '#10B981' : '#F59E0B' }]}>
                                    {item.isPaid ? 'PAID' : 'PENDING'}
                                </Text>
                             </View>
                         </View>
                    )}
                    contentContainerStyle={styles.listContent}
                />
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F3F4F6',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 16,
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderBottomColor: '#E5E7EB',
    },
    backButton: {
        padding: 4,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#111827',
    },
    headerSubtitle: {
        fontSize: 12,
        color: '#6B7280',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    iconContainer: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#E5E7EB',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
    },
    emptyTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#111827',
        marginBottom: 8,
    },
    emptyText: {
        fontSize: 14,
        color: '#6B7280',
        textAlign: 'center',
    },
    listContent: {
        padding: 20,
    },
    paymentItem: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#E5E7EB',
    },
    paymentInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    paymentAmount: {
        fontSize: 18,
        fontWeight: '700',
        color: '#111827',
    },
    paymentDate: {
        fontSize: 14,
        color: '#6B7280',
    },
    paymentDetails: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    paymentDescription: {
        fontSize: 14,
        color: '#374151',
        flex: 1,
        marginRight: 8,
    },
    paymentStatus: {
        fontSize: 12,
        fontWeight: '600',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
        backgroundColor: '#F3F4F6', // Will be overridden ideally or use bg with opacity
        overflow: 'hidden',
    }
});
