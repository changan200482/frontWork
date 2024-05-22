var map = new BMapGL.Map("toolsContent");       // 创建地图实例 
var point = new BMapGL.Point(116.404, 39.915);  // 创建点坐标 
map.centerAndZoom(point, 15); 
map.enableScrollWheelZoom(true);                //开启鼠标滚轮缩放
map.addControl(new BMapGL.ScaleControl());      //添加比例尺控件
map.addControl(new BMapGL.LocationControl());   //添加定位控件
var txtMenuItem = [
    {
        text:'获取当前位置坐标',                             // 定义菜单项的显示文本
        callback: function () {                 // 定义菜单项点击触发的回调函数
            map.zoomIn();
        }
    },
    {
        text:'缩小',
        callback: function () {
            map.zoomOut();
        }
    }
];
var menu = new BMapGL.ContextMenu();
for(var i = 0; i < txtMenuItem.length; i++){
    menu.addItem(new BMapGL.MenuItem(               // 定义菜单项实例
        txtMenuItem[i].text,                        // 传入菜单项的显示文本
        txtMenuItem[i].callback,                    // 传入菜单项的回调函数
        {
            width: 300,                             // 指定菜单项的宽度
            id: 'menu' + i                          // 指定菜单项dom的id
        }
    ));
}
map.addContextMenu(menu);                           // 添加右键菜单

map.addEventListener("tilesloaded", function() {
    map.addEventListener("rightclick", function(e) {
        menu.show(e.latlng.lng, e.latlng.lat);      // 在点击位置显示菜单
    });
});
var isEarthMode = false;                            //判断地球模式
document.addEventListener("click", function(e) {
    if(e.target.id==="earthMode"){
        if (!isEarthMode) {
            // 如果当前不是地球模式，则切换到地球模式
            map.setMapType(BMAP_EARTH_MAP);
            isEarthMode = true; // 更新标记为地球模式
        } 
        else {
            // 如果已经是地球模式，则切换回普通模式
            map.setMapType(BMAP_NORMAL_MAP);
            isEarthMode = false; // 更新标记为普通模式
        }
    }
    else if(e.target.id==="amplify"){
        map.zoomIn();
    }
    else if(e.target.id==="reduce"){
        map.zoomOut();
    }
});

var geolocation = new BMapGL.Geolocation();
// 开启SDK辅助定位
geolocation.enableSDKLocation();
geolocation.getCurrentPosition(function(r){
    if(this.getStatus() == BMAP_STATUS_SUCCESS){
        var mk = new BMap.Marker(r.point);
        map.addOverlay(mk);
        map.panTo(r.point);
        alert('您的位置：' + r.point.lng + ',' + r.point.lat);
    }
    else {
        alert('failed' + this.getStatus());
    }        
});