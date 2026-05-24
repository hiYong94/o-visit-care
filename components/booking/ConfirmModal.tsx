type ConfirmModalProps = {
  open: boolean;
  title: string;
  message: string;
  onClose: () => void;
};

export default function ConfirmModal({
  open,
  title,
  message,
  onClose,
}: ConfirmModalProps) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/60"
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-modal-title"
      onClick={onClose}
    >
      <div
        className="mx-4 max-w-[500px] rounded-2xl bg-white p-8 text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 text-5xl text-accent-green" aria-hidden>
          ✓
        </div>
        <h3
          id="confirm-modal-title"
          className="mb-4 text-2xl font-bold text-primary-navy"
        >
          {title}
        </h3>
        <p className="mb-6 leading-relaxed whitespace-pre-line text-text-gray">
          {message}
        </p>
        <button
          type="button"
          onClick={onClose}
          className="min-h-[44px] cursor-pointer rounded-lg bg-primary-blue px-8 py-2 text-lg font-semibold text-white transition-colors hover:bg-primary-navy"
        >
          확인
        </button>
      </div>
    </div>
  );
}
