define("ace/theme/esri",["require","exports","module","ace/lib/dom"], function(require, exports, module) {
  exports.isDark = false;
  exports.cssClass = 'ace-esri';
  exports.cssText = "\
.ace_editor {\
font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier,\
monospace !default;\
font-size: 12px;\
}\
.ace-esri .ace_gutter {\
background: #e8e8e8;\
color: #aaa;\
}\
.ace-esri {\
background: #fff;\
color: #24292e;\
}\
.ace-esri .ace_keyword {\
font-weight: inherit;\
}\
.ace-esri .ace_string {\
color: #032f62;\
}\
.ace-esri .ace_variable.ace_class {\
color: inherit;\
}\
.ace-esri .ace_variable.ace_language {\
color: #005cc5;\
}\
.ace-esri .ace_constant.ace_numeric {\
color: #099;\
}\
.ace-esri .ace_constant.ace_buildin {\
color: #0086b3;\
}\
.ace-esri .ace_support.ace_function {\
color: #0086b3;\
}\
.ace-esri .ace_support.ace_type {\
color: #005cc5;\
}\
.ace-esri .ace_support.ace_constant.ace_color {\
color: #005cc5;\
}\
.ace-esri .ace_support.ace_function.ace_dom {\
color: #005cc5;\
}\
.ace-esri .ace_support.ace_constant {\
color: #005cc5;\
}\
.ace-esri .ace_support.ace_constant.ace_fonts {\
color: #005cc5;\
}\
.ace-esri .ace_constant.ace_numeric {\
color: #005cc5;\
}\
.ace-esri .ace_constant.ace_language {\
color: #005cc5;\
}\
.ace-esri .ace_constant.ace_language.ace_escape {\
color: #005cc5;\
}\
.ace-esri .ace_entity.ace_name.ace_function {\
color: #6f42c1;\
}\
.ace-esri .ace_comment {\
color: #6a737d;\
}\
.ace-esri .ace_paren {\
font-weight: inherit;\
}\
.ace-esri .ace_boolean {\
font-weight: inherit;\
}\
.ace-esri .ace_string.ace_regexp {\
color: #009926;\
font-weight: normal;\
}\
.ace-esri .ace_variable.ace_instance {\
color: teal;\
}\
.ace-esri .ace_constant.ace_language {\
font-weight: inherit;\
}\
.ace-esri .ace_cursor {\
color: black;\
}\
.ace-esri.ace_focus .ace_marker-layer .ace_active-line {\
background: rgb(255, 255, 204);\
}\
.ace-esri .ace_marker-layer .ace_active-line {\
background: rgb(245, 245, 245);\
}\
.ace-esri .ace_marker-layer .ace_selection {\
background: rgb(181, 213, 255);\
}\
.ace-esri.ace_multiselect .ace_selection.ace_start {\
box-shadow: 0 0 3px 0px white;\
}\
.ace-esri.ace_nobold .ace_line > span {\
font-weight: normal !important;\
}\
.ace-esri .ace_marker-layer .ace_step {\
background: rgb(252, 255, 0);\
}\
.ace-esri .ace_marker-layer .ace_stack {\
background: rgb(164, 229, 101);\
}\
.ace-esri .ace_marker-layer .ace_bracket {\
margin: -1px 0 0 -1px;\
border: 1px solid rgb(192, 192, 192);\
}\
.ace-esri .ace_gutter-active-line {\
background-color: rgba(0, 0, 0, 0.07);\
}\
.ace-esri .ace_marker-layer .ace_selected-word {\
background: rgb(250, 250, 255);\
border: 1px solid rgb(200, 200, 250);\
}\
.ace-esri .ace_invisible {\
color: #bfbfbf;\
}\
.ace-esri .ace_print-margin {\
width: 1px;\
background: #e8e8e8;\
}\
.ace-esri .ace_storage.ace_type {\
color: #d73a49;\
}\
.ace-esri .ace_esri-portal-item-id-href {\
color: #0366d6;\
text-decoration: underline;\
}\
.ace-esri .ace_string.ace_attribute-value.ace_xml.ace_esri-url {\
color: #0366d6;\
text-decoration: underline;\
}\
.ace-esri .ace_string.ace_attribute-value.ace_xml {\
color: #032f62;\
}\
.ace-esri .ace_keyword.ace_operator.ace_attribute-equals.ace_xml {\
color: #6f42c1;\
}\
.ace-esri .ace_esri-mid-href {\
color: #6f42c1;\
}\
.ace-esri .ace_meta.ace_tag.ace_tag-name.ace_xml {\
color: #22863a;\
}\
.ace-esri .ace_constant {\
color: #22863a;\
}\
.ace-esri .ace_keyword.ace_keyword-css {\
color: #6f42c1;\
font-weight: normal;\
}\
.ace-esri .ace_constant.ace_numeric + .ace_keyword {\
color: #d73a49;\
}\
.ace-esri .ace_variable {\
color: #6f42c1;\
}\
.ace_entity.ace_other.ace_attribute-name.ace_xml {\
color: #6f42c1;\
}\
.ace_keyword {\
color: #d73a49;\
}\
.ace_github .ace_string {\
color: #032f62;\
}\
";

  var dom = require('../lib/dom');
  dom.importCssString(exports.cssText, exports.cssClass);
});                (function() {
                    window.require(["ace/theme/esri"], function(m) {
                        if (typeof module == "object" && typeof exports == "object" && module) {
                            module.exports = m;
                        }
                    });
                })();
            