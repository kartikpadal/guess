import {Tabs} from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import {tabs} from '@/constants/data'
import {colors, components} from '@/constants/theme'
import {View} from 'react-native'
import {Image} from 'react-native'
import clsx from 'clsx'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
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


const tabBar = components.tabBar;

const TabLayout = () => {
    const insets = useSafeAreaInsets();

    const TabIcon = ({focused, icon}: TabIconProps) => {
        return(
            <View className="tabs-icon">
                    <View className={clsx('tabs-pill', focused && 'tabs-active')}>
                          <Image source={icon} resizeMode="contain" className="tabs-glyph"/>
                    </View>
            </View>
        )
    }

    return(
        <Tabs 
            screenOptions={{ 
                headerShown: false ,
                tabBarShowLabel: false,
                tabBarStyle: {
                        position: 'absolute',
                        bottom: Math.max(insets.bottom, tabBar.horizontalInset),
                        height: tabBar.height,
                        marginHorizontal: tabBar.horizontalInset,
                        borderRadius: tabBar.radius,
                        backgroundColor: colors.primary,
                        borderTopWidth: 0,
                        elevation: 0,
                },
                tabBarItemStyle: {
                    paddingVertical: tabBar.height / 2 - tabBar.iconFrame / 1.6
                },
                tabBarIconStyle: {
                    width: tabBar.iconFrame,
                    height: tabBar.iconFrame,
                    alignItems: 'center'
                }   
            }}>


            {tabs.map((tab) => (
                <Tabs.Screen 
                    key={tab.name} 
                    name={tab.name} 
                    options={{
                            title: tab.title,
                            tabBarIcon: ({focused}) => (
                                <TabIcon focused={focused} icon={tab.icon}/>
                            )  
                    }}
                />
            ))}
        </Tabs>
    )
}

export default TabLayout;

// u dont need 'return()' if u use '()' instead of '{}'