'use strict';(function(f){"object"==typeof exports&&"object"==typeof module?f(require("../../lib/codemirror")):"function"==typeof define&&define.amd?define(["../../lib/codemirror"],f):f(CodeMirror)})(function(f){function h(k){var g={};k=k.split(" ");for(var f=0;f<k.length;++f)g[k[f]]=!0;return g}f.defineMode("d",function(k,g){function h(a,b){var c=a.next();if(p[c]){var d=p[c](a,b);if(!1!==d)return d}if('"'==c||"'"==c||"`"==c)return b.tokenize=w(c),b.tokenize(a,b);if(/[\[\]{}\(\),;:\.]/.test(c))return e=
c,null;if(/\d/.test(c))return a.eatWhile(/[\w\.]/),"number";if("/"==c){if(a.eat("+"))return b.tokenize=q,q(a,b);if(a.eat("*"))return b.tokenize=r,r(a,b);if(a.eat("/"))return a.skipToEnd(),"comment"}if(t.test(c))return a.eatWhile(t),"operator";a.eatWhile(/[\w\$_\xa1-\uffff]/);a=a.current();return x.propertyIsEnumerable(a)?(u.propertyIsEnumerable(a)&&(e="newstatement"),"keyword"):y.propertyIsEnumerable(a)?(u.propertyIsEnumerable(a)&&(e="newstatement"),"builtin"):z.propertyIsEnumerable(a)?"atom":"variable"}
function w(a){return function(b,c){for(var d=!1,e,f=!1;null!=(e=b.next());){if(e==a&&!d){f=!0;break}d=!d&&"\\"==e}if(f||!d&&!A)c.tokenize=null;return"string"}}function r(a,b){for(var c=!1,d;d=a.next();){if("/"==d&&c){b.tokenize=null;break}c="*"==d}return"comment"}function q(a,b){for(var c=!1,d;d=a.next();){if("/"==d&&c){b.tokenize=null;break}c="+"==d}return"comment"}function v(a,b,c,d,e){this.indented=a;this.column=b;this.type=c;this.align=d;this.prev=e}function m(a,b,c){var d=a.indented;a.context&&
"statement"==a.context.type&&(d=a.context.indented);return a.context=new v(d,b,c,null,a.context)}function l(a){var b=a.context.type;if(")"==b||"]"==b||"}"==b)a.indented=a.context.indented;return a.context=a.context.prev}var n=k.indentUnit,B=g.statementIndentUnit||n,x=g.keywords||{},y=g.builtin||{},u=g.blockKeywords||{},z=g.atoms||{},p=g.hooks||{},A=g.multiLineStrings,t=/[+\-*&%=<>!?|\/]/,e;return{startState:function(a){return{tokenize:null,context:new v((a||0)-n,0,"top",!1),indented:0,startOfLine:!0}},
token:function(a,b){var c=b.context;a.sol()&&(null==c.align&&(c.align=!1),b.indented=a.indentation(),b.startOfLine=!0);if(a.eatSpace())return null;e=null;var d=(b.tokenize||h)(a,b);if("comment"==d||"meta"==d)return d;null==c.align&&(c.align=!0);if(";"!=e&&":"!=e&&","!=e||"statement"!=c.type)if("{"==e)m(b,a.column(),"}");else if("["==e)m(b,a.column(),"]");else if("("==e)m(b,a.column(),")");else if("}"==e){for(;"statement"==c.type;)c=l(b);for("}"==c.type&&(c=l(b));"statement"==c.type;)c=l(b)}else e==
c.type?l(b):(("}"==c.type||"top"==c.type)&&";"!=e||"statement"==c.type&&"newstatement"==e)&&m(b,a.column(),"statement");else l(b);b.startOfLine=!1;return d},indent:function(a,b){if(a.tokenize!=h&&null!=a.tokenize)return f.Pass;a=a.context;b=b&&b.charAt(0);"statement"==a.type&&"}"==b&&(a=a.prev);var c=b==a.type;return"statement"==a.type?a.indented+("{"==b?0:B):a.align?a.column+(c?0:1):a.indented+(c?0:n)},electricChars:"{}"}});f.defineMIME("text/x-d",{name:"d",keywords:h("abstract alias align asm assert auto break case cast cdouble cent cfloat const continue debug default delegate delete deprecated export extern final finally function goto immutable import inout invariant is lazy macro module new nothrow override package pragma private protected public pure ref return shared short static super synchronized template this throw typedef typeid typeof volatile __FILE__ __LINE__ __gshared __traits __vector __parameters body catch class do else enum for foreach foreach_reverse if in interface mixin out scope struct switch try union unittest version while with"),
blockKeywords:h("body catch class do else enum for foreach foreach_reverse if in interface mixin out scope struct switch try union unittest version while with"),builtin:h("bool byte char creal dchar double float idouble ifloat int ireal long real short ubyte ucent uint ulong ushort wchar wstring void size_t sizediff_t"),atoms:h("exit failure success true false null"),hooks:{"@":function(f,g){f.eatWhile(/[\w\$_]/);return"meta"}}})});
