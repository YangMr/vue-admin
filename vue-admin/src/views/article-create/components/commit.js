import {createArticle} from "../../../api/article"

export const commitArticle = async (title,content)=>{
    const res = await createArticle(title,content)
}