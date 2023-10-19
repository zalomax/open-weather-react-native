import React from 'react'
import { Text, View, ScrollView } from 'react-native'
import styles from './styles';

type MainLayoutType = {
  hasLoading?: boolean;
  children?: any;
};

const MainLayout: React.FC<MainLayoutType> = ({
  hasLoading,
  children,
}) => {

  return hasLoading ? (
    <View style={styles.container}>
      <Text>Loading...</Text>
    </View>
  ) : (
    <View style={styles.container}>
      {children}
    </View>
  )
};

export default MainLayout;
