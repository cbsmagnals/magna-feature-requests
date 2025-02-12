// pages/api/feature-requests.js
import { google } from 'googleapis';

// Configure Google Sheets
const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n')
  },
  scopes: ['https://www.googleapis.com/auth/spreadsheets']
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const sheets = google.sheets({ version: 'v4', auth });
    
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: 'Sheet1!A1', // Starting cell
      valueInputOption: 'RAW',
      insertDataOption: 'INSERT_ROWS',
      requestBody: {
        values: [[
          new Date().toISOString(),
          req.body.title,
          req.body.problem,
          req.body.currentSolution,
          req.body.reach,
          req.body.impact,
          req.body.confidence,
          req.body.effort,
          req.body.riceScore,
          req.body.proposedSolution,
          req.body.beneficiaries,
          req.body.alternatives
        ]]
      }
    });

    return res.status(200).json({ message: 'Success', response });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ message: 'Error submitting feature request', error: error.message });
  }
}
