# SynergyTask
Task for Synergy Way

## Project configuration
1. Clone this repository.
2. Activate virtual environment.
#### Backend
1. Go to the folder `requirements.txt` and run command to install required dependencies:
    ```
    pip install -r requirements.txt
    ```
2. Go to the folder with `manage.py` file and run migrate: 
    ```
    python manage.py migrate
    ```

#### Frontend
1. Go to the folder with `package.json` and run command:
    ```
    npm install
    ```
## Running
1. Go to the project root folder and run watcher: 
    ```
    npm start
    ```
2. Go to the folder with `manage.py` file and run django server: 
    ```
    python manage.py runserver
    ```