import { useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import { DataGrid } from '@mui/x-data-grid';
import { MdSearch, MdRestaurant, MdSelectAll, MdDeselect, MdSave } from 'react-icons/md';

const HEAD = 'rgb(var(--card))';

const FOOD = /restaurant|cafe|coffee|snack|pizza|kebab|sushi|tapas|bar\b|barbecue|pastry|bakery|seafood|fish|grill|food|espresso|diner|bistro|takeaway|take away|canteen|steak|burger|chocolate|ice cream|juice|tea house|brunch|brewpub/i;

const gridSx = {
  backgroundColor: 'rgb(var(--card))',
  border: 'none',
  borderRadius: '22px',
  fontSize: 13,
  '& .MuiDataGrid-columnHeaders': {
    backgroundColor: HEAD,
    borderBottom: 'none',
    '--DataGrid-containerBackground': HEAD,
    '--DataGrid-rowBorderColor': 'rgb(var(--line))',
  },
  '& .MuiDataGrid-columnHeader, & .MuiDataGrid-columnHeaders .MuiDataGrid-filler, & .MuiDataGrid-columnHeaders .MuiDataGrid-scrollbarFiller':
    { backgroundColor: HEAD },
  '& .MuiDataGrid-columnHeaderTitle': { fontWeight: 500, fontSize: 11.5, color: 'rgb(var(--ink-muted))' },
  '& .MuiDataGrid-columnHeaders .MuiDataGrid-sortIcon, & .MuiDataGrid-columnHeaders .MuiDataGrid-iconButtonContainer svg':
    { color: 'rgb(var(--ink-muted))' },
  '& .MuiDataGrid-columnHeader .MuiDataGrid-columnSeparator': { display: 'none' },
  '& .MuiDataGrid-cell': {
    borderColor: 'rgb(var(--line))',
    display: 'flex',
    alignItems: 'center',
    overflow: 'hidden',
    minWidth: 0,
    lineHeight: 1.4,
    paddingLeft: '10px',
    paddingRight: '10px',
  },
  '& .MuiDataGrid-row:hover': { backgroundColor: 'rgb(var(--card-2))' },
  '& .MuiDataGrid-row.off': { backgroundColor: 'rgb(var(--card-2))' },
  '& .MuiDataGrid-row.off .MuiDataGrid-cell:not([data-field="pick"])': { opacity: 0.45 },
  '& .MuiDataGrid-footerContainer': { borderColor: 'rgb(var(--line))', backgroundColor: 'rgb(var(--card-2))' },
};

const TypesPanel = ({ types, loading, saving, onSave }) => {
  const [picked, setPicked] = useState(null);
  const [q, setQ] = useState('');

  const chosen = picked ?? new Set(types.filter((t) => t.enabled).map((t) => t.category));

  const rows = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return types
      .filter((t) => !needle || t.category.toLowerCase().includes(needle))
      .map((t) => ({ id: t.category, ...t, on: chosen.has(t.category) }));
  }, [types, q, chosen]);

  const apply = (next) => setPicked(new Set(next));

  const toggle = (category, on) => {
    const next = new Set(chosen);
    if (on) next.add(category);
    else next.delete(category);
    apply(next);
  };

  const columns = [
    {
      field: 'pick',
      headerName: 'Keep',
      width: 72,
      sortable: false,
      align: 'center',
      headerAlign: 'center',
      renderCell: (p) => (
        <Checkbox
          checked={p.row.on}
          onChange={(e) => toggle(p.row.category, e.target.checked)}
          slotProps={{ input: { 'aria-label': `Keep ${p.row.category}` } }}
          sx={{ padding: '2px', color: 'rgb(var(--ink-faint))', '&.Mui-checked': { color: 'rgb(var(--accent))' } }}
        />
      ),
    },
    {
      field: 'category',
      headerName: 'Type',
      flex: 1,
      minWidth: 200,
      renderCell: (p) => (
        <span className={`block w-full truncate text-[13px] ${p.row.on ? 'font-semibold text-ink' : 'text-ink-muted'}`}>
          {p.row.category}
        </span>
      ),
    },
    {
      field: 'sellable',
      headerName: 'No website',
      width: 112,
      align: 'right',
      headerAlign: 'right',
      renderCell: (p) => (
        <span className={`font-mono text-[12px] ${p.row.sellable ? 'font-semibold text-ok' : 'text-ink-muted'}`}>
          {p.row.sellable}
        </span>
      ),
    },
    {
      field: 'total',
      headerName: 'Total',
      width: 88,
      align: 'right',
      headerAlign: 'right',
      renderCell: (p) => <span className="font-mono text-[12px] text-ink">{p.row.total}</span>,
    },
    {
      field: 'cities',
      headerName: 'Cities',
      minWidth: 170,
      renderCell: (p) => (
        <span className="block w-full truncate text-[12px] text-ink-muted">{(p.row.cities || []).join(', ')}</span>
      ),
    },
  ];

  const keptSellable = types.filter((t) => chosen.has(t.category)).reduce((s, t) => s + t.sellable, 0);
  const dirty = picked !== null;

  if (loading) {
    return (
      <div className="grid place-items-center py-24">
        <CircularProgress size={24} />
      </div>
    );
  }

  return (
    <section className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-[15px] font-bold text-ink">Which types do you work?</h2>
          <p className="text-[12px] text-ink-muted">
            Ticked types stay in the leads list and are what a new city gets scraped for. Everything else is hidden.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="rounded-card border border-line bg-card-2 px-3 py-1.5 font-mono text-[12px] text-ink">
            {chosen.size}/{types.length} types, {keptSellable} sellable
          </span>
          <Button
            onClick={() => onSave([...chosen]).then(() => setPicked(null))}
            variant="contained"
            disabled={!dirty || saving}
            startIcon={<MdSave size={16} />}
            sx={{ height: 38 }}
          >
            {saving ? 'Saving' : 'Save'}
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <TextField
          size="small"
          placeholder="Search a type"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          sx={{
            minWidth: 230,
            '& .MuiInputBase-root': { backgroundColor: 'rgb(var(--card))', height: 38 },
            '& .MuiInputBase-input': { fontSize: 13 },
          }}
          slotProps={{
            input: { startAdornment: <MdSearch size={17} className="mr-2 shrink-0 text-ink-muted" aria-hidden="true" /> },
          }}
        />
        <Button
          onClick={() => apply(types.filter((t) => FOOD.test(t.category)).map((t) => t.category))}
          variant="outlined"
          startIcon={<MdRestaurant size={15} />}
          sx={{ height: 38 }}
        >
          Food places only
        </Button>
        <Button
          onClick={() => apply(types.map((t) => t.category))}
          variant="outlined"
          startIcon={<MdSelectAll size={15} />}
          sx={{ height: 38 }}
        >
          All
        </Button>
        <Button onClick={() => apply([])} variant="outlined" startIcon={<MdDeselect size={15} />} sx={{ height: 38 }}>
          None
        </Button>
      </div>

      <Box className="w-full overflow-x-auto">
        <DataGrid
          rows={rows}
          columns={columns}
          getRowId={(r) => r.id}
          getRowClassName={(p) => (p.row.on ? '' : 'off')}
          rowHeight={46}
          columnHeaderHeight={46}
          initialState={{ pagination: { paginationModel: { pageSize: 100 } } }}
          pageSizeOptions={[25, 50, 100]}
          disableRowSelectionOnClick
          disableColumnMenu
          sx={gridSx}
        />
      </Box>
    </section>
  );
};

export default TypesPanel;
