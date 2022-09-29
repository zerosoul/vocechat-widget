import {LitElement, html, css} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {unsafeSVG} from 'lit/directives/unsafe-svg.js';
import {ICON_MSG_TAIL_OTHERS, ICON_MSG_TAIL_MYSELF} from './constants';
@customElement('widget-message')
class WidgetMessage extends LitElement {
  static override styles = css`
    :host {
      display: flex;
      align-items: flex-end;
      gap: 10px;
    }
    :host([myself]) {
      justify-content: flex-end;
    }
    .avatar {
      width: 48px;
      height: 48px;
      border-radius: 50%;
    }
    .msg {
      position: relative;
      display: flex;
      flex-direction: column;
    }
    .msg .name {
      color: #8e8d94;
      font-size: 14px;
      margin-left: 8px;
      margin-bottom: 2px;
    }
    .msg .content {
      z-index: 2;
      color: #000;
      font-size: 20px;
      line-height: 125%;
      padding: 10px 16px;
      border-radius: 30px;
      max-width: 310px;
      word-break: break-all;
      background: #e9e9eb;
    }
    .msg > svg {
      z-index: 1;
      position: absolute;
      left: -8px;
      top: auto;
      bottom: 0;
      width: 24px;
      height: auto;
    }
    .msg.myself .content {
      color: #fff;
      background: #0078ff;
    }
    .msg.myself > svg {
      right: -6px;
      bottom: 0;
      left: unset;
    }
  `;

  @property({type: Boolean}) myself = false;
  @property({type: String}) message = 'message';
  @property({type: String}) avatar =
    'https://uploads-ssl.webflow.com/62c89bdb7c26b515f632de67/62e855526f99a814aee1bdab_3A63_b90_400x400.webp';
  @property({type: String}) name = 'name';

  override render() {
    return html`
      ${this.myself ? '' : html`<img src="${this.avatar}" class="avatar" />`}
      <div class="msg ${this.myself ? 'myself' : ''}">
        ${this.myself ? '' : html`<span class="name">${this.name}</span>`}
        <div class="content">${this.message}</div>
        ${this.myself
          ? unsafeSVG(ICON_MSG_TAIL_MYSELF)
          : unsafeSVG(ICON_MSG_TAIL_OTHERS)}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'widget-message': WidgetMessage;
  }
}
