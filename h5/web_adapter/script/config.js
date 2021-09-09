/* 项目配置.基于默认配置,可以通过
 http://www.example.com/PUBLIC_PATH/web_adapter/adapter.html
访问自己的 app.如有修改,请对应变换访问地址即可.

服务器静态部署目录 PUBLIC_PATH,默认为用户 appId
*/
/* ==================== 用户相关配置.可根据需要,灵活修改. ============= */
/* app 入口文件. */
var APP_INDEX_PATH = 'html/index_win.html'
if (window.location.search.indexOf("article_detail_frm") != -1) {
    APP_INDEX_PATH+= '?article_detail_frm'
}

/* ====================== 以下适配器相关配置,一般不需要修改.=================== */
/* 适配器入口文件. */
var WEB_ADAPTER_INDEX_PATH = '/'

/* 适配器核心js文件. */
var WEB_ADAPTER_CORE_JS_PATH = 'web_adapter/script/adapter.js'

/* =================== 应用和模块相关信息.一般由 APICloud 服务器自动生成.============= */
var PUBLIC_PATH = ''

var APP_INFO = {
  appId: '',
  version: '1.2.23',
  appVersion: '00.00.01',
  appName: 'Susumio'
}

var MODULES_INFO = [ {
	 "name":"clipBoard",
	 "class":"UZClipBoard",
	 "methods":["set","get","setListener","removeListener"]
 }
,{
     "name":"dialogBox",
     "class":"dialogBox",
     "methods":["alert","sendMessage","scene","evaluation","raffle","taskPlan","receipt","tips","discount", "share","actionMenu","input","amount","list","webView","popupAlert","confirm","close","inputbox","multiLineMenu"]
}
, {
     "name":"FNImageClip",
     "class":"UZFNImageClip",
     "methods":["open","save","reset","close"]
 }
,{
     "name":"photoBrowser",
     "class":"ACPhotoBrowser",
     "methods":["open","close","show","hide","getIndex","setIndex","getImage","setImage","appendImage","deleteImage","clearCache","setCookie","clearCookie"]
}
,{
    "name":"rongCloud2",
    "class":"RongCloud",
    "methods":[
        "init", "connect","reconnect", "disconnect", "setConnectionStatusListener","logout",
        "sendTextMessage", "sendImageMessage","sendGifMessage", "sendVoiceMessage","sendHQVoiceMessage","sendFileMessage","sendSightMessage","sendLocationMessage",
        "sendRichContentMessage","sendCommandNotificationMessage","sendContactNotificationMessage","sendProfileNotificationMessage","sendInformationNotificationMessage","sendGroupNotificationMessage","setOnReceiveMessageListener",
        "getConversationList", "getConversationListByCount","getConversation", "removeConversation",
        "clearConversations", "setConversationToTop",
        "getConversationNotificationStatus", "setConversationNotificationStatus",
        "getLatestMessages", "getHistoryMessages", "getHistoryMessagesByObjectName",
        "deleteMessages", "clearMessages",
        "getTotalUnreadCount", "getUnreadCount", "getUnreadCountByConversationTypes",
        "setMessageReceivedStatus","clearMessagesUnreadStatus",
        "setMessageExtra",
        "getTextMessageDraft", "saveTextMessageDraft", "clearTextMessageDraft",
        "createDiscussion", "getDiscussion", "setDiscussionName", "addMemberToDiscussion",
        "removeMemberFromDiscussion", "quitDiscussion", "setDiscussionInviteStatus",
        "syncGroup", "joinGroup", "quitGroup","getMessageCount","getTopConversationList","getBlockedConversationList",
        "joinChatRoom", "quitChatRoom", "getConnectionStatus", "getRemoteHistoryMessages", "setMessageSentStatus", "getCurrentUserId", "addToBlacklist", "removeFromBlacklist", "getBlacklistStatus", "getBlacklist", "setNotificationQuietHours", "removeNotificationQuietHours", "getNotificationQuietHours", "sendCommandMessage", "disableLocalNotification", "startNativeSingleCall", "startNativeMultiCall", "startNativeCustomerService", "setUserInfoProvider", "refreshUserInfo", "startCustomerService", "stopCustomerService", "selectCustomerServiceGroup", "switchToHumanMode", "evaluateRobotCustomerService", "evaluateHumanCustomerService","addTypingStatusListener","sendTypingStatus","configurationParameter","setOfflineMessageDuration","getOfflineMessageDuration","searchConversations","searchMessages","recallMessage","setOnMessageRecalledListener","getUnreadMentionedMessages"
    ],
    "launchClassMethod":"launch",
    "Build Settings": {
        "Other Linker Flags": "-force_load $(PROJECT_DIR)/UZApp/UZModules/RongRTCLib.framework/RongRTCLib"
    }
}



,{
	 "name":"touchID",
	 "class":"UZTouchID",
	 "methods":["verify","isValid"]
 }
, {
 "name":"UIChatBox",
 "class":"UZUIChatBox",
 "methods":["open","close","popupKeyboard","closeKeyboard","popupBoard","closeBoard","show","hide","value","insertValue","addEventListener","setPlaceholder","reloadExtraBoard","cancelRecord"]
 }

, {
     "name":"UILoading",
     "class":"UILoading",
     "methods":["flower","keyFrame","closeFlower","closeKeyFrame"]
 }
,
{
    "name":"UIScrollPicture",
    "class":"UZUIScrollPicture",
    "methods":["open","close","setCurrentIndex","hide","show","reloadData","addEventListener","clearCache"]
}
]
