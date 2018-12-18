'use strict';(function(e){"object"==typeof exports&&"object"==typeof module?e(require("../../lib/codemirror"),require("../htmlmixed/htmlmixed")):"function"==typeof define&&define.amd?define(["../../lib/codemirror","../htmlmixed/htmlmixed"],e):e(CodeMirror)})(function(e){var m="template literal msg fallbackmsg let if elseif else switch case default foreach ifempty for call param deltemplate delcall log".split(" ");e.defineMode("soy",function(f){function g(b){return b[b.length-1]}function n(b,a,c){if(b.sol()){for(var d=
0;d<a.indent&&b.eat(/\s/);d++);if(d)return null}d=b.string;if(c=c.exec(d.substr(b.pos)))b.string=d.substr(0,b.pos+c.index);c=b.hideFirstChars(a.indent,function(){var c=g(a.localStates);return c.mode.token(b,c.state)});b.string=d;return c}function h(b,a){return{element:a,next:b}}function p(b,a,c){a:{for(;b;){if(b.element===a){a=!0;break a}b=b.next}a=!1}return a?"variable-2":c?"variable":"variable-2 error"}function q(b){b.scopes&&(b.variables=b.scopes.element,b.scopes=b.scopes.next)}var k=e.getMode(f,
"text/plain"),l={html:e.getMode(f,{name:"text/html",multilineTagIndentFactor:2,multilineTagIndentPastTag:!1}),attributes:k,text:k,uri:k,trusted_resource_uri:k,css:e.getMode(f,"text/css"),js:e.getMode(f,{name:"text/javascript",statementIndent:2*f.indentUnit})};return{startState:function(){return{kind:[],kindTag:[],soyState:[],templates:null,variables:h(null,"ij"),scopes:null,indent:0,quoteKind:null,localStates:[{mode:l.html,state:e.startState(l.html)}]}},copyState:function(b){return{tag:b.tag,kind:b.kind.concat([]),
kindTag:b.kindTag.concat([]),soyState:b.soyState.concat([]),templates:b.templates,variables:b.variables,scopes:b.scopes,indent:b.indent,quoteKind:b.quoteKind,localStates:b.localStates.map(function(a){return{mode:a.mode,state:e.copyState(a.mode,a.state)}})}},token:function(b,a){var c;switch(g(a.soyState)){case "comment":b.match(/^.*?\*\//)?a.soyState.pop():b.skipToEnd();if(!a.scopes){var d=/@param\??\s+(\S+)/g;for(b=b.current();c=d.exec(b);)a.variables=h(a.variables,c[1])}return"comment";case "string":return c=
b.match(/^.*?(["']|\\[\s\S])/),c?c[1]==a.quoteKind&&(a.quoteKind=null,a.soyState.pop()):b.skipToEnd(),"string"}if(b.match(/^\/\*/))return a.soyState.push("comment"),"comment";if(b.match(b.sol()||a.soyState.length&&"literal"!=g(a.soyState)?/^\s*\/\/.*/:/^\s+\/\/.*/))return"comment";switch(g(a.soyState)){case "templ-def":if(c=b.match(/^\.?([\w]+(?!\.[\w]+)*)/))return a.templates=h(a.templates,c[1]),a.scopes=h(a.scopes,a.variables),a.soyState.pop(),"def";b.next();return null;case "templ-ref":if(c=b.match(/^\.?([\w]+)/))return a.soyState.pop(),
"."==c[0][0]?p(a.templates,c[1],!0):"variable";b.next();return null;case "param-def":if(c=b.match(/^\w+/))return a.variables=h(a.variables,c[0]),a.soyState.pop(),a.soyState.push("param-type"),"def";b.next();return null;case "param-type":if("}"==b.peek())return a.soyState.pop(),null;if(b.eatWhile(/^[\w]+/))return"variable-3";b.next();return null;case "var-def":if(c=b.match(/^\$([\w]+)/))return a.variables=h(a.variables,c[1]),a.soyState.pop(),"def";b.next();return null;case "tag":if(b.match(/^\/?}/))return"/template"==
a.tag||"/deltemplate"==a.tag?(q(a),a.variables=h(null,"ij"),a.indent=0):("/for"!=a.tag&&"/foreach"!=a.tag||q(a),a.indent-=f.indentUnit*("/}"==b.current()||-1==m.indexOf(a.tag)?2:1)),a.soyState.pop(),"keyword";if(b.match(/^([\w?]+)(?==)/))return"kind"==b.current()&&(c=b.match(/^="([^"]+)/,!1))&&(c=c[1],a.kind.push(c),a.kindTag.push(a.tag),c=l[c]||l.html,d=g(a.localStates),d.mode.indent&&(a.indent+=d.mode.indent(d.state,"")),a.localStates.push({mode:c,state:e.startState(c)})),"attribute";if(c=b.match(/^["']/))return a.soyState.push("string"),
a.quoteKind=c,"string";if(c=b.match(/^\$([\w]+)/))return p(a.variables,c[1]);if(c=b.match(/^\w+/))return/^(?:as|and|or|not|in)$/.test(c[0])?"keyword":null;b.next();return null;case "literal":return b.match(/^(?=\{\/literal})/)?(a.indent-=f.indentUnit,a.soyState.pop(),this.token(b,a)):n(b,a,/\{\/literal}/)}return b.match(/^\{literal}/)?(a.indent+=f.indentUnit,a.soyState.push("literal"),"keyword"):(c=b.match(/^\{([\/@\\]?\w+\??)(?=[\s\}]|\/[/*])/))?("/switch"!=c[1]&&(a.indent+=(/^(\/|(else|elseif|ifempty|case|fallbackmsg|default)$)/.test(c[1])&&
"switch"!=a.tag?1:2)*f.indentUnit),a.tag=c[1],a.tag=="/"+g(a.kindTag)&&(a.kind.pop(),a.kindTag.pop(),a.localStates.pop(),d=g(a.localStates),d.mode.indent&&(a.indent-=d.mode.indent(d.state,""))),a.soyState.push("tag"),"template"==a.tag||"deltemplate"==a.tag?a.soyState.push("templ-def"):"call"==a.tag||"delcall"==a.tag?a.soyState.push("templ-ref"):"let"==a.tag?a.soyState.push("var-def"):"for"==a.tag||"foreach"==a.tag?(a.scopes=h(a.scopes,a.variables),a.soyState.push("var-def")):"namespace"==a.tag?a.scopes||
(a.variables=h(null,"ij")):a.tag.match(/^@(?:param\??|inject)/)&&a.soyState.push("param-def"),"keyword"):b.eat("{")?(a.tag="print",a.indent+=2*f.indentUnit,a.soyState.push("tag"),"keyword"):n(b,a,/\{|\s+\/\/|\/\*/)},indent:function(b,a){var c=b.indent,d=g(b.soyState);if("comment"==d)return e.Pass;if("literal"==d)/^\{\/literal}/.test(a)&&(c-=f.indentUnit);else{if(/^\s*\{\/(template|deltemplate)\b/.test(a))return 0;/^\{(\/|(fallbackmsg|elseif|else|ifempty)\b)/.test(a)&&(c-=f.indentUnit);"switch"!=b.tag&&
/^\{(case|default)\b/.test(a)&&(c-=f.indentUnit);/^\{\/switch\b/.test(a)&&(c-=f.indentUnit)}b=g(b.localStates);c&&b.mode.indent&&(c+=b.mode.indent(b.state,a));return c},innerMode:function(b){return b.soyState.length&&"literal"!=g(b.soyState)?null:g(b.localStates)},electricInput:/^\s*\{(\/|\/template|\/deltemplate|\/switch|fallbackmsg|elseif|else|case|default|ifempty|\/literal\})$/,lineComment:"//",blockCommentStart:"/*",blockCommentEnd:"*/",blockCommentContinue:" * ",useInnerComments:!1,fold:"indent"}},
"htmlmixed");e.registerHelper("hintWords","soy",m.concat("delpackage namespace alias print css debugger".split(" ")));e.defineMIME("text/x-soy","soy")});
