import React from "react";
import { Route, Switch } from "react-router-dom"; // switch
import RestaurantContainer from "./containers/RestaurantContainer";
import FoodContainer from "./containers/FoodContainer";
import Navbar from "./components/Navbar";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      restaurants: [],
      cart: [],
    };
  }

  componentDidMount() {
    fetch("http://localhost:3000/restaurants")
      .then((resp) => resp.json())
      .then((json) => {
        this.setState({ restaurants: json });
      });
  }

  addItemToCart = (event,food) => {
    event.preventDefault();
    this.setState({cart: [...this.state.cart, food]})
    console.log(this.state.cart.length)
  };

  render() {
    return (
      <div className="App">
        <Navbar cart="I am a prop for navbar" />

        <Switch>
          <Route
            exact
            path="/restaurant/:id"
            render={(props) => {
              let restaurantId = parseInt(props.match.params.id);
              if (this.state.restaurants.length > 0) {
                let foundrestaurant = this.state.restaurants.find(
                  (r) => r.id === restaurantId
                );
                return (
                  <FoodContainer
                    restaurant={foundrestaurant}
                    addItem={this.addItemToCart}
                  />
                );
              } else {
                return null;
              }
            }}
          />

          <Route
            exact
            path="/"
            render={() => (
              <RestaurantContainer restaurants={this.state.restaurants} />
            )}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
