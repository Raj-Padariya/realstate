'use client';

import React from 'react';
import { Zap, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';
import BrokerageMeter from './brokerage-meter';

export function BrokerageCalculatorSection() {
  return (
    <section style={{ padding: '60px 0', background: '#F8FAFC', borderBottom: '1px solid #EEF2F6' }}>
      <div className="wrap">
        <div
          style={{
            background: 'linear-gradient(135deg, #180838 0%, #2A0F5C 50%, #43178C 100%)',
            borderRadius: '28px',
            padding: '40px 44px',
            color: '#FFFFFF',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 20px 50px rgba(42, 15, 92, 0.2)',
            border: '1.5px solid rgba(255, 255, 255, 0.12)',
          }}
        >
          {/* Subtle Ambient Light */}
          <div
            style={{
              position: 'absolute',
              top: '-100px',
              right: '-60px',
              width: '350px',
              height: '350px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(254, 220, 0, 0.18) 0%, transparent 70%)',
              pointerEvents: 'none',
            }}
          />

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '40px',
              alignItems: 'center',
              position: 'relative',
              zIndex: 2,
            }}
          >
            {/* Left Content */}
            <div>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: 'rgba(254, 220, 0, 0.15)',
                  border: '1.5px solid rgba(254, 220, 0, 0.4)',
                  color: '#FEDC00',
                  padding: '4px 12px',
                  borderRadius: '999px',
                  fontSize: '11px',
                  fontWeight: 900,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  marginBottom: '14px',
                  boxShadow: '0 0 16px rgba(254, 220, 0, 0.2)',
                }}
              >
                <Zap style={{ width: 13, height: 13, fill: '#FEDC00' }} /> SAVE 2% TO 4% DEAL COMMISSION
              </div>

              <h2
                style={{
                  fontSize: 'clamp(24px, 3vw, 34px)',
                  fontWeight: 800,
                  color: '#FFFFFF',
                  margin: '0 0 12px 0',
                  lineHeight: 1.25,
                }}
              >
                Calculate Your Direct{' '}
                <span style={{ color: '#FEDC00' }}>Brokerage Savings</span>
              </h2>

              <p
                style={{
                  fontSize: '15px',
                  color: 'rgba(255, 255, 255, 0.82)',
                  lineHeight: 1.6,
                  margin: '0 0 24px 0',
                  maxWidth: '540px',
                }}
              >
                Traditional brokers charge a hefty 2% commission from both buyer and seller. With GujjuProperty, you connect directly with genuine verified owners and save lakhs.
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    background: 'rgba(255, 255, 255, 0.1)',
                    padding: '8px 14px',
                    borderRadius: '10px',
                    fontSize: '13px',
                    fontWeight: 700,
                    color: '#FFFFFF',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                  }}
                >
                  <CheckCircle2 style={{ width: 16, height: 16, color: '#34D399' }} /> Direct Owner WhatsApp &amp; Call
                </div>
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    background: 'rgba(255, 255, 255, 0.1)',
                    padding: '8px 14px',
                    borderRadius: '10px',
                    fontSize: '13px',
                    fontWeight: 700,
                    color: '#FFFFFF',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                  }}
                >
                  <ShieldCheck style={{ width: 16, height: 16, color: '#FEDC00' }} /> Verified 7/12 Title Papers
                </div>
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    background: 'rgba(255, 255, 255, 0.1)',
                    padding: '8px 14px',
                    borderRadius: '10px',
                    fontSize: '13px',
                    fontWeight: 700,
                    color: '#FFFFFF',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                  }}
                >
                  <Sparkles style={{ width: 16, height: 16, color: '#A78BFA' }} /> 100% Free Listing
                </div>
              </div>
            </div>

            {/* Right Meter Widget */}
            <div style={{ maxWidth: '440px', marginLeft: 'auto', width: '100%' }}>
              <BrokerageMeter />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BrokerageCalculatorSection;
