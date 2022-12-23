/**
 * Import Tool's icon
 */
import Icon from './assets/icon/icon.svg';

/**
 * Build styles
 */
require('./assets/css/index.css').toString();

/**
 * @class TableContent
 * @classdesc Table Of Content Tool for Editor.js
 * @property {IdeaData} data - Table of content Tool`s input and output data
 * @property {object} api - Editor.js API instance
 *
 * @typedef {object} IdeaData
 * @description Idea Tool`s input and output data
 * @property {string} title - Idea`s title
 * @property {string} message - Idea`s message
 *
 * @typedef {object} IdeaConfig
 * @description Idea Tool`s initial configuration
 * @property {string} title - placeholder to show in Idea`s title input
 * @property {string} messagePlaceholder - placeholder to show in Idea`s message input
 */
export default class TableContent {

	/**
	 * Notify core that read-only mode is supported
	 */
	static get isReadOnlySupported() {
		return true;
	}

	/**
	 * Get Toolbox settings
	 *
	 * @public
	 * @returns {string}
	 */
	static get toolbox() {
		return {
			icon: Icon,
			title: 'Table Content',
		};
	}

	/**
	 * Allow to press Enter inside the plugin
	 *
	 * @public
	 * @returns {boolean}
	 */
	static get enableLineBreaks() {
		return true;
	}

	/**
	 * Default title 
	 *
	 * @public
	 * @returns {string}
	 */
	static get DEFAULT_TITLE() {
		return 'Table Of Content';
	}

	/**
	 * TableContent Tool`s styles
	 *
	 * @returns {object}
	 */
	get CSS() {
		return {
			baseClass: this.api.styles.block,
			wrapper: 'cdx-table-content',
			title: 'cdx-table-content__title',
		};
	}

	/**
	 * Render plugin`s main Element and fill it with saved data
	 *
	 * @param {IdeaData} data — previously saved data
	 * @param {IdeaConfig} config — user config for Tool
	 * @param {object} api - Editor.js API
	 * @param {boolean} readOnly - read-only mode flag
	 */
	constructor({ data, config, api, readOnly }) {
		this.api = api;
		this.readOnly = readOnly;

		this.title = config.title || TableContent.DEFAULT_TITLE;

		this.data = {
			title: data.title || '',
		};
	}

	/**
	 * Create Tool Elements
	 *
	 * @returns {Element}
	 */
	render() {
		const container = this._make('div', [this.CSS.baseClass, this.CSS.wrapper]);

		const title = this._make('div', [this.CSS.title], {
			innerText: this.title,
		});

		container.appendChild(title);

		return container;
	}

	/**
	 * Extract Idea data from Idea Tool element
	 *
	 * @param {HTMLDivElement} ideaElement - element to save
	 * @returns {IdeaData}
	 */
	save(ideaElement) {
		const title = ideaElement.querySelector(`.${this.CSS.title}`);

		return Object.assign(this.data, {
			title: title.innerHTML,
		});
	}

	/**
	 * Helper for making Elements with attributes
	 *
	 * @param  {string} tagName           - new Element tag name
	 * @param  {Array|string} classNames  - list or name of CSS classname(s)
	 * @param  {object} attributes        - any attributes
	 * @returns {Element}
	 */
	_make(tagName, classNames = null, attributes = {}) {
		const el = document.createElement(tagName);

		if (Array.isArray(classNames)) {
			el.classList.add(...classNames);
		} else if (classNames) {
			el.classList.add(classNames);
		}

		for (const attrName in attributes) {
			el[attrName] = attributes[attrName];
		}

		return el;
	}

	/**
	 * Sanitizer config for Idea Tool saved data
	 *
	 * @returns {object}
	 */
	static get sanitize() {
		return {
			title: {},
		};
	}
}
