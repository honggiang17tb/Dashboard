import React from 'react';
import { FormattedMessage } from 'react-intl';
import { ILoginParams, ILoginValidation } from '../../../models/auth';
import { validateEmail, validatePassword, validateLogin, validLogin } from '../utils';

interface Props {
  onLogin(values: ILoginParams): void;
  loading: boolean;
  errorMessage: string;
}

const LoginForm = (props: Props) => {
  const { onLogin, loading, errorMessage } = props;

  const [formValues, setFormValues] = React.useState<ILoginParams>({ email: '', password: '' });
  const [validate, setValidate] = React.useState<ILoginValidation>();

  const onSubmit = React.useCallback(() => {
    const validate = validateLogin(formValues);

    setValidate(validate);

    if (!validLogin(validate)) {
      return;
    }

    onLogin(formValues);
  }, [formValues, onLogin]);

  return (
    <form
      style={{
        maxWidth: '412px',
        width: '100%',
        background: '#f3f3f3',
        boxShadow: '0 1px 3px rgb(0 0 0 / 12%), 0 1px 2px rgb(0 0 0 / 24%)',
        padding: '15px'
      }}
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      className="row g-3 needs-validation"
    >
      {!!errorMessage && (
        <div className="alert alert-danger" role="alert" style={{ width: '100%' }}>
          {errorMessage}
        </div>
      )}
      <h2 style={{ fontWeight: 400, textAlign: 'center' }}>Login</h2>
      <div className="col-md-12">

        <input
          type="text"
          className="form-control"
          id="inputEmail"
          value={formValues.email}
          onChange={(e) => {
            setFormValues({ ...formValues, email: e.target.value })
            setValidate(validate=>{
              return {email:'',password:validate?.password}
            })
          }}
          placeholder='Email'
          onBlur={() => {
            const validEmail= validateEmail(formValues.email)
            setValidate(validate=>{
              console.log(validate);
              return {email:validEmail,password:validate?.password}
            })
          }}
        />

        {!!validate?.email && (
          <small className="text-danger">
            <FormattedMessage id={validate?.email} />
          </small>
        )}
      </div>

      <div className="col-md-12">

        <input
          type="password"
          className="form-control"
          id="inputPassword"
          value={formValues.password}
          onChange={(e) => {
            setFormValues({ ...formValues, password: e.target.value })
            setValidate(validate=>{
              return {email:validate?.email,password:''}
            })
          }}
          placeholder='Password'
          onBlur={() => {
            const validPassword = validatePassword(formValues.password)
            setValidate(validate=>{
              return {email:validate?.email,password:validPassword}
            })
          }}
        />

        {!!validate?.password && (
          <small className="text-danger">
            <FormattedMessage id={validate?.password} />
          </small>
        )}
      </div>



      <div className="row justify-content-md-center" style={{ margin: '16px 0' }}>
        <div className="col-md-auto">
          <button
            className="btn btn-success"
            type="submit"
            style={{ minWidth: '160px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            disabled={loading}
          >
            {loading && <div className="spinner-border spinner-border-sm text-light mr-2" role="status" />}
            <i className="fa-solid fa-right-to-bracket" style={{marginRight:'4px'}}></i>
            <FormattedMessage id="register" />
          </button>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
