//screen/loginScreen
import React, { useState } from 'react';
import
{
    View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, Modal, Image
} from 'react-native';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../firebaseConfig';
import { StackNavigationProp } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/FontAwesome';

type RootStackParamList = {
    Welcome: undefined;
    Register: undefined;
    ForgotPassword: undefined;
};

type LoginScreenProps = {
    navigation: StackNavigationProp<RootStackParamList>;
};

export default function LoginScreen({ navigation }: LoginScreenProps)
{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [secureTextEntry, setSecureTextEntry] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);

    const handleLogin = async () =>
    {
        try
        {
            await signInWithEmailAndPassword(auth, email, password);
            navigation.navigate('Welcome');
        } catch (error: any)
        {
            Alert.alert('Error', error.message);
        }
    };

    return (
        <View style={styles.container}>
            {/* Large Avatar Icon */}
            <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/149/149071.png' }} style={styles.avatar} />
            <Text style={styles.title}>Sign In</Text>

            {/* Email Input */}
            <View style={styles.inputContainer}>
                <Icon name="envelope" size={20} color="#888" style={styles.icon} />
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                />
            </View>

            {/* Password Input */}
            <View style={styles.inputContainer}>
                <Icon name="lock" size={20} color="#888" style={styles.icon} />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    secureTextEntry={secureTextEntry}
                    value={password}
                    onChangeText={setPassword}
                />
                <TouchableOpacity
                    style={styles.eyeIcon}
                    onPress={() => setSecureTextEntry(!secureTextEntry)}
                >
                    <Icon name={secureTextEntry ? 'eye-slash' : 'eye'} size={20} color="#888" />
                </TouchableOpacity>
            </View>

            {/* Sign In Button */}
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Sign In</Text>
            </TouchableOpacity>

            {/* Forgot Password */}
            <TouchableOpacity style={styles.linkButton} onPress={() => navigation.navigate('ForgotPassword')}>
                <Text style={styles.linkText}>Forgot Password?</Text>
            </TouchableOpacity>

            {/* Register Now */}
            <TouchableOpacity style={styles.registerButton} onPress={() => setModalVisible(true)}>
                <Text style={styles.registerButtonText}>Don't have an account? Register Now!</Text>
            </TouchableOpacity>

            {/* Modal for Registration Info */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Why Register?</Text>
                        <Text style={styles.modalText}>By registering, you can save your progress, access exclusive content, and get personalized recommendations.</Text>
                        <TouchableOpacity style={styles.modalButton} onPress={() => navigation.navigate('Register')}>
                            <Text style={styles.modalButtonText}>Proceed to Register</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setModalVisible(false)}>
                            <Text style={styles.modalClose}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#f0f4f7',
    },
    avatar: {
        width: 100,
        height: 100,
        marginBottom: 20,
        borderRadius: 50,
        resizeMode: 'contain',
        backgroundColor: '#ddd',
        borderWidth: 2,
        borderColor: '#ccc',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 20,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: 25,
        borderWidth: 2,
        borderColor: '#bbb',
        paddingHorizontal: 15,
        marginBottom: 15,
    },
    input: {
        flex: 1,
        height: 50,
        fontSize: 16,
    },
    icon: {
        marginRight: 10,
    },
    eyeIcon: {
        position: 'absolute',
        right: 15,
    },
    button: {
        width: '100%',
        height: 50,
        borderRadius: 25,
        borderWidth: 2,
        borderColor: '#4CAF50',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
        backgroundColor: 'transparent',
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#4CAF50',
    },
    linkButton: {
        marginVertical: 10,
    },
    linkText: {
        color: '#2196F3',
        fontSize: 16,
        fontWeight: 'bold',
        textDecorationLine: 'underline',
    },
    registerButton: {
        marginTop: 20,
    },
    registerButtonText: {
        color: '#FF5722',
        fontSize: 18,
        fontWeight: 'bold',
        textDecorationLine: 'underline',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        width: 300,
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 15,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    modalText: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 20,
    },
    modalButton: {
        backgroundColor: '#FF5722',
        padding: 10,
        borderRadius: 10,
    },
    modalButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    modalClose: {
        marginTop: 10,
        fontSize: 16,
        color: 'red',
    },
});