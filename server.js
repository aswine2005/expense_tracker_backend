const http = require('http')

const server = http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/plain'})
     
const modules = require('./modules');
console.log(modules.calculator(2, 3, '+')); 
console.log(modules.calculator(2, 3, '-')); 
console.log(modules.calculator(2, 3, '*')); 
console.log(modules.calculator(2, 3, '/')); 
    res.end('Hello World js\n')
    });
    server.listen(3000, '127.0.0.1', () => {
        console.log('Server running at http://127.0.0.1:3000/')
            });

// const http = require("http");
// const modules = require("./modules");
// const server = http.createServer((req, res) => {
//     res.writeHead(200, { "Content-type": "text/plain" });
//     res.write(
//         `Add:'${modules.add(20, 10)}\n` +
//         `Sub :${modules.sub(20, 10)}\n` +
//         `mul :${modules.product(20, 10)}\n` +
//         `div :${modules.divide(20, 10)}\n`
//     );
//     res.end();
// });

// server.listen(3000, () => {
//     console.log("Server is running on http://localhost:3000");
// });


// const http = require("http");
// const fs = require("fs");

// const server = http.createServer((req, res) => {
//     // Read the JSON file
//     fs.readFile('./sample.json', 'utf8', (err, data) => {
//         if (err) {
//             res.writeHead(500, { "Content-Type": "text/plain" });
//             res.end("Error reading JSON file.");
//             return;
//         }

//         // Parse JSON data
//         const users = JSON.parse(data);

//         // Prepare HTML content
//         let htmlContent = 
//             "<h1> JSON </h1>" +
//             "<ul>";
        
//         users.forEach(user => {
//             htmlContent += 
//                 "<li>" +
//                     "Name: " + user.name + ", Age: " + user.age + 
//                     ", City: " + user.city + ", Amount: " + user.amount +
//                 "</li>";
//         });

//         htmlContent += "</ul>";

//         // Send the response
//         res.writeHead(200, { "Content-Type": "text/html" });
//         res.end(htmlContent);
//     });
// });

// // Start the server
// server.listen(3000, () => {
//     console.log("Server is running on http://localhost:3000");
// });

