chrome.storage.sync.get(['maxTabs'], function(result) {
    var maxTabs = result.maxTabs || 5; // 默认为5个tab
    var tabIds = []; // 记录已打开的tab id
  
    // 监听tab创建事件
    chrome.tabs.onCreated.addListener(function(tab) {
      // 获取当前所有的tab
      chrome.tabs.query({}, function(tabs) {
        // 如果tab数量超出了最大限制
        if (tabs.length > maxTabs) {
          // 关闭新创建的tab
          chrome.tabs.remove(tab.id);
          // 如果tabIds中已经有tab，则关闭最早打开的那个tab
          if (tabIds.length > 0) {
            chrome.tabs.remove(tabIds.shift());
          }
          // 提示用户
          //alert('您已超出最大tab数量限制！');
        }
        // 将新创建的tab id加入tabIds中
        tabIds.push(tab.id);
      });
    });
  
    // 监听storage改变事件，更新最大tab数量
    chrome.storage.onChanged.addListener(function(changes, area) {
      if (area === 'sync' && changes.maxTabs) {
        maxTabs = changes.maxTabs.newValue;
      }
    });
  });