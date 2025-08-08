import React, { useState } from 'react';
import { StyleSheet, TextInput, ScrollView, Alert } from 'react-native';
import { Text, View } from '@/components/Themed';

export default function RegexTesterScreen() {
  const [regex, setRegex] = useState('');
  const [testText, setTestText] = useState('');
  const [matches, setMatches] = useState<string[]>([]);
  const [isValid, setIsValid] = useState(true);

  const testRegex = () => {
    if (!regex.trim()) {
      setMatches([]);
      return;
    }

    try {
      const regexObj = new RegExp(regex, 'g');
      const found = testText.match(regexObj);
      setMatches(found || []);
      setIsValid(true);
    } catch (error) {
      setIsValid(false);
      setMatches([]);
    }
  };

  React.useEffect(() => {
    testRegex();
  }, [regex, testText]);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Regex Tester</Text>
      
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Regular Expression:</Text>
        <TextInput
          style={[styles.input, !isValid && styles.errorInput]}
          value={regex}
          onChangeText={setRegex}
          placeholder="Enter regex pattern..."
          placeholderTextColor="#666"
        />
        {!isValid && <Text style={styles.errorText}>Invalid regex pattern</Text>}
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Test Text:</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={testText}
          onChangeText={setTestText}
          placeholder="Enter text to test against..."
          placeholderTextColor="#666"
          multiline
          numberOfLines={4}
        />
      </View>

      <View style={styles.resultsContainer}>
        <Text style={styles.label}>Matches ({matches.length}):</Text>
        {matches.length > 0 ? (
          matches.map((match, index) => (
            <View key={index} style={styles.matchItem}>
              <Text style={styles.matchText}>{match}</Text>
            </View>
          ))
        ) : (
          <Text style={styles.noMatches}>No matches found</Text>
        )}
      </View>

      <View style={styles.examplesContainer}>
        <Text style={styles.label}>Quick Examples:</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.examplesScroll}>
          {[
            { name: 'Email', pattern: '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}' },
            { name: 'Phone', pattern: '\\+?[1-9]\\d{1,14}' },
            { name: 'URL', pattern: 'https?://[^\\s]+' },
            { name: 'Date', pattern: '\\d{4}-\\d{2}-\\d{2}' },
          ].map((example, index) => (
            <View key={index} style={styles.exampleButton}>
              <Text 
                style={styles.exampleText}
                onPress={() => setRegex(example.pattern)}
              >
                {example.name}
              </Text>
            </View>
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
    fontSize: 16,
    backgroundColor: '#fff',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  errorInput: {
    borderColor: '#ff4444',
  },
  errorText: {
    color: '#ff4444',
    fontSize: 14,
    marginTop: 4,
  },
  resultsContainer: {
    marginBottom: 20,
  },
  matchItem: {
    backgroundColor: '#e3f2fd',
    padding: 8,
    borderRadius: 4,
    marginBottom: 4,
  },
  matchText: {
    fontSize: 14,
    fontFamily: 'monospace',
  },
  noMatches: {
    fontStyle: 'italic',
    color: '#666',
  },
  examplesContainer: {
    marginBottom: 20,
  },
  examplesScroll: {
    marginTop: 8,
  },
  exampleButton: {
    backgroundColor: '#2196F3',
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
