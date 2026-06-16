import "@/global.css"
import { View, Text } from 'react-native'
import { Link } from 'expo-router'

import { SafeAreaView as RNSafeAreaView} from "react-native-safe-area-context";
import { styled } from "nativewind";

const SafeAreaView = styled(RNSafeAreaView);

const SignUp = () => {
  return (
    <SafeAreaView>
      <Text>Sign Up</Text>
      <Link href="/(auth)/sign-in">Sign In</Link>
    </SafeAreaView>
  )
}

export default SignUp;