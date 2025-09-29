# 🧠 DataMind - AI-Powered Data Analysis

> Transform your Google Sheets into an intelligent data analyst. Ask questions in plain English, get instant insights powered by AI.

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![React](https://img.shields.io/badge/React-19.1.1-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue.svg)](https://www.typescriptlang.org/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)

![DataMind Demo](https://via.placeholder.com/800x400/1f2937/ffffff?text=DataMind+Demo+%7C+Coming+Soon)

## 🚀 What is DataMind?

DataMind revolutionizes how you interact with your data. Instead of complex formulas or pivot tables, simply chat with your Google Sheets using natural language.

**Example conversations:**
- *"What were our top 5 sales months this year?"*
- *"Show me customers who spent more than $1000"*
- *"What's the average order value by region?"*

## ✨ Key Features

| Feature | Description |
|---------|-------------|
| 🤖 **AI-Powered Queries** | Chat with your data using OpenAI's advanced language models |
| 📊 **Google Sheets Integration** | Seamless connection to your existing spreadsheets |
| 💬 **Natural Language Interface** | No SQL or complex formulas needed |
| ⚡ **Instant Results** | Get answers in seconds, not hours |
| 🎨 **Beautiful UI** | Modern, responsive design that works everywhere |
| 🔒 **Secure** | Your data stays private and secure |

## 🎯 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Google Sheets API access
- OpenAI API key

### Frontend Setup

```bash
# Clone the repository
git clone https://github.com/yourusername/datamind.git
cd datamind

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your n8n webhook URL

# Start development server
npm run dev
```

### Backend Setup (n8n + AI)

1. **Set up n8n instance** (cloud or self-hosted)
2. **Import workflow**: Use the included `n8n-workflow.json`
3. **Configure credentials**: OpenAI API + Google Sheets OAuth
4. **Connect your data**: Point to your Google Sheets
5. **Update frontend**: Add webhook URL to `.env.local`

📖 **Detailed Instructions**: See [BACKEND_SETUP.md](BACKEND_SETUP.md) for complete backend configuration.

🎉 **That's it!** Open [http://localhost:5173](http://localhost:5173) to start chatting with your data.

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Vite
- **Styling**: TailwindCSS 4.x
- **AI/Backend**: n8n workflows + OpenAI API
- **Data Source**: Google Sheets API

## 📖 Usage Examples

### Basic Data Queries
```
You: "How many sales did we have last month?"
DataMind: "You had 247 sales in November 2024, totaling $45,230."
```

### Advanced Analysis
```
You: "Which product category has the highest profit margin?"
DataMind: "Electronics has the highest profit margin at 34.2%, followed by Accessories at 28.7%."
```

### Trend Analysis
```
You: "Show me the sales trend for the last 6 months"
DataMind: [Generates chart] "Sales have grown 15% month-over-month with a notable spike in October."
```

## 🤝 Contributing

We love contributions! DataMind is built by the community, for the community.

### How to Contribute

1. **🍴 Fork the repo**
2. **🌱 Create your feature branch** (`git checkout -b feature/amazing-feature`)
3. **💍 Commit your changes** (`git commit -m 'Add amazing feature'`)
4. **📤 Push to the branch** (`git push origin feature/amazing-feature`)
5. **🎉 Open a Pull Request**

### What We Need Help With

- [ ] 🧪 **Testing**: Unit tests, integration tests, E2E tests
- [ ] 🎨 **UI/UX**: Design improvements, accessibility features
- [ ] 🔧 **Features**: New chart types, data connectors, export options
- [ ] 📚 **Documentation**: Tutorials, API docs, use cases
- [ ] 🐛 **Bug Fixes**: See our [Issues](https://github.com/yourusername/datamind/issues)
- [ ] 🌍 **Translations**: Help make DataMind global

### Development Setup

```bash
# Install dependencies
npm install

# Run in development mode
npm run dev

# Run linting
npm run lint

# Build for production
npm run build
```

## 🗺️ Roadmap

### 🎯 Version 1.1 (Coming Soon)
- [ ] Multiple data source support (CSV, Excel, Databases)
- [ ] Custom chart generation
- [ ] Export to PDF/PowerPoint
- [ ] Team collaboration features

### 🚀 Version 2.0 (Future)
- [ ] Real-time data streaming
- [ ] Advanced ML predictions
- [ ] Custom AI model training
- [ ] Enterprise SSO integration

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **OpenAI** for providing the AI capabilities
- **React Team** for the amazing framework
- **TailwindCSS** for the beautiful styling system
- **Our Amazing Contributors** who make this project possible

## 📞 Community & Support

- 💬 **Discord**: [Join our community](https://discord.gg/datamind)
- 📧 **Email**: support@datamind.dev
- 🐦 **Twitter**: [@DataMindAI](https://twitter.com/datamindai)
- 📖 **Documentation**: [docs.datamind.dev](https://docs.datamind.dev)

---

<div align="center">

**Made with ❤️ by the DataMind community**

⭐ **Star us on GitHub** if you find DataMind useful!

[Get Started](https://github.com/yourusername/datamind) • [Documentation](https://docs.datamind.dev) • [Community](https://discord.gg/datamind) • [Report Bug](https://github.com/yourusername/datamind/issues)

</div>