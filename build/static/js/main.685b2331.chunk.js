(this.webpackJsonppuhelinluettelo=this.webpackJsonppuhelinluettelo||[]).push([[0],{14:function(e,n,t){e.exports=t(37)},36:function(e,n,t){},37:function(e,n,t){"use strict";t.r(n);var a=t(0),r=t.n(a),u=t(13),c=t.n(u),o=t(3),l=t(2),i=t.n(l),m=function(e){var n=e.persons,t=e.searchWord,a=e.handleSearchWordChange,u=n.filter((function(e){return e.name.toUpperCase().includes(t.toUpperCase())}));return r.a.createElement("div",null,r.a.createElement("div",null,"Filter: ",r.a.createElement("input",{value:t,onChange:a})," "),r.a.createElement("ul",null,u.map((function(e,n){return r.a.createElement("div",{key:e.name}," ",e.name," ",e.number)}))))},d=function(e){var n=e.newName,t=e.newNumber,a=e.handleNumberChange,u=e.handleNameChange,c=e.addNewPerson;return r.a.createElement("div",null,r.a.createElement("form",null,r.a.createElement("h3",null,"Add new contact"),r.a.createElement("div",null,"name: ",r.a.createElement("input",{value:n,onChange:u})," "),r.a.createElement("div",null,"number: ",r.a.createElement("input",{value:t,onChange:a})),r.a.createElement("div",null," ",r.a.createElement("button",{type:"submit",onClick:c},"add")," ")))},f=function(e){var n=e.persons,t=e.deletePerson;return r.a.createElement("div",null,r.a.createElement("h3",null,"Numbers"),n.map((function(e){return r.a.createElement("div",{key:e.name},e.name," ",e.number,r.a.createElement("button",{name:e.name,onClick:function(){return t(e.id)}},"poista"))})))},s="/api/persons",h=function(){return i.a.get(s).then((function(e){return e.data}))},p=function(e){return i.a.post(s,e).then((function(e){return e.data}))},b=function(e,n){return i.a.put("".concat(s,"/").concat(e),n).then((function(e){return e.data}))},v=function(e){return i.a.delete("".concat(s,"/").concat(e)).then((function(e){return e.data}))},E=function(e){var n=e.notification;return null===n?null:r.a.createElement("div",{className:"green"},n)},w=function(){var e=Object(a.useState)(""),n=Object(o.a)(e,2),t=n[0],u=n[1],c=Object(a.useState)(""),l=Object(o.a)(c,2),i=l[0],s=l[1],w=Object(a.useState)(""),g=Object(o.a)(w,2),N=g[0],C=g[1],j=Object(a.useState)([]),O=Object(o.a)(j,2),k=O[0],S=O[1],y=Object(a.useState)(null),P=Object(o.a)(y,2),W=P[0],D=P[1],J=function(e){D(e),setTimeout((function(){D(null)}),5e3)};Object(a.useEffect)((function(){h().then((function(e){S(e)}))}),[]);return console.log("newName value is: ",t),console.log("newNumber value is: ",i),r.a.createElement("div",null,r.a.createElement("h2",null,"Phonebook"),r.a.createElement(E,{notification:W}),r.a.createElement(m,{persons:k,searchWord:N,handleSearchWordChange:function(e){console.log("new searchWord input is:",e.target.value),C(e.target.value)}}),r.a.createElement("br",null),r.a.createElement(d,{newName:t,newNumber:i,handleNameChange:function(e){e.preventDefault(),u(e.target.value)},handleNumberChange:function(e){e.preventDefault(),s(e.target.value)},addNewPerson:function(e){e.preventDefault();var n={name:t,number:i};if(k.some((function(e){return e.name===t}))){if(window.confirm("".concat(n.name," is already added to phonebook, \n        do you want to replace phone number with a new one?"))){var a=k.find((function(e){return e.name===t}));b(a.id,n).then((function(e){S(k.map((function(n){return n.id!==a.id?n:e}))),u(""),s(""),J("Phone number of ".concat(e.name," was updated"))}))}}else p(n).then((function(e){S(k.concat(e)),u(""),s(""),J("".concat(n.name," was now added"))}))}}),r.a.createElement("br",null),r.a.createElement(f,{persons:k,deletePerson:function(e){var n=k.find((function(n){return n.id===e}));window.confirm("Delete ".concat(n.name,"?"))&&v(e).then((function(t){S(k.filter((function(n){return n.id!==e}))),J("".concat(n.name," is now deleted"))})).catch((function(){S(k.filter((function(n){return n.id!==e})))}))}}))};t(36);c.a.render(r.a.createElement(w,null),document.getElementById("root"))}},[[14,1,2]]]);
//# sourceMappingURL=main.685b2331.chunk.js.map