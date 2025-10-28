# ElevateLabs-internship-Final-project
SaaS-style Landing Page & Sign-Up Workflow

A full-stack project demonstrating a conversion-focused SaaS landing page with a complete user sign-up flow, including email verification and lead capture.

Features: 

Responsive Landing Page: A modern, conversion-optimized landing page built with Tailwind CSS.

User Sign-Up: A clean sign-up form with client-side and server-side form validation.

Email Verification: New users are sent a unique verification email using Nodemailer to confirm their email address.

Lead Capture: Validated user information (email, name, etc.) is securely stored in a MongoDB database.

"Thank You" Dashboard: A simple, protected "thank you" page that users are redirected to after successfully signing up.

Tech Stack

This project is a full-stack application built with the following technologies:

Frontend:

HTML5

Tailwind CSS: For utility-first, responsive styling.

Backend:

Node.js: As the JavaScript runtime environment.

Express.js: As the web server framework for building the API.

Database:

MongoDB: (with Mongoose) As the NoSQL database to store user data.

Email & Authentication:

Nodemailer: To send transactional (verification) emails.

JSON Web Tokens (JWT): To create secure, expiring tokens for the email verification links.

bcrypt.js: To hash user passwords before storing them in the database.


