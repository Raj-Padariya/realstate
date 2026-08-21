'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

export default function AuthContent({ defaultMode }: { defaultMode?: 'login' | 'signup' }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const modeParam = searchParams ? searchParams.get('mode') : null;

  const [authMode, setAuthMode] = useState<'login' | 'signup'>(
    defaultMode ? defaultMode : modeParam === 'signup' ? 'signup' : 'login'
  );

  const handleSwitchTab = (mode: 'login' | 'signup') => {
    setAuthMode(mode);
    setPhone('');
    setEmail('');
    setPassword('');
    setFullName('');
    setIsOtpModalOpen(false);
    if (typeof window !== 'undefined') {
      const targetPath = mode === 'signup' ? '/signup' : '/login';
      window.history.pushState(null, '', targetPath);
    }
  };

  const [loginMethod, setLoginMethod] = useState<'phone' | 'email'>('phone');

  // Form States
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [role, setRole] = useState<'buyer' | 'owner' | 'agent'>('buyer');

  // OTP Popup Modal States
  const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);
  const [modalStep, setModalStep] = useState<'enter_otp' | 'verifying' | 'verified' | 'thank_you'>('enter_otp');
  const [otp, setOtp] = useState(['', '', '', '']);
  const [resendTimer, setResendTimer] = useState(30);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Countdown timer for OTP resend
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isOtpModalOpen && resendTimer > 0 && modalStep === 'enter_otp') {
      interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isOtpModalOpen, resendTimer, modalStep]);

  // Open OTP Modal Popup on Phone Submit
  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginMethod === 'phone' && phone.length < 10) {
      alert('Please enter a valid 10-digit mobile number.');
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setOtp(['', '', '', '']);
      setModalStep('enter_otp');
      setResendTimer(30);
      setIsOtpModalOpen(true);
    }, 500);
  };

  // Verify OTP and transition inside Popup Modal
  const handleVerifyOtp = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const enteredOtp = otp.join('');
    if (enteredOtp.length < 4) {
      alert('Please enter the 4-digit OTP verification code.');
      return;
    }
    
    // Step 1 -> Verifying state
    setModalStep('verifying');

    setTimeout(() => {
      // Step 2 -> Verified state
      setModalStep('verified');

      setTimeout(() => {
        // Step 3 -> Thank You & Auto-login state
        setModalStep('thank_you');

        setTimeout(() => {
          setIsOtpModalOpen(false);
          setSuccessMessage(
            authMode === 'login'
              ? '🎉 Welcome back! Login successful.'
              : '🎉 Registration complete! Welcome to GujjuProperty.'
          );
          setTimeout(() => {
            router.push('/');
          }, 600);
        }, 1800);

      }, 1000);

    }, 800);
  };

  const handleResendOtp = () => {
    setOtp(['', '', '', '']);
    setResendTimer(30);
    alert(`A fresh 4-digit OTP code has been sent to +91 ${phone}`);
  };

  const handleEmailAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      alert('Please fill in all required fields.');
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccessMessage(
        authMode === 'login'
          ? '🎉 Welcome back! Redirecting to GujjuProperty...'
          : '🎉 Account registered successfully! Welcome to GujjuProperty.'
      );
      setTimeout(() => {
        router.push('/');
      }, 1000);
    }, 800);
  };

  const handleGoogleAuth = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccessMessage('🎉 Signed in with Google! Redirecting...');
      setTimeout(() => {
        router.push('/');
      }, 1000);
    }, 800);
  };

  const handleOtpChange = (val: string, idx: number) => {
    if (val.length > 1) val = val[val.length - 1];
    const newOtp = [...otp];
    newOtp[idx] = val;
    setOtp(newOtp);

    // Auto-focus next input
    if (val && idx < 3) {
      const nextInput = document.getElementById(`modal-otp-input-${idx + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  return (
    <div style={{ background: '#F6F7F9', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 20px', fontFamily: "'Open Sans', Arial, sans-serif" }}>
      
      {/* Main Form Box */}
      <div style={{ background: '#fff', borderRadius: '20px', boxShadow: '0 20px 50px rgba(41, 16, 92, 0.12)', border: '1px solid var(--line)', maxWidth: '960px', width: '100%', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', overflow: 'hidden' }}>
        
        {/* Left Side: Brand Highlight Panel */}
        <div style={{ background: 'linear-gradient(135deg, #41208C 0%, #522AB0 60%, #331868 100%)', color: '#fff', padding: '44px 40px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', position: 'relative' }}>
          <div>
            {/* Logo */}
            <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', textDecoration: 'none', color: '#fff', marginBottom: '36px' }}>
              <span style={{ width: '38px', height: '38px', borderRadius: '10px', background: '#FEDC00', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#41208C" strokeWidth="2.5">
                  <path d="M3 11l9-8 9 8M5 10v10h14V10" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span style={{ fontSize: '22px', fontWeight: 800, letterSpacing: '-0.02em' }}>
                Gujju<b style={{ color: '#FEDC00' }}>Property</b>
              </span>
            </Link>

            <h2 style={{ fontSize: '26px', fontWeight: 800, margin: '0 0 14px', lineHeight: 1.3 }}>
              {authMode === 'login' ? 'Welcome Back to Zero-Brokerage Living' : 'Join India’s #1 Zero-Brokerage Platform'}
            </h2>
            <p style={{ fontSize: '14px', color: '#d9cdf2', lineHeight: 1.6, margin: '0 0 32px' }}>
              Connect directly with verified property owners, buyers &amp; tenants across 380+ cities without paying any commission.
            </p>

            {/* Highlights List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
                <span style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(254, 220, 0, 0.2)', color: '#FEDC00', fontSize: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  ⚡
                </span>
                <span style={{ fontSize: '13.5px', fontWeight: 600 }}>Get direct owner contacts instantly</span>
              </div>
              <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
                <span style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(254, 220, 0, 0.2)', color: '#FEDC00', fontSize: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  🛡️
                </span>
                <span style={{ fontSize: '13.5px', fontWeight: 600 }}>100% Phone &amp; Title Deed Verified Listings</span>
              </div>
              <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
                <span style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(254, 220, 0, 0.2)', color: '#FEDC00', fontSize: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  💰
                </span>
                <span style={{ fontSize: '13.5px', fontWeight: 600 }}>Save ₹1.5 Lac to ₹4 Lac in Brokerage Fees</span>
              </div>
            </div>
          </div>

          {/* Testimonial Quote */}
          <div style={{ marginTop: '40px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '12px', padding: '16px 20px', border: '1px solid rgba(255, 255, 255, 0.15)' }}>
            <p style={{ fontSize: '12.5px', fontStyle: 'italic', margin: '0 0 8px', color: '#eae4f8', lineHeight: 1.5 }}>
              &quot;GujjuProperty made it so simple to rent out my Baner apartment. Found genuine tenants in just 3 days!&quot;
            </p>
            <div style={{ fontSize: '12px', fontWeight: 800, color: '#FEDC00' }}>
              — Rajesh Patel, Owner (Pune)
            </div>
          </div>
        </div>

        {/* Right Side: Auth Form */}
        <div style={{ padding: '44px 40px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          
          {/* Mode Switcher Tabs */}
          <div style={{ display: 'flex', background: '#FAF8FE', borderRadius: '12px', padding: '4px', marginBottom: '28px', border: '1px solid var(--line)' }}>
            <button
              type="button"
              onClick={() => handleSwitchTab('login')}
              style={{
                flex: 1,
                padding: '10px',
                borderRadius: '8px',
                border: 'none',
                background: authMode === 'login' ? '#522AB0' : 'transparent',
                color: authMode === 'login' ? '#fff' : 'var(--body)',
                fontWeight: 800,
                fontSize: '14px',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              Log In
            </button>
            <button
              type="button"
              onClick={() => handleSwitchTab('signup')}
              style={{
                flex: 1,
                padding: '10px',
                borderRadius: '8px',
                border: 'none',
                background: authMode === 'signup' ? '#522AB0' : 'transparent',
                color: authMode === 'signup' ? '#fff' : 'var(--body)',
                fontWeight: 800,
                fontSize: '14px',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              Create Account
            </button>
          </div>

          {/* Success Banner Toast */}
          {successMessage && (
            <div style={{ background: '#E6F4EA', color: '#137333', border: '1px solid #CEEAD6', borderRadius: '8px', padding: '14px', fontSize: '13.5px', fontWeight: 700, marginBottom: '20px', textAlign: 'center' }}>
              {successMessage}
            </div>
          )}

          {/* Sign Up Role Selector */}
          {authMode === 'signup' && (
            <div style={{ marginBottom: '22px' }}>
              <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, color: 'var(--ink)', marginBottom: '8px' }}>
                I am registering as a:
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                <button
                  type="button"
                  onClick={() => setRole('buyer')}
                  style={{
                    padding: '8px 4px',
                    borderRadius: '8px',
                    border: role === 'buyer' ? '2px solid #522AB0' : '1px solid var(--line)',
                    background: role === 'buyer' ? '#EFE9FB' : '#fff',
                    color: role === 'buyer' ? '#41208C' : 'var(--body)',
                    fontSize: '12px',
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  🏠 Buyer/Tenant
                </button>
                <button
                  type="button"
                  onClick={() => setRole('owner')}
                  style={{
                    padding: '8px 4px',
                    borderRadius: '8px',
                    border: role === 'owner' ? '2px solid #522AB0' : '1px solid var(--line)',
                    background: role === 'owner' ? '#EFE9FB' : '#fff',
                    color: role === 'owner' ? '#41208C' : 'var(--body)',
                    fontSize: '12px',
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  🔑 Owner
                </button>
                <button
                  type="button"
                  onClick={() => setRole('agent')}
                  style={{
                    padding: '8px 4px',
                    borderRadius: '8px',
                    border: role === 'agent' ? '2px solid #522AB0' : '1px solid var(--line)',
                    background: role === 'agent' ? '#EFE9FB' : '#fff',
                    color: role === 'agent' ? '#41208C' : 'var(--body)',
                    fontSize: '12px',
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  🏢 Agent/Builder
                </button>
              </div>
            </div>
          )}

          {/* Method Toggle */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
            <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--ink)' }}>
              {authMode === 'login' ? 'Login to your account' : 'Enter your details'}
            </span>
            <button
              type="button"
              onClick={() => setLoginMethod(loginMethod === 'phone' ? 'email' : 'phone')}
              style={{ background: 'none', border: 'none', color: '#522AB0', fontSize: '12.5px', fontWeight: 700, cursor: 'pointer', textDecoration: 'underline' }}
            >
              Use {loginMethod === 'phone' ? 'Email & Password' : 'Mobile OTP'}
            </button>
          </div>

          {/* Google 1-Click Login */}
          <button
            type="button"
            onClick={handleGoogleAuth}
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '10px',
              border: '1px solid var(--line)',
              background: '#fff',
              color: 'var(--ink)',
              fontSize: '14px',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              cursor: 'pointer',
              boxShadow: '0 2px 6px rgba(0,0,0,0.04)',
              marginBottom: '20px',
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
            </svg>
            Continue with Google
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
            <div style={{ flex: 1, height: '1px', background: 'var(--line)' }} />
            <span style={{ fontSize: '12px', color: 'var(--body)', fontWeight: 600 }}>OR</span>
            <div style={{ flex: 1, height: '1px', background: 'var(--line)' }} />
          </div>

          {/* Form Fields */}
          {loginMethod === 'phone' ? (
            <form onSubmit={handleSendOtp} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {authMode === 'signup' && (
                <div>
                  <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, color: 'var(--ink)', marginBottom: '6px' }}>
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    style={{ width: '100%', padding: '12px 14px', borderRadius: '8px', border: '1px solid var(--line)', fontSize: '14px', outline: 'none' }}
                  />
                </div>
              )}

              <div>
                <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, color: 'var(--ink)', marginBottom: '6px' }}>
                  Mobile Number
                </label>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <div style={{ background: '#f0f1f4', border: '1px solid var(--line)', borderRadius: '8px', padding: '12px 14px', fontSize: '14px', fontWeight: 700, color: 'var(--ink)' }}>
                    🇮🇳 +91
                  </div>
                  <input
                    type="tel"
                    placeholder="10-digit phone number"
                    maxLength={10}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, ''))}
                    required
                    style={{ flex: 1, padding: '12px 14px', borderRadius: '8px', border: '1px solid var(--line)', fontSize: '14px', outline: 'none' }}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                style={{
                  width: '100%',
                  padding: '13px',
                  borderRadius: '8px',
                  background: '#522AB0',
                  color: '#fff',
                  border: 'none',
                  fontWeight: 800,
                  fontSize: '15px',
                  cursor: 'pointer',
                  boxShadow: '0 4px 14px rgba(82, 42, 176, 0.3)',
                  marginTop: '8px',
                }}
              >
                {isSubmitting ? 'Sending Code...' : 'Get OTP Code →'}
              </button>
            </form>
          ) : (
            /* Email & Password Form */
            <form onSubmit={handleEmailAuth} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {authMode === 'signup' && (
                <div>
                  <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, color: 'var(--ink)', marginBottom: '6px' }}>
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    style={{ width: '100%', padding: '12px 14px', borderRadius: '8px', border: '1px solid var(--line)', fontSize: '14px', outline: 'none' }}
                  />
                </div>
              )}

              <div>
                <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, color: 'var(--ink)', marginBottom: '6px' }}>
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={{ width: '100%', padding: '12px 14px', borderRadius: '8px', border: '1px solid var(--line)', fontSize: '14px', outline: 'none' }}
                />
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <label style={{ fontSize: '12.5px', fontWeight: 700, color: 'var(--ink)' }}>
                    Password
                  </label>
                  {authMode === 'login' && (
                    <button type="button" onClick={() => alert('Password reset link sent to your email.')} style={{ background: 'none', border: 'none', color: '#522AB0', fontSize: '12px', fontWeight: 700, cursor: 'pointer' }}>
                      Forgot Password?
                    </button>
                  )}
                </div>
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  style={{ width: '100%', padding: '12px 14px', borderRadius: '8px', border: '1px solid var(--line)', fontSize: '14px', outline: 'none' }}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                style={{
                  width: '100%',
                  padding: '13px',
                  borderRadius: '8px',
                  background: '#522AB0',
                  color: '#fff',
                  border: 'none',
                  fontWeight: 800,
                  fontSize: '15px',
                  cursor: 'pointer',
                  boxShadow: '0 4px 14px rgba(82, 42, 176, 0.3)',
                  marginTop: '8px',
                }}
              >
                {isSubmitting ? 'Processing...' : authMode === 'login' ? 'Log In to Account' : 'Create My Account'}
              </button>
            </form>
          )}

          {/* Footer Terms */}
          <div style={{ marginTop: '24px', fontSize: '11.5px', color: 'var(--body)', textAlign: 'center', lineHeight: 1.5 }}>
            By continuing, you agree to GujjuProperty&apos;s{' '}
            <a href="#" style={{ color: '#522AB0', textDecoration: 'underline' }}>Terms of Service</a> &amp;{' '}
            <a href="#" style={{ color: '#522AB0', textDecoration: 'underline' }}>Privacy Policy</a>.
          </div>

        </div>

      </div>

      {/* ===================== OTP VERIFICATION & THANK YOU MODAL POPUP ===================== */}
      {isOtpModalOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(28, 31, 35, 0.65)', backdropFilter: 'blur(4px)', zIndex: 999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          
          <div style={{ background: '#fff', borderRadius: '20px', maxWidth: '440px', width: '100%', padding: '36px 30px', boxShadow: '0 25px 60px rgba(0,0,0,0.3)', position: 'relative', textAlign: 'center', animation: 'scaleUp 0.25s ease' }}>
            
            {/* Close Button */}
            {modalStep === 'enter_otp' && (
              <button
                type="button"
                onClick={() => setIsOtpModalOpen(false)}
                style={{ position: 'absolute', top: '16px', right: '16px', background: '#FAF8FE', border: '1px solid var(--line)', borderRadius: '50%', width: '32px', height: '32px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--body)' }}
              >
                ✕
              </button>
            )}

            {/* STEP 1: Enter OTP State */}
            {modalStep === 'enter_otp' && (
              <div>
                <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: '#EFE9FB', color: '#522AB0', fontSize: '26px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', border: '1px solid #D7C6F7' }}>
                  🛡️
                </div>

                <h3 style={{ fontSize: '22px', fontWeight: 800, color: '#41208C', margin: '0 0 8px' }}>
                  Verify Mobile Number
                </h3>
                <p style={{ fontSize: '13.5px', color: 'var(--body)', margin: '0 0 24px', lineHeight: 1.5 }}>
                  Enter the 4-digit verification code sent to <br /><b style={{ color: '#41208C' }}>+91 {phone}</b>
                </p>

                <form onSubmit={handleVerifyOtp}>
                  <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginBottom: '24px' }}>
                    {otp.map((digit, idx) => (
                      <input
                        key={idx}
                        id={`modal-otp-input-${idx}`}
                        type="text"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOtpChange(e.target.value, idx)}
                        style={{ width: '54px', height: '60px', borderRadius: '12px', border: '2px solid #522AB0', textAlign: 'center', fontSize: '24px', fontWeight: 800, color: '#41208C', outline: 'none', background: '#FAF8FE', boxShadow: '0 2px 8px rgba(82,42,176,0.1)' }}
                      />
                    ))}
                  </div>

                  <button
                    type="submit"
                    style={{
                      width: '100%',
                      padding: '14px',
                      borderRadius: '10px',
                      background: '#522AB0',
                      color: '#fff',
                      border: 'none',
                      fontWeight: 800,
                      fontSize: '15.5px',
                      cursor: 'pointer',
                      boxShadow: '0 4px 16px rgba(82, 42, 176, 0.3)',
                      marginBottom: '16px',
                    }}
                  >
                    Verify OTP &amp; Continue
                  </button>
                </form>

                <div style={{ fontSize: '13px', color: 'var(--body)' }}>
                  {resendTimer > 0 ? (
                    <span>Resend OTP in <b>{resendTimer}s</b></span>
                  ) : (
                    <button
                      type="button"
                      onClick={handleResendOtp}
                      style={{ background: 'none', border: 'none', color: '#522AB0', fontWeight: 800, cursor: 'pointer', textDecoration: 'underline' }}
                    >
                      Resend OTP Code Now
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* STEP 2: Verifying State */}
            {modalStep === 'verifying' && (
              <div style={{ padding: '20px 0' }}>
                <div style={{ width: '60px', height: '60px', borderRadius: '50%', border: '4px solid #EFE9FB', borderTopColor: '#522AB0', margin: '0 auto 20px', animation: 'spin 0.8s linear infinite' }} />
                <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#41208C', margin: 0 }}>
                  Verifying OTP Code...
                </h3>
              </div>
            )}

            {/* STEP 3: OTP Verified State */}
            {modalStep === 'verified' && (
              <div style={{ padding: '16px 0' }}>
                <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#E6F4EA', color: '#137333', fontSize: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', border: '2px solid #CEEAD6' }}>
                  ✓
                </div>
                <h3 style={{ fontSize: '22px', fontWeight: 800, color: '#137333', margin: '0 0 6px' }}>
                  OTP Verified Successfully!
                </h3>
                <p style={{ fontSize: '13.5px', color: 'var(--body)', margin: 0 }}>
                  Mobile number +91 {phone} is authenticated.
                </p>
              </div>
            )}

            {/* STEP 4: Thank You & Auto-Login Screen */}
            {modalStep === 'thank_you' && (
              <div style={{ padding: '12px 0' }}>
                <div style={{ fontSize: '48px', marginBottom: '12px' }}>
                  🎉
                </div>
                <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#41208C', margin: '0 0 10px' }}>
                  Thank You{fullName ? `, ${fullName}` : ''}!
                </h2>
                <p style={{ fontSize: '14px', color: 'var(--body)', lineHeight: 1.6, margin: '0 0 24px' }}>
                  Your account has been verified successfully. Welcome to GujjuProperty zero-brokerage platform!
                </p>
                <div style={{ background: '#FAF8FE', borderRadius: '10px', padding: '12px 16px', border: '1px solid #D7C6F7', display: 'inline-flex', alignItems: 'center', gap: '10px', fontSize: '13px', fontWeight: 700, color: '#522AB0' }}>
                  <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#0f9d58', display: 'inline-block' }} />
                  Logging you in... Redirecting to home page
                </div>
              </div>
            )}

          </div>

        </div>
      )}

      {/* Animation keyframes */}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes scaleUp {
          from { transform: scale(0.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
      `}</style>

    </div>
  );
}
