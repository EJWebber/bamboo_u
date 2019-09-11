import React from "react";
import bamboo from "/Users/Ed/development/module_5/bamboo_u_front/src/bamboo.png";

class Graph extends React.Component {
  renderBamboo = array => {
    return array.map((x, index) => {
      // return <div className="bamboo" style={{ top: -7 * index }} />;
      return (
        <img
          alt="bamboo segment"
          src={bamboo}
          className="bamboo"
          style={{ top: -7 * index }}
        />
      );
    });
  };

  render() {
    return (
      <div className="bambooCane">
        {this.renderBamboo(this.props.dailyGoals)}
      </div>
    );
  }
}
export default Graph;
