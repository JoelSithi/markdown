import React, { Component } from 'react'
import './App.css'
import marked from 'marked'
import { sampleText } from './sampleText'


class App extends Component {

  /*Creating State*/
  state = {
    text: sampleText
  }
  
  componentDidMount () {
    const text = localStorage.getItem('text')

     if (text) {
      this.setState({ text })
     } else {
       this.setState({ text: sampleText })
     }
  }
  
  /*Saving state with local storage*/
  componentDidUpdate () {
    const { text } = this.state
    localStorage.setItem('text', text)
  }
 
  /*Handling events in textarea*/
  handleChange = event => {
      const text = event.target.value
     this.setState({text})
  }

  renderText = text => {
    const __html = marked(text, { sanitize: true})
    return { __html} // ou return { __html: __html}
  }

  render () { 
    return (
      <div className="container">
        <div className='row'>
          <div className='col-sm-6'>
            <textarea
             onChange = { this.handleChange}
             /*State managing the textarea*/
             value={ this.state.text } 
             className='form-control' 
             row='35' />
          </div>
          <div className="col-sm-6">
            <div dangerouslySetInnerHTML={this.renderText(this.state.text)}></div>
          </div>
        </div>
      </div>  
    )
  }
}

export default App
