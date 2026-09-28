import { useMemo } from 'react';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import { DataGrid } from '@mui/x-data-grid';
import { MdOpenInNew, MdCall, MdStar, MdLock } from 'react-icons/md';
import { FaWhatsapp } from 'react-icons/fa6';
import OutcomeChecks from './OutcomeChecks';
import { siteHref, siteLabel, telLink, waLink } from '../lib/format';

const BLUE = '#2563EB';

const gridSx = {
  backgroundColor: '#FFFFFF',
  border: '1px solid #E4ECFC',
  borderRadius: '10px',
  fontSize: 13,
  '& .MuiDataGrid-columnHeaders': {
    backgroundColor: BLUE,
    borderBottom: 'none',
    '--DataGrid-containerBackground': BLUE,
    '--DataGrid-rowBorderColor': BLUE,
  },
  '& .MuiDataGrid-columnHeader, & .MuiDataGrid-columnHeaders .MuiDataGrid-filler, & .MuiDataGrid-columnHeaders .MuiDataGrid-scrollbarFiller':
    { backgroundColor: BLUE },
  '& .MuiDataGrid-columnHeader:focus, & .MuiDataGrid-columnHeader:focus-within': { outlineOffset: '-2px' },
  '& .MuiDataGrid-columnHeaderTitle': { fontWeight: 700, fontSize: 12, color: '#FFFFFF' },
  '& .MuiDataGrid-columnHeaders .MuiDataGrid-sortIcon, & .MuiDataGrid-columnHeaders .MuiDataGrid-menuIcon svg, & .MuiDataGrid-columnHeaders .MuiDataGrid-iconButtonContainer svg':
    { color: '#FFFFFF' },
  '& .MuiDataGrid-columnHeaderCheckbox .MuiCheckbox-root': { color: '#FFFFFF' },
  '& .MuiDataGrid-columnHeader .MuiDataGrid-columnSeparator': { color: 'rgba(255,255,255,0.28)' },
  '& .MuiDataGrid-cell': {
    borderColor: '#E4ECFC',
    display: 'flex',
    alignItems: 'center',
    overflow: 'hidden',
    minWidth: 0,
    lineHeight: 1.4,
    paddingLeft: '10px',
    paddingRight: '10px',
  },
  '& .MuiDataGrid-row:hover': { backgroundColor: '#F8FAFC' },
  '& .MuiDataGrid-row.locked': { backgroundColor: '#FBFCFE' },
  '& .MuiDataGrid-row.locked .lock-zone': { opacity: 0.45, cursor: 'not-allowed' },
  '& .MuiDataGrid-footerContainer': { borderColor: '#E4ECFC', backgroundColor: '#F8FAFC' },
  '& .MuiDataGrid-checkboxInput.Mui-checked': { color: BLUE },
  '& .MuiDataGrid-row.Mui-selected': { backgroundColor: '#EFF5FF' },
  '& .MuiDataGrid-row.Mui-selected:hover': { backgroundColor: '#E6EEFE' },
};

const LeadsGrid = ({ rows, loading, total, page, pageSize, onPaginationChange, onOutcomeToggle, savingId }) => {
  const columns = useMemo(
    () => [
      {
        field: 'serial',
        headerName: '#',
        width: 46,
        sortable: false,
        renderCell: (p) => <span className="font-mono text-[12px] text-ink-muted">{p.row.serial}</span>,
      },
      {
        field: 'name',
        headerName: 'Restaurant',
        flex: 1.3,
        minWidth: 190,
        renderCell: (p) => (
          <div className="flex w-full min-w-0 flex-col justify-center gap-0.5 overflow-hidden">
            <span className="block truncate text-[13px] font-semibold leading-tight text-ink">{p.row.name}</span>
            <span className="block truncate text-[11px] leading-tight text-ink-muted">
              {p.row.address || 'No address'}
            </span>
          </div>
        ),
      },
      {
        field: 'phone',
        headerName: 'Phone',
        width: 198,
        renderCell: (p) => {
          if (!p.row.phone) return <span className="text-[12px] text-ink-muted">No phone</span>;
          return (
            <div className="flex w-full min-w-0 items-center gap-1">
              <span className="block truncate font-mono text-[12px] text-ink">{p.row.phone}</span>
              <Tooltip title="Call">
                <a
                  href={telLink(p.row.phone)}
                  className="grid h-6 w-6 shrink-0 cursor-pointer place-items-center rounded-md border border-line text-primary transition-colors duration-200 hover:bg-surface-muted"
                  aria-label={`Call ${p.row.name}`}
                >
                  <MdCall size={13} />
                </a>
              </Tooltip>
              <Tooltip title="WhatsApp">
                <a
                  href={waLink(p.row.phone)}
                  target="_blank"
                  rel="noreferrer"
                  className="grid h-6 w-6 shrink-0 cursor-pointer place-items-center rounded-md border border-line text-accent transition-colors duration-200 hover:bg-surface-muted"
                  aria-label={`WhatsApp ${p.row.name}`}
                >
                  <FaWhatsapp size={13} />
                </a>
              </Tooltip>
            </div>
          );
        },
      },
      {
        field: 'website',
        headerName: 'Website',
        width: 140,
        renderCell: (p) =>
          p.row.hasWebsite ? (
            <a
              href={siteHref(p.row.website)}
              target="_blank"
              rel="noreferrer"
              className="flex w-full min-w-0 cursor-pointer items-center gap-1 overflow-hidden text-[12px] font-medium text-primary hover:underline"
            >
              <span className="block truncate">{siteLabel(p.row.website)}</span>
              <MdOpenInNew size={13} className="shrink-0" aria-hidden="true" />
            </a>
          ) : (
            <span className="inline-flex shrink-0 items-center rounded-full border border-emerald-200 bg-emerald-50 px-2 py-1 text-[11px] font-semibold leading-none text-accent">
              No website
            </span>
          ),
      },
      {
        field: 'category',
        headerName: 'Type',
        width: 112,
        renderCell: (p) => (
          <span className="block w-full min-w-0 truncate text-[12px] text-ink-muted">{p.row.category || '-'}</span>
        ),
      },
      {
        field: 'reviewCount',
        headerName: 'Reviews',
        width: 78,
        align: 'right',
        headerAlign: 'right',
        renderCell: (p) => <span className="font-mono text-[12px] text-ink">{p.row.reviewCount}</span>,
      },
      {
        field: 'rating',
        headerName: 'Rating',
        width: 70,
        align: 'right',
        headerAlign: 'right',
        renderCell: (p) =>
          p.row.rating ? (
            <span className="inline-flex items-center gap-0.5 font-mono text-[12px] text-ink">
              <MdStar size={13} className="text-amber-500" aria-hidden="true" />
              {p.row.rating.toFixed(1)}
            </span>
          ) : (
            <span className="text-[12px] text-ink-muted">-</span>
          ),
      },
      {
        field: 'outcomes',
        headerName: 'Call outcome (tick all that happened)',
        width: 434,
        sortable: false,
        renderCell: (p) => (
          <div className="lock-zone w-full">
            {p.row.hasWebsite ? (
              <span className="flex items-center gap-1.5 text-[11px] text-ink-muted">
                <MdLock size={14} aria-hidden="true" />
                Already has a website
              </span>
            ) : (
              <OutcomeChecks
                selected={p.row.outcomes}
                busy={savingId === p.row.id}
                rowName={p.row.name}
                onToggle={(value, on) => onOutcomeToggle(p.row.id, value, on)}
              />
            )}
          </div>
        ),
      },
    ],
    [onOutcomeToggle, savingId]
  );

  return (
    <Box className="w-full overflow-x-auto">
      <DataGrid
        rows={rows}
        columns={columns}
        loading={loading}
        rowCount={total}
        paginationMode="server"
        paginationModel={{ page: page - 1, pageSize }}
        onPaginationModelChange={(m) => onPaginationChange(m.page + 1, m.pageSize)}
        pageSizeOptions={[25, 50, 100]}
        getRowId={(r) => r.id}
        getRowClassName={(p) => (p.row.hasWebsite ? 'locked' : '')}
        rowHeight={58}
        columnHeaderHeight={46}
        checkboxSelection
        disableRowSelectionOnClick
        disableColumnMenu
        sx={gridSx}
      />
    </Box>
  );
};

export default LeadsGrid;
