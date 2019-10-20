<template>
  <div>
    <div id="container"></div>
  </div>
</template>

<script>
export default {
  mounted() {
    window.onLoad = function() {
      var map = new AMap.Map("container", {
        zoom: 31, //级别
        pitch:75, // 地图俯仰角度，有效范围 0 度- 83 度
        // center: [116.397428, 39.90923], //中心点坐标
        viewMode: "3D" //使用3D视图
      });
      var trafficLayer = new AMap.TileLayer.Traffic({
        zIndex: 10
      });
      map.add(trafficLayer); //添加图层到地图
    };
    var url =
      "https://webapi.amap.com/maps?v=1.4.15&key=33c8000282564b2965c1984b23b6cb07&callback=onLoad";
    var jsapi = document.createElement("script");
    jsapi.charset = "utf-8";
    jsapi.src = url;
    document.head.appendChild(jsapi);
  }
};
</script>

<style scoped>
#container {
  width: 800px;
  height: 580px;
  margin: 0px 400px;
}
</style>