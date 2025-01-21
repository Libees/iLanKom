declare interface Comic {
    arcid:string,
    title:string,
    thumbnail?: string,
    noThumbnail?:string,
    pagecount?:number | string,
    thumbnailList?: string[] ,
    size?:number | null,
    tags?: string | null,
    [key: string]: any;
}
declare interface ComicListType {
    data: Comic[],
    draw: number,
    recordsFiltered: number,
    recordsTotal: number
}

declare type RootStackParamList = {
    Home:undefined;
    Config: undefined; // Home 路由没有参数
    Read: {arcid:string,page?:number};
    Comic: { arcid:string };
    Thumbs: {arcid:string,pageCount:number}
};

type code = 1 | 0

declare interface thumbnailQueueType {
    message:string,
    operation: string
    success: code
}

declare interface progressResponseType {
    id:string,
    lastreadtime:number,
    operation:string,
    page:number,
    success:number
}
