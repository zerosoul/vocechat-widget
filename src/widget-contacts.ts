import {LitElement, html, css} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {unsafeSVG} from 'lit/directives/unsafe-svg.js';
import {ICON_EMAIL, ICON_TWITTER} from './constants';
@customElement('widget-contacts')
class WidgetContacts extends LitElement {
  static override styles = css`
    :host {
      display: flex;
      align-items: center;
      gap: 16px;
    }
    .contact {
      width: 36px;
      position: relative;
      display: flex;
    }
    .contact:after {
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
    .contact:hover:after {
      opacity: 1;
    }
  `;
  @property({type: String}) email = '';
  @property({type: String}) twitter = '';
  override render() {
    return html`<a
        href="mailto://${this.email}"
        data-tip="${this.email}"
        class="contact mail"
      >
        ${unsafeSVG(ICON_EMAIL)}
      </a>
      <a
        href="https://twitter.com/${this.twitter}"
        data-tip="@${this.twitter}"
        class="contact twitter"
      >
        ${unsafeSVG(ICON_TWITTER)}
      </a> `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'widget-contacts': WidgetContacts;
  }
}
