import { View, ScrollView, StyleSheet, Text, VirtualizedList, NativeSyntheticEvent, NativeScrollEvent } from 'react-native'
import React, { useEffect, useState, useRef, useCallback, ReactElement } from 'react'
import { RouteProp, useFocusEffect, useRoute } from '@react-navigation/native'
import ComicPic from './ComicPic'
import api from '../../api/index'
import { LAN_URL } from '../../constansts/config'
import { ViewToken } from 'react-native'
import { hp } from '../../utils/utils'

interface pageType {
    pageIndex: number,
    isVisit: boolean,
    pageSource: string,
    dataPage: string
}

const Read = () => {
    const route = useRoute<RouteProp<RootStackParamList, 'Read'>>()
    const params = route.params
    const arcid = params?.arcid || ''
    let pageCount = useRef(0)
    const progressPage = useRef(params.page)
    const listRef = useRef<VirtualizedList<{ value: string }>>(null);
    const [scrollToIndex, setScrollToIndex] = useState<number | null>(null)
    const [comicPages, setComicPages] = useState<string[]>()
    function getComicPages(arcid: string) {
        if (!arcid) return []
        api.getComicPages(arcid).then(res => {
            if (res.pages.length === 0) return
            pageCount.current = res.pages.length
            setComicPages(res.pages.map(page => {
                return `${LAN_URL}${page}`
            }))
            setScrollToIndex(params.page as number)
        })
    }

    const scrollToItem = (page: number) => {
        if (page === 0) return
        console.log('scroollTiem', page)
        if (listRef.current) {
            listRef.current?.scrollToIndex({
                animated: false,      // 是否使用动画，默认为 true
                index: page - 1,        // 要滚动到的索引
                viewPosition: 0.5,   // 视图位置，0: 顶部, 1: 底部, 0.5: 中间，默认为 
            });
        }
    };
    function recordProgress(arcid: string, page: number) {
        api.putReadProgress(arcid, page).then(res => {
            console.log('resss', res)
        })
    }
    const viewabilityConfig = useRef({
        itemVisiblePercentThreshold: 70 // 项目 70% 可见时触发
    }).current;
    function getComicItem(data: string, index: number) {
        return {
            source: data[index],
            page: index + 1,
            key: index + 1
        }
    }

    function onViewableItemsChanged({ viewableItems }: { viewableItems: ViewToken[] }) {
        if (viewableItems.length === 0) return
        const lastItem = viewableItems[viewableItems.length - 1]
        if (progressPage.current === lastItem.item.page) return
        progressPage.current = lastItem.item.page
        recordProgress(arcid, progressPage.current as number)
    }

    const getItemLayout = (data: any, index: number) => {
        return { length: hp(65), offset: hp(65) * index, index }
    }
    useEffect(() => {
        console.log('xxxxxxxxxxx')
        recordProgress(arcid, params.page as number)
        getComicPages(arcid)
        console.log('xxxxxxxxxxx')
    }, [])

    useEffect(() => {

        if (scrollToIndex !== null && listRef.current && comicPages && comicPages.length > 0) {
            console.log('useEffect------------------------1')
            setTimeout(() => {
                scrollToItem(scrollToIndex)
            }, 100)
            setScrollToIndex(null); // 滚动后重置，防止重复滚动
            console.log('useEffect------------------------2')

        }
    }, [comicPages, scrollToIndex, progressPage]);

    return (
        <VirtualizedList
            ref={listRef}
            data={comicPages}
            initialNumToRender={4}
            renderItem={({ item }) => <ComicPic page={item.source}></ComicPic>}
            keyExtractor={(item) => item.source}
            getItemCount={() => comicPages?.length || 0}
            getItem={getComicItem}
            maxToRenderPerBatch={3}
            windowSize={3}
            contentContainerStyle={styles.container}
            onViewableItemsChanged={onViewableItemsChanged}
            viewabilityConfig={viewabilityConfig}
            onScrollToIndexFailed={() => { console.log('onScrollToIndexFailed------------------') }}
            getItemLayout={getItemLayout}
        />
    )
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#323232',
    },
});
export default Read