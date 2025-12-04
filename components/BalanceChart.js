import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

export default function BalanceChart() {
    const data = {
        labels: ["01 Apr", "02 Apr", "03 Apr", "04 Apr", "05 Apr", "06 Apr", "07 Apr"],
        datasets: [
            {
                data: [850, 1250, 900, 1200, 1150, 1450, 1250],
                color: (opacity = 1) => `rgba(99, 102, 241, ${opacity})`, // Primary color
                strokeWidth: 2
            }
        ]
    };

    const chartConfig = {
        backgroundGradientFrom: "#FFFFFF",
        backgroundGradientTo: "#FFFFFF",
        decimalPlaces: 0,
        color: (opacity = 1) => `rgba(99, 102, 241, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(107, 114, 128, ${opacity})`,
        style: {
            borderRadius: 16
        },
        propsForDots: {
            r: "4",
            strokeWidth: "2",
            stroke: "#6366F1"
        },
        propsForBackgroundLines: {
            strokeDasharray: "", // solid lines
            stroke: "#E5E7EB"
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View>
                    <Text style={styles.title}>Your Balance</Text>
                    <View style={styles.balanceRow}>
                        <Text style={styles.balanceAmount}>$120,543.43</Text>
                        <Text style={styles.percentage}>↑ 20.32%</Text>
                    </View>
                </View>
                <Text style={styles.dateRange}>Last 7 days ▾</Text>
            </View>

            <View style={styles.tabs}>
                <Text style={[styles.tab, styles.activeTab]}>Expense</Text>
                <Text style={styles.tab}>Incomes</Text>
                <Text style={styles.tab}>Savings</Text>
                <Text style={styles.tab}>Investment</Text>
            </View>

            <LineChart
                data={data}
                width={screenWidth - 40} // 20 padding on each side
                height={220}
                chartConfig={chartConfig}
                bezier
                style={styles.chart}
                withDots={false}
                withInnerLines={true}
                withOuterLines={false}
                withVerticalLines={false}
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
        alignItems: 'flex-start',
        marginBottom: 16,
    },
    title: {
        fontSize: 14,
        color: '#6B7280',
        marginBottom: 4,
    },
    balanceRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    balanceAmount: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#111827',
        marginRight: 8,
    },
    percentage: {
        fontSize: 12,
        color: '#10B981',
        fontWeight: '500',
    },
    dateRange: {
        fontSize: 12,
        color: '#6B7280',
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
    chart: {
        marginVertical: 8,
        borderRadius: 16,
        paddingRight: 40, // Adjust for labels
    },
});
