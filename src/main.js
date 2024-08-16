class CurrencyInput extends React.Component {
  render() {
    const { value, handleChange } = this.props;
    
    return <input value={value} onChange={handleChange} type="number" />
  }
}

class Calc extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rate: 0.89,
      usd: 1,
      euro: 1 * 0.89,
    };

    this.handleUsdChange = this.handleUsdChange.bind(this);
    this.handleEuroChange = this.handleEuroChange.bind(this);
  };

  toEuro = (amount, rate) => {
    return amount * rate;
  };
  toUSD = (amount, rate) => {
    return amount * (1 / rate);
  };

  convert = (amount, rate, equation) => {
    const input = parseFloat(amount);
    if (Number.isNaN(input)) {
      return '';
    }
    return equation(input, rate).toFixed(3);
  }

  handleUsdChange = (event) => {
    const euro = this.convert(event.target.value, this.state.rate, this.toEuro);
    this.setState({
      usd: event.target.value,
      euro
    });
  }

  handleEuroChange = (event) => {
    const usd = this.convert(event.target.value, this.state.rate, this.toUSD);
    this.setState({
      euro: event.target.value,
      usd
    });
  }


  render() {
    const { rate, usd, euro } = this.state;
    
    return (
      <div className='container text-center'>
        <h1>Currency Converter</h1>
        <div className='rate'>USD 1 : {rate} EURO</div>
        <div className='input-container'>
          <div className='label pe-2'>USD</div>
          <CurrencyInput className='input' value={usd} handleChange={this.handleUsdChange} />
          <i class="bi bi-arrow-left-right"></i>
          <div className='label pe-2'>Euro</div>
          <CurrencyInput className='input' value={euro} handleChange={this.handleEuroChange} />
        </div>
      </div>
  
    );
  }
  
}

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(<Calc />);