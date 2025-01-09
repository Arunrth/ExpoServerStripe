import { Stack } from "expo-router";
import { StripeProvider } from '@stripe/stripe-react-native';

const PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_API_KEY
console.log(PUBLISHABLE_KEY)

const Layout = () => {
    if(!PUBLISHABLE_KEY) {
        console.log('Stripe publishable key is missing. Check your .env file.')
        return null
    }
    return (
        <StripeProvider publishableKey={PUBLISHABLE_KEY}>
            <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="index" />
            </Stack>
        </StripeProvider>

    )
}

export default Layout