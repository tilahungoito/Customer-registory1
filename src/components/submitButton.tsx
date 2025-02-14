import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

type SubmitButtonProps = {
    title: string;
    onPress: () => void;
};

const SubmitButton: React.FC<SubmitButtonProps> = ({ title, onPress }) => (
    <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#007bff',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
    },
    text: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default SubmitButton;
