define("ace/ext/token_tooltip_esri",["require","exports","module","ace/lib/dom","ace/lib/oop","ace/lib/event","ace/range","ace/tooltip"], function(require, exports, module) {
  'use strict';

  var dom = require('ace/lib/dom');
  var oop = require('ace/lib/oop');
  var event = require('ace/lib/event');
  var Range = require('ace/range').Range;
  var Tooltip = require('ace/tooltip').Tooltip;

  function TokenTooltip(editor) {
    if (editor.tokenTooltip) return;
    Tooltip.call(this, editor.container);
    editor.tokenTooltip = this;
    this.editor = editor;

    this.update = this.update.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseOut = this.onMouseOut.bind(this);
    event.addListener(editor.renderer.scroller, 'mousemove', this.onMouseMove);
    event.addListener(editor.renderer.content, 'mouseout', this.onMouseOut);
  }

  oop.inherits(TokenTooltip, Tooltip);

  (function() {
    this.token = {};
    this.range = new Range();

    this.update = function() {
      this.$timer = null;

      var r = this.editor.renderer;
      if (this.lastT - (r.timeStamp || 0) > 1000) {
        r.rect = null;
        r.timeStamp = this.lastT;
        this.maxHeight = window.innerHeight;
        this.maxWidth = window.innerWidth;
      }

      var canvasPos = r.rect || (r.rect = r.scroller.getBoundingClientRect());
      var offset =
        (this.x + r.scrollLeft - canvasPos.left - r.$padding) /
        r.characterWidth;
      var row = Math.floor(
        (this.y + r.scrollTop - canvasPos.top) / r.lineHeight,
      );
      var col = Math.round(offset);

      var screenPos = {row: row, column: col, side: offset - col > 0 ? 1 : -1};
      var session = this.editor.session;
      var docPos = session.screenToDocumentPosition(
        screenPos.row,
        screenPos.column,
      );
      var token = session.getTokenAt(docPos.row, docPos.column);

      if (!token && !session.getLine(docPos.row)) {
        token = {
          type: '',
          value: '',
          state: session.bgTokenizer.getState(0),
        };
      }
      if (!token || !/esri[-\w]+href/.test(token.type)) {
        this.editor.renderer.setCursorStyle('');
        session.removeMarker(this.marker);
        this.hide();
        return;
      }

      this.editor.renderer.setCursorStyle('pointer');

      var tokenText = token.type;
      if (token.state) tokenText += '|' + token.state;
      if (token.merge) tokenText += '\n  merge';
      if (token.stateTransitions)
        tokenText += '\n  ' + token.stateTransitions.join('\n  ');

      var tooltipMessage = " see item";
      if (/esri-mid-href/i.test(token.type)) {
        tooltipMessage = " see API Reference";
      }

      if (/mac/i.test(navigator.userAgent)) {
        tokenText = 'Cmd + click to' + tooltipMessage;
      } else {
        tokenText = 'Ctrl + click to' + tooltipMessage;
      }

      if (this.tokenText != tokenText) {
        this.setText(tokenText);
        this.width = this.getWidth();
        this.height = this.getHeight();
        this.tokenText = tokenText;
      }

      this.show(null, this.x, this.y);

      this.token = token;
      session.removeMarker(this.marker);
      this.range = new Range(
        docPos.row,
        token.start,
        docPos.row,
        token.start + token.value.length,
      );
      this.marker = session.addMarker(this.range, 'ace_bracket', 'text');
    };

    this.onMouseMove = function(e) {
      this.x = e.clientX;
      this.y = e.clientY;
      if (this.isOpen) {
        this.lastT = e.timeStamp;
        this.setPosition(this.x, this.y);
      }
      if (!this.$timer) this.$timer = setTimeout(this.update, 100);
    };

    this.onMouseOut = function(e) {
      if (e && e.currentTarget.contains(e.relatedTarget)) return;
      this.hide();
      this.editor.session.removeMarker(this.marker);
      this.$timer = clearTimeout(this.$timer);
    };

    this.setPosition = function(x, y) {
      if (x + 10 + this.width > this.maxWidth)
        x = window.innerWidth - this.width - 10;
      if (
        y > window.innerHeight * 0.75 ||
        y + 20 + this.height > this.maxHeight
      )
        y = y - this.height - 30;

      Tooltip.prototype.setPosition.call(this, x + 10, y + 20);
    };

    this.destroy = function() {
      this.onMouseOut();
      event.removeListener(
        this.editor.renderer.scroller,
        'mousemove',
        this.onMouseMove,
      );
      event.removeListener(
        this.editor.renderer.content,
        'mouseout',
        this.onMouseOut,
      );
      delete this.editor.tokenTooltip;
    };
  }.call(TokenTooltip.prototype));

  exports.TokenTooltip = TokenTooltip;
});

define("ace/ext/linking_esri",["require","exports","module","ace/editor","ace/ext/token_tooltip_esri","ace/config"], function(require, exports, module) {
  var Editor = require('ace/editor').Editor;
  var TokenTooltip = require('ace/ext/token_tooltip_esri').TokenTooltip;

  require('../config').defineOptions(Editor.prototype, 'editor', {
    enableLinking: {
      set: function(val) {
        if (val) {
          this.on('click', onClick);
          this.on('mousemove', onMouseMove);
          new TokenTooltip(this);
        } else {
          this.off('click', onClick);
          this.off('mousemove', onMouseMove);
        }
      },
      value: false,
    },
  });

  exports.previousLinkingHover = false;

  function onMouseMove(e) {
    var editor = e.editor;
    var ctrl = e.getAccelKey();

    if (ctrl) {
      var editor = e.editor;
      var docPos = e.getDocumentPosition();
      var session = editor.session;
      var token = session.getTokenAt(docPos.row, docPos.column);

      if (
        exports.previousLinkingHover &&
        exports.previousLinkingHover != token
      ) {
        editor._emit('linkHoverOut');
      }
      editor._emit('linkHover', {position: docPos, token: token});
      exports.previousLinkingHover = token;
    } else if (exports.previousLinkingHover) {
      editor._emit('linkHoverOut');
      exports.previousLinkingHover = false;
    }
  }

  function onClick(e) {
    var ctrl = e.getAccelKey();
    var button = e.getButton();

    if (button == 0 && ctrl) {
      var editor = e.editor;
      var docPos = e.getDocumentPosition();
      var session = editor.session;
      var token = session.getTokenAt(docPos.row, docPos.column);

      editor._emit('linkClick', {position: docPos, token: token});
    }
  }
});                (function() {
                    window.require(["ace/ext/linking_esri"], function(m) {
                        if (typeof module == "object" && typeof exports == "object" && module) {
                            module.exports = m;
                        }
                    });
                })();
            