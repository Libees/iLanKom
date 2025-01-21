import request from "../utils/request"
import { AxiosResponse } from "axios"

const fetchSearch = (filter:string = '', start:number = 0,sortby ='date_added',order:string = 'desc'):Promise<ComicListType> => {
    return request({
        url: '/api/search',
        method: 'get',
        params: {
            filter,
            sortby,
            start,
            order
        },
    })
}

const getComicMetadata = (arcid:string):Promise<Comic> => {
    return request({
        url: `/api/archives/${arcid}/metadata`,
        method: 'get'
    })
} 

const getHasThumbnails = (arcid:string):Promise<thumbnailQueueType> => {
    return request({
        url: `/api/archives/${arcid}/files/thumbnails?no_fallback=true`,
        method: 'post'
    })
}

const getComicPages = (aricd:string):Promise<{job:number,pages:string[]}> => {
    return request({
        url: `/api/archives/${aricd}/files`,
        method: 'get'
    })
}

const putReadProgress = (arcid:string,page:number):Promise<progressResponseType>=> {
    return request({
        url: `/api/archives/${arcid}/progress/${page}`,
        method: 'put'
    })
}

export default {
    fetchSearch,
    getComicMetadata,
    getHasThumbnails,
    getComicPages,
    putReadProgress
}