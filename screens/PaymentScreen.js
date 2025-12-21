import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, Alert, Keyboard } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Calendar, FileText, DollarSign, User } from 'lucide-react-native';
import { addPayment, searchClients } from '../database/statements';

export default function PaymentScreen({ navigation }) {
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    
    // Client Search State
    const [clientSearch, setClientSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [selectedClientDni, setSelectedClientDni] = useState(null);
    const [showResults, setShowResults] = useState(false);

    const [isPaid, setIsPaid] = useState(false);
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

    // Error states
    const [amountError, setAmountError] = useState(false);
    const [descriptionError, setDescriptionError] = useState(false);

    const handleSearch = (text) => {
        setClientSearch(text);
        setSelectedClientDni(null); // Reset selection on edit
        if (text.length > 0) {
            const results = searchClients(text);
            setSearchResults(results);
            setShowResults(true);
        } else {
            setSearchResults([]);
            setShowResults(false);
        }
    };

    const selectClient = (client) => {
        setClientSearch(client.name);
        setSelectedClientDni(client.dni);
        setShowResults(false);
        Keyboard.dismiss();
    };

    function savePayment() {
        let valid = true;

        if (amount === '') {
            setAmountError(true);
            valid = false;
        } else {
            setAmountError(false);
        }

        if (description === '') {
            setDescriptionError(true);
            valid = false;
        } else {
            setDescriptionError(false);
        }

        if (!valid) return;

        if (!selectedClientDni) {
             Alert.alert('Error', 'Please select a valid client from the list');
             return;
        }

        const result = addPayment(parseFloat(amount), description, isPaid, date, selectedClientDni);

        if (result.success) {
            Alert.alert('Success', 'Payment saved successfully', [
                { text: 'OK', onPress: () => navigation.goBack() }
            ]);
        } else {
            Alert.alert('Error', 'Failed to save payment: ' + result.error);
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <ArrowLeft color="#111827" size={24} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>New Payment</Text>
                <View style={{ width: 24 }} />
            </View>

            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1 }}
            >
                <ScrollView contentContainerStyle={styles.content}>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Client</Text>
                        <View style={styles.inputContainer}>
                            <User color="#9CA3AF" size={20} />
                            <TextInput
                                style={styles.input}
                                placeholder="Search client by name or DNI..."
                                value={clientSearch}
                                onChangeText={handleSearch}
                                placeholderTextColor="#9CA3AF"
                            />
                        </View>
                        {showResults && searchResults.length > 0 && (
                            <View style={styles.resultsContainer}>
                                {searchResults.map((item) => (
                                    <TouchableOpacity
                                        key={item.dni}
                                        style={styles.resultItem}
                                        onPress={() => selectClient(item)}
                                    >
                                        <Text style={styles.resultName}>{item.name}</Text>
                                        <Text style={styles.resultDni}>{item.course} - {item.dni}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        )}
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Monto</Text>
                        <View style={[styles.inputContainer, amountError && styles.inputError]}>
                            <DollarSign color={amountError ? "#EF4444" : "#9CA3AF"} size={20} />
                            <TextInput
                                style={styles.input}
                                placeholder="0.00"
                                keyboardType="numeric"
                                value={amount}
                                onChangeText={(text) => {
                                    setAmount(text);
                                    if (text) setAmountError(false);
                                }}
                                placeholderTextColor="#9CA3AF"
                            />
                        </View>
                        {amountError && <Text style={styles.errorText}>Este campo es obligatorio</Text>}
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Description</Text>
                        <View style={[styles.inputContainer, descriptionError && styles.inputError]}>
                            <FileText color={descriptionError ? "#EF4444" : "#9CA3AF"} size={20} />
                            <TextInput
                                style={styles.input}
                                placeholder="What is this payment for?"
                                value={description}
                                onChangeText={(text) => {
                                    setDescription(text);
                                    if (text) setDescriptionError(false);
                                }}
                                placeholderTextColor="#9CA3AF"
                            />
                        </View>
                        {descriptionError && <Text style={styles.errorText}>Este campo es obligatorio</Text>}
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Estado</Text>
                        <View style={styles.toggleContainer}>
                            <TouchableOpacity
                                style={[styles.toggleButton, isPaid && styles.toggleButtonActive]}
                                onPress={() => setIsPaid(true)}
                            >
                                <Text style={[styles.toggleText, isPaid && styles.toggleTextActive]}>Pagado</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.toggleButton, !isPaid && styles.toggleButtonActive]}
                                onPress={() => setIsPaid(false)}
                            >
                                <Text style={[styles.toggleText, !isPaid && styles.toggleTextActive]}>No Pagado</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Date</Text>
                        <View style={styles.inputContainer}>
                            <Calendar color="#9CA3AF" size={20} />
                            <TextInput
                                style={styles.input}
                                placeholder="YYYY-MM-DD"
                                value={date}
                                onChangeText={setDate}
                                placeholderTextColor="#9CA3AF"
                            />
                        </View>
                    </View>

                    <TouchableOpacity style={styles.saveButton} onPress={savePayment}>
                        <Text style={styles.saveButtonText}>Save Payment</Text>
                    </TouchableOpacity>

                </ScrollView>
            </KeyboardAvoidingView>
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
    content: {
        padding: 20,
    },
    inputGroup: {
        marginBottom: 20,
    },
    label: {
        fontSize: 14,
        fontWeight: '500',
        color: '#374151',
        marginBottom: 8,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        paddingHorizontal: 12,
        borderWidth: 1,
        borderColor: '#E5E7EB',
        height: 50,
    },
    input: {
        flex: 1,
        marginLeft: 10,
        fontSize: 16,
        color: '#111827',
    },
    saveButton: {
        backgroundColor: '#6366F1',
        borderRadius: 12,
        paddingVertical: 16,
        alignItems: 'center',
        marginTop: 20,
        shadowColor: '#6366F1',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 4,
    },
    saveButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#FFFFFF',
    },
    toggleContainer: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 4,
        borderWidth: 1,
        borderColor: '#E5E7EB',
    },
    toggleButton: {
        flex: 1,
        paddingVertical: 12,
        alignItems: 'center',
        borderRadius: 8,
    },
    toggleButtonActive: {
        backgroundColor: '#6366F1',
    },
    toggleText: {
        fontSize: 14,
        fontWeight: '500',
        color: '#6B7280',
    },
    toggleTextActive: {
        color: '#FFFFFF',
        fontWeight: '600',
    },
    inputError: {
        borderColor: '#EF4444',
        borderWidth: 1,
    },
    errorText: {
        color: '#EF4444',
        fontSize: 12,
        marginTop: 4,
        marginLeft: 4,
    },
    resultsContainer: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#E5E7EB',
        borderRadius: 8,
        marginTop: 4,
        maxHeight: 200,
    },
    resultItem: {
        padding: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#F3F4F6',
    },
    resultName: {
        fontSize: 14,
        fontWeight: '600',
        color: '#111827',
    },
    resultDni: {
        fontSize: 12,
        color: '#6B7280',
    },
});
