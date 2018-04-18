import React from "react";
import Header from "./Header";
import Order from "./Order";
import Inventory from "./Inventory";
import sampleFishes from '../sample-fishes';
import Fish from './Fish';
import base from '../base';

class App extends React.Component {
  state = {
    fishes: {},
    order: {}
  };

  componentDidMount(){
    const { params } = this.props.match;
    //first reinstate our localStore
    const localStorageRef = localStorage.getItem(params.storeId);
    if(localStorageRef){
      this.setState({ order: JSON.parse(localStorageRef) })
    }
    this.ref = base.syncState(`${params.storeId}/fishes`, {
      context: this,
      state: "fishes"
    });
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  componentDidUpdate() {
    console.log("updating");
    localStorage.setItem(
      this.props.match.params.storeId, 
      JSON.stringify(this.state.order)
    );
  }

  addFish = fish =>{
    //1. Take a copy of the existing state
    const fishes = {...this.state.fishes}
    //2. Ass new fish to that fishes variable
    fishes[`fish${Date.now()}`] = fish;
    console.log("Adding a fish!!");
    //3. Set the new fishes object to state
    this.setState({ fishes });
  };

  updateFish = (key, updateFish) => {
    //1. take a copy of current fish
    const fishes = { ...this.state.fishes };
    //2. update that state
    fishes[key] = updateFish;
    //3. set that to state
    this.setState({ fishes });
  };

  deleteFish = key => {
    // 1. take a copy of state
    const fishes = { ...this.state.fishes };
    // 2. update the state
    fishes[key] = null;
    // 3.  update state
    this.setState({ fishes });
  };

  loadSampleFishes = () => {
    this.setState({ fishes: sampleFishes});
  };

  addToOrder = (key) => {
    //1. Take a copy of state
    const order = {...this.state.order}
    //2. Either add to order, or update the number in our order
    order[key] = order[key] +1 || 1;
    //3. Call setState to update our state object 
    this.setState({ order });
  };

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market"/>
          <ul className="fishes">
          {/* hace map a cada uno de los componentes Fesh que se creen*/}
            {Object.keys(this.state.fishes).map(key => (
              <Fish 
              key={key} 
              index={key}
              details={this.state.fishes[key]} 
              addToOrder={this.addToOrder}/> 
             ))}
          </ul>
        </div>
        <Order {...this.state} />
        <Inventory 
          loadSampleFishes={this.loadSampleFishes} 
          addFish={this.addFish}
          deleteFish={this.deleteFish}
          updateFish={this.updateFish}
          fishes={this.state.fishes}
        />
      </div>
    );
  }
}

export default App;