import { google } from 'googleapis';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, message } = body;

    // --- DIAGNÓSTICO DE SEGURANÇA ---
    console.log("--- INICIANDO DEBUG ---");
    console.log("1. Robô tentando acessar:", process.env.GOOGLE_CLIENT_EMAIL);
    console.log("2. ID da Planilha alvo:", process.env.GOOGLE_SHEET_ID);
    // -------------------------------

    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      },
      scopes: [
        'https://www.googleapis.com/auth/spreadsheets',
      ],
    });

    const sheets = google.sheets({ auth, version: 'v4' });

    // Tenta apenas ler o título da planilha primeiro para testar permissão
    try {
        await sheets.spreadsheets.get({
            spreadsheetId: process.env.GOOGLE_SHEET_ID,
        });
        console.log("3. Conexão com a planilha: SUCESSO! (Permissão OK)");
    } catch (readError) {
        console.error("3. Conexão com a planilha: FALHOU. O robô foi barrado.");
        throw readError; // Relança o erro para cair no catch lá de baixo
    }

    const date = new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' });

    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: 'A1',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [[date, name, email, message]],
      },
    });

    return NextResponse.json({ success: true });

  } catch (error: any) {
    console.error("❌ ERRO FINAL:", error.message);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}