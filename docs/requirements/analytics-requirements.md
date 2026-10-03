# StitchLink Analytics Requirements

## 1. Overview

StitchLink will collect and analyse marketplace, order, user, quotation, production, and performance data.

Analytics will help users and administrators understand marketplace activity, identify trends, monitor performance, and support data-driven decisions.

Analytics will be developed using Python for data analysis and Tableau for interactive visualization.

## 2. Marketplace Analytics

The system should provide information about overall marketplace activity, including:

* Number of registered clothing shops
* Number of registered dressmakers
* Number of active users
* Number of active order requests
* Number of completed orders
* Number of cancelled orders
* Number of quotations submitted
* Number of accepted quotations

These metrics can be monitored over different time periods.

## 3. Order Analytics

The system should analyse order-related information such as:

* Orders by clothing category
* Orders by location
* Orders by quantity
* Orders by time period
* Completed orders
* Pending orders
* Cancelled orders
* Average order completion time
* Order success/completion rate
* Average order value

This information can help identify marketplace trends.

## 4. Dressmaker Performance Analytics

The system should provide analytics related to dressmaker activity and performance.

Possible metrics include:

* Number of orders received
* Number of completed orders
* Number of cancelled orders
* Average completion time
* Quotation acceptance rate
* Average rating
* Number of reviews
* Current workload
* Capacity utilization
* On-time completion rate

These analytics can also support AI-based matching and recommendations.

## 5. Clothing Shop Analytics

The system can provide shop-related analytics such as:

* Number of order requests created
* Number of quotations received
* Quotation acceptance rate
* Number of completed orders
* Average order value
* Most requested clothing categories
* Average time taken to select a dressmaker
* Shop activity over time

## 6. Quotation Analytics

The system should analyse quotation-related information such as:

* Number of quotations submitted
* Average quotation value
* Quotation acceptance rate
* Quotation rejection rate
* Average quotation response time
* Quotation values by clothing category
* Historical quotation trends

This data can support the AI quotation assistant.

## 7. Demand Analytics

The system should analyse demand patterns across the marketplace.

Possible analytics include:

* Most requested clothing categories
* Demand by location
* Demand by time period
* Changes in demand over time
* Seasonal demand patterns
* Average quantity requested by category
* Emerging clothing categories

These insights can support demand prediction.

## 8. Capacity Analytics

The system should analyse dressmaker production capacity.

Possible metrics include:

* Current workload
* Available capacity
* Capacity utilization
* Number of active orders
* Average production time
* Workload by time period
* Overloaded dressmakers
* Available dressmakers

These analytics can support capacity prediction and AI matching.

## 9. Production Risk Analytics

The system should analyse production risk information such as:

* Number of orders with detected risks
* Types of detected risks
* Orders approaching deadlines
* Delayed orders
* Risk frequency by clothing category
* Risk frequency by dressmaker
* Completed orders affected by delays

This information can help identify recurring production problems.

## 10. Geographic Analytics

Where location information is available, the system can analyse:

* Number of dressmakers by location
* Number of shops by location
* Order demand by location
* Dressmaker supply by location
* Areas with high demand
* Areas with limited dressmaker availability

Geographic insights can support marketplace matching and planning.

## 11. User and Platform Analytics

Administrators should be able to monitor:

* New user registrations
* Active users
* User growth over time
* User distribution by role
* Verified and unverified users
* User activity
* Suspended or deactivated accounts

## 12. Dashboard Requirements

The system should provide analytics dashboards appropriate to different users.

### Administrator Dashboard

The administrator dashboard may display:

* Total users
* Active shops
* Active dressmakers
* Active orders
* Completed orders
* Marketplace growth
* Popular clothing categories
* Demand trends
* Geographic distribution
* Production risk statistics

### Dressmaker Dashboard

The dressmaker dashboard may display:

* Current orders
* Current workload
* Available capacity
* Order history
* Earnings/order values
* Ratings
* Performance trends
* Relevant demand trends

### Clothing Shop Dashboard

The shop dashboard may display:

* Active order requests
* Received quotations
* Accepted orders
* Completed orders
* Order history
* Spending/order values
* Frequently requested clothing categories

## 13. Tableau Analytics

Selected StitchLink datasets will be prepared for visualization using Tableau.

Potential Tableau dashboards include:

1. Marketplace Overview Dashboard
2. Order & Category Analysis Dashboard
3. Dressmaker Performance Dashboard
4. Demand Analysis Dashboard
5. Geographic Analysis Dashboard
6. Capacity & Production Risk Dashboard

## 14. Analytics Data Pipeline

The analytics workflow will follow:

StitchLink Database
→ Data Extraction
→ Data Cleaning
→ Data Transformation
→ Python Data Analysis
→ Prepared Dataset
→ Tableau
→ Interactive Dashboards

Python may be used for exploratory data analysis, statistical analysis, feature preparation, and machine learning-related analysis.

## 15. Analytics and AI Integration

Analytics data should support the AI components of StitchLink.

For example:

* Historical orders → Demand Prediction
* Order completion history → Capacity Prediction
* Quotation history → AI Quotation Assistant
* Dressmaker performance → AI Matching
* Production progress → Production Risk Detection

The system should maintain structured historical data so that analytics and AI models can improve as sufficient data becomes available.
