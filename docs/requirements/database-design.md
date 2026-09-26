# StitchLink Database Design

## 1. Overview

StitchLink will use PostgreSQL as its primary relational database.

The database will store user information, profiles, marketplace requests, quotations, orders, communication, reviews, availability, capacity, and information required by the AI and analytics components.

The database will be designed using normalized relational structures to reduce data duplication and maintain data integrity.

## 2. Main Entities

The main database entities are:

* User
* Role
* Shop Profile
* Dressmaker Profile
* Skill
* Clothing Category
* Portfolio
* Order Request
* Order Request Image
* Quotation
* Order
* Order Status History
* Availability
* Capacity Record
* Message
* Notification
* Review
* AI Matching Result
* AI Prediction
* Production Risk
* Verification

## 3. User and Role Management

### User

Stores common account information.

Possible attributes:

* user_id
* name
* email
* password_hash
* phone
* role_id
* account_status
* created_at
* updated_at

### Role

Stores available system roles.

Possible roles:

* SHOP
* DRESSMAKER
* ADMIN

Attributes:

* role_id
* role_name

## 4. Shop Profile

Stores information specific to clothing shops.

Possible attributes:

* shop_id
* user_id
* business_name
* description
* location
* contact_information
* business_preferences
* created_at
* updated_at

A user with the SHOP role will have a corresponding shop profile.

## 5. Dressmaker Profile

Stores information about solo/home-based dressmakers.

Possible attributes:

* dressmaker_id
* user_id
* description
* experience
* location
* service_area
* pricing_information
* production_capacity
* availability_status
* verification_status
* created_at
* updated_at

## 6. Skills

Skills represent the clothing-related abilities of dressmakers.

### Skill

Possible attributes:

* skill_id
* skill_name
* description

### Dressmaker Skill

Associates dressmakers with their skills.

Possible attributes:

* dressmaker_id
* skill_id
* experience_level

A dressmaker can have multiple skills, and a skill can belong to multiple dressmakers.

## 7. Clothing Category

Stores clothing categories available on the platform.

Examples include:

* Frock
* Trouser
* Shirt
* Skirt
* Saree
* Blouse

Possible attributes:

* category_id
* category_name
* description
* status

Categories will also be used by the category relevance validation feature.

## 8. Portfolio

Stores examples of work uploaded by dressmakers.

Possible attributes:

* portfolio_id
* dressmaker_id
* category_id
* title
* description
* image_url
* created_at

A dressmaker can have multiple portfolio items.

## 9. Order Request

Stores requests created by clothing shops.

Possible attributes:

* request_id
* shop_id
* category_id
* title
* description
* quantity
* budget
* deadline
* location
* status
* created_at
* updated_at

An order request belongs to one shop and one clothing category.

## 10. Order Request Images

Stores reference images associated with an order request.

Possible attributes:

* image_id
* request_id
* image_url
* created_at

An order request can contain multiple reference images.

These images may later be analysed by the AI category relevance detection feature.

## 11. Quotation

Stores quotations submitted by dressmakers.

Possible attributes:

* quotation_id
* request_id
* dressmaker_id
* material_cost
* labor_cost
* additional_cost
* total_amount
* estimated_completion_time
* notes
* status
* created_at
* updated_at

A shop can receive multiple quotations for an order request.

## 12. Order

Stores confirmed orders.

Possible attributes:

* order_id
* request_id
* quotation_id
* shop_id
* dressmaker_id
* agreed_amount
* agreed_deadline
* status
* started_at
* completed_at
* created_at
* updated_at

An order is created after a quotation is accepted.

## 13. Order Status History

Stores changes to an order's status.

Possible statuses include:

* Pending
* Accepted
* In Production
* Near Completion
* Completed
* Cancelled

Possible attributes:

* status_history_id
* order_id
* status
* notes
* changed_at

This information can support production monitoring and analytics.

## 14. Availability

Stores dressmaker availability information.

Possible attributes:

* availability_id
* dressmaker_id
* available_from
* available_to
* availability_status

Availability information can support AI matching and capacity prediction.

## 15. Capacity Records

Stores historical and current dressmaker capacity information.

Possible attributes:

* capacity_id
* dressmaker_id
* current_workload
* available_capacity
* capacity_utilization
* recorded_at

Historical capacity information can support capacity prediction.

## 16. Messages

Stores communication between shops and dressmakers.

Possible attributes:

* message_id
* sender_id
* receiver_id
* order_id
* message_content
* sent_at
* read_at

## 17. Notifications

Stores system notifications.

Possible attributes:

* notification_id
* user_id
* notification_type
* title
* message
* is_read
* created_at

Notifications may be generated for:

* New quotations
* Accepted quotations
* Order updates
* New messages
* Deadlines
* Production risks

## 18. Reviews

Stores ratings and reviews between users after completed orders.

Possible attributes:

* review_id
* order_id
* reviewer_id
* reviewed_user_id
* rating
* comment
* created_at

The system should prevent duplicate reviews for the same completed order and reviewer.

## 19. AI Matching Results

Stores AI-generated matching information.

Possible attributes:

* matching_id
* request_id
* dressmaker_id
* matching_score
* matching_reasons
* created_at

This can store the result of the AI matching process for analysis and auditing.

## 20. AI Predictions

Stores relevant AI prediction results.

Possible attributes:

* prediction_id
* prediction_type
* reference_id
* predicted_value
* confidence
* created_at

Prediction types may include:

* Capacity
* Demand
* Quotation
* Other supported predictions

## 21. Production Risk

Stores detected production risks.

Possible attributes:

* risk_id
* order_id
* risk_type
* risk_level
* risk_description
* detected_at
* resolved_at
* status

## 22. Verification

Stores verification information for users who require profile verification.

Possible attributes:

* verification_id
* user_id
* verification_status
* verified_by
* verified_at
* notes

## 23. Main Relationships

The major relationships include:

* One Role → Many Users
* One User → One Shop Profile or Dressmaker Profile
* One Dressmaker → Many Skills
* One Skill → Many Dressmakers
* One Dressmaker → Many Portfolio Items
* One Clothing Category → Many Portfolio Items
* One Shop → Many Order Requests
* One Clothing Category → Many Order Requests
* One Order Request → Many Reference Images
* One Order Request → Many Quotations
* One Dressmaker → Many Quotations
* One Accepted Quotation → One Order
* One Order → Many Status History Records
* One Dressmaker → Many Availability Records
* One Dressmaker → Many Capacity Records
* One Order → Many Messages
* One User → Many Notifications
* One Order → Many Reviews
* One Order Request → Many AI Matching Results
* One Order → Many Production Risk Records

## 24. High-Level Entity Relationship Structure

```text
ROLE
  │
  └── USER
       ├── SHOP PROFILE
       │     │
       │     └── ORDER REQUEST
       │            ├── CATEGORY
       │            ├── REQUEST IMAGES
       │            ├── QUOTATIONS
       │            │      │
       │            │      └── ORDER
       │            │             ├── STATUS HISTORY
       │            │             ├── PRODUCTION RISK
       │            │             ├── REVIEWS
       │            │             └── MESSAGES
       │            │
       │            └── AI MATCHING RESULTS
       │
       └── DRESSMAKER PROFILE
              ├── SKILLS
              ├── PORTFOLIO
              ├── AVAILABILITY
              ├── CAPACITY RECORDS
              └── QUOTATIONS

USER
 └── NOTIFICATIONS

USER
 └── VERIFICATION

ORDER
 └── AI PREDICTIONS
```

## 25. Database Design Considerations

The database should:

* Use primary keys for all major entities.
* Use foreign keys to maintain relationships.
* Apply appropriate unique constraints.
* Validate required fields.
* Maintain timestamps for important records.
* Store passwords only as secure hashes.
* Avoid unnecessary duplication of data.
* Maintain historical information required for AI and analytics.
* Support future expansion of AI and marketplace functionality.
