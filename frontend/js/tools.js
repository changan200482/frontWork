//插入标签的响应函数
document.addEventListener('DOMContentLoaded', function() {
  const ToolsTab = document.querySelectorAll('.borderTab[data-target]');
  const content = document.getElementById('toolsContent');

  updateContent('mathTools'); // 默认显示数学工具
  bindMathToolsEvents(); // 绑定数学工具子标签事件

  ToolsTab.forEach(tab => {
      tab.addEventListener('click', function(e) {
          const target = e.currentTarget.dataset.target;
          if (updateContent(target)) { // 只有在成功更新内容时才切换标签
              ToolsTab.forEach(t => t.classList.remove('activeTab'));
              this.classList.add('activeTab');
          } else {
              alert('未知的标签目标');
          }
      });
  });

  function updateContent(target) {
      switch (target) {
          case 'mathTools':
              content.innerHTML = `
              <div id="mathToolsChoose">
                <li class="mathToolsMenu activeToolsMenu" data-target="multiplication">九九乘法表</li>
                <li class="mathToolsMenu" data-target="calculator">计算器</li>
                <li class="mathToolsMenu" data-target="others">其他工具</li>
              </div>
              <div id="mathToolsContent"></div>
              `;
              updateMathToolsContent('multiplication'); // 默认显示九九乘法表
              bindMathToolsEvents(); // 绑定数学工具子标签事件
              return true; // 更新内容成功
          case 'mapTools':
              content.innerHTML = `
              <div id="map"></div>
              <div id="mapTools">
                <button class="mapToolsItem" id="downloadMarker"></button>
                <button class="mapToolsItem" id="uploadMarker"></button>
                <button class="mapToolsItem" id="messageBoard"></button>
                <button class="mapToolsItem" id="earthMode"></button>
                <button class="mapToolsItem" id="amplify"></button>
                <button class="mapToolsItem" id="reduce"></button>
              </div>
              `;
              initializeBaiduMap();
              return true; // 更新内容成功
          case 'otherTools':
              content.innerHTML = `
              <div class="work" id="work2">
                  <div class="headerBox">
                      <h4>2. 成绩评价</h4>
                  </div>
                  <div class="contentBox">
                      <span class="workText">请输入1~100内的数字:</span>
                      <input type="number" class="contentInput" id="scoreInput"/>
                      <button class="button" id="evaluateButton" style="transform: scale(0.7);">确定</button>
                  </div>
              </div>
              <div class="work" id="work3">
                  <div class="headerBox">
                      <h4>3. 检测邮箱</h4>
                  </div>
                  <div class="contentBox">
                      <span class="workText">请输入要检测的邮箱:</span>
                      <input type="text" class="contentInput" id="emailInput"/>
                      <button class="button" id="emailEvaluateButton" style="transform: scale(0.7)">确定</button>
                  </div>
              </div>
              `;
              return true; // 更新内容成功
          default:
              return false; // 更新内容失败
      }
  }

  function updateMathToolsContent(target) {
      const content = document.getElementById('mathToolsContent');
      switch (target) {
          case 'multiplication':
              content.innerHTML = `
              <div style="display: flex; flex-direction: column;">
                  <div class="headerBox" style="display: flex; justify-content: space-between; align-items: center; flex-direction: row;">
                      <h4>1.九九乘法表</h4>
                      <div class="buttonBox1" style="display: flex; flex-direction: row; transform: scale(0.8); gap: 0.5rem;">
                          <button class="button" id="generateMultiplication" onclick="generateMultiplicationTable()">点击生成</button>
                          <button class="button" id="hideMultiplication" onclick="hideMultiplicationTable();">点击隐藏</button>
                      </div>
                  </div>
                  <div style="width: 75vw;">
                      <table class="table" id="multiplicationTable"></table>
                  </div>
              </div>
              `;
              generateMultiplicationTable();
              hideMultiplicationTable();
              return true; // 更新内容成功
          default:
              return false; // 更新内容失败
      }
  }

  function bindMathToolsEvents() {
      const mathToolsTab = document.querySelectorAll('.mathToolsMenu[data-target]');
      mathToolsTab.forEach(tab => {
          tab.addEventListener('click', function(e) {
              const target = e.currentTarget.dataset.target;
              if (updateMathToolsContent(target)) { // 只有在成功更新内容时才切换标签
                  mathToolsTab.forEach(t => t.classList.remove('activeToolsMenu'));
                  this.classList.add('activeToolsMenu');
              } else {
                  alert('未知的标签目标');
              }
          });
      });
  }

});

//创建九九乘法表
function generateMultiplicationTable() {
  const table = document.getElementById("multiplicationTable");
  // 清空之前的内容，如果有的话
  table.innerHTML = "";

  for (let i = 1; i <= 9; i++) {
    const row = table.insertRow(); // 创建新行

    for (let j = 1; j <= i; j++) {
      const cell = row.insertCell(); // 创建新列（单元格）
      cell.textContent = `${j} * ${i} = ${i * j}`; // 设置单元格内容
    }
  }
}
function hideMultiplicationTable() {
  const table = document.getElementById("multiplicationTable");
  // 清空之前的内容，如果有的话
  table.innerHTML = "";
}

//评分机制
function evaluateScore(score) {
  if (score > 100 || score < 0) {
    return "请输入1 ~ 100以内的数字";
  } 
  else {
    if (score >= 90 && score <= 100) {
      return "优秀";
    } else if (score >= 80 && score < 90) {
      return "良好";
    } else if (score >= 60 && score < 80) {
      return "及格";
    } else if (score >= 0 && score < 60) {
      return "不及格";
    }
  }
}


//判断邮箱格式
function validateEmail(email) {
  var pattern = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,}$/;
  return pattern.test(email);
}


//点击事件的处理
document.addEventListener("click", function(e) {
    if (e.target.id === "evaluateButton") {
      // 获取输入的成绩
      var score = parseInt(document.getElementById('scoreInput').value);
      let result = evaluateScore(score);
      alert(result);
  } 
  else if (e.target.id === "emailEvaluateButton") {
      var email = String(document.getElementById('emailInput').value);

      let result = validateEmail(email);
      alert(result ? "符合邮箱格式" : "不符合邮箱格式");
  }
});


//原定用来设置拖动方块的函数，暂时不能应用于弹出窗口，原因未知
function setupDraggable(draggableID) {
  var draggable = document.getElementById(draggableID);
  if (draggable) { // 确保draggable元素存在才执行绑定操作
    draggable.addEventListener('mousedown', function(event) {
      var offsetX = event.clientX - draggable.offsetLeft;
      var offsetY = event.clientY - draggable.offsetTop;

      function onMouseMove(event) {
        var newX = event.clientX - offsetX;
        var newY = event.clientY - offsetY;

        var maxX = content.offsetWidth - draggable.offsetWidth;
        var maxY = content.offsetHeight - draggable.offsetHeight;

        newX = Math.min(maxX, Math.max(0, newX));
        newY = Math.min(maxY, Math.max(0, newY));

        draggable.style.left = newX + 'px';
        draggable.style.top = newY + 'px';
      }

      function onMouseUp() {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      }

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });
  }
}
setupDraggable('mapTools')

//地图函数
function initializeBaiduMap() {
  var isEarthMode = false; //判断地球模式是否开启
  var rightClickQueue = []; // 初始化一个空数组作为坐标队列
  var rightClickQueue = []; // 初始化一个空数组作为坐标队列
  var MAX_QUEUE_LENGTH = 10; // 设定队列最大长度

  var map = new BMapGL.Map("map"); // 创建地图实例 
  var centerpoint = new BMapGL.Point(116.404, 39.915); // 创建点坐标 
  map.centerAndZoom(centerpoint, 15);

  map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放
  map.addControl(new BMapGL.ScaleControl()); //添加比例尺控件
  map.addControl(new BMapGL.LocationControl()); //添加定位控件

  var currentContextMenu = null; // 保存当前的右键菜单
  // 从后端获取现有的标记
  document.getElementById('downloadMarker').addEventListener('click', function() {
    function downloadMarkers() {
      map.clearOverlays(); // 清除地图上的所有覆盖物
      fetch('http://localhost:5000/data')
      .then(response => response.json())
      .then(data => {
          data.forEach(markerData => {
              map._addMarker = true;
              let point = new BMapGL.Point(markerData.longitude, markerData.latitude);
              addMarker(point, markerData.name, markerData.note, markerData.message);
          });
      });
    }
    downloadMarkers();
  });
  
  // 创建右键菜单项
  var point = new BMapGL.Point(116.404, 39.915); // 创建点坐标 
  var createTxtMenuItem = function(point) {
      return [
          {
              text: '获取当前位置坐标',
              callback: function() {
                  map._getLocation = true;
                  showLocation(point);
              }
          },
          {
              text: '添加标记点',
              callback: function() {
                  map._addMarker = true;
                  showMarkerForm(point);
              }
          }
      ];
  };
  
  // 在地图加载完成后添加右键菜单
  map.addEventListener("tilesloaded", function() {
      map.addEventListener("rightclick", function(e) {
        var newPoint = new BMapGL.Point(e.latlng.lng, e.latlng.lat); // 获取新的坐标点

        // 将新坐标添加到队列末尾
        rightClickQueue.push(newPoint);

        // 如果队列长度超过设定的最大长度，则移除最早的坐标
        if (rightClickQueue.length > MAX_QUEUE_LENGTH) {
            rightClickQueue.shift();
        }

        // 移除旧的右键菜单
        if (currentContextMenu) {
            map.removeContextMenu(currentContextMenu);
        }

        let dynamicMenu = new BMapGL.ContextMenu();
        let txtMenuItems = createTxtMenuItem(newPoint);
        for (var i = 0; i < txtMenuItems.length; i++) {
            dynamicMenu.addItem(new BMapGL.MenuItem(
                txtMenuItems[i].text,
                txtMenuItems[i].callback,
                {
                    width: 300,
                    id: 'menu' + i
                }
            ));
        }
        // 添加新的右键菜单到地图
        map.addContextMenu(dynamicMenu);
        currentContextMenu = dynamicMenu; // 更新当前右键菜单

        // 显示菜单
        setTimeout(function() { // 确保菜单隐藏后再显示
          dynamicMenu._container.style.top = e.pixel.y + "px"; // 设置菜单的显示位置
          dynamicMenu._container.style.left = e.pixel.x + "px"; // 设置菜单的显示位置
          dynamicMenu.show(e.pixel.x, e.pixel.y); // 在点击位置显示菜单
      }, 0); // 延迟为0毫秒
    });

  });

  function showLocation(point) {
    if (map._getLocation) {
        map._getLocation = false; // 清除标志，确保只在下一次点击时执行
        alert('点击位置经纬度：' + point.lng + ', ' + point.lat);
        // 这里你可以执行其他操作，例如在地图上显示标记等
    }
  }

  var markerMenuItem = function(marker) {
    return [
        {
            text: '查看详情',
            callback: function() {
                map._details = true;
                showMarkerDetails(marker);
            }
        },
        {
            text: '删除标记',
            callback: function() {
                map._removeMarker = true;
                removeMarker(marker);
            }
        }
    ];
  };

  function showMarkerForm(point) {
    var remindBox = document.getElementById('remindBox');
    var remindBoxContent = document.getElementById('remindBoxContent');
    remindBox.style.display = 'flex';
    remindBoxContent.innerHTML = `
      <label for="markerName">名字:</label>
      <input type="text" id="markerName"><br>
      <label for="markerNote">备注:</label>
      <input type="text" id="markerNote"><br>
      <label for="markerMessage">留言:</label>
      <input type="text" id="markerMessage"><br>
      <div id="submitRemindBox" class="button">提交</div>
    `;

    // 关闭按钮事件
    document.getElementById('closeRemindBox').addEventListener('click', function() {
        remindBox.style.display = 'none';
    });

    // 提交按钮事件
    document.getElementById('submitRemindBox').addEventListener('click', function() {
      var markerName = document.getElementById('markerName').value;
      var markerNote = document.getElementById('markerNote').value;
      var markerMessage = document.getElementById('markerMessage').value;
    
      if (!markerName) {
        alert('请输入名字');
        return;
      }
    
      // 检查名字是否已存在
      checkNameExists(markerName)
        .then(exists => {
          if (exists) {
            alert('名字已存在，请使用其他名字');
            return;
          } else {
            addMarker(point, markerName, markerNote, markerMessage)
              .then(() => {
                alert('提交成功');
                remindBox.style.display = 'none';
              })
              .catch(error => {
                console.error('添加标记时出错:', error);
                alert('添加标记时出错，请稍后再试');
              });
          }
        })
        .catch(error => {
          console.error('检查名字时出错:', error);
          alert('检查名字时出错，请稍后再试');
        });
    });

  }

// 检查名字是否已存在的函数
  function checkNameExists(name) {
    return fetch('http://localhost:5000/check_name', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: name })
    })
    .then(response => response.json())
    .then(data => data.exists)
    .catch(error => {
      console.error('Error checking name:', error);
      throw error;
    });
  }


  var markers = []; // 初始化一个空数组用于存储标注对象

  function showMarkerDetails(marker) {
      var remindBox = document.getElementById('remindBox');
      var remindBoxContent = document.getElementById('remindBoxContent');
      remindBoxContent.innerHTML = `
          <div>名字：<div class="markerMessage">${marker.name}</div></div>
          <div>备注：<div class="markerMessage">${marker.note}</div></div>
          <div>留言：<div class="markerMessage">${marker.message}</div></div>
      `;
      remindBox.style.display = 'flex';
      
  }

    // 关闭消息框
  document.getElementById('closeRemindBox').addEventListener('click', function() {
      document.getElementById('remindBox').style.display = 'none';
  });

 // 添加标记的函数
function addMarker(point, name, note, message) {
  return new Promise((resolve, reject) => {
    if (map._addMarker) {
      map._addMarker = false; // 清除标志，确保只在下一次点击时执行
      let markerPoint = new BMapGL.Point(point.lng, point.lat); // 创建标注点
      let marker = new BMapGL.Marker(markerPoint); // 创建标注
      map.addOverlay(marker); // 将标注添加到地图中
      markers.push(marker); // 将标注对象存入数组

      // 假设你有一些标记详情
      marker.name = name || "Error";
      marker.note = note || "无";
      marker.message = message || "无";

      let markerMenu = new BMapGL.ContextMenu();
      let items = markerMenuItem(marker);

      for (var i = 0; i < items.length; i++) {
        markerMenu.addItem(new BMapGL.MenuItem(
          items[i].text,
          items[i].callback,
          {
            width: 200,
            id: 'menu' + i
          }
        ));
      }

      marker.addEventListener("rightclick", function(e) {
        marker.addContextMenu(markerMenu);
        markerMenu.hide();
        setTimeout(function() {
          markerMenu._container.style.top = e.pixel.y + "px";
          markerMenu._container.style.left = e.pixel.x + "px";
          markerMenu.show(e.pixel.x, e.pixel.y);
        }, 0);
      });

      fetch('http://localhost:5000/data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          latitude: marker.getPosition().lat,
          longitude: marker.getPosition().lng,
          name: name,
          note: note,
          message: message
        })
      })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        resolve(); // 提交成功
      })
      .catch(error => {
        console.error('Error sending marker data:', error);
        reject(error); // 提交失败
      });
    } else {
      resolve(); // 如果 map._addMarker 为 false，不进行任何操作，直接 resolve
    }
  });
}

  // 移除标记
  function removeMarker(marker){
    map.removeOverlay(marker);
    var index = markers.indexOf(marker);
    if (index > -1) {
        markers.splice(index, 1);
    }

    const latitude = typeof marker.getPosition().lat === 'function' ? marker.getPosition().lat() : marker.getPosition().lat;
    const longitude = typeof marker.getPosition().lng === 'function' ? marker.getPosition().lng() : marker.getPosition().lng;

    fetch('http://localhost:5000/remove', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            latitude: latitude,
            longitude: longitude,
            name: marker.name,
            note: marker.note,
            message: marker.message
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            console.log('Marker removed successfully:', data);
        } else {
            console.error('Error removing marker:', data);
        }
    })
    .catch(error => console.error('Fetch error:', error));
  }



  document.addEventListener("click", function(e) {
      if (e.target.id === "earthMode") {
          if (!isEarthMode) {
              // 如果当前不是地球模式，则切换到地球模式
              map.setMapType(BMAP_EARTH_MAP);
              isEarthMode = true; // 更新标记为地球模式
          } else {
              // 如果已经是地球模式，则切换回普通模式
              map.setMapType(BMAP_NORMAL_MAP);
              isEarthMode = false; // 更新标记为普通模式
          }
      } else if (e.target.id === "amplify") {
          map.zoomIn();
      } else if (e.target.id === "reduce") {
          map.zoomOut();
      } 
  });

  
}
