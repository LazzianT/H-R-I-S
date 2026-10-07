import path from 'node:path';
import fs from 'node:fs';
import multer from 'multer';
import { config } from '../config/index.js';

const root = path.resolve(config.uploadDir);

/**
 * Padanan hris::upload_document() (khusus jpg, overwrite, max 2MB).
 * subdir: relatif terhadap UPLOAD_DIR, mis. 'hris/Foto'.
 * nameFn: (req) => nama file tanpa ekstensi.
 */
export function jpgUpload(subdir, nameFn) {
  const dir = path.join(root, subdir);
  fs.mkdirSync(dir, { recursive: true });

  const storage = multer.diskStorage({
    destination: (_req, _file, cb) => cb(null, dir),
    filename: (req, file, cb) => cb(null, `${nameFn(req)}.jpg`),
  });

  return multer({
    storage,
    limits: { fileSize: 2 * 1024 * 1024 },
    fileFilter: (_req, file, cb) => {
      const ok = file.mimetype === 'image/jpeg' || /\.jpe?g$/i.test(file.originalname || '');
      cb(ok ? null : new Error('Hanya file JPG diizinkan'), ok);
    },
  }).single(nameFn === undefined ? 'file' : 'file');
}

export const uploadsRoot = root;
