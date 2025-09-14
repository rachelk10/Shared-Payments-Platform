# UI/UX Wireframes and Design System

## Design System

### Colors
```css
/* Primary Colors */
.primary-gradient {
  background: linear-gradient(135deg, #007AFF, #5856D6);
}
.secondary {
  color: #5856D6;
}
.success {
  color: #34C759;
}
.warning {
  color: #FF9500;
}
.danger {
  color: #FF3B30;
}

/* Background Colors */
.background {
  background: #F2F2F7;
}
.card-background {
  background: #FFFFFF;
}
.header-background {
  background: linear-gradient(135deg, #007AFF, #00C6FF);
}

/* Text Colors */
.text {
  color: #333333;
}
.subtext {
  color: #6E6E73;
}

/* Shadows */
.shadow {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}
```

### Typography
```css
/* Font Family */
body {
  font-family: -apple-system, system-ui, sans-serif;
}

/* Headings */
h1 {
  font-weight: bold;
  font-size: 28px;
  /* Optional gradient text */
  background: linear-gradient(135deg, #007AFF, #5856D6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

h2 {
  font-weight: bold;
  font-size: 24px;
}

h3 {
  font-weight: bold;
  font-size: 20px;
}

h4 {
  font-weight: bold;
  font-size: 16px;
}

/* Body Text */
.body-text {
  font-weight: regular;
  font-size: 16px;
  color: #333333;
}

/* Labels */
.label {
  font-weight: 500;
  font-size: 14px;
}

/* Small Text */
.small-text {
  font-weight: regular;
  font-size: 12px;
}
```

### Components

#### Buttons
```css
/* Primary Button */
.button-primary {
  background: linear-gradient(135deg, #007AFF, #5856D6);
  color: white;
  padding: 14px 28px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  transition: all 0.2s ease;
}

.button-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0,0,0,0.2);
}

/* Secondary Button */
.button-secondary {
  background: transparent;
  border: 2px solid #007AFF;
  color: #007AFF;
  padding: 12px 26px;
  border-radius: 12px;
  transition: all 0.2s ease;
}

.button-secondary:hover {
  background: #007AFF;
  color: white;
}

/* Danger Button */
.button-danger {
  background: #FF3B30;
  color: white;
  padding: 12px 26px;
  border-radius: 12px;
  transition: all 0.2s ease;
}

.button-danger:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 10px rgba(0,0,0,0.2);
}
```

#### Cards
```css
/* Card Component */
.card {
  background: #FFFFFF;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  padding: 20px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(0,0,0,0.2);
}
```

#### Forms
```css
/* Input Field */
.input {
  height: 48px;
  padding: 14px;
  border-radius: 12px;
  border: 1px solid #C7C7CC;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.input:focus {
  border-color: #007AFF;
  box-shadow: 0 0 0 3px rgba(0,122,255,0.2);
}

/* Select Field */
.select {
  height: 48px;
  appearance: none;
  padding: 14px;
  border-radius: 12px;
  border: 1px solid #C7C7CC;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.select:focus {
  border-color: #007AFF;
  box-shadow: 0 0 0 3px rgba(0,122,255,0.2);
}

/* Form Group with Floating Labels */
.form-group {
  position: relative;
  margin-bottom: 24px;
}

.form-label {
  position: absolute;
  top: 12px;
  left: 14px;
  font-size: 14px;
  color: #6E6E73;
  pointer-events: none;
  transition: all 0.2s ease;
}

.input:focus + .form-label,
.input:not(:placeholder-shown) + .form-label {
  top: -8px;
  left: 12px;
  font-size: 12px;
  color: #007AFF;
  background: #F2F2F7;
  padding: 0 4px;
}
```

## Key Screens

### 1. Dashboard
```
+----------------------------------+
|        Header Gradient           |
|   (135deg, #007AFF, #00C6FF)    |
+----------------------------------+
| Nav    |     Main Content        |
|        |                         |
| Groups |   [Hover Cards]         |
| Meters |    • Group Overview     |
|Payments|    • Recent Activity    |
|Settings|    • Meter Alerts       |
|        |                         |
+----------------------------------+
```

### 2. Payment Creation Form
```
+----------------------------------+
|     Create New Payment           |
+----------------------------------+
| .form-group                      |
|   [Amount Input with Label]      |
|                                  |
| .form-group                      |
|   [Description Input]            |
|                                  |
| .form-group                      |
|   [Date Select]                  |
|                                  |
| .card                           |
|   [Distribution Preview]         |
|                                  |
| .button-primary                  |
|   [Create Payment]              |
+----------------------------------+
```

### 3. Meter Reading Entry
```
+----------------------------------+
|     Submit Meter Reading         |
+----------------------------------+
| .card                           |
|   Last Reading: 1234.5          |
|                                  |
| .form-group                      |
|   [New Reading Input]            |
|                                  |
| .form-group                      |
|   [Date Input]                   |
|                                  |
| [Photo Upload Area]              |
|                                  |
| .button-primary                  |
|   [Submit]                      |
+----------------------------------+
```

### 4. Group Management
```
+----------------------------------+
|     Group Settings              |
+----------------------------------+
| .card                           |
|   [Group Info]                   |
|                                  |
| .card                           |
|   [Participants List]            |
|   [Add Participant Button]       |
|                                  |
| .card                           |
|   [Payment Settings]             |
|   [Distribution Rules]           |
|                                  |
| .button-primary                  |
|   [Save Changes]                |
+----------------------------------+
```

## Responsive Adaptations

### Mobile View
- Stack all cards vertically
- Full-width buttons
- Collapsible navigation menu
- Simplified data views
- Touch-optimized inputs

### Tablet View
- Two-column card layout where appropriate
- Side navigation panel
- Expanded data visualizations
- Hybrid touch/mouse interactions

## Animation Guidelines

### Transitions
- Page transitions: 0.3s ease
- Button hover: 0.2s ease
- Card hover: 0.2s ease
- Form focus: 0.2s ease
- Navigation: 0.2s ease

### Loading States
```css
.loading-skeleton {
  background: linear-gradient(90deg, #F2F2F7 25%, #E5E5EA 50%, #F2F2F7 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
}
```

## Accessibility Features
- High contrast mode support
- Screen reader optimizations
- Keyboard navigation
- Focus indicators
- ARIA labels and roles
- Semantic HTML structure

## Icons and Visual Elements
- Line weight: 1.5px
- Corner radius: 12px
- Icon size: 24px
- Consistent padding: 20px
- Visual hierarchy through shadows