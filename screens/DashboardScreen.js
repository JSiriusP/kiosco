import React from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, Bell, Filter, Plus, Wallet, ArrowUpRight, ArrowDownRight, Info } from 'lucide-react-native';
import BalanceChart from '../components/BalanceChart';
import AnalyticsChart from '../components/AnalyticsChart';
import TransactionsList from '../components/TransactionsList';

export default function DashboardScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                {/* Header */}
                <View style={styles.header}>
                    <View style={styles.searchContainer}>
                        <Search color="#9CA3AF" size={20} />
                        <TextInput
                            placeholder="Search"
                            style={styles.searchInput}
                            placeholderTextColor="#9CA3AF"
                        />
                    </View>
                    <View style={styles.headerRight}>
                        <TouchableOpacity style={styles.iconButton}>
                            <Bell color="#6B7280" size={20} />
                        </TouchableOpacity>
                        <View style={styles.avatarPlaceholder} />
                    </View>
                </View>

                {/* Dashboard Title & Actions */}
                <View style={styles.titleRow}>
                    <Text style={styles.screenTitle}>Kiosco Papu</Text>
                    <View style={styles.actionButtons}>
                        <TouchableOpacity style={styles.filterButton}>
                            <Filter color="#374151" size={16} />
                            <Text style={styles.filterText}>Filtrar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.addButton}>
                            <Plus color="#FFFFFF" size={16} />
                            <Text style={styles.addText}>Agregar nuevo</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Summary Cards */}
                <View style={styles.cardsContainer}>
                    {/* Balance Card */}
                    <View style={styles.card}>
                        <View style={styles.cardHeader}>
                            <View style={[styles.iconContainer, { backgroundColor: '#E0E7FF' }]}>
                                <Wallet color="#4F46E5" size={20} />
                            </View>
                            <View style={styles.trendContainer}>
                                <ArrowUpRight color="#10B981" size={14} />
                                <Text style={styles.trendText}>10.32%</Text>
                            </View>
                        </View>
                        <Text style={styles.cardLabel}>Balance</Text>
                        <Text style={styles.cardValue}>$12,003.902</Text>
                    </View>

                    {/* Income Card */}
                    <View style={styles.card}>
                        <View style={styles.cardHeader}>
                            <View style={[styles.iconContainer, { backgroundColor: '#DCFCE7' }]}>
                                <ArrowUpRight color="#10B981" size={20} />
                            </View>
                            <View style={styles.trendContainer}>
                                <ArrowUpRight color="#10B981" size={14} />
                                <Text style={styles.trendText}>16.02%</Text>
                            </View>
                        </View>
                        <Text style={styles.cardLabel}>Ingresos Este Mes</Text>
                        <Text style={styles.cardValue}>$12,003.902</Text>
                    </View>

                    {/* Expenses Card */}
                    <View style={styles.card}>
                        <View style={styles.cardHeader}>
                            <View style={[styles.iconContainer, { backgroundColor: '#FEE2E2' }]}>
                                <ArrowDownRight color="#EF4444" size={20} />
                            </View>
                            <View style={styles.trendContainer}>
                                <ArrowDownRight color="#EF4444" size={14} />
                                <Text style={[styles.trendText, { color: '#EF4444' }]}>4.32%</Text>
                            </View>
                        </View>
                        <Text style={styles.cardLabel}>Gastos Este Mes</Text>
                        <Text style={styles.cardValue}>$12,003.902</Text>
                    </View>
                </View>

                {/* Balance Chart */}
                <BalanceChart />

                {/* Analytics Chart */}
                <AnalyticsChart />

                {/* Transactions List */}
                <TransactionsList />

            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F3F4F6',
    },
    scrollContent: {
        padding: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 8,
        flex: 1,
        marginRight: 16,
    },
    searchInput: {
        marginLeft: 8,
        flex: 1,
        fontSize: 14,
        color: '#111827',
    },
    headerRight: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconButton: {
        padding: 8,
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        marginRight: 12,
    },
    avatarPlaceholder: {
        width: 36,
        height: 36,
        backgroundColor: '#D1D5DB',
        borderRadius: 4,
    },
    titleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    screenTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#111827',
    },
    actionButtons: {
        flexDirection: 'row',
    },
    filterButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 8,
        marginRight: 8,
    },
    filterText: {
        marginLeft: 6,
        fontSize: 14,
        fontWeight: '500',
        color: '#374151',
    },
    addButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#6366F1',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 8,
    },
    addText: {
        marginLeft: 6,
        fontSize: 14,
        fontWeight: '500',
        color: '#FFFFFF',
    },
    cardsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap', // Allow wrapping if screen is small, though design shows horizontal scroll or grid
        gap: 12,
        marginBottom: 24,
    },
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 16,
        flex: 1, // Distribute space evenly
        minWidth: '30%', // Ensure cards don't get too small
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 2,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 12,
    },
    iconContainer: {
        padding: 8,
        borderRadius: 8,
    },
    trendContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    trendText: {
        marginLeft: 4,
        fontSize: 12,
        fontWeight: '500',
        color: '#10B981',
    },
    cardLabel: {
        fontSize: 12,
        color: '#6B7280',
        marginBottom: 4,
    },
    cardValue: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#111827',
    },
});
