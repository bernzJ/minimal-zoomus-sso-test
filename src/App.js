import React, { useEffect } from "react";
import { ZoomMtg } from '@zoomus/websdk';

import { zoom } from './config.json';

const { meetingNumber, apiKey, apiSecret } = zoom;

const App = () => {
  useEffect(() => {
    ZoomMtg.setZoomJSLib(process.env.PUBLIC_URL + '/lib', '/av');
    ZoomMtg.preLoadWasm();
    ZoomMtg.prepareJssdk();

    ZoomMtg.init({
      leaveUrl: "http://localhost:3000/",
      isSupportAV: true,
      success() {
        ZoomMtg.generateSignature({
          meetingNumber,
          apiKey,
          apiSecret,
          role: 0,
          success: function (res) {
            console.log(res.result);
            ZoomMtg.join({
              meetingNumber,
              userEmail: "",
              userName: "benz",
              signature: res.result,
              apiKey,
              passWord: "",
              success() {
                console.log('join meeting success');
              },
              error(res) {
                console.log(res);
              },
            });
          },
        })
      },
    })
  }, []);
  return (
    <div className="App">
    </div>
  );
}

export default App;
