'use client'

import React from 'react';
import CardWithIcon from '../../components/CardWithIcon';
import { faBoxesStacked, faBoxesPacking, faChartColumn, faPersonCircleQuestion, faReceipt } from '@fortawesome/free-solid-svg-icons';

export default function Home() {
  return (
    <div className="w-full">
      <header>
        <div className="flex flex-row mx-auto max-w-8xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="pl-3 text-4xl font-semibold tracking-tight">Início <small>Dashboard</small></h1>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-8xl py-6 px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-10 justify-center">
            <CardWithIcon
              href="/produtos"
              title="Gestão de Portfólio"
              text="Cadastre, altere e acompanhe os produtos do seu portfólio."
              icon={faBoxesStacked}
            />

            <CardWithIcon
              href="/faturamento"
              title="Faturamento"
              text="Acompanhee com precisão as suas receitas e despesas financeiras."
              icon={faReceipt}
            />

            <CardWithIcon
              href="/envios"
              title="Envio"
              text="Monitore e gerencie facilmente o status dos seus envios."
              icon={faBoxesPacking}
            />

            <CardWithIcon
              href="/metricas"
              title="Métricas"
              text="Acesse dados e análises para avaliar o desempenho do seu negócio."
              icon={faChartColumn}
            />

            <CardWithIcon
              href="/perguntas"
              title="Perguntas e Repostas"
              text="Acompanhe e responda às perguntas dos seus compradores."
              icon={faPersonCircleQuestion}
            />

          </div>
        </div>
      </main>
    </div>

  );
}

