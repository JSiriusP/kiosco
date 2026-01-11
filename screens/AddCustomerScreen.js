import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, Alert, Modal, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, User, Phone, BookOpen, Hash, ChevronDown } from 'lucide-react-native';
import { addClient } from '../database/statements';

export default function AddCustomerScreen({ navigation }) {
    const [name, setName] = useState('');
    const [dni, setDni] = useState('');
    const [phone, setPhone] = useState('');
    const [course, setCourse] = useState('');
    const [showCourseModal, setShowCourseModal] = useState(false);

    const COURSE_OPTIONS = [
        ...Array.from({ length: 6 }, (_, i) => `Primaria ${i + 1}°`),
        ...Array.from({ length: 6 }, (_, i) => `Secundaria ${i + 1}° `),
        'Desconocido'
    ];

    const handleSave = () => {
        const dniRegex = /^[0-9]{8}$/;
        if (!name || !dni || !phone || !course) {
            Alert.alert('Error', 'Por favor, complete todos los campos');
            return;
        }

        if (!dniRegex.test(dni)) {
            Alert.alert('Error', 'El DNI debe tener 8 caracteres');
            return;
        }

        const result = addClient(name, dni, phone, course);
        if (result.success) {
            Alert.alert('Success', 'Cliente agregado exitosamente', [
                { text: 'OK', onPress: () => navigation.goBack() }
            ]);
        } else {
            Alert.alert('Error', 'No se pudo agregar el cliente: ' + result.error);
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
                        <Text style={styles.label}>Número de teléfono</Text>
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
                        <Text style={styles.label}>Curso</Text>
                        <TouchableOpacity
                            style={styles.inputContainer}
                            onPress={() => setShowCourseModal(true)}
                        >
                            <BookOpen color="#9CA3AF" size={20} />
                            <Text style={[
                                styles.input,
                                !course && { color: '#9CA3AF' }
                            ]}>
                                {course || "Select Course"}
                            </Text>
                            <ChevronDown color="#9CA3AF" size={20} />
                        </TouchableOpacity>
                    </View>

                    <Modal
                        visible={showCourseModal}
                        transparent={true}
                        animationType="slide"
                        onRequestClose={() => setShowCourseModal(false)}
                    >
                        <View style={styles.modalOverlay}>
                            <View style={styles.modalContent}>
                                <View style={styles.modalHeader}>
                                    <Text style={styles.modalTitle}>Curso</Text>
                                    <TouchableOpacity onPress={() => setShowCourseModal(false)}>
                                        <Text style={styles.closeButton}>Cerrar</Text>
                                    </TouchableOpacity>
                                </View>
                                <FlatList
                                    data={COURSE_OPTIONS}
                                    keyExtractor={(item) => item}
                                    renderItem={({ item }) => (
                                        <TouchableOpacity
                                            style={[
                                                styles.optionItem,
                                                course === item && styles.selectedOption
                                            ]}
                                            onPress={() => {
                                                setCourse(item);
                                                setShowCourseModal(false);
                                            }}
                                        >
                                            <Text style={[
                                                styles.optionText,
                                                course === item && styles.selectedOptionText
                                            ]}>{item}</Text>
                                        </TouchableOpacity>
                                    )}
                                />
                            </View>
                        </View>
                    </Modal>

                    <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                        <Text style={styles.saveButtonText}>Guardar Cliente</Text>
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
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        maxHeight: '70%',
        paddingBottom: 20,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#E5E7EB',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#111827',
    },
    closeButton: {
        fontSize: 16,
        color: '#6366F1',
        fontWeight: '600',
    },
    optionItem: {
        paddingVertical: 16,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#F3F4F6',
    },
    selectedOption: {
        backgroundColor: '#EEF2FF',
    },
    optionText: {
        fontSize: 16,
        color: '#374151',
    },
    selectedOptionText: {
        color: '#6366F1',
        fontWeight: '600',
    },
});
