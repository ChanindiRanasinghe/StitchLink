# StitchLink Design System

## 1. Purpose

The StitchLink design system defines the visual and interaction standards used throughout the application.

The purpose is to maintain a consistent, professional, accessible, and responsive interface across all user roles and screens.

## 2. Design Direction

StitchLink will use a modern B2B marketplace visual style.

The interface should communicate:

* Trust
* Professionalism
* Simplicity
* Creativity
* Reliability
* Accessibility

The design should avoid unnecessary visual complexity and prioritize clear information and user actions.

## 3. Color System

### Primary Color

**Deep Purple**

Used for:

* Primary buttons
* Main navigation highlights
* Important actions
* Links
* Selected states

Suggested color:

`#6C4AB6`

### Secondary Color

**Soft Purple**

Used for:

* Secondary interface elements
* Background highlights
* AI recommendation areas
* Supporting visual elements

Suggested color:

`#EDE7F6`

### Accent Color

**Teal**

Used for:

* Success-related information
* Positive indicators
* Availability indicators
* Supporting dashboard visualizations

Suggested color:

`#2A9D8F`

### Neutral Colors

* Primary text: `#1F2937`
* Secondary text: `#6B7280`
* Border: `#E5E7EB`
* Background: `#F9FAFB`
* White: `#FFFFFF`

### Status Colors

**Success**

* `#16A34A`

**Warning**

* `#F59E0B`

**Error**

* `#DC2626`

**Information**

* `#2563EB`

Status colors should always be accompanied by text or icons rather than relying only on color.

## 4. Typography

### Primary Font

Use **Inter** as the primary interface font.

### Heading Hierarchy

**H1**

* Large page titles
* Strong emphasis

**H2**

* Major sections

**H3**

* Subsections and cards

**Body**

* Regular interface text

**Caption**

* Supporting information
* Metadata
* Timestamps

Typography should prioritize readability and clear hierarchy.

## 5. Spacing System

Use a consistent spacing scale based on multiples of 4px.

Primary spacing values:

* 4px
* 8px
* 12px
* 16px
* 24px
* 32px
* 40px
* 48px
* 64px

Avoid arbitrary spacing values where an existing spacing value can be used.

## 6. Border Radius

Use moderate rounded corners throughout the interface.

Suggested values:

* Small elements: `6px`
* Buttons and inputs: `8px`
* Cards: `12px`
* Large containers: `16px`

The interface should feel modern without excessive use of rounded elements.

## 7. Buttons

### Primary Button

Used for the main action on a page.

Examples:

* Create Order Request
* Submit Quotation
* Accept Quotation
* Save Changes

### Secondary Button

Used for supporting actions.

Examples:

* Cancel
* View Details
* Edit

### Destructive Button

Used for actions that may remove or negatively affect data.

Examples:

* Delete
* Reject
* Suspend

Destructive actions should require confirmation where appropriate.

## 8. Form Components

Standard form components include:

* Text input
* Text area
* Dropdown
* Search input
* Category selector
* Date selector
* Number input
* Checkbox
* Radio button
* Toggle
* File upload
* Image upload
* Location selector

Each form field should include:

* Label
* Input area
* Optional helper text
* Validation state
* Error message where required

## 9. Cards

Cards will be used to display grouped information.

### Dressmaker Card

Can contain:

* Profile image
* Name
* Location
* Skills
* Categories
* Rating
* Availability
* Verification status
* AI match percentage or indicator
* View Profile action

### Order Request Card

Can contain:

* Clothing category
* Order title
* Quantity
* Deadline
* Location
* Budget information
* Request status
* View Details action

### Quotation Card

Can contain:

* Dressmaker information
* Proposed price
* Estimated completion time
* Rating
* Quotation status
* AI pricing insight
* Accept/Reject actions

## 10. AI Components

AI-generated information should have a visually consistent but clearly identifiable presentation.

### AI Recommendation Card

Used for:

* Dressmaker matching
* Quotation assistance
* Demand prediction
* Capacity prediction

Should contain:

* AI label
* Recommendation
* Short explanation
* Relevant supporting factors
* User action where applicable

### AI Warning

Used for:

* Category mismatch
* Production risk
* Capacity warning

Should contain:

* Warning indicator
* Clear explanation
* Recommended action where appropriate

AI outputs should never appear as unquestionable facts.

## 11. Category Validation Component

The category validation component will be used when users enter order information or upload images.

Example:

**Selected Category:** Frock

**Detected Category:** Trouser

**Message:**
"The information provided may not match the selected category."

Actions:

* Review Information
* Change Category
* Continue Anyway

The system should clearly communicate that the detection is an AI-assisted recommendation.

## 12. Navigation

### Desktop

Use:

* Left sidebar for authenticated users
* Top bar for account, notifications, and language
* Breadcrumbs where useful

### Public Pages

Use:

* Logo
* Navigation links
* Language selector
* Login
* Register

## 13. Dashboard Layout

Dashboards should follow a consistent structure:

1. Page title
2. Summary cards
3. Important alerts
4. Main data/content
5. AI insights
6. Charts or analytics
7. Recent activity

Important information should appear before detailed analytics.

## 14. Maps and Location

Location-based features should use:

* Search location
* Location filters
* Distance information
* Map view
* List view

Users should be able to switch between map and list views where appropriate.

Location should support matching and discovery but should not unnecessarily expose sensitive location information.

## 15. Notifications

Notifications should use clear categories:

* Order
* Quotation
* Message
* Matching
* Capacity
* Production Risk
* System

Notifications should provide enough information for the user to understand what happened and what action may be required.

## 16. Tables

Tables should be used when users need to compare or manage structured information.

Examples:

* User management
* Orders
* Quotations
* Verification requests
* Analytics records

Tables should support:

* Search
* Filtering
* Sorting
* Pagination where necessary

## 17. Charts

Charts should prioritize readability.

Suitable charts include:

* Bar charts
* Line charts
* Pie/donut charts where appropriate
* Area charts
* Geographic visualizations

Charts should include clear titles, labels, and supporting information.

## 18. Responsive Design

The design should adapt to:

* Desktop
* Laptop
* Tablet
* Mobile web

Desktop layouts should not simply be scaled down for mobile. Navigation, cards, tables, and forms should adapt to smaller screens.

## 19. Accessibility

The design should include:

* Readable typography
* Sufficient color contrast
* Clear labels
* Visible focus states
* Keyboard-friendly interactions
* Meaningful error messages
* Alternative text for meaningful images
* Icons accompanied by text where necessary

## 20. Multilingual Design

The interface must accommodate:

* English
* Sinhala
* Tamil

Layouts should allow for text expansion so that longer translations do not break buttons, cards, navigation, or forms.

## 21. Figma Organization

The Figma project should be organized into:

### Page 1 — Cover

* StitchLink logo
* Project title
* Version information

### Page 2 — Design System

* Colors
* Typography
* Spacing
* Buttons
* Inputs
* Cards
* Status indicators
* AI components

### Page 3 — User Flows

* Shop flow
* Dressmaker flow
* Admin flow
* AI interaction flows

### Page 4 — Wireframes

* Low-fidelity layouts

### Page 5 — High-Fidelity Screens

* Final UI designs

### Page 6 — Prototype

* Interactive user flows

## 22. Design Consistency Rules

All StitchLink screens should:

* Use the same typography system
* Use the same spacing system
* Use consistent buttons
* Use consistent form components
* Use consistent cards
* Use consistent status indicators
* Use consistent navigation
* Use consistent AI components
* Follow the same responsive principles
* Maintain the same visual hierarchy
