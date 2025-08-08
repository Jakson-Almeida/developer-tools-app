import React, { useState } from 'react';
import { StyleSheet, TextInput, ScrollView, Alert, TouchableOpacity } from 'react-native';
import { Text, View } from '@/components/Themed';

export default function JsonFormatterScreen() {
  const [inputJson, setInputJson] = useState('');
  const [formattedJson, setFormattedJson] = useState('');
  const [isValid, setIsValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const formatJson = () => {
    if (!inputJson.trim()) {
      setFormattedJson('');
      setIsValid(true);
      setErrorMessage('');
      return;
    }

    try {
      const parsed = JSON.parse(inputJson);
      const formatted = JSON.stringify(parsed, null, 2);
      setFormattedJson(formatted);
      setIsValid(true);
      setErrorMessage('');
    } catch (error) {
      setIsValid(false);
      setErrorMessage(error instanceof Error ? error.message : 'Invalid JSON');
      setFormattedJson('');
    }
  };

  const minifyJson = () => {
    if (!inputJson.trim()) return;

    try {
      const parsed = JSON.parse(inputJson);
      const minified = JSON.stringify(parsed);
      setFormattedJson(minified);
      setIsValid(true);
      setErrorMessage('');
    } catch (error) {
      setIsValid(false);
      setErrorMessage(error instanceof Error ? error.message : 'Invalid JSON');
    }
  };

  const clearAll = () => {
    setInputJson('');
    setFormattedJson('');
    setIsValid(true);
    setErrorMessage('');
  };

  React.useEffect(() => {
    formatJson();
  }, [inputJson]);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>JSON Formatter</Text>
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={formatJson}>
          <Text style={styles.buttonText}>Format</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={minifyJson}>
          <Text style={styles.buttonText}>Minify</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.clearButton]} onPress={clearAll}>
          <Text style={styles.buttonText}>Clear</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Input JSON:</Text>
        <TextInput
          style={[styles.input, styles.textArea, !isValid && styles.errorInput]}
          value={inputJson}
          onChangeText={setInputJson}
          placeholder="Paste your JSON here..."
          placeholderTextColor="#666"
          multiline
          numberOfLines={8}
        />
        {!isValid && <Text style={styles.errorText}>{errorMessage}</Text>}
      </View>

      {formattedJson && (
        <View style={styles.outputContainer}>
          <Text style={styles.label}>Formatted Output:</Text>
          <View style={styles.outputBox}>
            <TextInput
              style={styles.outputText}
              value={formattedJson}
              multiline
              editable={false}
            />
          </View>
        </View>
      )}

      <View style={styles.examplesContainer}>
        <Text style={styles.label}>Sample JSON:</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.examplesScroll}>
          {[
            { name: 'User Object', json: '{"name":"John Doe","email":"john@example.com","age":30}' },
            { name: 'Array', json: '[{"id":1,"name":"Item 1"},{"id":2,"name":"Item 2"}]' },
            { name: 'Nested', json: '{"user":{"profile":{"name":"Alice","settings":{"theme":"dark"}}}}' },
          ].map((example, index) => (
            <TouchableOpacity key={index} style={styles.exampleButton}>
              <Text 
                style={styles.exampleText}
                onPress={() => setInputJson(example.json)}
              >
                {example.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#2196F3',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  clearButton: {
    backgroundColor: '#f44336',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
  inputContainer: {
    marginBottom: 20,
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
  },
  textArea: {
    height: 150,
    textAlignVertical: 'top',
    fontFamily: 'monospace',
  },
  errorInput: {
    borderColor: '#ff4444',
  },
  errorText: {
    color: '#ff4444',
    fontSize: 14,
    marginTop: 4,
  },
  outputContainer: {
    marginBottom: 20,
  },
  outputBox: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
    maxHeight: 200,
  },
  outputText: {
    padding: 12,
    fontSize: 14,
    fontFamily: 'monospace',
  },
  examplesContainer: {
    marginBottom: 20,
  },
  examplesScroll: {
    marginTop: 8,
  },
  exampleButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
  },
  exampleText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
  },
});
