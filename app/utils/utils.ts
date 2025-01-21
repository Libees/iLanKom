import { Dimensions } from "react-native";
import dayjs from "dayjs";
export let { width: deviceWidth, height: deviceHeight } = Dimensions.get('window')

export let hp = (percentage: number): number => {
  return (percentage * deviceHeight) / 100
}

export let wp = (percentage: number): number => {
  return (percentage * deviceWidth) / 100
}

export function formatSize(b: number | null | undefined): string {
  if (!b) return '未知'
  if (typeof b === 'string') return b
  const mb = Number((b / 1024 / 1024).toFixed(2))
  if (Math.floor(mb) > 1024) {
    return (mb / 1024).toFixed(2) + "GB"
  }
  return mb + "MB"
}

export function parseKeyValueString(input: string | null | undefined) {
  if (!input) return {}
  input = input.trim();
  // 使用正则表达式匹配键值对
  const regex = /([^,]+?):([^,]*(?=,|$))/g;
  const matches = [];
  let match;
  // 收集所有匹配的键值对
  while ((match = regex.exec(input)) !== null) {
    matches.push(match);
  }
  const result: { [key: string]: any } = {};
  // 遍历匹配结果，并将键值对添加到对象中
  matches.forEach(match => {
    const key = match[1].trim(); // 键
    const value = match[2].trim(); // 值，可能包含逗号，但在这里我们假设值不会跨越多个逗号分隔的段
    if (value.includes(' ')) {
      result[key] = value.split(' ').map(item => item.trim());
    } else {
      result[key] = value;
    }
  });
  // 返回解析后的对象
  return result;
}

export function isValidIP(ip:string) {
  const ipRegex = /^((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})(\.((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})){3}(\:([0-9]|[1-9]\d{1,3}|[1-5]\d{4}|6[0-5]{2}[0-3][0-5])){0,1}$/
  return ipRegex.test(ip)
}
export function formatTimeStamp(timestamp:number,format = 'YYYY-MM-DD') {
  return dayjs(timestamp*1000).locale('zh-cn').format(format)
}
 