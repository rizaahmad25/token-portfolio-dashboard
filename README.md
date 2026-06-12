# 📊 Token Portfolio Dashboard

A beautiful, real-time cryptocurrency portfolio tracker with multi-currency support, P&L analytics, and CoinGecko API integration.

![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=flat-square&logo=vite)
![CoinGecko](https://img.shields.io/badge/API-CoinGecko-8DC647?style=flat-square&logo=coingecko)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

## 🌐 Live Demo

**🔗 [View Live →](https://rizaahmad25.github.io/token-portfolio-dashboard/)**

## ✨ Features

- 📈 **Real-time Price Tracking** — Live prices from CoinGecko API, auto-refresh every 60 seconds
- 💰 **Multi-Currency Support** — USD, IDR, EUR, BTC, ETH display currencies
- 📊 **P&L Analytics** — Track profit/loss per token with buy price entry
- 🔍 **Token Search** — Search any token on CoinGecko with autocomplete
- ⭐ **Quick Add** — Popular tokens (BTC, ETH, SOL, etc.) available with one click
- 💾 **Local Storage** — Portfolio persists in browser localStorage
- 📱 **Responsive Design** — Works on desktop and mobile
- 🌙 **Dark Theme** — Beautiful dark UI optimized for extended use
- 📋 **Portfolio Summary** — Total value, cost basis, 24h change, and overall P/L

## 🚀 Quick Start

```bash
# Clone
git clone https://github.com/rizaahmad25/token-portfolio-dashboard.git
cd token-portfolio-dashboard

# Install
npm install

# Run dev server
npm run dev

# Build for production
npm run build
```

## 📸 Screenshots

### Portfolio Overview
Track all your crypto holdings in one place with real-time price updates.

### Add Tokens
Search any cryptocurrency or pick from popular tokens with one click.

### P&L Analytics
Enter buy prices to track profit/loss per position with percentage calculations.

## 🏗️ Architecture

```
src/
├── main.jsx          # Entry point
├── App.jsx           # Main application (370+ lines)
│   ├── Portfolio Summary (total value, cost, P/L)
│   ├── Holdings Table (per-token analytics)
│   ├── Add Token Modal (search + quick add)
│   └── Multi-currency selector
├── App.css           # Component styles
└── index.css         # Global styles & dark theme
```

## 🔧 Tech Stack

| Technology | Purpose |
|-----------|---------|
| React 18 | UI framework with hooks |
| Vite 5 | Build tool & dev server |
| CoinGecko API | Real-time crypto prices |
| CSS3 | Custom dark theme |
| localStorage | Client-side persistence |

## 📡 API Integration

Uses [CoinGecko API v3](https://www.coingecko.com/en/api/documentation) (free, no key required):

- `GET /simple/price` — Batch price fetch with 24h change & market cap
- `GET /search` — Token search with autocomplete
- Rate limit: ~10-30 requests/minute (free tier)
- Auto-refresh: 60-second intervals

## 🎯 Usage

1. **Add tokens** — Click "+ Add Token", search or select from popular coins
2. **Enter amount** — Input your holdings amount
3. **Set buy price** (optional) — Enter your average buy price for P/L tracking
4. **Monitor portfolio** — View real-time values, 24h changes, and profit/loss
5. **Switch currency** — Toggle between USD, IDR, EUR, BTC, ETH display

## 🛣️ Roadmap

- [ ] MetaMask wallet integration for auto-detection
- [ ] Multi-chain wallet tracking (Ethereum, BSC, Polygon)
- [ ] Portfolio charts (pie chart allocation, line chart history)
- [ ] DeFi position monitoring
- [ ] Price alerts
- [ ] Export to CSV/PDF
- [ ] NFT portfolio tracking

## 📄 License

MIT License

---

Built with ❤️ by [Riza Ahmad](https://github.com/rizaahmad25) | Data from [CoinGecko](https://www.coingecko.com/)
