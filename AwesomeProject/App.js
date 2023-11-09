/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import SplashScreen from 'react-native-splash-screen';
// import { useFonts } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import {
    Walkthrough,
    Verification,
    ProfileAccount,
    PhoneNumber,
    PersonalChat,
    Contacts,
    Chats,
} from './src/screens'
import { useCallback } from 'react'
import BottomTabNavigation from './src/navigation/BottomTabNavigation'
// SplashScreen.preventAutoHideAsync()

const Stack = createNativeStackNavigator()

export default function App() {
    // load fonts
    // const [fontsLoaded] = useFonts({
    //     black: require('./src/assets/fonts/Mulish-Black.ttf'),
    //     regular: require('./src/assets/fonts/Mulish-Regular.ttf'),
    //     bold: require('./src/assets/fonts/Mulish-Bold.ttf'),
    //     medium: require('./src/assets/fonts/Mulish-Medium.ttf'),
    //     mediumItalic: require('./src/assets/fonts/Mulish-MediumItalic.ttf'),
    //     semiBold: require('./src/assets/fonts/Mulish-SemiBold.ttf'),
    //     semiBoldItalic: require('./src/assets/fonts/Mulish-SemiBoldItalic.ttf'),
    // })
    SplashScreen.hide();
    return (
        // <SafeAreaProvider>
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                }}
                initialRouteName="Walkthrough"
            >
                <Stack.Screen
                    name="BottomTabNavigation"
                    component={BottomTabNavigation}
                />
                <Stack.Screen name="Walkthrough" component={Walkthrough} />
                <Stack.Screen
                    name="Contacts"
                    component={Contacts}
                />
                <Stack.Screen
                    name="Chats"
                    component={Chats}
                />
                <Stack.Screen
                    name="ProfileAccount"
                    component={ProfileAccount}
                />
                <Stack.Screen
                    name="Verification"
                    component={Verification}
                />
                <Stack.Screen name="PhoneNumber" component={PhoneNumber} />
                <Stack.Screen
                    name="PersonalChat"
                    component={PersonalChat}
                />
            </Stack.Navigator>
        </NavigationContainer>
        // </SafeAreaProvider>
    )
}
