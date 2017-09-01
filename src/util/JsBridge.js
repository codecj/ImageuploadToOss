const JsBridge = (callback) =>{
	if (window.WebViewJavascriptBridge) {
          return callback(WebViewJavascriptBridge);
      } else {
          document.addEventListener(
              'WebViewJavascriptBridgeReady',
              function() {
                  callback(WebViewJavascriptBridge)
              },
              false
          );
      }
      if (window.WVJBCallbacks) {
          return window.WVJBCallbacks.push(callback);
      }
      window.WVJBCallbacks = [callback];
      var WVJBIframe = document.createElement('iframe');
      WVJBIframe.style.display = 'none';
      WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
      document.documentElement.appendChild(WVJBIframe);
      setTimeout(function() {
          document.documentElement.removeChild(WVJBIframe)
      }, 0);
};

//返回jsbridge
export const navBack = () =>{
	JsBridge(bridge => {
       bridge.callHandler('navBack')
  })
};

//扫一扫jsbridge
export const scan = (cb) =>{
  JsBridge(bridge => {
      window.WebViewJavascriptBridge.callHandler('scan',null,(responseData) => {
          cb(responseData);
      })
  })
};

export const searchShop = (cb) =>{
   JsBridge(bridge => {
      bridge.registerHandler('searchShop',(data,responseCallBack) => {
          cb(data);
      })
  })
};

//参数一互调方法名 参数二JS传原生数据  参数三是OC回调到JS数据
export const print = (products)=>{
  JsBridge(bridge =>{
    bridge.callHandler('checkGoodPrint',{'Data':products},(responseData) => {
        
    })
  })
}

 // Request.jsBbridge(bridge => {
 //                window.WebViewJavascriptBridge.callHandler(
 //                    'showAddressPicker', {
 //                        'Data': 'json数据传给Android端'
 //                    } //该类型是任意类型
 //                    , (responseData) => {
 //                        var res = responseData
 //                            // JSON.parse(JSON.stringify(responseData))
 //                        if ((typeof res) == 'string') {
 //                            res = JSON.parse(responseData);
 //                        }
 //                        this.areaid = res.areaid;
 //                        res.areaid == '' ? this.address = '全部区域' : this.address = res.address;
 //                    }
 //                );
 //            })

