# Manual Data Injection API Guide (`/resume/inject_manual_data`)

The `/resume/inject_manual_data` endpoint supports **Upsert capabilities**. It will update existing data instances and automatically re-generate necessary AI embeddings behind the scenes. 

Here are Postman-style cURL references you can use to manually inject and update specific resume sectors. 
*(Ensure your `resume_id` and auth tokens match the current active instance).*

### 1. Update Resume Owner Profile Picture

```bash
curl --location --request POST 'http://localhost:3000/resume/inject_manual_data' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer rohit-basic-auth' \
--data-raw '{
    "resume_id": 4,
    "section": "resume_owner_pic",
    "data": {
        "resume_owner_pic": "https://media.licdn.com/dms/image/v2/D5603AQHPjdBknZx8rA/profile-displayphoto-scale_400_400/B56ZsYvFwJJAAk-/0/1765646557670?e=1777507200&v=beta&t=CdtgBeNz5jPPbIx0blA9bxTSYFyOX6Lu9-OXeia3CsU"
    }
}'
```

### 2. Update Specific Project Information
To update an existing project, ensure the `"title"` matches the exact name of the project stored in the database.

```bash
curl --location --request POST 'http://localhost:3000/resume/inject_manual_data' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer rohit-basic-auth' \
--data-raw '{
    "resume_id": 4,
    "section": "projects",
    "data": {
        "title": "Sentinel - Simplilearn Platform Reinvention",
        "project_pic": "https://dummyimage.com/600x400/22c55e/ffffff&text=Sentinel+Thumbnail",
        "impact": "Led platform modernization that tripled performance scaling capabilities."
    }
}'
```

### 3. Update Personal Information

```bash
curl --location --request POST 'http://localhost:3000/resume/inject_manual_data' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer rohit-basic-auth' \
--data-raw '{
    "resume_id": 4,
    "section": "personal_info",
    "data": {
        "name": "Rohit Kumar Pattanayak",
        "email": "rohit@example.com",
        "phone": "+91-0000000000"
    }
}'
```

### 4. Update Social Links

```bash
curl --location --request POST 'http://localhost:3000/resume/inject_manual_data' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer rohit-basic-auth' \
--data-raw '{
    "resume_id": 4,
    "section": "social_links",
    "data": {
        "linkedin": "https://linkedin.com/in/dummy-new-url",
        "github": "https://github.com/dummy-new-url"
    }
}'
```
