import React from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnDef,
} from "@tanstack/react-table";
import { StudentId } from "api/apiTypes";

export type ContentData = {
  Title: string;
  id: number;
  Rate?: StudentId[];
};

type TableProps = {
  columns: ColumnDef<ContentData, any>[];
  contentData: ContentData[];
};

export const TableComponent: React.FC<TableProps> = ({
  columns,
  contentData,
}) => {
  const table = useReactTable({
    columns,
    data: contentData,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    // Пункт 8 (b) :Сделать таблицу со скролом и закрепленной шапкой и колонкой детей в горизонтальной плоскости
    // Редко в классе бывает больше 30-40 учеников так что скрола будет достаточно
    <Paper
      sx={{
        width: "100%",
        overflow: "hidden",
      }}
    >
      <TableContainer sx={{ maxHeight: `100vh` }}>
        <Table stickyHeader aria-label="sticky table" className="table">
          <TableHead>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="table_head">
                {headerGroup.headers.map((header) => (
                  <TableCell
                    key={header.id}
                    data-id={header.id}
                    className="table_head_cell"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id} className="table_row">
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    className="table_row_cell"
                    data-cell-name={cell.column.id}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};
