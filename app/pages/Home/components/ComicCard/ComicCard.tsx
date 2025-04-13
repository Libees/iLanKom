import { View, Text, Image, StyleSheet } from 'react-native';
import React from 'react';
import { NativeSyntheticEvent, ImageErrorEventData } from 'react-native';
import { theme } from '../../../../constansts/theme';
import { hp, parseKeyValueString } from '../../../../utils/utils';
const ComicCard = ({ comic }: { comic: Comic }) => {
  const defaultImageUri = comic?.thumbnail
  const tags = parseKeyValueString(comic?.tags)
  function handleError(err: NativeSyntheticEvent<ImageErrorEventData>) {

  }
  return (
    <View style={styles.comicWrap}>
      <Image alt='封面'
        style={styles.thumb} source={{
          uri: defaultImageUri
        }}
        resizeMode='contain'
        onError={handleError} />
      <View style={styles.container}>
        <Text style={styles.title} numberOfLines={2} ellipsizeMode='tail'>{comic.title}</Text>
        <Text style={styles.info} selectable={true}>页数：{comic.pagecount}P 大小：{comic.sizeText}</Text>
        <Text style={styles.info} selectable={true}>作者：{tags?.artist ? tags.artist : tags?.group ? tags.group : '未知'}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  comicWrap: {
    flexDirection: 'row',
    backgroundColor: theme.colors.bgSecond,
    borderRadius: theme.radius.sm,
    borderWidth: 0.5,
    borderColor: 'rgba(0,0,0,0.1)',
    borderStyle: 'solid',
    boxShadow: '0 1 1 1 rgba(0,0,0,0.1)'
  },
  thumb: {
    width: 100,
    height: 100
  },
  container: {
    flex: 1,
    padding: 2
  },
  title: {
    fontSize: hp(1.62),
    color: theme.colors.textD
  },
  info: {
    color: theme.colors.info,
    fontSize: hp(1.5),
    marginTop: 3
  }
})

export default ComicCard