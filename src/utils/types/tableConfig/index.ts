import React from 'react'
import {
  Column,
  HeaderGroup,
  Row,
  TableBodyPropGetter,
  TableBodyProps
} from 'react-table'

export type TableActionsType = {
  edit?: boolean
  del?: boolean
  onEdit?: () => void
  onDelete?: () => void
}

export type TableData = {
  readonly [key: string]: string | number
}
export type ToolbarActionType = {
  id: string
  icon: React.FC
  onClick: () => void
  title: string
}
export type TableProps = {
  title: string
  columns: Column<TableData>[]
  data: TableData[]
  checkbox: boolean
  toolbarActions: Array<ToolbarActionType>
}

export type ToolbarType = {
  toolbarActions: Array<ToolbarActionType>
  setGlobalFilter: (object: string) => void
  value: string
  title: string
}

export type TableBodyType = {
  getTableBodyProps: (
    propGetter?: TableBodyPropGetter<TableData> | undefined
  ) => TableBodyProps
  page: Row[]
  prepareRow: (row: Row<TableData>) => void
}

export type TableHeadType = {
  headerGroups: HeaderGroup<TableData>[]
}

export type TableSortPropsType = {
  column: HeaderGroup<TableData>
}
