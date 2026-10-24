import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { MdCheckCircle } from 'react-icons/md';

const TargetDialog = ({ open, day, count, onClose }) => (
  <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth aria-labelledby="target-title">
    <DialogContent sx={{ padding: '32px 28px', textAlign: 'center' }}>
      <span className="mx-auto grid h-14 w-14 place-items-center rounded-pill bg-ok-soft text-ok">
        <MdCheckCircle size={30} aria-hidden="true" />
      </span>
      <h2 id="target-title" className="mt-4 text-[18px] font-bold text-ink">
        Day {day} complete
      </h2>
      <p className="mt-1.5 text-[13px] text-ink-muted">
        All <span className="font-mono font-semibold text-ink">{count}</span> leads in this batch have an outcome
        recorded. Target cleared for today.
      </p>
      <button
        type="button"
        onClick={onClose}
        className="mt-6 h-12 w-full cursor-pointer rounded-xl bg-accent text-[14px] font-semibold text-accent-ink transition-opacity duration-180 hover:opacity-90"
      >
        Continue
      </button>
    </DialogContent>
  </Dialog>
);

export default TargetDialog;
