import { Alert, Button, Dimensions, Image, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { useStripe } from '@stripe/stripe-react-native';
const { height, width } = Dimensions.get('window')

const index = () => {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [loading, setLoading] = useState(false);
  const [payableAmount, setPayableAmount] = useState(1000)

  // for ios
  // const API_URL = "http://localhost:8080"

  // for android
  const API_URL = "http://192.168.1.8:8080"  

  const fetchPaymentSheetParams = async () => {
    const response = await fetch(`${API_URL}/payment-sheet`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount: payableAmount })
    });
    const { paymentIntent, ephemeralKey, customer } = await response.json();

    return {
      paymentIntent,
      ephemeralKey,
      customer,
    };
  };

  const initializePaymentSheet = async () => {
    console.log('press 2')
    const {
      paymentIntent,
      ephemeralKey,
      customer,
    } = await fetchPaymentSheetParams();
   

    const { error } = await initPaymentSheet({
      merchantDisplayName: "Red fort",
      customerId: customer,
      customerEphemeralKeySecret: ephemeralKey,
      paymentIntentClientSecret: paymentIntent,
      // Set `allowsDelayedPaymentMethods` to true if your business can handle payment
      //methods that complete payment after a delay, like SEPA Debit and Sofort.
      allowsDelayedPaymentMethods: true,
      defaultBillingDetails: {
        name: 'Ram Yadav',
      }
    });
    if (!error) {
      setLoading(true);
    }
  };

  const openPaymentSheet = async () => {
    const { error } = await presentPaymentSheet();
    console.log('error pay',error)
    if (error) {
      console.error("Payment Sheet Error:", error);
      Alert.alert(`Error: ${error.code}`, error.message);
    } else {
      Alert.alert('Success', 'Your order is confirmed!');
    }
  };


  const makePayment = async () => {
    await initializePaymentSheet().then(async () => {
      console.log('open payment')
      await openPaymentSheet()
    }).catch((error)=>{
      console.log('eeeeeee',error.message)
    })
  }

  // const makePayment = async () => {
  //   try {
  //     await initializePaymentSheet();
  //     await openPaymentSheet();
  //   } catch (error) {
  //     console.error('Payment error:', error);
  //     Alert.alert('Error', 'Payment failed: ' + error.message);
  //   }
  // };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* <Image source={} /> */}
      <Text style={{
        alignSelf: 'center'
      }}>Buy Quote</Text>

      <View style={{
        backgroundColor: 'white',
        height: height * 0.13,
        width: '90%',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 0 }
      }}>
        <Text>"JUST DO IT DON'T THINK"</Text>
        <Button title='Buy'
           onPress={makePayment} 
          // onPress={async () => {
          //   console.log('press')
          //   await initializePaymentSheet().then(async () => {
          //     await openPaymentSheet()
          //   })
          // }}

        />
      </View>
    </SafeAreaView>
  )
}

export default index

const styles = StyleSheet.create({})