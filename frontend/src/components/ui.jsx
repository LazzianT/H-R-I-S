import { Link } from 'react-router-dom';

/**
 * Header halaman. Tanpa kicker/eyebrow: judul membawa bobotnya sendiri.
 * subjudul opsional hanya untuk satu baris konteks yang benar-benar menambah informasi.
 */
export function Page({ title, subtitle, actions, children }) {
  return (
    <div>
      <div className="page-head">
        <div>
          <h1>{title}</h1>
          {subtitle && <p className="sub">{subtitle}</p>}
        </div>
        {actions && <div className="row" style={{ alignItems: 'center' }}>{actions}</div>}
      </div>
      {children}
    </div>
  );
}

export function Card({ children, title, actions, className = '' }) {
  return (
    <section className={`card ${className}`}>
      {(title || actions) && (
        <div className="card-head">
          {title ? <h4>{title}</h4> : <span />}
          {actions}
        </div>
      )}
      {children}
    </section>
  );
}

export function Field({ label, children }) {
  return (
    <div className="field">
      {label && <label>{label}</label>}
      {children}
    </div>
  );
}

/** Tabel data: angka tabular, scroll horizontal aman, empty state bermakna. */
export function DataTable({ columns, rows, empty, emptyHint }) {
  if (!rows?.length) {
    return (
      <div className="empty">
        <b>{empty || 'Tidak ada data untuk ditampilkan'}</b>
        {emptyHint || 'Ubah filter atau tambahkan data untuk melihat isinya di sini.'}
      </div>
    );
  }
  return (
    <div className="grid-wrap">
      <table className="dtable">
        <thead>
          <tr>{columns.map((c) => <th key={c.key}>{c.label}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              {columns.map((c) => (
                <td key={c.key}>{c.render ? c.render(r) : r[c.key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function LinkButton({ to, children, variant = '' }) {
  return <Link className={`btn ${variant}`} to={to}>{children}</Link>;
}
