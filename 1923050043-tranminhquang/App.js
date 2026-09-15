/*
 * **Name**: Tran Minh Quang
 * **ID**: 1923050043
 * **Due Date**: 14/9/2026
 */

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';


const STUDENT_ID = "1923050043";

// TÍNH TOÁN THÔNG SỐ TỪ STUDENT_ID 
const basePadding = STUDENT_ID.length + 5; 
const cardRadius = parseInt(STUDENT_ID[STUDENT_ID.length - 1]) * 4; 
const themeColorIndex = parseInt(STUDENT_ID[STUDENT_ID.length - 2]); 
const isBlueTheme = themeColorIndex % 2 === 0; 
const ACCENT_COLOR = isBlueTheme ? '#3b82f6' : '#10b981'; 

// --- CUSTOM COMPONENT 1: TodoInput ---
const TodoInput = ({ onAddTodo }) => {
  const [text, setText] = useState('');

  const handleAdd = () => {
    if (text.trim().length > 0) {
      onAddTodo(text);
      setText(''); 
    }
  };

  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={[styles.input, { padding: basePadding, borderRadius: cardRadius }]}
        placeholder="Add a new task..."
        placeholderTextColor="#9ca3af"
        value={text}
        onChangeText={setText}
      />
      <TouchableOpacity 
        style={[styles.addButton, { padding: basePadding, borderRadius: cardRadius, backgroundColor: ACCENT_COLOR }]} 
        onPress={handleAdd}
      >
        <Text style={styles.addButtonText}>Add</Text>
      </TouchableOpacity>
    </View>
  );
};

// --- CUSTOM COMPONENT 2: TodoItem ---
const TodoItem = ({ todo, onToggle, onDelete }) => {
  return (
    <View style={[styles.card, { padding: basePadding, borderRadius: cardRadius }]}>
      <TouchableOpacity style={styles.taskContent} onPress={() => onToggle(todo.id)}>
        <View style={[styles.checkbox, { borderColor: ACCENT_COLOR, backgroundColor: todo.completed ? ACCENT_COLOR : 'transparent' }]} />
        <Text style={[styles.taskText, todo.completed && styles.taskCompleted]}>
          {todo.text}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onDelete(todo.id)}>
        <Text style={styles.deleteBtn}>X</Text>
      </TouchableOpacity>
    </View>
  );
};

// --- MAIN APP ---
export default function App() {
  // Core Feature 5: Quản lý state với id, text, completed
  const [todos, setTodos] = useState([]);

  // Core Feature 1: Hàm thêm todo
  const addTodo = (text) => {
    setTodos([{ id: Date.now().toString(), text, completed: false }, ...todos]);
  };

  // Core Feature 3: Đánh dấu hoàn thành
  const toggleTodo = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  // Core Feature 4: Xóa todo
  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  // Custom Feature: Counter
  const completedCount = todos.filter(t => t.completed).length;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Todo App</Text>
        <Text style={styles.headerSubtitle}>ID: {STUDENT_ID}</Text> 
      </View>

      <View style={styles.counterContainer}>
        <Text style={styles.counterText}>Completed: {completedCount}/{todos.length}</Text>
      </View>

      <TodoInput onAddTodo={addTodo} />

      <ScrollView style={styles.listContainer}>
        {todos.map(todo => (
          <TodoItem 
            key={todo.id} 
            todo={todo} 
            onToggle={toggleTodo} 
            onDelete={deleteTodo} 
          />
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Developed by {STUDENT_ID}</Text>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#111827', // Dark Theme
    paddingTop: 50,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#9ca3af',
  },
  counterContainer: {
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  counterText: {
    color: '#d1d5db',
    fontWeight: 'bold',
  },
  inputContainer: {
    flexDirection: 'row', 
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  input: {
    flex: 1,
    backgroundColor: '#1f2937',
    color: '#ffffff',
    marginRight: 10,
  },
  addButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  listContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: '#1f2937', 
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  taskContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderRadius: 4,
    marginRight: 12,
  },
  taskText: {
    color: '#ffffff',
    fontSize: 16,
  },
  taskCompleted: {
    textDecorationLine: 'line-through',
    color: '#6b7280',
  },
  deleteBtn: {
    color: '#ef4444',
    fontWeight: 'bold',
    fontSize: 18,
    paddingLeft: 10,
  },
  footer: {
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#1f2937',
  },
  footerText: {
    color: '#6b7280',
  }
});
