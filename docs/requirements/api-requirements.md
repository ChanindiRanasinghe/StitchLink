# StitchLink API Requirements

## 1. Overview

The StitchLink backend will provide REST APIs using Python and FastAPI.

The APIs will allow the Next.js frontend to communicate with the backend and access authentication, marketplace, order management, AI, messaging, notification, administration, and analytics functionality.

## 2. Authentication APIs

| Method | Endpoint                    | Purpose                            |
| ------ | --------------------------- | ---------------------------------- |
| POST   | `/api/auth/register`        | Register a new user                |
| POST   | `/api/auth/login`           | Authenticate a user                |
| POST   | `/api/auth/logout`          | Log out a user                     |
| POST   | `/api/auth/refresh`         | Refresh authentication credentials |
| POST   | `/api/auth/forgot-password` | Request password reset             |
| POST   | `/api/auth/reset-password`  | Reset password                     |
| GET    | `/api/auth/me`              | Get current user information       |

## 3. User APIs

| Method | Endpoint               | Purpose                 |
| ------ | ---------------------- | ----------------------- |
| GET    | `/api/users/{user_id}` | Get user information    |
| PUT    | `/api/users/{user_id}` | Update user information |
| DELETE | `/api/users/{user_id}` | Deactivate user account |

Access to user information should be controlled according to user roles and privacy requirements.

## 4. Shop Profile APIs

| Method | Endpoint               | Purpose             |
| ------ | ---------------------- | ------------------- |
| GET    | `/api/shops/{shop_id}` | Get shop profile    |
| POST   | `/api/shops/profile`   | Create shop profile |
| PUT    | `/api/shops/profile`   | Update shop profile |
| GET    | `/api/shops`           | Search/list shops   |

## 5. Dressmaker Profile APIs

| Method | Endpoint                           | Purpose                   |
| ------ | ---------------------------------- | ------------------------- |
| GET    | `/api/dressmakers/{dressmaker_id}` | Get dressmaker profile    |
| POST   | `/api/dressmakers/profile`         | Create dressmaker profile |
| PUT    | `/api/dressmakers/profile`         | Update dressmaker profile |
| GET    | `/api/dressmakers`                 | Search/list dressmakers   |

## 6. Skills and Portfolio APIs

### Skills

| Method | Endpoint                             | Purpose                   |
| ------ | ------------------------------------ | ------------------------- |
| GET    | `/api/skills`                        | Get available skills      |
| POST   | `/api/dressmakers/skills`            | Add a dressmaker skill    |
| DELETE | `/api/dressmakers/skills/{skill_id}` | Remove a dressmaker skill |

### Portfolio

| Method | Endpoint                                     | Purpose               |
| ------ | -------------------------------------------- | --------------------- |
| GET    | `/api/dressmakers/{dressmaker_id}/portfolio` | View portfolio        |
| POST   | `/api/dressmakers/portfolio`                 | Add portfolio item    |
| PUT    | `/api/dressmakers/portfolio/{portfolio_id}`  | Update portfolio item |
| DELETE | `/api/dressmakers/portfolio/{portfolio_id}`  | Delete portfolio item |

## 7. Clothing Category APIs

| Method | Endpoint                        | Purpose                    |
| ------ | ------------------------------- | -------------------------- |
| GET    | `/api/categories`               | Get clothing categories    |
| POST   | `/api/categories`               | Create category            |
| PUT    | `/api/categories/{category_id}` | Update category            |
| DELETE | `/api/categories/{category_id}` | Remove/deactivate category |

Category management should be restricted to administrators.

## 8. Order Request APIs

| Method | Endpoint                           | Purpose                     |
| ------ | ---------------------------------- | --------------------------- |
| GET    | `/api/order-requests`              | Browse order requests       |
| GET    | `/api/order-requests/{request_id}` | View order request          |
| POST   | `/api/order-requests`              | Create order request        |
| PUT    | `/api/order-requests/{request_id}` | Update order request        |
| DELETE | `/api/order-requests/{request_id}` | Cancel/remove order request |
| GET    | `/api/shops/order-requests`        | View shop's requests        |

## 9. Order Request Image APIs

| Method | Endpoint                                  | Purpose                |
| ------ | ----------------------------------------- | ---------------------- |
| POST   | `/api/order-requests/{request_id}/images` | Upload reference image |
| GET    | `/api/order-requests/{request_id}/images` | View reference images  |
| DELETE | `/api/order-requests/images/{image_id}`   | Remove reference image |

Uploaded files should be validated for supported file types and size limits.

## 10. Quotation APIs

| Method | Endpoint                                      | Purpose          |
| ------ | --------------------------------------------- | ---------------- |
| GET    | `/api/order-requests/{request_id}/quotations` | View quotations  |
| GET    | `/api/quotations/{quotation_id}`              | View quotation   |
| POST   | `/api/order-requests/{request_id}/quotations` | Submit quotation |
| PUT    | `/api/quotations/{quotation_id}`              | Update quotation |
| POST   | `/api/quotations/{quotation_id}/accept`       | Accept quotation |
| POST   | `/api/quotations/{quotation_id}/reject`       | Reject quotation |

Only authorized users should be able to access quotations related to their orders.

## 11. Order APIs

| Method | Endpoint                          | Purpose                 |
| ------ | --------------------------------- | ----------------------- |
| GET    | `/api/orders`                     | List user's orders      |
| GET    | `/api/orders/{order_id}`          | View order              |
| POST   | `/api/orders/{order_id}/confirm`  | Confirm order           |
| PUT    | `/api/orders/{order_id}/status`   | Update order status     |
| POST   | `/api/orders/{order_id}/cancel`   | Cancel order            |
| POST   | `/api/orders/{order_id}/complete` | Mark order as completed |

## 12. Availability and Capacity APIs

### Availability

| Method | Endpoint                                          | Purpose             |
| ------ | ------------------------------------------------- | ------------------- |
| GET    | `/api/dressmakers/{dressmaker_id}/availability`   | View availability   |
| POST   | `/api/dressmakers/availability`                   | Add availability    |
| PUT    | `/api/dressmakers/availability/{availability_id}` | Update availability |
| DELETE | `/api/dressmakers/availability/{availability_id}` | Remove availability |

### Capacity

| Method | Endpoint                                               | Purpose                   |
| ------ | ------------------------------------------------------ | ------------------------- |
| GET    | `/api/dressmakers/{dressmaker_id}/capacity`            | View capacity information |
| GET    | `/api/dressmakers/{dressmaker_id}/capacity/prediction` | Get capacity prediction   |

## 13. AI Matching APIs

| Method | Endpoint                                | Purpose                                 |
| ------ | --------------------------------------- | --------------------------------------- |
| GET    | `/api/ai/matching/{request_id}`         | Get suitable dressmaker recommendations |
| POST   | `/api/ai/matching/{request_id}/refresh` | Recalculate matching results            |

The matching service may consider skills, specialization, experience, location, availability, capacity, pricing, and performance.

## 14. AI Quotation APIs

| Method | Endpoint                        | Purpose                        |
| ------ | ------------------------------- | ------------------------------ |
| POST   | `/api/ai/quotation/estimate`    | Generate quotation estimate    |
| POST   | `/api/ai/quotation/suggestions` | Generate quotation suggestions |

The AI quotation service should return an estimate that the dressmaker can review before submitting the final quotation.

## 15. AI Category Relevance APIs

| Method | Endpoint                          | Purpose                                                          |
| ------ | --------------------------------- | ---------------------------------------------------------------- |
| POST   | `/api/ai/category/validate`       | Validate whether order information matches the selected category |
| POST   | `/api/ai/category/image-validate` | Validate an uploaded image against the selected category         |

Example:

```text
Selected Category: Frock
Order Description: Need 20 trousers
```

The API may return:

```json
{
  "is_relevant": false,
  "selected_category": "Frock",
  "detected_category": "Trouser",
  "message": "The information provided may not match the selected category."
}
```

The frontend can then display a warning and allow the user to correct the information.

## 16. AI Demand Prediction APIs

| Method | Endpoint                    | Purpose                     |
| ------ | --------------------------- | --------------------------- |
| GET    | `/api/ai/demand/prediction` | Retrieve demand predictions |
| POST   | `/api/ai/demand/predict`    | Generate demand prediction  |

## 17. AI Production Risk APIs

| Method | Endpoint                          | Purpose                       |
| ------ | --------------------------------- | ----------------------------- |
| GET    | `/api/ai/risk/orders/{order_id}`  | View production risks         |
| POST   | `/api/ai/risk/analyze/{order_id}` | Analyse order production risk |

## 18. Messaging APIs

| Method | Endpoint                          | Purpose                      |
| ------ | --------------------------------- | ---------------------------- |
| GET    | `/api/messages`                   | Get user conversations       |
| GET    | `/api/messages/{user_id}`         | Get conversation with a user |
| POST   | `/api/messages`                   | Send message                 |
| PUT    | `/api/messages/{message_id}/read` | Mark message as read         |

## 19. Notification APIs

| Method | Endpoint                                    | Purpose                        |
| ------ | ------------------------------------------- | ------------------------------ |
| GET    | `/api/notifications`                        | Get user notifications         |
| PUT    | `/api/notifications/{notification_id}/read` | Mark notification as read      |
| PUT    | `/api/notifications/read-all`               | Mark all notifications as read |

## 20. Review and Rating APIs

| Method | Endpoint                         | Purpose           |
| ------ | -------------------------------- | ----------------- |
| GET    | `/api/users/{user_id}/reviews`   | View user reviews |
| POST   | `/api/orders/{order_id}/reviews` | Submit review     |
| PUT    | `/api/reviews/{review_id}`       | Update review     |
| DELETE | `/api/reviews/{review_id}`       | Delete review     |

Reviews should only be submitted for eligible completed orders.

## 21. Administration APIs

| Method | Endpoint                            | Purpose                  |
| ------ | ----------------------------------- | ------------------------ |
| GET    | `/api/admin/users`                  | View users               |
| PUT    | `/api/admin/users/{user_id}/status` | Update user status       |
| PUT    | `/api/admin/users/{user_id}/verify` | Verify user              |
| GET    | `/api/admin/orders`                 | Monitor orders           |
| GET    | `/api/admin/quotations`             | Monitor quotations       |
| GET    | `/api/admin/statistics`             | View platform statistics |
| GET    | `/api/admin/activity`               | View system activity     |

Administrative endpoints must be protected using role-based authorization.

## 22. Analytics APIs

| Method | Endpoint                     | Purpose                              |
| ------ | ---------------------------- | ------------------------------------ |
| GET    | `/api/analytics/overview`    | Get marketplace overview             |
| GET    | `/api/analytics/orders`      | Get order analytics                  |
| GET    | `/api/analytics/demand`      | Get demand analytics                 |
| GET    | `/api/analytics/capacity`    | Get capacity analytics               |
| GET    | `/api/analytics/performance` | Get dressmaker performance analytics |
| GET    | `/api/analytics/risk`        | Get production risk analytics        |

Analytics data may also be extracted for Python analysis and Tableau dashboards.

## 23. API Security Requirements

The API should:

* Authenticate protected requests.
* Enforce Role-Based Access Control.
* Validate request data.
* Validate uploaded files.
* Protect sensitive information.
* Prevent unauthorized resource access.
* Use secure password hashing.
* Protect authentication
