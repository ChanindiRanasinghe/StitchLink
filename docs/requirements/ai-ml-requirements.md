# StitchLink AI/ML Requirements

## 1. Overview

StitchLink will use Artificial Intelligence and Machine Learning to improve marketplace matching, quotation support, capacity planning, demand forecasting, production monitoring, and data quality.

The AI features are designed to support users rather than replace their decisions.

## 2. AI-Based Dressmaker Matching

The system will recommend suitable dressmakers for clothing shop order requests.

The matching system may consider:

* Clothing skills
* Clothing specialization
* Experience
* Location
* Availability
* Production capacity
* Pricing
* Previous performance
* Ratings and reviews
* Order requirements

### Expected Output

The system will generate a ranked list of potentially suitable dressmakers with matching scores and relevant reasons for the recommendations.

---

## 3. AI-Assisted Quotation

The system will assist dressmakers in preparing suitable quotations for shop orders.

The system may consider:

* Clothing category
* Order quantity
* Material costs
* Labour requirements
* Estimated production time
* Historical quotation information
* Previous similar orders

### Expected Output

The system will provide an estimated price range and/or suggested quotation to assist the dressmaker.

The dressmaker will remain responsible for reviewing and submitting the final quotation.

---

## 4. AI-Based Capacity Prediction

The system will analyse dressmaker workload and historical order information to estimate future production capacity.

The system may consider:

* Current active orders
* Order quantities
* Deadlines
* Historical completion times
* Working capacity
* Availability
* Previous workload

### Expected Output

The system can identify:

* Available capacity
* High workload periods
* Potential overloading
* Estimated ability to accept additional orders

Capacity information can also support the AI matching system.

---

## 5. AI-Based Demand Prediction

The system will analyse historical marketplace data to identify potential future demand.

The system may consider:

* Clothing categories
* Order quantities
* Time periods
* Locations
* Seasonal patterns
* Historical order trends

### Expected Output

The system can provide demand forecasts and trends that may help users plan future production and marketplace activities.

---

## 6. AI-Based Production Risk Detection

The system will monitor active orders and identify potential production risks.

The system may consider:

* Order deadline
* Current progress
* Remaining work
* Order quantity
* Dressmaker workload
* Previous delays
* Available production capacity

### Expected Output

The system can identify potential risks such as:

* Possible deadline delays
* Excessive workload
* Insufficient production capacity
* Orders requiring attention

The system can notify relevant users when significant risks are detected.

---

## 7. AI-Based Category Relevance Detection

The system will check whether the information provided by a user is relevant to the selected clothing category.

For example:

* Selected category: Frock
* Entered description: Trouser order

The system should detect the mismatch and notify the user before the request is submitted.

### Text-Based Validation

The system can analyse:

* Order title
* Description
* Clothing-related keywords
* Other entered order information

The detected clothing type will be compared with the selected category.

### Image-Based Validation

Where a reference image is uploaded, the system may analyse the image to identify the clothing type.

For example:

* Selected category: Frock
* Uploaded image: Trouser
* Detected category: Trouser

The system will notify the user that the selected category and uploaded image may not match.

### Expected Response

For a mismatch, the system can display a message such as:

> The information provided appears to be related to trousers, but the selected category is Frock. Please review your category or order details.

The user should be able to correct the information before submitting the order.

This validation should support all clothing categories available on StitchLink.

---

## 8. AI Feature Interaction

The AI features should work together where appropriate.

For example:

Order Request
→ Category Relevance Validation
→ AI Dressmaker Matching
→ Capacity Analysis
→ Quotation Assistance
→ Production Risk Monitoring

The outputs of one AI feature may provide useful information for another feature.

For example, capacity predictions can be considered when recommending dressmakers for a new order.

---

## 9. AI Data Requirements

The AI/ML components may require data such as:

* User profiles
* Dressmaker skills
* Clothing categories
* Order information
* Order quantities
* Locations
* Availability
* Production capacity
* Quotations
* Historical prices
* Order completion times
* Ratings and reviews
* Order status history
* Production progress
* Historical demand

The system should collect and store data in a structured manner so that it can later be used for model development and evaluation.

---

## 10. AI Reliability and Transparency

AI-generated recommendations and predictions should be treated as decision-support information.

The system should:

* Provide understandable recommendations where possible.
* Avoid presenting predictions as guaranteed results.
* Allow users to make the final decision.
* Validate AI outputs where appropriate.
* Monitor model performance.
* Handle uncertain predictions appropriately.
* Allow users to correct incorrect information.

## 11. AI Evaluation

Each AI feature should be evaluated using suitable performance measures.

Possible evaluation methods include:

* Matching recommendation accuracy
* Classification accuracy for category detection
* Quotation prediction error
* Capacity prediction error
* Demand forecasting error
* Production risk detection performance

The evaluation method will depend on the specific AI/ML technique and available dataset.
