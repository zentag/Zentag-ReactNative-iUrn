import { Text, View, } from '../components/Themed';
import {useTailwind} from 'tailwind-rn';
import RandomImage from '../components/RandomImage';

export default function MemorialWall() {
const tailwind = useTailwind()
return (
<View>
    <RandomImage imgSource={null}/>
</View>
);
}

