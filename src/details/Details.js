import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './Details.scss';

class Details extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hits: [],
      image: [],
      description: []
    };
  }
  componentDidMount () {
    const id = this.props.match.params.id
    fetch(`https://api.mercadolibre.com/items/${id}`).then(res => res.json())
    .then(json => {
      this.setState({
        hits: json,
        image: json.pictures[0],
      })
    });
    fetch(`https://api.mercadolibre.com/items/${id}/description`).then(res => res.json())
    .then(json => {
      this.setState({
        description: json,
      })
    });
  }
  render() {
    return (
      <div className="Details">
        <header>
          <Link to='/'><div>Voltar</div></Link>
        </header>
        <section>
          <div class="container thumb">
            <img src={this.state.image.url} alt="thumb" />
          </div>
          <div class="container">
            <div class="sold">
              <span>
                {this.state.hits.condition === "new" ? (
                  <div>Nuevo - </div>
                ) : (
                  <div>Usado - </div>
                )}
              </span>
              {this.state.hits.sold_quantity} vendidos
            </div>
            <div class="title">{this.state.hits.title}</div>
            <div class="price">$ {this.state.hits.price}</div>
            <div class="btn"><button>Comprar</button></div>
          </div>
          <div class="desc-container">
            <div class="title">Descripción del producto</div>
            <div class="desc">{this.state.description.plain_text}</div>
          </div>
        </section>
      <div>
    </div>
  </div>
    );
  }
}

export default Details;
