import { Toast } from 'vant';
export const wxInit = (sd) => {
	var links = window.location.href;
	var title = document.title;
	var desc = sd.desc;
	var imgUrl = 'http://git.sourcedev.cc/dist/96121a817ab6ae44604eb4adf69e487d.jpg';
	wx.config({
		debug: sd.debug,
		appId: sd.appId,
		timestamp: sd.timestamp,
		nonceStr: sd.nonceStr,
		signature: sd.signature,
		jsApiList: [
			'onMenuShareTimeline','onMenuShareAppMessage','onMenuShareQQ','onMenuShareWeibo','onMenuShareQZone',
		],
	});
	wx.ready(function() {
		wx.onMenuShareTimeline({
			title: title,
			desc: desc,
			link: links,
			imgUrl: imgUrl,
			success: function() {
				Toast({
					message: '成功分享到朋友圈'
				});
			},
			cancel: function() {
				Toast({
					message: '分享失败,您取消了分享!'
				});
			}
		});
		wx.onMenuShareAppMessage({
			title: title,
			desc: desc,
			link: links,
			imgUrl: imgUrl,
			success: function() {
				Toast({
					message: '成功分享给朋友'
				});
			},
			cancel: function() {
				Toast({
					message: '分享失败,您取消了分享!'
				});
			}
		});
		wx.onMenuShareQQ({
			title: title,
			desc: desc,
			link: links,
			imgUrl: imgUrl,
			success: function() {
				Toast({
					message: '成功分享到QQ'
				});
			},
			cancel: function() {
				Toast({
					message: '分享失败,您取消了分享!'
				});
			}
		});
		wx.onMenuShareWeibo({
			title: title,
			desc: desc,
			link: links,
			imgUrl: imgUrl,
			success: function() {
				Toast({
					message: '成功分享到腾讯微博'
				});
			},
			cancel: function() {
				Toast({
					message: '分享失败,您取消了分享!'
				});
			}
		});
		wx.onMenuShareQZone({
			title: title,
			desc: desc,
			link: links,
			imgUrl: imgUrl,
			success: function() {
				Toast({
					message: '成功分享到QQ空间'
				});
			},
			cancel: function() {
				Toast({
					message: '分享失败,您取消了分享!'
				});
			}
		});
	});
	wx.error(function(res) {
		console.log(res);
	});
};
