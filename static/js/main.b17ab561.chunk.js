(this["webpackJsonpgoogle-weather-copy"]=this["webpackJsonpgoogle-weather-copy"]||[]).push([[0],{13:function(t,e,n){t.exports={current:"CurrentWeather_current__3eoIk",leftCol:"CurrentWeather_leftCol__3OQxZ",temp:"CurrentWeather_temp__3W1Vd",btns:"CurrentWeather_btns__AZ7d7",btn:"CurrentWeather_btn__Oh3m-",active:"CurrentWeather_active__tCyXI",vertLine:"CurrentWeather_vertLine__3lqeN",other:"CurrentWeather_other__quPtP",rightCol:"CurrentWeather_rightCol__t55u-",btnFindLoc:"CurrentWeather_btnFindLoc__1LIEj",location:"CurrentWeather_location__pkGnp",findInput:"CurrentWeather_findInput__3L8z8",findWrapper:"CurrentWeather_findWrapper__1a7QJ",findList:"CurrentWeather_findList__QGo5A",findItem:"CurrentWeather_findItem__aoEil"}},183:function(t,e,n){},294:function(t,e,n){},295:function(t,e,n){"use strict";n.r(e);var a,r=n(1),c=n.n(r),i=n(79),s=n.n(i),o=(n(182),n(183),n(11)),u=n(29),d=n(65),l=n.n(d),h=n(43),p=n(110),f=n(26),m=Object(f.b)("data/fetchWeather",function(){var t=Object(p.a)(l.a.mark((function t(e,n){var a,r,c,i,s,o;return l.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return a=n.rejectWithValue,r=Object(h.a)(e,2),c=r[0],i=r[1],s="https://api.weatherapi.com/v1/forecast.json?key=b8d348df879e486ca0f172620210610&q=".concat(c,",").concat(i,"&days=8&lang=ru"),t.prev=3,t.next=6,fetch(s);case 6:if((o=t.sent).ok){t.next=9;break}throw new Error("Server Error!");case 9:return t.next=11,o.json();case 11:return t.abrupt("return",t.sent);case 14:return t.prev=14,t.t0=t.catch(3),t.abrupt("return",a(t.t0.message));case 17:case"end":return t.stop()}}),t,null,[[3,14]])})));return function(e,n){return t.apply(this,arguments)}}()),j=Object(f.b)("data/fetchLocation",function(){var t=Object(p.a)(l.a.mark((function t(e,n){var a,r,c;return l.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return a=n.rejectWithValue,r="https://api.weatherapi.com/v1/search.json?key=b8d348df879e486ca0f172620210610&q=".concat(e),t.prev=2,t.next=5,fetch(r);case 5:if((c=t.sent).ok){t.next=8;break}throw new Error("Server Error!");case 8:return t.next=10,c.json();case 10:return t.abrupt("return",t.sent);case 13:return t.prev=13,t.t0=t.catch(2),t.abrupt("return",a(t.t0.message));case 16:case"end":return t.stop()}}),t,null,[[2,13]])})));return function(e,n){return t.apply(this,arguments)}}()),b=Object(f.c)({name:"data",initialState:{data:{},listFindLocations:[],statusFetchLocation:null,error:null,statusFetchWeather:null},reducers:{},extraReducers:(a={},Object(u.a)(a,m.pending,(function(t,e){t.statusFetchWeather="loading"})),Object(u.a)(a,m.fulfilled,(function(t,e){t.data=e.payload,t.statusFetchWeather="ok"})),Object(u.a)(a,m.rejected,(function(t,e){t.error=e.payload,t.statusFetchWeather="rejected"})),Object(u.a)(a,j.pending,(function(t,e){t.statusFetchLocation="loading"})),Object(u.a)(a,j.fulfilled,(function(t,e){t.listFindLocations=e.payload,t.statusFetchLocation="ok"})),Object(u.a)(a,j.rejected,(function(t,e){t.error=e.payload,t.statusFetchLocation="rejected"})),a)}),x=(b.actions.setStatusFind,b.reducer),O=n(13),y=n.n(O),g=Object(f.c)({name:"currWeather",initialState:{isMetric:!0,isVisFindLoc:!1,isGeo:!1,currData:{}},reducers:{setCurrData:function(t,e){var n=e.payload.data,a=n.current;t.currData=_(n,a,a.last_updated)},toggVisFindLoc:function(t,e){"boolean"!==typeof e.payload?t.isVisFindLoc=!t.isVisFindLoc:t.isVisFindLoc=e.payload},setForecastData:function(t,e){var n,a=Object(h.a)(e.payload,2),r=a[0],c=a[1];t.currData.updTimeStamp!==r&&(c.forecast.forecastday.forEach((function(t){return t.hour.forEach((function(t){new Date(t.time).getTime()===r&&(n=t)}))})),t.currData=_(c,n,n.time))},setCurrDayData:function(t,e){var n=Object(h.a)(e.payload,3),a=n[0],r=n[1],c=n[2];t.currData.updTimeStamp!==a&&(t.currData=_(c,r,a,!0))},setMetric:function(t,e){t.isMetric=e.payload},setGeo:function(t,e){t.isGeo=e.payload}}});function _(t,e,n){var a=arguments.length>3&&void 0!==arguments[3]&&arguments[3],r={weekday:"long",hour:a?void 0:"numeric",minute:a?void 0:"numeric"};return{temp_c:Math.round(a?e.avgtemp_c:e.temp_c),temp_f:Math.round(a?e.avgtemp_f:e.temp_f),icon:e.condition.icon,precip_mm:a?e.totalprecip_mm:e.precip_mm,humidity:a?e.avghumidity:e.humidity,wind_kph:Math.round(a?e.maxwind_kph:e.wind_kph),wind_mph:Math.round(a?e.maxwind_mph:e.wind_mph),country:t.location.country,name:t.location.name,text:e.condition.text,updTime:new Intl.DateTimeFormat("ru-RU",r).format(new Date(n)),updTimeStamp:new Date(n).getTime()}}var v=g.actions,w=v.setGeo,k=v.toggVisFindLoc,C=v.setCurrData,W=v.setForecastData,L=v.setMetric,D=v.setCurrDayData,F=g.reducer,N=n(5),V=function(t){var e=t.size,n=void 0===e?24:e,a=t.fill,r=void 0===a?"#fbbc04":a;return Object(N.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",style:{margin:"0 10px 0 0"},width:n,height:n,viewBox:"0 0 24 24",children:Object(N.jsx)("path",{fill:r,d:"M12 0c-4.198 0-8 3.403-8 7.602 0 4.198 3.469 9.21 8 16.398 4.531-7.188 8-12.2 8-16.398 0-4.199-3.801-7.602-8-7.602zm0 11c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z"})})},S=function(){var t=Object(o.c)((function(t){return t.currWeather})),e=t.isGeo,n=t.isVisFindLoc,a=t.isMetric,c=t.currData,i=Object(o.c)((function(t){return t.data})),s=i.data,u=i.listFindLocations,d=i.error,l=i.statusFetchLocation,h=Object(o.b)(),p=c.temp_c,f=c.temp_f,b=c.icon,x=c.precip_mm,O=c.humidity,g=c.wind_kph,_=c.wind_mph,v=c.country,W=c.name,D=c.text,F=c.updTime;function S(t){document.querySelector(".js-findWrapper")&&(t.path.find((function(t){return t.classList?t.classList.contains("js-findWrapper"):null}))||h(k(!1)))}return Object(r.useEffect)((function(){h(C({data:s}))}),[s]),Object(r.useEffect)((function(){document.addEventListener("click",S)}),[]),Object(N.jsxs)("div",{className:y.a.current,children:[Object(N.jsxs)("div",{className:y.a.leftCol,children:[Object(N.jsx)("img",{width:64,height:64,src:b,alt:"weather icon"}),Object(N.jsx)("span",{className:y.a.temp,children:a?p:f}),Object(N.jsxs)("div",{className:y.a.btns,children:[Object(N.jsx)("button",{disabled:a,onClick:function(){return h(L(!0))},className:"".concat(y.a.btn," ").concat(a?y.a.active:""),children:"\xb0C"}),Object(N.jsx)("span",{className:y.a.vertLine,children:"|"}),Object(N.jsx)("button",{disabled:!a,onClick:function(){return h(L(!1))},className:"".concat(y.a.btn," ").concat(a?"":y.a.active),children:"\xb0F"})]}),Object(N.jsxs)("ul",{className:y.a.other,children:[Object(N.jsxs)("li",{children:["\u041e\u0441\u0430\u0434\u043a\u0438: ",x," \u043c\u043c"]}),Object(N.jsxs)("li",{children:["\u0412\u043b\u0430\u0436\u043d\u043e\u0441\u0442\u044c: ",O,"%"]}),Object(N.jsxs)("li",{children:["\u0412\u0435\u0442\u0435\u0440: ",a?"".concat(g," \u043a\u043c/\u0447"):"".concat(_," \u043c\u0438/\u0447")]})]})]}),Object(N.jsxs)("div",{className:y.a.rightCol,children:[n&&!d?Object(N.jsxs)("div",{className:"".concat(y.a.findWrapper," js-findWrapper"),children:[Object(N.jsx)("input",{className:y.a.findInput,onChange:function(t){var e;(e=t.target.value).length>2&&h(j(e))},placeholder:"\u0413\u043e\u0440\u043e\u0434 (\u043e\u0442 3 \u0441\u0438\u043c\u0432\u043e\u043b\u043e\u0432) ...",type:"text",name:"country-name"}),Object(N.jsxs)("ul",{className:y.a.findList,children:[u.length>0&&"ok"===l&&u.map((function(t){return Object(N.jsx)("li",{className:y.a.findItem,onClick:function(e){return function(t,e,n){h(m([e,n])),t.target.value="",h(k(!1)),h(w(!1))}(e,t.lat,t.lon)},children:t.name},t.id)})),0===u.length&&"ok"===l&&Object(N.jsx)("li",{className:y.a.findItem,children:"\u041d\u0435 \u043d\u0430\u0439\u0434\u0435\u043d\u043e"})]})]}):Object(N.jsxs)("button",{onMouseUp:function(){return h(k(!0))},className:y.a.btnFindLoc,children:[e&&Object(N.jsx)(V,{size:20}),Object(N.jsxs)("h1",{className:y.a.location,children:[v,",\xa0",W]})]}),Object(N.jsx)("span",{children:F}),Object(N.jsx)("span",{children:D})]})]})},E=n(163),M=Object(f.c)({name:"graph",initialState:{dataXY:[],typeY:"temp_c",tickValues:[],last_updated:null,slideGraphicsPx:null},reducers:{getXY:function(t,e){t.dataXY.length=0;var n,a=Object(E.a)(e.payload.data.forecast.forecastday);try{for(a.s();!(n=a.n()).done;){n.value.hour.forEach((function(e){t.dataXY.push({time:new Date(e.time).getTime(),temp_c:Math.round(e.temp_c),temp_f:Math.round(e.temp_f),humidity:Math.round(e.humidity),wind_kph:Math.round(e.wind_kph),wind_mph:Math.round(e.wind_mph),wind_degree:e.wind_degree})}))}}catch(r){a.e(r)}finally{a.f()}},getArrHours:function(t,e){t.tickValues.length=0;var n=new Date(t.last_updated).getHours();++n,t.dataXY.forEach((function(e,a){for(var r=n;r<75;r+=3){a===r&&t.tickValues.push(e.time);for(var c=n;c>=0;c-=3)a===c&&t.tickValues.push(e.time)}}))},setCurrUpdTime:function(t,e){t.last_updated=e.payload.data.current.last_updated},setType:function(t,e){t.typeY=e.payload},setSlideGraphics:function(t,e){if(t.dataXY.length){var n=e.payload,a=new Date(n).getTime(),r=new Date(t.last_updated).getTime();a<r&&(a=r);var c=650*((a-t.dataXY[0].time)/36e5-2.9)/24;c>1275&&(c=1275),c<0&&(c=0),t.slideGraphicsPx=c}}}}),A=M.actions,T=(A.resetGraphicsStates,A.getXY),Y=A.setSlideGraphics,G=A.getArrHours,I=(A.getVisualY,A.setCurrUpdTime),X=A.setType,z=M.reducer,q=function(){var t=Object(o.c)((function(t){return t.currWeather})).isMetric,e=Object(o.c)((function(t){return t.graphics})).typeY,n=Object(o.b)();function a(a,r){r.target.parentElement.querySelectorAll("button").forEach((function(t){return t.className=""})),r.target.classList.add("active"),e!==a&&(e.includes("temp")&&"temp"===a||n(X("temp"!==a?"wind"!==a?a:"".concat(t?"wind_kph":"wind_mph"):"".concat(t?"temp_c":"temp_f"))))}return Object(N.jsxs)("div",{className:"type-btns",children:[Object(N.jsx)("button",{className:"active",onClick:function(t){return a("temp",t)},children:"\u0422\u0435\u043c\u043f\u0435\u0440\u0430\u0442\u0443\u0440\u0430"}),Object(N.jsx)("span",{className:"vert-line",children:"|"}),Object(N.jsx)("button",{onClick:function(t){return a("humidity",t)},children:"\u0412\u043b\u0430\u0436\u043d\u043e\u0441\u0442\u044c"}),Object(N.jsx)("span",{className:"vert-line",children:"|"}),Object(N.jsx)("button",{onClick:function(t){return a("wind",t)},children:"\u0412\u0435\u0442\u0435\u0440"})]})},H=n(303),P=n(154),B=n(304),U=n(305),J=n(156),Q=n(301),R=function(t){var e=t.x,n=(t.y,t.dx),a=t.datum,r=Object(o.c)((function(t){return t.graphics})).tickValues,c=a.wind_degree,i=a.wind_kph,s=r.includes(a.time);return i<10&&(i=10),Object(N.jsx)(N.Fragment,{children:s&&Object(N.jsx)("svg",{x:e-(i+5)/2+n,y:53,children:Object(N.jsx)("svg",{version:"1.1",xmlns:"http://www.w3.org/2000/svg",x:"0px",y:"0px",width:"".concat(i,"px"),height:"42px",viewBox:"0 0 42 42",enableBackground:"new 0 0 42 42",children:Object(N.jsx)("polygon",{fill:"#AEBFCF",style:{transformOrigin:"50% 50%",transform:"rotate(".concat(c-90,"deg)")},points:"27,37.5 42,20 27,4.5 18,4.5 30,16.5 0,16.5 0,23.5 30,23.5 18,37.5 "})})})})},Z=function(t){var e=Object(o.c)((function(t){return t.data.data})),n=Object(o.b)();return Object(N.jsx)("text",{x:t.x,y:t.y,children:Object(N.jsx)("tspan",{onClick:function(){return n(W([t.datum,e]))},style:{fontSize:12,fill:"#70757a"},x:t.x,children:t.text})})},K=function(){var t=Object(o.c)((function(t){return t.data})).data,e=Object(o.c)((function(t){return t.graphics})).typeY;return{getVisualY:function(n){function a(){if(e.includes("temp"))return n[e];switch(e){default:return n[e];case"humidity":return"".concat(n[e],"%");case"wind_kph":return"".concat(n[e]," \u043a\u043c/\u0447");case"wind_mph":return"".concat(n[e]," \u043c\u0438/\u0447")}}var r=new Date(t.current.last_updated).getHours(),c=new Date(n.time).getHours();e.includes("temp")||++r;for(var i=r;i<27;i+=3){if(c===i)return a();for(var s=r;s>=0;s-=3)if(c===s)return a()}},chartsStyles:{VictoryAxis:{tickLabels:{fontFamily:"Arial",fontSize:12,fill:"#70757a"},axis:{stroke:null}},VictoryArea:{data:{fill:"".concat("humidity"===e?"#e8f0fe":"#fff5cc"),stroke:"".concat("humidity"===e?"#1a73e8":"#ffcc00"),strokeWidth:2},labels:{fontFamily:"Arial",fontSize:11,fontWeight:700,fill:"".concat("humidity"===e?"#1a73e8":"rgb(181, 181, 181)"),cursor:"pointer"}}}}},$=function(t){var e=t.datum,n=t.x,a=t.dx,r=t.y,c=t.dy,i=t.style,s=Object(o.c)((function(t){return t.data.data})),u=Object(o.c)((function(t){return t.currWeather})).currData,d=Object(o.b)(),l=K().getVisualY;return Object(N.jsxs)("g",{onClick:function(){return d(W([e.time,s]))},style:i,x:n,y:l(e),children:[Object(N.jsx)("rect",{vectorEffect:"non-scaling-stroke",height:"85",width:650/24,x:n,fill:"transparent",y:r-25}),Object(N.jsx)("text",{style:{fill:new Date(u.updTimeStamp).setMinutes(0)===e.time?"rgb(85, 85, 85)":"inherit"},x:n+a,y:r,dy:c,children:Object(N.jsx)("tspan",{children:l(e)})})]})},tt=function(){var t=Object(o.c)((function(t){return t.data})).data,e=Object(o.c)((function(t){return t.graphics})),n=e.dataXY,a=e.slideGraphicsPx,c=e.typeY,i=e.tickValues,s=Object(o.c)((function(t){return t.currWeather})).isMetric,u=Object(o.b)(),d=K(),l=d.getVisualY,h=d.chartsStyles;return Object(r.useEffect)((function(){u(T({data:t})),u(I({data:t})),u(G()),u(Y(t.current.last_updated))}),[t]),Object(r.useEffect)((function(){c.includes("temp")&&u(X("".concat(s?"temp_c":"temp_f"))),c.includes("wind")&&u(X("".concat(s?"wind_kph":"wind_mph")))}),[s]),Object(N.jsxs)(H.a,{minDomain:{x:n.length?n[0].time:void 0},width:1925,height:125,padding:{bottom:20,top:25,left:0,right:0},domainPadding:{y:[0,25]},containerComponent:Object(N.jsx)(P.a,{style:{transform:"translateX(-".concat(a,"px)"),transition:"all 1000ms cubic-bezier(.51,-0.17,0,1)"},responsive:!1}),children:[Object(N.jsx)(B.a,{name:"VictoryAxis",crossAxis:!1,tickValues:i,tickFormat:function(t){return"".concat(new Date(t).getHours(),":00")},style:h.VictoryAxis,tickLabelComponent:Object(N.jsx)(Z,{y:123})}),c.includes("wind")?Object(N.jsx)(U.a,{name:"windChart",data:n,x:"time",style:{labels:{fontFamily:'"Arial", sans-serif',fontSize:12,stroke:void 0}},labels:function(t){var e=t.datum;return l(e)},dataComponent:Object(N.jsx)(R,{dx:15}),labelComponent:Object(N.jsx)(J.a,{dx:15,y:35})}):Object(N.jsx)(Q.a,{name:"chart",interpolation:"humidity"===c?"step":"basis",style:h.VictoryArea,data:n,x:"time",y:c,labels:function(t){var e=t.datum;return l(e)},labelComponent:Object(N.jsx)($,{y:c.includes("temp")?void 0:45,dx:c.includes("temp")?8:2})})]})},et=function(){var t=Object(o.c)((function(t){return t.data})).data,e=Object(o.c)((function(t){return t.currWeather})),n=e.currData,a=e.isMetric,r=Object(o.b)();function c(e){var c=e.day,i=c.maxtemp_c,s=c.maxtemp_f,o=c.mintemp_c,u=c.mintemp_f,d=e.day.condition,l=d.icon,p=d.text,f=new Date(n.updTimeStamp).getDate(),m=new Date(e.date).getDate(),j=function(){for(var t=arguments.length,e=new Array(t),n=0;n<t;n++)e[n]=arguments[n];return e.map((function(t){return Math.round(t)}))}(i,s,o,u),b=Object(h.a)(j,4);return i=b[0],s=b[1],o=b[2],u=b[3],Object(N.jsxs)("button",{onClick:function(n){return function(e,n){var a=e.target.closest("button");a.classList.contains("active")||(a.parentElement.querySelectorAll("button").forEach((function(t){return t.classList.remove("active")})),a.classList.add("active")),r(Y(n.date)),r(D([n.date,n.day,t]))}(n,e)},className:"day-btn ".concat(f===m?"active":""),children:[Object(N.jsxs)("div",{children:[" ",new Intl.DateTimeFormat("ru-RU",{weekday:"short"}).format(new Date(e.date))]}),Object(N.jsx)("img",{width:64,height:64,src:l,alt:p}),Object(N.jsx)("br",{}),Object(N.jsxs)("span",{children:["\xa0\xa0","".concat(a?i:s),"\xb0\xa0"]}),Object(N.jsxs)("span",{className:"day-btn__f",children:["".concat(a?o:u),"\xb0"]})]},e.date)}return Object(N.jsx)("div",{className:"day-btns",children:t.forecast.forecastday.map((function(t){return c(t)}))})};var nt=function(){var t=Object(o.c)((function(t){return t.data})),e=t.error,n=t.statusFetchWeather,a=Object(o.b)();return Object(r.useEffect)((function(){navigator.geolocation.getCurrentPosition((function(t){a(m([t.coords.latitude,t.coords.longitude])),a(w(!0))}),(function(t){return a(m([34.052235,-118.243683]))}),{enableHighAccuracy:!0,timeout:5e3,maximumAge:0})}),[]),Object(N.jsxs)("div",{className:"App",children:["loading"===n&&Object(N.jsx)("h2",{children:"Loading.."}),e&&Object(N.jsxs)("h2",{style:{color:"red"},children:["\u041e\u0448\u0438\u0431\u043a\u0430: ",e]}),"ok"===n&&!e&&Object(N.jsxs)("div",{className:"container",children:[Object(N.jsx)(S,{}),Object(N.jsx)(q,{}),Object(N.jsx)("div",{className:"charts",children:Object(N.jsx)(tt,{})}),Object(N.jsx)(et,{})]})]})},at=(n(294),Object(f.a)({reducer:{data:x,graphics:z,currWeather:F}}));s.a.render(Object(N.jsx)(c.a.StrictMode,{children:Object(N.jsx)(o.a,{store:at,children:Object(N.jsx)(nt,{})})}),document.getElementById("root"))}},[[295,1,2]]]);
//# sourceMappingURL=main.b17ab561.chunk.js.map