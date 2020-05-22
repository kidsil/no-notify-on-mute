browser.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (typeof changeInfo.mutedInfo !== 'undefined') {
    const mutingScript = `
      if (typeof window.Notification.permission !== 'undefined') {
        console.log('no-notify-on-mute: Disabling Notifications (tab muted)');
        window.tempMutedNotification = window.Notification;
        window.Notification = class empty {};
      }
    `;

    const unmutingScript = `
        if (window.tempMutedNotification) {
          console.log('no-notify-on-mute: Re-enabling Notifications (tab unmuted)');
          window.Notification = window.tempMutedNotification;
          delete window.tempMutedNotification;
        }
    `;

    const createAndAppendElem = (mute = true) => {
      let scriptElemId = mute ? 'tempMutedNotification' : 'tempUnMutedNotification';
      return `
        //Check & remove existing element
        var scriptElem = document.getElementById(\'${scriptElemId}\');
        if (scriptElem) scriptElem.parentNode.removeChild(scriptElem);
        //Create and append new element
        var inj = document.createElement('script');
        inj.id = \'${scriptElemId}\';
        inj.innerHTML = \`${mute ? mutingScript : unmutingScript}\`;
        document.body.appendChild(inj);
      `;
    };

    await browser.tabs.executeScript(tabId, {code: createAndAppendElem( changeInfo.mutedInfo.muted )});
  }
});