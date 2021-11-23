import {setItem,getItem} from "./storage"
import { TIME_STAMP,TOKEN_TIMEOUT_VALUE} from "../constant/index"
/**
 * 获取时间戳
 */

export function getTimeStamp(){
    return getItem(TIME_STAMP)
}

/**
 * 设置时间戳
 */
 export function setTimeStamp(){
    return setItem(TIME_STAMP,Date.now())
}

/**
 * 是否超时
 */
 export function isCheckTimeout(){
    //1. 获取当前的时间
    let currentTime = Date.now();

    //2. 获取缓存的时间(登录的时候)
    let timeStamp = getTimeStamp()
    //3. 用当前的时间 - 缓存的时间  > 所设定的间隔时候    则为登录超时,需要重登录   否则登录没有超时
    return currentTime - timeStamp > TOKEN_TIMEOUT_VALUE
 }