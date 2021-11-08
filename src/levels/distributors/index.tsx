import { FC, useEffect, useMemo } from 'react'
import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'

import { TableData } from 'utils/types/tableConfig'
import DistributorsStore from 'storage/singletons/Distributors'
import Table from 'components/Table'
import TableActions from 'components/Table/components/TableActions'
import { Plus } from 'components/Icons'

const dataS: TableData[] = [
  {
    name: 'John',
    billingId: 'smith',
    customers: 20,
    markup: 10
  },
  {
    name: 'John',
    billingId: 'smith',
    customers: 30,
    markup: 9
  },
  {
    name: 'John',
    billingId: 'smith',
    customers: 10,
    markup: 8
  },
  {
    name: 'John',
    billingId: 'smith',
    customers: 40,
    markup: 7
  },
  {
    name: 'John',
    billingId: 'smith',
    customers: 90,
    markup: 5
  }
]

const columnsData = [
  {
    Header: 'Name',
    accessor: 'name'
  },
  {
    Header: 'Billing ID',
    accessor: 'billingId'
  },
  {
    Header: 'Customers',
    accessor: 'customers'
  },
  {
    Header: 'Markup, %',
    accessor: 'markup'
  },
  {
    Header: 'Actions',
    accessor: 'actions',
    disableSortBy: true,
    Cell: () => <TableActions edit del />
  }
]

const Distributors: FC = () => {
  const { t } = useTranslation()
  const { getDistributorsData } = DistributorsStore

  useEffect(() => {
    getDistributorsData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const columns = useMemo(() => columnsData, [])
  const data = useMemo(() => dataS, [])
  const toolbarActions = [
    {
      id: 'add',
      title: 'Add',
      icon: Plus,
      onClick: () => {
        console.log('add all')
      }
    }
  ]

  return (
    <Table
      title={t('Distributors')}
      columns={columns}
      data={data}
      toolbarActions={toolbarActions}
      checkbox
    />
  )
}

export default observer(Distributors)
