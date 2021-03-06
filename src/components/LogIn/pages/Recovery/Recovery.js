import * as React   from 'react';
import cn           from 'classnames';
import EventManager from '../../../../utils/EventManger'

import './Recovery.scss'

const Recovery = ({addNotify, setPageGlobal}) => {
	const [inputData, setInputData] = React.useState({
		email: '',
	});

	const inputs = React.useMemo(() => [
		{type: 'email', text: 'Введите почту'},
	],[]);

	const dataInput = React.useCallback((e, type) => {
		setInputData({...inputData, [type]: e.target.value.replace(/[^A-Za-z0-9_.!@#$-]/, '')})
	},[inputData]);

	const acceptButton = React.useCallback(() => {
		const regExpEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

		if (inputData.email === '') addNotify('error', 'Заполните все поля!');
		else if (!regExpEmail.test(inputData.email))  addNotify('error', 'Некорректный email');
		else {
			addNotify('access', 'Письмо о восстановлении отправлено на вашу почту');
			EventManager.trigger('logIn', 'recovery', inputData); // eslint-disable-line
		}
	},[inputData]);

	return <div className='logIn-reсovery'>
		<div className='logIn-reсovery-header'>
			<div className='logIn-reсovery-header'>
				<div className='logIn-reсovery-header__title'>Восстановление аккаунта</div>
				<div className='logIn-reсovery-header__desc'>Если вы забыли логин или пароль, то введите данные ниже</div>
			</div>
		</div>
		<div className='logIn-reсovery-content'>
			{inputs.map((input,i) => {
				return  <div key={i} className='logIn-reсovery-content-input'>
					<div className={cn('logIn-reсovery-content-input__img', inputData[input.type] !== '' && 'logIn-reсovery-content-input__img_active')}
						style={{backgroundImage: `url(${require(`../../../../assets/images/logIn/icons/${input.type}.svg`)})`}}
					></div>
					<input type='text' maxLength='16' placeholder={input.text} value={inputData[input.type]} onChange={(e) => dataInput(e, input.type)}/>
				</div>
			})}
			<div className='logIn-reсovery-content-button' onClick={() => acceptButton()}>Восстановить доступ</div>
			<div className='logIn-reсovery-content__desc' onClick={() => setPageGlobal('authorization')}>Вернуться назад</div>
		</div>
	</div>
};

export default Recovery;