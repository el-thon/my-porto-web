'use client';

import { X } from 'lucide-react';
import { useId, useRef, useState } from 'react';

type MultiImageInputProps = {
  label: string;
  name?: string;
};

function fileKey(file: File) {
  return `${file.name}-${file.size}-${file.lastModified}`;
}

export function MultiImageInput({ label, name = 'images' }: MultiImageInputProps) {
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<File[]>([]);

  function syncFiles(nextFiles: File[]) {
    const input = inputRef.current;
    if (!input) return;

    const transfer = new DataTransfer();
    nextFiles.forEach((file) => transfer.items.add(file));
    input.files = transfer.files;
  }

  function updateFiles(nextFiles: File[]) {
    setFiles(nextFiles);
    syncFiles(nextFiles);
  }

  function addFiles(selectedFiles: FileList | null) {
    if (!selectedFiles?.length) return;

    const nextFiles = [...files];
    const existingKeys = new Set(nextFiles.map(fileKey));

    Array.from(selectedFiles).forEach((file) => {
      if (!file.type.startsWith('image/')) return;

      const key = fileKey(file);
      if (!existingKeys.has(key)) {
        existingKeys.add(key);
        nextFiles.push(file);
      }
    });

    updateFiles(nextFiles);
  }

  function removeFile(key: string) {
    updateFiles(files.filter((file) => fileKey(file) !== key));
  }

  return (
    <div className="file-field multi-image-field">
      <label htmlFor={inputId}>{label}</label>
      <input
        id={inputId}
        ref={inputRef}
        name={name}
        type="file"
        accept="image/*"
        multiple
        onChange={(event) => addFiles(event.currentTarget.files)}
      />
      {files.length ? (
        <div className="selected-files" aria-live="polite">
          <strong>{files.length} image{files.length > 1 ? 's' : ''} selected</strong>
          <ul>
            {files.map((file) => {
              const key = fileKey(file);

              return (
                <li key={key}>
                  <span>{file.name}</span>
                  <button type="button" aria-label={`Remove ${file.name}`} onClick={() => removeFile(key)}>
                    <X size={14} />
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
