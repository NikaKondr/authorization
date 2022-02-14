import * as React   from 'react';
import cn           from 'classnames';
import {mp}         from '../../../../utils/mp'

import './Authorization.scss'

const Authorization = ({addNotify, setPageGlobal, rememberAccount}) => {
    const [inputData, setInputData] = React.useState({
        login: '',
        password: '',
    }),
        [rememberData, setRememberData] = React.useState(false);

    React.useEffect(() => {
        setInputData(rememberAccount);
        if (rememberAccount.login !== '' && rememberAccount.password !== '') setRememberData(true);
    },[rememberAccount])

    const inputs = React.useMemo(() => [
        {type: 'login', text: 'Введите логин'},
        {type: 'password', text: 'Введите пароль'},
    ],[]);

    const dataInput = React.useCallback((e, type) => {
        switch (type) {        
            default:
                setInputData({...inputData, [type]: e.target.value.replace(/[^A-Za-z0-9_.!@#$-]/, '')})
                break;
        }
    },[inputData])

    const acceptButton = React.useCallback(() => {
        if (inputData.login === '' ||  inputData.password === '') addNotify('error', 'Заполните все поля!');
        else {
                let data = {login: inputData.login, password: inputData.login, remember: rememberData}
                mp.trigger('logIn', 'authorization', JSON.stringify(data)); // eslint-disable-line
                addNotify('access', 'Идет проверка...');
        }
    },[inputData.login, inputData.password, rememberData])

    return <div className='logIn-auth'>
        <div className='logIn-auth-header'>
            <div className='logIn-auth-header'>
                <div className='logIn-auth-header__title'>Авторизация</div>
                <div className='logIn-auth-header__desc'>Добро пожаловать на сервер <span>ALYX RolePlay</span></div>
            </div>
        </div>
        <div className='logIn-auth-content'>
            {inputs.map((input,i) => {
                return  <div key={i} className='logIn-auth-content-input'>
                    <div className={cn('logIn-auth-content-input__img', inputData[input.type] !== '' && 'logIn-auth-content-input__img_active')}
                        style={{backgroundImage: `url(${require(`../../../../assets/images/logIn/icons/${input.type}.svg`)})`}}
                    ></div>
                    <input type={input.type === 'password' ? 'password' : 'text'} maxLength='16' placeholder={input.text} value={inputData[input.type]} onChange={(e) => dataInput(e, input.type)}/>
                </div>
            })}
            <div className='logIn-auth-content-button' onClick={() => acceptButton()}>Войти на сервер</div>
            <div className='logIn-auth-content-help'>
                <div onClick={() => setPageGlobal('recovery')}>Забыли пароль?</div>
                <div onClick={() => setPageGlobal('registration')}>У меня нет аккаунта</div>
            </div>
            <div className='logIn-auth-content-save'>
                <div className={cn('logIn-auth-content-save__check', rememberData && 'logIn-auth-content-save__check_active')} onClick={() => setRememberData(!rememberData)}></div>
                <span>Запомнить меня</span>
            </div>
        </div>
    </div>
};

export default React.memo(Authorization);