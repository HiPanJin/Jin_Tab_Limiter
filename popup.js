document.addEventListener("DOMContentLoaded", function() {
    var limitInput = document.getElementById('tabLimit');
    var saveButton = document.getElementById('saveButton');
    var statusMessage = document.getElementById('statusMessage');
  
    // 从存储中获取最大tab数并显示在输入框中
    chrome.storage.sync.get(['maxTabs'], function(result) {
      var maxTabs = result.maxTabs || 5; // 默认为5个tab
      limitInput.value = maxTabs;
    });
  
    // 点击保存按钮时，将输入框中的值存储到存储中
    saveButton.addEventListener('click', function() {
      var maxTabs = parseInt(limitInput.value, 10); // 将输入转换为数字
      if (isNaN(maxTabs)) { // 检查输入是否是数字
        statusMessage.textContent = '请输入数字！';
      } else {
        chrome.storage.sync.set({maxTabs: maxTabs}, function() {
          statusMessage.textContent = '已保存！';
        });
      }
    });
  });
  