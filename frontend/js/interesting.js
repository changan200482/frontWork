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

  setupDraggable();