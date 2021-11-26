import i18n from "../i18n/index"

export function generateTitle(title){
    return i18n.t('msg.route.' + title)
}
