import { View, TouchableOpacity, TextInput, StyleSheet, TextInputProps } from 'react-native'
import React from 'react'
import { hp } from '../../../../utils/utils'
import { theme } from '../../../../constansts/theme'
import Icon from '../../../../assets/icons'
//导入react-navigation的类型
import { useNavigation, NavigationProp } from '@react-navigation/native'



const SearchInput = (props: TextInputProps) => {
  const nav = useNavigation<NavigationProp<RootStackParamList>>()
  function handleClick() {
    nav.navigate("Config");
  }
  return (
    <View style={styles.container}>
      <View style={{ paddingLeft: 5, paddingRight: 5 }}>
        <TouchableOpacity onPress={handleClick}>
          <Icon name='list' size="20" strokeWidth={1} color={'#6f6f6f'} ></Icon>
        </TouchableOpacity>
      </View>
      <TextInput
        style={{ flex: 1, fontSize: hp(1.8), height: 100 }}
        {...props}
      ></TextInput>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: hp(5),
    backgroundColor: theme.colors.bgSecond,
    boxShadow: '-1 1 1 1 rgba(0,0,0,0.1)',
    alignItems: 'center'
  }
})

export default SearchInput