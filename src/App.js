import React, { Component } from 'react';
import { CartList} from "./components/card-list/card-list.component";
import SearchBox from "./components/search-box/search-box.component";
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      monsters: [],
      searchField: ''
    };

    this.getFilteredMonsters = this.getFilteredMonsters.bind(this);
  }

  loadMonsters = () => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(users => this.setState({ monsters: users }));
  }

  handleChange = (event) => {
    this.setState({ searchField: event.target.value });
  }

  getFilteredMonsters() {
    const { monsters, searchField } = this.state;
    return monsters.filter(monster => monster.name.toLowerCase().includes(searchField.toLowerCase()))
  }

  // Lifecycle. Called immediately after a component is mounted. Setting state here will trigger re-rendering.
  componentDidMount() {
    this.loadMonsters();
  }

  render() {
    return (
      <div className="App">
        <header>
          <h1>Monsters Rolodex</h1>
        </header>
        <div className="content">
          <SearchBox placeHolder="Search monsters" handleChange={this.handleChange} />
          <CartList monsters={this.getFilteredMonsters()} />
        </div>
        <footer className="footer">
          <a href="https://github.com/vkhalzov/study-monsters-rolodex">Github Repo</a>
        </footer>
      </div>
    );
  }
}

export default App;
