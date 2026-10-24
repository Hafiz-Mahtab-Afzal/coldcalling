import { useMemo } from 'react';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import { DataGrid } from '@mui/x-data-grid';
import { MdOpenInNew, MdCall, MdStar, MdLock, MdPlace } from 'react-icons/md';
import { FaWhatsapp } from 'react-icons/fa6';
import OutcomeChecks from './OutcomeChecks';
import { isDead } from '../lib/outcomes';
import { mapsHref, num, siteHref, siteLabel, telLink, waLink } from '../lib/format';

const SURFACE = 'rgb(var(--card))';

const gridSx = {
  backgroundColor: SURFACE,
  border: 'none',
  borderRadius: '22px',
  fontSize: 13,
  fontFamily: "'DM Sans', ui-sans-serif, system-ui, sans-serif",
  color: 'rgb(var(--ink))',
  '--DataGrid-containerBackground': SURFACE,
  '--DataGrid-rowBorderColor': 'rgb(var(--line))',
  '& .MuiDataGrid-columnHeaders': { borderBottom: '1px solid rgb(var(--line))' },
  '& .MuiDataGrid-columnHeader': { backgroundColor: SURFACE },
  '& .MuiDataGrid-columnHeaders .MuiDataGrid-filler': { backgroundColor: SURFACE },
  '& .MuiDataGrid-columnHeaders .MuiDataGrid-scrollbarFiller': { backgroundColor: SURFACE },
  '& .MuiDataGrid-columnHeader:focus': { outlineOffset: '-2px' },
  '& .MuiDataGrid-columnHeader:focus-within': { outlineOffset: '-2px' },
  '& .MuiDataGrid-columnHeaderTitle': {
    fontWeight: 500,
    fontSize: 11.5,
    color: 'rgb(var(--ink-muted))',
  },
  '& .MuiDataGrid-columnHeaders .MuiDataGrid-sortIcon': { color: 'rgb(var(--ink-faint))' },
  '& .MuiDataGrid-columnHeaders .MuiDataGrid-menuIcon svg': { color: 'rgb(var(--ink-faint))' },
  '& .MuiDataGrid-columnHeaders .MuiDataGrid-iconButtonContainer svg': { color: 'rgb(var(--ink-faint))' },
  '& .MuiDataGrid-columnHeaderCheckbox .MuiCheckbox-root': { color: 'rgb(var(--ink-faint))' },
  '& .MuiDataGrid-columnHeaderCheckbox .MuiCheckbox-root.Mui-checked': { color: 'rgb(var(--accent))' },
  '& .MuiDataGrid-columnHeader .MuiDataGrid-columnSeparator': { display: 'none' },
  '& .MuiDataGrid-cell': {
    borderColor: 'rgb(var(--line))',
    display: 'flex',
    alignItems: 'center',
    overflow: 'hidden',
    minWidth: 0,
    lineHeight: 1.4,
    paddingLeft: '14px',
    paddingRight: '14px',
  },
  '& .MuiDataGrid-cell:focus': { outlineOffset: '-2px' },
  '& .MuiDataGrid-cell:focus-within': { outlineOffset: '-2px' },
  '& .MuiDataGrid-row:hover': { backgroundColor: 'rgb(var(--card-2))' },
  '& .MuiDataGrid-row.locked': { backgroundColor: 'rgb(var(--card-2) / 0.55)' },
  '& .MuiDataGrid-row.locked .lock-zone': { opacity: 0.5, cursor: 'not-allowed' },
  '& .MuiDataGrid-row.dead': { backgroundColor: 'rgb(var(--card-2))' },
  '& .MuiDataGrid-row.dead .MuiDataGrid-cell:not([data-field="outcomes"])': { opacity: 0.42 },
  '& .MuiDataGrid-row.dead:hover': { backgroundColor: 'rgb(var(--line))' },
  '& .MuiDataGrid-footerContainer': {
    borderTop: '1px solid rgb(var(--line))',
    backgroundColor: SURFACE,
    minHeight: 52,
  },
  '& .MuiTablePagination-root': { color: 'rgb(var(--ink-muted))', fontSize: 12.5 },
  '& .MuiTablePagination-selectLabel': { color: 'rgb(var(--ink-muted))', fontSize: 12.5 },
  '& .MuiTablePagination-displayedRows': { color: 'rgb(var(--ink-muted))', fontSize: 12.5 },
  '& .MuiDataGrid-checkboxInput': { color: 'rgb(var(--ink-faint))' },
  '& .MuiDataGrid-checkboxInput.Mui-checked': { color: 'rgb(var(--accent))' },
  '& .MuiDataGrid-row.Mui-selected': { backgroundColor: 'rgb(var(--accent-soft))' },
  '& .MuiDataGrid-row.Mui-selected:hover': { backgroundColor: 'rgb(var(--accent) / 0.16)' },
  '& .MuiDataGrid-overlay': { backgroundColor: SURFACE, color: 'rgb(var(--ink-muted))' },
};

const iconLink =
  'grid h-7 w-7 shrink-0 cursor-pointer place-items-center rounded-lg border border-line bg-card transition-colors duration-180 hover:border-line-strong';

const LeadsGrid = ({ rows, loading, total, page, pageSize, onPaginationChange, onOutcomeToggle, savingId }) => {
  const columns = useMemo(
    () => [
      {
        field: 'serial',
        headerName: '#',
        width: 50,
        sortable: false,
        renderCell: (p) => <span className="font-mono text-[12px] text-ink-faint">{p.row.serial}</span>,
      },
      {
        field: 'name',
        headerName: 'Restaurant',
        flex: 1.3,
        minWidth: 190,
        renderCell: (p) => (
          <Tooltip title="Open in Google Maps" placement="top-start">
            <a
              href={mapsHref(p.row)}
              target="_blank"
              rel="noreferrer"
              className="group flex w-full min-w-0 cursor-pointer flex-col justify-center gap-0.5 overflow-hidden"
            >
              <span className="flex min-w-0 items-center gap-1">
                <span className="block truncate text-[13px] font-semibold leading-tight text-ink group-hover:text-accent">
                  {p.row.name}
                </span>
                <MdPlace size={13} className="shrink-0 text-ink-faint group-hover:text-accent" aria-hidden="true" />
              </span>
              <span className="block truncate text-[11px] leading-tight text-ink-muted">
                {p.row.address || 'No address'}
              </span>
            </a>
          </Tooltip>
        ),
      },
      {
        field: 'phone',
        headerName: 'Phone',
        width: 198,
        renderCell: (p) => {
          if (!p.row.phone) return <span className="text-[12px] text-ink-faint">No phone</span>;
          return (
            <div className="flex w-full min-w-0 items-center gap-1.5">
              <span className="block truncate font-mono text-[12px] text-ink">{p.row.phone}</span>
              <Tooltip title="Call">
                <a href={telLink(p.row.phone)} className={`${iconLink} text-accent`} aria-label={`Call ${p.row.name}`}>
                  <MdCall size={14} />
                </a>
              </Tooltip>
              <Tooltip title="WhatsApp">
                <a
                  href={waLink(p.row.phone)}
                  target="_blank"
                  rel="noreferrer"
                  className={`${iconLink} text-ok`}
                  aria-label={`WhatsApp ${p.row.name}`}
                >
                  <FaWhatsapp size={14} />
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
              className="flex w-full min-w-0 cursor-pointer items-center gap-1 overflow-hidden text-[12px] font-medium text-accent hover:underline"
            >
              <span className="block truncate">{siteLabel(p.row.website)}</span>
              <MdOpenInNew size={13} className="shrink-0" aria-hidden="true" />
            </a>
          ) : (
            <span className="inline-flex shrink-0 items-center rounded-pill border border-ok/25 bg-ok-soft px-2.5 py-1 text-[11px] font-semibold leading-none text-ok-ink">
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
        width: 80,
        align: 'right',
        headerAlign: 'right',
        renderCell: (p) => <span className="tabular text-[12px] text-ink">{num(p.row.reviewCount)}</span>,
      },
      {
        field: 'rating',
        headerName: 'Rating',
        width: 74,
        align: 'right',
        headerAlign: 'right',
        renderCell: (p) =>
          p.row.rating ? (
            <span className="inline-flex items-center gap-0.5 font-mono text-[12px] text-ink">
              <MdStar size={13} className="text-warn" aria-hidden="true" />
              {p.row.rating.toFixed(1)}
            </span>
          ) : (
            <span className="text-[12px] text-ink-faint">-</span>
          ),
      },
      {
        field: 'neighbour',
        headerName: 'Nearby place that has a site',
        width: 206,
        sortable: false,
        renderCell: (p) => {
          const n = p.row.neighbour;
          if (p.row.hasWebsite) return <span className="text-[12px] text-ink-faint">-</span>;
          if (!n || !n.name) return <span className="text-[11px] text-ink-faint">None within 1 km</span>;
          return (
            <Tooltip title={`${n.category || 'Place'}, ${n.distanceM} m away. Open in Maps`} placement="top-start">
              <a
                href={n.mapsUrl || mapsHref({ name: n.name })}
                target="_blank"
                rel="noreferrer"
                className="group flex w-full min-w-0 cursor-pointer flex-col justify-center gap-0.5 overflow-hidden"
              >
                <span className="block truncate text-[12px] font-medium leading-tight text-ink group-hover:text-accent">
                  {n.name}
                </span>
                <span className="flex items-center gap-1 text-[11px] leading-tight text-ink-muted">
                  <MdPlace size={11} aria-hidden="true" />
                  {n.distanceM} m
                </span>
              </a>
            </Tooltip>
          );
        },
      },
      {
        field: 'neighbourSite',
        headerName: 'Site',
        width: 64,
        sortable: false,
        align: 'center',
        headerAlign: 'center',
        renderCell: (p) => {
          const n = p.row.neighbour;
          if (p.row.hasWebsite || !n || !n.website) return null;
          return (
            <Tooltip title={`Open ${siteLabel(n.website)}`} placement="top">
              <a
                href={siteHref(n.website)}
                target="_blank"
                rel="noreferrer"
                className={`${iconLink} h-8 w-8 text-accent`}
                aria-label={`Open the website of ${n.name}`}
              >
                <MdOpenInNew size={14} />
              </a>
            </Tooltip>
          );
        },
      },
      {
        field: 'outcomes',
        headerName: 'Call outcome (tick all that happened)',
        width: 492,
        sortable: false,
        renderCell: (p) => (
          <div className="lock-zone w-full">
            {p.row.hasWebsite ? (
              <span className="flex items-center gap-1.5 text-[11px] text-ink-faint">
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
    <Box className="w-full overflow-hidden rounded-tile bg-card shadow-card">
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
        getRowClassName={(p) => {
          if (p.row.hasWebsite) return 'locked';
          return isDead(p.row.outcomes) ? 'dead' : '';
        }}
        rowHeight={92}
        columnHeaderHeight={48}
        checkboxSelection
        disableRowSelectionOnClick
        disableColumnMenu
        sx={gridSx}
      />
    </Box>
  );
};

export default LeadsGrid;
