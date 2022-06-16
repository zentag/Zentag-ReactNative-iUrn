import { Button, StyleSheet, Image } from 'react-native';

import scanAsUser from '../functions/scanAsUser';
import { Text, View, } from '../components/Themed';
import {useTailwind} from 'tailwind-rn';

export default function HomeScreen() {
  const tailwind = useTailwind()
  return (
    
    <View>
      <View>
        <Text>iUrn</Text>
      </View>
      <View>
        <Image style={tailwind("w-60 h-60")} source={require('../assets/images/placeholder.png')}/>
        <Text>Please hold the iUrn NFC tag close to the phone.</Text>
        <Button onPress={scanAsUser} title='Scan an iUrn Tag'/>
      </View>
    </View>
  );
}

