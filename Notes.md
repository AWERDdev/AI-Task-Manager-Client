import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
next.js 
Ts

     ```

     <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <button>
            <UserCircle className="w-8 h-8 text-white cursor-pointer rounded-full" />
          </button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content align="end" className="bg-[#1f2937] text-white rounded-md shadow-lg p-2 w-48">
          {user ? (
            <>
              <div className="px-4 py-2 text-sm">
                <p className="font-semibold">{user.name}</p>
                <p className="text-gray-400">{user.email}</p>
              </div>
              <DropdownMenu.Item
                className="hover:bg-red-600 cursor-pointer text-center py-2"
                onClick={() => {
                  localStorage.removeItem("token");
                  setUser(null);
                  Logoutpath()
                }}
              >
                Logout
              </DropdownMenu.Item>
            </>
          ) : (
            <DropdownMenu.Item className="text-center py-2">
              <a href="/login" className="text-blue-400 hover:underline">Login</a>
            </DropdownMenu.Item>
          )}
        </DropdownMenu.Content>
      </DropdownMenu.Root>
      ```
Bad code
      ```
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import jwt
from mongoengine import Document, StringField, connect
from pymongo import MongoClient

# Secret key for JWT verification (must match the frontend's secret)
JWT_SECRET = "your_secret_key"  # IMPORTANT: Use the same secret as in your Node.js backend

router = APIRouter()

# Connect to MongoDB using mongoengine
connect('TaskMaster', host='mongodb://127.0.0.1:27017/')

# Define a MongoEngine model for the Task
class Task(Document):
    userId = StringField(required=True)
    TaskTitle = StringField()
    Task = StringField()
    importance = StringField()
    type = StringField()
    Due = StringField()
    meta = {'collection': 'tasks'}

# Define a model for the request body
class TokenRequest(BaseModel):
    token: str

def verify_token(token: str):
    """Verify and decode JWT token."""
    try:
        decoded = jwt.decode(token, JWT_SECRET, algorithms=["HS256"])
        print(f"Decoded token: {decoded}")
        return decoded
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token has expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")

@router.post("/users")
async def get_users_tasks(user: TokenRequest):
    try:
        # Verify the token sent from the client
        decoded_client_token = verify_token(user.token)
        
        # Extract user ID safely
        userId_from_token = None
        
        # Check if decoded_client_token is a dictionary
        if isinstance(decoded_client_token, dict):
            userId_from_token = decoded_client_token.get('id') or decoded_client_token.get('_id')
        else:
            # If it's not a dictionary, it might be the ID itself or have a different structure
            print(f"Decoded token is not a dictionary: {type(decoded_client_token)}")
            userId_from_token = decoded_client_token
                
        if not userId_from_token:
            raise HTTPException(status_code=400, detail="Token does not contain user ID")
        
        print(f"Decoded userId from token: {userId_from_token}")
        
        # Fetch tasks for that user
        tasks = Task.objects(userId=str(userId_from_token))  # Convert to string to ensure compatibility
        
        # Convert tasks to a list of dictionaries with all fields
        task_list = [{
            "id": str(task.id),
            "TaskTitle": task.TaskTitle, 
            "Task": task.Task, 
            "importance": task.importance,
            "type": task.type,
            "Due": task.Due
        } for task in tasks]
        
        if not task_list:
            return {"success": False, "message": "No tasks found for this user"}
        
        return {"success": True, "tasks": task_list, "message": "Tasks found successfully"}
    
    except HTTPException as he:
        # Re-raise HTTP exceptions
        raise he
    except Exception as e:
        print(f"Error in get_users_tasks: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))
      ```