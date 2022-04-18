import Currency from '../../components/Currency/Currency';
import HeaderFirst from '../../components/HeaderFirst/HeaderFirst';
import './App.css';

function App() {
  return (
    <div className="App">
        <HeaderFirst>Currency Converter</HeaderFirst>
        <Currency />
    </div>
  );
}

export default App;
