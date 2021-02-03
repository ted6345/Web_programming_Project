### 프로젝트 디렉토리

**mysite(DIR)** : 최상위 루트 디렉토리

- `manage.py`
- **pexels(DIR)** : pexels 프로젝트 디렉토리
    - `__init__.py`
    - `settings.py`
    - `urls.py`
    - `wsgi.py` 
    - `asgi.py`
- **home(DIR)** : home 애플리케이션 디렉토리
    - `__init__.py`
    - `admin.py`
    - `apps.py`
    - `forms.py` : html의 폼 객체를 post하기 위한 파일(폼에서 전달할 변수 지정)
    - migrations(DIR)
        - `__init__.py`
    - `models.py`
    - `tests.py`
    - `views.py`
    - **templates(DIR)** : 애플리케이션의 템플릿 파일 디렉토리
        - home(DIR)
            - `index.html`
- search(DIR) : search 애플리케이션 디렉토리
    - `__init__.py`
    - `admin.py`
    - `apps.py`
    - migrations(DIR)
        - `__init__.py`
    - `models.py`
    - `tests.py`
    - `views.py`
    - **templates(DIR)** : 애플리케이션의 템플릿 파일 디렉토리
        - search(DIR)
            - `index.html`
- **static(DIR)**

    - css(DIR) : CSS 파일 디렉토리
    - Javascript(DIR) : JS 파일 디렉토리

    - assets(DIR) : 사진 파일 디렉토리
- logs(DIR) : TBD

-----

