import {Tabs} from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import '@/global.css'

/**
 * ISSUE EXPLANATION:
 * 
 * The tabs weren't showing at the bottom because:
 * 1. The root layout (app/_layout.tsx) was using a Stack navigator without specifying
 *    which route group to load first (initialRouteName).
 * 2. Without explicit routing, Expo Router defaulted to the first available route - (auth)
 * 3. This caused the sign-up page from (auth) to display instead of the tabs
 * 4. Additionally, each tab screen needs a tabBarIcon property to render - without icons,
 *    the tab bar can appear hidden or not display properly
 * 
 * THE FIX:
 * 1. Root layout now has initialRouteName="(tabs)" to explicitly load tabs first
 * 2. Each tab screen now has tabBarIcon with Ionicons for visual display
 * 3. tabBarActiveTintColor is set to the app's accent color for styling
 */

const TabLayout = () => (
    <Tabs screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#ea7a53', // Accent color when tab is active
    }}>
        <Tabs.Screen 
            name='index' 
            options={{
                title: 'Home',
                tabBarIcon: ({color}) => <Ionicons name='home' size={24} color={color} />
            }} 
        />
        <Tabs.Screen 
            name='subscriptions' 
            options={{
                title: 'Subscriptions',
                tabBarIcon: ({color}) => <Ionicons name='card' size={24} color={color} />
            }} 
        />
        <Tabs.Screen 
            name='insights' 
            options={{
                title: 'Insights',
                tabBarIcon: ({color}) => <Ionicons name='pie-chart' size={24} color={color} />
            }} 
        />
        <Tabs.Screen 
            name='settings' 
            options={{
                title: 'Settings',
                tabBarIcon: ({color}) => <Ionicons name='settings' size={24} color={color} />
            }} 
        />

        <Tabs.Screen name='subscriptions/[id]' options={{ href: null}} />
    </Tabs>
)

export default TabLayout;

// u dont need 'return()' if u use '()' instead of '{}'