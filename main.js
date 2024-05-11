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
  document.getElementById("generateMultiplication").addEventListener("click", generateMultiplicationTable);
  document.getElementById("hideMultiplication").addEventListener("click", hideMultiplicationTable);

  document.getElementById('evaluateButton').addEventListener('click', function() {
    // 获取输入的成绩
    var score = parseInt(document.getElementById('scoreInput').value);
    // 调用evaluateScore函数并处理结果
    let result = evaluateScore(score);
    if (result !== "请输入1 ~ 100以内的数字") {
      alert(result); // 弹出消息框显示评价结果
    } else {
      alert(result); // 对于无效输入也给出提示
    }
  });

  document.getElementById("emailEvaluateButton").addEventListener("click",function(){
    var email = String(document.getElementById('emailInput').value);

    let result = validateEmail(email);
    if(result)
    {
      alert("符合邮箱格式")
    }
    else
    {
      alert("不符合邮箱格式")
    }
  });
});

document.addEventListener('DOMContentLoaded', function() {
  var draggable = document.getElementById('draggable');
  var content = document.getElementById('content'); // 获取content元素用于计算边界

  draggable.addEventListener('mousedown', function(event) {
    var offsetX = event.clientX - draggable.offsetLeft;
    var offsetY = event.clientY - draggable.offsetTop;

    function onMouseMove(event) {
      var newX = event.clientX - offsetX;
      var newY = event.clientY - offsetY;

      // 计算边界
      var maxX = content.offsetWidth - draggable.offsetWidth;
      var maxY = content.offsetHeight - draggable.offsetHeight;

      // 限制拖动范围
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
});