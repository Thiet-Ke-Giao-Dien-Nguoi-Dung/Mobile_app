/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {Text, View, StyleSheet, SafeAreaView, ScrollView} from 'react-native';
import {Block} from '../../components';
import * as theme from '../../components/theme';
import LinearGradient from 'react-native-linear-gradient';

export default class Home extends Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.scrollView}>
          <Block column>
            <LinearGradient
              colors={['#FFAA00', '#FF9700', '#FFAA00']}
              start={{x: 0.0, y: 0.0}}
              end={{x: 1.0, y: 1.0}}>
              <Block
                flex={false}
                row
                style={{
                  paddingVertical: 15,
                  height: 120,
                }}>
                <Block center>
                  <Text h3 white center>
                    Xin chào
                  </Text>
                </Block>
              </Block>
            </LinearGradient>

            <Block
              flex={false}
              color="white"
              style={{paddingHorizontal: 14, height: 250}}>
              <Block flex={0.4} row space="between" style={styles.blockShadow}>
                <Block center row space="between">
                  <Text center>show thông số</Text>
                </Block>
              </Block>
              <Block flex={0.6} center>
                <Block center row space="between">
                  <Block center row space="between">
                    <Text center>Button 1</Text>
                  </Block>
                  <Block center row space="between">
                    <Text center>Button 2</Text>
                  </Block>
                  <Block center row space="between">
                    <Text center>Button 3</Text>
                  </Block>
                  <Block center row space="between">
                    <Text center>Button 4</Text>
                  </Block>
                </Block>
              </Block>
            </Block>
            <Block color="white" style={{height: 15}}>
              <Block
                flex={1}
                style={{
                  backgroundColor: '#F0F0F0',
                }}
              />
              <Block center />
            </Block>
          </Block>
          <Block
            center
            style={{
              height: 1000,
            }}
          />
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    overflow: 'scroll',
  },
  safe: {
    flex: 1,
    backgroundColor: theme.colors.primary,
  },
  headerChart: {
    paddingTop: 30,
    paddingBottom: 30,
    zIndex: 1,
  },
  avatar: {
    width: 25,
    height: 25,
    borderRadius: 25 / 2,
    marginRight: 5,
  },
  requests: {
    marginTop: -55,
    paddingTop: 55 + 20,
    paddingHorizontal: 15,
    zIndex: -1,
  },
  requestsHeader: {
    paddingHorizontal: 20,
    paddingBottom: 15,
  },
  request: {
    padding: 20,
    marginBottom: 15,
  },
  requestStatus: {
    marginRight: 20,
    overflow: 'hidden',
    height: 90,
  },
  blockShadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    marginTop: -70,
    backgroundColor: '#FFF',
    borderRadius: 7,
  },
});
