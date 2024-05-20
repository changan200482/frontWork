var map = new BMapGL.Map("container",{        //创建地图实例，并设置地图是否可以旋转
    enableRotate:false,
    enableTilt:false
});
var map = new BMapGL.Map('container');

//创建地址解析器实例
var myGeo = new BMapGL.Geocoder();
// 将地址解析结果显示在地图上，并调整地图视野
myGeo.getPoint('北京市海淀区上地10街', function(point){
    if(point){
        map.addOverlay(new BMapGL.Marker(point, {title: '北京市海淀区上地10街'}))
    }else{
        alert('您选择的地址没有解析到结果！');
    }
}, '北京市')
var point = new BMapGL.Point(116.404, 39.915);//创建点坐标

map.centerAndZoom(point, 15);                 //初始化地图,设置中心点坐标和地图级别
map.setMapStyleV2({
    styleId:"a3d843c79bdae14ebd83925ca495aac4"
});
map.enableScrollWheelZoom(true);              //开启鼠标滚轮缩放
map.setHeading(64.5);                         //设置地图旋转角度
map.setTilt(73);                              //设置地图倾斜角度
function openEarthType()                      //更改地图显示模式
{
    map.setMapType(BMAP_EARTH_MAP);
};
function closeEarthType()
{
    map.setMapType(BMAP_NORMAL_MAP);
}
var opts = {                                  //设置控件偏移量
    offset:new BMapGL.Size(2.5,50) 
};
//添加控件
map.addControl(new BMapGL.ScaleControl());    //缩放
map.addControl(new BMapGL.ZoomControl());     //比例尺
map.addControl(new BMapGL.LocationControl()); //定位
map.addControl(new BMapGL.CityListControl()); //城市列表定位
map.addControl(new BMapGL.CopyrightControl());//版权信息

//创建覆盖物
//  点
var markerPt1 = new BMapGL.Point(116.404, 39.915);//创建要标记点
var marker1 = new BMapGL.Marker(markerPt1);//创建标记点
marker1.addEventListener("click", function(){
    let label = new BMapGL.Label('这是标签内容:您点击了标注', {       // 创建文本标注
        position: markerPt1,
        offset: new BMapGL.Size(10, 20)
    });  
    map.addOverlay(label);                        // 将标注添加到地图中
    label.setStyle({                              // 设置label的样式
        color: '#000',
        fontSize: '30px',
        border: '2px solid #1E90FF'
    });
    label.addEventListener("click",function(){
        map.removeOverlay(label);
    });
});
map.addOverlay(marker1);//添加标记点
var markerPt2 = new BMapGL.Point(116.41248, 39.915);//创建要标记点
var marker2 = new BMapGL.Marker(markerPt2);//创建标记点
marker2.addEventListener("click", function(){
    let opts = {
        width: 250,     // 信息窗口宽度
        height: 100,    // 信息窗口高度
        title: "信息窗口"  // 信息窗口标题
    }
    let latlng = new String(`点击的经纬度：${marker2.getPosition()}`);
    let infoWindow = new BMapGL.InfoWindow(latlng, opts);  // 创建信息窗口对象
    map.openInfoWindow(infoWindow, map.getCenter());        // 打开信息窗口
});
map.addOverlay(marker2);//添加标记点
//  线
var polyline = new BMapGL.Polyline([
    new BMapGL.Point(116.399, 39.910),
    new BMapGL.Point(116.405, 39.920),
    new BMapGL.Point(116.425, 39.900)
], {strokeColor:"blue", strokeWeight:2, strokeOpacity:0.5});
map.addOverlay(polyline);
// 多边形
var polygon = new BMapGL.Polygon([
    new BMapGL.Point(116.387112,39.920977),
    new BMapGL.Point(116.385243,39.913063),
    new BMapGL.Point(116.394226,39.917988),
    new BMapGL.Point(116.401772,39.921364),
    new BMapGL.Point(116.41248,39.927893)
], {strokeColor:"blue", strokeWeight:2, strokeOpacity:0.5});
map.addOverlay(polygon);

//文本标注
map.addEventListener('click', function(e) {
    var mercator = map.lnglatToMercator(e.latlng.lng, e.latlng.lat);
    let opts = {
        width: 250,     // 信息窗口宽度
        height: 100,    // 信息窗口高度
        title: "信息窗口"  // 信息窗口标题
    }
    let latlng = new String(`点的经纬度：${e.latlng.lng},${e.latlng.lat}。
    点的墨卡托坐标：${mercator[0]},${mercator[1]}`);
    let infoWindow = new BMapGL.InfoWindow(latlng, opts);  // 创建信息窗口对象
    map.openInfoWindow(infoWindow, map.getCenter());        // 打开信息窗口
});

//定位SDK辅助定位
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