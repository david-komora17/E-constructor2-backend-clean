e-constructor/
│
├── backend/
│   ├── server.js
│   ├── routes/
│   │   ├── propertyRoutes.js
│   │   ├── reportRoutes.js
│   ├── models/
│   │   └── Property.js
│   ├── controllers/
│   │   ├── propertyController.js
│   ├── utils/
│   │   ├── mpesa.js
│   │   ├── qr.js
│   ├── .env
│   └── package.json
│
├── frontend/
│   ├── index.html
│   ├── make-entries.html
│   ├── e-constructor.css
│   └── scripts/
│       └── make-entries.js
│
├── uploads/
│
├── README.md
└── deploy.sh
