# StitchLink Roles and Permissions

## 1. Overview

StitchLink has three main user roles:

- Clothing Shop
- Solo/Home-Based Dressmaker
- System Administrator

Each role has different permissions based on its responsibilities within the platform.

## 2. Role: Clothing Shop

A Clothing Shop can:

- Register and log in
- Create and manage its business profile
- Create dressmaking order requests
- Specify order requirements such as category, quantity, deadline, budget, and location
- Search and browse dressmakers
- View dressmaker profiles and portfolios
- Receive AI-based dressmaker recommendations
- Compare suitable dressmakers
- Request quotations
- View and compare quotations
- Accept or reject quotations
- Track order progress
- Communicate with dressmakers
- Receive notifications
- Review and rate dressmakers
- View previous orders

## 3. Role: Solo/Home-Based Dressmaker

A Solo/Home-Based Dressmaker can:

- Register and log in
- Create and manage a professional profile
- Add skills and clothing specializations
- Add experience and portfolio items
- Set location and service areas
- Set pricing information
- Manage availability and production capacity
- Browse available shop order requests
- Receive AI-based order recommendations
- View order requirements
- Submit quotations
- Manage submitted quotations
- Accept assigned orders
- Update order progress
- Communicate with clothing shops
- Receive notifications
- View reviews and ratings
- Review and rate clothing shops
- View previous and current orders

## 4. Role: System Administrator

The System Administrator can:

- Log in to the administration panel
- Manage user accounts
- View and manage clothing shops
- View and manage dressmakers
- Verify user profiles
- Manage user roles and permissions
- Manage clothing categories
- Monitor marketplace activities
- View and manage orders
- Monitor quotations
- Handle reported issues and disputes
- Suspend or deactivate accounts when necessary
- View system statistics
- View analytics dashboards
- Monitor system activity
- Manage platform-level settings

## 5. Permission Summary

| Permission | Shop | Dressmaker | Admin |
|---|---:|---:|---:|
| Register/Login | ✓ | ✓ | ✓ |
| Manage Own Profile | ✓ | ✓ | ✓ |
| Create Order Requests | ✓ | ✗ | ✓ |
| Browse Order Requests | ✓ | ✓ | ✓ |
| Browse Dressmakers | ✓ | ✗ | ✓ |
| Submit Quotations | ✗ | ✓ | ✓ |
| Manage Quotations | ✓ | ✓ | ✓ |
| Accept/Reject Quotations | ✓ | ✗ | ✓ |
| Manage Orders | ✓ | ✓ | ✓ |
| Update Order Progress | ✗ | ✓ | ✓ |
| Messaging | ✓ | ✓ | ✓ |
| Receive Notifications | ✓ | ✓ | ✓ |
| Reviews & Ratings | ✓ | ✓ | ✓ |
| Manage Users | ✗ | ✗ | ✓ |
| Verify Users | ✗ | ✗ | ✓ |
| Manage Categories | ✗ | ✗ | ✓ |
| Handle Disputes | ✗ | ✗ | ✓ |
| View System Analytics | ✗ | ✗ | ✓ |

## 6. Access Control

StitchLink will use Role-Based Access Control (RBAC).

Users will only be able to access functions permitted for their assigned role. This will be enforced at both the frontend and backend levels.

The three main roles are:

- `SHOP`
- `DRESSMAKER`
- `ADMIN`