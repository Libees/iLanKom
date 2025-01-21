import { View, Text, StatusBar, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useRef } from 'react';
import { TextInputChangeEventData } from 'react-native';
import { NavigationProp, useFocusEffect, useNavigation } from '@react-navigation/native';
import api from '../../api'
import { theme } from '../../constansts/theme';
import ComicCard from './components/ComicCard/ComicCard';
import SearchInput from './components/SearchInput/SearchInput';
import Loading from './components/Loading/Loading';
import Empty from './components/Empty/Empty';
import { LAN_URL } from '../../constansts/config';
import { formatSize, hp, wp } from '../../utils/utils';
import { store } from '../../redux/redux';


const Home = () => {

  const nav = useNavigation<NavigationProp<RootStackParamList>>()
  const isPageEnd = useRef(false)
  const filter = useRef('')
  const start = useRef(0)
  const [test, setText] = useState()
  const [showList, setShowList] = useState(false)
  const [comicList, setComicList] = useState<Comic[]>([])
  const handleComicList = (comicList: Comic[]): Comic[] => {
    if (!Array.isArray(comicList) || comicList.length == 0) return []
    return comicList.map(comic => {
      return {
        ...comic,
        thumbnail: `${LAN_URL}/api/archives/${comic.arcid}/thumbnail`,
        noThumbnail: require('../../assets/images/noThumb.png'),
        sizeText: formatSize(comic.size),
      }
    })
  }
  const handleSearch = ({ nativeEvent }: { nativeEvent: TextInputChangeEventData }) => {
    console.log('开始搜索', nativeEvent.text)
    start.current = 0
    filter.current = nativeEvent.text
    setComicList([])
    // fetchComicList(filter.current)
  }

  const handleEndReached = async () => {
    try {
      await fetchComicList(filter.current, start.current)
      start.current = start.current + 100
    } catch (e) {
    }

  }

  const fetchComicList = async (filter: string = '', start: number = 0, refresh = false) => {
    console.log('fetchComic', filter, start)
    const res = await api.fetchSearch(filter, start)
    console.log('length', res.data.length)
    const temp = handleComicList(res.data)
    isPageEnd.current = (start + temp.length) >= res.recordsFiltered
    setComicList([...comicList, ...temp])
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
    filter.current = ''
    start.current = 0
    if (showList) {
      handleEndReached()
      setText(store.getState())
    }
  }, [showList])

  useFocusEffect(
    React.useCallback(() => {
      console.log('useEffect------------')
      store.getState().ip ? setShowList(true) : setShowList(false)
      filter.current = ''
      start.current = 0
      return () => {
        console.log('out')
      };
    }, [])
  );


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
          ListFooterComponent={(
            < View style={{ marginVertical: comicList.length === 0 ? 200 : 4 }}>
              {!isPageEnd.current && <Loading loadingText='加载中'></Loading>}
              {isPageEnd.current && <View style={{ flex: 1 }}><Empty></Empty></View>}
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