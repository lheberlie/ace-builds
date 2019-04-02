ace.define("ace/ext/token_tooltip_esri",["require","exports","module","ace/lib/dom","ace/lib/oop","ace/lib/event","ace/range","ace/tooltip"],function(e,t,n){"use strict";function a(e){if(e.tokenTooltip)return;u.call(this,e.container),e.tokenTooltip=this,this.editor=e,this.update=this.update.bind(this),this.onMouseMove=this.onMouseMove.bind(this),this.onMouseOut=this.onMouseOut.bind(this),s.addListener(e.renderer.scroller,"mousemove",this.onMouseMove),s.addListener(e.renderer.content,"mouseout",this.onMouseOut)}var r=e("ace/lib/dom"),i=e("ace/lib/oop"),s=e("ace/lib/event"),o=e("ace/range").Range,u=e("ace/tooltip").Tooltip;i.inherits(a,u),function(){this.token={},this.range=new o,this.update=function(){this.$timer=null;var e=this.editor.renderer;this.lastT-(e.timeStamp||0)>1e3&&(e.rect=null,e.timeStamp=this.lastT,this.maxHeight=window.innerHeight,this.maxWidth=window.innerWidth);var t=e.rect||(e.rect=e.scroller.getBoundingClientRect()),n=(this.x+e.scrollLeft-t.left-e.$padding)/e.characterWidth,r=Math.floor((this.y+e.scrollTop-t.top)/e.lineHeight),i=Math.round(n),s={row:r,column:i,side:n-i>0?1:-1},u=this.editor.session,a=u.screenToDocumentPosition(s.row,s.column),f=u.getTokenAt(a.row,a.column);!f&&!u.getLine(a.row)&&(f={type:"",value:"",state:u.bgTokenizer.getState(0)});if(!f||!/esri[-\w]+href/.test(f.type)){this.editor.renderer.setCursorStyle(""),u.removeMarker(this.marker),this.hide();return}this.editor.renderer.setCursorStyle("pointer");var l=f.type;f.state&&(l+="|"+f.state),f.merge&&(l+="\n  merge"),f.stateTransitions&&(l+="\n  "+f.stateTransitions.join("\n  "));var c=" see item";/esri-mid-href/i.test(f.type)?c=" see API Reference":/esri-url-href/i.test(f.type)&&(c=" open link"),/mac/i.test(navigator.userAgent)?l="Cmd + click to"+c:l="Ctrl + click to"+c,this.tokenText!=l&&(this.setText(l),this.width=this.getWidth(),this.height=this.getHeight(),this.tokenText=l),this.show(null,this.x,this.y),this.token=f,u.removeMarker(this.marker),this.range=new o(a.row,f.start,a.row,f.start+f.value.length),this.marker=u.addMarker(this.range,"ace_bracket","text")},this.onMouseMove=function(e){this.x=e.clientX,this.y=e.clientY,this.isOpen&&(this.lastT=e.timeStamp,this.setPosition(this.x,this.y)),this.$timer||(this.$timer=setTimeout(this.update,100))},this.onMouseOut=function(e){if(e&&e.currentTarget.contains(e.relatedTarget))return;this.hide(),this.editor.session.removeMarker(this.marker),this.$timer=clearTimeout(this.$timer)},this.setPosition=function(e,t){e+10+this.width>this.maxWidth&&(e=window.innerWidth-this.width-10);if(t>window.innerHeight*.75||t+20+this.height>this.maxHeight)t=t-this.height-30;u.prototype.setPosition.call(this,e+10,t+20)},this.destroy=function(){this.onMouseOut(),s.removeListener(this.editor.renderer.scroller,"mousemove",this.onMouseMove),s.removeListener(this.editor.renderer.content,"mouseout",this.onMouseOut),delete this.editor.tokenTooltip}}.call(a.prototype),t.TokenTooltip=a}),ace.define("ace/ext/linking_esri",["require","exports","module","ace/editor","ace/ext/token_tooltip_esri","ace/config"],function(e,t,n){function s(e){var n=e.editor,r=e.getAccelKey();if(r){var n=e.editor,i=e.getDocumentPosition(),s=n.session,o=s.getTokenAt(i.row,i.column);t.previousLinkingHover&&t.previousLinkingHover!=o&&n._emit("linkHoverOut"),n._emit("linkHover",{position:i,token:o}),t.previousLinkingHover=o}else t.previousLinkingHover&&(n._emit("linkHoverOut"),t.previousLinkingHover=!1)}function o(e){var t=e.getAccelKey(),n=e.getButton();if(n==0&&t){var r=e.editor,i=e.getDocumentPosition(),s=r.session,o=s.getTokenAt(i.row,i.column);r._emit("linkClick",{position:i,token:o})}}var r=e("ace/editor").Editor,i=e("ace/ext/token_tooltip_esri").TokenTooltip;e("../config").defineOptions(r.prototype,"editor",{enableLinking:{set:function(e){e?(this.on("click",o),this.on("mousemove",s),new i(this)):(this.off("click",o),this.off("mousemove",s))},value:!1}}),t.previousLinkingHover=!1});                (function() {
                    ace.require(["ace/ext/linking_esri"], function(m) {
                        if (typeof module == "object" && typeof exports == "object" && module) {
                            module.exports = m;
                        }
                    });
                })();
            