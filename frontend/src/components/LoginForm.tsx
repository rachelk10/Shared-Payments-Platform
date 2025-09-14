import React, { useState } from 'react';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Login attempt with:', { email, password });
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Welcome Back</h2>
        
        <div className="form-group">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder=" "
            required
          />
          <label>Email</label>
        </div>

        <div className="form-group">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder=" "
            required
          />
          <label>Password</label>
        </div>

        <button type="submit" className="button-primary">
          Log In
        </button>

        <div className="form-footer">
          <a href="/forgot-password" className="forgot-password">
            Forgot Password?
          </a>
          <a href="/register" className="register-link">
            Create Account
          </a>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;

const styles = `
<style>
  .login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: calc(100vh - 64px);
    padding: 24px;
  }

  .login-form {
    background: white;
    border-radius: 16px;
    padding: 32px;
    width: 100%;
    max-width: 400px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }

  .login-form:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 20px rgba(0,0,0,0.2);
  }

  .login-form h2 {
    font-family: -apple-system, system-ui, sans-serif;
    font-size: 24px;
    font-weight: bold;
    color: #333333;
    margin: 0 0 24px 0;
    text-align: center;
  }

  .form-group {
    position: relative;
    margin-bottom: 24px;
  }

  .form-group input {
    width: 100%;
    height: 48px;
    padding: 14px;
    border-radius: 12px;
    border: 1px solid #C7C7CC;
    font-size: 16px;
    transition: border-color 0.2s ease, box-shadow 0.2s ease;
    background: transparent;
  }

  .form-group input:focus {
    outline: none;
    border-color: #007AFF;
    box-shadow: 0 0 0 3px rgba(0,122,255,0.2);
  }

  .form-group label {
    position: absolute;
    top: 12px;
    left: 14px;
    font-size: 14px;
    color: #6E6E73;
    pointer-events: none;
    transition: all 0.2s ease;
    background: white;
    padding: 0 4px;
  }

  .form-group input:focus + label,
  .form-group input:not(:placeholder-shown) + label {
    top: -8px;
    left: 12px;
    font-size: 12px;
    color: #007AFF;
  }

  .button-primary {
    width: 100%;
    height: 48px;
    background: linear-gradient(135deg, #007AFF, #5856D6);
    color: white;
    border: none;
    border-radius: 12px;
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  }

  .button-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(0,0,0,0.2);
  }

  .form-footer {
    margin-top: 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .forgot-password,
  .register-link {
    color: #007AFF;
    text-decoration: none;
    font-size: 14px;
    transition: color 0.2s ease;
  }

  .forgot-password:hover,
  .register-link:hover {
    color: #5856D6;
  }
</style>
`;

document.head.insertAdjacentHTML('beforeend', styles);