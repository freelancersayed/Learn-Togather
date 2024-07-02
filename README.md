
# React + Vite


Live site link : https://learn-together-83b9e.web.app



# Education Collaboration Platform

Welcome to the Education Collaboration Platform! This web application is designed to make education more accessible and convenient. Teachers can create both free and paid sessions, and students can explore, book, and attend these sessions. Admins have the ability to set session prices, and students can view teacher profiles, rate sessions, and leave comments.

## Features
- **User Registration:** Users can register as either a teacher or a student.
- **Session Management:** Teachers can create free or paid sessions.
- **Admin Control:** Admins set the prices for paid sessions.
- **Session Exploration:** Students can explore all available sessions.
- **Booking:** Students can book free sessions or make payments for paid sessions.
- **Profile Viewing:** Students can view profiles of teachers and their fellow students.
- **Ratings and Comments:** Students can leave ratings and comments on sessions, visible to all.

## Tech Stack
- **Frontend:** React, Material Tailwind
- **Backend:** Firebase
- **Payments:** Stripe
- **Data Fetching:** TanStack React Query
- **Form Handling:** React Hook Form
- **Date and Time:** Dayjs, React Datepicker
- **UI Components:** React Icons, React Modal, React Photo View, React Responsive Carousel, React Slick
- **Notifications:** React Toastify, SweetAlert2
- **HTTP Client:** Axios

## Installation
1. Clone the repository:
    ```bash
    git clone https://github.com/programming-hero-web-course1/b9a12-client-side-freelancersayed.git
    ```
2. Navigate to the project directory:
    ```bash
    cd education-collaboration-platform
    ```
3. Install the dependencies:
    ```bash
    npm install
    ```
4. Set up Firebase and Stripe:
    - Create a Firebase project and replace the Firebase configuration in `firebase.config.js`.
    - Create a Stripe account and get the public and secret keys. Replace the placeholders in the Stripe configuration.

## Usage
1. Start the development server:
    ```bash
    npm start
    ```
2. Open your browser and navigate to `http://localhost:3000`.

## Packages Used
### UI and Styling
- `@material-tailwind/react`: Provides a collection of fully responsive components for React built with Tailwind CSS.
- `react-icons`: Popular icons from different icon libraries as React components.
- `react-modal`: Accessible modal dialog component for React.
- `react-photo-view`: Lightbox component for viewing images.
- `react-responsive-carousel`: Carousel component for displaying images and content.
- `react-slick`: Carousel component.
- `slick-carousel`: Dependency for react-slick.

### Forms and Date/Time
- `react-hook-form`: Performant, flexible, and extensible forms with easy-to-use validation.
- `react-datepicker`: A simple and reusable Datepicker component for React.
- `react-duration-picker`: Duration picker component for React.
- `dayjs`: A minimalist JavaScript library for date and time manipulation.

### Data Fetching and State Management
- `tanstack/react-query`: Powerful data synchronization and caching for React.
- `axios`: Promise based HTTP client for the browser and Node.js.

### Authentication and Notifications
- `firebase`: Firebase services including authentication, database, and storage.
- `react-toastify`: Allows you to add notifications to your app with ease.
- `sweetalert2`: Beautiful, responsive, customizable JavaScript popups.

### Payments
- `stripe/react-stripe-js`: React components for Stripe.js and Elements.
- `stripe/stripe-js`: The new JS SDK for Stripe.

## Contributing
Contributions are welcome! Please fork the repository and create a pull request with your changes.

## License
This project is licensed under the MIT License. See the LICENSE file for details.

## Contact
For any inquiries, please contact freelancersayed45@gmail.com

Thank you for using the Education Collaboration Platform! We hope it makes learning and teaching easier and more enjoyable for everyone.
