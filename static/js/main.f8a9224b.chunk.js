(this["webpackJsonpkiedy-kolos"]=this["webpackJsonpkiedy-kolos"]||[]).push([[0],{10:function(e,t,n){},22:function(e,t,n){},30:function(e,t,n){"use strict";n.r(t);var a=n(1),i=n(0),c=n.n(i),s=n(11),r=n.n(s),o=(n(22),n(10),n(4)),d=n.n(o),l=n(6),u=n(3),j=n(5),h=function(e){return{type:"SET",payload:e}},p=n(2),b=n(8),O=n.n(b),v=function(e){var t=e.day,n=e.active,i=e.events,c=Object(j.b)();return Object(a.jsxs)(p.a.div,{className:"calendar__day "+(n?"":"calendar__day--inactive"),tabindex:"0",onClick:function(){c(h(t))},variants:{hidden:{opacity:0,x:-100},show:{opacity:1,x:0,transition:{type:"spring",stiffness:600,damping:50}}},whileHover:{y:-2,scale:1.05},whileTap:{y:0,scale:.95},children:[Object(a.jsx)("div",{className:"events",children:Object(a.jsx)("ul",{className:"events__list",children:i.map((function(e){return Object(a.jsx)("li",{className:"events__item events__item--exam",children:e.short_name.toUpperCase()},e.id)}))})}),Object(a.jsx)("div",{className:"day__number",children:O()(t).format("DD")})]})},f=n(9),m=function(e){var t,n,c=e.refreshEvents,s=Object(i.useState)([]),r=Object(u.a)(s,2),o=r[0],j=r[1],h=Object(i.useState)([]),p=Object(u.a)(h,2),b=p[0],O=p[1],v=Object(i.useState)(0),m=Object(u.a)(v,2),x=m[0],_=m[1],y=Object(i.useState)(0),g=Object(u.a)(y,2),k=g[0],w=g[1],N=Object(i.useState)("2020-12-12"),S=Object(u.a)(N,2),z=S[0],C=S[1],E=Object(i.useState)("12:00"),D=Object(u.a)(E,2),M=D[0],T=D[1],I=Object(i.useState)("Tu wpisz opis..."),Y=Object(u.a)(I,2),L=Y[0],P=Y[1];Object(i.useEffect)((function(){F(),X()}),[]);var F=function(){var e=Object(l.a)(d.a.mark((function e(){var t,n;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("https://aleksanderblaszkiewicz.pl/kiedykolos/get_courses.php");case 2:return t=e.sent,e.next=5,t.json();case 5:n=e.sent,j(n),_(n[0].id);case 8:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),X=function(){var e=Object(l.a)(d.a.mark((function e(){var t,n;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("https://aleksanderblaszkiewicz.pl/kiedykolos/get_groups.php");case 2:return t=e.sent,e.next=5,t.json();case 5:n=e.sent,O(n),w(n[0].id);case 8:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),J=function(){var e=Object(l.a)(d.a.mark((function e(){var t,n;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t={method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({courseID:x,groupID:k,time:M,date:z,description:L}),mode:"no-cors"},e.next=3,fetch("https://aleksanderblaszkiewicz.pl/kiedykolos/add_event.php",t);case 3:n=e.sent,console.log(n),c();case 6:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(a.jsxs)(a.Fragment,{children:[Object(a.jsx)("select",{name:"course",id:"course",form:"add-event",value:x,onChange:function(e){_(e.target.value)},children:o.map((function(e){return Object(a.jsx)("option",{value:e.id,children:e.name},e.id)}))}),Object(a.jsx)("select",{name:"groupID",id:"groupID",form:"add-event",value:k,onChange:function(e){w(e.target.value)},children:b.map((function(e){return Object(a.jsx)("option",{value:e.id,children:e.name},e.id)}))}),Object(a.jsx)("input",(t={type:"date",id:"date",name:"date",value:"2020-11-25",min:"2020-11-25",max:"2021-12-31"},Object(f.a)(t,"value",z),Object(f.a)(t,"onChange",(function(e){C(e.target.value)})),t)),Object(a.jsx)("input",(n={type:"time",id:"time",name:"time",min:"07:00",value:"16:00:00",max:"21:00"},Object(f.a)(n,"value",M),Object(f.a)(n,"onChange",(function(e){T(e.target.value)})),n)),Object(a.jsx)("textarea",{id:"description",name:"description",rows:"4",cols:"50",value:L,onChange:function(e){P(e.target.value)}}),Object(a.jsx)("button",{onClick:J,children:"click here"})]})},x=function(){var e={hidden:{opacity:0,x:-25},show:{opacity:1,x:0}};return Object(a.jsx)("div",{className:"calendar__names",children:Object(a.jsxs)(p.a.ul,{variants:{hidden:{opacity:0},show:{opacity:1,transition:{staggerChildren:.05}}},initial:"hidden",animate:"show",children:[Object(a.jsx)(p.a.li,{variants:e,children:"poniedzia\u0142ek"}),Object(a.jsx)(p.a.li,{variants:e,children:"wtorek"}),Object(a.jsx)(p.a.li,{variants:e,children:"\u015broda"}),Object(a.jsx)(p.a.li,{variants:e,children:"czwartek"}),Object(a.jsx)(p.a.li,{variants:e,children:"pi\u0105tek"}),Object(a.jsx)(p.a.li,{variants:e,children:"sobota"}),Object(a.jsx)(p.a.li,{variants:e,children:"niedziela"})]})})},_=function(){var e=Object(i.useState)([]),t=Object(u.a)(e,2),n=t[0],c=t[1],s=Object(i.useState)([]),r=Object(u.a)(s,2),o=r[0],b=r[1],f=Object(i.useState)(),_=Object(u.a)(f,2),y=_[0],g=_[1],k=Object(i.useState)(0),w=Object(u.a)(k,2),N=w[0],S=w[1],z=Object(j.b)(),C=[7,1,2,3,4,5,6],E=O()();Object(i.useEffect)((function(){g(parseInt(E.format("MM"))),z(h(E.format("YYYY-MM-DD"))),M(),D()}),[]);var D=function(){var e=Object(l.a)(d.a.mark((function e(){var t,n;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("https://aleksanderblaszkiewicz.pl/kiedykolos/get_events.php");case 2:return t=e.sent,e.next=5,t.json();case 5:n=e.sent,c(n),console.log(n);case 8:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),M=function(){for(var e=new Array(42),t=C[E.startOf("month").day()],n=E.startOf("month").subtract(t-1,"day"),a=0;a<42;a++)e[a]=n.add(a,"day").format("YYYY-MM-DD");b(e)},T=function(e){var t=[];return n.forEach((function(n){n.date==e&&t.push(n)})),t},I=function(e){var t=E.add(N,"month");return O()(e).format("MM")==t.format("MM")},Y={hidden:{opacity:0},show:{opacity:1,transition:{staggerChildren:.05}}},L=o.map((function(e){return Object(a.jsx)(v,{active:I(e),day:e,events:T(e)},e)})).reduce((function(e,t,n){return n%7===0&&e.push([]),e[e.length-1].push(t),e}),[]).map((function(e){return Object(a.jsx)(p.a.div,{className:"calendar__row",variants:Y,initial:"hidden",animate:"show",children:e})}));return Object(a.jsxs)("div",{className:"app__calendar",children:[Object(a.jsx)(m,{refreshEvents:D}),Object(a.jsxs)("div",{className:"calendar__month",children:[Object(a.jsx)("button",{className:"month__button",onClick:function(){return function(){var e=N;e--,S(e),E=E.add(e,"month"),g(parseInt(E.format("MM"))),M()}()},children:"<"}),Object(a.jsx)("h2",{className:"month__title",children:["Stycze\u0144","Luty","Marzec","Kwiecie\u0144","Maj","Czerwiec","Lipiec","Sierpie\u0144","Wrzesie\u0144","Pa\u017adziernik","Listopad","Grudzie\u0144"][y-1]}),Object(a.jsx)("button",{className:"month__button",onClick:function(){return function(){b([]);var e=N;e++,S(e),E=E.add(e,"month"),g(parseInt(E.format("MM"))),M()}()},children:">"})]}),Object(a.jsx)(x,{}),Object(a.jsx)(p.a.div,{className:"calendar__days",children:L})]})},y=function(e){var t=e.event,n=e.setChosenEvent;return Object(a.jsxs)(p.a.li,{className:"events-list__item",variants:{hidden:{opacity:0,x:100},show:{opacity:1,x:0,transition:{type:"spring",stiffness:600,damping:50}}},whileTap:{scale:.95},whileHover:{y:-5,scale:1.02},onClick:function(){return n(t)},children:[Object(a.jsx)("h3",{children:t.name}),Object(a.jsxs)("div",{className:"events-list__info",children:[Object(a.jsx)("div",{className:"events-list__time",children:"11:30 - 12:45"}),Object(a.jsx)("div",{className:"events-list__category",children:"Projekt"})]})]},t.id)},g=function(e){var t=e.event,n={hidden:{opacity:0,y:10},show:{opacity:1,y:0}};return Object(a.jsx)("div",{className:"app__info",children:t&&Object(a.jsxs)("div",{children:[Object(a.jsx)(p.a.h3,{initial:{y:10,opacity:0},animate:{y:0,opacity:1},transition:{type:"spring",stiffness:600,damping:50},children:t.name}),Object(a.jsxs)(p.a.ul,{className:"app__links",variants:{hidden:{opacity:0},show:{opacity:1,transition:{staggerChildren:.1,delayChildren:.1}}},initial:"hidden",animate:"show",children:[Object(a.jsx)("a",{children:Object(a.jsx)(p.a.li,{className:"app__link",variants:n,children:"eNauczanie"})}),Object(a.jsx)("a",{children:Object(a.jsx)(p.a.li,{className:"app__link",variants:n,children:"Prezentacja"})}),Object(a.jsx)("a",{children:Object(a.jsx)(p.a.li,{className:"app__link",variants:n,children:"Dysk Google"})})]}),Object(a.jsx)(p.a.div,{className:"app__info-text",initial:{y:50,opacity:0},animate:{y:0,opacity:1},transition:{type:"spring",stiffness:600,damping:50,delay:.1},children:t.description})]},t.id)})},k=function(){var e=Object(i.useState)([]),t=Object(u.a)(e,2),n=t[0],c=t[1],s=Object(i.useState)(),r=Object(u.a)(s,2),o=r[0],h=r[1],b=Object(j.c)((function(e){return e.chosenDate})),O="https://aleksanderblaszkiewicz.pl/kiedykolos/get_events_for_day.php?date=".concat(b);Object(i.useEffect)((function(){c([]),v()}),[b]);var v=function(){var e=Object(l.a)(d.a.mark((function e(){var t,n;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch(O);case 2:return t=e.sent,e.next=5,t.json();case 5:n=e.sent,c(n),h(n[0]);case 8:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(a.jsxs)("div",{className:"app__extension",children:[Object(a.jsxs)(p.a.div,{className:"app__events",children:[Object(a.jsxs)("h2",{className:"events__header",children:["Wydarzenia ",b]}),Object(a.jsx)(p.a.ul,{className:"events-list",variants:{hidden:{opacity:0},show:{opacity:1,transition:{staggerChildren:.07}}},initial:"hidden",animate:n.length>0&&"show",children:n.map((function(e){return Object(a.jsx)(y,{event:e,setChosenEvent:h},e.id)}))})]}),Object(a.jsx)(g,{event:o})]})},w=function(){return Object(a.jsx)("div",{className:"container",children:Object(a.jsxs)("div",{className:"app",children:[Object(a.jsx)(_,{}),Object(a.jsx)(k,{})]})})},N=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,32)).then((function(t){var n=t.getCLS,a=t.getFID,i=t.getFCP,c=t.getLCP,s=t.getTTFB;n(e),a(e),i(e),c(e),s(e)}))},S=n(7),z=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"2020-11-01",t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"SET":return t.payload;default:return e}},C=Object(S.b)({chosenDate:z}),E=Object(S.c)(C,window.__REDUX_DEVTOOLS_EXTENSION__&&window.__REDUX_DEVTOOLS_EXTENSION__());r.a.render(Object(a.jsx)(c.a.StrictMode,{children:Object(a.jsx)(j.a,{store:E,children:Object(a.jsx)(w,{})})}),document.getElementById("root")),N()}},[[30,1,2]]]);
//# sourceMappingURL=main.f8a9224b.chunk.js.map