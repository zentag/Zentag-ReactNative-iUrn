import { Text, View, } from 'react-native';
import {useTailwind} from 'tailwind-rn';
import RandomImage from '../components/RandomImage';
import { UserNdefParams } from '../types';

export default function MemorialWall({ params }: { params: UserNdefParams }) {
const tailwind = useTailwind()
return (
<View>
    <RandomImage imgSource={null}/>
</View>
);
}

