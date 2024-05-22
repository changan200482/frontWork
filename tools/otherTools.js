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