import {LitElement, html, css} from 'lit';
import {customElement, property, query} from 'lit/decorators.js';
// import {animate} from '@lit-labs/motion.js';
import {unsafeSVG} from 'lit/directives/unsafe-svg.js';
import {ifDefined} from 'lit/directives/if-defined.js';
import {repeat} from 'lit/directives/repeat.js';
import {ICON_SEND} from './constants';
import './widget-contacts';
import './widget-message';
import msgs from './mock.msg.list';
@customElement('widget-chatbox')
class WidgetChatbox extends LitElement {
  static override styles = css`
    :host {
      pointer-events: auto;
      /* opacity: 0; */
      font-family: system-ui, -apple-system, BlinkMacSystemFont, Segoe UI,
        Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif;
      position: relative;
      width: 672px;
      height: 328px;
      max-height: 328px;
      min-width: 672px;
      padding: 24px;
      padding-top: 0;
      border-radius: 32px;
      background-color: #f7f7f9;
      margin-bottom: 30px;
      transition: opacity 0.5s ease;
    }
    :host(.visible) {
      pointer-events: auto;
      opacity: 1;
    }
    .chat_box {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .tip {
      display: none;
      position: absolute;
      bottom: -30px;
      left: 0;
      color: #000;
      font-size: 16px;
      line-height: 1;
      font-weight: 500;
    }
    .tip em {
      padding: 0 5px;
      font-style: normal;
      color: rgba(0, 0, 0, 0.25);
    }
    :host(:hover) .tip {
      display: flex;
    }
    /* 信息流容器 */
    .feed {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 8px;
      overflow-y: auto;
      overflow-x: hidden;
      height: 100%;
      padding: 0 12px 10px 12px;
    }
    .feed::-webkit-scrollbar {
      display: none;
    }
    /* 底部工具栏 */
    .opts {
      display: flex;
      align-items: center;
      gap: 20px;
    }
    /* 工具栏：输入组件 */
    .opts .input {
      transition: all 0.5s ease-in;
      position: relative;
      display: flex;
      align-items: center;
      flex: 1;
    }
    .opts .input:focus-within button.send svg path {
      fill: #3898ec;
    }
    .opts .input input {
      outline: none;
      width: 100%;
      border: 2px solid #c4c4c6;
      border-radius: 80px;
      background-color: transparent;
      font-size: 18px;
      font-weight: 400;
      padding: 10px 12px;
    }
    .opts .input input:focus {
      border-color: #3898ec;
    }
    .opts .input button.send {
      position: absolute;
      right: 4px;
      top: 50%;
      transform: translateY(-50%);
      cursor: pointer;
      outline: none;
      border: none;
      background: none;
    }
    .opts .input button.send:hover svg path {
      fill: #0078ff;
    }
  `;
  @property()
  msgs = msgs;

  @query('.feed', true) _feed!: HTMLDivElement;
  @query('input', true) _input!: HTMLInputElement;
  private _sendMsg(e: Event) {
    if (!this._input.value.trim()) return;
    this.msgs = [
      ...this.msgs,
      {
        mid: new Date().getTime(),
        message: this._input.value.trim(),
        myself: true,
      },
    ];
    this._input.value = '';
    console.log(
      'scroll',
      this._feed,
      this._feed.scrollTop,
      this._feed.scrollHeight
    );
    setTimeout(() => {
      const lastMsgEle = this._feed.querySelector('widget-message:last-child');
      if (lastMsgEle) {
        lastMsgEle.scrollIntoView({behavior: 'smooth', block: 'end'});
      }
    }, 100);
  }
  override render() {
    return html` <section class="chat_box">
      <div class="feed">
        ${repeat(
          this.msgs,
          (m) => m.mid,
          (msg, idx) => html`
            <widget-message
              seq="${idx}"
              name="${ifDefined(msg.name)}"
              avatar="${ifDefined(msg.avatar)}"
              message="${msg.message}"
              myself="${ifDefined(msg.myself)}"
            ></widget-message>
          `
        )}
      </div>
      <div class="opts">
        <widget-contacts
          email="yanggc888@163.com"
          twitter="wsygc"
        ></widget-contacts>
        <div class="input">
          <input autofocus placeholder="Send Message" class="send" />
          <button class="send" @click="${this._sendMsg}">
            ${unsafeSVG(ICON_SEND)}
          </button>
        </div>
      </div>
      <span class="tip"
        >💬 Send me a text, email, or DM <em> (green bubbles welcomed)</em>
      </span>
    </section>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'widget-chatbox': WidgetChatbox;
  }
}
