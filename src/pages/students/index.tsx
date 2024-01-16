import React, { useCallback, useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { selectTableColumns } from "../../store/table/tableSlice";
import {
  addStudentRateValue,
  fetchColumns,
  fetchStudentsData,
  removeStudentRateValue,
} from "../../store/table/tableThunk";
import { TableComponent } from "components/TableComponent";
import { selectStudentsData } from "store/table/studentSlice";
import { createColumnHelper } from "@tanstack/react-table";
import { StudentId } from "api/apiTypes";
import CircularIndeterminate from "components/Loader";
import { ButtonComponent } from "components/Button";

export type ColumnItem = {
  id: string | number;
  Title: string | number;
  Rate: StudentId[];
};

const columnHelper = createColumnHelper<ColumnItem>();

const initalcolumnsData = [
  columnHelper.accessor((_, index) => index + 1, {
    id: "Id",
    cell: (info) => info.getValue(),
    header: "№",
  }),
  columnHelper.accessor((originalRow) => originalRow?.Title, {
    id: "Title",
    cell: (info) => info.getValue(),
    header: "Учень",
  }),
];

function Students() {
  const columnsData = useAppSelector(selectTableColumns);
  const studentsData = useAppSelector(selectStudentsData);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!columnsData) {
      dispatch(fetchColumns());
      dispatch(fetchStudentsData());
    }
  }, [columnsData, dispatch]);

  const onButtonChange = useCallback((studentRate: StudentId) => {
    if (!studentRate.Id) {
      dispatch(addStudentRateValue(studentRate));
    } else {
      dispatch(removeStudentRateValue(studentRate));
    }
  }, []);

  const columns = useMemo(() => {
    if (columnsData) {
      let columns = columnsData.Items.map(({ Id, Title }) => {
        return { Header: Title, accessor: Id };
      });

      const columnsTableData = columns.map(({ Header, accessor }) => {
        return columnHelper.accessor(() => accessor, {
          id: `${accessor}`,
          cell: (info) => {
            const value = info.row.original.Rate.find(
              ({ ColumnId }) => ColumnId === accessor
            );
            const studentRate = {
              SchoolboyId: Number(info.row.original.id),
              ColumnId: accessor,
              ...(!value?.Title && { Title: "H" }),
              ...(value?.Id && { Id: Number(value?.Id) }),
            };

            return (
              <ButtonComponent
                onButtonChange={() => onButtonChange(studentRate)}
              >
                {value?.Title ? value?.Title : ""}
              </ButtonComponent>
            );
          },
          header: Header,
        });
      });

      return [...initalcolumnsData, ...columnsTableData];
    }
    return columnsData;
  }, [columnsData, onButtonChange]);

  if (columns && studentsData) {
    return <TableComponent columns={columns} contentData={studentsData} />;
  }
  return <CircularIndeterminate />;
}

export default Students;
