import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import type { RegisterCredentials } from '../types/auth';
import type { ValidationError } from '../utils/validation';
import { validateRegisterForm } from '../utils/validation';
import { useAppDispatch, useAppSelector } from '../store';
import { register, clearError } from '../store/slices/authSlice';

const RegisterForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isLoading, error, isAuthenticated } = useAppSelector(state => state.auth);
  
  const [formData, setFormData] = useState<RegisterCredentials>({
    email: '',
    password: '',
    name: '',
  });
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>([]);

  useEffect(() => {
    // Clear auth errors when component unmounts or user starts typing
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  useEffect(() => {
    // Redirect to dashboard when authenticated
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    dispatch(clearError()); // Clear any existing auth errors when user types
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationResult = validateRegisterForm(
      formData.email,
      formData.password,
      formData.name
    );
    
    if (!validationResult.isValid) {
      setValidationErrors(validationResult.errors);
      return;
    }
    
    setValidationErrors([]);
    dispatch(clearError());
    
    try {
      await dispatch(register(formData)).unwrap();
    } catch (err) {
      // Error handling is managed by Redux
      console.error('Registration failed:', err);
    }
  };

  const getFieldError = (field: string): string | undefined => {
    return validationErrors.find((error: ValidationError) => error.field === field)?.message;
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h2>Create Account</h2>
        
        <div className="form-group">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder=" "
            required
          />
          <label>Full Name</label>
        </div>

        <div className="form-group">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder=" "
            required
          />
          <label>Email</label>
        </div>

        <div className="form-group">
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder=" "
            required
          />
          <label>Password</label>
        </div>

        <button
          type="submit"
          className="button-primary"
          disabled={isLoading}
        >
          {isLoading ? 'Creating Account...' : 'Sign Up'}
        </button>

        <div className="form-footer">
          <span>Already have an account?</span>
          <a href="/login" className="login-link">
            Log In
          </a>
        </div>
      </form>
      <div className="form-errors">
        {validationErrors.map((error, index) => (
          <div key={`validation-${index}`} className="error-message">
            {error.message}
          </div>
        ))}
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default RegisterForm;

const errorStyles = `
<style>
  .form-errors {
    margin-top: 16px;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .error-message {
    color: #FF3B30;
    font-size: clamp(12px, 1.8vw, 16px);
    padding: 8px 12px;
    background-color: rgba(255, 59, 48, 0.1);
    border-radius: 8px;
    text-align: left;
  }
</style>
`;

document.head.insertAdjacentHTML('beforeend', errorStyles);

const styles = `
<style>
  .register-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: calc(100vh - 64px);
    padding: clamp(24px, 5vw, 48px);
    width: 100%;
  }

  .register-form {
    background: white;
    border-radius: clamp(16px, 2vw, 24px);
    padding: clamp(32px, 4vw, 64px);
    width: 100%;
    max-width: min(90%, 1000px);
    box-shadow: 0 8px 32px rgba(0,0,0,0.15);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }

  .register-form:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 20px rgba(0,0,0,0.2);
  }

  .register-form h2 {
    font-family: -apple-system, system-ui, sans-serif;
    font-size: clamp(24px, 3vw, 36px);
    font-weight: bold;
    color: #333333;
    margin: 0 0 clamp(24px, 4vw, 48px) 0;
    text-align: center;
  }

  .form-group {
    position: relative;
    margin-bottom: 24px;
  }

  .form-group input {
    width: 100%;
    height: clamp(48px, 6vw, 64px);
    padding: clamp(14px, 2vw, 20px);
    border-radius: clamp(12px, 1.5vw, 16px);
    border: 1px solid #C7C7CC;
    font-size: clamp(16px, 2vw, 18px);
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
    height: clamp(48px, 6vw, 64px);
    background: linear-gradient(135deg, #007AFF, #5856D6);
    color: white;
    border: none;
    border-radius: clamp(12px, 1.5vw, 16px);
    font-size: clamp(16px, 2vw, 20px);
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
    justify-content: center;
    align-items: center;
    gap: 8px;
  }

  .form-footer span {
    color: #6E6E73;
    font-size: clamp(14px, 1.8vw, 16px);
  }

  .login-link {
    color: #007AFF;
    text-decoration: none;
    font-size: clamp(14px, 1.8vw, 16px);
    transition: color 0.2s ease;
  }

  .login-link:hover {
    color: #5856D6;
  }
</style>
`;

document.head.insertAdjacentHTML('beforeend', styles);