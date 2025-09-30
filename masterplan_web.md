# Masterplan: Municipal Admin Web Dashboard

## 1. Purpose
The web dashboard is for municipal staff to verify, manage, and resolve civic issue reports.

---

## 2. Core Features (MVP)
1. **Authentication & Role-Based Access**
   - Admin, Supervisor, and Staff roles.
   - Secure login (OTP or password).

2. **Issue Management**
   - Reports displayed in list + interactive map (OpenStreetMap/Leaflet).
   - Auto-prioritization based on submission volume & urgency.
   - Admin must verify before assignment.

3. **Assignment Workflow**
   - Hybrid model: system suggests assignment, admin confirms.
   - Assign issues to workers with location + landmarks (no navigation).

4. **Progress Monitoring**
   - Live issue status (new, verified, assigned, in progress, resolved).
   - Workers upload progress photos.
   - Closure requires admin verification of final photo.

5. **Notifications & Timeline**
   - In-app notifications to citizens and staff.
   - Timeline view of all updates per issue.

---

## 3. Extended Features (Future)
- Duplicate detection (auto flag + manual merge).
- Analytics dashboards (heatmaps, trends, resolution rates).
- SLA monitoring (optional for future, not per category).

---

## 4. Technical Considerations
- **Mapping**: Leaflet + OpenStreetMap for interactive city map.
- **Database**: PostgreSQL + PostGIS for geospatial analysis.
- **Image Storage**: Same as mobile (cloud object storage + CDN).
- **Real-Time Updates**: WebSockets for instant sync with mobile app.
- **Performance**: Pagination, filtering, async background workers.

---

## 5. Data Schema (Simplified)
- `report_id`
- `reporter_id`
- `category`
- `location (lat, lon, ward)`
- `status`
- `priority`
- `assigned_worker_id`
- `audit_trail`

---

## 6. Audit Trail
All events logged (report filed, verified, assigned, status changes, closure, citizen confirmation). Immutable logs for accountability.

---

## 7. Conservative Defaults
- Priority score = (# reports in same ward/zone) + (urgency flag if provided).
- Default map view = citywide, with filters by category, status, ward.
- Reports older than 30 days shown as “stale” for review.
