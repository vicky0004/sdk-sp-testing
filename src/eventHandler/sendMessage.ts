export const sendWebviewMessage = <
  T extends Record<string, any> = Record<string, any>,
>(
  payload: T,
) => {
  if (window.ReactNativeWebView) {
    window.ReactNativeWebView.postMessage?.(JSON.stringify(payload));
  } else if (window.webkit) {
    window.webkit?.messageHandlers?.sporranSDK?.postMessage?.(JSON.stringify(payload));
  } else if (window.Android) {
    window.Android.postMessage?.(JSON.stringify(payload));
  }else{
    alert("No supported environment found.");
  }
};