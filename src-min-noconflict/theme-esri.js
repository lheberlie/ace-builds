ace.define("ace/theme/esri",["require","exports","module","ace/lib/dom"],function(e,t,n){t.isDark=!1,t.cssClass="ace-esri",t.cssText=undefined;var r=e("../lib/dom");r.importCssString(t.cssText,t.cssClass)});                (function() {
                    ace.require(["ace/theme/esri"], function(m) {
                        if (typeof module == "object" && typeof exports == "object" && module) {
                            module.exports = m;
                        }
                    });
                })();
            