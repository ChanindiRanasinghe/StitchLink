# StitchLink Assumptions and Constraints

## 1. Assumptions

The following assumptions are made during the planning and development of StitchLink.

### 1.1 User Assumptions

* Clothing shops and solo/home-based dressmakers will have access to the internet.
* Users will provide accurate information when creating their profiles.
* Dressmakers will provide accurate information about their skills, experience, availability, and production capacity.
* Clothing shops will provide accurate order requirements.
* Users will have basic knowledge of using web applications.
* Users will be responsible for reviewing information before submitting requests, quotations, or orders.

### 1.2 Marketplace Assumptions

* Clothing shops will use StitchLink to find suitable dressmakers and submit order requests.
* Dressmakers will use StitchLink to discover potential orders and submit quotations.
* A single order request may receive multiple quotations.
* An order will be created after a quotation is accepted.
* Reviews and ratings will be available after eligible orders are completed.

### 1.3 AI/ML Assumptions

* Sufficient historical data may be required before some AI/ML models can produce reliable predictions.
* AI recommendations and predictions will support user decisions rather than automatically make final decisions.
* AI model performance will depend on the quality and quantity of available data.
* Category relevance detection will initially focus on clothing categories supported by StitchLink.
* AI-based image validation may require suitable training or pre-trained models and sufficient image quality.
* AI-generated results may require user review before being used for important decisions.

### 1.4 Data Assumptions

* The system will collect structured information about users, orders, quotations, production, and marketplace activity.
* Historical data will gradually increase as the platform is used.
* Data required for analytics and AI will be stored in an appropriate structured format.
* Users will provide valid information and uploaded files.

## 2. Constraints

### 2.1 Project Duration

* The project will be developed within the available academic project timeline.
* Development activities will be divided into defined sprints.
* Features may be prioritized based on available development time.

### 2.2 Individual Development

* StitchLink is an individual project.
* System design, development, testing, documentation, and deployment will be managed within the available individual development capacity.
* The scope must remain realistic for completion within the academic timeline.

### 2.3 Technical Constraints

* The frontend will use Next.js, TypeScript, and Tailwind CSS.
* The backend will use Python and FastAPI.
* PostgreSQL will be used as the primary relational database.
* Python will be used for AI/ML and data analysis.
* Tableau will be used for selected analytics visualizations.
* External services may have usage limits, pricing, or technical restrictions.

### 2.4 Data Availability

* AI and machine learning features may initially have limited historical data.
* Some AI features may therefore use prototype models, pre-trained models, rule-based validation, or limited datasets during development.
* Prediction accuracy may improve as more relevant data becomes available.

### 2.5 Internet and Infrastructure

* The system requires internet connectivity for normal cloud-based operation.
* Availability of third-party services may affect certain features.
* Cloud hosting and storage resources may have limits based on the selected plans.

### 2.6 Security and Privacy

* User information must be protected from unauthorized access.
* Authentication credentials must be securely stored.
* Sensitive configuration values must not be committed to the public GitHub repository.
* Access to user and marketplace information must follow role-based permissions.

### 2.7 AI Limitations

* AI-generated recommendations and predictions are not guaranteed to be correct.
* Incorrect or incomplete input data may affect AI results.
* Some AI features may require further model training and evaluation before production use.
* AI results should be presented as decision-support information rather than guaranteed outcomes.

### 2.8 Scope Constraints

The initial system will focus on:

* Clothing shops
* Solo/home-based dressmakers
* Clothing-related marketplace activities
* Order requests
* Quotations
* Order management
* AI-supported matching and assistance
* Analytics

Additional features outside the defined scope may be considered as future enhancements.
