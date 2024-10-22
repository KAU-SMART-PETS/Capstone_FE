import React, { useEffect, useState } from 'react';
import WebView from 'react-native-webview';
import { View, ActivityIndicator } from 'react-native';

interface KakaoMapProps {
  latitude: number;
  longitude: number;
}

const KakaoMap: React.FC<KakaoMapProps> = ({ latitude, longitude }) => {
  const [isLoading, setIsLoading] = useState(true);

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
        <script type="text/javascript" src="https://dapi.kakao.com/v2/maps/sdk.js?appkey=be58fd2b5f617b1a7bdaaf764eda625e"></script>
        <style>
          body, html { margin: 0; padding: 0; height: 100%; }
          #map { width: 100%; height: 100%; }
        </style>
      </head>
      <body>
        <div id="map"></div>
        <script type="text/javascript">
          function initMap() {
            var container = document.getElementById('map');
            var options = {
              center: new kakao.maps.LatLng(${latitude}, ${longitude}),
              level: 3
            };
            var map = new kakao.maps.Map(container, options);
            
            var markerPosition = new kakao.maps.LatLng(${latitude}, ${longitude});
            var marker = new kakao.maps.Marker({
              position: markerPosition
            });
            marker.setMap(map);
          }

          // 카카오 맵 SDK가 로드된 후 지도 초기화
          kakao.maps.load(initMap);
        </script>
      </body>
    </html>
  `;


  return (
    <View style={{ flex: 1 }}>
      <WebView
        originWhitelist={['*']}
        source={{ html }}
        style={{ flex: 1 }}
        onLoad={() => setIsLoading(false)}
        onError={(syntheticEvent) => {
          const { nativeEvent } = syntheticEvent;
          console.warn('WebView error: ', nativeEvent);
        }}
        javaScriptEnabled={true}
        domStorageEnabled={true}
      />
      {isLoading && (
        <ActivityIndicator
          style={{ position: 'absolute', top: '50%', left: '50%' }}
          size="large"
        />
      )}
    </View>
  );
};

export default KakaoMap;