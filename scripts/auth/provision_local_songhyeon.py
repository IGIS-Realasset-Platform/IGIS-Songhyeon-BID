#!/usr/bin/env python3
"""Provision the local Songhyeon admin user without printing secrets."""
import json
import os
import secrets
import stat
import urllib.error
import urllib.request
from pathlib import Path

root = Path(__file__).resolve().parents[2]
config_path = root / '.songhyeon-local-supabase.json'
if not config_path.exists():
    raise SystemExit('Local Supabase config file is missing.')
config = json.loads(config_path.read_text())
api_url = config['api_url'].rstrip('/')
service_key = config['service_role_key']
email = os.environ.get('SONGHYEON_ADMIN_EMAIL', 'jk.jeon@igisam.com').strip().lower()
password = os.environ.get('SONGHYEON_ADMIN_PASSWORD') or ('Sh!' + secrets.token_urlsafe(18))

def request(method, path, payload=None):
    body = json.dumps(payload).encode() if payload is not None else None
    req = urllib.request.Request(api_url + path, data=body, method=method, headers={
        'apikey': service_key,
        'Authorization': 'Bearer ' + service_key,
        'Content-Type': 'application/json',
    })
    try:
        with urllib.request.urlopen(req) as response:
            return response.status, json.loads(response.read() or b'{}')
    except urllib.error.HTTPError as exc:
        data = json.loads(exc.read() or b'{}')
        return exc.code, data

status, users = request('GET', '/auth/v1/admin/users?page=1&per_page=1000')
if status != 200:
    raise SystemExit(f'Could not list local Auth users: HTTP {status}')
user = next((u for u in users.get('users', []) if u.get('email', '').lower() == email), None)
if user:
    status, user = request('PUT', f"/auth/v1/admin/users/{user['id']}", {'password': password, 'email_confirm': True})
else:
    status, user = request('POST', '/auth/v1/admin/users', {'email': email, 'password': password, 'email_confirm': True})
if status not in (200, 201):
    raise SystemExit(f'Could not provision local Auth user: HTTP {status}')
auth_id = user['id']

status, _ = request('POST', '/rest/v1/songhyeon_members?on_conflict=email', {
    'auth_id': auth_id,
    'email': email,
    'staff_name': '전기영',
    'group_name': '기획추진센터',
    'title': '기획추진센터',
    'roles': ['송현 BID TF'],
    'responsibility': '사업방향·서울시 협력·사업구조 및 주요 승인',
    'photo_path': '/songhyeon-members/전기영.webp',
    'gate_scope': ['G0', 'G1', 'G2', 'G3', 'G4', 'G5', 'G6'],
    'platform_role': 'admin',
    'display_order': 3,
    'is_active': True,
})
if status not in (200, 201):
    raise SystemExit(f'Could not upsert Songhyeon membership: HTTP {status}')

secret_path = root / '.songhyeon-local-login'
secret_path.write_text(f'EMAIL={email}\nPASSWORD={password}\n')
secret_path.chmod(stat.S_IRUSR | stat.S_IWUSR)
print(json.dumps({'provisioned': True, 'email': email, 'credentials_file': str(secret_path), 'permissions': oct(secret_path.stat().st_mode & 0o777)}))
