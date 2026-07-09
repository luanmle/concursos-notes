// plugins/dataview-lite/src/components/dataview.inline.ts
var dataview_inline_default = '(()=>{function A(e){let t=Uint8Array.from(atob(e),r=>r.charCodeAt(0));return new TextDecoder().decode(t)}function y(e){return String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function B(e){let t=e.replace(/\\s+/g," ").trim(),r=t.match(/^(TABLE|LIST)(\\s+WITHOUT\\s+ID)?/i);if(!r)throw new Error("A consulta deve come\\xE7ar com TABLE ou LIST");let s=r[1].toUpperCase(),l=!!r[2],v=/\\s+(FROM|WHERE|SORT|GROUP\\s+BY)\\s+/gi,E=t.slice(r[0].length),n={},u="_cols",g=0,h;for(;(h=v.exec(E))!==null;)n[u]=E.slice(g,h.index).trim(),u=h[1].toUpperCase().replace(/\\s+/g," "),g=v.lastIndex;n[u]=E.slice(g).trim();let m=[];if(s==="TABLE"&&n._cols)for(let i of n._cols.split(",")){let d=i.trim();if(!d)continue;let c=d.match(/^(.+?)\\s+AS\\s+"([^"]+)"$/i);c?m.push({expr:c[1].trim(),alias:c[2]}):m.push({expr:d})}let p=[];if(n.FROM)for(let i of n.FROM.split(/\\s+OR\\s+/i)){let d=i.trim();d.startsWith("#")?p.push({tag:d.slice(1)}):d.startsWith(\'"\')&&p.push({folder:d.replace(/^"|"$/g,"")})}let o=[];if(n.WHERE)for(let i of n.WHERE.split(/\\s+AND\\s+/i)){let d=i.trim(),c=d.match(/^contains\\(\\s*([\\w.-]+)\\s*,\\s*"([^"]*)"\\s*\\)$/i);if(c){o.push({field:c[1],op:"contains",value:c[2]});continue}if(c=d.match(/^([\\w.-]+)\\s*(!=|=)\\s*"([^"]*)"$/),c){o.push({field:c[1],op:c[2],value:c[3]});continue}throw new Error(`Condi\\xE7\\xE3o WHERE n\\xE3o suportada: ${d}`)}let a;if(n.SORT){let i=n.SORT.match(/^(.+?)(?:\\s+(ASC|DESC))?$/i);i&&(a={expr:i[1].trim(),desc:(i[2]??"").toUpperCase()==="DESC"})}let f;if(n["GROUP BY"]){let i=n["GROUP BY"].match(/^([\\w.-]+)(?:\\s+AS\\s+"([^"]+)")?$/i);if(!i)throw new Error(`GROUP BY n\\xE3o suportado: ${n["GROUP BY"]}`);f={field:i[1],alias:i[2]}}return{kind:s,withoutId:l,columns:m,sources:p,where:o,sort:a,groupBy:f}}function w(e,t){let r=t.toLowerCase();return r==="file.link"||r==="file.name"?e.title:r==="file.folder"?e.folder:r==="file.ctime"||r==="data_criacao"?e.fm.data_criacao??e.created:r==="file.mtime"?e.modified:r==="tags"?e.tags:e.fm[t]??e.fm[r]}function S(e){return typeof e=="number"?e:Array.isArray(e)?e.join(", "):String(e??"")}function R(e,t){return t.length===0?!0:t.some(r=>{if(r.tag){let s=r.tag;return e.tags.some(l=>l===s||l.startsWith(s+"/"))}if(r.folder){let s=r.folder.replace(/^\\/+|\\/+$/g,"");return e.folder===s||e.folder.startsWith(s+"/")}return!1})}function T(e,t){return t.every(r=>{let s=w(e,r.field),l=Array.isArray(s)?s.map(String):String(s??"");return r.op==="="?String(s??"")===r.value:r.op==="!="?String(s??"")!==r.value:r.op==="contains"?(Array.isArray(l),l.includes(r.value)):!0})}function L(e){return`<a href="/${encodeURI(e.slug)}" class="internal">${y(e.title)}</a>`}function b(e,t){if(t.toLowerCase()==="file.link")return L(e);let r=w(e,t);return Array.isArray(r)?y(r.join(", ")):y(r??"\\u2014")}function k(e,t,r){let s=r.filter(n=>R(n,t.sources)&&T(n,t.where));if(t.groupBy){let n=new Map;for(let o of s){let a=w(o,t.groupBy.field),f=Array.isArray(a)?a.join(", "):String(a??"(sem valor)");n.has(f)||n.set(f,[]),n.get(f).push(o)}let u=[...n.entries()],g=o=>/length\\s*\\(\\s*rows/i.test(o);if(t.sort){let o=g(t.sort.expr)||t.columns.some(a=>g(a.expr)&&a.alias?.toLowerCase()===t.sort.expr.toLowerCase());u.sort((a,f)=>{let i=o?a[1].length-f[1].length:a[0].localeCompare(f[0],"pt-BR");return t.sort.desc?-i:i})}else u.sort((o,a)=>o[0].localeCompare(a[0],"pt-BR"));if(t.kind==="LIST"){let o="";for(let[a,f]of u)o+=`<h4 class="dataview-lite-group">${y(a)} <span class="dataview-lite-count">(${f.length})</span></h4>`,o+=`<ul class="dataview-lite-list">${f.map(i=>`<li>${L(i)}</li>`).join("")}</ul>`;e.innerHTML=o||C();return}let h=t.columns.length>0?t.columns:[{expr:"length(rows)",alias:"Notas"}],m=[t.groupBy.alias??t.groupBy.field,...h.map(o=>o.alias??o.expr)],p="";for(let[o,a]of u){let f=h.map(i=>{if(g(i.expr))return String(a.length);if(i.expr.toLowerCase()===t.groupBy.field.toLowerCase())return y(o);let d=[...new Set(a.map(c=>S(w(c,i.expr))))].filter(c=>c!=="");return y(d.join(", ")||"\\u2014")});p+=`<tr><td>${y(o)}</td>${f.map(i=>`<td>${i}</td>`).join("")}</tr>`}e.innerHTML=x(m,p);return}if(t.sort){let{expr:n,desc:u}=t.sort;s.sort((g,h)=>{let m=S(w(g,n)),p=S(w(h,n)),o=typeof m=="number"&&typeof p=="number"?m-p:String(m).localeCompare(String(p),"pt-BR");return u?-o:o})}else s.sort((n,u)=>n.title.localeCompare(u.title,"pt-BR"));if(t.kind==="LIST"){e.innerHTML=s.length?`<ul class="dataview-lite-list">${s.map(n=>`<li>${L(n)}</li>`).join("")}</ul>`:C();return}let l=t.withoutId?[...t.columns]:[{expr:"file.link",alias:"Nota"},...t.columns],v=l.map(n=>n.alias??n.expr),E=s.map(n=>`<tr>${l.map(u=>`<td>${b(n,u.expr)}</td>`).join("")}</tr>`).join("");e.innerHTML=s.length?x(v,E):C()}function x(e,t){return`<div class="table-container dataview-lite-table"><table><thead><tr>${e.map(r=>`<th>${y(r)}</th>`).join("")}</tr></thead><tbody>${t}</tbody></table></div>`}function C(){return\'<p class="dataview-lite-empty">Nenhuma nota encontrada para esta consulta.</p>\'}function $(){let e=document.querySelectorAll(".dataview-lite[data-query]");if(e.length===0)return;let t=document.getElementById("dataview-lite-index");if(!t||!t.textContent)return;let r;try{r=JSON.parse(t.textContent)}catch{return}for(let s of e)try{let l=B(A(s.dataset.query));k(s,l,r)}catch(l){s.innerHTML=`<div class="dataview-lite-error"><strong>Consulta Dataview n\\xE3o suportada:</strong> ${y(l instanceof Error?l.message:String(l))}</div>`}}document.addEventListener("nav",$);document.addEventListener("render",$);})();\n';

// plugins/dataview-lite/src/components/dataview.scss
var dataview_default = ".dataview-lite {\n  margin: 1rem 0;\n}\n.dataview-lite .dataview-lite-loading,\n.dataview-lite .dataview-lite-empty {\n  color: var(--gray);\n  font-size: 0.9rem;\n  font-style: italic;\n}\n.dataview-lite .dataview-lite-error {\n  border: 1px solid var(--lightgray);\n  border-left: 3px solid var(--tertiary);\n  border-radius: 0 6px 6px 0;\n  padding: 0.5rem 1rem;\n  color: var(--gray);\n  font-size: 0.9rem;\n}\n.dataview-lite .dataview-lite-group {\n  margin: 1.25rem 0 0.25rem 0;\n  font-size: 1rem;\n}\n.dataview-lite .dataview-lite-group .dataview-lite-count {\n  color: var(--gray);\n  font-weight: normal;\n  font-size: 0.85rem;\n}\n.dataview-lite .dataview-lite-list {\n  margin: 0.25rem 0;\n}";

// node_modules/preact/dist/preact.mjs
var n;
var l;
var u;
var t;
var i;
var r;
var o;
var e;
var f;
var c;
var s;
var a;
var h;
var p = {};
var v = [];
var y = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;
var d = Array.isArray;
function w(n2, l2) {
  for (var u3 in l2) n2[u3] = l2[u3];
  return n2;
}
function g(n2) {
  n2 && n2.parentNode && n2.parentNode.removeChild(n2);
}
function m(n2, t2, i2, r2, o2) {
  var e2 = { type: n2, props: t2, key: i2, ref: r2, __k: null, __: null, __b: 0, __e: null, __c: null, constructor: void 0, __v: null == o2 ? ++u : o2, __i: -1, __u: 0 };
  return null == o2 && null != l.vnode && l.vnode(e2), e2;
}
function k(n2) {
  return n2.children;
}
function x(n2, l2) {
  this.props = n2, this.context = l2;
}
function S(n2, l2) {
  if (null == l2) return n2.__ ? S(n2.__, n2.__i + 1) : null;
  for (var u3; l2 < n2.__k.length; l2++) if (null != (u3 = n2.__k[l2]) && null != u3.__e) return u3.__e;
  return "function" == typeof n2.type ? S(n2) : null;
}
function C(n2) {
  if (n2.__P && n2.__d) {
    var u3 = n2.__v, t2 = u3.__e, i2 = [], r2 = [], o2 = w({}, u3);
    o2.__v = u3.__v + 1, l.vnode && l.vnode(o2), z(n2.__P, o2, u3, n2.__n, n2.__P.namespaceURI, 32 & u3.__u ? [t2] : null, i2, null == t2 ? S(u3) : t2, !!(32 & u3.__u), r2), o2.__v = u3.__v, o2.__.__k[o2.__i] = o2, V(i2, o2, r2), u3.__e = u3.__ = null, o2.__e != t2 && M(o2);
  }
}
function M(n2) {
  if (null != (n2 = n2.__) && null != n2.__c) return n2.__e = n2.__c.base = null, n2.__k.some(function(l2) {
    if (null != l2 && null != l2.__e) return n2.__e = n2.__c.base = l2.__e;
  }), M(n2);
}
function $(n2) {
  (!n2.__d && (n2.__d = true) && i.push(n2) && !I.__r++ || r != l.debounceRendering) && ((r = l.debounceRendering) || o)(I);
}
function I() {
  for (var n2, l2 = 1; i.length; ) i.length > l2 && i.sort(e), n2 = i.shift(), l2 = i.length, C(n2);
  I.__r = 0;
}
function P(n2, l2, u3, t2, i2, r2, o2, e2, f3, c2, s2) {
  var a2, h2, y2, d2, w2, g2, _, m2 = t2 && t2.__k || v, b = l2.length;
  for (f3 = A(u3, l2, m2, f3, b), a2 = 0; a2 < b; a2++) null != (y2 = u3.__k[a2]) && (h2 = -1 != y2.__i && m2[y2.__i] || p, y2.__i = a2, g2 = z(n2, y2, h2, i2, r2, o2, e2, f3, c2, s2), d2 = y2.__e, y2.ref && h2.ref != y2.ref && (h2.ref && D(h2.ref, null, y2), s2.push(y2.ref, y2.__c || d2, y2)), null == w2 && null != d2 && (w2 = d2), (_ = !!(4 & y2.__u)) || h2.__k === y2.__k ? f3 = H(y2, f3, n2, _) : "function" == typeof y2.type && void 0 !== g2 ? f3 = g2 : d2 && (f3 = d2.nextSibling), y2.__u &= -7);
  return u3.__e = w2, f3;
}
function A(n2, l2, u3, t2, i2) {
  var r2, o2, e2, f3, c2, s2 = u3.length, a2 = s2, h2 = 0;
  for (n2.__k = new Array(i2), r2 = 0; r2 < i2; r2++) null != (o2 = l2[r2]) && "boolean" != typeof o2 && "function" != typeof o2 ? ("string" == typeof o2 || "number" == typeof o2 || "bigint" == typeof o2 || o2.constructor == String ? o2 = n2.__k[r2] = m(null, o2, null, null, null) : d(o2) ? o2 = n2.__k[r2] = m(k, { children: o2 }, null, null, null) : void 0 === o2.constructor && o2.__b > 0 ? o2 = n2.__k[r2] = m(o2.type, o2.props, o2.key, o2.ref ? o2.ref : null, o2.__v) : n2.__k[r2] = o2, f3 = r2 + h2, o2.__ = n2, o2.__b = n2.__b + 1, e2 = null, -1 != (c2 = o2.__i = T(o2, u3, f3, a2)) && (a2--, (e2 = u3[c2]) && (e2.__u |= 2)), null == e2 || null == e2.__v ? (-1 == c2 && (i2 > s2 ? h2-- : i2 < s2 && h2++), "function" != typeof o2.type && (o2.__u |= 4)) : c2 != f3 && (c2 == f3 - 1 ? h2-- : c2 == f3 + 1 ? h2++ : (c2 > f3 ? h2-- : h2++, o2.__u |= 4))) : n2.__k[r2] = null;
  if (a2) for (r2 = 0; r2 < s2; r2++) null != (e2 = u3[r2]) && 0 == (2 & e2.__u) && (e2.__e == t2 && (t2 = S(e2)), E(e2, e2));
  return t2;
}
function H(n2, l2, u3, t2) {
  var i2, r2;
  if ("function" == typeof n2.type) {
    for (i2 = n2.__k, r2 = 0; i2 && r2 < i2.length; r2++) i2[r2] && (i2[r2].__ = n2, l2 = H(i2[r2], l2, u3, t2));
    return l2;
  }
  n2.__e != l2 && (t2 && (l2 && n2.type && !l2.parentNode && (l2 = S(n2)), u3.insertBefore(n2.__e, l2 || null)), l2 = n2.__e);
  do {
    l2 = l2 && l2.nextSibling;
  } while (null != l2 && 8 == l2.nodeType);
  return l2;
}
function T(n2, l2, u3, t2) {
  var i2, r2, o2, e2 = n2.key, f3 = n2.type, c2 = l2[u3], s2 = null != c2 && 0 == (2 & c2.__u);
  if (null === c2 && null == e2 || s2 && e2 == c2.key && f3 == c2.type) return u3;
  if (t2 > (s2 ? 1 : 0)) {
    for (i2 = u3 - 1, r2 = u3 + 1; i2 >= 0 || r2 < l2.length; ) if (null != (c2 = l2[o2 = i2 >= 0 ? i2-- : r2++]) && 0 == (2 & c2.__u) && e2 == c2.key && f3 == c2.type) return o2;
  }
  return -1;
}
function j(n2, l2, u3) {
  "-" == l2[0] ? n2.setProperty(l2, null == u3 ? "" : u3) : n2[l2] = null == u3 ? "" : "number" != typeof u3 || y.test(l2) ? u3 : u3 + "px";
}
function F(n2, l2, u3, t2, i2) {
  var r2, o2;
  n: if ("style" == l2) if ("string" == typeof u3) n2.style.cssText = u3;
  else {
    if ("string" == typeof t2 && (n2.style.cssText = t2 = ""), t2) for (l2 in t2) u3 && l2 in u3 || j(n2.style, l2, "");
    if (u3) for (l2 in u3) t2 && u3[l2] == t2[l2] || j(n2.style, l2, u3[l2]);
  }
  else if ("o" == l2[0] && "n" == l2[1]) r2 = l2 != (l2 = l2.replace(f, "$1")), o2 = l2.toLowerCase(), l2 = o2 in n2 || "onFocusOut" == l2 || "onFocusIn" == l2 ? o2.slice(2) : l2.slice(2), n2.l || (n2.l = {}), n2.l[l2 + r2] = u3, u3 ? t2 ? u3.u = t2.u : (u3.u = c, n2.addEventListener(l2, r2 ? a : s, r2)) : n2.removeEventListener(l2, r2 ? a : s, r2);
  else {
    if ("http://www.w3.org/2000/svg" == i2) l2 = l2.replace(/xlink(H|:h)/, "h").replace(/sName$/, "s");
    else if ("width" != l2 && "height" != l2 && "href" != l2 && "list" != l2 && "form" != l2 && "tabIndex" != l2 && "download" != l2 && "rowSpan" != l2 && "colSpan" != l2 && "role" != l2 && "popover" != l2 && l2 in n2) try {
      n2[l2] = null == u3 ? "" : u3;
      break n;
    } catch (n3) {
    }
    "function" == typeof u3 || (null == u3 || false === u3 && "-" != l2[4] ? n2.removeAttribute(l2) : n2.setAttribute(l2, "popover" == l2 && 1 == u3 ? "" : u3));
  }
}
function O(n2) {
  return function(u3) {
    if (this.l) {
      var t2 = this.l[u3.type + n2];
      if (null == u3.t) u3.t = c++;
      else if (u3.t < t2.u) return;
      return t2(l.event ? l.event(u3) : u3);
    }
  };
}
function z(n2, u3, t2, i2, r2, o2, e2, f3, c2, s2) {
  var a2, h2, p2, y2, _, m2, b, S2, C2, M2, $2, I2, A2, H2, L, T2 = u3.type;
  if (void 0 !== u3.constructor) return null;
  128 & t2.__u && (c2 = !!(32 & t2.__u), o2 = [f3 = u3.__e = t2.__e]), (a2 = l.__b) && a2(u3);
  n: if ("function" == typeof T2) try {
    if (S2 = u3.props, C2 = "prototype" in T2 && T2.prototype.render, M2 = (a2 = T2.contextType) && i2[a2.__c], $2 = a2 ? M2 ? M2.props.value : a2.__ : i2, t2.__c ? b = (h2 = u3.__c = t2.__c).__ = h2.__E : (C2 ? u3.__c = h2 = new T2(S2, $2) : (u3.__c = h2 = new x(S2, $2), h2.constructor = T2, h2.render = G), M2 && M2.sub(h2), h2.state || (h2.state = {}), h2.__n = i2, p2 = h2.__d = true, h2.__h = [], h2._sb = []), C2 && null == h2.__s && (h2.__s = h2.state), C2 && null != T2.getDerivedStateFromProps && (h2.__s == h2.state && (h2.__s = w({}, h2.__s)), w(h2.__s, T2.getDerivedStateFromProps(S2, h2.__s))), y2 = h2.props, _ = h2.state, h2.__v = u3, p2) C2 && null == T2.getDerivedStateFromProps && null != h2.componentWillMount && h2.componentWillMount(), C2 && null != h2.componentDidMount && h2.__h.push(h2.componentDidMount);
    else {
      if (C2 && null == T2.getDerivedStateFromProps && S2 !== y2 && null != h2.componentWillReceiveProps && h2.componentWillReceiveProps(S2, $2), u3.__v == t2.__v || !h2.__e && null != h2.shouldComponentUpdate && false === h2.shouldComponentUpdate(S2, h2.__s, $2)) {
        u3.__v != t2.__v && (h2.props = S2, h2.state = h2.__s, h2.__d = false), u3.__e = t2.__e, u3.__k = t2.__k, u3.__k.some(function(n3) {
          n3 && (n3.__ = u3);
        }), v.push.apply(h2.__h, h2._sb), h2._sb = [], h2.__h.length && e2.push(h2);
        break n;
      }
      null != h2.componentWillUpdate && h2.componentWillUpdate(S2, h2.__s, $2), C2 && null != h2.componentDidUpdate && h2.__h.push(function() {
        h2.componentDidUpdate(y2, _, m2);
      });
    }
    if (h2.context = $2, h2.props = S2, h2.__P = n2, h2.__e = false, I2 = l.__r, A2 = 0, C2) h2.state = h2.__s, h2.__d = false, I2 && I2(u3), a2 = h2.render(h2.props, h2.state, h2.context), v.push.apply(h2.__h, h2._sb), h2._sb = [];
    else do {
      h2.__d = false, I2 && I2(u3), a2 = h2.render(h2.props, h2.state, h2.context), h2.state = h2.__s;
    } while (h2.__d && ++A2 < 25);
    h2.state = h2.__s, null != h2.getChildContext && (i2 = w(w({}, i2), h2.getChildContext())), C2 && !p2 && null != h2.getSnapshotBeforeUpdate && (m2 = h2.getSnapshotBeforeUpdate(y2, _)), H2 = null != a2 && a2.type === k && null == a2.key ? q(a2.props.children) : a2, f3 = P(n2, d(H2) ? H2 : [H2], u3, t2, i2, r2, o2, e2, f3, c2, s2), h2.base = u3.__e, u3.__u &= -161, h2.__h.length && e2.push(h2), b && (h2.__E = h2.__ = null);
  } catch (n3) {
    if (u3.__v = null, c2 || null != o2) if (n3.then) {
      for (u3.__u |= c2 ? 160 : 128; f3 && 8 == f3.nodeType && f3.nextSibling; ) f3 = f3.nextSibling;
      o2[o2.indexOf(f3)] = null, u3.__e = f3;
    } else {
      for (L = o2.length; L--; ) g(o2[L]);
      N(u3);
    }
    else u3.__e = t2.__e, u3.__k = t2.__k, n3.then || N(u3);
    l.__e(n3, u3, t2);
  }
  else null == o2 && u3.__v == t2.__v ? (u3.__k = t2.__k, u3.__e = t2.__e) : f3 = u3.__e = B(t2.__e, u3, t2, i2, r2, o2, e2, c2, s2);
  return (a2 = l.diffed) && a2(u3), 128 & u3.__u ? void 0 : f3;
}
function N(n2) {
  n2 && (n2.__c && (n2.__c.__e = true), n2.__k && n2.__k.some(N));
}
function V(n2, u3, t2) {
  for (var i2 = 0; i2 < t2.length; i2++) D(t2[i2], t2[++i2], t2[++i2]);
  l.__c && l.__c(u3, n2), n2.some(function(u4) {
    try {
      n2 = u4.__h, u4.__h = [], n2.some(function(n3) {
        n3.call(u4);
      });
    } catch (n3) {
      l.__e(n3, u4.__v);
    }
  });
}
function q(n2) {
  return "object" != typeof n2 || null == n2 || n2.__b > 0 ? n2 : d(n2) ? n2.map(q) : w({}, n2);
}
function B(u3, t2, i2, r2, o2, e2, f3, c2, s2) {
  var a2, h2, v2, y2, w2, _, m2, b = i2.props || p, k2 = t2.props, x2 = t2.type;
  if ("svg" == x2 ? o2 = "http://www.w3.org/2000/svg" : "math" == x2 ? o2 = "http://www.w3.org/1998/Math/MathML" : o2 || (o2 = "http://www.w3.org/1999/xhtml"), null != e2) {
    for (a2 = 0; a2 < e2.length; a2++) if ((w2 = e2[a2]) && "setAttribute" in w2 == !!x2 && (x2 ? w2.localName == x2 : 3 == w2.nodeType)) {
      u3 = w2, e2[a2] = null;
      break;
    }
  }
  if (null == u3) {
    if (null == x2) return document.createTextNode(k2);
    u3 = document.createElementNS(o2, x2, k2.is && k2), c2 && (l.__m && l.__m(t2, e2), c2 = false), e2 = null;
  }
  if (null == x2) b === k2 || c2 && u3.data == k2 || (u3.data = k2);
  else {
    if (e2 = e2 && n.call(u3.childNodes), !c2 && null != e2) for (b = {}, a2 = 0; a2 < u3.attributes.length; a2++) b[(w2 = u3.attributes[a2]).name] = w2.value;
    for (a2 in b) w2 = b[a2], "dangerouslySetInnerHTML" == a2 ? v2 = w2 : "children" == a2 || a2 in k2 || "value" == a2 && "defaultValue" in k2 || "checked" == a2 && "defaultChecked" in k2 || F(u3, a2, null, w2, o2);
    for (a2 in k2) w2 = k2[a2], "children" == a2 ? y2 = w2 : "dangerouslySetInnerHTML" == a2 ? h2 = w2 : "value" == a2 ? _ = w2 : "checked" == a2 ? m2 = w2 : c2 && "function" != typeof w2 || b[a2] === w2 || F(u3, a2, w2, b[a2], o2);
    if (h2) c2 || v2 && (h2.__html == v2.__html || h2.__html == u3.innerHTML) || (u3.innerHTML = h2.__html), t2.__k = [];
    else if (v2 && (u3.innerHTML = ""), P("template" == t2.type ? u3.content : u3, d(y2) ? y2 : [y2], t2, i2, r2, "foreignObject" == x2 ? "http://www.w3.org/1999/xhtml" : o2, e2, f3, e2 ? e2[0] : i2.__k && S(i2, 0), c2, s2), null != e2) for (a2 = e2.length; a2--; ) g(e2[a2]);
    c2 || (a2 = "value", "progress" == x2 && null == _ ? u3.removeAttribute("value") : null != _ && (_ !== u3[a2] || "progress" == x2 && !_ || "option" == x2 && _ != b[a2]) && F(u3, a2, _, b[a2], o2), a2 = "checked", null != m2 && m2 != u3[a2] && F(u3, a2, m2, b[a2], o2));
  }
  return u3;
}
function D(n2, u3, t2) {
  try {
    if ("function" == typeof n2) {
      var i2 = "function" == typeof n2.__u;
      i2 && n2.__u(), i2 && null == u3 || (n2.__u = n2(u3));
    } else n2.current = u3;
  } catch (n3) {
    l.__e(n3, t2);
  }
}
function E(n2, u3, t2) {
  var i2, r2;
  if (l.unmount && l.unmount(n2), (i2 = n2.ref) && (i2.current && i2.current != n2.__e || D(i2, null, u3)), null != (i2 = n2.__c)) {
    if (i2.componentWillUnmount) try {
      i2.componentWillUnmount();
    } catch (n3) {
      l.__e(n3, u3);
    }
    i2.base = i2.__P = null;
  }
  if (i2 = n2.__k) for (r2 = 0; r2 < i2.length; r2++) i2[r2] && E(i2[r2], u3, t2 || "function" != typeof n2.type);
  t2 || g(n2.__e), n2.__c = n2.__ = n2.__e = void 0;
}
function G(n2, l2, u3) {
  return this.constructor(n2, u3);
}
n = v.slice, l = { __e: function(n2, l2, u3, t2) {
  for (var i2, r2, o2; l2 = l2.__; ) if ((i2 = l2.__c) && !i2.__) try {
    if ((r2 = i2.constructor) && null != r2.getDerivedStateFromError && (i2.setState(r2.getDerivedStateFromError(n2)), o2 = i2.__d), null != i2.componentDidCatch && (i2.componentDidCatch(n2, t2 || {}), o2 = i2.__d), o2) return i2.__E = i2;
  } catch (l3) {
    n2 = l3;
  }
  throw n2;
} }, u = 0, t = function(n2) {
  return null != n2 && void 0 === n2.constructor;
}, x.prototype.setState = function(n2, l2) {
  var u3;
  u3 = null != this.__s && this.__s != this.state ? this.__s : this.__s = w({}, this.state), "function" == typeof n2 && (n2 = n2(w({}, u3), this.props)), n2 && w(u3, n2), null != n2 && this.__v && (l2 && this._sb.push(l2), $(this));
}, x.prototype.forceUpdate = function(n2) {
  this.__v && (this.__e = true, n2 && this.__h.push(n2), $(this));
}, x.prototype.render = k, i = [], o = "function" == typeof Promise ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, e = function(n2, l2) {
  return n2.__v.__b - l2.__v.__b;
}, I.__r = 0, f = /(PointerCapture)$|Capture$/i, c = 0, s = O(false), a = O(true), h = 0;

// node_modules/preact/jsx-runtime/dist/jsxRuntime.mjs
var f2 = 0;
function u2(e2, t2, n2, o2, i2, u3) {
  t2 || (t2 = {});
  var a2, c2, p2 = t2;
  if ("ref" in p2) for (c2 in p2 = {}, t2) "ref" == c2 ? a2 = t2[c2] : p2[c2] = t2[c2];
  var l2 = { type: e2, props: p2, key: n2, ref: a2, __k: null, __: null, __b: 0, __e: null, __c: null, constructor: void 0, __v: --f2, __i: -1, __u: 0, __source: i2, __self: u3 };
  if ("function" == typeof e2 && (a2 = e2.defaultProps)) for (c2 in a2) void 0 === p2[c2] && (p2[c2] = a2[c2]);
  return l.vnode && l.vnode(l2), l2;
}

// plugins/dataview-lite/src/components/DataviewLite.tsx
var EXCLUDED_FM_KEYS = /* @__PURE__ */ new Set(["password", "title", "tags"]);
var DataviewLiteConstructor = () => {
  const DataviewLite = ({ fileData, allFiles }) => {
    if (!fileData.dataviewLite) return null;
    const entries = [];
    for (const f3 of allFiles) {
      const slug = f3.slug;
      if (!slug || slug === "404") continue;
      const frontmatter = f3.frontmatter ?? {};
      const filePath = f3.filePath ?? "";
      const folder = filePath.replace(/^content\//, "").split("/").slice(0, -1).join("/");
      const rawTags = frontmatter.tags ?? [];
      const tags = (Array.isArray(rawTags) ? rawTags : [rawTags]).map((t2) => String(t2).replace(/^#/, "")).filter(Boolean);
      const fm = {};
      for (const [k2, v2] of Object.entries(frontmatter)) {
        if (!EXCLUDED_FM_KEYS.has(k2) && v2 !== null && v2 !== void 0) fm[k2] = v2;
      }
      const dates = f3.dates;
      entries.push({
        slug,
        title: frontmatter.title ?? slug.split("/").pop() ?? slug,
        folder,
        tags,
        fm,
        created: dates?.created ? new Date(dates.created).toISOString() : void 0,
        modified: dates?.modified ? new Date(dates.modified).toISOString() : void 0
      });
    }
    const json = JSON.stringify(entries).replace(/</g, "\\u003c");
    return /* @__PURE__ */ u2(
      "script",
      {
        id: "dataview-lite-index",
        type: "application/json",
        dangerouslySetInnerHTML: { __html: json }
      }
    );
  };
  DataviewLite.css = dataview_default;
  DataviewLite.afterDOMLoaded = dataview_inline_default;
  return DataviewLite;
};
var DataviewLite_default = DataviewLiteConstructor;
export {
  DataviewLite_default as DataviewLite
};
