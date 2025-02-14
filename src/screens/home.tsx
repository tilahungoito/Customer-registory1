import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, StatusBar, Dimensions } from 'react-native';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebaseConfig';
import { StackNavigationProp } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/FontAwesome';

// Get screen width dynamically
const screenWidth = Dimensions.get('window').width;

type WelcomeScreenProps = {
    navigation: StackNavigationProp<any>;
};

export default function WelcomeScreen({ navigation }: WelcomeScreenProps)
{
    const [userEmail, setUserEmail] = useState<string | null>(null);
    const [showMenu, setShowMenu] = useState(false);

    useEffect(() =>
    {
        // Listen for auth state changes and update email
        const unsubscribe = onAuthStateChanged(auth, (user) =>
        {
            setUserEmail(user?.email || "");
        });

        return unsubscribe; // Cleanup listener on unmount
    }, []);

    const handleSignOut = async () =>
    {
        try
        {
            await signOut(auth);
            navigation.replace('SignIn'); // Navigate back to the Login screen
        } catch (error: any)
        {
            console.log(error.message);
        }
    };

    return (
        <View style={styles.container}>

            <StatusBar barStyle="light-content" backgroundColor="#007AFF" />

            {/* Header Positioned Directly Below the Status Bar */}
            <View style={styles.header}>
                <Text style={styles.headerText}>Home</Text>

                {/* User Icon */}
                <TouchableOpacity onPress={() => setShowMenu(!showMenu)} style={styles.userIconContainer}>
                    <Icon name="user-circle" size={28} color="white" />
                </TouchableOpacity>
            </View>

            {/* Dropdown Menu for Email & Logout */}
            {showMenu && (
                <Animated.View style={styles.menu}>
                    <Text style={styles.menuText}>{userEmail}</Text>
                    <TouchableOpacity style={styles.menuButton} onPress={handleSignOut}>
                        <Icon name="sign-out" size={18} color="white" style={styles.menuIcon} />
                        <Text style={styles.menuButtonText}>Sign Out</Text>
                    </TouchableOpacity>
                </Animated.View>
            )}

            <Text style={styles.title}>Welcome!</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f0f4f7',
    },

    header: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: screenWidth,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: '#007AFF',
    },
    headerText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
    },

    userIconContainer: {
        padding: 5,
    },

    menu: {
        position: 'absolute',
        top: 55,
        right: 20,
        backgroundColor: '#007AFF',
        padding: 10,
        borderRadius: 10,
        width: 180,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    menuText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
        textAlign: 'center',
    },

    menuButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#E53935',
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 15,
        justifyContent: 'center',
    },
    menuIcon: {
        marginRight: 10,
    },
    menuButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#333',
        marginTop: 100,
        textAlign: 'center',
    },
});
