import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, User, Phone, BookOpen, Hash } from 'lucide-react-native';
import { addClient } from '../database/statements';

export default function AddCustomerScreen({ navigation }) {
    const [name, setName] = useState('');
    const [dni, setDni] = useState('');
    const [phone, setPhone] = useState('');
    const [course, setCourse] = useState('');

    const handleSave = () => {
        if (!name || !dni || !phone || !course) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }

        const result = addClient(name, dni, phone, course);
        if (result.success) {
            Alert.alert('Success', 'Client added successfully', [
                { text: 'OK', onPress: () => navigation.goBack() }
            ]);
        } else {
             Alert.alert('Error', 'Failed to add client: ' + result.error);
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <ArrowLeft color="#111827" size={24} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>New Customer</Text>
                <View style={{ width: 24 }} />
            </View>

            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1 }}
            >
                <ScrollView contentContainerStyle={styles.content}>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Full Name</Text>
                        <View style={styles.inputContainer}>
                            <User color="#9CA3AF" size={20} />
                            <TextInput
                                style={styles.input}
                                placeholder="John Foos"
                                value={name}
                                onChangeText={setName}
                                placeholderTextColor="#9CA3AF"
                            />
                        </View>
                    </View>

                     <View style={styles.inputGroup}>
                        <Text style={styles.label}>DNI</Text>
                        <View style={styles.inputContainer}>
                            <Hash color="#9CA3AF" size={20} />
                            <TextInput
                                style={styles.input}
                                placeholder="12345678"
                                keyboardType="numeric"
                                value={dni}
                                onChangeText={setDni}
                                placeholderTextColor="#9CA3AF"
                            />
                        </View>
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Phone Number</Text>
                        <View style={styles.inputContainer}>
                            <Phone color="#9CA3AF" size={20} />
                            <TextInput
                                style={styles.input}
                                placeholder="+1 234 567 890"
                                keyboardType="phone-pad"
                                value={phone}
                                onChangeText={setPhone}
                                placeholderTextColor="#9CA3AF"
                            />
                        </View>
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Course</Text>
                        <View style={styles.inputContainer}>
                            <BookOpen color="#9CA3AF" size={20} />
                            <TextInput
                                style={styles.input}
                                placeholder="Mathematics 101"
                                value={course}
                                onChangeText={setCourse}
                                placeholderTextColor="#9CA3AF"
                            />
                        </View>
                    </View>

                    <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                        <Text style={styles.saveButtonText}>Save Customer</Text>
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
});
