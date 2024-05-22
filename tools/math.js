document.addEventListener('DOMContentLoaded', function() {
    const mathToolsTab = document.querySelectorAll('.mathToolsMenu[data-target]');
    const content = document.getElementById('mathToolsContent');

    updateContent('multiplication');//默认显示九九乘法表

    mathToolsTab.forEach(tab =>{
        tab.addEventListener('click',function(e){
            mathToolsTab.forEach(t => t.classList.remove('activeToolsMenu'));
            this.classList.add('activeToolsMenu');

            const target = e.target.dataset.target;
            updateContent(target);
        });
    });

    function updateContent(target){
        switch(target){
            case 'multiplication':
                content.innerHTML = `
                <div style="display: flex; flex-direction: column;">
                    <div class = "headerBox" style = "  display: flex;justify-content: space-between;align-items: center;flex-direction: row;align-items: center;">
                    <h4>1.九九乘法表</h4>
                    <div class = "buttonBox1" style=" display: flex;flex-direction: row; transform: scale(0.8); gap: 0.5rem;">
                        <button class="button" id="generateMultiplication" onclick="generateMultiplicationTable()">点击生成</button>
                        <button class="button" id="hideMultiplication" onclick="hideMultiplicationTable();">点击隐藏</button>
                    </div>
                    </div>
                    <div style="width: 75vw;">
                        <table class="table" id = "multiplicationTable"></table>
                    </div>
                </div>
                `;
                generateMultiplicationTable();
                hideMultiplicationTable();
                break;
            default:
                alert('未知的标签目标');
        }
    }
});

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