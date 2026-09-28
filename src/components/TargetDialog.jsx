import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';
import { MdCheckCircle } from 'react-icons/md';

const TargetDialog = ({ open, day, count, onClose }) => (
  <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth aria-labelledby="target-title">
    <DialogContent sx={{ padding: '32px 28px', textAlign: 'center' }}>
      <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-emerald-50 text-accent">
        <MdCheckCircle size={30} aria-hidden="true" />
      </span>
      <h2 id="target-title" className="mt-4 text-[18px] font-bold text-ink">
        Day {day} complete
      </h2>
      <p className="mt-1.5 text-[13px] text-ink-muted">
        All <span className="font-mono font-semibold text-ink">{count}</span> leads in this batch have an outcome
        recorded. Target cleared for today.
      </p>
      <Button onClick={onClose} variant="contained" color="success" fullWidth sx={{ marginTop: '22px', height: 40 }}>
        Continue
      </Button>
    </DialogContent>
  </Dialog>
);

export default TargetDialog;
