export type Student = {
  Id: number;
  FirstName: string;
  SecondName: string;
  LastName: string;
};

export type Column = {
  Id: number;
  Title: string;
};

export type StudentId = {
  Id?: number;
  Title?: string;
  SchoolboyId: number;
  ColumnId: number;
};

export type StudensResponse = {
  Items: Student[];
};

export type ColumnsResponse = {
  Items: Column[];
  Quantity: number;
};

export type StudentsVisitRate = {
  Items: StudentId[];
};
