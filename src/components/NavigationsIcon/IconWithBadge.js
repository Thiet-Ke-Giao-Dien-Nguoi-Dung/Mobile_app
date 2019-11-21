import React from 'react';
import {Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Octicons';

export default class IconWithBadge extends React.Component {
  render() {
    const {name, badgeCount, color, size} = this.props;
    return (
      <View style={{width: 25, height: 30, margin: 10}}>
        <Icon name={name} size={size} color={color} />
        {badgeCount > 0 && (
          <View
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              position: 'absolute',
              right: -6,
              top: 2,
              backgroundColor: '#334CFF',
              borderRadius: 6,
              width: 12,
              height: 12,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{color: 'white', fontSize: 10, fontWeight: 'bold'}}>
              {badgeCount}
            </Text>
          </View>
        )}
      </View>
    );
  }
}
