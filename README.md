<div align="center">

# 📊 Token Portfolio Dashboard

A beautiful cryptocurrency portfolio tracker built with React and Vite.

Track your crypto holdings, monitor prices, and calculate profits in real-time.

[![Live Demo](https://img.shields.io/badge/Live_Demo-GitHub_Pages-blue?style=for-the-badge)](https://rizaahmad25.github.io/token-portfolio-dashboard/)

</div>

---

## 📸 Features

- ➕ **Add tokens** — Search any cryptocurrency and add to portfolio
- 💰 **Track value** — Real-time price updates every 60 seconds
- 📈 **Profit/Loss** — Calculate P/L with buy price tracking
- 💱 **Multi-currency** — USD, IDR, EUR, BTC, ETH
- 💾 **Persistent** — Holdings saved in localStorage
- 🔍 **Search** — Find any coin via CoinGecko API
- 🌙 **Dark theme** — Beautiful dark UI
- 📱 **Responsive** — Works on desktop and mobile

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| React 18 | UI Framework |
| Vite | Build tool & dev server |
| CoinGecko API | Cryptocurrency data |
| localStorage | Data persistence |
| CSS3 | Styling (dark theme) |

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ installed

### Installation

```bash
# Clone the repository
git clone https://github.com/rizaahmad25/token-portfolio-dashboard.git
cd token-portfolio-dashboard

# Install dependencies
npm install

# Start development server
npm run dev
```

### Build for Production

```bash
npm run build
```

## 📁 Project Structure

```
token-portfolio-dashboard/
├── index.html          # Entry HTML
├── package.json        # Dependencies
├── vite.config.js      # Vite configuration
├── public/             # Static assets
│   └── vite.svg
└── src/
    ├── main.jsx        # React entry point
    ├── App.jsx         # Main application component
    ├── App.css         # App styles
    └── index.css       # Global styles
```

## 🔧 API Reference

This project uses the [CoinGecko API](https://www.coingecko.com/en/api/documentation) (free tier):

- **No API key required**
- **Endpoints used:**
  - `/coins/markets` — Get coin prices
  - `/simple/price` — Get current prices for holdings
  - `/search` — Search coins

## 📝 How to Use

1. Click **"+ Add Token"** button
2. Search for a cryptocurrency (e.g., Bitcoin, Ethereum)
3. Enter the amount you hold
4. Optionally enter your buy price for P/L calculation
5. Click **"Add to Portfolio"**
6. View your portfolio value and profit/loss

## 🎨 Customization

### Change refresh interval
In `App.jsx`, modify:
```javascript
const interval = setInterval(fetchPrices, 60000) // Change 60000 (ms)
```

### Change default currency
In `App.jsx`, modify:
```javascript
const [currency, setCurrency] = useState('usd') // Change to 'idr', 'eur', etc.
```

## 📝 What I Learned

- React hooks (useState, useEffect)
- API integration with fetch
- localStorage for data persistence
- Modal/dialog implementation
- State management in React
- Vite build tool

## 🤝 Contributing

Contributions are welcome! Feel free to:
1. Fork the repository
2. Create a feature branch
3. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<div align="center">

**Built with ❤️ by [RimuroHengky](https://github.com/rizaahmad25)**

</div>
