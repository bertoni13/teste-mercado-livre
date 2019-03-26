import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Logo_ML from "../img/Logo_ML.png";
import ic_shipping from "../img/ic_shipping.png";
import ic_Search from "../img/ic_Search.png";
import loading from "../img/ajax-loader.gif";
import './Home.scss';
import SearchInput from 'react-search-input'

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: ''
    }
    this.handleInputChange = this.handleInputChange.bind(this)
  }
  componentDidMount() {
    fetch('https://api.mercadolibre.com/sites/MLA/search?q=carro&item_ids=MLB1116203347&limit=4').then(res => res.json())
    .then(json => {
      this.setState({
        isLoaded: true,
        sites: json.results,
      })
    });
  }
  render() {
    let { isLoaded, sites} = this.state;

    if (!isLoaded) {
      return <div class="loading"><img src={loading} alt="carregando" /></div>;
    }
    else {
    return (
      <div className="Home">
        <header className="Home-header">
          <div>
            <img src={Logo_ML} className="App-logo" alt="logo" />
            <form>
              <SearchInput className="search-input" onChange={this.handleInputChange} placeholder="Buscar produtos" />
            </form>
            <span><img src={ic_Search} alt="search" /></span>
          </div>
        </header>
        <section>
          <div class="container">
            {sites.map(item =>(
            <Link to={`/details/${item.id}`}>
            <div key={item.id} class="wrap">
              <div>
                <img src={item.thumbnail} alt="thumb" />
              </div>
              <div class="title">
                <span>$ {item.price}
                {item.shipping.mode === "custom" ? (
                  <img src={ic_shipping} alt="search" />
                ) : (
                  !item.shipping.mode
                )}
                 </span>
                {item.title}
              </div>
              <div class="city">
                {item.address.state_name}
              </div>
            </div>
            </Link>
            ))};
            </div>
        </section>
      </div>
    );
  }
}
handleInputChange (term) {
    if (term.length > 0) {
    fetch(`https://api.mercadolibre.com/sites/MLA/search?q=${term}&limit=4`).then(res => res.json())
      .then(json => {
        this.setState({searchTerm: term, sites: json.results,})
      });
    } else {
      this.componentDidMount()
    }
  }
}
export default Home
