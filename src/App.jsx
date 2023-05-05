
import { PaymentHandler } from './components/PaymentHandler';

import { PaymentsWrapper } from './components/PaymentsWrapper';


import './App.css';

function App() {
  return (
    <div className="App">
      <PaymentsWrapper>
        <PaymentHandler/>
      </PaymentsWrapper>
    </div>
  );
}

export default App;

