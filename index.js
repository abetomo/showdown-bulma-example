'use strict'

const showdown  = require('showdown')
const fs  = require('fs')

// https://github.com/showdownjs/showdown/wiki/Add-default-classes-for-each-HTML-element
const classMap = {
  h1: 'title is-1',
  h2: 'title is-2',
  h3: 'title is-3',
  h4: 'title is-4',
  h5: 'title is-5',
  h6: 'title is-6',
  pre: 'prettyprint box'
}

const bindings = Object.keys(classMap)
  .map(key => ({
    type: 'output',
    regex: new RegExp(`<${key}(.*)>`, 'g'),
    replace: `<${key} class="${classMap[key]}" $1>`
  }))

const converter = new showdown.Converter({
  extensions: [...bindings]
})

const text = fs.readFileSync('main.md', 'utf8')
const html = converter.makeHtml(text)

//
const container = document.getElementsByClassName('container')[0]
container.textContent = null
container.insertAdjacentHTML('afterbegin', html)
