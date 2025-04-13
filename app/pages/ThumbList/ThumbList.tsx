import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState, useContext } from 'react'
import { RouteProp, useNavigation, useRoute, NavigationProp } from '@react-navigation/native'
import { LAN_URL } from '../../constansts/config'
import { theme } from '../../constansts/theme'
import { hp, wp } from '../../utils/utils'
import { ConfigContext } from '../../context/ConfigContext.tsx';
const ThumbList = () => {
    const { config, setConfig } = useContext(ConfigContext)!
    const nav = useNavigation<NavigationProp<RootStackParamList>>()
    const route = useRoute<RouteProp<RootStackParamList, 'Thumbs'>>()
    const [thumbList, setThumbList] = useState<string[]>()
    const pageCount = route.params.pageCount
    const arcid = route.params.arcid
    function geneThumbList(arcid: string, pageCount: number) {
        const temp: string[] = []
        for (let i = 0; i < pageCount; i++) {
            temp.push(`http://${config.ip}/api/archives/${arcid}/thumbnail?page=${i + 1}`)
        }
        console.log(temp)
        return temp
    }
    function handleRead(page: number) {
        nav.navigate("Read", {
            arcid,
            page: page
        });
    }
    useEffect(() => {
        const list = geneThumbList(arcid, pageCount)
        setThumbList(list)
    }, [])

    const ThumbEl = ({ item, index }: { item: string, index: number }) => (
        <TouchableOpacity onPress={() => { handleRead(index + 1) }}>
            <View style={{ height: hp(15), width: wp(33) }}>
                <Image resizeMode='contain' style={{ flex: 1 }} source={{ uri: item }}></Image>
                <Text style={{ textAlign: 'center', color: theme.colors.info }}>{index + 1}</Text>
            </View>
        </TouchableOpacity>
    )

    return (
        <View style={{ paddingVertical: 10 }}>
            <FlatList
                data={thumbList}
                horizontal={false}
                numColumns={3}
                renderItem={({ item, index }) => <ThumbEl item={item} index={index} />}
                keyExtractor={item => item}
            />
        </View>
    )
}

export default ThumbList