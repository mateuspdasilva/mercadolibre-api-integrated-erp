import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { AddCircleOutline, Edit, Delete, Download } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import MuiTooltip from "@mui/material/Tooltip";
import axios from "axios";
import Grid from "@mui/material/Grid";

interface Props {
  columns: any;
  searchUrl: string;
  updateUrl: string;
}

const ProductsGrid: React.FC<Props> = ({ columns, searchUrl, updateUrl }) => {
  const gridRef = useRef();
  const [rowData, setRowData] = useState();

  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      resizable: true,
      onCellValueChanged: (event: any) => {
        if (event.newValue !== event.oldValue) {
          axios.get(updateUrl, {
            params: {
              productId: event.data.id,
              changedField: event.colDef.field,
              newValue: event.newValue,
            },
          });
        }
        console.log(event);
      },
    }),
    [updateUrl]
  );

  const popupParent = useMemo(() => {
    return document.body;
  }, []);

  const onBtnExport = useCallback(() => {
    gridRef.current.api.exportDataAsCsv();
  }, []);

  useEffect(() => {
    axios.get(searchUrl).then((res) => setRowData(res.data.productData));
  }, [searchUrl]);

  return (
    <>
      <Grid container>
        <Grid item xs={10}>
          <div
            className="flex m-10 justify-start"
            style={{ justifyContent: "flex-start" }}
          >
            <MuiTooltip title={"Adicionar produto"} placement={"top"} arrow>
              <IconButton
                aria-label="add"
                color="primary"
                onClick={onBtnExport}
              >
                <AddCircleOutline />
              </IconButton>
            </MuiTooltip>
            <MuiTooltip title={"Editar produto"} placement={"top"} arrow>
              <IconButton
                aria-label="edit"
                color="primary"
                onClick={onBtnExport}
              >
                <Edit />
              </IconButton>
            </MuiTooltip>
            <MuiTooltip title={"Excluir produto"} placement={"top"} arrow>
              <IconButton
                aria-label="delete"
                color="error"
                onClick={onBtnExport}
              >
                <Delete />
              </IconButton>
            </MuiTooltip>
          </div>
        </Grid>
        <Grid item xs={2}>
          <div
            className="flex m-10 justify-end"
            style={{ justifyContent: "flex-end" }}
          >
            <MuiTooltip title={"Exportar dados"} placement={"top"} arrow>
              <IconButton
                aria-label="export"
                color="primary"
                onClick={onBtnExport}
              >
                <Download />
              </IconButton>
            </MuiTooltip>
          </div>
        </Grid>
      </Grid>
      <div
        className="ag-theme-alpine"
        style={{ width: "100%", height: 500, fontSize: "1rem" }}
      >
        <AgGridReact
          ref={gridRef}
          rowData={rowData}
          columnDefs={columns}
          defaultColDef={defaultColDef}
          animateRows={true}
          rowSelection="multiple"
          suppressExcelExport={true}
          popupParent={popupParent}
        />
      </div>
    </>
  );
};

export default ProductsGrid;
