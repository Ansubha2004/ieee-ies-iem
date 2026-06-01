function AdminPage({ title, description, actions, content }) {
  return (
    <div className="admin-page">
      {(title || description || actions) && (
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between admin-page-header">
          <div className="min-w-0 flex-1">
            {title && <h1 className="heading">{title}</h1>}
            {description && (
              <div className="paratext">{description}</div>
            )}
          </div>
          {actions && <div className="admin-toolbar shrink-0">{actions}</div>}
        </div>
      )}
      {content}
    </div>
  );
}

export default AdminPage;
