browser.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (typeof changeInfo.mutedInfo !== 'undefined') {
    const url = new URL(tab.url);
    

      //Conditions:
      // if currentPermission exists AND tab has been unmuted -> Change Notification Permission to currentPermission AND remove storage.local entry
      // if currentPermission exists AND tab has been muted -> Write Notification Permission into storage.local entry AND change Notification Permission to denied
      // if currentPermission doesn't exist AND tab has been muted -> Write Notification Permission into storage.local entry AND change Notification Permission to denied
      // if currentPermission doesn't exist AND tab has been unmuted -> Do Nothing.
      //
    if (changeInfo.mutedInfo.muted) {
      const result = await browser.tabs.executeScript(tabId, {code:'Notification.permission'});
      if (result[0]) {
        let notifyPermission = {};
        notifyPermission[url.origin] = result[0];
        await browser.storage.local.set(notifyPermission);
      }

      //TODO: change notification permission...
      console.log('CHANGING NOTIFICATION PERMISSION TO DENIED!');
      //we need to save the notifications settings somewhere (addon storage of some sorts...)
      //Notification.permission == 'default' || 'granted' || 'denied'
    } else {
      const currentPermission = await browser.storage.local.get(url.origin);
      console.log('currentPermission');
      console.log(currentPermission);
      if (currentPermission[url.origin]) {
        //TODO: restore notification permission...
        console.log('RESTORING NOTIFICATION PERMISSION');
      }
    }
  }
});