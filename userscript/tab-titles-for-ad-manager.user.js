// ==UserScript==
// @name         Tab Titles for Ad Manager
// @description  Sets order, line item, creative and report names as tab titles in Google Ad Manager (DFP)
// @author       @v-ji
// @namespace    tab-titles-for-ad-manager
// @version      0.13.1
// @icon         https://raw.githubusercontent.com/v-ji/tab-titles-for-ad-manager/master/icons/icon-96.png
// @downloadURL  https://raw.githubusercontent.com/v-ji/tab-titles-for-ad-manager/master/userscript/tab-titles-for-ad-manager.user.js
// @homepageURL  https://github.com/v-ji/tab-titles-for-ad-manager
// @match        https://admanager.google.com/*
// @grant GM_getValue
// @grant GM_setValue
// ==/UserScript==

/* eslint-env greasemonkey */

(function () {
  'use strict'

  const debug = GM_getValue('debug', false)
  function log (...args) {
    if (debug) {
      console.log(...args)
    }
  }

  // Array of supported entity objects
  // path: Beginning of location.hash
  // selector: CSS selector for the element with the title in textContent
  const entities = [
    {
      path: 'delivery/line_item_creative_association/detail',
      selector: 'creative-header .page-title'
    },
    {
      path: 'delivery/line_item_creative_set_association/detail',
      selector: 'creative-header .page-title'
    },
    {
      path: 'delivery/line_item/detail',
      selector: 'line-item-title .name',
      noLabel: true
    },
    {
      path: 'delivery/order/order_overview',
      selector: 'order-overview page-title'
    },
    {
      path: 'reports/report/results',
      selector: 'recent-query-executions-dropdown .button-text',
      noLabel: true
    }
  ]

  // The global timer for detection retries
  let globalTimer

  function findTitle () {
    log('Finding title…')
    const locationHash = document.location.hash
    for (const entity of entities) {
      if (locationHash.match(new RegExp('^#' + entity.path)) !== null) {
        log('Searching:', entity.selector)
        clearInterval(globalTimer)
        globalTimer = setInterval(() => {
          log('Retrying…')
          const targetNode = document.querySelector(entity.selector)
          if (targetNode) {
            log('Found! Clearing interval.')
            makeTitle(targetNode.textContent, entity)
            clearInterval(globalTimer)
          }
        }, 200)
      }
    }
  }

  function makeTitle (textContent, entity) {
    let title = textContent
    let label = ''
    const labelRegex = /(\w+): /

    if (!('noLabel' in entity)) {
      const labelMatch = textContent.match(labelRegex)
      if (labelMatch !== null) {
        label = labelMatch[1]
        title = title.replace(labelMatch[0], '')
        title = title + ' (' + label + ')'
      }
    }

    log('Generated title:', title)
    if (document.title !== title) {
      document.title = title
      log('Title set.')
    }

    return {
      title: title,
      label: label
    }
  }

  window.addEventListener('mousedown', findTitle)
  window.addEventListener('hashchange', findTitle)
  findTitle()
})()
