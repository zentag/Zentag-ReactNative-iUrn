import { Button, Image } from 'react-native';

import { Text, View, } from '../components/Themed';
import { Alert } from 'react-native';
import {useTailwind} from 'tailwind-rn';

export default function ScanScreen({navigation}) {
  const tailwind = useTailwind()
  return (
    
    <View>
      <View>
        <Text>iUrn</Text>
      </View>
      <View>
        <Image style={tailwind("w-60 h-60")} source={require('../assets/images/placeholder.png')}/>
        <Text>Please hold the iUrn NFC tag close to the phone.</Text>
        <Button onPress={() => {
          Alert.alert(
            "Continue to page?",
            "View the memories of John Doe",
            [
              {
                text: "Stay here",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
              },
              { text: "Yes", onPress: () => navigation.navigate("Lorem Ipsum") }
            ]
          );
        }} title='Scan an iUrn Tag'/>
      </View>
    </View>
  );
}

