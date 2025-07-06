import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Sparkles, 
  Download, 
  Upload, 
  Trash2, 
  Copy, 
  FileText,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import './App.css';

function App() {
  const [inputJson, setInputJson] = useState('');
  const [outputJson, setOutputJson] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [copied, setCopied] = useState(false);

  // Browser close detection and graceful shutdown
  useEffect(() => {
    const handleBeforeUnload = async () => {
      try {
        // Send shutdown request to server
        await fetch('/api/shutdown', { 
          method: 'POST',
          keepalive: true // Ensures request completes even if page is unloading
        });
      } catch (error) {
        // Ignore errors during shutdown
        console.log('Shutdown request sent');
      }
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        // Page is being hidden (tab switch, minimize, etc.)
        // Don't shutdown immediately, just log
        console.log('Page hidden');
      }
    };

    // Add event listeners
    window.addEventListener('beforeunload', handleBeforeUnload);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Cleanup function
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  const beautifyJson = async () => {
    if (!inputJson.trim()) {
      setError('Please enter some JSON to beautify');
      return;
    }

    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await axios.post('/api/beautify', inputJson, {
        headers: { 'Content-Type': 'application/json' }
      });
      
      setOutputJson(response.data.beautifiedJson);
      setSuccess('JSON beautified successfully!');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to beautify JSON. Please check your input.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      setInputJson(e.target.result);
      setError('');
      setSuccess('');
    };
    reader.readAsText(file);
  };

  const downloadJson = () => {
    if (!outputJson) {
      setError('No beautified JSON to download');
      return;
    }

    const blob = new Blob([outputJson], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'beautified.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setSuccess('File downloaded successfully!');
  };

  const copyToClipboard = async () => {
    if (!outputJson) {
      setError('No beautified JSON to copy');
      return;
    }

    try {
      await navigator.clipboard.writeText(outputJson);
      setCopied(true);
      setSuccess('Copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      setError('Failed to copy to clipboard');
    }
  };

  const clearAll = () => {
    setInputJson('');
    setOutputJson('');
    setError('');
    setSuccess('');
    setCopied(false);
  };

  const loadSampleJson = () => {
    const sampleJson = `{"name":"John Doe","age":30,"email":"john@example.com","address":{"street":"123 Main St","city":"New York","zip":"10001"},"hobbies":["reading","swimming","coding"],"active":true}`;
    setInputJson(sampleJson);
    setError('');
    setSuccess('');
  };

  return (
    <div className="container">
      <div className="header">
        <h1>JSON Beautifier</h1>
        <p>Format and beautify your JSON data with ease</p>
      </div>

      <div className="card">
        <h2>Input JSON</h2>
        <textarea
          className="textarea"
          value={inputJson}
          onChange={(e) => setInputJson(e.target.value)}
          placeholder="Paste your JSON here or upload a file..."
        />
        
        <div className="button-group">
          <button className="btn" onClick={beautifyJson} disabled={isLoading}>
            {isLoading ? <div className="loading"></div> : <Sparkles size={18} />}
            {isLoading ? 'Beautifying...' : 'Beautify JSON'}
          </button>
          
          <label className="btn btn-secondary">
            <Upload size={18} />
            Upload File
            <input
              type="file"
              accept=".json,.txt"
              onChange={handleFileUpload}
              style={{ display: 'none' }}
            />
          </label>
          
          <button className="btn btn-secondary" onClick={loadSampleJson}>
            <FileText size={18} />
            Load Sample
          </button>
          
          <button className="btn btn-secondary" onClick={clearAll}>
            <Trash2 size={18} />
            Clear All
          </button>
        </div>
      </div>

      {error && (
        <div className="error">
          <AlertCircle size={16} style={{ marginRight: '8px' }} />
          {error}
        </div>
      )}

      {success && (
        <div className="success">
          <CheckCircle size={16} style={{ marginRight: '8px' }} />
          {success}
        </div>
      )}

      {outputJson && (
        <div className="card">
          <h2>Beautified JSON</h2>
          <textarea
            className="textarea"
            value={outputJson}
            readOnly
            placeholder="Beautified JSON will appear here..."
          />
          
          <div className="button-group">
            <button className="btn" onClick={copyToClipboard}>
              {copied ? <CheckCircle size={18} /> : <Copy size={18} />}
              {copied ? 'Copied!' : 'Copy to Clipboard'}
            </button>
            
            <button className="btn btn-secondary" onClick={downloadJson}>
              <Download size={18} />
              Download JSON
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App; 