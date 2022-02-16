import * as React   from 'react';
import cn           from 'classnames';
import EventManager from '../../../../utils/EventManger'

import './Registration.scss'

const Registration = ({addNotify, setPageGlobal}) => {
	const [inputData, setInputData] = React.useState({
		email: '',
		login: '',
		password: '',
		promocode: ''
	});

	const inputs = React.useMemo(() => [
		{type: 'email', text: 'Введите почту'},
		{type: 'login', text: 'Придумайте логин'},
		{type: 'password', text: 'Придумайте пароль'},
		{type: 'promocode', text: 'Введите промокод (если есть)'}
	],[]);

	const dataInput = React.useCallback((e, type) => {
		switch (type) {
			case 'login':
				setInputData({...inputData, [type]: e.target.value.replace( /[^A-Za-z0-9_]/, '')});
				break;
		
			default:
				setInputData({...inputData, [type]: e.target.value.replace(/[^A-Za-z0-9_.!@#$-]/, '')});
				break;
		}
	},[inputData]);

	const acceptButton = React.useCallback(() => {
		const regExpEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

		if (inputData.email === '' || inputData.login === '' || inputData.password === '') addNotify('error', 'Заполните все поля!');
		else if (!regExpEmail.test(inputData.email))  addNotify('error', 'Некорректный email');
		else if (inputData.login.length < 6)  addNotify('error', 'Логин какой-то короткий..');
		else if (inputData.password.length < 6)  addNotify('error', 'Пароль от 6 символов');
		else {
			EventManager.trigger('logIn', 'registration', inputData); // eslint-disable-line
			addNotify('access', 'Все введено верно!');
		}
	},[inputData.email, inputData.login, inputData.password, inputData.promocode]);

	return <div className='logIn-reg'>
		<div className='logIn-reg-header'>
			<div className='logIn-reg-header'>
				<div className='logIn-reg-header__title'>Регистрация</div>
				<div className='logIn-reg-header__desc'>Добро пожаловать на сервер <span>ALYX RolePlay</span></div>
			</div>
		</div>
		<div className='logIn-reg-content'>
			{inputs.map((input,i) => {
				return  <div key={i} className='logIn-reg-content-input'>
					<div className={cn('logIn-reg-content-input__img', inputData[input.type] !== '' && 'logIn-reg-content-input__img_active')}
						style={{backgroundImage: `url(${require(`../../../../assets/images/logIn/icons/${input.type}.svg`)})`}}
					></div>
					<input type={input.type === 'password' ? 'password' : 'text'} maxLength='16' placeholder={input.text} value={inputData[input.type]} onChange={(e) => dataInput(e, input.type)}/>
				</div>
			})}
			<div className='logIn-reg-content-button' onClick={() => acceptButton()}>Зарегистрироваться</div>
			<div className='logIn-reg-content__desc' onClick={() => setPageGlobal('authorization')}>У меня есть аккаунт</div>
		</div>
	</div>
};

export default React.memo(Registration);