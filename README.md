# Project Name

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Application](#running-the-application)
  - [Running Tests](#running-tests)
- [Design Choices](#design-choices)
  - [Architecture](#architecture)
  - [Error Handling](#error-handling)
  - [Trade-offs](#trade-offs)
- [License](#license)

## Introduction

This project is a full-stack application designed to allow users to input a list of URLs and retrieve the metadata (title, description, and image) associated with each URL. The application fetches this metadata on the backend and then displays it in a visually appealing manner on the frontend. It provides users with a simple interface to collect and view metadata from multiple web pages efficiently.

## Features

- **Frontend:**

  - Input Form: Users can input multiple URLs at once (minimum of 3).
  - Submit Button: Triggers the process of fetching metadata for each URL.
  - Display: Shows the retrieved title, description, and image for each URL in a card format.
  - Error Handling: Gracefully handles invalid URLs and cases where metadata cannot be retrieved.

- **Backend:**
  - Metadata Fetching: A Node.js server endpoint /fetch-metadata accepts a list of URLs, fetches their metadata, and returns it as JSON.
  - Rate Limiting: Limits the server to handle a maximum of 5 requests per second.
  - Testing:
    -- Includes unit tests for both the frontend and backend, covering at least 5 test cases, including scenarios for successful data retrieval and error handling.

## Tech Stack

- **Backend:**
  - Node.js
  - Express
  - Axios for making requests to external URLs
- **Frontend:**

  - React (with TypeScript)
  - Axios for HTTP requests
  - CSS Modules for styling

- **Testing:** Jest
- **Others:** Cheerio for web scraping

## Getting Started

### Prerequisites

Before running the project, ensure you have the following installed:

- Node.js (version X.X.X or later)
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
    git clone https://github.com/avivohayon/Urls-Scraper-WebApp-Nodejs-React.git
    cd Urls-Scraper-WebApp-Nodejs-React
   ```

2. Backend Setup:

   ```bash
    cd backend
    npm install
   ```

3. Frontend dependencies:
   ```bash
   cd frontend\tolstoy-frontend
   npm install
   ```

### Running the Application

1. Set up environment variables:

   Create a .env file in the root directory and add the necessary environment variables:

2. Start the backend server:

   ```bash
   cd backend
   npm run start
   ```

3. Start the frontend server:
   ```bash
   cd frontend\tolstoy-frontend
   npm run start
   ```

### Running Tests

To run the test suite, execute:

```bash
npm test
```

This will run all unit tests and display the results in the terminal.

## Design Choices

### Architecture

## Backend Architecture and Design Choices

#### 1. Modular Architecture

- **Choice**: The backend is structured using a modular architecture, with separate layers for controllers, services, and routes. This separation of concerns ensures that each part of the application is responsible for a distinct functionality, making the code more organized, readable, and maintainable.
- **Benefits**:
  - **Maintainability**: By separating the logic into different modules (e.g., controllers, services), it's easier to maintain and update the code. Changes in one part of the application are less likely to affect others.
  - **Scalability**: The modular architecture allows for easy scalability. New features can be added by simply creating new modules without affecting the existing codebase.
  - **Testability**: This structure allows for easier unit testing. Each module can be tested independently, ensuring that the application works correctly before integrating all parts together.

#### 2. Controller Layer

- **Choice**: The controller layer is responsible for handling incoming HTTP requests, invoking the appropriate service methods, and sending responses back to the client. Controllers are kept thin, meaning they mainly delegate business logic to the service layer.
- **Benefits**:
  - **Clarity**: By keeping controllers thin, the responsibilities of each layer are clear. Controllers manage request/response logic, while the business logic is handled by the service layer.
  - **Flexibility**: The separation allows for easy adaptation of the API to different clients (e.g., web, mobile) by adjusting the controller logic without modifying the core business logic.

#### 3. Service Layer

- **Choice**: The service layer contains the core business logic of the application. This layer is where the data processing, validation, and interaction with external APIs or databases take place.
- **Benefits**:
  - **Reusability**: By centralizing business logic in services, the same logic can be reused across different parts of the application, reducing redundancy and the potential for errors.
  - **Single Responsibility**: Each service has a single responsibility, making it easier to manage and modify. For example, a `MetadataService` handles fetching and processing metadata from URLs.
  - **Decoupling**: The service layer is decoupled from the controller and the data access layers. This decoupling makes the code more flexible, allowing changes in the business logic without affecting other parts of the application.

#### 4. Routing Layer

- **Choice**: The routing layer defines the endpoints of the API and maps them to the corresponding controller methods. This separation makes it easier to manage and scale the API as the application grows.
- **Benefits**:
  - **Organization**: Routes are clearly defined and separated from the business logic, making the application structure more intuitive and easier to navigate.
  - **Scalability**: As new features and endpoints are added, they can be easily integrated by simply adding new routes, without the need to refactor existing code.

#### 5. Error Handling

- **Choice**: Comprehensive error handling is implemented throughout the backend. Controllers and services include try/catch blocks to catch and handle errors appropriately, returning meaningful error messages and HTTP status codes to the client.
- **Benefits**:
  - **Robustness**: Proper error handling ensures that the application can gracefully handle unexpected situations, such as network failures or invalid input, providing a better user experience.
  - **Security**: By carefully managing errors, the application avoids leaking sensitive information, which could be exploited by attackers.

#### 6. Rate Limiting

- **Choice**: Implemented rate limiting on the backend to control the number of requests the server can handle within a specific time frame (e.g., 5 requests per second).
- **Benefits**:
  - **Protection**: Rate limiting protects the server from being overwhelmed by too many requests, either accidentally or due to a deliberate attack (e.g., DDoS).
  - **Performance**: By limiting the number of concurrent requests, the server can maintain a consistent performance level, ensuring that legitimate users receive timely responses.

#### 7. Use of Environment Variables

- **Choice**: Environment variables are used to store configuration settings such as API keys, database connections, and the rate limit threshold. This is done via a `.env` file, which is not included in version control.
- **Benefits**:
  - **Security**: Sensitive information is kept out of the codebase, reducing the risk of accidental exposure.
  - **Flexibility**: Configuration settings can be easily changed without modifying the code, making the application more adaptable to different environments (development, staging, production).

#### 8. Middleware Implementation

- **Choice**: Middleware is used to handle cross-cutting concerns such as logging, error handling, and security features (e.g., CORS, input validation). These are applied globally to ensure that every request is processed consistently.
- **Benefits**:
  - **Consistency**: Middleware ensures that all requests are subject to the same checks and processing, which improves the reliability and security of the application.
  - **Code Reusability**: Middleware allows common functionality to be written once and reused across all routes, reducing redundancy.

### Conclusion

The backend architecture of this project is designed with a focus on modularity, maintainability, and scalability. The separation of concerns between controllers, services, and routes ensures that the application remains organized and easy to manage as it grows. Each design choice, from modular architecture to robust error handling, contributes to a backend that is not only functional but also secure, reliable, and prepared for future expansion.

## Frontend Architecture and Design Choices

#### 1. Component-Based Architecture

- **Choice**: The frontend is structured using a component-based architecture, where the UI is divided into smaller, reusable components. Each component is responsible for a specific piece of functionality or UI element, making the application modular and easy to manage.
- **Benefits**:
  - **Reusability**: Components can be reused across different parts of the application, reducing redundancy and making the development process more efficient.
  - **Maintainability**: Changes to one part of the UI can be made in isolation without affecting other components, making the application easier to maintain and update.
  - **Scalability**: As the application grows, new features can be added by creating new components or extending existing ones without disrupting the overall structure.

#### 2. File Organization

- **Choice**: The project is organized into several key directories: `components`, `styles`, `utils`, and `types`. Each directory has a specific purpose, contributing to a clear and intuitive project structure.
  - **`components/`**: Contains all the React components, each in its own folder, including the component logic and associated styles. Components are further divided into subdirectories based on their functionality (e.g., `Form`, `PreviewCard`, `LinkPreview`).
  - **`styles/`**: Houses all the CSS modules, ensuring that styles are scoped locally to each component, preventing global CSS conflicts.
  - **`utils/`**: Contains utility functions that are used across multiple components, such as helper functions for data formatting or API calls.
  - **`types/`**: Stores TypeScript type definitions and interfaces, ensuring that data structures are consistent and well-defined throughout the application.
- **Benefits**:
  - **Clarity**: A well-organized file structure makes it easier for developers to navigate the codebase and understand the application's architecture.
  - **Scalability**: This structure is scalable, allowing for easy addition of new components, utilities, and types as the project grows.
  - **Separation of Concerns**: By separating logic, styles, utilities, and types into different directories, the project adheres to the separation of concerns principle, making the codebase more modular and maintainable.

#### 3. Use of TypeScript

- **Choice**: TypeScript is used as the programming language for the frontend, providing static typing, interfaces, and type annotations.
- **Benefits**:
  - **Type Safety**: TypeScript helps catch errors at compile time, reducing the likelihood of runtime errors and increasing the overall reliability of the application.
  - **Enhanced Developer Experience**: TypeScript provides better code autocompletion, refactoring support, and documentation generation, making development faster and more efficient.
  - **Consistency**: By using TypeScript, data structures are clearly defined through interfaces and types, ensuring consistency across the application and making the code easier to understand and maintain.

#### 4. Separation of Logic and Styles

- **Choice**: Each component's logic (JSX/TSX) is separated from its styles (CSS modules). This ensures that styling is modular and isolated to individual components.
- **Benefits**:
  - **Style Encapsulation**: CSS modules prevent styles from leaking into other components, reducing the risk of unintended side effects and making it easier to maintain the visual consistency of the application.
  - **Flexibility**: Changes to a component's style do not affect other components, allowing for easier customization and iteration on the design.

#### 5. Reusable Utility Functions

- **Choice**: Commonly used logic and helper functions are abstracted into the `utils/` directory. These utilities are used across different components to avoid code duplication.
- **Benefits**:
  - **Reusability**: Utility functions can be reused throughout the application, reducing redundancy and ensuring that common logic is centralized in one place.
  - **Maintainability**: If a utility function needs to be updated, the change can be made in one location, ensuring consistency across the application and making it easier to manage.

#### 6. Form Handling and Error Display

- **Choice**: The form component (`Form.tsx`) is designed to handle user input and trigger backend requests for URL metadata. Error handling is integrated to display informative messages to the user when something goes wrong (e.g., invalid URL, network error).
- **Benefits**:
  - **User Experience**: Providing clear error messages improves the user experience by informing users of any issues and guiding them on how to resolve them.
  - **Modularity**: The form logic is encapsulated within its own component, making it easier to manage, update, or reuse in other parts of the application.

#### 7. Component Testing

- **Choice**: The frontend includes a `src/__tests__/` directory for unit tests that cover the core functionalities of the application, such as form submission, data rendering, and error handling.
- **Benefits**:
  - **Reliability**: Unit tests ensure that individual components work as expected, catching issues early in the development process.
  - **Maintainability**: Testing helps maintain the stability of the application as new features are added or existing ones are modified, ensuring that the application continues to function correctly.

### Conclusion

The frontend architecture of this project is designed with a focus on modularity, clarity, and maintainability. By organizing the project into distinct components, styles, utilities, and types, the application remains well-structured and scalable. The decision to use TypeScript adds an extra layer of type safety and developer productivity, making the codebase more robust and easier to work with. Each design choice, from the separation of logic and styles to the implementation of reusable utilities, contributes to a frontend that is both functional and easy to maintain, ensuring a positive user experience and a codebase that can evolve gracefully over time.

### Error Handling

Error handling is implemented both at the backend and frontend. The backend uses middleware to catch and format errors, while the frontend displays error messages along with status codes to the user. This approach ensures that users receive clear feedback and that the application can handle various failure scenarios gracefully.

## Trade-offs

### Trade-Offs in Backend Design and Architecture

1. **Modular Architecture vs. Simplicity**

   - **Trade-Off**: While a modular architecture improves maintainability and scalability, it adds complexity to the codebase. Each module requires its own setup and integration, which can increase development time and overhead.
   - **Rationale**: The trade-off is justified by the long-term benefits of maintainability and scalability, especially as the project grows and evolves.

2. **Thin Controllers vs. Direct Business Logic Handling**

   - **Trade-Off**: Keeping controllers thin and delegating business logic to the service layer means that controllers are less complex, but it requires additional layers and abstractions. This can sometimes lead to more indirection and potentially more places where bugs can hide.
   - **Rationale**: This separation ensures clear responsibilities and easier testing, though it may increase the cognitive load of understanding the flow of data and control.

3. **Service Layer Reusability vs. Potential Redundancy**

   - **Trade-Off**: Centralizing business logic in the service layer promotes reusability and reduces redundancy. However, if not managed carefully, it can lead to service classes that become too large or complex, making them harder to maintain.
   - **Rationale**: The benefits of having a single place for business logic outweigh the risk of complex service classes, especially with proper organization and documentation.

4. **Rate Limiting vs. Performance Impact**

   - **Trade-Off**: Implementing rate limiting helps protect the server from overload but can impact performance, particularly under high load where legitimate users might experience throttling.
   - **Rationale**: The protection against abuse and potential DDoS attacks justifies the trade-off, ensuring overall stability and security.

5. **Environment Variables vs. Configuration Complexity**
   - **Trade-Off**: Using environment variables for configuration improves security and flexibility but adds complexity to deployment and configuration management.
   - **Rationale**: The security benefits and adaptability of environment variables make them a better choice despite the added complexity.

### Trade-Offs in Frontend Design and Architecture

1. **Component-Based Architecture vs. Overhead**

   - **Trade-Off**: A component-based architecture enhances reusability and maintainability but can introduce overhead in terms of managing numerous small components and their interdependencies.
   - **Rationale**: The modular nature of components aids in long-term maintainability and scalability, which outweighs the initial overhead.

2. **File Organization vs. Initial Complexity**

   - **Trade-Off**: Organizing files into distinct directories for components, styles, utils, and types improves clarity and maintainability but can initially seem complex to new developers.
   - **Rationale**: The well-organized structure simplifies development and scaling in the long run, even though it may require an initial investment of time to set up and understand.

3. **Use of TypeScript vs. Learning Curve**

   - **Trade-Off**: TypeScript provides type safety and better development tools but introduces a learning curve and requires additional setup compared to plain JavaScript.
   - **Rationale**: The benefits of catching errors at compile time and improved developer experience outweigh the learning curve, particularly for larger projects.

4. **Separation of Logic and Styles vs. Potential Fragmentation**

   - **Trade-Off**: Keeping component logic and styles separate improves modularity but can lead to a fragmented development experience where developers need to navigate multiple files to understand a single component.
   - **Rationale**: This separation enhances maintainability and prevents style conflicts, which is crucial for larger or complex applications.

5. **Reusable Utility Functions vs. Over-Abstraction**

   - **Trade-Off**: Abstracting common logic into utility functions reduces redundancy but can lead to over-abstraction where it becomes unclear where specific functionality resides.
   - **Rationale**: The benefits of code reuse and centralized management justify this approach, provided that utilities are well-documented and organized.

6. **Component Testing vs. Development Time**
   - **Trade-Off**: Writing comprehensive unit tests improves reliability and maintainability but increases development time and effort.
   - **Rationale**: The investment in testing ensures that components work correctly and reduces the risk of introducing bugs as the application evolves.

## LICENSE

### This project is licensed under the MIT License. See the LICENSE file for details.
