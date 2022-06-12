import { Button, StyleSheet, Image } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View, } from '../components/Themed';
import {useTailwind} from 'tailwind-rn';
import { RootTabScreenProps } from '../types';

export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  const tailwind = useTailwind()
  return (
    
    <View>
      <View>
        <Text>iUrn</Text>
      </View>
      <View>
        <Image style={tailwind("w-64 h-64")} source={require('../assets/images/placeholder.png')}/>
        <Text>Please hold the iUrn NFC tag close to the phone.</Text>
        <Button title='Scan an iUrn Tag'/>
      </View>
    </View>
  );
}

