// components/MembershipCards.js

import React from 'react';

const MembershipCards = () => {
  const freeBenefits = [
    'Akses Chatbox Dasar',
    '30 Pesan/Hari',
    'Dukungan Komunitas',
    'Balasan Standar (hingga 3 detik)',
  ];

  const premiumBenefits = [
    'Akses Chatbox Penuh',
    'Pesan Tanpa Batas (Unlimited)',
    'Prioritas Dukungan 24/7',
    'Balasan Instan (di bawah 1 detik)',
    'Fitur Ekspor Transkrip Chat',
    'Template Jawaban Khusus',
  ];

  const renderBenefits = (benefits, isPremium = false) => (
    <ul className="benefit-list">
      {benefits.map((benefit, index) => (
        <li key={index} className={isPremium ? 'premium-benefit-item' : 'free-benefit-item'}>
          {benefit}
        </li>
      ))}
    </ul>
  );

  return (
    <div className="card-container">
      {/* CARD FREE MEMBER */}
      <div className="card free-card">
        <h3 className="card-title">Member Free</h3>
        <p className="card-price">Rp 0<span className="per-month">/selamanya</span></p>
        <p className="card-description">Coba semua fitur dasar dan rasakan kemudahannya.</p>
        {renderBenefits(freeBenefits)}
        <button className="card-button free-button">Mulai Gratis</button>
      </div>

      {/* CARD PREMIUM MEMBER */}
      <div className="card premium-card">
        <span className="tag-best-value">BEST VALUE ✨</span>
        <h3 className="card-title">Member Premium</h3>
        <p className="card-price">Rp 49.000<span className="per-month">/bulan</span></p>
        <p className="card-description">Dapatkan performa tertinggi dan semua fitur eksklusif.</p>
        {renderBenefits(premiumBenefits, true)}
        <button className="card-button premium-button">Upgrade Sekarang</button>
      </div>
    </div>
  );
};

export default MembershipCards;