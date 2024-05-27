window._AMapSecurityConfig = {
    securityJsCode: "1ed96098bfa4d8d8012eaf3a268a6c71",
  };

AMapLoader.load({
    key: "915bdd7bbfab3694d4dcb4a0a711077e", //申请好的Web端开发者 Key，调用 load 时必填
    version: "2.0", //指定要加载的 JS API 的版本，缺省时默认为 1.4.15
    plugins: ["AMap.Scale"], //需要使用的的插件列表，如比例尺'AMap.Scale'，支持添加多个如：['AMap.Scale','...','...']
    AMapUI: {
      //是否加载 AMapUI，缺省不加载
      version: "1.1", //AMapUI 版本
      plugins: ["overlay/SimpleMarker"], //需要加载的 AMapUI ui 插件
    },
    Loca: {
      //是否加载 Loca， 缺省不加载
      version: "2.0", //Loca 版本
    },
})
.then((AMap) => {
    const map = new AMap.Map("container", {
        viewMode: '2D', //默认使用 2D 模式
        zoom: 11, //地图级别
        center: [116.397428, 39.90923], //地图中心点
        mapStyle: "amap://styles/whitesmoke", //设置地图的显示样式
      });
})
.catch((e) => {
    console.error(e); //加载错误提示
});