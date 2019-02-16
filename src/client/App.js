import React, { Component } from 'react'
import _ from 'lodash'
import './app.css'
import localforage from 'localforage'
import { Button, Card, Cell } from 'react-md'

import cecil from './cecil.png'


export default class App extends Component {
  state = { color: '', title: '', rotate: 'rotate(0)' }

  componentDidMount = async () => {
    const data = await localforage.getItem('colors') || { color: '#333333', title: '#ffffff' }
    const { color, title } = data
    return this.setState({
      color,
      title,
    })
  }

  componentDidUpdate = (prevProps, prevState) => {
    const { rotate } = this.state
    if (prevState.rotate !== rotate) {
      setTimeout(() => this.setState({
        rotate: 'rotate(0)',
      }), 500)
    }
  }

  getRandomColor = async () => {
    const letters = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F']
    const hash = '#'
    const generateColor = _.map(letters, () => letters[Math.floor(Math.random() * 16)])
    const generateTitle = _.map(letters, () => letters[Math.floor(Math.random() * 16)])
    const color = `${hash}${generateColor.slice(0, 6).join('')}`
    const title = `${hash}${generateTitle.slice(0, 6).join('')}`
    await localforage.setItem('colors', { color, title })
    return this.setState({
      color,
      title,
      rotate: 'rotate(45deg)',
    })
  }

  reset = () => {
    this.setState({
      color: '#333333',
      title: '#ffffff',
    })
  }

  render() {
    const { color, title, rotate } = this.state
    const marker = ['Permanent Marker', 'cursive']
    return (
      <Card className='md-grid md-cell--8' style={{ background: color, padding: 50, marginTop: 100 }}>
        <h1 className='md-cell md-cell--12' style={{ color: title, fontFamily: marker }}>#FRIDAYNIGHTAUCTIONS</h1>
        <p className='md-cell md-cell--12' style={{ color: title, fontFamily: marker }}>SPIN THE CECIL DIAL!</p>
        <Cell size={8} offset={2}>
          {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
          <img
            onClick={this.getRandomColor}
            src={cecil}
            alt='cecil'
            style={{ cursor: 'pointer', transition: 'ease-in-out .5s', transform: rotate }}
            onKeyDown={e => (e.key === 'Enter' ? this.getRandomColor() : null)}
            className='md-cell md-cell--12'
          />
          <Button
            secondary
            raised
            style={{ background: title, color: '#333333', marginLeft: 10 }}
            name='cecil'
            id='cecil'
            onClick={this.reset}
          >
          RESET
          </Button>
        </Cell>
      </Card>
    )
  }
}
