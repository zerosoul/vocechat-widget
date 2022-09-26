import {LitElement, html, css} from 'lit';
import {cache} from 'lit/directives/cache.js';
import {customElement, property} from 'lit/decorators.js';
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
      display: flex;
      position: fixed;
      bottom: 15px;
      right: 15px;
    }
    .toggler {
      display: block;
      width: 50px;
      height: 50px;
      background: none;
      border-radius: 50%;
      border: 1px solid #eee;
      cursor: pointer;
      font-size: 24px;
      /* &:hover {
        background-color: red;
      } */
    }
    .wrapper {
      position: relative;
      width: 672px;
      height: 328px;
      max-height: 328px;
      min-width: 672px;
      padding: 24px;
      padding-top: 0;
      border-radius: 32px;
      background-color: #f7f7f9;
    }
  `;

  @property({type: Boolean})
  visible = false;

  override render() {
    return html`${cache(
      this.visible
        ? html`<div class="wrapper">333</div>`
        : html`<button class="toggler" @click=${this._visibleHandler}>
            v
          </button>`
    )} `;
  }

  private _visibleHandler() {
    this.visible = true;
    // this.dispatchEvent(new CustomEvent('count-changed'));
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'vocechat-widget': VoceChatWidget;
  }
}
