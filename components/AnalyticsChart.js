import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { Info } from 'lucide-react-native';

const screenWidth = Dimensions.get('window').width;

export default function AnalyticsChart() {
    const data = [
        {
            name: "Household",
            population: 43,
            color: "#67E8F9", // Cyan
            legendFontColor: "#7F7F7F",
            legendFontSize: 12
        },
        {
            name: "Food",
            population: 16,
            color: "#FDBA74", // Orange
            legendFontColor: "#7F7F7F",
            legendFontSize: 12
        },
        {
            name: "Clothing",
            population: 28,
            color: "#86EFAC", // Green
            legendFontColor: "#7F7F7F",
            legendFontSize: 12
        },
        {
            name: "Entertainment",
            population: 13,
            color: "#FDE047", // Yellow
            legendFontColor: "#7F7F7F",
            legendFontSize: 12
        }
    ];

    const chartConfig = {
        backgroundGradientFrom: "#1E2923",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "#08130D",
        backgroundGradientToOpacity: 0.5,
        color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.5,
        useShadowColorFromDataset: false // optional
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Analytics</Text>
                <Info color="#9CA3AF" size={16} />
            </View>

            <View style={styles.tabs}>
                <Text style={[styles.tab, styles.activeTab]}>Incomes</Text>
                <Text style={styles.tab}>Expenses</Text>
            </View>

            <PieChart
                data={data}
                width={screenWidth - 40}
                height={220}
                chartConfig={chartConfig}
                accessor={"population"}
                backgroundColor={"transparent"}
                paddingLeft={"15"}
                center={[10, 0]}
                absolute
                hasLegend={true}
            />
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
    tabs: {
        flexDirection: 'row',
        marginBottom: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#E5E7EB',
    },
    tab: {
        marginRight: 24,
        paddingBottom: 8,
        fontSize: 14,
        color: '#6B7280',
    },
    activeTab: {
        color: '#6366F1',
        borderBottomWidth: 2,
        borderBottomColor: '#6366F1',
        fontWeight: '500',
    },
});
