import * as React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { formatUnits } from '@ethersproject/units'
import { getUTCTimeString } from '@utils/date'
import { Chip, Typography } from '@mui/material'
import { shortenIfAddress, useTransactions } from '@usedapp/core'

const TxStatusBadge = ({ status }: { status: number | undefined }) => {
  switch (status) {
    case 0:
      return <Chip label='Reverted' color='error' />
    case 1:
      return <Chip label='Confirmed' color='success' />
    default:
      return <Chip label='pending' />
  }
}

export default function TransactionInfo() {
  const { transactions } = useTransactions()

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label='transactions table'>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>From</TableCell>
            <TableCell>To</TableCell>
            <TableCell>Submitted At</TableCell>
            <TableCell align='right'>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions.map((transaction) => (
            <TableRow
              key={transaction.transaction.hash}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component='th' scope='row'>
                {transaction.transactionName}
              </TableCell>
              <TableCell>
                {formatUnits(transaction.transaction.value)}
              </TableCell>
              <TableCell component='th' scope='row'>
                {shortenIfAddress(transaction.transaction.from)}
              </TableCell>
              <TableCell component='th' scope='row'>
                {shortenIfAddress(transaction.transaction.to)}
              </TableCell>
              <TableCell>
                {getUTCTimeString(new Date(transaction.submittedAt)) + ' UTC'}
              </TableCell>
              <TableCell align='right'>
                <TxStatusBadge status={transaction.receipt?.status} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {!transactions.length && (
        <Typography textAlign='center' color='text.secondary' py={4}>
          No transactions found
        </Typography>
      )}
    </TableContainer>
  )
}
