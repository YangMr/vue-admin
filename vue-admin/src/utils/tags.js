const whiteList = ["/login","/401","/404"]

export function isTags(path){
    return !whiteList.includes(path)
}