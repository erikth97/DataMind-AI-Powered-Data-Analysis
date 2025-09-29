# 🛠️ DataMind Backend Setup Guide

This guide will help you set up the complete DataMind backend using n8n workflows to process AI-powered data analysis requests.

## 📋 Prerequisites

Before starting, make sure you have:

- [ ] **n8n instance** (cloud or self-hosted)
- [ ] **Google Cloud Project** with Sheets API enabled
- [ ] **OpenAI API account** with billing set up
- [ ] **Google Sheets** with your data

## 🚀 Quick Setup

### Step 1: Set up n8n

#### Option A: n8n Cloud (Recommended for beginners)
1. Go to [n8n.cloud](https://n8n.cloud)
2. Create a free account
3. Create a new workflow

#### Option B: Self-hosted n8n
```bash
# Using Docker
docker run -it --rm --name n8n -p 5678:5678 n8nio/n8n

# Using npm
npm install n8n -g
n8n start
```

### Step 2: Import the DataMind Workflow

1. **Open n8n** and create a new workflow
2. **Import workflow**: Click the "..." menu → Import from file
3. **Select file**: Choose `n8n-workflow.json` from this project
4. **Save workflow**: Give it a name like "DataMind Analytics API"

### Step 3: Configure Credentials

#### 🔑 Google Sheets OAuth2 Setup

1. **Go to Google Cloud Console**
   - Visit [console.cloud.google.com](https://console.cloud.google.com)
   - Create a new project or select existing one

2. **Enable Google Sheets API**
   - Go to "APIs & Services" → "Library"
   - Search for "Google Sheets API"
   - Click "Enable"

3. **Create OAuth2 Credentials**
   - Go to "APIs & Services" → "Credentials"
   - Click "Create Credentials" → "OAuth 2.0 Client IDs"
   - Application type: "Web application"
   - Add authorized redirect URIs:
     - For n8n Cloud: `https://app.n8n.cloud/rest/oauth2-credential/callback`
     - For self-hosted: `http://localhost:5678/rest/oauth2-credential/callback`

4. **Configure in n8n**
   - In your workflow, click on "Analyze Data" node
   - Click "Create New Credential"
   - Enter your Client ID and Client Secret
   - Authorize with Google

#### 🤖 OpenAI API Setup

1. **Get OpenAI API Key**
   - Go to [platform.openai.com/api-keys](https://platform.openai.com/api-keys)
   - Create a new API key
   - Copy the key (starts with `sk-`)

2. **Configure in n8n**
   - Click on "OpenAI Chat Model" node
   - Click "Create New Credential"
   - Paste your API key

### Step 4: Configure Your Google Sheets

1. **Prepare your spreadsheet**
   - Make sure your Google Sheets is accessible
   - Note the document ID from the URL: `https://docs.google.com/spreadsheets/d/[DOCUMENT_ID]/edit`

2. **Update the workflow**
   - Click on "Analyze Data" node
   - Update "Document ID" with your spreadsheet ID
   - Select the correct sheet name

### Step 5: Configure Frontend Connection

1. **Get your webhook URL**
   - Click on "Webhook – POST /analytics-chat" node
   - Copy the "Production URL" (or Test URL for development)

2. **Update frontend configuration**
   - Copy `.env.example` to `.env.local`
   - Update `VITE_API_URL` with your webhook URL:
   ```bash
   VITE_API_URL=https://your-n8n-instance.com/webhook/analytics-chat
   ```

### Step 6: Test the Setup

1. **Activate workflow** in n8n
2. **Start frontend** development server:
   ```bash
   npm run dev
   ```
3. **Test a query**: Try asking "¿Cuántos registros hay en total?"

## 📊 Expected Data Format

Your Google Sheets should have these columns for optimal performance:

| Column | Description | Example |
|--------|-------------|---------|
| Customer ID | Unique identifier | CUST001 |
| Name | Customer/Company name | Acme Corp |
| Email | Contact email | contact@acme.com |
| Campaign | Marketing campaign | Summer Sale 2024 |
| Channel | Marketing channel | Email, Social, PPC |
| Clicks | Number of clicks | 150 |
| Conversions | Number of conversions | 12 |
| Spend ($) | Amount spent | 500.00 |
| Date | Date (YYYY-MM-DD) | 2024-03-15 |

## 🔧 Advanced Configuration

### Custom System Prompt

You can modify the AI behavior by editing the system message in the "Talk to Your Data" node:

```javascript
// Current system prompt optimized for Spanish responses
// Modify this to change AI behavior, language, or add specific business rules
```

### Memory Configuration

The workflow includes conversation memory to maintain context:
- **Session-based**: Each user session maintains separate conversation history
- **Window size**: Configurable in the "Memory" node
- **Automatic cleanup**: Old conversations are automatically cleaned up

### Error Handling

The workflow includes comprehensive error handling:
- **Input validation**: Checks message format and length
- **API error handling**: Graceful handling of OpenAI and Google Sheets errors
- **CORS configuration**: Properly configured for frontend access

## 🚨 Troubleshooting

### Common Issues

#### 1. "Unauthorized" error from Google Sheets
**Solution**: Re-authorize your Google credentials in n8n

#### 2. "Invalid API key" from OpenAI
**Solution**: Verify your OpenAI API key and billing status

#### 3. "Webhook not found" error
**Solution**: Make sure your workflow is active and webhook URL is correct

#### 4. CORS errors in frontend
**Solution**: Check that the webhook response includes proper CORS headers

### Debug Mode

Enable debug logging by:
1. Setting `VITE_DEBUG_MODE=true` in your `.env.local`
2. Check browser console for detailed API logs
3. Check n8n execution logs for backend errors

## 🔒 Security Considerations

### Production Deployment

For production use:

1. **Use HTTPS**: Always use secure connections
2. **API Key Rotation**: Regularly rotate your OpenAI API keys
3. **Access Control**: Limit Google Sheets access to necessary accounts
4. **Rate Limiting**: Implement rate limiting in your n8n workflow
5. **Input Sanitization**: The workflow includes basic input validation

### Data Privacy

- **Local Processing**: Data stays within your Google Sheets and n8n
- **OpenAI Processing**: Queries are sent to OpenAI for processing
- **No Storage**: The workflow doesn't store conversation data permanently
- **Session Isolation**: Each user session is isolated

## 📞 Support

If you encounter issues:

1. **Check logs**: Review n8n execution logs for detailed error information
2. **Community**: Join our [Discord community](https://discord.gg/datamind)
3. **Documentation**: Visit [docs.datamind.dev](https://docs.datamind.dev)
4. **Issues**: Report bugs on [GitHub](https://github.com/yourusername/datamind/issues)

---

**Next**: Return to the main [README.md](README.md) for frontend setup instructions.