import react from 'react';
import { View, Image } from 'react-native';
import StylizedText from '@common/StylizedText';
import Avatar from '@common/Avatar';

interface ListCardProps {
    title: string;
    items: { icon?: any; label: string; value: string }[]; // Array of info items with optional icons
    avatar?: any; // Optional avatar for cases like profile pictures or icons
    layout?: 'horizontal' | 'vertical'; // Optional layout prop for flexibility
    splitRatio?: '2:8' | '8:2'; // Allows for 2:8 or 8:2 splits in horizontal layout
  }
  
  // General Info Card Component
export const ListCard: React.FC<ListCardProps> = ({ title, items, avatar, layout = 'vertical', splitRatio = '2:8' }) => {
    const titleWidth = splitRatio === '2:8' ? 'w-2/8' : 'w-8/8';
    const contentWidth = splitRatio === '2:8' ? 'w-8/8' : 'w-2/8';

    return (
        <View className={`p-4 ${layout === 'horizontal' ? 'flex-row items-center space-x-4' : 'space-y-3'}`}>
        {layout === 'horizontal' && avatar && <Avatar size={50} source={avatar} className="mr-4" />}
        
        <View className={layout === 'horizontal' ? titleWidth : ''}>
            <StylizedText type="header1" styleClass="text-black mb-2">{title}</StylizedText>
        </View>

        <View className={layout === 'horizontal' ? contentWidth : ''}>
            {items.map((item, index) => (
            <ListItem key={index} iconSource={item.icon} label={item.label} value={item.value} />
            ))}
        </View>
        </View>
    );
  };
  
  // Info Item Component
const ListItem: React.FC<{ iconSource?: any; label: string; value: string }> = ({ iconSource, label, value }) => (
    <View className="flex-row items-center space-x-3 mb-1">
        {iconSource && <Image source={iconSource} style={{ width: 16, height: 16 }} />}
        <View className='flex-row'>
        <StylizedText type="body2" styleClass="text-black ml-2">
        {label}:
        </StylizedText>
        <StylizedText type="body2" styleClass="text-black ml-2">
        {value}
        </StylizedText>
        </View>
    </View>
);
  
export default ListCard;