import React, { Component } from "react";
import PropTypes from 'prop-types';
import styles from "./ContactSnippet.module.css";

class ContactSnippet extends Component {
  // Props are both strings
  static propTypes = {
    blurb: PropTypes.string,
    comment: PropTypes.string
  };

  // We allow specifying a blurb and the initial comment
  static defaultProps = {
    blurb: 'Interested in the expertise we could provide to your business? Fill in the form below and one of our friendly partners will get back to you as soon as possible.',
    comment: ''
  };

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      address: '',
      comment: this.props.comment
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // Creates a new function that sets this.state.stateTarget to the event target value given a stateTarget
  handleChange(stateTarget) {
    return function (event) {
      this.setState({
        [stateTarget]: event.target.value
      })
    }.bind(this);
  }

  // Submit the form
  handleSubmit(event) {
    console.log(this.state)
    event.preventDefault();
  }

  render() {
    return (
      <div className={styles.snippet}>
        <form onSubmit={this.handleSubmit}>
          <div className={styles.snippetContainer}>
            <div className={styles.blurbDiv}>
              <p className={styles.blurb}>{ this.props.blurb }</p>
            </div>
            <div className={styles.inputDiv}>
              <div className={styles.nameDiv}>
                <input className={styles.name} name="" type="text" placeholder="Your name and/or company" value={this.state.name} onChange={this.handleChange('name')} />
              </div>
              <div className={styles.addressDiv}>
                <input className={styles.address} type="text" placeholder="Email address or contact number" value={this.state.address} onChange={this.handleChange('address')} />
              </div>
            </div>
            <div className={styles.commentDiv}>
              <textarea rows="6" className={styles.comment} placeholder="Tell us a little bit about you and/or your company" value={this.state.comment} onChange={this.handleChange('comment')} />
            </div>
            <div className={styles.submitDiv}>
              <input className={styles.submit} type="submit" value="Submit" />
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default ContactSnippet;