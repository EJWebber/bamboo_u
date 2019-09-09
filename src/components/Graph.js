import React from "react";

class Graph extends React.Component {
  renderPlates = array => {
    return array.map((x, index) => {
      return <div className="bamboo" style={{ top: -7 * index }} />;
    });
  };

  render() {
    return (
      <div className="bambooCane">
        {this.renderPlates(this.props.dailyGoals)}
      </div>
    );
  }
}
export default Graph;
