'use strict'

const showdown  = require('showdown')
const fs  = require('fs')

// https://github.com/showdownjs/showdown/wiki/Add-default-classes-for-each-HTML-element
const classMap = {
  h1: 'title'
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
