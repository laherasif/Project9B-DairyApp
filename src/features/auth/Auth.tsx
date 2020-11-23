import React, { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { User } from '../../interfaces/user.interface';
import * as Yup from 'yup';
import http from '../../services/api';
import { saveToken, setAuthState } from './authSlice';
import { setUser } from './userSlice';
import { AuthResponse } from '../../services/mirage/routes/user';
import { useAppDispatch } from '../../store';
import { Formik, Field, ErrorMessage, Form } from 'formik'
const schema = Yup.object().shape({
  username: Yup.string()
    .required('What? No username?')
    .max(16, 'Username cannot be longer than 16 characters'),
  password: Yup.string().required('Without a password, "None shall pass!"'),
  email: Yup.string().email('Please provide a valid email address (abc@xy.z)'),
});

const Auth: FC = () => {
  const { handleSubmit, register, errors } = useForm<User>({
    // validationSchema: schema,
  })

  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  // const submitForm = (data: User) => {
  //   const path = isLogin ? '/auth/login' : '/auth/signup';
  //   http
  //     .post<User, AuthResponse>(path, data)
  //     .then((res) => {
  //       if (res) {
  //         const { user, token } = res;
  //         console.log("token are ", token)
  //         dispatch(saveToken(token));
  //         dispatch(setUser(user));
  //         dispatch(setAuthState(true));
  //       }
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     })
  //     .finally(() => {
  //       setLoading(false);
  //     });
  // };
  const validetion: User = { diaryIds: [], username: '', email: '', password: '' }
  return (
    <div className="auth">
      <div className="card">
        <Formik
          initialValues={validetion}
          validationSchema={schema}
          onSubmit={(values: User) => {
            const path = isLogin ? '/auth/login' : '/auth/signup';
            http
              .post<User, AuthResponse>(path, values)
              .then((res) => {
                if (res) {
                  const { user, token } = res;
                  console.log("token are ", token)
                  dispatch(saveToken(token));
                  dispatch(setUser(user));
                  dispatch(setAuthState(true));
                }
              })
              .catch((error) => {
                console.log(error);
              })
              .finally(() => {
                setLoading(false);
              });

          }}
        >
          {(formik) => {
            const { errors, touched } = formik;
            return (
              <div className="container">
                <h1>Sign in to continue</h1>
                <Form>
                  <div className="form-row">
                    <Field
                      type="username"
                      name="username"
                      placeholder="Username"
                      id="username"
                      className={errors.username && touched.username ?
                        "input-error" : null}
                    />
                    <ErrorMessage name="username" component="div" className="error" />
                  </div>

                  <div className="form-row" style={{ marginTop: '10px', marginBottom: '10px' }}>
                    <Field
                      type="password"
                      name="password"
                      id="password"
                      placeholder="Password"
                      className={errors.password && touched.password ?
                        "input-error" : null}
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="error"
                    />
                  </div>
                  {!isLogin && (
                    <div className="inputWrapper">
                      <Field
                        name="email"
                        placeholder="Email (optional)"
                      />
                      {errors && errors.email && (
                        <p className="error">{errors.email}</p>
                      )}
                    </div>
                  )}

                  <div className="inputWrapper">
                    <button type="submit" disabled={loading}>
                      {isLogin ? 'Login' : 'Create account'}
                    </button>
                  </div>

                  <p
                    onClick={() => setIsLogin(!isLogin)}
                    style={{ cursor: 'pointer', opacity: 0.7 }}
                  >
                    {isLogin ? 'No account? Create one' : 'Already have an account?'}
                  </p>
                </Form>
              </div>
            );
          }}
        </Formik>



        {/* <form onSubmit={handleSubmit(submitForm)}>
          <div className="inputWrapper">
            <input ref={register} name="username" placeholder="Username" />
            {errors && errors.username && (
              <p className="error">{errors.username.message}</p>
            )}
          </div>

          <div className="inputWrapper">
            <input
              ref={register}
              name="password"
              type="password"
              placeholder="Password"
            />
            {errors && errors.password && (
              <p className="error">{errors.password.message}</p>
            )}
          </div>

          {!isLogin && (
            <div className="inputWrapper">
              <input
                ref={register}
                name="email"
                placeholder="Email (optional)"
              />
              {errors && errors.email && (
                <p className="error">{errors.email.message}</p>
              )}
            </div>
          )}

          <div className="inputWrapper">
            <button type="submit" disabled={loading}>
              {isLogin ? 'Login' : 'Create account'}
            </button>
          </div>

          <p
            onClick={() => setIsLogin(!isLogin)}
            style={{ cursor: 'pointer', opacity: 0.7 }}
          >
            {isLogin ? 'No account? Create one' : 'Already have an account?'}
          </p>
        </form> */}
      </div>
    </div>
  );
};

export default Auth;
