import React from "react";
import Link from "gatsby-link";

import styles from "./Logo.module.scss";

export default class Logo extends React.Component {
  render(){
    return (
      <div className={styles.logoContainer} style={{"height": this.props.height, "fontSize": this.props.height}}>
        <Link to="/" className={styles.logo + " " + (this.props.dark ? styles.logodark : styles.logomain)}>
          <img src={this.props.dark ? "/logo-with-text-dark.svg" : "/logo-with-text-main.svg"} alt="Logo" style={{"height": this.props.height}}></img>
        </Link>
      </div>
    );
  }
}