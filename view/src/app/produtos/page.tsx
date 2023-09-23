"use client";

import React from "react";
import ProductsGrid from "../../../components/ProductsGrid";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";

const columns = [
  { field: "id", filter: true, headerName: "Código do Produto" },
  {
    field: "title",
    filter: true,
    headerName: "Título do Produto",
    editable: true,
    cellEditor: "agTextCellEditor",
  },
  {
    field: "price",
    filter: true,
    headerName: "Preço",
    editable: true,
    cellEditor: "agTextCellEditor",
  },
  { field: "currency_id", filter: true, headerName: "Moeda" },
  {
    field: "available_quantity",
    filter: true,
    headerName: "Quantidade disponível",
    editable: true,
    cellEditor: "agTextCellEditor",
  },
  { field: "sold_quantity", filter: true, headerName: "Quantidade vendida" },
  { field: "listing_type_id", filter: true, headerName: "Tipo do anúncio" },
  { field: "start_time", filter: true, headerName: "Criado em" },
  { field: "expiration_time", filter: true, headerName: "Expira em" },
];

const card = (
  <React.Fragment>
    <CardContent className="w-full">
      <ProductsGrid
        columns={columns}
        searchUrl="https://localhost:5000/produtos/buscar/"
        updateUrl="https://localhost:5000/produtos/atualizar/"
      />
    </CardContent>
  </React.Fragment>
);

export default function ProductsTable() {
  return (
    <div className="w-full">
      <header>
        <div className="flex flex-row mx-auto max-w-8xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="pl-3 text-4xl font-semibold tracking-tight">
            Produtos
          </h1>
        </div>
      </header>
      <main className="pl-10 pr-10">
        <Box className="w-full flex justify-left">
          <Card className="w-full" variant="outlined">
            {card}
          </Card>
        </Box>
      </main>
    </div>
  );
}
