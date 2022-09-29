import {LitElement, html, css} from 'lit';
// import {cache} from 'lit/directives/cache.js';
import {customElement, property} from 'lit/decorators.js';
import {unsafeSVG} from 'lit/directives/unsafe-svg.js';
import './widget-chatbox';
import {ICON_CHAT, ICON_CLOSE_CHAT} from './constants';
// import wtf from './assets/add.svg';
@customElement('vocechat-widget')
export class VoceChatWidget extends LitElement {
  constructor() {
    super();
    // this.addEventListener('count-changed', () => {
    //   console.log('wtf');
    // });
  }

  static override styles = css`
    :host {
      position: fixed;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      transition: all 0.3s ease-in-out;
    }
    :host(:hover) {
      background-color: #cccccc50;
    }
    .wrapper {
      position: absolute;
      right: 15px;
      bottom: 15px;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
    }
    .wrapper .toggler {
      pointer-events: auto;
      display: block;
      padding: 8px;
      width: 60px;
      height: 60px;
      background: none;
      border-radius: 50%;
      border: none;
      cursor: pointer;
      font-size: 24px;
      transition: transform 0.3s ease-out;
    }
    .wrapper .toggler:hover {
      transform: translateY(-10px);
      background-color: #eeeeee50;
    }
    .wrapper .toggler svg {
      width: 100%;
      height: 100%;
    }
  `;

  @property({type: Boolean})
  visible = false;

  override render() {
    return html`
      <aside class="wrapper">
        <widget-chatbox
          class="${this.visible ? 'visible' : ''}"
        ></widget-chatbox>
        <button class="toggler" @click=${this._toggleVisibleHandler}>
          ${this.visible ? unsafeSVG(ICON_CLOSE_CHAT) : unsafeSVG(ICON_CHAT)}
        </button>
      </aside>
    `;
  }

  private _toggleVisibleHandler() {
    this.visible = !this.visible;
    // this.dispatchEvent(new CustomEvent('count-changed'));
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'vocechat-widget': VoceChatWidget;
  }
}
