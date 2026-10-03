# StitchLink User Flows

## 1. Overview

StitchLink has three primary user roles:

* Clothing Shop
* Solo/Home-Based Dressmaker
* System Administrator

The system also contains AI-assisted workflows for matching, quotation assistance, category validation, demand forecasting, capacity prediction, and production-risk detection.

AI features provide recommendations and warnings while important marketplace decisions remain under user control.

---

# 2. Public User Flow

```text
Landing Page
     ↓
Explore StitchLink
     ↓
Choose Language
     ↓
Login / Register
     ↓
Select User Role
     ↓
Complete Registration
     ↓
Account Created
     ↓
Role-Based Dashboard
```

## 2.1 Registration Flow

```text
Register
   ↓
Select Role
   ↓
Enter Account Information
   ↓
Enter Profile Information
   ↓
Add Location
   ↓
Accept Terms
   ↓
Submit Registration
   ↓
Account Created
   ↓
Login
   ↓
Dashboard
```

---

# 3. Clothing Shop Flow

## 3.1 Shop Main Journey

```text
Shop Dashboard
      ↓
Create Order Request
      ↓
Enter Order Details
      ↓
Select Clothing Category
      ↓
Enter Description
      ↓
Upload Reference Images
      ↓
AI Category Validation
      ↓
Is Information Relevant?
   ↙              ↘
 Yes              No
 ↓                 ↓
Continue      Show Warning
 ↓                 ↓
Review          Correct Details
 ↓                 ↓
Submit ←──────────┘
 ↓
Order Request Published
 ↓
AI Dressmaker Matching
 ↓
View Recommended Dressmakers
 ↓
Receive Quotations
 ↓
Compare Quotations
 ↓
Select Quotation
 ↓
Quotation Accepted
 ↓
Order Created
 ↓
Track Production
 ↓
Order Completed
 ↓
Submit Review
```

---

## 3.2 Create Order Request Flow

```text
Create Order Request
        ↓
Enter Order Title
        ↓
Select Category
        ↓
Enter Description
        ↓
Enter Quantity
        ↓
Set Required Date
        ↓
Add Budget Information
        ↓
Upload Reference Images
        ↓
Select Location
        ↓
AI Category Validation
        ↓
Review Request
        ↓
Submit
```

If the AI detects a possible mismatch:

```text
User Input
    ↓
AI Validation
    ↓
Possible Category Mismatch
    ↓
Display Warning
    ↓
User Reviews Information
    ↓
Change Category / Edit Information / Continue
```

The system should not automatically reject the request solely because of an AI prediction.

---

# 4. Shop Dressmaker Discovery Flow

```text
Marketplace
     ↓
Search / Filter
     ↓
Select Clothing Category
     ↓
Apply Location Filter
     ↓
View Dressmakers
     ↓
View Profile
     ↓
View Skills
     ↓
View Portfolio
     ↓
View Ratings
     ↓
View Availability
     ↓
View AI Match Information
     ↓
Compare Suitable Dressmakers
```

## 4.1 Map-Based Discovery

```text
Marketplace
     ↓
Map View
     ↓
View Dressmaker Locations
     ↓
Select Location / Dressmaker
     ↓
View Profile Summary
     ↓
Open Full Profile
```

Users should also be able to switch between:

```text
Map View ↔ List View
```

---

# 5. AI Dressmaker Matching Flow

```text
Order Request
     ↓
Matching Service
     ↓
Analyze Requirements
     ↓
Analyze Category
     ↓
Analyze Skills
     ↓
Analyze Availability
     ↓
Analyze Capacity
     ↓
Analyze Location
     ↓
Analyze Previous Performance
     ↓
Generate Matching Results
     ↓
Display Recommendations
     ↓
Shop Reviews Recommendations
     ↓
Shop Selects Dressmakers
```

The matching system provides recommendations rather than automatically selecting a dressmaker.

---

# 6. Quotation Flow

## 6.1 Dressmaker Quotation Flow

```text
Order Marketplace
       ↓
View Order Request
       ↓
Review Requirements
       ↓
Check Availability
       ↓
Check Capacity
       ↓
Submit Quotation
       ↓
Enter Price
       ↓
Enter Estimated Completion Time
       ↓
Add Notes
       ↓
AI Quotation Assistance
       ↓
Review AI Pricing Guidance
       ↓
Adjust Quotation if Required
       ↓
Submit Quotation
```

## 6.2 Shop Quotation Review Flow

```text
Order Request
     ↓
Received Quotations
     ↓
View Quotation
     ↓
Compare:
- Price
- Completion Time
- Dressmaker Profile
- Skills
- Portfolio
- Rating
- AI Insights
     ↓
Accept / Reject
     ↓
Accepted Quotation
     ↓
Order Created
```

---

# 7. Order Management Flow

```text
Quotation Accepted
       ↓
Order Created
       ↓
Order Confirmation
       ↓
Production Started
       ↓
Production In Progress
       ↓
Production Monitoring
       ↓
Production Completed
       ↓
Order Completed
       ↓
Review and Rating
```

Possible order statuses:

```text
Pending
Confirmed
In Production
Ready
Completed
Cancelled
```

---

# 8. Capacity Prediction Flow

```text
Dressmaker Data
      ↓
Current Orders
      ↓
Availability
      ↓
Current Capacity
      ↓
Historical Workload
      ↓
AI Capacity Model
      ↓
Capacity Prediction
      ↓
Display Insight
```

Example:

```text
Current Capacity: High
Upcoming Workload: High
Predicted Capacity Pressure: High
```

The dressmaker can use this information when deciding whether to accept additional orders.

---

# 9. Demand Forecasting Flow

```text
Historical Orders
       ↓
Clean and Prepare Data
       ↓
Analyze:
- Categories
- Quantities
- Dates
- Seasonal Patterns
       ↓
Demand Forecasting Model
       ↓
Predicted Demand
       ↓
Dashboard
       ↓
Shop / Dressmaker / Admin Insights
```

Example insight:

```text
Expected demand for Frock orders:
Increasing during the selected period.
```

Forecasts should be presented as predictions rather than guaranteed future outcomes.

---

# 10. Production Risk Detection Flow

```text
Active Order
     ↓
Analyze:
- Quantity
- Deadline
- Current Progress
- Capacity
- Historical Performance
     ↓
Risk Analysis
     ↓
Risk Level
     ↓
Display Warning
     ↓
Notify Relevant User
     ↓
User Reviews Situation
     ↓
Take Preventive Action
```

Possible risk levels:

```text
Low Risk
Medium Risk
High Risk
```

---

# 11. Advanced Category and Image Recognition Flow

```text
User Selects Category
        ↓
Enters Description
        ↓
Uploads Image
        ↓
AI Analysis
   ↙          ↘
Text Analysis  Image Analysis
   ↘          ↙
     Compare Results
          ↓
Determine Relevance
          ↓
Relevant / Possible Mismatch
```

Example:

```text
Selected Category: Frock
Detected from Information: Trouser

Result:
Possible Category Mismatch
```

The user can:

```text
Change Category
      OR
Edit Information
      OR
Continue
```

---

# 12. Real-Time Notification Flow

```text
System Event
     ↓
Notification Service
     ↓
Identify Relevant User
     ↓
Generate Notification
     ↓
Deliver Notification
     ↓
User Opens Notification
     ↓
Navigate to Relevant Screen
```

Examples of notification events:

* New quotation received
* Quotation accepted
* Order status changed
* New message
* New matching recommendation
* Production-risk alert
* Capacity warning
* Order request update

---

# 13. Messaging Flow

```text
User Opens Messages
       ↓
Select Conversation
       ↓
View Conversation
       ↓
Enter Message
       ↓
Send
       ↓
Message Stored
       ↓
Real-Time Delivery
       ↓
Recipient Notification
```

Messaging should be associated with relevant marketplace or order activities where appropriate.

---

# 14. Reviews and Ratings Flow

```text
Order Completed
      ↓
Eligible for Review
      ↓
Shop / Dressmaker Opens Review
      ↓
Select Rating
      ↓
Write Review
      ↓
Submit
      ↓
Review Stored
      ↓
Reputation Updated
```

Reviews should only become available when the relevant order reaches an eligible completed state.

---

# 15. Dressmaker Main Flow

```text
Dashboard
    ↓
Order Marketplace
    ↓
Browse Order Requests
    ↓
Search / Filter
    ↓
View Order Details
    ↓
Check Capacity
    ↓
Submit Quotation
    ↓
Receive Quotation Result
    ↓
Accepted?
   ↙       ↘
 Yes       No
 ↓          ↓
Order     Continue
Created   Marketplace
 ↓
Production
 ↓
Update Status
 ↓
Order Completed
 ↓
Receive Review
```

---

# 16. Dressmaker Portfolio Flow

```text
Profile
   ↓
Portfolio
   ↓
Add Portfolio Item
   ↓
Upload Image
   ↓
Select Category
   ↓
Enter Description
   ↓
AI Category Validation
   ↓
Review
   ↓
Save Portfolio Item
```

---

# 17. Admin Flow

```text
Admin Login
     ↓
Admin Dashboard
     ↓
Choose Management Area
     ↓
Users / Verification / Categories /
Marketplace / Orders / Analytics
```

## 17.1 User Verification

```text
Verification Requests
       ↓
View User Information
       ↓
Review Submitted Information
       ↓
Approve / Reject
       ↓
Update Verification Status
       ↓
Notify User
```

## 17.2 Marketplace Monitoring

```text
Admin Dashboard
      ↓
Marketplace
      ↓
View Requests / Quotations / Orders
      ↓
Identify Issues
      ↓
Take Administrative Action
```

---

# 18. Analytics Flow

```text
StitchLink Database
       ↓
Data Extraction
       ↓
Data Cleaning
       ↓
Python Processing
       ↓
Prepared Dataset
       ↓
Tableau
       ↓
Interactive Dashboards
```

Dashboard areas include:

* Marketplace Overview
* Order and Category Analysis
* Dressmaker Performance
* Demand Forecasting
* Geographic Analysis
* Capacity Analysis
* Production Risk
* Platform Analytics

---

# 19. Agentic AI Foundation Flow

The agentic AI architecture will support controlled multi-step assistance.

```text
User Request
     ↓
AI Agent
     ↓
Understand Task
     ↓
Identify Required Information
     ↓
Access Approved System Services
     ↓
Analyze Information
     ↓
Generate Recommendation
     ↓
Present Result to User
     ↓
User Confirmation
     ↓
Execute Approved Action
```

Important actions should require user confirmation rather than being performed automatically.

---

# 20. Complete StitchLink Marketplace Flow

```text
                 ┌─────────────────┐
                 │      Shop       │
                 └────────┬────────┘
                          ↓
                 Create Order Request
                          ↓
                  AI Category Check
                          ↓
                  Publish Request
                          ↓
                  AI Matching System
                          ↓
             Recommended Dressmakers
                          ↓
                 Dressmakers Review
                          ↓
                    Quotations
                          ↓
                Shop Compares Quotes
                          ↓
                 Accept Quotation
                          ↓
                    Order Created
                          ↓
               Production Monitoring
                    ↙           ↘
           Capacity AI       Risk AI
                    ↘           ↙
                  Order Progress
                          ↓
                   Order Completed
                          ↓
                  Reviews & Ratings
                          ↓
                  Analytics Database
                          ↓
             Python / Tableau Analytics
```

# 21. Navigation Flow Summary

## Shop

```text
Dashboard
├── Marketplace
│   ├── List View
│   ├── Map View
│   └── Dressmaker Profile
├── Order Requests
│   ├── Create Request
│   ├── My Requests
│   └── Quotations
├── Orders
├── Messages
├── Notifications
└── Profile
```

## Dressmaker

```text
Dashboard
├── Order Marketplace
│   └── Order Details
├── My Quotations
├── Orders
├── Availability & Capacity
├── Portfolio
├── Messages
├── Notifications
└── Profile
```

## Admin

```text
Dashboard
├── Users
├── Verification
├── Categories
├── Marketplace
├── Orders
├── Analytics
├── Notifications
└── Profile
```

# 22. UX Principles for User Flows

The user flows should follow these principles:

* Minimize unnecessary steps
* Clearly show the current stage of a process
* Provide con
