# Soul Speak Mental Health Advocates - Project Plan

---

## 1. Persona

**Name:** Soul Speak Mental Health Advocate  
**Age:** 38 years old  
**Background:**  
* A professional dedicated to mental well-being.  
* Actively seeks tools for stress management and mindfulness.

**Key Characteristics:**  
* Calm, empathetic, and introspective  
* Values evidence-based resources and supportive communities
* Seeks personalized mental health tools like mood tracking and guided meditations

---

## 2. UX Flow

1. **User Authentication:**
   - **Login/Registration:** Secure sign-in with email/password.
   - **Welcome/Tutorial:** A soft onboarding process introducing the app's core features.

2. **Home Screen:**  
   - **Hero Section:** Uplifting, calming welcome message with a call-to-action for exploring mental health tools.
   - **Main Features:** Access to Guided Meditations, Mood Journal, Book Appointments, Personality Exam, and Resource Library..

3. **Feature Interaction:**  
   - **Guided Meditations:** Interactive list of meditation sessions by category (stress relief, sleep aid, focus).
   - **Mood Journal:**  Easy-to-use mood tracking interface with daily prompts and visualizations of mood history.
   - **Book an Appointment:** Calendar system for scheduling mental health consultations.
   - **Personality Exam:** Interactive personality tests with tailored wellness tips based on results.
   - **Hospital Location Registration:**  map interface allowing users to register their preferred hospital location for emergency contacts or consultation referrals.

4. **Community Engagement:**  
   - **Notifications:** Reminders for mood check-ins, upcoming appointments, and new content releases.

5. **Admin Workflow:**  
   - **User Support:** A support ticket system for handling user inquiries and feedback.
   

---

## 3. Layout and Navigation

* **Navigation Bar:**  
  + **Home:** Core mental health tools and a calming hero section.
  + **About Us:** Team information, vision, mission, and partnerships.
  + **Contact:** Support and feedback channels.
  + **Profile:** User settings and personalized features (saved meditations, mood history).

* **Screen Layouts:**  
  + **Home Screen:** Simple card-based design showcasing main services (Meditation, Mood Journal, Appointments, Personality Exam).
  + **Feature Pages:** Clean scrollable sections with calming colors and minimalist icons.
  + **Forms:** Intuitive, spacious design for appointment booking, journal entries, and hospital registration.


---

## 4. Color Scheme and Visual Style

* **Primary Colors:**  
  + **Soft Blue:** Conveys tranquility and calmness
  + **Deep Blue:** Represents trust and stability.

* **Accent Colors:**  
  + **Neutral Gray:** Ensures balance and subtle contrast
  + **Warm Beige:** Adds a touch of comfort and softness.

* **Visual Style:**  
  + **Calming and Supportive:** Soft gradients, gentle animations, and whitespace to promote ease of mind.
  + **User-Friendly:** Clear navigation, large touchpoints, and readable fonts for all ages.
  + **Minimalist and Intuitive:** Ensuring the design is simple yet impactful, focusing on user comfort and accessibility.

---

## 5. Entity Relational Database (ERD)

**Key Entities:**

1. **Users**
   - `user_id` (Primary Key)
   - `name`
   - `email`
   - `password`
   - `created_at`

2. **Mood Journal**
   - `entry_id` (Primary Key)
   - `user_id` (Foreign Key)
   - `mood`
   - `notes`
   - `timestamp`

3. **Appointments**
   - `appointment_id` (Primary Key)
   - `user_id` (Foreign Key)
   - `date_time`
   - `status` (e.g., pending, confirmed, completed)
   - `therapist_id` (Foreign Key)

4. **Guided Meditations**
   - `meditation_id` (Primary Key)
   - `title`
   - `category`
   - `duration`
   - `file_path`

5. **Personality Exams**
   - `exam_id` (Primary Key)
   - `user_id` (Foreign Key)
   - `score`
   - `result_category`
   - `timestamp`

6. **Resource Library**
   - `resource_id` (Primary Key)
   - `title`
   - `content_type` (e.g., article, video, PDF)
   - `url`

7. **Hospital Locations**
   - `hospital_id` (Primary Key)
   - `user_id` (Foreign Key)
   - `hospital_name`
   - `address`
   - `latitude`
   - `longitude`
---

## 6. Dataflow

1. **User Authentication & Registration:**
   - User submits credentials ->  Authentication -> Generates secure token -> Access to website features

2. **Mood Tracking:**
   - User logs mood -> Data sent to  -> Reflected in personal mood history.
3. **Appointments:**
   - User selects date/time -> Check if the slot is available -> Confirms booking and updates status -> Prevemts double-booking.

4. **Personality Exams:**
   - User takes exam -> Scores calculated -> Results stored -> Personalized feedback displayed

5. **Hospital Location Suggestion:**
   - User's location is accessed (with consent) -> Check nearby hospitals -> Displayed on user profile
---
