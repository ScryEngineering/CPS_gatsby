import React from "react";

export default class Author extends React.Component{
  render(){
    console.log("in Author component", this.props);
    return(
      <div>{this.props.authorName}</div>
    );
  }
}