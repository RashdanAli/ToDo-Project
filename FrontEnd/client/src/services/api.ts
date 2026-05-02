import axios from 'axios';

const API_URL = 'http://localhost:5000/api/todos';

export interface Todo {
    _id: string;
    title: string;
    description: string;
    done: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface CreateTodoInput {
    title: string;
    description?: string;
}

export const api = {
    getTodos: async (): Promise<Todo[]> => {
        const response = await axios.get(API_URL);
        return response.data;
    },

    createTodo: async (todo: CreateTodoInput): Promise<Todo> => {
        const response = await axios.post(API_URL, todo);
        return response.data;
    },

    updateTodo: async (id: string, todo: Partial<Todo>): Promise<Todo> => {
        const response = await axios.put(`${API_URL}/${id}`, todo);
        return response.data;
    },

    deleteTodo: async (id: string): Promise<void> => {
        await axios.delete(`${API_URL}/${id}`);
    },

    toggleTodo: async (id: string, done: boolean): Promise<Todo> => {
        const response = await axios.put(`${API_URL}/${id}`, { done });
        return response.data;
    }
};