import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Plus, Users } from 'lucide-react-native';
import { useFocusEffect } from '@react-navigation/native';
import { getClients } from '../database/statements';

export default function CustomersListScreen({ navigation }) {
    const [clients, setClients] = useState([]);

    useFocusEffect(
        useCallback(() => {
            const data = getClients();
            setClients(data);
        }, [])
    );

    const renderEmptyState = () => (
        <View style={styles.emptyContainer}>
            <View style={styles.iconContainer}>
                <Users color="#9CA3AF" size={48} />
            </View>
            <Text style={styles.emptyTitle}>No Clients Found</Text>
            <Text style={styles.emptyText}>No client has been added yet.</Text>
            <TouchableOpacity 
                style={styles.addButton}
                onPress={() => navigation.navigate('AddCustomer')}
            >
                <Plus color="#FFFFFF" size={20} />
                <Text style={styles.addButtonText}>Add New Client</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Clients</Text>
                <TouchableOpacity onPress={() => navigation.navigate('AddCustomer')}>
                     <Plus color="#6366F1" size={24} />
                </TouchableOpacity>
            </View>

            {clients.length === 0 ? (
                renderEmptyState()
            ) : (
                <FlatList
                    data={clients}
                    keyExtractor={(item) => item.dni}
                    renderItem={({ item }) => (
                         <View style={styles.clientItem}>
                             <View>
                                <Text style={styles.clientName}>{item.name}</Text>
                                <Text style={styles.clientSubtitle}>{item.course}</Text>
                             </View>
                             <Text style={styles.clientDni}>{item.dni}</Text>
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
    headerTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#111827',
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
        marginBottom: 24,
    },
    addButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#6366F1',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 12,
        elevation: 2,
    },
    addButtonText: {
        color: '#FFFFFF',
        fontWeight: '600',
        marginLeft: 8,
    },
    listContent: {
        padding: 20,
    },
    clientItem: {
        padding: 16,
        backgroundColor: 'white',
        borderRadius: 8,
        marginBottom: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    clientName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#111827',
    },
    clientSubtitle: {
        fontSize: 14,
        color: '#6B7280',
        marginTop: 2,
    },
    clientDni: {
        fontSize: 14,
        fontWeight: '500',
        color: '#9CA3AF',
    }
});
