## Tecno-kart Invoice Data

 Starting with Project

- Clone Repo
   -
   - https://github.com/JKAD02/Techno-Kart.git 
   - npm install 

 - Start Server
    -
     - Defult Port 8080 
     - http://localhost:8080/




 - Invoice Data
   -
     
    1. Enter new invoice details.
         - /api/v1/add Route to add Invoice
    2. Update a specific invoice based on invoice number
         - /api/v1/update/:number Route to update Invoice
         - number is Invoice number to find Invoice
     3. Delete a specific invoice based on invoice number
         -  /api/v1/delete/:number Route to delete Invoice
         - number is Invoice number to find Invoice
      4. Get all invoices stored in the db
          - /api/v1/invoice Route to get all Invoice
