import * as React   from 'react';
import cn           from 'classnames';
import EventManager from '../../utils/EventManger'

import Authorization from './pages/Authorization';
import Registration  from './pages/Registration';
import Recovery      from './pages/Recovery';

import './LogIn.scss'

const LogIn = () => {
    const [page, setPage] = React.useState('authorization'),
        [notify, setNotify] = React.useState({type: '', text: ''}),
        [rememberAccount, setRememberAccount] = React.useState({login: '', password: ''});


    const isInitialMount = React.useRef(true);
    const notifyRef = React.useRef(null);
    const screen = React.useRef(null);

    React.useEffect(() => {
        const timeout = setTimeout(() => screen.current.classList.add('logIn_active'), 200);

		return () => clearTimeout(timeout);
    },[])

    const addNotify = React.useCallback((type,text) => {
        setNotify({type: type, text: text});
    },[notify]);

    React.useEffect(() => {
        EventManager.addHandler('logIn', 'setNotify', obj => addNotify(obj));
        EventManager.addHandler('logIn', 'setRememberAccount', obj => setRememberAccount(obj));

        return () => EventManager.removeHandler('logIn');
     },[])

    React.useEffect(() => {
        if (isInitialMount.current) return;
		notifyRef.current.classList.add('logIn-notify_active');

		const timeout = setTimeout(() => {
			notifyRef.current.classList.remove('logIn-notify_active');
		}, 3000)
		
		return () => clearTimeout(timeout);
    },[notify]);
        
    React.useEffect(() => {
        if (isInitialMount.current) isInitialMount.current = false;
    },[])

    return <div ref={screen} className='logIn'>
        <div className='logIn__logo'></div>
        {page === 'authorization' && <Authorization addNotify={addNotify} setPageGlobal={setPage} rememberAccount={rememberAccount}/>}
        {page === 'registration' && <Registration addNotify={addNotify} setPageGlobal={setPage}/>}
        {page === 'recovery' && <Recovery addNotify={addNotify} setPageGlobal={setPage}/>}

        <div ref={notifyRef} className={cn('logIn-notify', `logIn-notify_${notify.type}`)}>{notify.text}</div>
    </div>
};

export default React.memo(LogIn);