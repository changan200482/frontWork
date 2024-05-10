function multiplicationTable()
{
  for(let i = 1; i <= 9;i++)
  {
    for(let j = 1;j <= i;j++)
    {
      console.log(j + "*" + i + "=" + (i*j));
    }
  }
  console.log("\n");
}

function evaluateScore(score) 
{
  if(score > 100 || score <0)
  {
    return "请输入1 ~ 100以内的数字";
  }
  else
  {
    if (score >= 90 && score <= 100) 
    {
      return "优秀";
    }
    else if (score >= 80 && score < 90) 
    {
        return "良好";
    } 
    else if (score >= 60 && score < 80) 
    {
        return "及格";
    }
    else if (score >= 0 && score < 60) 
    {
        return "不及格";
    }
  }
}

function validateEmail(email) 
{
  var pattern = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,}$/;
  return pattern.test(email);
}
