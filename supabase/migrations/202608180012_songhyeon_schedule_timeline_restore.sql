-- Restore the reviewed 15-period G0 -> G6 milestone chronology.
--
-- The canonical schedule-row migration originally copied provisional dates
-- from the integrated task board. Those task dates are not milestone dates and
-- collapsed later stages (including G5/G6) into August. Schedule rows and
-- integrated tasks are independent ledgers, so this restoration only updates
-- the 76 original milestone leaf rows. Manually added SCHEDULE-* rows and all
-- songhyeon_tasks rows remain untouched.

with reviewed_timeline(source_key, start_date, end_date) as (
  values
    ('G0-WS01-T01', date '2026-08-10', date '2026-08-16'),
    ('G0-WS01-T02', date '2026-08-17', date '2026-08-23'),
    ('G0-WS01-T03', date '2026-08-17', date '2026-08-23'),
    ('G0-WS01-T04', date '2026-08-24', date '2026-08-31'),
    ('G0-WS01-T05', date '2026-08-24', date '2026-08-31'),
    ('G0-WS02-T01', date '2026-08-10', date '2026-08-23'),
    ('G0-WS02-T02', date '2026-08-17', date '2026-08-31'),
    ('G0-WS02-T03', date '2026-08-17', date '2026-08-31'),
    ('G0-WS02-T04', date '2026-08-24', date '2026-08-31'),
    ('G0-WS02-T05', date '2026-08-24', date '2026-08-31'),
    ('G0-WS03-T01', date '2026-08-10', date '2026-08-16'),
    ('G0-WS03-T02', date '2026-08-17', date '2026-08-23'),
    ('G0-WS03-T03', date '2026-08-24', date '2026-08-31'),
    ('G1-WS01-T01', date '2026-08-24', date '2026-08-31'),
    ('G1-WS01-T02', date '2026-08-24', date '2026-08-31'),
    ('G1-WS01-T03', date '2026-08-24', date '2026-08-31'),
    ('G1-WS01-T04', date '2026-09-01', date '2026-09-07'),
    ('G1-WS01-T05', date '2026-09-01', date '2026-09-07'),
    ('G1-WS01-T06', date '2026-09-01', date '2026-09-07'),
    ('G1-WS01-T07', date '2026-09-01', date '2026-09-07'),
    ('G1-WS02-T01', date '2026-08-24', date '2026-09-07'),
    ('G1-WS02-T02', date '2026-09-01', date '2026-09-07'),
    ('G1-WS02-T03', date '2026-09-01', date '2026-09-07'),
    ('G1-WS03-T01', date '2026-08-24', date '2026-08-31'),
    ('G1-WS03-T02', date '2026-09-01', date '2026-09-07'),
    ('G1-WS03-T03', date '2026-09-01', date '2026-09-07'),
    ('G2-WS01-T01', date '2026-09-08', date '2026-09-14'),
    ('G2-WS01-T02', date '2026-09-08', date '2026-09-14'),
    ('G2-WS01-T03', date '2026-09-08', date '2026-09-14'),
    ('G2-WS01-T04', date '2026-09-15', date '2026-09-21'),
    ('G2-WS01-T05', date '2026-09-15', date '2026-09-21'),
    ('G2-WS01-T06', date '2026-09-15', date '2026-09-21'),
    ('G2-WS02-T01', date '2026-09-08', date '2026-09-21'),
    ('G2-WS02-T02', date '2026-09-15', date '2026-09-21'),
    ('G2-WS02-T03', date '2026-09-15', date '2026-09-21'),
    ('G2-WS03-T01', date '2026-09-08', date '2026-09-14'),
    ('G2-WS03-T02', date '2026-09-15', date '2026-09-21'),
    ('G3-WS01-T01', date '2026-09-22', date '2026-09-30'),
    ('G3-WS01-T02', date '2026-10-01', date '2026-10-07'),
    ('G3-WS01-T03', date '2026-10-01', date '2026-10-07'),
    ('G3-WS01-T04', date '2026-10-08', date '2026-10-14'),
    ('G3-WS01-T05', date '2026-10-08', date '2026-10-14'),
    ('G3-WS02-T01', date '2026-09-22', date '2026-10-07'),
    ('G3-WS02-T02', date '2026-10-08', date '2026-10-14'),
    ('G3-WS03-T01', date '2026-09-22', date '2026-09-30'),
    ('G3-WS03-T02', date '2026-10-01', date '2026-10-07'),
    ('G3-WS03-T03', date '2026-10-01', date '2026-10-07'),
    ('G3-WS03-T04', date '2026-10-08', date '2026-10-14'),
    ('G3-WS04-T01', date '2026-09-22', date '2026-10-07'),
    ('G3-WS04-T02', date '2026-10-01', date '2026-10-14'),
    ('G3-WS04-T03', date '2026-10-08', date '2026-10-14'),
    ('G4-WS01-T01', date '2026-10-15', date '2026-10-21'),
    ('G4-WS01-T02', date '2026-10-15', date '2026-10-21'),
    ('G4-WS01-T03', date '2026-10-22', date '2026-10-31'),
    ('G4-WS01-T04', date '2026-10-22', date '2026-10-31'),
    ('G4-WS02-T01', date '2026-10-15', date '2026-10-31'),
    ('G4-WS02-T02', date '2026-10-15', date '2026-10-31'),
    ('G4-WS02-T03', date '2026-10-22', date '2026-10-31'),
    ('G4-WS02-T04', date '2026-10-22', date '2026-10-31'),
    ('G4-WS03-T01', date '2026-10-15', date '2026-10-21'),
    ('G4-WS03-T02', date '2026-10-22', date '2026-10-31'),
    ('G4-WS03-T03', date '2026-10-22', date '2026-10-31'),
    ('G5-WS01-T01', date '2026-11-01', date '2026-11-07'),
    ('G5-WS01-T02', date '2026-11-08', date '2026-11-14'),
    ('G5-WS01-T03', date '2026-11-08', date '2026-11-14'),
    ('G5-WS02-T01', date '2026-11-01', date '2026-11-14'),
    ('G5-WS03-T01', date '2026-11-01', date '2026-11-14'),
    ('G5-WS04-T01', date '2026-11-01', date '2026-11-14'),
    ('G6-WS01-T01', date '2026-11-15', date '2026-11-21'),
    ('G6-WS01-T02', date '2026-11-15', date '2026-11-21'),
    ('G6-WS01-T03', date '2026-11-15', date '2026-11-21'),
    ('G6-WS01-T04', date '2026-11-15', date '2026-11-21'),
    ('G6-WS01-T05', date '2026-11-22', date '2026-11-30'),
    ('G6-WS01-T06', date '2026-11-22', date '2026-11-30'),
    ('G6-WS01-T07', date '2026-11-22', date '2026-11-30'),
    ('G6-WS01-T08', date '2026-11-22', date '2026-11-30')
)
update public.songhyeon_schedule_rows schedule
set start_date = reviewed.start_date,
    end_date = reviewed.end_date,
    updated_at = now()
from reviewed_timeline reviewed
where schedule.source_key = reviewed.source_key
  and (schedule.start_date, schedule.end_date)
      is distinct from (reviewed.start_date, reviewed.end_date);

notify pgrst, 'reload schema';
