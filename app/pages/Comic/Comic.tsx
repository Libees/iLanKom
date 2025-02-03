import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { NavigationProp, useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';
import ThumbItem from './Components/ThumbItem/ThumbItem';
import { hp, wp, formatTimeStamp, parseKeyValueString, formatSize } from '../../utils/utils';
import { theme } from '../../constansts/theme';
import { LAN_URL } from '../../constansts/config';
import api from '../../api/index';

const lineEl = () => {

    return (
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ backgroundColor: theme.colors.line, height: 1, width: wp(90) }}></View>
        </View>
    )
}

const tagItems = (items: string | string[]) => {
    if (!Array.isArray(items)) {
        return (
            <View >
                <Text style={styles.tagKey}>{items}</Text>
            </View>
        )
    }
    const res = items.map(el => {
        return (
            <View key={el}><Text style={styles.tagKey}>{el}</Text></View>
        )
    })
    return res
}
const TagsGroup = (tagsMap: { [key: string]: string } | null) => {
    if (!tagsMap) return
    if (typeof tagsMap !== 'object') return
    let keys = Object.keys(tagsMap)
    keys = keys.filter(key => {
        return !['date_added', 'timestamp', 'source'].includes(key)
    })
    return (
        keys.map(key => {
            return (
                <View key={key} style={styles.tagGroup}>
                    <View style={styles.tagsleft} >
                        <View >
                            <Text style={styles.tagName} >{key}</Text>
                        </View>
                    </View>
                    <View style={styles.tagsRight}>
                        {tagItems(tagsMap[key])}
                    </View>
                </View>
            )
        })
    )
}



const Comic = () => {
    const route = useRoute<RouteProp<RootStackParamList>>()
    const nav = useNavigation<NavigationProp<RootStackParamList>>()
    const arcid = route?.params?.arcid || ''
    const [loading, setLoading] = useState(true)
    const [comicMetadata, setComicMetadata] = useState<Comic | null>(null)
    const [thumbnailList, setThumbnailList] = useState<string[]>([])
    const geneThumbList = async (arcid: string, pageCount: number) => {
        if (!pageCount) return []
        let thumbStatus = await api.getHasThumbnails(arcid)
        function setThumb() {
            let temp: string[] = []
            pageCount = pageCount > 20 ? 20 : pageCount
            for (let i = 0; i < pageCount; i++) {
                temp.push(`${LAN_URL}/api/archives/${arcid}/thumbnail?page=${i + 1}`)
            }
            setThumbnailList(temp)
        }
        if (thumbStatus?.message && thumbStatus?.message?.includes('exist') && pageCount) {
            setThumb()
        } else {
            console.log('setTimeOut')
            setTimeout(async () => {
                let thumbStatus = await api.getHasThumbnails(arcid)
                if (thumbStatus?.message && thumbStatus?.message?.includes('exist') && pageCount) {
                    setThumb()
                }
            }, 1200)
        }
    }
    const getComicMetaData = async () => {
        try {

            api.getComicMetadata(arcid).then(res => {
                if (!res) return
                const temp = {
                    ...res,
                    tagsMap: res.tags ? parseKeyValueString(res.tags) : null,
                    thumbnail: `${LAN_URL}/api/archives/${res.arcid}/thumbnail`,

                }
                geneThumbList(arcid, temp.pagecount as number)
                setComicMetadata(temp)
                setLoading(false)
            })
        } catch (e) {
            console.log('eeeeeeeee', e)
        } finally {

        }
    }
    function handleRead(arcid: string, page = 0) {
        nav.navigate("Read", {
            arcid,
            page: page
        });
    }
    function handleThumbList() {
        const page = comicMetadata?.pagecount || 0
        nav.navigate('Thumbs', {
            arcid: arcid,
            pageCount: Number(page)
        })
    }

    useFocusEffect(
        React.useCallback(() => {
            getComicMetaData()
            return () => {
                console.log('out')
            };
        }, [])
    );
    return (
        <ScrollView scrollEnabled={!loading}>
            <View style={{ backgroundColor: theme.colors.bg }}>
                <View style={styles.header}>
                    <Image style={styles.thumb} source={{
                        uri: comicMetadata?.thumbnail

                    }} resizeMode='contain' alt="封面" />
                    <View style={styles.container} >
                        <Text style={{ ...styles.text, ...styles.title }} numberOfLines={3} ellipsizeMode='tail'>{comicMetadata?.title || comicMetadata?.filename}</Text>
                        <Text style={styles.text}>作者：{comicMetadata?.tagsMap?.artist}</Text>
                        <Text style={styles.text}>添加时间：{comicMetadata?.tagsMap?.date_added ? formatTimeStamp(comicMetadata?.tagsMap?.date_added) : '暂无'}</Text>
                    </View>

                </View>
                <View style={styles.btnWrap}>
                    <TouchableOpacity onPress={() => { handleRead(arcid, (comicMetadata?.progress || 0)) }}>
                        <View style={styles.readBtn}>
                            <Text style={styles.btn}>阅读</Text>
                        </View>
                    </TouchableOpacity>

                </View>
                <View style={styles.info}>
                    <View><Text>页数：{`${comicMetadata?.progress}/${comicMetadata?.pagecount}`}P</Text></View>
                    <View><Text>大小：{formatSize(comicMetadata?.size)}</Text></View>

                </View>
                <View style={{ ...styles.info, marginBottom: 15 }}>
                    <Text>来源：{comicMetadata?.tagsMap?.source || '未知'}</Text>
                </View>
                <View style={{ marginBottom: 10 }}>
                    {TagsGroup(comicMetadata?.tagsMap)}
                </View>
                {lineEl()}
                <View>
                    {
                        thumbnailList && <ThumbItem arcid={arcid} thumList={thumbnailList}></ThumbItem>
                    }
                    {
                        comicMetadata?.pagecount as number > 20 ? (
                            <TouchableOpacity onPress={handleThumbList}>
                                <Text style={{ color: theme.colors.special, textAlign: 'center', marginBottom: 10 }}>查看更多预览</Text>
                            </TouchableOpacity>
                        ) : null
                    }
                </View>
            </View >
        </ScrollView >

    )
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: theme.colors.primary,
        flexDirection: 'row',
        height: hp(26),
        paddingTop: hp(2),
        paddingHorizontal: hp(1)
    },
    thumb: {
        width: wp(28),
        height: hp(17),
        borderRadius: theme.radius.md
    },
    container: {
        flex: 1,
        borderStyle: 'solid',
        paddingHorizontal: 4
    },
    title: {
        fontSize: hp(2),
    },
    text: {
        color: theme.colors.textH,
        marginTop: hp(0.6)
    },
    btnWrap: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: -hp(2.5)
    },
    readBtn: {
        width: wp(90),
        height: hp(5),
        backgroundColor: theme.colors.textH,
        borderRadius: theme.radius.sm,
        boxShadow: '0 1 1 1 rgba(0,0,0,0.1)'
    },
    btn: {
        textAlign: 'center',
        fontSize: hp(2),
        lineHeight: hp(5),
        color: theme.colors.special,

    },
    info: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: wp(6),
        marginVertical: hp(0.6),

    },
    tagGroup: {
        flexDirection: 'row',
        marginBottom: hp(1.2)
    },
    tagsleft: {
        width: wp(30),
        paddingRight: 8,
        justifyContent: 'flex-start',
        alignItems: 'flex-end'
    },
    tagsRight: {
        flex: 1,
        flexWrap: 'wrap',
        flexDirection: 'row',
        gap: 10
    },

    tagName: {
        fontSize: hp(1.8),
        backgroundColor: theme.colors.special,
        textAlign: 'center',
        color: theme.colors.textH,
        paddingHorizontal: hp(1.2),
        borderRadius: 16,
        lineHeight: hp(3),
    },

    tagKey: {
        backgroundColor: theme.colors.primary,
        color: theme.colors.textH,
        paddingHorizontal: hp(1.2),
        lineHeight: hp(3),
        borderRadius: 16,
        fontSize: hp(1.8),
    }
})

export default Comic