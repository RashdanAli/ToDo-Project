# Taska API Testing Guide for Beginners

This guide will help you test every endpoint of the Taska backend using Postman.

## What You Need

- Postman installed on your computer
- Backend server running on port 5000

## How to Start

1. Open Postman
2. Click the **New** button (top left)
3. Select **HTTP Request**
4. A new tab will open

---

## Testing Sequence

Follow these steps one by one. Do not skip!

---

## Step 1: Create a Todo

In your new request tab:

1. Look at the top bar where it says "Enter URL or paste text"
2. From the dropdown on the left, select **POST**
3. In the URL box, type: `http://localhost:5000/api/todos`
4. Click the **Body** tab (below the URL bar)
5. Select the **raw** radio button
6. In the dropdown below raw, select **JSON**
7. In the big text box, copy and paste this:

```json
{
  "title": "Buy groceries",
  "description": "Milk, bread, eggs"
}
```

8. Click the blue **Send** button (top right)

**What you should see:**
- Status shows: `201 Created`
- Below the bar, you see a JSON response with your todo

**Copy the `_id` from the response.** You will need it for the next steps.

---

## Step 2: Get All Todos

1. Click the **+** button (new tab) or press **Ctrl+T**
2. Select **GET** from the dropdown
3. Type: `http://localhost:5000/api/todos`
4. Click **Send**

**What you should see:**
- Status shows: `200 OK`
- A JSON array containing your newly created todo

---

## Step 3: Get One Todo

1. Open a new tab
2. Select **GET**
3. Type: `http://localhost:5000/api/todos/` and paste your copied ID

For example: `http://localhost:5000/api/todos/69f37099977eb095f9400327`
4. Click **Send**

**What you should see:**
- Status shows: `200 OK`
- Just the single todo object

---

## Step 4: Update the Title

1. Open a new tab
2. Select **PUT**
3. Type: `http://localhost:5000/api/todos/` and paste your ID

For example: `http://localhost:5000/api/todos/69f37099977eb095f9400327`
4. Click **Body** tab
5. Select **raw** and **JSON**
6. In the text box, paste:

```json
{
  "title": "Buy groceries and snacks"
}
```

7. Click **Send**

**What you should see:**
- Status shows: `200 OK`
- The todo title is now "Buy groceries and snacks"

---

## Step 5: Mark as Done

1. Open a new tab
2. Select **PUT**
3. Type: `http://localhost:5000/api/todos/` and paste your ID
4. Click **Body** tab
5. Select **raw** and **JSON**
6. In the text box, paste:

```json
{
  "done": true
}
```

7. Click **Send**

**What you should see:**
- Status shows: `200 OK`
- The todo now has `"done": true`

---

## Step 6: Delete the Todo

1. Open a new tab
2. Select **DELETE**
3. Type: `http://localhost:5000/api/todos/` and paste your ID
4. Click **Send**

**What you should see:**
- Status shows: `200 OK`
- Response body: `{"message": "Todo deleted successfully"}`

---

## Step 7: Verify the List is Empty

1. Open a new tab
2. Select **GET**
3. Type: `http://localhost:5000/api/todos`
4. Click **Send**

**What you should see:**
- Status shows: `200 OK`
- An empty array: `[]`

---

## Sad Path Tests (Error Cases)

Now we will test what happens when things go wrong.

---

## Step 8: Create Todo Without Title

1. Open a new tab
2. Select **POST**
3. Type: `http://localhost:5000/api/todos`
4. Click **Body** tab
5. Select **raw** and **JSON**
6. In the text box, paste:

```json
{}
```

7. Click **Send**

**What you should see:**
- Status shows: `400 Bad Request`
- Response: `{"message": "Todo validation failed: title: Title is required"}`

---

## Step 9: Create Todo With Empty Title

1. Open a new tab
2. Select **POST**
3. Type: `http://localhost:5000/api/todos`
4. Click **Body** tab
5. Select **raw** and **JSON**
6. In the text box, paste:

```json
{
  "title": ""
}
```

7. Click **Send**

**What you should see:**
- Status shows: `400 Bad Request`
- Same error message as Step 8

---

## Step 10: Get Todo With Invalid ID

1. Open a new tab
2. Select **GET**
3. Type: `http://localhost:5000/api/todos/12345`
4. Click **Send**

**What you should see:**
- Status shows: `400 Bad Request`
- Response: `{"message": "Invalid ID format"}`

---

## Step 11: Get Todo That Does Not Exist

1. Open a new tab
2. Select **GET**
3. Type: `http://localhost:5000/api/todos/000000000000000000000000`
4. Click **Send**

**What you should see:**
- Status shows: `404 Not Found`
- Response: `{"message": "Todo not found"}`

---

## Step 12: Delete Todo That Does Not Exist

1. Open a new tab
2. Select **DELETE**
3. Type: `http://localhost:5000/api/todos/000000000000000000000000`
4. Click **Send**

**What you should see:**
- Status shows: `404 Not Found`
- Response: `{"message": "Todo not found"}`

---

## Step 13: Unknown Route

1. Open a new tab
2. Select **GET**
3. Type: `http://localhost:5000/api/fake`
4. Click **Send**

**What you should see:**
- Status shows: `404 Not Found`
- Response: `{"message": "Route not found"}`

---

## Summary

| Step | Method | URL | What to send in Body | Expected Status |
|------|--------|-----|----------------------|-----------------|
| 1 | POST | /api/todos | `{"title":"Buy groceries","description":"Milk, bread, eggs"}` | 201 |
| 2 | GET | /api/todos | (none) | 200 |
| 3 | GET | /api/todos/:id | (none) | 200 |
| 4 | PUT | /api/todos/:id | `{"title":"Buy groceries and snacks"}` | 200 |
| 5 | PUT | /api/todos/:id | `{"done":true}` | 200 |
| 6 | DELETE | /api/todos/:id | (none) | 200 |
| 7 | GET | /api/todos | (none) | 200 (empty array) |
| 8 | POST | /api/todos | `{}` | 400 |
| 9 | POST | /api/todos | `{"title":""}` | 400 |
| 10 | GET | /api/todos/12345 | (none) | 400 |
| 11 | GET | /api/todos/000000000000000000000000 | (none) | 404 |
| 12 | DELETE | /api/todos/000000000000000000000000 | (none) | 404 |
| 13 | GET | /api/fake | (none) | 404 |

---

## How to Save Your Requests

1. After filling in a request, click the **Save** button (next to Send)
2. A popup appears
3. For Request Name, type something like "01 POST Create Todo"
4. Click **+ Create Collection** (or select existing)
5. Name your collection "Taska API"
6. Click **Save**

Now you can find all your tests saved in the left sidebar under your collection.

---

## Quick curl Commands (Optional)

If you ever want to test using the command line instead:

```bash
# Create todo
curl -X POST http://localhost:5000/api/todos -H "Content-Type: application/json" -d "{\"title\":\"Test\",\"description\":\"Testing\"}"

# Get all todos
curl http://localhost:5000/api/todos

# Get single todo
curl http://localhost:5000/api/todos/YOUR_ID_HERE

# Update todo
curl -X PUT http://localhost:5000/api/todos/YOUR_ID_HERE -H "Content-Type: application/json" -d "{\"title\":\"Updated\"}"

# Delete todo
curl -X DELETE http://localhost:5000/api/todos/YOUR_ID_HERE

# Test error
curl -w "\nStatus: %{http_code}" http://localhost:5000/api/todos/12345
```

---

## Done!

If all your tests show the expected status codes, your backend is working correctly. You are now ready to build the frontend!