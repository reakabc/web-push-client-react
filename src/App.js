import './App.css';
import {subscribePushNotification} from './subscribe-push'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <button onClick={() => subscribePushNotification()}>Send Push Subscription and Get Notification</button>
      </header>
    </div>
  );
}

export default App;
