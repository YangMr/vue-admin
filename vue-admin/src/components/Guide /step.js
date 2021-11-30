
const steps = (i18n)=>{
    return [
        {
           element : "#guide-start",
           popover :  {
               title : i18n.t("msg.guide.guideTitle"),
               description : i18n.t("msg.guide.guideDesc"),
               position : "bottom-right"
           }
        },
        {
            element : "#hamburger-start",
            popover :  {
                title :  i18n.t("msg.guide.hamburgerTitle"),
                description :  i18n.t("msg.guide.hamburgerDesc"),
                position : "bottom-left"
            }
        },
        {
            element : "#breadcrumb-start",
            popover :  {
                title :i18n.t("msg.guide.breadcrumbTitle"),
                description : i18n.t("msg.guide.breadcrumbDesc"),
                position : "bottom-left"
            }
        },
        {
            element : "#screenfull-start",
            popover :  {
                title : i18n.t("msg.guide.fullTitle"),
                description : i18n.t("msg.guide.fullDesc"),
                position : "bottom-right"
            }
        },
        {
            element : "#i18n-start",
            popover :  {
                title :i18n.t("msg.guide.langTitle"),
                description :i18n.t("msg.guide.langDesc"),
                position : "bottom-right"
            }
        },
        {
            element : "#tagsview-start",
            popover :  {
                title : i18n.t("msg.guide.tagTitle"),
                description : i18n.t("msg.guide.tagDesc"),
                position : "bottom-left"
            }
        },
        {
            element : "#menu-start",
            popover :  {
                title : i18n.t("msg.guide.sidebarTitle"),
                description : i18n.t("msg.guide.sidebarDesc"),
                position : "right-center"
            }
        },
    ]
}
export default steps