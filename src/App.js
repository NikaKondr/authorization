import * as React   from 'react'
import EventManager from './utils/EventManger'

import LogIn        from './components/LogIn'

function App() {
	const [component, setComponent] = React.useState(null); // для отображение введите 'logIn'

	React.useEffect(() => {
		EventManager.addHandler('app', value => {
			if (value.type === 'setComponent') {
				setComponent(value.data)
			}	else return;
		})

		return () => EventManager.removeHandler('app');
	},[]);

	return <div className='app'>
		{component === 'logIn' && <LogIn />}
	</div>
};

export default App;
