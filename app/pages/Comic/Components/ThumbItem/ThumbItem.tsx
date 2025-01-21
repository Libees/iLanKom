import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native'
import React from 'react'
import { useNavigation, NavigationProp } from '@react-navigation/native'
import { hp, wp } from '../../../../utils/utils'
import { theme } from '../../../../constansts/theme'
const ThumbItem = ({ thumList, arcid }: { thumList: string[], arcid: string }) => {
    const nav = useNavigation<NavigationProp<RootStackParamList>>()
    if (thumList.length === 0) return null
    function handleRead(arcid: string, page: number) {
        nav.navigate("Read", {
            arcid,
            page: page
        });
    }
    return (
        <View style={styles.thumPrevWrap}>
            {thumList?.map((el, index) => (
                <View key={el}>
                    <TouchableOpacity onPress={() => { handleRead(arcid, index + 1) }}>
                        <Image resizeMode='contain' style={styles.thumPrev} alt={`${index + 1}`} source={{ uri: el }}></Image>
                        <View><Text style={{ textAlign: 'center', fontSize: hp(1.5), color: theme.colors.info }}>{index + 1}</Text></View>
                    </TouchableOpacity>
                </View>
            ))}

        </View>
    )
}

const styles = StyleSheet.create({
    thumPrevWrap: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
        justifyContent: 'center',
        marginTop: 15
    },
    thumPrev: {
        width: wp(30),
        height: hp(20)
    },
    line: {
        height: 1,
        width: wp(90),
        backgroundColor: theme.colors.bgSecond
    }
})

export default ThumbItem