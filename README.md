# Abo Anas Sweets

## Overview

Abo Anas Sweets is a web-based order management system developed for a local Palestinian sweets store in Nablus.

Instead of receiving orders by phone and writing them in a paper notebook, customers can submit their orders online. Every order is stored in a MongoDB database, allowing the owner to manage requests safely and efficiently.

---

## Problem

The store relied on handwritten notes and phone calls.

This caused several issues:

- Orders could be lost or damaged.
- Customers had to call during busy hours.
- Managing multiple orders was difficult.
- There was no dashboard to organize requests.

---

## Solution

The website allows customers to:

- Place an order online.
- Select the date and pickup time.
- Add special notes.
- Edit their order using their phone number.

The store owner can:

- View all incoming orders.
- Delete completed orders.
- Prevent duplicate reservations.
- Manage everything from a dashboard.

---

## Technologies

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- EJS
- Bootstrap 5
- Docker
- Python (QR Code Generator)

---

## Features

- Responsive interface
- Order management dashboard
- Duplicate booking prevention
- Order editing
- QR code for easy access
- MongoDB database integration

---

## Challenges

### Preventing duplicate bookings

I created a unique compound index in MongoDB using:

- Month
- Day
- Time

This prevents two customers from booking the same pickup time.

### Deployment

Initially, I deployed the application on Render.

Later I migrated to another hosting provider to eliminate cold-start delays and improve availability, but I descoverd that the other host didn't fix my problem, So I used render again and to have host without cold-start I used uptimeRobot to open the website every 10 minute by this method my website will run 24/7 without sleep.

### Voice notifications

I experimented with Twilio and WhatsApp automation for customer notifications.

Although both services presented deployment limitations, the experience helped me understand third-party API integration and deployment constraints.

---

## Screenshots
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/e345393a-31ed-4f45-88e9-5fd617609cde" />
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/36f1c5b0-33ce-47f6-bf89-199740b34951" />
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/df3b0c6d-6279-4f7f-8580-593dadbefefc" />

...
