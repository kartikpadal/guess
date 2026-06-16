import "@/global.css"
import { View, Text } from 'react-native'
import { Link } from "expo-router"

import { SafeAreaView as RNSafeAreaView} from "react-native-safe-area-context";
import { styled } from "nativewind";

const SafeAreaView = styled(RNSafeAreaView);

const SignIn = () => {
  return (
    <SafeAreaView>
      <Text>Sign In</Text>
      <Link href="/(auth)/sign-up">Create account</Link>
    </SafeAreaView>
  )
}

export default SignIn;