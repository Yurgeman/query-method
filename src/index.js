/**
 * Import Tool's icon
 */
import QueryUrlIcon from './svg/query-url.svg'

/**
 * Build styles
 */
require('./index.css').toString()

/**
 * @class QueryUrl
 * @classdesc QueryUrl Tool for Editor.js
 * @property {QueryUrlData} data - QueryUrl Tool`s input and output data
 * @property {object} api - Editor.js API instance
 *
 * @typedef {object} QueryUrlData
 * @description QueryUrl Tool`s input and output data
 * @property {string} url - QueryUrl`s url
 * @property {string} method - QueryUrl`s method
 *
 * @typedef {object} QueryUrlConfig
 * @description QueryUrl Tool`s initial configuration
 * @property {string} urlPlaceholder - placeholder to show in QueryUrl`s url input
 * @property {string} methodPlaceholder - placeholder to show in QueryUrl`s method input
 */
export default class QueryUrl {

  /**
   * Notify core that read-only mode is supported
   */
  static get isReadOnlySupported () {
    return true
  }

  /**
   * Get Toolbox settings
   *
   * @public
   * @returns {string}
   */
  static get toolbox () {
    return {
      icon: QueryUrlIcon,
      url:  'Query Url'
    }
  }

  /**
   * Allow to press Enter inside the QueryUrl
   *
   * @public
   * @returns {boolean}
   */
  static get enableLineBreaks () {
    return true
  }

  /**
   * Default placeholder for QueryUrl url
   *
   * @public
   * @returns {string}
   */
  static get DEFAULT_URL_PLACEHOLDER () {
    return 'Url'
  }

  /**
   * Default placeholder for QueryUrl method
   *
   * @public
   * @returns {string}
   */
  static get DEFAULT_METHOD_PLACEHOLDER () {
    return 'Method'
  }

  /**
   * QueryUrl Tool`s styles
   *
   * @returns {object}
   */
  get CSS () {
    return {
      baseClass: this.api.styles.block,
      wrapper:   'cdx-query-url',
      url:       'cdx-query-url__url',
      input:     this.api.styles.input,
      method:    'cdx-query-url__method'
    }
  }

  /**
   * Render plugin`s main Element and fill it with saved data
   *
   * @param {QueryUrlData} data — previously saved data
   * @param {QueryUrlConfig} config — user config for Tool
   * @param {object} api - Editor.js API
   * @param {boolean} readOnly - read-only mode flag
   */
  constructor ({data, config, api, readOnly}) {
    this.api      = api
    this.readOnly = readOnly

    this.urlPlaceholder    = config.urlPlaceholder || QueryUrl.DEFAULT_URL_PLACEHOLDER
    this.methodPlaceholder = config.methodPlaceholder || QueryUrl.DEFAULT_METHOD_PLACEHOLDER

    this.data = {
      url:    data.url || '',
      method: data.method || ''
    }
  }

  /**
   * Create QueryUrl Tool container with inputs
   *
   * @returns {Element}
   */
  render () {
    const container = this._make('div', [this.CSS.baseClass, this.CSS.wrapper])
    const url       = this._make('div', [this.CSS.input, this.CSS.url], {
      contentEditable: !this.readOnly,
      innerHTML:       (this.data.url) ? this.data.url.trim() : this.data.url
    })
    const method    = this._make('div', [this.CSS.input, this.CSS.method], {
      contentEditable: !this.readOnly,
      innerHTML:       this.data.method
    })

    url.dataset.placeholder    = this.urlPlaceholder
    method.dataset.placeholder = this.methodPlaceholder

    container.appendChild(url)
    container.appendChild(method)

    return container
  }

  /**
   * Extract QueryUrl data from QueryUrl Tool element
   *
   * @returns {QueryUrlData}
   * @param queryUrlElement
   */
  save (queryUrlElement) {
    const url    = queryUrlElement.querySelector(`.${this.CSS.url}`)
    const method = queryUrlElement.querySelector(`.${this.CSS.method}`)

    return Object.assign(this.data, {
      url:    url.innerHTML,
      method: method.innerHTML
    })
  }

  /**
   * Helper for making Elements with attributes
   *
   * @param  {string} tagName           - new Element tag name
   * @param  {Array|string} classNames  - list or name of CSS classname(s)
   * @param  {object} attributes        - any attributes
   * @returns {Element}
   */
  _make (tagName, classNames = null, attributes = {}) {
    const el = document.createElement(tagName)

    if (Array.isArray(classNames)) {
      el.classList.add(...classNames)
    }
    else if (classNames) {
      el.classList.add(classNames)
    }

    for (const attrName in attributes) {
      el[attrName] = attributes[attrName]
    }

    return el
  }

  /**
   * Sanitizer config for QueryUrl Tool saved data
   *
   * @returns {object}
   */
  static get sanitize () {
    return {
      url:    {},
      method: {
        //b: false,
        //p: false,
        //a: false
      }
    }
  }
}
