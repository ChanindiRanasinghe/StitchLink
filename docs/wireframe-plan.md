# StitchLink Wireframe Plan

## 1. Purpose

The wireframe stage defines the structure, content hierarchy, navigation, and user interactions of the StitchLink application before creating high-fidelity UI designs.

Wireframes will focus on layout and usability rather than final colors, typography, images, and visual styling.

## 2. Wireframe Priority

The screens will be designed in the following order:

1. Shared/Public screens
2. Clothing Shop screens
3. Dressmaker screens
4. Administrator screens
5. AI and advanced feature states
6. Responsive layouts

---

# 3. Public Screens

## WF-01 — Landing Page

Purpose:
Introduce StitchLink and direct users to the marketplace or authentication.

Main sections:

* Header/navigation
* StitchLink logo
* Hero section
* Short system introduction
* How StitchLink works
* Shop benefits
* Dressmaker benefits
* AI feature highlights
* Call-to-action
* Footer

Primary actions:

* Get Started
* Explore Marketplace
* Login
* Register

---

## WF-02 — Login

Components:

* Email/username
* Password
* Remember me
* Login button
* Forgot password
* Register link
* Language selector

---

## WF-03 — Registration

Components:

* Account information
* Role selection
* Basic profile information
* Location
* Password
* Terms and conditions
* Registration button

Roles:

* Clothing Shop
* Solo/Home-Based Dressmaker

---

## WF-04 — Language Selection

Languages:

* English
* Sinhala
* Tamil

The selected language should be stored as the user's preferred interface language.

---

# 4. Shared Authenticated Layout

## WF-05 — Application Shell

This structure will be reused across authenticated screens.

Components:

* Sidebar
* Top navigation
* Page title
* Breadcrumb where required
* Notification icon
* Language selector
* User profile menu
* Main content area

The sidebar changes according to the user's role.

---

# 5. Clothing Shop Screens

## WF-06 — Shop Dashboard

Main sections:

### Summary Cards

* Active Requests
* Received Quotations
* Active Orders
* Completed Orders

### Alerts

* New quotations
* Order updates
* Production-risk alerts

### AI Insights

* Recommended dressmakers
* Demand insights
* Other relevant recommendations

### Recent Activity

* Recent requests
* Recent quotations
* Recent orders

---

## WF-07 — Dressmaker Marketplace

Main sections:

* Search
* Category filter
* Skill filter
* Location filter
* Availability filter
* Rating filter
* List/map toggle
* Dressmaker cards

Dressmaker card:

* Profile image
* Name
* Location
* Skills
* Categories
* Rating
* Availability
* Verification
* AI matching indicator
* View Profile

---

## WF-08 — Map-Based Dressmaker Discovery

Components:

* Map
* Dressmaker location markers
* Search location
* Filters
* Distance information
* Selected dressmaker preview
* List/map toggle

---

## WF-09 — Dressmaker Profile

Sections:

* Profile header
* Verification status
* About
* Skills
* Clothing categories
* Portfolio
* Availability
* Capacity
* Ratings and reviews
* Location
* AI matching information

Primary action:

* Contact
* Create Order Request / Invite to Request where applicable

---

## WF-10 — Create Order Request

Form sections:

### Basic Information

* Order title
* Clothing category
* Description

### Requirements

* Quantity
* Required date
* Budget
* Additional requirements

### Reference Images

* Image upload
* Image preview
* Remove image

### Location

* Order location

### AI Validation

* Category relevance result
* Image/category recognition result where available

### Actions

* Save Draft
* Review
* Submit Request

---

## WF-11 — Category Mismatch Warning

Example:

Selected category:
**Frock**

Detected category:
**Trouser**

Warning:

**Possible category mismatch**

The information provided may not match the selected category.

Actions:

* Change Category
* Edit Information
* Continue Anyway

The warning should clearly indicate that it is an AI-assisted result.

---

## WF-12 — Order Request Details

Sections:

* Order title
* Category
* Description
* Quantity
* Deadline
* Budget
* Reference images
* Location
* Request status
* AI matching recommendations
* Received quotations

Actions:

* Edit
* View Quotations
* Cancel where applicable

---

## WF-13 — Quotations

Main sections:

* Quotation list
* Price
* Estimated completion time
* Dressmaker
* Rating
* Portfolio summary
* AI quotation insight
* Status

Actions:

* View
* Compare
* Accept
* Reject

---

## WF-14 — Quotation Comparison

Comparison areas:

* Dressmaker
* Price
* Completion time
* Skills
* Rating
* Previous performance
* Portfolio
* AI insights

Primary action:

* Select Quotation

---

## WF-15 — Orders

Sections:

* Active orders
* Completed orders
* Cancelled orders
* Order cards/table

Order information:

* Order number
* Dressmaker
* Category
* Quantity
* Deadline
* Current status
* Risk indicator

---

## WF-16 — Order Details

Sections:

* Order summary
* Shop information
* Dressmaker information
* Order requirements
* Production progress
* Status history
* Messages
* Risk indicators
* Capacity insights

Actions:

* Message
* View progress
* Complete order where applicable
* Submit review

---

## WF-17 — Shop Messages

Components:

* Conversation list
* Active conversation
* Message input
* Send button
* Order context

---

## WF-18 — Shop Notifications

Notification categories:

* Orders
* Quotations
* Messages
* Matching
* Production Risk
* System

---

## WF-19 — Shop Profile

Sections:

* Business information
* Contact information
* Location
* Account settings
* Language
* Security settings

---

# 6. Dressmaker Screens

## WF-20 — Dressmaker Dashboard

Summary cards:

* Available Requests
* Active Quotations
* Active Orders
* Capacity

Sections:

* Recommended orders
* Capacity prediction
* Production-risk alerts
* Recent activity
* Notifications

---

## WF-21 — Order Marketplace

Components:

* Search
* Category filters
* Location filter
* Quantity filter
* Deadline filter
* Recommended requests
* Order cards

Order card:

* Category
* Quantity
* Deadline
* Location
* Budget
* AI suitability indicator

---

## WF-22 — Order Request Details

Sections:

* Shop information
* Order requirements
* Category
* Quantity
* Deadline
* Reference images
* Location
* AI suitability information

Primary action:

* Submit Quotation

---

## WF-23 — Submit Quotation

Sections:

* Order summary
* Proposed price
* Estimated completion date
* Notes
* AI pricing assistance

AI quotation component:

* Suggested price range
* Relevant factors
* Explanation

Actions:

* Review
* Submit Quotation

---

## WF-24 — My Quotations

Sections:

* Pending
* Accepted
* Rejected
* Expired

Each quotation displays:

* Shop
* Order
* Price
* Completion time
* Status

---

## WF-25 — Dressmaker Orders

Sections:

* Active
* Completed
* Cancelled

Order information:

* Shop
* Category
* Quantity
* Deadline
* Status
* Risk level

---

## WF-26 — Production / Order Details

Sections:

* Order summary
* Production progress
* Status timeline
* Deadline
* Capacity information
* Risk analysis
* Messages

Actions:

* Update Status
* Message Shop

---

## WF-27 — Availability & Capacity

Sections:

* Current availability
* Current workload
* Upcoming workload
* Capacity prediction
* Capacity indicators
* Availability calendar

AI insight:

* Predicted capacity pressure
* Suggested workload awareness

---

## WF-28 — Dressmaker Portfolio

Sections:

* Portfolio grid
* Add portfolio item
* Category
* Description
* Image

AI validation:

* Category detection
* Image recognition
* Possible mismatch warning

---

## WF-29 — Dressmaker Profile

Sections:

* Profile information
* Skills
* Categories
* Portfolio
* Location
* Availability
* Verification
* Ratings
* Reviews

---

## WF-30 — Dressmaker Messages

Components:

* Conversation list
* Active conversation
* Message input
* Send button
* Order context

---

## WF-31 — Dressmaker Notifications

Categories:

* Order requests
* Quotations
* Orders
* Messages
* Matching
* Capacity
* Production Risk

---

# 7. Administrator Screens

## WF-32 — Admin Dashboard

Summary cards:

* Total Users
* Shops
* Dressmakers
* Active Orders
* Pending Verification
* Marketplace Activity

Sections:

* Recent activity
* System alerts
* Analytics overview

---

## WF-33 — User Management

Components:

* Search
* Filters
* User table
* Role
* Verification status
* Account status

Actions:

* View
* Verify
* Suspend
* Manage

---

## WF-34 — Verification Management

Sections:

* Pending verification
* Approved
* Rejected

Verification details:

* User information
* Submitted information
* Verification status

Actions:

* Approve
* Reject

---

## WF-35 — Category Management

Components:

* Category list
* Add category
* Edit category
* Category status

---

## WF-36 — Marketplace Management

Sections:

* Order requests
* Quotations
* Orders
* Reports/issues

Actions:

* View
* Monitor
* Manage reported issues

---

## WF-37 — Admin Orders

Components:

* Search
* Filters
* Order table
* Status
* Risk level
* Shop
* Dressmaker

---

## WF-38 — Analytics Dashboard

Sections:

* Marketplace analytics
* Order analytics
* Category trends
* Dressmaker performance
* Demand forecasts
* Capacity analytics
* Production risk
* Geographic analytics

Charts:

* Bar charts
* Line charts
* Geographic visualizations
* Summary cards

---

# 8. AI Feature Screens and States

AI should generally be integrated into existing workflows rather than creating unnecessary separate pages.

## WF-39 — AI Matching

Display:

* Recommended dressmakers
* Matching factors
* Relevant skills
* Category compatibility
* Availability
* Capacity
* Location
* Previous performance

---

## WF-40 — AI Quotation Assistant

Display:

* Suggested price range
* Supporting factors
* Historical information where available
* AI explanation

User remains responsible for the final quotation.

---

## WF-41 — AI Category Validation

Display:

* Selected category
* Detected category
* Confidence/relevance information where appropriate
* Warning
* Recommended action

---

## WF-42 — AI Demand Forecast

Display:

* Historical demand
* Predicted demand
* Category trends
* Time period
* Forecast visualization

---

## WF-43 — AI Capacity Prediction

Display:

* Current workload
* Upcoming workload
* Predicted capacity
* Capacity pressure indicator

---

## WF-44 — AI Production Risk

Display:

* Current risk level
* Risk factors
* Explanation
* Suggested preventive action

---

## WF-45 — AI Agent Assistance

A controlled AI assistant interface may be provided for multi-step assistance.

Possible actions:

* Find suitable dressmakers
* Summarize order requirements
* Assist with quotation preparation
* Explain demand insights
* Explain production risks

Important actions require user confirmation.

---

# 9. Shared System States

The following states should be designed for important screens:

### Loading

Display an appropriate loading indicator while information is being retrieved.

### Empty State

Explain when there is no available data and provide a relevant next action.

### Error State

Clearly explain the problem and provide a retry or recovery action.

### Success State

Confirm completed actions.

### Validation State

Clearly identify incorrect or incomplete information.

### AI Warning State

Clearly identify AI-generated warnings and recommendations.

---

# 10. Responsive Wireframes

The most important screens should receive responsive wireframes for:

* Desktop
* Tablet
* Mobile web

Priority responsive screens:

1. Landing Page
2. Login
3. Dashboard
4. Marketplace
5. Create Order Request
6. Order Details
7. Quotations
8. Messages
9. Profile

---

# 11. Figma Wireframe Organization

The Figma file should contain:

### Page 1 — Design System

Final visual components.

### Page 2 — User Flows

Shop, dressmaker, admin, and AI flows.

### Page 3 — Wireframes

Low-fidelity layouts.

### Page 4 — High-Fidelity UI

Final designs.

### Page 5 — Prototype

Interactive prototype connections.

### Page 6 — Components

Reusable UI components.

---

# 12. Wireframe Development Order

The wireframes should be created in this order:

### Phase 1 — Foundation

* Landing
* Login
* Registration
* Application shell

### Phase 2 — Shop

* Shop dashboard
* Marketplace
* Dressmaker profile
* Create order request
* Category validation
* Quotations
* Order details

### Phase 3 — Dressmaker

* Dressmaker dashboard
* Order marketplace
* Order details
* Submit quotation
* Capacity
* Portfolio

### Phase 4 — Admin

* Admin dashboard
* User management
* Verification
* Categories
* Analytics

### Phase 5 — Advanced Features

* Map discovery
* AI matching
* AI quotation
* Demand forecasting
* Capacity prediction
* Production risk
* AI category/image recognition
* AI agent interface
* Notifications

### Phase 6 — Responsive

* Desktop
* Tablet
* Mobile web

---

# 13. Wireframe Completion Criteria

The wireframe stage is complete when:

* All primary user journeys have corresponding screens
* Shop workflows are represented
* Dressmaker workflows are represented
* Admin workflows are represented
* AI interactions are represented
* Error and validation states are considered
* Responsive layouts are planned
* Navigation is consistent
* Major reusable components are identified
