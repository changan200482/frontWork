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
  const content = document.getElementById('content');

  // 初始化时，默认显示主页内容（如果需要）
  updateContent('home');

  // 为每个标签添加点击事件监听器
  tabs.forEach(tab => {
    tab.addEventListener('click', function(e) {
      // 移除所有activeTab样式
      tabs.forEach(t => t.classList.remove('activeTab'));
      // 给当前点击的标签添加activeTab样式
      this.classList.add('activeTab');
      
      // 根据data-target更新内容区
      const target = e.target.dataset.target;
      updateContent(target);
    });
  });

  function updateContent(target) {
    switch (target) {
      case 'home':
        // 清空或替换content内容，展示主页内容
        content.innerHTML = '<p>这里是主页内容...</p>';
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
      </div>
        `
      default:
        console.log('未知的标签目标');
    }
  }


});

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
    var email = document.getElementById('emailInput').value;
    let result = validateEmail(email);
    alert(result ? "符合邮箱格式" : "不符合邮箱格式");
  }
});

