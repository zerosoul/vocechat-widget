import {LitElement, html, css} from 'lit';
import {customElement} from 'lit/decorators.js';
// import {animate} from '@lit-labs/motion.js';
import {unsafeSVG} from 'lit/directives/unsafe-svg.js';
import {ICON_EMAIL, ICON_TWITTER, ICON_SEND} from './constants';
@customElement('vocechat-chatbox')
class VocechatChat extends LitElement {
  static override styles = css`
    :host {
      opacity: 0;
      /* display: none; */
      /* visibility: hidden; */
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
      /* display: block; */
      /* visibility: visible; */
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
      /* height: 100%; */
    }
    /* 底部工具栏 */
    .opts {
      display: flex;
      align-items: center;
      gap: 20px;
    }
    /* 工具栏：链接 */
    .opts .links {
      display: flex;
      align-items: center;
      gap: 16px;
    }
    .opts .links .contact {
      width: 36px;
      position: relative;
      display: flex;
    }
    .opts .links .contact:after {
      opacity: 0;
      position: absolute;
      top: -80%;
      left: 50%;
      transform: translateX(-50%);
      content: attr(data-tip);
      padding: 8px;
      border-radius: 7px;
      background-color: #000;
      color: #fff;
      font-size: 14px;
      line-height: 1;
      font-weight: 500;
      /* transition: all 0.5s ease-in-out; */
    }
    .opts .links .contact:hover:after {
      opacity: 1;
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

  override render() {
    return html` <section class="chat_box">
      <div class="feed">message feed</div>
      <div class="opts">
        <div class="links">
          <a
            href="mailto://yang@d.com"
            data-tip="yanggc888@163.com"
            class="contact mail"
          >
            ${unsafeSVG(ICON_EMAIL)}
          </a>
          <a href="//fds.com" data-tip="@wsygc" class="contact twitter">
            ${unsafeSVG(ICON_TWITTER)}
          </a>
        </div>
        <div class="input">
          <input type="text" placeholder="Send Message" class="send" />
          <button class="send">${unsafeSVG(ICON_SEND)}</button>
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
    'vocechat-chatbox': VocechatChat;
  }
}
