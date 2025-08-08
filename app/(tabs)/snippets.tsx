import React, { useState } from 'react';
import { StyleSheet, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { Text, View } from '@/components/Themed';

interface CodeSnippet {
  id: string;
  title: string;
  code: string;
  language: string;
  category: string;
}

const initialSnippets: CodeSnippet[] = [
  {
    id: '1',
    title: 'React Hook - useState',
    code: `const [state, setState] = useState(initialValue);
const [count, setCount] = useState(0);`,
    language: 'JavaScript',
    category: 'React'
  },
  {
    id: '2',
    title: 'Async/Await Function',
    code: `async function fetchData() {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
  }
}`,
    language: 'JavaScript',
    category: 'Async'
  }
];

export default function SnippetsScreen() {
  const [snippets, setSnippets] = useState<CodeSnippet[]>(initialSnippets);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newSnippet, setNewSnippet] = useState({
    title: '',
    code: '',
    language: 'JavaScript',
    category: 'Utils'
  });

  const addSnippet = () => {
    if (!newSnippet.title.trim() || !newSnippet.code.trim()) {
      return;
    }

    const snippet: CodeSnippet = {
      id: Date.now().toString(),
      ...newSnippet
    };

    setSnippets([...snippets, snippet]);
    setNewSnippet({
      title: '',
      code: '',
      language: 'JavaScript',
      category: 'Utils'
    });
    setShowAddForm(false);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Code Snippets</Text>
      
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setShowAddForm(!showAddForm)}
      >
        <Text style={styles.addButtonText}>
          {showAddForm ? 'Cancel' : '+ Add Snippet'}
        </Text>
      </TouchableOpacity>

      {showAddForm && (
        <View style={styles.addForm}>
          <Text style={styles.label}>Title:</Text>
          <TextInput
            style={styles.input}
            value={newSnippet.title}
            onChangeText={(text) => setNewSnippet({...newSnippet, title: text})}
            placeholder="Snippet title..."
          />

          <Text style={styles.label}>Language:</Text>
          <TextInput
            style={styles.input}
            value={newSnippet.language}
            onChangeText={(text) => setNewSnippet({...newSnippet, language: text})}
            placeholder="Language..."
          />

          <Text style={styles.label}>Category:</Text>
          <TextInput
            style={styles.input}
            value={newSnippet.category}
            onChangeText={(text) => setNewSnippet({...newSnippet, category: text})}
            placeholder="Category..."
          />

          <Text style={styles.label}>Code:</Text>
          <TextInput
            style={[styles.input, styles.codeInput]}
            value={newSnippet.code}
            onChangeText={(text) => setNewSnippet({...newSnippet, code: text})}
            placeholder="Paste your code here..."
            multiline
            numberOfLines={6}
          />

          <TouchableOpacity style={styles.saveButton} onPress={addSnippet}>
            <Text style={styles.saveButtonText}>Save Snippet</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.snippetsContainer}>
        {snippets.map((snippet) => (
          <View key={snippet.id} style={styles.snippetCard}>
            <View style={styles.snippetHeader}>
              <Text style={styles.snippetTitle}>{snippet.title}</Text>
              <Text style={styles.snippetMeta}>
                {snippet.language} • {snippet.category}
              </Text>
            </View>
            
            <View style={styles.codeContainer}>
              <Text style={styles.codeText}>{snippet.code}</Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  addButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 20,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  addForm: {
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 8,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    backgroundColor: '#fff',
    marginBottom: 12,
  },
  codeInput: {
    height: 120,
    textAlignVertical: 'top',
    fontFamily: 'monospace',
  },
  saveButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  snippetsContainer: {
    marginBottom: 20,
  },
  snippetCard: {
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  snippetHeader: {
    marginBottom: 8,
  },
  snippetTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  snippetMeta: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  codeContainer: {
    backgroundColor: '#2d3748',
    padding: 12,
    borderRadius: 6,
  },
  codeText: {
    color: '#e2e8f0',
    fontSize: 12,
    fontFamily: 'monospace',
  },
});
