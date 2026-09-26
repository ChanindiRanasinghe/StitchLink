# Scope and Future Enhancements

## 1. Overview

StitchLink is a web-based B2B marketplace designed to connect clothing shops with solo and home-based dressmakers. The system focuses on simplifying dressmaker discovery, order requests, quotations, order management, communication, and decision support through AI and analytics.

The project will implement a core marketplace together with advanced AI, location-based, notification, multilingual, and analytics capabilities.

## 2. In-Scope Features

### 2.1 User Management

* User registration and login
* Role-based access control
* Clothing shop accounts
* Solo/home-based dressmaker accounts
* Administrator accounts
* Profile management

### 2.2 Multilingual Support

* English language support
* Sinhala language support
* Tamil language support
* Language selection within the system
* Support for multilingual user interface content

### 2.3 Dressmaker Profiles

* Dressmaker profile information
* Skills and clothing categories
* Portfolio management
* Availability information
* Capacity information
* Verification status
* Location information

### 2.4 Clothing Categories

* Clothing category management
* Category selection for portfolios and order requests
* Category-based search and filtering
* AI-based category relevance validation
* Image-based category recognition where supported

### 2.5 Shop Order Requests

* Creation of clothing order requests
* Order requirements and descriptions
* Quantity and deadline information
* Clothing category selection
* Reference image uploads
* Request management
* Category relevance validation before submission

### 2.6 Marketplace

* Browse available dressmakers
* Search and filtering
* Compare relevant dressmakers
* Browse available order requests
* View dressmaker portfolios and relevant information
* Location-based discovery
* Map-based dressmaker discovery

### 2.7 Geographic and Location-Based Matching

* Store relevant shop and dressmaker location information
* Consider geographic distance during matching
* Support location-based dressmaker recommendations
* Allow users to discover dressmakers through map-based interfaces
* Use location as one factor rather than the only factor in matching

### 2.8 AI-Based Dressmaker Matching

* Match clothing shops with suitable dressmakers
* Consider skills, clothing categories, availability, capacity, location, and previous performance
* Provide matching recommendations
* Combine multiple relevant factors when generating recommendations
* Allow users to review recommendations before making decisions

### 2.9 AI-Assisted Quotation

* Provide estimated pricing guidance
* Consider order requirements and historical quotation information where available
* Support dressmakers when preparing quotations
* Allow users to review and make the final pricing decision

### 2.10 Quotations

* Dressmakers submit quotations for order requests
* Shops review and compare quotations
* Quotation acceptance and rejection
* Quotation status management

### 2.11 Order Management

* Convert an accepted quotation into an order
* Track order status
* Maintain order status history
* Monitor order progress
* Record completed orders

### 2.12 Availability and Capacity

* Manage dressmaker availability
* Record capacity information
* Provide capacity-related insights
* AI-based capacity prediction
* Identify potential capacity limitations

### 2.13 Advanced Demand Forecasting

* Analyze historical order information
* Identify demand patterns
* Analyze category-level demand
* Consider seasonal and historical trends where sufficient data is available
* Generate demand forecasts
* Present demand insights through dashboards
* Continuously improve forecasting as additional historical data becomes available

### 2.14 Advanced AI Production-Risk Analysis

* Analyze order and production information
* Identify potential production risks
* Consider factors such as deadlines, order quantity, capacity, progress, and historical performance
* Generate risk indicators
* Provide early warnings for potentially delayed or problematic orders
* Support users in taking preventive action

### 2.15 Advanced Category and Image Recognition

* Validate whether order information matches the selected clothing category
* Detect possible category mismatches in text
* Analyze uploaded reference images where suitable models are available
* Identify the likely clothing category represented in an image
* Compare detected categories with the user's selected category
* Notify users about potential mismatches before submission

For example, if a user selects the **Frock** category but enters information referring to **trousers**, the system can identify the possible mismatch and notify the user.

### 2.16 Advanced AI and Agentic AI Foundations

* Establish an architecture that supports AI agents
* Allow AI services to interact with relevant StitchLink system data through controlled services
* Support AI-assisted workflows such as matching, quotation assistance, demand analysis, and risk analysis
* Maintain user confirmation for important actions
* Record relevant AI-generated recommendations and results
* Prevent AI systems from making critical marketplace decisions without appropriate user approval

### 2.17 Real-Time Notifications

* Real-time order notifications
* Quotation notifications
* New order-request notifications
* Matching-related notifications
* Message notifications
* Status-change notifications
* Risk alerts
* Capacity-related alerts where applicable

### 2.18 Communication

* User-to-user messaging
* Order-related communication
* Real-time message notifications
* Communication history related to marketplace activities

### 2.19 Reviews and Ratings

* Shop reviews of dressmakers
* Dressmaker reviews of shops
* Ratings based on completed eligible orders
* Reputation information

### 2.20 Administration

* User management
* Profile verification
* Category management
* Marketplace monitoring
* Order and quotation monitoring
* Dispute-related management
* User suspension where required
* Administrative statistics

### 2.21 Advanced Analytics

* Marketplace analytics
* Order and category analytics
* Dressmaker performance analytics
* Shop analytics
* Quotation analytics
* Demand analytics
* Capacity analytics
* Production-risk analytics
* Geographic analytics
* User and platform analytics
* Historical trend analysis
* Python-based data analysis
* Tableau dashboards
* Interactive filtering and visualization where appropriate

### 2.22 Analytics and AI Integration

* Use structured marketplace data for analytics
* Prepare datasets using Python
* Generate Tableau dashboards
* Use historical marketplace data to support AI models
* Provide analytical insights to administrators, shops, and dressmakers according to their roles

## 3. Planned Extensions After the Core System

The following features are considered possible extensions after the core StitchLink marketplace and advanced features have been implemented.

### 3.1 Online Payment Integration

* Integration with secure online payment gateways
* Payment for accepted quotations or orders
* Deposit and final payment management
* Payment transaction records

### 3.2 Delivery and Logistics Tracking

* Integration with delivery services
* Shipment creation and tracking
* Delivery status updates
* Estimated delivery information

### 3.3 Advanced Computer Vision

* Advanced garment image analysis
* Garment measurement assistance
* Garment quality inspection
* Design and pattern analysis
* More sophisticated visual garment classification

### 3.4 Material and Supplier Marketplace

* Connect clothing businesses and dressmakers with material suppliers
* Fabric marketplace
* Accessories and garment-material listings
* Supplier discovery and comparison
* Material quotation and purchasing support

## 4. Out-of-Scope for the Current Academic Version

The following are outside the current academic implementation scope:

* Native Android or iOS applications
* Full accounting or ERP functionality
* Autonomous AI decision-making without user confirmation
* Real-time IoT-based production-machine monitoring
* Multi-country marketplace expansion
* Complex international taxation and currency management
* Large-scale enterprise logistics infrastructure

These may be considered in later versions if sufficient time, resources, and technical requirements are available.

## 5. Scope Control

The project will prioritize the core marketplace and the advanced features defined in the current scope.

Development will be carried out incrementally so that the fundamental marketplace functionality is completed before more advanced AI, forecasting, geographic, and analytics capabilities are integrated.

AI features may initially use rule-based, prototype, or pre-trained approaches where sufficient project-specific historical data is unavailable. These approaches can be improved as additional reliable data becomes available.

Features requiring external services, payment providers, logistics providers, large datasets, or advanced machine-learning models may initially be implemented as prototypes or prepared through an extensible architecture.

The final implementation will focus on demonstrating the practical value and technical feasibility of StitchLink while maintaining a manageable development scope for the academic project timeline.

