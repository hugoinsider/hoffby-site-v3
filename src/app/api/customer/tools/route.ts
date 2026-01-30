import { NextResponse } from 'next/server'

export async function GET(request: Request) {
    // Mock Data - In real app, fetch from Supabase 'tools' table
    const tools = {
        paid: [
            {
                id: 'crm',
                title: 'CRM',
                description: 'Gestão completa de leads e clientes com automação de WhatsApp.',
                status: 'coming_soon',
                icon: 'CRM',
            },
            {
                id: 'kanban',
                title: 'Kanban Board',
                description: 'Gestão de projetos visual estilo Trello/Jira integrado.',
                status: 'coming_soon',
                icon: 'Kanban',
            },
            {
                id: 'os',
                title: 'Ordem de Serviço (O.S)',
                description: 'Gerencie chamados técnicos e serviços de campo.',
                status: 'coming_soon',
                icon: 'OS',
            },
            {
                id: 'nfe',
                title: 'Emissor de NF-e',
                description: 'Emissão descomplicada de Nota Fiscal Eletrônica.',
                status: 'coming_soon',
                icon: 'NFE',
            },
            {
                id: 'sigc',
                title: 'SIGC Integrado',
                description: 'Sistema Integrado de Gestão de Cadastros unificado.',
                status: 'coming_soon',
                icon: 'SIGC',
            }
        ],
        future: [
            // Agora vazio ou pode ter outras ideias futuras que ainda não estão em desenvolvimento
        ]
    }

    return NextResponse.json(tools, { status: 200 })
}
