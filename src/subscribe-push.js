export const subscribePushNotification = async () => {

  //check for service worker in browser
    if (!('serviceWorker' in navigator )) {
      console.error("Service Worker is not available!");
    };

    const registration = await navigator.serviceWorker.ready;
  
    // Subscribe to push notifications
    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlB64ToUint8Array(process.env.REACT_APP_VAPID_PUBLIC_KEY),
    });

    //send subscription to server
    await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/subscribe`, {
      mode: 'cors',
      method: 'POST',
      body: JSON.stringify(subscription),
      headers: {
        'content-type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
    });

  };

  
  function urlB64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/\-/g, '+')
      .replace(/_/g, '/');
  
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
  
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }
