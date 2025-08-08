import React, { useState } from 'react';
import { StyleSheet, TextInput, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Text, View } from '@/components/Themed';

interface HttpResponse {
  status: number;
  headers: Record<string, string>;
  body: string;
  time: number;
}

export default function HttpClientScreen() {
  const [url, setUrl] = useState('https://jsonplaceholder.typicode.com/posts/1');
  const [method, setMethod] = useState('GET');
  const [headers, setHeaders] = useState('{\n  "Content-Type": "application/json"\n}');
  const [body, setBody] = useState('');
  const [response, setResponse] = useState<HttpResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const methods = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'];

  const makeRequest = async () => {
    if (!url.trim()) {
      setError('Please enter a URL');
      return;
    }

    setLoading(true);
    setError('');
    setResponse(null);

    try {
      const startTime = Date.now();
      let requestHeaders: Record<string, string> = {};
      
      try {
        requestHeaders = JSON.parse(headers);
      } catch (e) {
        setError('Invalid headers JSON');
        setLoading(false);
        return;
      }

      const requestOptions: RequestInit = {
        method,
        headers: requestHeaders,
      };

      if (['POST', 'PUT', 'PATCH'].includes(method) && body.trim()) {
        requestOptions.body = body;
      }

      const fetchResponse = await fetch(url, requestOptions);
      const responseText = await fetchResponse.text();
      const endTime = Date.now();

      const responseHeaders: Record<string, string> = {};
      fetchResponse.headers.forEach((value, key) => {
        responseHeaders[key] = value;
      });

      setResponse({
        status: fetchResponse.status,
        headers: responseHeaders,
        body: responseText,
        time: endTime - startTime,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Request failed');
    } finally {
      setLoading(false);
    }
  };

  const clearAll = () => {
    setUrl('');
    setMethod('GET');
    setHeaders('{\n  "Content-Type": "application/json"\n}');
    setBody('');
    setResponse(null);
    setError('');
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>HTTP Client</Text>
      
      <View style={styles.methodContainer}>
        <Text style={styles.label}>Method:</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {methods.map((m) => (
            <TouchableOpacity
              key={m}
              style={[styles.methodButton, method === m && styles.activeMethod]}
              onPress={() => setMethod(m)}
            >
              <Text style={[styles.methodText, method === m && styles.activeMethodText]}>
                {m}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>URL:</Text>
        <TextInput
          style={styles.input}
          value={url}
          onChangeText={setUrl}
          placeholder="Enter URL..."
          placeholderTextColor="#666"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Headers (JSON):</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={headers}
          onChangeText={setHeaders}
          placeholder="Enter headers as JSON..."
          placeholderTextColor="#666"
          multiline
          numberOfLines={4}
        />
      </View>

      {['POST', 'PUT', 'PATCH'].includes(method) && (
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Body:</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={body}
            onChangeText={setBody}
            placeholder="Enter request body..."
            placeholderTextColor="#666"
            multiline
            numberOfLines={4}
          />
        </View>
      )}

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.sendButton} onPress={makeRequest} disabled={loading}>
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Send Request</Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity style={styles.clearButton} onPress={clearAll}>
          <Text style={styles.buttonText}>Clear</Text>
        </TouchableOpacity>
      </View>

      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Error: {error}</Text>
        </View>
      )}

      {response && (
        <View style={styles.responseContainer}>
          <Text style={styles.label}>Response:</Text>
          <View style={styles.responseBox}>
            <Text style={styles.responseStatus}>
              Status: {response.status} ({response.time}ms)
            </Text>
            <Text style={styles.responseLabel}>Headers:</Text>
            <Text style={styles.responseText}>
              {JSON.stringify(response.headers, null, 2)}
            </Text>
            <Text style={styles.responseLabel}>Body:</Text>
            <Text style={styles.responseText}>{response.body}</Text>
          </View>
        </View>
      )}

      <View style={styles.examplesContainer}>
        <Text style={styles.label}>Quick Examples:</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.examplesScroll}>
          {[
            { name: 'GET Posts', url: 'https://jsonplaceholder.typicode.com/posts/1', method: 'GET' },
            { name: 'POST User', url: 'https://jsonplaceholder.typicode.com/users', method: 'POST' },
            { name: 'PUT Post', url: 'https://jsonplaceholder.typicode.com/posts/1', method: 'PUT' },
          ].map((example, index) => (
            <TouchableOpacity key={index} style={styles.exampleButton}>
              <Text 
                style={styles.exampleText}
                onPress={() => {
                  setUrl(example.url);
                  setMethod(example.method);
                }}
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
  methodContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  methodButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    marginRight: 8,
  },
  activeMethod: {
    backgroundColor: '#2196F3',
    borderColor: '#2196F3',
  },
  methodText: {
    fontSize: 14,
    fontWeight: '500',
  },
  activeMethodText: {
    color: '#fff',
  },
  inputContainer: {
    marginBottom: 20,
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
    height: 80,
    textAlignVertical: 'top',
    fontFamily: 'monospace',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  sendButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    minWidth: 120,
    alignItems: 'center',
  },
  clearButton: {
    backgroundColor: '#f44336',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
  errorContainer: {
    backgroundColor: '#ffebee',
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
  },
  errorText: {
    color: '#c62828',
    fontSize: 14,
  },
  responseContainer: {
    marginBottom: 20,
  },
  responseBox: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
    padding: 12,
  },
  responseStatus: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  responseLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 8,
    marginBottom: 4,
  },
  responseText: {
    fontSize: 12,
    fontFamily: 'monospace',
    backgroundColor: '#fff',
    padding: 8,
    borderRadius: 4,
  },
  examplesContainer: {
    marginBottom: 20,
  },
  examplesScroll: {
    marginTop: 8,
  },
  exampleButton: {
    backgroundColor: '#FF9800',
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
