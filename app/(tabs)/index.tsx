import "@/global.css"
import { Text, View, Image } from "react-native";
// removed unused Link import from expo-router
import images from "@/constants/images";
import { HOME_USER, HOME_BALANCE, UPCOMING_SUBSCRIPTIONS, HOME_SUBSCRIPTIONS } from "@/constants/data";
import {icons} from "@/constants/icons";
import {formatCurrency} from "@/lib/utils";
import dayjs from 'dayjs';
import { FlatList } from "react-native";
import ListHeading from "@/components/ListHeading";
import UpcomingSubscriptionCard from "@/components/UpcomingSubscriptionCard";
import SubscriptionCard from "@/components/SubscriptionCard";
import { SafeAreaView as RNSafeAreaView} from "react-native-safe-area-context";
import { styled } from "nativewind";
import { useState } from "react";


const SafeAreaView = styled(RNSafeAreaView);
 
export default function App() {

  const [expandedSubscriptionId, setExpandedSubscriptionId] = useState<string | null>(null);
  return (
    <SafeAreaView className="flex-1 bg-background p-5">
      <View className="home-header">
        <View className="home-user">
          <Image source={images.avatar} className="home-avatar"/>
          <Text className="home-user-name">{HOME_USER.name}</Text>
        </View>

        <Image source={icons.add} className="home-add-icon"/>
      </View>

      <View className="home-balance-card">
        <Text className="home-balance-label">Balance</Text>

        <View className="home-balance-row">
          <Text className="home-balance-amount">
              {formatCurrency(HOME_BALANCE.amount)}
          </Text>
          <Text className="home-balance-date">
              {dayjs(HOME_BALANCE.nextRenewalDate).format('DD/MM')}
          </Text>
        </View>
      </View>
      
      <View >
          <ListHeading title="Upcoming"/>

            {/* This flatlist here is used for rendering the upcoming subscriptions in a horizontal scrollable list. 
            It takes the UPCOMING_SUBSCRIPTIONS data and maps each item to an UpcomingSubscriptionCard component, 
            passing the item properties as props. The keyExtractor ensures each item has a unique key based on its id. 
            If there are no upcoming subscriptions, it displays a message indicating that there are no upcoming renewals yet. */}
          <FlatList 
                data={UPCOMING_SUBSCRIPTIONS}
                renderItem={({item}) => (<UpcomingSubscriptionCard {...item}/>)}
                keyExtractor={(item) => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                ListEmptyComponent={<Text className="home-empty-state">No upcoming renewls yet.</Text>}
          />
      </View>
      
      <View className="flex-1">
          <ListHeading title="All subscriptions"/>
          
          <FlatList 
               data={HOME_SUBSCRIPTIONS}
               keyExtractor={(item) => item.id}
               renderItem={({item} ) => (
                   <SubscriptionCard 
                       {...item}
                       expanded={expandedSubscriptionId === item.id}
                       onPress={() => setExpandedSubscriptionId((currentId) => 
                       (currentId === item.id ? null : item.id))}
                    />
                )}
                extraData={expandedSubscriptionId}
                ItemSeparatorComponent={() => <View className="h-4"/>}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={<Text className='home-empty-state'>No
                subscriptions yet. </Text>}
          />    
      </View>

    </SafeAreaView>
  );
}

