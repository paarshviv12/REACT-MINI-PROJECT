# PLOINK Travel Planner

PLOINK is a modern, feature-rich web application designed to help users plan, budget, and journal their travel experiences. Built with React and Tailwind CSS, it offers a seamless and responsive user interface for managing travel itineraries.

## Key Features

*   **Interactive Journey Planner**: Search for and "book" flights, hotels, and ground transportation (buses, trains, metros). Features built-in mock data for route planning.
*   **Dynamic Financial Intelligence**: Automatically tracks expenses based on selected bookings and estimated itinerary costs. Includes real-time currency conversion to maintain accurate budget velocity charts.
*   **Itinerary Builder**: Generate and manage day-by-day travel schedules with specific locations, timestamps, and notes.
*   **Trip Journal**: A dedicated space for documenting memories, featuring drag-and-drop photo uploads and custom caption editing.
*   **Packing List Manager**: Keep track of essential documents and items with a checklist system.
*   **Dark/Light Mode Support**: Fully responsive UI with a custom theme context, utilizing a signature "grain" texture and high-contrast color palette.

## Tech Stack

*   **Frontend Framework**: React.js
*   **Build Tool**: Vite
*   **Styling**: Tailwind CSS, Vanilla CSS (Custom tokens and animations)
*   **Routing**: React Router DOM
*   **Icons**: Lucide React
*   **State Management**: React Context API (TripContext, ThemeContext)

## Getting Started

### Prerequisites

Ensure you have Node.js and npm installed on your local machine.

### To Use:
Just copy the link: 
Enjoy the service.

## Architecture & Structure

*   `src/components/`: Reusable UI components including the Navbar, Footer, Budget Tracker, and Journey Planner modals.
*   `src/context/`: Global state management for user trips, bookings, and application themes.
*   `src/pages/`: Main application views (Home, Planner, Journal, Profile, Saved).
*   `src/lib/`: Utility functions, including robust currency conversion logic.

## Project Notes

This application uses localStorage for simple user session management and relies on an internal context system to persist state across navigation routes during active sessions.
