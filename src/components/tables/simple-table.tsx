"use client";
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";

export default function SimpleTable<T>({ columns, data }: { columns: ColumnDef<T, any>[]; data: T[]; }) {
  const table = useReactTable({ columns, data, getCoreRowModel: getCoreRowModel() });
  return (
    <table className="w-full border rounded">
      <thead>
        {table.getHeaderGroups().map(hg => (
          <tr key={hg.id}>{hg.headers.map(h => (
            <th key={h.id} className="border px-3 py-2 text-left">
              {h.isPlaceholder ? null : flexRender(h.column.columnDef.header, h.getContext())}
            </th>
          ))}</tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map(r => (
          <tr key={r.id}>{r.getVisibleCells().map(c => (
            <td key={c.id} className="border px-3 py-2">
              {flexRender(c.column.columnDef.cell, c.getContext())}
            </td>
          ))}</tr>
        ))}
      </tbody>
    </table>
  );
}