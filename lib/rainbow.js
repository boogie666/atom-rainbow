'use babel'

import {CompositeDisposable} from 'atom'
import view from './view'
import debounce from 'lodash.debounce'
import escapeRegexp from 'escape-string-regexp'

const PAIRS = {
  '{': '}',
  '[': ']',
  '(': ')'
}

const DELAY = 170;

export default {
  intervalId : null,
  querySelector : null,
  activate () {
    this.intervalId = setInterval(this.run.bind(this), DELAY);
    this.querySelector = [
      ".syntax--bracket.syntax--round, .syntax--brace.syntax--round",
      ".syntax--bracket.syntax--curly, .syntax--brace.syntax--curly",
      ".syntax--bracket.syntax--square, .syntax--brace.syntax--square"
     ].join(", ");
  },

  run () {
    let el = atom.workspace.getActiveTextEditor().editorElement;
    let roundBraces = el.querySelectorAll(this.querySelector);


    let level = 0;
    roundBraces.forEach(function(brace){
      var text = brace.innerText;
      if(PAIRS[text]) level++;
      brace.classList.add("rainbow-item");
      brace.classList.add("rainbow-level-" + level);
      if(!PAIRS[text]) level--;
    })



  },

  deactivate () {
    clearInterval(this.intervalId);
  },

  serialize () {
    return {}
  }
}
