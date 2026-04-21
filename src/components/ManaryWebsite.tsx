'use client';

import { useState, useEffect, useRef, createContext, useContext } from 'react';
import Image from 'next/image';
import {
  ArrowRight, ChevronDown, Menu, X, Check, Globe, Zap, Target,
  BarChart3, Code2, Mail, MessageSquare, Users, TrendingUp,
  Shield, Star, Phone, ChevronRight, ExternalLink, Play,
  Megaphone, Search, Database, Bot, LineChart, Layers,
  CheckCircle2, ArrowUpRight,
} from 'lucide-react';

// ─── Types & i18n ──────────────────────────────────────────────────────────────
type Lang = 'pt' | 'en' | 'el';

const T = {
  pt: {
    nav: {
      growth: 'Growth Sob Medida',
      solutions: 'Soluções',
      about: 'Sobre',
      blog: 'Blog',
      materials: 'Materiais',
      contact: 'Fale conosco',
      whatsapp: 'WhatsApp',
      growthItems: [
        { label: 'Manáry Light', desc: 'O ponto de partida para o seu negócio.', href: '#planos', icon: '⚡' },
        { label: 'Manáry Astro', desc: 'Aceleração e performance avançada.', href: '#planos', icon: '🚀' },
        { label: 'Manáry Growth', desc: 'Estratégia completa de escala digital.', href: '#planos', icon: '🎯' },
      ],
      solutionItems: [
        { label: 'Mídia Paga', desc: 'Alcance seu público com anúncios.', icon: Megaphone, color: 'text-orange-500 bg-orange-50' },
        { label: 'SEO', desc: 'Domine o topo do Google.', icon: Search, color: 'text-blue-500 bg-blue-50' },
        { label: 'Dev & Infra Web', desc: 'Sites de alta performance.', icon: Code2, color: 'text-[#db4100] bg-red-50' },
        { label: 'Automações', desc: 'Operação no piloto automático.', icon: Bot, color: 'text-violet-500 bg-violet-50' },
        { label: 'CRM', desc: 'Gestão de relacionamento.', icon: Users, color: 'text-emerald-500 bg-emerald-50' },
        { label: 'Data & Analytics', desc: 'Decisões baseadas em dados.', icon: BarChart3, color: 'text-sky-500 bg-sky-50' },
      ],
      aboutItems: [
        { label: 'Quem Somos', desc: 'Conheça nossa história e missão.', icon: '👥', href: '#sobre' },
        { label: 'Cases de Sucesso', desc: 'Resultados reais dos nossos clientes.', icon: '🏆', href: '#cases' },
        { label: 'Cultura Manáry', desc: 'Descubra como é ser do nosso time.', icon: '❤️', href: '#cultura' },
      ],
      materialItems: [
        { label: 'E-Books', desc: 'Materiais ricos para download.', icon: '📚', href: '#ebooks' },
        { label: 'FAQ', desc: 'Dúvidas frequentes sobre a Manáry.', icon: '❓', href: '#faq' },
      ],
    },
    hero: {
      badge: 'Agência de Growth Digital',
      h1: 'Seu Marketing está prestes a mudar.',
      h1b: 'Agora ele é Performance.',
      sub: 'Mídia Paga, SEO, Dev & Infraestrutura Web, Automações, CRM e Data & Analytics integrados em uma única estratégia orientada a resultados.',
      cta1: 'Conheça nossas soluções',
      cta2: 'Fale conosco',
    },
    stats: [
      { value: '+200%', label: 'em Leads Qualificados' },
      { value: '-35%', label: 'no Custo por Aquisição' },
      { value: '6+', label: 'anos de mercado' },
      { value: '50+', label: 'clientes ativos' },
    ],
    how: {
      label: 'Nossa Metodologia',
      title: 'Como Geramos Resultados',
      sub: 'Uma abordagem 360° que combina tecnologia, dados e estratégia para crescimento previsível.',
      items: [
        { icon: Layers, title: 'Engenharia de Plataformas', desc: 'Construímos a infraestrutura digital certa — site, landing pages e integrações otimizadas para converter.' },
        { icon: Target, title: 'Aquisição Inteligente', desc: 'Campanhas de mídia paga e SEO focadas nos canais certos, com o público certo, no momento exato.' },
        { icon: TrendingUp, title: 'Otimização de Funis', desc: 'Análise e melhoria contínua do funil de conversão para aumentar ROAS e reduzir CPA.' },
        { icon: Database, title: 'Decisões por Dados', desc: 'Dashboards, GA4, GTM e modelos de atribuição para que cada decisão seja baseada em fatos, não achismos.' },
      ],
    },
    why: {
      label: 'Nossos Diferenciais',
      title: 'Por Que Escolher a Manáry?',
      items: [
        { icon: Users, color: 'bg-[#80e6b5]/20 text-emerald-700', title: 'Gestor Customer Success Dedicado', desc: 'Mais que um contato — um parceiro estratégico. Atendimento humanizado, proativo, de segunda a sexta (08h–17h) com reuniões semanais ou mensais.' },
        { icon: Zap, color: 'bg-[#f59b3e]/20 text-orange-600', title: 'Equipe Completa, Custo Otimizado', desc: 'Tenha SEO, Mídia, Dados, Design e Dev por uma fração do custo de uma equipe interna. Mais resultado, menos custo fixo.' },
        { icon: BarChart3, color: 'bg-[#db4100]/10 text-[#db4100]', title: 'Resultados Comprovados', desc: 'Foco nos KPIs que realmente impactam seu faturamento. Testes A/B, análise de dados e metodologia Growth Hacking comprovada.' },
      ],
    },
    moment: {
      label: 'Para Quem Fazemos',
      title: 'Growth Sob Medida: Soluções para o seu momento',
      items: [
        { tag: 'PMEs', title: 'Cresça Mais Rápido', desc: 'Otimize o orçamento para maximizar visibilidade, atrair leads qualificados e converter vendas de forma previsível, competindo de igual com grandes players.', cta: 'Conheça Planos PME' },
        { tag: 'E-commerce', title: 'Venda Mais Online', desc: 'Estratégias hiperfocadas em ROAS, otimização de funil de checkout, redução do abandono de carrinho e aumento da retenção e recompra.', cta: 'Conheça Planos E-commerce' },
        { tag: 'Grandes Empresas', title: 'Escala e Inovação', desc: 'Parceria estratégica para integrar estruturas complexas, otimizar funis multifacetados, extrair o máximo dos dados e consolidar liderança.', cta: 'Consultoria Enterprise' },
      ],
    },
    solutions: {
      label: 'O Que Fazemos',
      title: 'Estratégias de Growth que Impulsionam Seu Negócio',
      items: [
        { icon: Megaphone, color: 'text-[#db4100] bg-red-50', title: 'Mídia Paga (Ads)', desc: 'Google Ads, Meta Ads, LinkedIn, TikTok. Campanhas focadas em leads qualificados e vendas (ROI/ROAS).' },
        { icon: Search, color: 'text-blue-600 bg-blue-50', title: 'SEO & Performance Orgânica', desc: 'Posicionamento na primeira página do Google. Auditoria técnica, SEO on-page, conteúdo e link building.' },
        { icon: Code2, color: 'text-violet-600 bg-violet-50', title: 'Dev & Infraestrutura Web', desc: 'Sites, e-commerces e LPs de alta conversão. UI/UX, WordPress, React, Node.js e Nuvemshop.' },
        { icon: Bot, color: 'text-[#80e6b5]/80 bg-emerald-50', title: 'Automação & CRM', desc: 'Jornadas inteligentes para nutrir leads. Brevo, HubSpot, RD Station, Meta/WhatsApp automation.' },
        { icon: BarChart3, color: 'text-sky-600 bg-sky-50', title: 'Data & Analytics', desc: 'GA4, GTM, Looker Studio. Dashboards customizados, análise de LTV, Cohort e atribuição.' },
        { icon: Layers, color: 'text-[#f59b3e] bg-orange-50', title: 'Estratégia & Growth', desc: 'Metodologia Growth Hacking aplicada. Testes A/B, funil de conversão e estratégia de escala sustentável.' },
      ],
    },
    plans: {
      label: 'Planos de Investimento',
      title: 'O Nível Certo para o Seu Momento',
      sub: 'Cada plano acompanha a maturidade do seu negócio. Contratos mínimos de 6 meses com onboarding dedicado.',
      items: [
        {
          name: 'Light', badge: 'Fundação', highlight: false,
          moment: 'Validar o digital e gerar os primeiros leads.',
          features: ['Gestão de Mídia (Google & Meta Ads)', 'Criativos para Ads (Estáticos + Copy)', 'Setup de Conversão (GA4/GTM)', 'Dashboard Padrão (Looker Studio)', 'SEO On-Page básico', 'Setup de E-mails Corporativos'],
          cta: 'Agende uma análise',
        },
        {
          name: 'Astro', badge: 'Aceleração', highlight: true,
          moment: 'Criar uma máquina de aquisição previsível.',
          features: ['Gestão de Mídia (Google, Meta, TikTok, LinkedIn)', 'Criativos (Estáticos, Vídeos + Copy)', 'Testes A/B (CRO) em anúncios e páginas', 'Automação de Marketing (Brevo)', 'Estratégia de SEO & Conteúdo', 'Dashboard + Análise de Funil'],
          cta: 'Inicie a aceleração',
        },
        {
          name: 'Growth', badge: 'Domínio de Mercado', highlight: false,
          moment: 'Escalar o faturamento e dominar canais.',
          features: ['Tudo do Astro +', 'GA4/GTM Server-Side avançado', 'Dashboards Customizados (Looker)', 'Análise Cohort, LTV & Atribuição', 'SEO Técnico, Conteúdo & Link Building', 'CRM completo (HubSpot, RD, Salesforce)'],
          cta: 'Consultoria estratégica',
        },
      ],
      note: 'Fase 1: Projeto de Fundação (setup/dev) · Fase 2: Fee mensal de crescimento',
    },
    cases: {
      label: 'Cases de Sucesso',
      title: 'Resultados Comprovados nos Nossos Clientes',
      sub: 'Experiência validada em múltiplos segmentos, do B2C ao B2B industrial.',
      items: [
        { name: 'C6 Fest', segment: 'Evento / Mídia', result: 'Gestão de performance para um dos maiores festivais de música do país.' },
        { name: 'Alucomaxx', segment: 'Indústria B2B', result: 'Geração de leads qualificados (MQLs) para ACM e fachadas industriais.' },
        { name: 'Jolema', segment: 'E-commerce B2B/B2C', result: 'Otimização de funil e performance para autopeças com aumento de ROAS.' },
        { name: 'Aza Liss', segment: 'E-commerce de Moda', result: 'Growth e Mídia Paga focados em ROAS, LTV e otimização de funil.' },
        { name: 'HAB Arquitetura', segment: 'Geração de Leads B2B', result: 'Google e LinkedIn Ads para arquitetura e construção de alto padrão.' },
        { name: 'Papu Petshop', segment: 'Serviços Pet', result: 'Geração de leads e agendamentos com foco em CAC e performance local.' },
      ],
    },
    caseHighlight: {
      label: 'Case em Destaque',
      title: 'Crescimento na Prática',
      challenge: 'Baixa geração de leads qualificados e alto CPA em mercado competitivo.',
      strategy: 'Otimização de LPs, Google Ads fundo de funil e fluxos de nutrição com automação.',
    },
    partners: {
      label: 'Parcerias & Certificações',
      title: 'Reconhecidos pelos Maiores do Mercado',
      sub: 'Acesso a recursos exclusivos, suporte prioritário e as melhores práticas globais.',
    },
    steps: {
      label: 'Como Começamos',
      title: 'Três Passos para Desbloquear Seu Crescimento',
      items: [
        { n: '01', title: 'Bate-papo de Alinhamento', desc: 'Uma conversa de 30 min para entender seus desafios, metas e o potencial de crescimento do seu negócio.' },
        { n: '02', title: 'Análise de Potencial', desc: 'Nossa equipe faz um diagnóstico da sua presença digital e identifica as oportunidades de maior impacto.' },
        { n: '03', title: 'Proposta de Growth', desc: 'Apresentamos um plano de ação 100% customizado para seus objetivos de faturamento.' },
      ],
    },
    form: {
      title: 'Vamos juntos desbloquear seu próximo nível?',
      sub: 'Preencha o formulário e nossa equipe entrará em contato em até 1 dia útil.',
      name: 'Nome completo *',
      email: 'E-mail corporativo *',
      phone: 'WhatsApp',
      company: 'Empresa',
      service: 'Serviço de interesse',
      services: ['Mídia Paga (Google/Meta Ads)', 'SEO & Performance Orgânica', 'Dev & Infra Web', 'Automação & CRM', 'Data & Analytics', 'Consultoria Growth Completa'],
      message: 'Conte sobre seu desafio',
      send: 'Quero um diagnóstico gratuito',
      sending: 'Enviando...',
      success: 'Recebemos sua mensagem! Nossa equipe entrará em contato em breve.',
      error: 'Erro ao enviar. Tente novamente ou fale no WhatsApp.',
      privacy: 'Seus dados são tratados com segurança. Política de Privacidade.',
    },
    footer: {
      tagline: 'Transformando digital em resultado.',
      company: 'Manáry Digital Growth',
      rights: `© ${new Date().getFullYear()} Manáry Digital. Todos os direitos reservados.`,
      dev: 'Desenvolvido pela Manáry Digital',
      links: {
        solutions: 'Soluções',
        company: 'Empresa',
        contact: 'Contato',
      },
    },
    about: {
      label: 'Quem Somos',
      title: 'Μανάρι — uma palavra que define quem somos.',
      body: 'Somos uma agência de Growth Digital movida por resultados reais. Nosso nome vem do grego Μανάρι — uma expressão de carinho e diversidade. Combinamos estratégia, tecnologia e humanização para transformar o digital em crescimento previsível para nossos clientes.',
      quote: '"O futuro não é algo que a gente espera — é algo que a gente constrói."',
      author: 'Yanko Cicely, Fundador & CEO',
    },
  },
  en: {
    nav: {
      growth: 'Custom Growth',
      solutions: 'Solutions',
      about: 'About',
      blog: 'Blog',
      materials: 'Resources',
      contact: 'Contact us',
      whatsapp: 'WhatsApp',
      growthItems: [
        { label: 'Manáry Light', desc: 'The starting point for your business.', href: '#plans', icon: '⚡' },
        { label: 'Manáry Astro', desc: 'Advanced acceleration and performance.', href: '#plans', icon: '🚀' },
        { label: 'Manáry Growth', desc: 'Complete digital scale strategy.', href: '#plans', icon: '🎯' },
      ],
      solutionItems: [
        { label: 'Paid Media', desc: 'Reach your audience with ads.', icon: Megaphone, color: 'text-orange-500 bg-orange-50' },
        { label: 'SEO', desc: 'Dominate the top of Google.', icon: Search, color: 'text-blue-500 bg-blue-50' },
        { label: 'Dev & Web Infra', desc: 'High-performance websites.', icon: Code2, color: 'text-[#db4100] bg-red-50' },
        { label: 'Automations', desc: 'Operations on autopilot.', icon: Bot, color: 'text-violet-500 bg-violet-50' },
        { label: 'CRM', desc: 'Relationship management.', icon: Users, color: 'text-emerald-500 bg-emerald-50' },
        { label: 'Data & Analytics', desc: 'Data-driven decisions.', icon: BarChart3, color: 'text-sky-500 bg-sky-50' },
      ],
      aboutItems: [
        { label: 'Who We Are', desc: 'Our story and mission.', icon: '👥', href: '#about' },
        { label: 'Success Cases', desc: 'Real results from our clients.', icon: '🏆', href: '#cases' },
        { label: 'Manáry Culture', desc: 'What it is like to be on our team.', icon: '❤️', href: '#culture' },
      ],
      materialItems: [
        { label: 'E-Books', desc: 'Rich materials for download.', icon: '📚', href: '#ebooks' },
        { label: 'FAQ', desc: 'Frequently asked questions.', icon: '❓', href: '#faq' },
      ],
    },
    hero: {
      badge: 'Digital Growth Agency',
      h1: 'Your Marketing is about to change.',
      h1b: 'Now it is Performance.',
      sub: 'Paid Media, SEO, Dev & Web Infrastructure, Automations, CRM and Data & Analytics integrated in a single results-driven strategy.',
      cta1: 'Discover our solutions',
      cta2: 'Contact us',
    },
    stats: [
      { value: '+200%', label: 'in Qualified Leads' },
      { value: '-35%', label: 'in Cost per Acquisition' },
      { value: '6+', label: 'years in the market' },
      { value: '50+', label: 'active clients' },
    ],
    how: {
      label: 'Our Methodology',
      title: 'How We Generate Results',
      sub: 'A 360° approach combining technology, data and strategy for predictable growth.',
      items: [
        { icon: Layers, title: 'Platform Engineering', desc: 'We build the right digital infrastructure — optimized websites, landing pages and integrations that convert.' },
        { icon: Target, title: 'Intelligent Acquisition', desc: 'Paid media and SEO campaigns focused on the right channels, the right audience, at the exact moment.' },
        { icon: TrendingUp, title: 'Funnel Optimization', desc: 'Continuous analysis and improvement of the conversion funnel to increase ROAS and reduce CPA.' },
        { icon: Database, title: 'Data-Driven Decisions', desc: 'Dashboards, GA4, GTM and attribution models so every decision is based on facts, not guesswork.' },
      ],
    },
    why: {
      label: 'Our Differentials',
      title: 'Why Choose Manáry?',
      items: [
        { icon: Users, color: 'bg-[#80e6b5]/20 text-emerald-700', title: 'Dedicated Customer Success Manager', desc: 'More than a contact — a strategic partner. Humanized, proactive support Mon–Fri (8am–5pm) with weekly or monthly meetings.' },
        { icon: Zap, color: 'bg-[#f59b3e]/20 text-orange-600', title: 'Complete Team, Optimized Cost', desc: 'Get SEO, Media, Data, Design and Dev for a fraction of the cost of an in-house team. More results, less fixed cost.' },
        { icon: BarChart3, color: 'bg-[#db4100]/10 text-[#db4100]', title: 'Proven Results', desc: 'Focused on the KPIs that truly impact your revenue. A/B tests, data analysis and proven Growth Hacking methodology.' },
      ],
    },
    moment: {
      label: 'Who We Work With',
      title: 'Custom Growth: Solutions for your moment',
      items: [
        { tag: 'SMBs', title: 'Grow Faster', desc: 'Optimize your budget to maximize visibility, attract qualified leads and convert sales predictably — competing equally with larger players.', cta: 'SMB Plans' },
        { tag: 'E-commerce', title: 'Sell More Online', desc: 'Strategies hyperfocused on ROAS, checkout funnel optimization, cart abandonment reduction and increased retention and repurchase.', cta: 'E-commerce Plans' },
        { tag: 'Enterprise', title: 'Scale & Innovate', desc: 'Strategic partnership to integrate complex structures, optimize multi-faceted funnels, extract maximum data value and consolidate market leadership.', cta: 'Enterprise Consulting' },
      ],
    },
    solutions: {
      label: 'What We Do',
      title: 'Growth Strategies that Drive Your Business',
      items: [
        { icon: Megaphone, color: 'text-[#db4100] bg-red-50', title: 'Paid Media (Ads)', desc: 'Google Ads, Meta Ads, LinkedIn, TikTok. Campaigns focused on qualified leads and sales (ROI/ROAS).' },
        { icon: Search, color: 'text-blue-600 bg-blue-50', title: 'SEO & Organic Performance', desc: 'First-page Google ranking. Technical audit, on-page SEO, content and link building.' },
        { icon: Code2, color: 'text-violet-600 bg-violet-50', title: 'Dev & Web Infrastructure', desc: 'High-converting websites, e-commerces and LPs. UI/UX, WordPress, React, Node.js and Nuvemshop.' },
        { icon: Bot, color: 'text-emerald-600 bg-emerald-50', title: 'Automation & CRM', desc: 'Smart journeys to nurture leads. Brevo, HubSpot, RD Station, Meta/WhatsApp automation.' },
        { icon: BarChart3, color: 'text-sky-600 bg-sky-50', title: 'Data & Analytics', desc: 'GA4, GTM, Looker Studio. Custom dashboards, LTV, Cohort and attribution analysis.' },
        { icon: Layers, color: 'text-[#f59b3e] bg-orange-50', title: 'Strategy & Growth', desc: 'Applied Growth Hacking methodology. A/B testing, conversion funnel and sustainable scaling strategy.' },
      ],
    },
    plans: {
      label: 'Investment Plans',
      title: 'The Right Level for Your Moment',
      sub: 'Each plan accompanies your business maturity. Minimum 6-month contracts with dedicated onboarding.',
      items: [
        { name: 'Light', badge: 'Foundation', highlight: false, moment: 'Validate digital and generate your first leads.', features: ['Media Management (Google & Meta Ads)', 'Ad Creatives (Static + Copy)', 'Conversion Setup (GA4/GTM)', 'Standard Dashboard (Looker Studio)', 'Basic On-Page SEO', 'Corporate Email Setup'], cta: 'Schedule an analysis' },
        { name: 'Astro', badge: 'Acceleration', highlight: true, moment: 'Build a predictable acquisition machine.', features: ['Media Management (Google, Meta, TikTok, LinkedIn)', 'Creatives (Static, Short Videos + Copy)', 'A/B Tests (CRO) on ads and pages', 'Marketing Automation (Brevo)', 'SEO & Content Strategy', 'Dashboard + Funnel Analysis'], cta: 'Start acceleration' },
        { name: 'Growth', badge: 'Market Mastery', highlight: false, moment: 'Scale revenue and dominate channels.', features: ['Everything in Astro +', 'Advanced GA4/GTM Server-Side', 'Custom Dashboards (Looker)', 'Cohort, LTV & Attribution Analysis', 'Technical SEO, Content & Link Building', 'Full CRM (HubSpot, RD, Salesforce)'], cta: 'Strategic consulting' },
      ],
      note: 'Phase 1: Foundation Project (setup/dev) · Phase 2: Monthly growth fee',
    },
    cases: {
      label: 'Success Cases',
      title: 'Proven Results Across Our Clients',
      sub: 'Validated experience across multiple segments, from B2C to industrial B2B.',
      items: [
        { name: 'C6 Fest', segment: 'Event / Media', result: 'Performance management for one of the largest music festivals in Brazil.' },
        { name: 'Alucomaxx', segment: 'B2B Industry', result: 'Qualified lead generation (MQLs) for ACM and industrial facades.' },
        { name: 'Jolema', segment: 'B2B/B2C E-commerce', result: 'Funnel optimization and performance for auto parts with increased ROAS.' },
        { name: 'Aza Liss', segment: 'Fashion E-commerce', result: 'Growth and Paid Media focused on ROAS, LTV and funnel optimization.' },
        { name: 'HAB Arquitetura', segment: 'B2B Lead Generation', result: 'Google and LinkedIn Ads for high-end architecture and construction.' },
        { name: 'Papu Petshop', segment: 'Pet Services', result: 'Lead generation and bookings focused on CAC and local performance.' },
      ],
    },
    caseHighlight: {
      label: 'Featured Case',
      title: 'Growth in Practice',
      challenge: 'Low qualified lead generation and high CPA in a competitive market.',
      strategy: 'Landing page optimization, bottom-of-funnel Google Ads and nurturing flows with automation.',
    },
    partners: {
      label: 'Partnerships & Certifications',
      title: 'Recognized by the Biggest in the Market',
      sub: 'Access to exclusive resources, priority support and global best practices.',
    },
    steps: {
      label: 'How We Start',
      title: 'Three Steps to Unlock Your Growth',
      items: [
        { n: '01', title: 'Alignment Chat', desc: 'A 30-min conversation to understand your challenges, goals and your business growth potential.' },
        { n: '02', title: 'Potential Analysis', desc: 'Our team diagnoses your digital presence and identifies the highest-impact opportunities.' },
        { n: '03', title: 'Growth Proposal', desc: 'We present a 100% customized action plan for your revenue objectives.' },
      ],
    },
    form: {
      title: "Let's unlock your next level together?",
      sub: 'Fill out the form and our team will contact you within 1 business day.',
      name: 'Full name *',
      email: 'Corporate email *',
      phone: 'WhatsApp',
      company: 'Company',
      service: 'Service of interest',
      services: ['Paid Media (Google/Meta Ads)', 'SEO & Organic Performance', 'Dev & Web Infrastructure', 'Automation & CRM', 'Data & Analytics', 'Full Growth Consulting'],
      message: 'Tell us about your challenge',
      send: 'Get a free diagnosis',
      sending: 'Sending...',
      success: 'Message received! Our team will contact you shortly.',
      error: 'Error sending. Please try again or contact us on WhatsApp.',
      privacy: 'Your data is handled securely. Privacy Policy.',
    },
    footer: {
      tagline: 'Transforming digital into results.',
      company: 'Manáry Digital Growth',
      rights: `© ${new Date().getFullYear()} Manáry Digital. All rights reserved.`,
      dev: 'Developed by Manáry Digital',
      links: { solutions: 'Solutions', company: 'Company', contact: 'Contact' },
    },
    about: {
      label: 'Who We Are',
      title: 'Μανάρι — a word that defines who we are.',
      body: "We are a Digital Growth agency driven by real results. Our name comes from the Greek Μανάρι — an expression of affection and diversity. We combine strategy, technology and humanization to transform digital into predictable growth for our clients.",
      quote: '"The future is not something we wait for — it is something we build."',
      author: 'Yanko Cicely, Founder & CEO',
    },
  },
  el: {
    nav: {
      growth: 'Growth Κατά Μέτρο',
      solutions: 'Λύσεις',
      about: 'Σχετικά',
      blog: 'Blog',
      materials: 'Υλικά',
      contact: 'Επικοινωνία',
      whatsapp: 'WhatsApp',
      growthItems: [
        { label: 'Manáry Light', desc: 'Το σημείο εκκίνησης για την επιχείρησή σας.', href: '#plans', icon: '⚡' },
        { label: 'Manáry Astro', desc: 'Προηγμένη επιτάχυνση και απόδοση.', href: '#plans', icon: '🚀' },
        { label: 'Manáry Growth', desc: 'Πλήρης στρατηγική ψηφιακής κλίμακας.', href: '#plans', icon: '🎯' },
      ],
      solutionItems: [
        { label: 'Πληρωμένα Μέσα', desc: 'Προσεγγίστε το κοινό σας με διαφημίσεις.', icon: Megaphone, color: 'text-orange-500 bg-orange-50' },
        { label: 'SEO', desc: 'Κυριαρχήστε στην κορυφή της Google.', icon: Search, color: 'text-blue-500 bg-blue-50' },
        { label: 'Dev & Infra Web', desc: 'Ιστότοποι υψηλής απόδοσης.', icon: Code2, color: 'text-[#db4100] bg-red-50' },
        { label: 'Αυτοματισμοί', desc: 'Λειτουργία σε αυτόματο πιλότο.', icon: Bot, color: 'text-violet-500 bg-violet-50' },
        { label: 'CRM', desc: 'Διαχείριση σχέσεων.', icon: Users, color: 'text-emerald-500 bg-emerald-50' },
        { label: 'Data & Analytics', desc: 'Αποφάσεις βασισμένες σε δεδομένα.', icon: BarChart3, color: 'text-sky-500 bg-sky-50' },
      ],
      aboutItems: [
        { label: 'Ποιοι Είμαστε', desc: 'Η ιστορία και η αποστολή μας.', icon: '👥', href: '#about' },
        { label: 'Cases Επιτυχίας', desc: 'Πραγματικά αποτελέσματα.', icon: '🏆', href: '#cases' },
        { label: 'Κουλτούρα Manáry', desc: 'Πώς είναι να είσαι στην ομάδα μας.', icon: '❤️', href: '#culture' },
      ],
      materialItems: [
        { label: 'E-Books', desc: 'Πλούσιο υλικό για download.', icon: '📚', href: '#ebooks' },
        { label: 'FAQ', desc: 'Συχνές ερωτήσεις.', icon: '❓', href: '#faq' },
      ],
    },
    hero: {
      badge: 'Εταιρεία Digital Growth',
      h1: 'Το Marketing σας πρόκειται να αλλάξει.',
      h1b: 'Τώρα είναι Performance.',
      sub: 'Πληρωμένα Μέσα, SEO, Dev & Infra Web, Αυτοματισμοί, CRM και Data & Analytics ενοποιημένα σε μία στρατηγική.',
      cta1: 'Ανακαλύψτε τις λύσεις μας',
      cta2: 'Επικοινωνήστε μαζί μας',
    },
    stats: [
      { value: '+200%', label: 'σε Εξειδικευμένα Leads' },
      { value: '-35%', label: 'στο Κόστος Απόκτησης' },
      { value: '6+', label: 'χρόνια στην αγορά' },
      { value: '50+', label: 'ενεργοί πελάτες' },
    ],
    how: { label: 'Μεθοδολογία', title: 'Πώς Παράγουμε Αποτελέσματα', sub: 'Μια προσέγγιση 360° που συνδυάζει τεχνολογία, δεδομένα και στρατηγική.',
      items: [
        { icon: Layers, title: 'Μηχανική Πλατφορμών', desc: 'Κατασκευάζουμε την κατάλληλη ψηφιακή υποδομή για μετατροπή.' },
        { icon: Target, title: 'Έξυπνη Απόκτηση', desc: 'Εκστρατείες στα σωστά κανάλια, το σωστό κοινό, τη σωστή στιγμή.' },
        { icon: TrendingUp, title: 'Βελτιστοποίηση Funnel', desc: 'Συνεχής ανάλυση και βελτίωση του funnel μετατροπής.' },
        { icon: Database, title: 'Αποφάσεις βάσει Δεδομένων', desc: 'Dashboards, GA4, GTM για αποφάσεις βασισμένες σε γεγονότα.' },
      ],
    },
    why: { label: 'Διαφοροποιητικά', title: 'Γιατί να Επιλέξετε τη Manáry;',
      items: [
        { icon: Users, color: 'bg-[#80e6b5]/20 text-emerald-700', title: 'Αφιερωμένος Customer Success Manager', desc: 'Περισσότερο από επαφή — στρατηγικός συνεργάτης. Εξανθρωπισμένη, προενεργητική υποστήριξη.' },
        { icon: Zap, color: 'bg-[#f59b3e]/20 text-orange-600', title: 'Πλήρης Ομάδα, Βελτιστοποιημένο Κόστος', desc: 'Αποκτήστε SEO, Μέσα, Δεδομένα, Σχεδιασμό και Dev για ένα κλάσμα του κόστους.' },
        { icon: BarChart3, color: 'bg-[#db4100]/10 text-[#db4100]', title: 'Αποδεδειγμένα Αποτελέσματα', desc: 'Εστίαση στα KPIs που πραγματικά επηρεάζουν τα έσοδά σας.' },
      ],
    },
    moment: { label: 'Για Ποιους', title: 'Growth Κατά Μέτρο: Λύσεις για τη στιγμή σας',
      items: [
        { tag: 'ΜΜΕ', title: 'Αναπτυχθείτε Γρηγορότερα', desc: 'Βελτιστοποιήστε τον προϋπολογισμό για μέγιστη ορατότητα και αξιόπιστη μετατροπή.', cta: 'Πλάνα ΜΜΕ' },
        { tag: 'E-commerce', title: 'Πουλήστε Περισσότερα Online', desc: 'Στρατηγικές επικεντρωμένες σε ROAS και βελτιστοποίηση του funnel αγοράς.', cta: 'Πλάνα E-commerce' },
        { tag: 'Μεγάλες Επιχειρήσεις', title: 'Κλίμακα & Καινοτομία', desc: 'Στρατηγική συνεργασία για ενοποίηση πολύπλοκων δομών και κυριαρχία στην αγορά.', cta: 'Enterprise Consulting' },
      ],
    },
    solutions: { label: 'Τι Κάνουμε', title: 'Στρατηγικές Growth που Προωθούν την Επιχείρησή σας',
      items: [
        { icon: Megaphone, color: 'text-[#db4100] bg-red-50', title: 'Πληρωμένα Μέσα', desc: 'Google Ads, Meta Ads, LinkedIn, TikTok. Εκστρατείες για leads και πωλήσεις.' },
        { icon: Search, color: 'text-blue-600 bg-blue-50', title: 'SEO & Οργανική Απόδοση', desc: 'Τεχνικός έλεγχος, βελτιστοποίηση σελίδας, περιεχόμενο και link building.' },
        { icon: Code2, color: 'text-violet-600 bg-violet-50', title: 'Dev & Infra Web', desc: 'Ιστότοποι και LPs υψηλής μετατροπής. UI/UX, WordPress, React, Node.js.' },
        { icon: Bot, color: 'text-emerald-600 bg-emerald-50', title: 'Αυτοματισμός & CRM', desc: 'Έξυπνα journeys για τη φροντίδα leads. Brevo, HubSpot, RD Station.' },
        { icon: BarChart3, color: 'text-sky-600 bg-sky-50', title: 'Data & Analytics', desc: 'GA4, GTM, Looker Studio. Προσαρμοσμένα dashboards, LTV, Cohort.' },
        { icon: Layers, color: 'text-[#f59b3e] bg-orange-50', title: 'Στρατηγική & Growth', desc: 'Εφαρμοσμένη μεθοδολογία Growth Hacking. Δοκιμές A/B και βιώσιμη κλίμακα.' },
      ],
    },
    plans: { label: 'Πλάνα Επένδυσης', title: 'Το Σωστό Επίπεδο για τη Στιγμή σας', sub: 'Κάθε πλάνο ακολουθεί την ωριμότητα της επιχείρησής σας.',
      items: [
        { name: 'Light', badge: 'Θεμέλιο', highlight: false, moment: 'Επικύρωση digital και δημιουργία πρώτων leads.', features: ['Διαχείριση Μέσων (Google & Meta Ads)', 'Creatives για Ads', 'Setup μετατροπής (GA4/GTM)', 'Standard Dashboard', 'Βασικό SEO On-Page', 'Setup Εταιρικών Email'], cta: 'Προγραμματισμός ανάλυσης' },
        { name: 'Astro', badge: 'Επιτάχυνση', highlight: true, moment: 'Δημιουργία προβλέψιμης μηχανής απόκτησης.', features: ['Διαχείριση Μέσων (Google, Meta, TikTok, LinkedIn)', 'Creatives (Στατικά, Βίντεο + Copy)', 'Δοκιμές A/B (CRO)', 'Αυτοματισμός Marketing (Brevo)', 'Στρατηγική SEO & Περιεχομένου', 'Dashboard + Ανάλυση Funnel'], cta: 'Ξεκινήστε επιτάχυνση' },
        { name: 'Growth', badge: 'Κυριαρχία', highlight: false, moment: 'Κλιμάκωση εσόδων και κυριαρχία καναλιών.', features: ['Όλα του Astro +', 'Προηγμένο GA4/GTM Server-Side', 'Προσαρμοσμένα Dashboards', 'Ανάλυση Cohort, LTV & Atribution', 'Πλήρες SEO, Περιεχόμενο & Link Building', 'Πλήρες CRM (HubSpot, RD, Salesforce)'], cta: 'Στρατηγική συμβουλευτική' },
      ],
      note: 'Φάση 1: Έργο Θεμελίωσης (setup/dev) · Φάση 2: Μηνιαία χρέωση ανάπτυξης',
    },
    cases: { label: 'Cases Επιτυχίας', title: 'Αποδεδειγμένα Αποτελέσματα', sub: 'Εμπειρία σε πολλαπλούς τομείς.',
      items: [
        { name: 'C6 Fest', segment: 'Εκδήλωση / Μέσα', result: 'Διαχείριση απόδοσης για ένα από τα μεγαλύτερα μουσικά φεστιβάλ.' },
        { name: 'Alucomaxx', segment: 'Βιομηχανία B2B', result: 'Δημιουργία εξειδικευμένων leads για τον κλάδο ACM.' },
        { name: 'Jolema', segment: 'E-commerce B2B/B2C', result: 'Βελτιστοποίηση funnel και απόδοση για ανταλλακτικά αυτοκινήτων.' },
        { name: 'Aza Liss', segment: 'E-commerce Μόδας', result: 'Growth και Paid Media με εστίαση σε ROAS και LTV.' },
        { name: 'HAB Arquitetura', segment: 'B2B Lead Generation', result: 'Google και LinkedIn Ads για αρχιτεκτονική υψηλού επιπέδου.' },
        { name: 'Papu Petshop', segment: 'Pet Services', result: 'Δημιουργία leads για pet services με εστίαση σε CAC.' },
      ],
    },
    caseHighlight: { label: 'Ξεχωριστό Case', title: 'Growth στην Πράξη', challenge: 'Χαμηλή δημιουργία leads και υψηλό CPA σε ανταγωνιστική αγορά.', strategy: 'Βελτιστοποίηση LP, Google Ads και flows αυτοματισμού.' },
    partners: { label: 'Συνεργασίες & Πιστοποιήσεις', title: 'Αναγνωρισμένοι από τους Μεγαλύτερους', sub: 'Πρόσβαση σε αποκλειστικούς πόρους και βέλτιστες παγκόσμιες πρακτικές.' },
    steps: { label: 'Πώς Ξεκινάμε', title: 'Τρία Βήματα για να Ξεκλειδώσουμε την Ανάπτυξή σας',
      items: [
        { n: '01', title: 'Συζήτηση Ευθυγράμμισης', desc: 'Μια συνομιλία 30 λεπτών για να κατανοήσουμε τις προκλήσεις και τους στόχους σας.' },
        { n: '02', title: 'Ανάλυση Δυναμικού', desc: 'Η ομάδα μας διαγνώνει την ψηφιακή σας παρουσία.' },
        { n: '03', title: 'Πρόταση Growth', desc: 'Παρουσιάζουμε ένα πλάνο δράσης 100% προσαρμοσμένο στους στόχους εσόδων σας.' },
      ],
    },
    form: { title: 'Ξεκλειδώσουμε μαζί το επόμενο επίπεδό σας;', sub: 'Συμπληρώστε τη φόρμα και η ομάδα μας θα επικοινωνήσει εντός 1 εργάσιμης ημέρας.', name: 'Ονοματεπώνυμο *', email: 'Εταιρικό e-mail *', phone: 'WhatsApp', company: 'Εταιρεία', service: 'Υπηρεσία ενδιαφέροντος', services: ['Πληρωμένα Μέσα', 'SEO', 'Dev & Web Infra', 'Αυτοματισμός & CRM', 'Data & Analytics', 'Πλήρης Consulting'], message: 'Πείτε μας για την πρόκλησή σας', send: 'Δωρεάν Διάγνωση', sending: 'Αποστολή...', success: 'Λάβαμε το μήνυμά σας!', error: 'Σφάλμα. Δοκιμάστε ξανά.', privacy: 'Τα δεδομένα σας προστατεύονται.' },
    footer: { tagline: 'Μετατρέπουμε το ψηφιακό σε αποτέλεσμα.', company: 'Manáry Digital Growth', rights: `© ${new Date().getFullYear()} Manáry Digital.`, dev: 'Αναπτύχθηκε από τη Manáry Digital', links: { solutions: 'Λύσεις', company: 'Εταιρεία', contact: 'Επικοινωνία' } },
    about: { label: 'Ποιοι Είμαστε', title: 'Μανάρι — μια λέξη που ορίζει ποιοι είμαστε.', body: 'Είμαστε εταιρεία Digital Growth που κινείται από πραγματικά αποτελέσματα. Το όνομά μας προέρχεται από το ελληνικό Μανάρι — έκφραση αγάπης και ποικιλομορφίας.', quote: '"Το μέλλον δεν είναι κάτι που περιμένουμε — είναι κάτι που χτίζουμε."', author: 'Yanko Cicely, Ιδρυτής & CEO' },
  },
} as const;

type TData = typeof T.pt;

// ─── Language Context ──────────────────────────────────────────────────────────
interface LangCtx { lang: Lang; setLang: (l: Lang) => void; t: TData }
const Ctx = createContext<LangCtx>({ lang: 'pt', setLang: () => {}, t: T.pt });
const useLang = () => useContext(Ctx);
const FLAGS: Record<Lang, string> = { pt: '🇧🇷', en: '🇺🇸', el: '🇬🇷' };

// ─── Scroll reveal ─────────────────────────────────────────────────────────────
function useReveal(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

function Reveal({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, visible } = useReveal();
  return (
    <div ref={ref} className={`transition-all duration-700 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

// ─── Navbar ────────────────────────────────────────────────────────────────────
function Nav() {
  const { lang, setLang, t } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [dropdown, setDropdown] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => {
    const fn = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setDropdown(null);
    };
    document.addEventListener('mousedown', fn);
    return () => document.removeEventListener('mousedown', fn);
  }, []);

  const DD = ({ id, label, children }: { id: string; label: string; children: React.ReactNode }) => (
    <div className="relative" onMouseEnter={() => setDropdown(id)} onMouseLeave={() => setDropdown(null)}>
      <button className={`flex items-center gap-1 text-sm font-medium transition-colors ${scrolled ? 'text-zinc-700 hover:text-[#db4100]' : 'text-white/90 hover:text-white'}`}>
        {label} <ChevronDown className={`w-3.5 h-3.5 transition-transform ${dropdown === id ? 'rotate-180' : ''}`} />
      </button>
      {dropdown === id && (
        <div className="dropdown-enter absolute top-full left-1/2 -translate-x-1/2 pt-3 z-50 min-w-[480px]">
          <div className="bg-zinc-950 rounded-2xl shadow-2xl border border-white/10 p-3">
            {children}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <>
      <header ref={navRef} className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-sm border-b border-zinc-100' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-6">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2.5 flex-shrink-0 group">
            <div className={`w-8 h-8 rounded-lg bg-[#db4100] flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-105 transition-transform`}>
              <span className="text-white font-black text-base leading-none">M</span>
            </div>
            <div className="flex flex-col leading-tight">
              <span className={`text-sm font-black tracking-tight transition-colors ${scrolled ? 'text-zinc-900' : 'text-white'}`}>MANÁRY</span>
              <span className={`text-[9px] font-semibold tracking-widest uppercase transition-colors ${scrolled ? 'text-zinc-400' : 'text-white/50'}`}>Digital Growth</span>
            </div>
          </a>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            <DD id="growth" label={t.nav.growth}>
              <div className="grid grid-cols-3 gap-1">
                {t.nav.growthItems.map(item => (
                  <a key={item.label} href={item.href} className="flex flex-col gap-1 p-3 rounded-xl hover:bg-white/5 transition-colors group">
                    <span className="text-2xl">{item.icon}</span>
                    <span className="text-white text-sm font-semibold group-hover:text-[#f59b3e] transition-colors">{item.label}</span>
                    <span className="text-zinc-500 text-xs leading-snug">{item.desc}</span>
                  </a>
                ))}
              </div>
            </DD>

            <DD id="solutions" label={t.nav.solutions}>
              <div className="grid grid-cols-2 gap-1">
                {t.nav.solutionItems.map(item => {
                  const Icon = item.icon;
                  const [iconColor] = item.color.split(' ');
                  return (
                    <a key={item.label} href="#solucoes" className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors group">
                      <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                        <Icon className={`w-4 h-4 ${iconColor}`} />
                      </div>
                      <div>
                        <p className="text-white text-sm font-semibold group-hover:text-[#f59b3e] transition-colors">{item.label}</p>
                        <p className="text-zinc-500 text-xs">{item.desc}</p>
                      </div>
                    </a>
                  );
                })}
              </div>
            </DD>

            <DD id="about" label={t.nav.about}>
              <div className="grid grid-cols-2 gap-1">
                {t.nav.aboutItems.map(item => (
                  <a key={item.label} href={item.href} className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors group">
                    <span className="text-2xl flex-shrink-0">{item.icon}</span>
                    <div>
                      <p className="text-white text-sm font-semibold group-hover:text-[#80e6b5] transition-colors">{item.label}</p>
                      <p className="text-zinc-500 text-xs">{item.desc}</p>
                    </div>
                  </a>
                ))}
              </div>
            </DD>

            <a href="#blog" className={`text-sm font-medium px-3 py-2 transition-colors ${scrolled ? 'text-zinc-700 hover:text-[#db4100]' : 'text-white/90 hover:text-white'}`}>{t.nav.blog}</a>

            <DD id="materials" label={t.nav.materials}>
              <div className="grid grid-cols-2 gap-1">
                {t.nav.materialItems.map(item => (
                  <a key={item.label} href={item.href} className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors group">
                    <span className="text-2xl flex-shrink-0">{item.icon}</span>
                    <div>
                      <p className="text-white text-sm font-semibold group-hover:text-[#f59b3e] transition-colors">{item.label}</p>
                      <p className="text-zinc-500 text-xs">{item.desc}</p>
                    </div>
                  </a>
                ))}
              </div>
            </DD>
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            {/* Language */}
            <div className={`flex items-center gap-0.5 rounded-lg p-0.5 ${scrolled ? 'bg-zinc-100' : 'bg-white/10'}`}>
              {(['pt', 'en', 'el'] as Lang[]).map(l => (
                <button key={l} onClick={() => setLang(l)}
                  className={`px-2 py-1 rounded-md text-xs font-bold transition-all ${lang === l ? 'bg-[#db4100] text-white shadow-sm' : scrolled ? 'text-zinc-400 hover:text-zinc-700' : 'text-white/50 hover:text-white'}`}>
                  {FLAGS[l]}
                </button>
              ))}
            </div>

            <button onClick={() => setShowForm(true)}
              className={`text-sm font-semibold px-4 py-2 rounded-xl border transition-all ${scrolled ? 'border-zinc-200 text-zinc-700 hover:border-[#db4100] hover:text-[#db4100]' : 'border-white/20 text-white hover:border-white'}`}>
              {t.nav.contact}
            </button>
            <a href="https://wa.me/5511937750292?text=Olá! Gostaria de saber mais sobre a Manáry Digital."
              target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm font-bold bg-[#25D366] hover:bg-[#1da851] text-white px-4 py-2 rounded-xl transition-all shadow-md hover:shadow-lg">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.116 1.524 5.843L.057 23.4a.5.5 0 0 0 .611.61l5.648-1.482A11.953 11.953 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22a9.953 9.953 0 0 1-5.117-1.41l-.367-.218-3.803.998.997-3.71-.24-.38A9.953 9.953 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>
              WhatsApp
            </a>
          </div>

          <button className="lg:hidden p-2" onClick={() => setOpen(!open)}>
            {open ? <X className={scrolled ? 'text-zinc-700' : 'text-white'} size={22} /> : <Menu className={scrolled ? 'text-zinc-700' : 'text-white'} size={22} />}
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="lg:hidden bg-zinc-950 border-t border-white/10 px-6 py-5 flex flex-col gap-4">
            {[t.nav.growth, t.nav.solutions, t.nav.about, t.nav.blog, t.nav.materials].map(item => (
              <a key={item} href="#" className="text-white font-medium text-sm" onClick={() => setOpen(false)}>{item}</a>
            ))}
            <div className="flex gap-2 pt-2 border-t border-white/10">
              {(['pt', 'en', 'el'] as Lang[]).map(l => (
                <button key={l} onClick={() => { setLang(l); setOpen(false); }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${lang === l ? 'bg-[#db4100] text-white' : 'text-zinc-400 hover:text-white'}`}>
                  {FLAGS[l]} {l.toUpperCase()}
                </button>
              ))}
            </div>
            <button onClick={() => { setShowForm(true); setOpen(false); }}
              className="text-sm font-semibold text-white border border-white/20 px-4 py-2.5 rounded-xl text-center">{t.nav.contact}</button>
            <a href="https://wa.me/5511937750292" target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-[#25D366] text-white font-bold px-4 py-2.5 rounded-xl text-sm">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.116 1.524 5.843L.057 23.4a.5.5 0 0 0 .611.61l5.648-1.482A11.953 11.953 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22a9.953 9.953 0 0 1-5.117-1.41l-.367-.218-3.803.998.997-3.71-.24-.38A9.953 9.953 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>
              WhatsApp
            </a>
          </div>
        )}
      </header>

      {showForm && <LeadFormModal onClose={() => setShowForm(false)} />}
    </>
  );
}

// ─── Lead Form Modal ───────────────────────────────────────────────────────────
function LeadFormModal({ onClose }: { onClose: () => void }) {
  const { t } = useLang();
  const f = t.form;
  const [form, setForm] = useState({ name: '', email: '', phone: '', company: '', service: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [step, setStep] = useState(1);

  const set = (k: string, v: string) => setForm(p => ({ ...p, [k]: v }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('https://app.manarygrowth.com/api/leads/capture', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, source: 'Website manary.co — Formulário de Contato' }),
      });
      setStatus(res.ok ? 'success' : 'error');
    } catch { setStatus('error'); }
  };

  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', fn);
    return () => document.removeEventListener('keydown', fn);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-zinc-950 px-8 py-7 relative">
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#db4100]/20 rounded-full blur-3xl" />
          <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/60 hover:bg-white/20 hover:text-white transition-all">
            <X size={16} />
          </button>
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-lg bg-[#db4100] flex items-center justify-center">
                <span className="text-white font-black text-sm">M</span>
              </div>
              <span className="text-white font-bold text-sm">Manáry Digital Growth</span>
            </div>
            <h2 className="text-white font-black text-xl leading-tight">{f.title}</h2>
            <p className="text-zinc-400 text-sm mt-1">{f.sub}</p>
          </div>
          {/* Step indicator */}
          <div className="flex gap-2 mt-5 relative z-10">
            {[1, 2].map(s => (
              <div key={s} className={`h-1 flex-1 rounded-full transition-all ${step >= s ? 'bg-[#db4100]' : 'bg-white/15'}`} />
            ))}
          </div>
        </div>

        <div className="px-8 py-7">
          {status === 'success' ? (
            <div className="flex flex-col items-center gap-4 py-6 text-center">
              <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-zinc-900">{f.success}</h3>
              <a href="https://wa.me/5511937750292" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 bg-[#25D366] text-white font-bold px-6 py-3 rounded-xl text-sm">
                Falar no WhatsApp <ArrowRight size={16} />
              </a>
            </div>
          ) : (
            <form onSubmit={submit} className="space-y-4">
              {step === 1 && (
                <>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="col-span-2">
                      <input required value={form.name} onChange={e => set('name', e.target.value)}
                        placeholder={f.name} className="w-full px-4 py-3 border border-zinc-200 rounded-xl text-sm focus:outline-none focus:border-[#db4100] focus:ring-1 focus:ring-[#db4100]/20 transition-all bg-zinc-50" />
                    </div>
                    <input required type="email" value={form.email} onChange={e => set('email', e.target.value)}
                      placeholder={f.email} className="px-4 py-3 border border-zinc-200 rounded-xl text-sm focus:outline-none focus:border-[#db4100] transition-all bg-zinc-50" />
                    <input type="tel" value={form.phone} onChange={e => set('phone', e.target.value)}
                      placeholder={f.phone} className="px-4 py-3 border border-zinc-200 rounded-xl text-sm focus:outline-none focus:border-[#db4100] transition-all bg-zinc-50" />
                  </div>
                  <button type="button" onClick={() => { if (!form.name || !form.email) return; setStep(2); }}
                    className="w-full bg-[#db4100] hover:bg-[#c23900] text-white font-bold py-3.5 rounded-xl text-sm transition-all">
                    Próximo →
                  </button>
                </>
              )}
              {step === 2 && (
                <>
                  <input value={form.company} onChange={e => set('company', e.target.value)}
                    placeholder={f.company} className="w-full px-4 py-3 border border-zinc-200 rounded-xl text-sm focus:outline-none focus:border-[#db4100] transition-all bg-zinc-50" />
                  <select value={form.service} onChange={e => set('service', e.target.value)}
                    className="w-full px-4 py-3 border border-zinc-200 rounded-xl text-sm focus:outline-none focus:border-[#db4100] transition-all bg-zinc-50 text-zinc-500">
                    <option value="">{f.service}</option>
                    {f.services.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                  <textarea value={form.message} onChange={e => set('message', e.target.value)}
                    placeholder={f.message} rows={3}
                    className="w-full px-4 py-3 border border-zinc-200 rounded-xl text-sm focus:outline-none focus:border-[#db4100] transition-all bg-zinc-50 resize-none" />
                  {status === 'error' && <p className="text-red-500 text-xs">{f.error}</p>}
                  <div className="flex gap-3">
                    <button type="button" onClick={() => setStep(1)}
                      className="flex-shrink-0 px-4 py-3.5 border border-zinc-200 text-zinc-600 rounded-xl text-sm font-semibold hover:border-zinc-300 transition-all">
                      ←
                    </button>
                    <button type="submit" disabled={status === 'loading'}
                      className="flex-1 bg-[#db4100] hover:bg-[#c23900] disabled:opacity-60 text-white font-bold py-3.5 rounded-xl text-sm transition-all flex items-center justify-center gap-2">
                      {status === 'loading' ? f.sending : <><span>{f.send}</span><ArrowRight size={16} /></>}
                    </button>
                  </div>
                </>
              )}
              <p className="text-[10px] text-zinc-400 text-center">{f.privacy}</p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── WhatsApp Button ───────────────────────────────────────────────────────────
function WhatsAppBtn() {
  return (
    <a href="https://wa.me/5511937750292?text=Olá! Gostaria de saber mais sobre a Manáry Digital."
      target="_blank" rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-[#25D366] flex items-center justify-center shadow-xl hover:scale-110 transition-transform hover:shadow-2xl"
      style={{ boxShadow: '0 4px 20px rgba(37,211,102,0.5)' }}>
      <svg viewBox="0 0 24 24" fill="white" className="w-7 h-7">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.116 1.524 5.843L.057 23.4a.5.5 0 0 0 .611.61l5.648-1.482A11.953 11.953 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22a9.953 9.953 0 0 1-5.117-1.41l-.367-.218-3.803.998.997-3.71-.24-.38A9.953 9.953 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
      </svg>
    </a>
  );
}

// ─── Hero ──────────────────────────────────────────────────────────────────────
function Hero({ onOpenForm }: { onOpenForm: () => void }) {
  const { t } = useLang();
  const h = t.hero;
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-zinc-950 pt-16">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff06_1px,transparent_1px),linear-gradient(to_bottom,#ffffff06_1px,transparent_1px)] bg-[size:72px_72px]" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full bg-[#db4100]/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-[#80e6b5]/5 blur-[100px] pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-6 text-center">
        <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 text-xs text-[#80e6b5] font-semibold mb-8 tracking-wide uppercase">
          <span className="w-1.5 h-1.5 bg-[#80e6b5] rounded-full animate-pulse" />
          {h.badge}
        </div>

        <h1 className="text-5xl md:text-7xl font-black text-white leading-[1.0] tracking-tight mb-3">
          {h.h1}
        </h1>
        <h1 className="text-5xl md:text-7xl font-black leading-[1.0] tracking-tight mb-8">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#db4100] via-[#f59b3e] to-[#db4100]">{h.h1b}</span>
        </h1>

        <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed">{h.sub}</p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button onClick={onOpenForm}
            className="inline-flex items-center justify-center gap-2 bg-[#db4100] hover:bg-[#c23900] text-white font-bold px-8 py-4 rounded-2xl transition-all shadow-lg shadow-red-900/30 hover:shadow-red-900/50 text-base">
            {h.cta1} <ArrowRight size={18} />
          </button>
          <a href="https://wa.me/5511937750292" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 text-white font-semibold px-8 py-4 rounded-2xl border border-white/15 hover:border-[#25D366]/60 hover:text-[#80e6b5] transition-all text-base">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-[#25D366]"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.116 1.524 5.843L.057 23.4a.5.5 0 0 0 .611.61l5.648-1.482A11.953 11.953 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22a9.953 9.953 0 0 1-5.117-1.41l-.367-.218-3.803.998.997-3.71-.24-.38A9.953 9.953 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>
            {h.cta2}
          </a>
        </div>

        {/* Stats */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
          {t.stats.map(s => (
            <div key={s.value} className="bg-white/4 border border-white/8 rounded-2xl px-4 py-5 text-center hover:bg-white/6 transition-colors">
              <div className="text-2xl md:text-3xl font-black text-white mb-1">{s.value}</div>
              <div className="text-xs text-zinc-500 leading-snug">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Clients Logos ─────────────────────────────────────────────────────────────
const CLIENTS = ['C6 Fest', 'Alucomaxx', 'Jolema', 'Aza Liss', 'HAB Arquitetura', 'Papu Petshop', 'C6 Fest', 'Alucomaxx', 'Jolema'];
function ClientsBar() {
  return (
    <section className="bg-white border-y border-zinc-100 py-10 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 text-center mb-6">
        <p className="text-xs text-zinc-400 font-semibold uppercase tracking-widest">Empresas que confiam na Manáry</p>
      </div>
      <div className="relative">
        <div className="flex gap-16 items-center" style={{ animation: 'scroll 20s linear infinite' }}>
          {[...CLIENTS, ...CLIENTS].map((name, i) => (
            <div key={i} className="flex-shrink-0 px-6 py-2 bg-zinc-50 border border-zinc-100 rounded-xl">
              <span className="text-zinc-400 font-bold text-sm tracking-tight whitespace-nowrap">{name}</span>
            </div>
          ))}
        </div>
      </div>
      <style>{`@keyframes scroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }`}</style>
    </section>
  );
}

// ─── How We Work ───────────────────────────────────────────────────────────────
function HowWeWork() {
  const { t } = useLang();
  const h = t.how;
  const COLORS = ['bg-[#db4100]/10 text-[#db4100]', 'bg-[#f59b3e]/15 text-[#f59b3e]', 'bg-[#80e6b5]/15 text-emerald-600', 'bg-violet-100 text-violet-600'];
  return (
    <section id="metodologia" className="py-32 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <Reveal className="text-center mb-16">
          <p className="text-xs font-black text-[#db4100] uppercase tracking-widest mb-3">{h.label}</p>
          <h2 className="text-4xl md:text-5xl font-black text-zinc-900 mb-4">{h.title}</h2>
          <p className="text-zinc-500 text-lg max-w-2xl mx-auto">{h.sub}</p>
        </Reveal>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {h.items.map(({ icon: Icon, title, desc }, i) => (
            <Reveal key={i} delay={i * 80}>
              <div className="group p-7 rounded-3xl border border-zinc-100 hover:border-zinc-200 hover:shadow-xl transition-all h-full bg-white">
                <div className={`w-12 h-12 rounded-2xl ${COLORS[i].split(' ')[0]} flex items-center justify-center mb-5`}>
                  <Icon className={`${COLORS[i].split(' ')[1]} w-5 h-5`} />
                </div>
                <h3 className="font-bold text-zinc-900 mb-2 text-base">{title}</h3>
                <p className="text-zinc-500 text-sm leading-relaxed">{desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Why Manáry ────────────────────────────────────────────────────────────────
function WhyManary({ onOpenForm }: { onOpenForm: () => void }) {
  const { t } = useLang();
  const w = t.why;
  return (
    <section className="py-32 bg-zinc-950 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#db4100]/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#80e6b5]/5 rounded-full blur-[100px]" />
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <Reveal className="text-center mb-16">
          <p className="text-xs font-black text-[#80e6b5] uppercase tracking-widest mb-3">{w.label}</p>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">{w.title}</h2>
        </Reveal>
        <div className="grid md:grid-cols-3 gap-8">
          {w.items.map(({ icon: Icon, color, title, desc }, i) => {
            const [bg, textColor] = color.split(' ');
            return (
              <Reveal key={i} delay={i * 100}>
                <div className="bg-white/5 border border-white/10 rounded-3xl p-8 hover:bg-white/8 transition-all h-full">
                  <div className={`w-14 h-14 rounded-2xl ${bg} flex items-center justify-center mb-6`}>
                    <Icon className={`${textColor} w-6 h-6`} />
                  </div>
                  <h3 className="text-white font-bold text-lg mb-3">{title}</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">{desc}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
        <Reveal className="text-center mt-14">
          <button onClick={onOpenForm}
            className="inline-flex items-center gap-2 bg-[#db4100] hover:bg-[#c23900] text-white font-bold px-10 py-4 rounded-2xl transition-all shadow-lg text-base">
            Quero esses resultados <ArrowRight size={18} />
          </button>
        </Reveal>
      </div>
    </section>
  );
}

// ─── For Your Moment ───────────────────────────────────────────────────────────
function ForYourMoment({ onOpenForm }: { onOpenForm: () => void }) {
  const { t } = useLang();
  const m = t.moment;
  const ACCENTS = ['border-[#db4100] bg-[#db4100]/5', 'border-[#f59b3e] bg-[#f59b3e]/5', 'border-[#80e6b5] bg-[#80e6b5]/5'];
  const TAG_COLORS = ['bg-[#db4100] text-white', 'bg-[#f59b3e] text-white', 'bg-[#80e6b5] text-zinc-900'];
  return (
    <section id="solucoes-segmento" className="py-32 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <Reveal className="text-center mb-16">
          <p className="text-xs font-black text-[#db4100] uppercase tracking-widest mb-3">{m.label}</p>
          <h2 className="text-4xl md:text-5xl font-black text-zinc-900 mb-4">{m.title}</h2>
        </Reveal>
        <div className="grid md:grid-cols-3 gap-8">
          {m.items.map(({ tag, title, desc, cta }, i) => (
            <Reveal key={i} delay={i * 100}>
              <div className={`rounded-3xl border-2 p-8 h-full flex flex-col hover:shadow-xl transition-all ${ACCENTS[i]}`}>
                <span className={`text-xs font-black px-3 py-1.5 rounded-full w-fit mb-5 uppercase tracking-wide ${TAG_COLORS[i]}`}>{tag}</span>
                <h3 className="text-xl font-black text-zinc-900 mb-3">{title}</h3>
                <p className="text-zinc-600 text-sm leading-relaxed flex-1 mb-6">{desc}</p>
                <button onClick={onOpenForm} className="flex items-center gap-2 text-sm font-bold text-[#db4100] hover:text-[#c23900] transition-colors group">
                  {cta} <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Solutions Grid ─────────────────────────────────────────────────────────────
function SolutionsGrid() {
  const { t } = useLang();
  const s = t.solutions;
  return (
    <section id="solucoes" className="py-32 bg-zinc-950">
      <div className="max-w-6xl mx-auto px-6">
        <Reveal className="text-center mb-16">
          <p className="text-xs font-black text-[#80e6b5] uppercase tracking-widest mb-3">{s.label}</p>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">{s.title}</h2>
        </Reveal>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {s.items.map(({ icon: Icon, color, title, desc }, i) => {
            const [textCol, bgCol] = color.split(' ');
            return (
              <Reveal key={i} delay={i * 60}>
                <div className="group bg-white/4 border border-white/8 rounded-3xl p-7 hover:bg-white/7 hover:border-white/15 transition-all h-full">
                  <div className={`w-12 h-12 rounded-2xl ${bgCol} flex items-center justify-center mb-5`}>
                    <Icon className={`${textCol} w-5 h-5`} />
                  </div>
                  <h3 className="text-white font-bold text-base mb-2 group-hover:text-[#f59b3e] transition-colors">{title}</h3>
                  <p className="text-zinc-500 text-sm leading-relaxed">{desc}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── Plans ─────────────────────────────────────────────────────────────────────
function Plans({ onOpenForm }: { onOpenForm: () => void }) {
  const { t } = useLang();
  const p = t.plans;
  return (
    <section id="planos" className="py-32 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <Reveal className="text-center mb-16">
          <p className="text-xs font-black text-[#db4100] uppercase tracking-widest mb-3">{p.label}</p>
          <h2 className="text-4xl md:text-5xl font-black text-zinc-900 mb-4">{p.title}</h2>
          <p className="text-zinc-500 text-lg max-w-2xl mx-auto">{p.sub}</p>
        </Reveal>
        <div className="grid md:grid-cols-3 gap-6 items-stretch">
          {p.items.map((plan, i) => (
            <Reveal key={plan.name} delay={i * 80}>
              <div className={`relative rounded-3xl p-8 flex flex-col h-full border-2 transition-all ${plan.highlight ? 'bg-zinc-950 border-[#db4100] shadow-2xl shadow-red-900/20' : 'bg-white border-zinc-100 hover:border-zinc-200 hover:shadow-xl'}`}>
                {plan.highlight && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-[#db4100] text-white text-xs font-black px-5 py-1.5 rounded-full">★ Mais escolhido</span>
                  </div>
                )}
                <div className="mb-6">
                  <span className={`text-[10px] font-black uppercase tracking-widest ${plan.highlight ? 'text-[#f59b3e]' : 'text-zinc-400'}`}>{plan.badge}</span>
                  <h3 className={`text-3xl font-black mt-1 mb-2 ${plan.highlight ? 'text-white' : 'text-zinc-900'}`}>{plan.name}</h3>
                  <p className={`text-xs ${plan.highlight ? 'text-zinc-400' : 'text-zinc-500'}`}>{plan.moment}</p>
                </div>
                <ul className="flex-1 space-y-3 mb-8">
                  {plan.features.map(f => (
                    <li key={f} className="flex items-start gap-2.5">
                      <Check className="text-[#db4100] flex-shrink-0 mt-0.5 w-4 h-4" />
                      <span className={`text-xs leading-relaxed ${plan.highlight ? 'text-zinc-300' : 'text-zinc-600'}`}>{f}</span>
                    </li>
                  ))}
                </ul>
                <button onClick={onOpenForm}
                  className={`w-full py-3.5 rounded-2xl font-bold text-sm transition-all ${plan.highlight ? 'bg-[#db4100] text-white hover:bg-[#c23900] shadow-lg shadow-red-900/30' : 'bg-zinc-100 text-zinc-900 hover:bg-zinc-200'}`}>
                  {plan.cta}
                </button>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal className="text-center mt-8">
          <p className="text-xs text-zinc-400">{p.note}</p>
        </Reveal>
      </div>
    </section>
  );
}

// ─── Cases ─────────────────────────────────────────────────────────────────────
function Cases() {
  const { t } = useLang();
  const c = t.cases;
  return (
    <section id="cases" className="py-32 bg-zinc-50">
      <div className="max-w-6xl mx-auto px-6">
        <Reveal className="text-center mb-16">
          <p className="text-xs font-black text-[#db4100] uppercase tracking-widest mb-3">{c.label}</p>
          <h2 className="text-4xl md:text-5xl font-black text-zinc-900 mb-4">{c.title}</h2>
          <p className="text-zinc-500 text-lg">{c.sub}</p>
        </Reveal>

        {/* Highlight case */}
        <Reveal className="mb-12">
          <div className="bg-zinc-950 rounded-3xl p-10 md:p-14 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#db4100]/15 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#80e6b5]/10 rounded-full blur-2xl" />
            <div className="relative z-10 grid md:grid-cols-2 gap-10 items-center">
              <div>
                <p className="text-[#80e6b5] text-xs font-black uppercase tracking-widest mb-3">{t.caseHighlight.label}</p>
                <h3 className="text-white text-3xl font-black mb-5">{t.caseHighlight.title}</h3>
                <div className="space-y-3">
                  <div className="flex gap-3">
                    <span className="text-[#db4100] font-black text-xs w-24 flex-shrink-0 uppercase">Desafio</span>
                    <p className="text-zinc-400 text-sm">{t.caseHighlight.challenge}</p>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-[#80e6b5] font-black text-xs w-24 flex-shrink-0 uppercase">Estratégia</span>
                    <p className="text-zinc-400 text-sm">{t.caseHighlight.strategy}</p>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
                  <p className="text-4xl font-black text-white mb-1">+200%</p>
                  <p className="text-zinc-500 text-xs">em Leads Qualificados</p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
                  <p className="text-4xl font-black text-[#80e6b5] mb-1">-35%</p>
                  <p className="text-zinc-500 text-xs">no Custo por Aquisição</p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {c.items.map((item, i) => (
            <Reveal key={item.name} delay={i * 60}>
              <div className="bg-white rounded-2xl border border-zinc-100 p-6 hover:shadow-lg transition-all group">
                <div className="flex items-start justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-[#db4100]/10 flex items-center justify-center">
                    <span className="text-[#db4100] font-black text-sm">{item.name.charAt(0)}</span>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-zinc-300 group-hover:text-[#db4100] transition-colors" />
                </div>
                <h4 className="font-black text-zinc-900 mb-1">{item.name}</h4>
                <p className="text-[10px] font-bold text-[#db4100] uppercase tracking-wide mb-2">{item.segment}</p>
                <p className="text-zinc-500 text-sm leading-relaxed">{item.result}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Partners ──────────────────────────────────────────────────────────────────
function Partners() {
  const { t } = useLang();
  const p = t.partners;
  const badges = [
    { name: 'Google Partner', desc: 'Suporte especializado e acesso a recursos exclusivos da plataforma Google.', emoji: '🟡' },
    { name: 'Nuvemshop Silver', desc: 'Especialistas na maior plataforma de e-commerce da América Latina.', emoji: '☁️' },
    { name: 'Brevo Pioneer 2025', desc: 'Certificados em automação de marketing e CRM de alta performance.', emoji: '📧' },
    { name: 'MasterPlan AI', desc: 'Parceiro estratégico de Inteligência Artificial e automações avançadas.', emoji: '🤖' },
  ];
  return (
    <section className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <Reveal className="text-center mb-12">
          <p className="text-xs font-black text-[#db4100] uppercase tracking-widest mb-3">{p.label}</p>
          <h2 className="text-3xl md:text-4xl font-black text-zinc-900 mb-4">{p.title}</h2>
          <p className="text-zinc-500 max-w-xl mx-auto">{p.sub}</p>
        </Reveal>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-5">
          {badges.map((b, i) => (
            <Reveal key={b.name} delay={i * 80}>
              <div className="border-2 border-zinc-100 hover:border-[#db4100]/30 rounded-2xl p-6 text-center hover:shadow-lg transition-all group">
                <span className="text-4xl mb-3 block">{b.emoji}</span>
                <h4 className="font-black text-zinc-900 text-sm mb-2 group-hover:text-[#db4100] transition-colors">{b.name}</h4>
                <p className="text-zinc-500 text-xs leading-relaxed">{b.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── About ─────────────────────────────────────────────────────────────────────
function About() {
  const { t } = useLang();
  const a = t.about;
  return (
    <section id="sobre" className="py-32 bg-zinc-950 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] bg-[#db4100]/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#80e6b5]/8 rounded-full blur-[100px]" />
      </div>
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-2 gap-14 items-center">
          <Reveal>
            <p className="text-xs font-black text-[#80e6b5] uppercase tracking-widest mb-4">{a.label}</p>
            <h2 className="text-4xl font-black text-white mb-6">{a.title}</h2>
            <p className="text-zinc-300 text-lg leading-relaxed mb-8">{a.body}</p>
            <blockquote className="border-l-2 border-[#db4100] pl-6">
              <p className="text-white font-light text-xl italic leading-relaxed mb-3">{a.quote}</p>
              <footer className="text-zinc-500 text-sm">— {a.author}</footer>
            </blockquote>
          </Reveal>
          <Reveal delay={200}>
            <div className="relative">
              <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative w-16 h-16 rounded-2xl overflow-hidden shadow-lg flex-shrink-0">
                    <Image src="https://app.masterplanai.com.br/team/yanko-constantinidis.jpg" alt="Yanko Cicely" fill className="object-cover" sizes="64px" />
                  </div>
                  <div>
                    <p className="text-white font-black">Yanko Cicely</p>
                    <p className="text-[#db4100] text-xs font-bold uppercase tracking-wide">Fundador & CEO</p>
                    <p className="text-zinc-500 text-xs">Manáry Digital Growth</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {['Growth Hacking', 'Google Ads', 'Meta Ads', 'SEO', 'Dev Web', 'CRM', 'Analytics'].map(s => (
                    <span key={s} className="text-xs font-semibold text-[#db4100] bg-[#db4100]/10 border border-[#db4100]/20 px-3 py-1.5 rounded-xl">{s}</span>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ─── Steps / CTA ────────────────────────────────────────────────────────────────
function Steps({ onOpenForm }: { onOpenForm: () => void }) {
  const { t } = useLang();
  const s = t.steps;
  return (
    <section className="py-32 bg-white">
      <div className="max-w-5xl mx-auto px-6">
        <Reveal className="text-center mb-16">
          <p className="text-xs font-black text-[#db4100] uppercase tracking-widest mb-3">{s.label}</p>
          <h2 className="text-4xl md:text-5xl font-black text-zinc-900">{s.title}</h2>
        </Reveal>
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {s.items.map(({ n, title, desc }, i) => (
            <Reveal key={n} delay={i * 100}>
              <div className="relative p-8 rounded-3xl border border-zinc-100 hover:border-[#db4100]/20 hover:shadow-xl transition-all group">
                <span className="text-[80px] font-black text-zinc-50 absolute top-4 right-5 select-none group-hover:text-[#db4100]/5 transition-colors">{n}</span>
                <span className="text-xs font-black text-[#db4100] uppercase tracking-widest mb-3 block">{n}</span>
                <h3 className="text-lg font-black text-zinc-900 mb-2">{title}</h3>
                <p className="text-zinc-500 text-sm leading-relaxed">{desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal className="text-center">
          <button onClick={onOpenForm}
            className="inline-flex items-center gap-2 bg-[#db4100] hover:bg-[#c23900] text-white font-black px-12 py-5 rounded-2xl text-lg transition-all shadow-xl shadow-red-900/25 hover:shadow-red-900/40">
            Começar Agora <ArrowRight size={20} />
          </button>
          <p className="text-zinc-400 text-sm mt-4">Diagnóstico gratuito · Sem compromisso · Resposta em 24h</p>
        </Reveal>
      </div>
    </section>
  );
}

// ─── Footer ────────────────────────────────────────────────────────────────────
function Footer({ onOpenForm }: { onOpenForm: () => void }) {
  const { t } = useLang();
  const f = t.footer;
  return (
    <footer className="bg-zinc-950 border-t border-white/5">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl bg-[#db4100] flex items-center justify-center flex-shrink-0">
                <span className="text-white font-black text-base">M</span>
              </div>
              <div>
                <p className="text-white font-black tracking-tight leading-none">MANÁRY</p>
                <p className="text-zinc-500 text-[9px] tracking-widest uppercase">Digital Growth</p>
              </div>
            </div>
            <p className="text-zinc-500 text-sm leading-relaxed">{f.tagline}</p>
            <a href="https://wa.me/5511937750292" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-4 text-xs text-zinc-400 hover:text-[#25D366] transition-colors">
              <Phone size={12} /> (11) 93775-0292
            </a>
            <a href="mailto:comercial@manarydigital.com"
              className="flex items-center gap-2 mt-2 text-xs text-zinc-400 hover:text-white transition-colors">
              <Mail size={12} /> comercial@manarydigital.com
            </a>
          </div>

          {/* Solutions */}
          <div>
            <p className="text-white font-bold text-sm mb-4">{f.links.solutions}</p>
            {['Mídia Paga', 'SEO', 'Dev & Infra Web', 'Automação & CRM', 'Data & Analytics'].map(l => (
              <a key={l} href="#solucoes" className="block text-zinc-500 hover:text-white text-sm mb-2 transition-colors">{l}</a>
            ))}
          </div>

          {/* Plans */}
          <div>
            <p className="text-white font-bold text-sm mb-4">Growth Sob Medida</p>
            {['Manáry Light', 'Manáry Astro', 'Manáry Growth'].map(l => (
              <a key={l} href="#planos" className="block text-zinc-500 hover:text-white text-sm mb-2 transition-colors">{l}</a>
            ))}
            <a href="#cases" className="block text-zinc-500 hover:text-white text-sm mb-2 transition-colors">Cases de Sucesso</a>
          </div>

          {/* Contact */}
          <div>
            <p className="text-white font-bold text-sm mb-4">{f.links.contact}</p>
            <button onClick={onOpenForm}
              className="block w-full text-left text-zinc-500 hover:text-white text-sm mb-2 transition-colors">Fale Conosco</button>
            <a href="https://wa.me/5511937750292" target="_blank" rel="noopener noreferrer"
              className="block text-zinc-500 hover:text-[#25D366] text-sm mb-2 transition-colors">WhatsApp</a>
            <a href="mailto:dev@manarydigital.com" className="block text-zinc-500 hover:text-white text-sm mb-2 transition-colors">Dev / Tech</a>
            <a href="https://app.manarygrowth.com" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-1 mt-3 text-xs text-[#db4100] hover:text-[#f59b3e] font-semibold transition-colors">
              Manáry OS <ArrowUpRight size={11} />
            </a>
          </div>
        </div>

        <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-zinc-600">{f.rights}</p>
          <div className="flex gap-4 text-xs text-zinc-600">
            <a href="/privacidade" className="hover:text-zinc-400 transition-colors">Privacidade</a>
            <a href="/termos" className="hover:text-zinc-400 transition-colors">Termos</a>
          </div>
          <p className="text-xs text-zinc-600">{f.dev}</p>
        </div>
      </div>
    </footer>
  );
}

// ─── Main export ────────────────────────────────────────────────────────────────
export default function ManaryWebsite() {
  const [lang, setLang] = useState<Lang>('pt');
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('manary-lang') as Lang | null;
    if (saved && ['pt', 'en', 'el'].includes(saved)) setLang(saved);
  }, []);

  const handleSetLang = (l: Lang) => { setLang(l); localStorage.setItem('manary-lang', l); };
  const t = T[lang] as TData;

  return (
    <Ctx.Provider value={{ lang, setLang: handleSetLang, t }}>
      <div className="font-sans antialiased">
        <Nav />
        <Hero onOpenForm={() => setShowForm(true)} />
        <ClientsBar />
        <HowWeWork />
        <WhyManary onOpenForm={() => setShowForm(true)} />
        <ForYourMoment onOpenForm={() => setShowForm(true)} />
        <SolutionsGrid />
        <Plans onOpenForm={() => setShowForm(true)} />
        <Cases />
        <Partners />
        <About />
        <Steps onOpenForm={() => setShowForm(true)} />
        <Footer onOpenForm={() => setShowForm(true)} />
        <WhatsAppBtn />
        {showForm && <LeadFormModal onClose={() => setShowForm(false)} />}
      </div>
    </Ctx.Provider>
  );
}
