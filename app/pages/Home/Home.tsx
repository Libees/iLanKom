import { View, Text, StatusBar, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { useRef } from 'react';
import { TextInputChangeEventData } from 'react-native';
import { NavigationProp, useFocusEffect, useNavigation } from '@react-navigation/native';

import api from '../../api'
import { theme } from '../../constansts/theme';
import ComicCard from './components/ComicCard/ComicCard';
import SearchInput from './components/SearchInput/SearchInput';
import Loading from './components/Loading/Loading';
import { formatSize, hp, wp } from '../../utils/utils';
import { CONFIG_STORAGE_KEY } from '../../constansts/config.ts'
import storage from '../../utils/storage';
import { ConfigContext } from '../../context/ConfigContext.tsx';


const Home = () => {
  const nav = useNavigation<NavigationProp<RootStackParamList>>()
  const isPageEnd = useRef(false)
  const filter = useRef('')
  const startRef = useRef(0)
  const [error, setError] = useState<any>('')
  const { config, setConfig } = useContext(ConfigContext)!
  const preConfigRef = useRef<IConfig>({ ip: '', auth: '' })
  const [showList, setShowList] = useState(false)
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [comicList, setComicList] = useState<Comic[]>([])
  const handleComicList = (comicList: Comic[]): Comic[] => {
    if (!Array.isArray(comicList) || comicList.length == 0) return []
    return comicList.map(comic => {
      return {
        ...comic,
        thumbnail: `http://${config.ip}/api/archives/${comic.arcid}/thumbnail`,
        noThumbnail: require('../../assets/images/noThumb.png'),
        sizeText: formatSize(comic.size),
      }
    })
  }

  const InitSearch = () => {
    setHasMore(true)
    setLoading(false)
    filter.current = ''
    startRef.current = 0
  }

  const handleSearch = ({ nativeEvent }: { nativeEvent: TextInputChangeEventData }) => {
    console.log('开始搜索', nativeEvent.text)
    setHasMore(true)
    startRef.current = 0
    filter.current = nativeEvent.text
    setComicList([])
  }

  const handleEndReached = async () => {
    console.log('handleEndReached')
    if (!hasMore) return false
    if (loading) return false
    try {
      await fetchComicList(filter.current, startRef.current)
    } catch (e) {
      console.log('handelEnd-----')
      setError(e)
    }
  }

  const fetchComicList = async (filter: string = '', start: number = 0) => {
    try {
      console.log('fetchComic', filter, start)
      setLoading(true)
      const res = await api.fetchSearch(filter, start)
      const temp = handleComicList(res.data)
      isPageEnd.current = (start + temp.length) >= res.recordsFiltered
      console.log('isPageEnd', isPageEnd)
      isPageEnd.current ? setHasMore(false) : setHasMore(true)
      startRef.current = startRef.current + 100
      setComicList([...comicList, ...temp])
    } catch (e) {
      setHasMore(false)
      setComicList([])
    } finally {
      setLoading(false)
    }

  }

  const handelComicPress = (comic: Comic) => {
    console.log('comic', comic.arcid)
    nav.navigate("Comic", {
      arcid: comic.arcid
    })
  }

  const handConfig = () => {
    nav.navigate("Config");
  }

  useEffect(() => {
    console.log('first useEffect')
    storage.load({
      key: CONFIG_STORAGE_KEY,
    }).then(res => {
      console.log('res', res)
      setConfig(res)
    })
  }, [])

  useEffect(() => {
    config?.ip ? setShowList(true) : setShowList(false)
    if (!config.ip) return
    console.log('preConfigRef', preConfigRef.current)
    if (preConfigRef.current.ip !== config.ip || preConfigRef.current.auth !== config.auth) {
      console.log('config change')
      InitSearch()
      fetchComicList()
    }
    preConfigRef.current = config
  }, [config])

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={theme.colors.primary} barStyle="default"></StatusBar>
      <View>
        <SearchInput
          placeholder='以标题、艺术家、系列、语言或者标签来搜索'
          enterkeyhint='search'
          onSubmitEditing={handleSearch}
        />
      </View>
      {!showList &&
        <TouchableOpacity onPress={handConfig}>
          <View style={{ height: hp(80), width: wp(100), justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: hp(2), color: theme.colors.primary }}>点击进行配置</Text>
          </View>
        </TouchableOpacity>
      }
      {showList && <View style={{ marginTop: 10, flex: 1 }}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={comicList}
          renderItem={({ item }) => {
            return (<View style={{ marginBottom: 10 }}>
              <TouchableOpacity onPress={() => handelComicPress(item)}>
                <ComicCard comic={item}></ComicCard>
              </TouchableOpacity>
            </View>)
          }}
          keyExtractor={item => item.arcid}
          onEndReached={handleEndReached}
          onEndReachedThreshold={0}
          ListEmptyComponent={() => (<View style={{ height: hp(82), width: '100%', justifyContent: 'center', alignItems: 'center' }}>{!loading && <Text style={{ color: theme.colors.primary }}>数据为空</Text>}</View>)}
          ListFooterComponent={() => (
            loading && hasMore && < View style={{ marginVertical: comicList.length === 0 ? 200 : 4 }}>
              {!isPageEnd.current && <Loading loadingText='加载中'></Loading>}

            </View>
          )}
        />

      </View>}
    </View >
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 1,
    borderStyle: 'solid',
    padding: 8,
    backgroundColor: '#FFF'
  }
})
export default Home