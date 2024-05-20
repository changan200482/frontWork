function loadXMLFile(callback) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
      if (xhr.readyState == 4 && xhr.status == 200) {
          callback(xhr.responseXML);
      }
  };
  xhr.open("GET", "books.xml", true);
  xhr.send();
}

function initializeBookList() {
  loadXMLFile(function(xmlDoc) {
      document.getElementById('booksButton').addEventListener('click', function() {
          displayBooks(xmlDoc);
      });
  });
}


function displayBooks(xmlDoc) {
  var books = xmlDoc.getElementsByTagName("book");
  var contentDiv = document.getElementById("books");
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < books.length; i++) {
      var title = books[i].getElementsByTagName("title")[0].childNodes[0].nodeValue;
      var author = books[i].getElementsByTagName("author")[0].childNodes[0].nodeValue;
      
      var row = document.createElement("tr");
      row.innerHTML = `<td>${title}</td><td>${author}</td>`;
      fragment.appendChild(row);
  }

  contentDiv.innerHTML = "<table><tr><th>Title</th><th>Author</th></tr>";
  contentDiv.appendChild(fragment);
  contentDiv.innerHTML += "</table>";
}


//=======================================================================

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

function validateEmail(email) {
  var pattern = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,}$/;
  return pattern.test(email);
}


document.addEventListener("DOMContentLoaded", function() {
  const tabs = document.querySelectorAll('.borderTab[data-target]');
  
  // 初始化时，默认显示主页内容
  //updateContent('home');

  // 为每个标签添加点击事件监听器
  tabs.forEach(tab => {
    tab.addEventListener('click', function(e) {
      tabs.forEach(t => t.classList.remove('activeTab'));
      this.classList.add('activeTab');
      updateContent(e.target.dataset.target);
    });
  });
});

function updateContent(target) {
  switch (target) {
    case 'home':
      // 清空或替换content内容，展示主页内容
      content.innerHTML = `
        <div id="selfInfo">
        <div id="infoTitle">
          <div id="profile">
            <img src="./image/profilePicture.jpg" alt="profilePicture" id="profilePicture">
            <div id="accountNum">
              <h2 id="surferName">ASaKi</h2>
              <div id="emailNumBox" class="infoBox">
                <img src="./image/email-fill.svg" alt="email" id="email">
                <span class="homeFont">:202211030701@qq.com</span>
              </div>
              <div id="QQNumBox" class="infoBox">
                <img src="./image/qq.svg" alt="qq" id="qq">
                <span class="homeFont">:2806054563</span>
              </div>
            </div>
          </div>
          <div id="mainSocialWebBox" class="infoBox">
            <span>社交网站:</span>
            <a href="https://github.com/changan200482?tab=repositories" target="_blank" rel="noopener">
              <img src="./image/github.svg" alt="github" >
            </a>
            <a href="https://space.bilibili.com/290385549?spm_id_from=333.1007.0.0" target="_blank" rel="noopener">
              <img src="./image/bilibili.svg" alt="bilibili">
            </a>
          </div>
        </div>
        

        <p id="introduction"><span>一名懒惰成性的乐观主义者</span></p>
        <div id="selfIntroduction">
          <span  class="title">个性签名</span>
          <span class="content">如果能在浪费时间中获得快乐，就不叫浪费时间</span>
          <span  class="title">当前所在地</span>
          <span class="content">山东 青岛</span>
        </div>
      </div>

      <audio controls id="player1">
        <source src="./audio/Travelers.mp3" type="audio/mpeg">
      您的浏览器不支持 audio 元素。
      </audio>

      <div id="draggable"></div>
      `;
      setupDraggable();
      break;
    case 'javaScriptWork':
      content.innerHTML = `
      <!--作业1-->
      <div class = "work" id = "work1">
        <div class = "headerBox">
          <h4>1.九九乘法表</h4>
          <div class = "buttonBox1">
            <button class="button" id="generateMultiplication">点击生成</button>
            <button class="button" id="hideMultiplication">点击隐藏</button>
          </div>
        </div>
        <div class = "contentBox">
          <table id = "multiplicationTable"></table>
        </div>
      </div>

      <!--作业2-->
      <div class="work" id="work2">
        <div class="headerBox">
          <h4>2. 成绩评价</h4>
        </div>
        <div class="contentBox">
          <span class = "workText">请输入1~100内的数字:</span>
          <input type="number" class="contentInput" id="scoreInput"/>
          <button class = "button" id="evaluateButton">确定</button>
        </div>
      </div>

      <!--作业3-->
      <div class = "work" id = "work3">
        <div class="headerBox">
          <h4>3. 检测邮箱</h4>
        </div>
        <div class="contentBox">
          <span class = "workText">请输入要检测的邮箱:</span>
          <input type="text" class="contentInput" id="emailInput"/>
          <button class = "button" id="emailEvaluateButton">确定</button>
        </div>
      </div>

      <!--作业4-->
      <div class = "work" id = "work4">
        <div class="headerBox">
          <h4>4. 书籍列表</h4>
        </div>
        <div id="books">
          <button class="button" id="booksButton">打开列表</button>
        </div>
      </div>
    </div>
      `;
      initializeBookList();
      break;
    case 'Text':
      content.innerHTML = `
      <button class="button" id="textButton">测试按钮</button>
      `
      break;
    default:
      console.log('未知的标签目标');
  }
}

document.addEventListener("click", function(e) {
  if (e.target.id === "generateMultiplication") {
    generateMultiplicationTable();
  } else if (e.target.id === "hideMultiplication") {
    hideMultiplicationTable();
  } else if (e.target.id === "evaluateButton") {
    // 获取输入的成绩
    var score = parseInt(document.getElementById('scoreInput').value);
    let result = evaluateScore(score);
    alert(result);
  } else if (e.target.id === "emailEvaluateButton") {
    var email = String(document.getElementById('emailInput').value);

    let result = validateEmail(email);
    alert(result ? "符合邮箱格式" : "不符合邮箱格式");
  } else if (e.target.id === "booksButton") {
    loadXMLFile(function(xmlDoc) {
          displayBooks(xmlDoc);
    });
  };
});

function setupDraggable() {
  var draggable = document.getElementById('draggable');
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
