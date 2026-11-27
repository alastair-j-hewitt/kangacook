# Kangacook

A recipe browser with a Django REST API backend and a React (Vite) frontend.

## Backend (Django)

```bash
cd kangacook_backend
python3 -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt

export DJANGO_SECRET_KEY="$(python -c 'from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())')"
export DJANGO_DEBUG=true

python manage.py migrate
python manage.py loaddata mock_data   # optional sample recipe
python manage.py runserver            # http://127.0.0.1:8000
```

| URL | What it returns |
|---|---|
| `/` and `/<id>/` | Server-rendered HTML pages |
| `/api/recipes/` | JSON list; supports `?search=<text>` (title and ingredients) |
| `/api/recipes/<id>/` | JSON detail, including `ingredients_list` |
| `/admin/` | Django admin (create a user with `python manage.py createsuperuser`) |

Run the tests with `python manage.py test`.

### Environment variables

| Variable | Required | Default |
|---|---|---|
| `DJANGO_SECRET_KEY` | yes | none (the app refuses to start without it) |
| `DJANGO_DEBUG` | no | `false` |
| `DJANGO_ALLOWED_HOSTS` | no | `localhost,127.0.0.1` |

## Frontend (React + Vite)

```bash
cd kangacook-frontend
npm install
npm run dev    # http://localhost:5173, proxies /api to the Django server on port 8000
```
