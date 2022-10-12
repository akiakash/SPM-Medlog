import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import AuthLayout from '../../components/Auth/AuthLayout/AuthLayout';
import Constants from '../../shared/constants';
import {
  decodeToken,
  encryptCredential,
  // dispatchNotification,
  updateLocalStorage,
  validateEmail
} from '../../shared/utils/helpers';
import AuthService from '../../services/auth.service';
import Spinner from '../../components/Spinner/Spinner';
import {
  getSiteCountries,
  getSiteLanguages,
  getSiteSettings
} from '../../store/actions/refData/refData.action';
import { ROOT_REDUCER_TYPES, USER_TYPES } from '../../store/types';
import { getUserSocialLogins } from '../../store/actions/user/user.action';
import useWindowDimensions from '../../shared/hooks/useDimension';
import SocialLogin from '../../components/SocialLogin/SocialLogin';
import { useTranslation } from 'react-i18next';
import './styles.scss';
import EnvironmentService from '../../services/environment.service';
import { Helmet } from 'react-helmet';
import { ASSETS } from '../../shared/assets';

const RegisterEmailBg = ASSETS.IMAGES.AUTH.REGISTER_POPUP;
const RegisterEmailBgMobile = ASSETS.IMAGES.AUTH.REGISTER_POPUP;

const Login = () => {
  const { t } = useTranslation();
  const { width } = useWindowDimensions();

  const history = useHistory();

  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [step, setStep] = useState(0);

  const [loading, setLoading] = useState(false);
  // const [isChecked, setIsChecked] = useState(false);
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [showPassword, setShowPassword] = useState(null);

  const onChangeEmail = (e) => {
    const value = e?.target?.value;
    const isValid = validateEmail(value);
    setEmailError(null);
    if (value === '') {
      setEmailError(t('AUTH_PAGE.EMAIL_REQUIRED'));
    }
    if (!isValid) {
      setEmailError(t('AUTH_PAGE.INVALID_EMAIL'));
    }
    setEmail(value);
  };

  const isBtnEnabled = () => {
    if (step === 0 && email && !emailError) {
      return true;
    }

    if (step === 1 && email && !emailError && password && !passwordError) {
      return true;
    }

    return false;
  };

  const middleImages = () => (
    <>
      {width > 767 ? (
        <img className="mx-auto" src={RegisterEmailBg} alt="bg-image" />
      ) : (
        <img className="mx-auto w-full" src={RegisterEmailBgMobile} alt="bg-image" />
      )}
    </>
  );

  const checkEmail = async (e) => {
    e.preventDefault();
    if (isBtnEnabled()) {
      setLoading(true);
      try {
        const res = await AuthService.getUserByEmail(email);
        setLoading(false);

        if (res?.isUser) {
          return setStep(1);
        }
        setEmailError(t('AUTH_PAGE.ACCOUNT_DOSE_NOT_EXIST'));
      } catch (err) {
        setLoading(false);
        return err;
      }
    }
  };

  const getRefData = () => {
    dispatch(getSiteCountries());
    dispatch(getSiteLanguages());
    dispatch(getSiteSettings());
  };

  const checkAndSetUser = () => {
    const authState = decodeToken();
    dispatch({
      type: USER_TYPES.SET_USER,
      payload: authState
    });
  };

  const updateUserConfig = () => {
    dispatch(getUserSocialLogins());
  };

  const loginUser = async (e) => {
    e.preventDefault();
    if (email && password && !emailError && !passwordError) {
      try {
        setLoading(true);
        const response = await AuthService.loginUser(
          encryptCredential(email),
          encryptCredential(password)
        );
        setLoading(false);
        if (response?.status === Constants.API_RESPONSE_CODES.SUCCESS) {
          getRefData();
          dispatch({
            type: ROOT_REDUCER_TYPES.LOGIN,
            payload: {}
          });
          updateLocalStorage(
            response?.data?.access_token,
            response?.data?.refresh_token,
            response?.data?.expires_in,
            response?.data?.refresh_expires_in
          );
          checkAndSetUser();
          updateUserConfig();
          //TODO: FIND A SOLUTION FOR OVERLAP ISSUE WITH USER JOURNEY
          //dispatchNotification(Constants.ALERT_TYPES.SUCCESS, t('AUTH_PAGE.LOGGED_IN'));
        } else {
          setPasswordError(t('AUTH_PAGE.INVALID_EMAIL_PASSWORD_MESSAGE'));
        }
      } catch (err) {
        setLoading(false);
        return err;
      }
    }
  };

  const onChangePassword = (e) => {
    setPasswordError(null);
    const value = e.target.value;

    if (value === '') {
      setPasswordError(t('AUTH_PAGE.PASSWORD_REQUIRED'));
    }

    setPassword(value);
  };

  const renderEmailComponent = () => {
    return (
      <div className="relative">
        {width <= 767 && closeBtn()}
        <h1
          className="login-popup-title"
          dangerouslySetInnerHTML={{
            __html: t('AUTH_PAGE.LOGIN_WELCOME_TITLE')
          }}
        ></h1>

        {middleImages()}

        <form onSubmit={checkEmail}>
          <h2
            className="login-subtitle"
            dangerouslySetInnerHTML={{
              __html: t('AUTH_PAGE.LOGIN_WELCOME_SUBTITLE')
            }}
          ></h2>

          <div className="social-login-icons flex">
            <SocialLogin />
          </div>

          <div className="login-divider flex">
            <div className="login-divider-border"></div>
            <div className="login-divider-text">{t('AUTH_PAGE.SIGIN_OR_DIVIDER')}</div>
            <div className="login-divider-border"></div>
          </div>

          <div className="email-input relative">
            <input
              type="email"
              className={` ${emailError ? 'error-input' : 'email-text-input'}`}
              value={email}
              onChange={onChangeEmail}
              placeholder={t('AUTH_PAGE.LOGIN_USERNAME_EMAIL_FIELD')}
            />
            <div className="auth-error-message ">{emailError}</div>
          </div>

          {/* <div className="remember-me flex">
            <input
              id="remember-me"
              type="checkbox"
              className="remember-me-checkbox"
              checked={isChecked}
              onChange={() => setIsChecked(!isChecked)}
            />
            <label htmlFor="remember-me" className="remember-me-text">
              {t('AUTH_PAGE.REMEMBER_ME_TEXT')}
            </label>
          </div> */}

          <button
            className={`login-button-styles next-btn ${!isBtnEnabled() ? 'disable-btn' : ''}`}
            disabled={!isBtnEnabled()}
          >
            {!loading ? t('AUTH_PAGE.NEXT_BTN') : <Spinner />}
          </button>

          <div className="sign-up-message">
            {t('AUTH_PAGE.LOGIN_REGISTER_MESSAGE_TEXT')}
            <Link to={Constants.ROUTE_PATHS.REGISTER}>
              <span className="sign-up-word">{t('AUTH_PAGE.LOGIN_REGISTER_LINK_TEXT')}</span>
            </Link>
          </div>
        </form>
      </div>
    );
  };

  const goBack = () => {
    setEmailError(null);
    setPasswordError(null);
    setPassword('');
    setStep(0);
  };

  const onCloseBtnClicked = () => {
    window.location.href = EnvironmentService.ZAPMII_WEBSITE_URL();
  };

  const closeBtn = () => {
    return (
      <img
        src={ASSETS.ICONS.ZM_MODAL.CLOSE_MOBILE}
        onClick={onCloseBtnClicked}
        className="close-btn absolute  right-0 cursor-pointer"
      />
    );
  };

  const renderPasswordComponent = () => {
    return (
      <div className="relative">
        <img
          onClick={goBack}
          className="register-back-btn absolute cursor-pointer"
          src={width <= 767 ? ASSETS.ICONS.ZM_MODAL.BACK_MOBILE : ASSETS.ICONS.ZM_MODAL.BACK}
        />
        <img
          src={ASSETS.ICONS.ZM_MODAL.CLOSE_MOBILE}
          onClick={onCloseBtnClicked}
          className="close-btn absolute right-0 cursor-pointer"
          
        />

        <div
          className="login-popup-title"
          dangerouslySetInnerHTML={{
            __html: t('AUTH_PAGE.ENTER_YOUR_PASSWORD')
          }}
        ></div>

        {middleImages()}
        <form onSubmit={loginUser} className="password-section-wrapper">
          <div
            className="password-section-header"
            dangerouslySetInnerHTML={{
              __html: t('AUTH_PAGE.LOGIN_WELCOME_SUBTITLE')
            }}
          ></div>

          <div className="password-section-email-input relative">
            <input
              type="email"
              disabled={true}
              className={`email-text-input ${emailError ? 'error-input' : ''}`}
              value={email}
              onChange={onChangeEmail}
              placeholder={t('AUTH_PAGE.LOGIN_USERNAME_EMAIL_FIELD')}
            />
            <div className="auth-error-message absolute">{emailError}</div>
          </div>
          <div className="password-section-password-input relative">
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                className={`email-text-input ${passwordError ? 'error-input' : ''}`}
                value={password}
                onChange={onChangePassword}
                placeholder={t('AUTH_PAGE.LOGIN_PASSWORD_FIELD')}
              />
              <div className="absolute password-eyeicon">
                {!showPassword ? (
                  <img
                    className="password-eyeicon-img"
                    onClick={() => setShowPassword(!showPassword)}
                    src={ASSETS.ICONS.AUTH.PASSWORD_HIDE}
                  />
                ) : (
                  <img
                    className="password-eyeicon-img"
                    onClick={() => setShowPassword(!showPassword)}
                    src={ASSETS.ICONS.AUTH.PASSWORD_SHOW}
                  />
                )}
              </div>
            </div>
            <div className="auth-error-message absolute">{passwordError}</div>
          </div>

          <div
            className="forget-password-text cursor-pointer"
            onClick={() => history.push(Constants.ROUTE_PATHS.FORGET_PASSWORD, { email })}
          >
            {t('PROFILE.FORGOT_PASSWORD')}
          </div>

          <button
            className={`next-btn ${!isBtnEnabled() ? 'disable-btn' : ''}`}
            disabled={!isBtnEnabled()}
          >
            {!loading ? t('AUTH_PAGE.REGISTER_LOGIN_LINK_TEXT') : <Spinner />}
          </button>

          <div className="sign-up-message">
            {t('AUTH_PAGE.LOGIN_REGISTER_MESSAGE_TEXT')}
            <Link to={Constants.ROUTE_PATHS.REGISTER}>
              <span className="sign-up-word">{t('AUTH_PAGE.LOGIN_REGISTER_LINK_TEXT')}</span>
            </Link>
          </div>
        </form>
      </div>
    );
  };

  const onBackBtnClicked = () => {
    setPassword(0);
    setPasswordError(0);
    setStep(0);
  };

  return (
    <div>
      <Helmet>
        <title>{t('SEO.LOGIN.TITLE')}</title>
        <meta name="description" content={t('SEO.LOGIN.DESCRIPTION')} />
      </Helmet>
      <AuthLayout
        isBackBtn={step === 1 ? true : false}
        onClikBackBtn={onBackBtnClicked}
        title={step === 0 ? t('AUTH_PAGE.LOGIN_WELCOME_TITLE') : t('AUTH_PAGE.ENTER_YOUR_PASSWORD')}
        isHtml={step === 0 ? true : false}
      >
        <div className="login-page-popop m-auto">
          {step === 0 ? renderEmailComponent() : renderPasswordComponent()}
        </div>
      </AuthLayout>
    </div>
  );
};

export default Login;

