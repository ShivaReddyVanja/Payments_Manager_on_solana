import { PaymentsWrapper } from './components/PaymentsWrapper';
import { PaymentHandler } from './components/PaymentHandler';

import './App.css';

function App() {
  return (
    <div className="App">
      <PaymentsWrapper>
        <PaymentHandler />
      </PaymentsWrapper>
    </div>
  );
}

export default App;

