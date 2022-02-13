import * as React     from 'react';
import EventManager   from './utils/EventManger';

import LogIn          from './components/LogIn';


function App() {
  const [component, setComponent] = React.useState('logIn'); // для отображение введите 'logIn'

  React.useEffect(() => {
    EventManager.addHandler('app', 'setComponent', component => setComponent(component));

    return () => EventManager.removeHandler('app');
 },[])

  return (
    <div className="app">
      {component === 'logIn' && <LogIn />} 
    </div>
  );
}

export default App;
