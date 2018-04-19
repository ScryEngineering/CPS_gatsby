import React from "react";
import Link from 'gatsby-link'


import PropTypes from 'prop-types';

export default class Author extends React.Component{
  render(){
    const {name, authorLink} = this.props;
    let authorNameElement = ""
    if (authorLink === undefined){
      authorNameElement = <p>{name}</p>;
    }else{
      authorNameElement = <Link to={authorLink}>{name}</Link>;
    }

    return(
      <div>
        {authorNameElement}
      </div>
    );
  }
}

Author.propTypes = {
  name: React.PropTypes.string.isRequired
}