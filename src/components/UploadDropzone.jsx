import { useDropzone } from 'react-dropzone';
import { UploadCloud, FileText, Image as ImageIcon, X } from 'lucide-react';
import { fileSize } from '../utils/format.js';

const ACCEPT = {
  'application/pdf': ['.pdf'],
  'image/jpeg': ['.jpg', '.jpeg'],
  'image/png': ['.png'],
  'image/webp': ['.webp'],
};

const MAX = 15 * 1024 * 1024;

export default function UploadDropzone({ files, setFiles, disabled }) {
  const onDrop = (accepted) => {
    setFiles((prev) => {
      const map = new Map(prev.map((f) => [f.name + f.size, f]));
      accepted.forEach((f) => map.set(f.name + f.size, f));
      return Array.from(map.values()).slice(0, 8);
    });
  };

  const { getRootProps, getInputProps, isDragActive, fileRejections } = useDropzone({
    onDrop,
    accept: ACCEPT,
    maxSize: MAX,
    maxFiles: 8,
    disabled,
  });

  const removeFile = (key) =>
    setFiles((prev) => prev.filter((f) => f.name + f.size !== key));

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={`group relative cursor-pointer overflow-hidden rounded-2xl border-2 border-dashed px-6 py-12 text-center transition-all ${
          isDragActive
            ? 'border-brand-500 bg-brand-50 scale-[1.01]'
            : 'border-slate-300 bg-white hover:border-brand-400 hover:bg-brand-50/40'
        } ${disabled ? 'pointer-events-none opacity-60' : ''}`}
      >
        <input {...getInputProps()} />
        <div className="pointer-events-none flex flex-col items-center gap-3">
          <span
            className={`grid h-16 w-16 place-items-center rounded-2xl transition-transform ${
              isDragActive ? 'scale-110 bg-brand-500 text-white' : 'bg-brand-100 text-brand-600 group-hover:scale-105'
            }`}
          >
            <UploadCloud className="h-8 w-8" />
          </span>
          <div>
            <p className="text-base font-bold text-ink">
              {isDragActive ? 'Drop your documents here' : 'Drag & drop your travel documents'}
            </p>
            <p className="mt-1 text-sm text-slate-500">
              or <span className="font-semibold text-brand-600">browse files</span> — flight & hotel
              tickets, bookings…
            </p>
          </div>
          <p className="text-xs text-slate-400">PDF, JPG, PNG, WEBP · up to 8 files · max 15&nbsp;MB each</p>
        </div>
      </div>

      {fileRejections.length > 0 && (
        <ul className="space-y-1 text-sm text-rose-600">
          {fileRejections.map(({ file, errors }) => (
            <li key={file.name}>
              {file.name}: {errors[0]?.message}
            </li>
          ))}
        </ul>
      )}

      {files.length > 0 && (
        <ul className="grid gap-2 sm:grid-cols-2">
          {files.map((file) => {
            const key = file.name + file.size;
            const isImg = file.type.startsWith('image/');
            const Icon = isImg ? ImageIcon : FileText;
            return (
              <li
                key={key}
                className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-3 py-2.5"
              >
                <span
                  className={`grid h-10 w-10 shrink-0 place-items-center rounded-lg ${
                    isImg ? 'bg-violet-100 text-violet-600' : 'bg-sky-100 text-sky-600'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-ink">{file.name}</p>
                  <p className="text-xs text-slate-400">{fileSize(file.size)}</p>
                </div>
                {!disabled && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFile(key);
                    }}
                    className="rounded-lg p-1.5 text-slate-400 hover:bg-rose-50 hover:text-rose-500"
                    aria-label={`Remove ${file.name}`}
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
