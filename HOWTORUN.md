# How to run
Install all of the frontend packgaes 
``` cd client && npm i```

Install all of the backend packgaes 
``` cd API && npm i```

Install all of the python packgaes 
``` cd data && pip install -r requirements.txt```

1- front end server 
cd to the client folder and type ``` npm run dev ```
2- Node  API 
cd to the API folder and type ``` npm run Devstart ```
the server will run on port http://localhost:3500
3 PY API
cd to the data folder and type ``` uvicorn index:app --reload  ```
the server will run on port http://127.0.0.1:8000