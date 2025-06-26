"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Copy, Play, ExternalLink, Code, Terminal, Eye } from "lucide-react"
import { toast } from "@/hooks/use-toast"

const codeExamples = {
  react: {
    title: "Interactive Todo App",
    description: "A fully functional todo app with add, delete, and toggle functionality",
    code: `function TodoApp() {
  const [todos, setTodos] = React.useState([
    { id: 1, text: 'Learn React', completed: false },
    { id: 2, text: 'Build awesome apps', completed: true }
  ]);
  const [inputValue, setInputValue] = React.useState('');

  const addTodo = () => {
    if (inputValue.trim()) {
      setTodos([...todos, {
        id: Date.now(),
        text: inputValue,
        completed: false
      }]);
      setInputValue('');
    }
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2>My Todo List</h2>
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addTodo()}
          placeholder="Add a new todo..."
          style={{ 
            padding: '8px', 
            marginRight: '10px', 
            border: '1px solid #ccc',
            borderRadius: '4px',
            width: '200px'
          }}
        />
        <button 
          onClick={addTodo}
          style={{
            padding: '8px 16px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Add Todo
        </button>
      </div>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {todos.map(todo => (
          <li key={todo.id} style={{ 
            display: 'flex', 
            alignItems: 'center', 
            marginBottom: '10px',
            padding: '10px',
            backgroundColor: '#f8f9fa',
            borderRadius: '4px'
          }}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
              style={{ marginRight: '10px' }}
            />
            <span style={{ 
              textDecoration: todo.completed ? 'line-through' : 'none',
              flex: 1,
              color: todo.completed ? '#6c757d' : '#000'
            }}>
              {todo.text}
            </span>
            <button 
              onClick={() => deleteTodo(todo.id)}
              style={{
                padding: '4px 8px',
                backgroundColor: '#dc3545',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

ReactDOM.render(<TodoApp />, document.getElementById('root'));`,
    language: "javascript",
    demo: true,
    category: "Frontend",
  },
  calculator: {
    title: "Scientific Calculator",
    description: "A working calculator with basic and scientific operations",
    code: `function Calculator() {
  const [display, setDisplay] = React.useState('0');
  const [previousValue, setPreviousValue] = React.useState(null);
  const [operation, setOperation] = React.useState(null);
  const [waitingForOperand, setWaitingForOperand] = React.useState(false);

  const inputNumber = (num) => {
    if (waitingForOperand) {
      setDisplay(String(num));
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? String(num) : display + num);
    }
  };

  const inputOperation = (nextOperation) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operation);

      setDisplay(String(newValue));
      setPreviousValue(newValue);
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  };

  const calculate = (firstValue, secondValue, operation) => {
    switch (operation) {
      case '+': return firstValue + secondValue;
      case '-': return firstValue - secondValue;
      case '×': return firstValue * secondValue;
      case '÷': return firstValue / secondValue;
      case '=': return secondValue;
      default: return secondValue;
    }
  };

  const performCalculation = () => {
    const inputValue = parseFloat(display);

    if (previousValue !== null && operation) {
      const newValue = calculate(previousValue, inputValue, operation);
      setDisplay(String(newValue));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForOperand(true);
    }
  };

  const clear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  const buttonStyle = {
    width: '60px',
    height: '60px',
    fontSize: '18px',
    margin: '2px',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    backgroundColor: '#f8f9fa',
    border: '1px solid #dee2e6'
  };

  const operatorStyle = {
    ...buttonStyle,
    backgroundColor: '#007bff',
    color: 'white'
  };

  return (
    <div style={{ 
      padding: '20px', 
      fontFamily: 'Arial, sans-serif',
      maxWidth: '300px',
      margin: '0 auto'
    }}>
      <div style={{
        backgroundColor: '#000',
        color: '#fff',
        padding: '20px',
        textAlign: 'right',
        fontSize: '24px',
        marginBottom: '10px',
        borderRadius: '8px',
        minHeight: '40px'
      }}>
        {display}
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2px' }}>
        <button style={buttonStyle} onClick={clear}>C</button>
        <button style={buttonStyle} onClick={() => setDisplay(display.slice(0, -1) || '0')}>⌫</button>
        <button style={operatorStyle} onClick={() => inputOperation('÷')}>÷</button>
        <button style={operatorStyle} onClick={() => inputOperation('×')}>×</button>
        
        <button style={buttonStyle} onClick={() => inputNumber(7)}>7</button>
        <button style={buttonStyle} onClick={() => inputNumber(8)}>8</button>
        <button style={buttonStyle} onClick={() => inputNumber(9)}>9</button>
        <button style={operatorStyle} onClick={() => inputOperation('-')}>-</button>
        
        <button style={buttonStyle} onClick={() => inputNumber(4)}>4</button>
        <button style={buttonStyle} onClick={() => inputNumber(5)}>5</button>
        <button style={buttonStyle} onClick={() => inputNumber(6)}>6</button>
        <button style={operatorStyle} onClick={() => inputOperation('+')}>+</button>
        
        <button style={buttonStyle} onClick={() => inputNumber(1)}>1</button>
        <button style={buttonStyle} onClick={() => inputNumber(2)}>2</button>
        <button style={buttonStyle} onClick={() => inputNumber(3)}>3</button>
        <button style={{...operatorStyle, gridRow: 'span 2'}} onClick={performCalculation}>=</button>
        
        <button style={{...buttonStyle, gridColumn: 'span 2'}} onClick={() => inputNumber(0)}>0</button>
        <button style={buttonStyle} onClick={() => setDisplay(display + '.')}>.</button>
      </div>
    </div>
  );
}

ReactDOM.render(<Calculator />, document.getElementById('root'));`,
    language: "javascript",
    demo: true,
    category: "Interactive",
  },
  algorithm: {
    title: "Sorting Visualizer",
    description: "Interactive bubble sort algorithm with step-by-step visualization",
    code: `function SortingVisualizer() {
  const [array, setArray] = React.useState([64, 34, 25, 12, 22, 11, 90]);
  const [sorting, setSorting] = React.useState(false);
  const [currentIndices, setCurrentIndices] = React.useState([]);
  const [sortedIndices, setSortedIndices] = React.useState([]);

  const generateRandomArray = () => {
    const newArray = Array.from({ length: 8 }, () => Math.floor(Math.random() * 100) + 1);
    setArray(newArray);
    setCurrentIndices([]);
    setSortedIndices([]);
  };

  const bubbleSort = async () => {
    setSorting(true);
    const arr = [...array];
    const n = arr.length;

    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        setCurrentIndices([j, j + 1]);
        await new Promise(resolve => setTimeout(resolve, 500));

        if (arr[j] > arr[j + 1]) {
          // Swap elements
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          setArray([...arr]);
          await new Promise(resolve => setTimeout(resolve, 500));
        }
      }
      setSortedIndices(prev => [...prev, n - 1 - i]);
    }
    setSortedIndices(prev => [...prev, 0]);
    setCurrentIndices([]);
    setSorting(false);
  };

  const getBarColor = (index) => {
    if (sortedIndices.includes(index)) return '#28a745';
    if (currentIndices.includes(index)) return '#dc3545';
    return '#007bff';
  };

  const maxValue = Math.max(...array);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h3>Bubble Sort Visualizer</h3>
      <div style={{ marginBottom: '20px' }}>
        <button 
          onClick={generateRandomArray}
          disabled={sorting}
          style={{
            padding: '8px 16px',
            marginRight: '10px',
            backgroundColor: '#6c757d',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: sorting ? 'not-allowed' : 'pointer'
          }}
        >
          Generate New Array
        </button>
        <button 
          onClick={bubbleSort}
          disabled={sorting}
          style={{
            padding: '8px 16px',
            backgroundColor: sorting ? '#6c757d' : '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: sorting ? 'not-allowed' : 'pointer'
          }}
        >
          {sorting ? 'Sorting...' : 'Start Bubble Sort'}
        </button>
      </div>
      
      <div style={{ 
        display: 'flex', 
        alignItems: 'end', 
        height: '300px',
        gap: '5px',
        padding: '20px',
        backgroundColor: '#f8f9fa',
        borderRadius: '8px'
      }}>
        {array.map((value, index) => (
          <div key={index} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div
              style={{
                width: '40px',
                height: \`\${(value / maxValue) * 250}px\`,
                backgroundColor: getBarColor(index),
                borderRadius: '4px 4px 0 0',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'end',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 'bold',
                fontSize: '12px',
                paddingBottom: '5px'
              }}
            >
              {value}
            </div>
          </div>
        ))}
      </div>
      
      <div style={{ marginTop: '20px', fontSize: '14px' }}>
        <div><span style={{ color: '#007bff' }}>■</span> Unsorted</div>
        <div><span style={{ color: '#dc3545' }}>■</span> Comparing</div>
        <div><span style={{ color: '#28a745' }}>■</span> Sorted</div>
      </div>
    </div>
  );
}

ReactDOM.render(<SortingVisualizer />, document.getElementById('root'));`,
    language: "javascript",
    demo: true,
    category: "Algorithm",
  },
  websocket: {
    title: "Real-time Chat App",
    description: "WebSocket-based chat application with multiple users",
    code: `// Client-side React component
function ChatApp() {
  const [messages, setMessages] = React.useState([]);
  const [inputMessage, setInputMessage] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [connected, setConnected] = React.useState(false);
  const [users, setUsers] = React.useState([]);
  const wsRef = React.useRef(null);

  React.useEffect(() => {
    // Simulate WebSocket connection
    const simulateConnection = () => {
      setConnected(true);
      // Add some demo messages
      setMessages([
        { id: 1, username: 'Alice', message: 'Hello everyone!', timestamp: new Date() },
        { id: 2, username: 'Bob', message: 'Hey there!', timestamp: new Date() }
      ]);
      setUsers(['Alice', 'Bob', 'Charlie']);
    };

    if (username) {
      simulateConnection();
    }

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, [username]);

  const sendMessage = () => {
    if (inputMessage.trim() && username) {
      const newMessage = {
        id: Date.now(),
        username: username,
        message: inputMessage,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, newMessage]);
      setInputMessage('');
    }
  };

  const joinChat = () => {
    if (username.trim()) {
      setUsers(prev => [...prev, username]);
    }
  };

  if (!connected && !username) {
    return (
      <div style={{ 
        padding: '20px', 
        fontFamily: 'Arial, sans-serif',
        maxWidth: '400px',
        margin: '0 auto'
      }}>
        <h3>Join Chat Room</h3>
        <div style={{ marginBottom: '20px' }}>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && joinChat()}
            placeholder="Enter your username..."
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              marginBottom: '10px'
            }}
          />
          <button
            onClick={joinChat}
            style={{
              width: '100%',
              padding: '10px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Join Chat
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ 
      padding: '20px', 
      fontFamily: 'Arial, sans-serif',
      maxWidth: '600px',
      margin: '0 auto'
    }}>
      <div style={{ display: 'flex', gap: '20px' }}>
        <div style={{ flex: 1 }}>
          <h3>Chat Room</h3>
          <div style={{
            height: '300px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            padding: '10px',
            overflowY: 'auto',
            backgroundColor: '#f8f9fa',
            marginBottom: '10px'
          }}>
            {messages.map(msg => (
              <div key={msg.id} style={{ marginBottom: '10px' }}>
                <strong style={{ color: '#007bff' }}>{msg.username}:</strong>
                <span style={{ marginLeft: '8px' }}>{msg.message}</span>
                <div style={{ 
                  fontSize: '12px', 
                  color: '#6c757d',
                  marginTop: '2px'
                }}>
                  {msg.timestamp.toLocaleTimeString()}
                </div>
              </div>
            ))}
          </div>
          
          <div style={{ display: 'flex', gap: '10px' }}>
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Type your message..."
              style={{
                flex: 1,
                padding: '8px',
                border: '1px solid #ccc',
                borderRadius: '4px'
              }}
            />
            <button
              onClick={sendMessage}
              style={{
                padding: '8px 16px',
                backgroundColor: '#28a745',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Send
            </button>
          </div>
        </div>
        
        <div style={{ width: '150px' }}>
          <h4>Online Users ({users.length})</h4>
          <div style={{
            border: '1px solid #ccc',
            borderRadius: '4px',
            padding: '10px',
            backgroundColor: '#f8f9fa'
          }}>
            {users.map((user, index) => (
              <div key={index} style={{ 
                padding: '5px',
                borderBottom: index < users.length - 1 ? '1px solid #dee2e6' : 'none'
              }}>
                <span style={{ color: '#28a745' }}>●</span> {user}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

ReactDOM.render(<ChatApp />, document.getElementById('root'));`,
    language: "javascript",
    demo: true,
    category: "Real-time",
  },
  typescript: {
    title: "Type-safe Fetch",
    description: "Reusable typed fetch helper using generics",
    code: `export async function typedFetch<T>(input: RequestInfo, init?: RequestInit): Promise<T> {
  const res = await fetch(input, init)
  if (!res.ok) {
    throw new Error(\`Request failed with status \${res.status}\`)
  }
  const data = (await res.json()) as T
  return data
}

// Usage example (type-inference!)
interface Post { id: number; title: string }
async function example() {
  const posts = await typedFetch<Post[]>("/api/posts")
  console.log(posts[0].title)
}
`,
    language: "typescript",
    demo: false,
    category: "Utilities",
  },

  golang: {
    title: "Go Microservice",
    description: "Minimal REST API with mux & middleware",
    code: `package main

import (
  "encoding/json"
  "log"
  "net/http"

  "github.com/gorilla/mux"
)

type User struct{ ID int; Name string }

func getUsers(w http.ResponseWriter, _ *http.Request) {
  users := []User{{1, "Alice"}, {2, "Bob"}}
  w.Header().Set("Content-Type", "application/json")
  json.NewEncoder(w).Encode(users)
}

func main() {
  r := mux.NewRouter()
  r.HandleFunc("/api/users", getUsers).Methods("GET")

  log.Println("Server running on :8080")
  http.ListenAndServe(":8080", r)
}
`,
    language: "go",
    demo: false,
    category: "Backend",
  },

  dataviz: {
    title: "Bar Chart",
    description: "Interactive Chart.js bar chart",
    code: `function BarChart() {
  const ctxRef = React.useRef(null)

  React.useEffect(() => {
    const ctx = ctxRef.current.getContext('2d')
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
          label: '# of Votes',
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: 'rgba(54, 162, 235, 0.5)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
        }],
      },
      options: { responsive: true, maintainAspectRatio: false },
    })
  }, [])

  return <canvas ref={ctxRef} style={{ width: '100%', height: 300 }} />
}

ReactDOM.render(<BarChart />, document.getElementById('root'));`,
    language: "javascript",
    demo: true,
    category: "Data-Viz",
  },

  auth: {
    title: "Auth Flow",
    description: "Simple username/password auth UI",
    code: `function LoginForm() {
  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [error, setError] = React.useState(null)

  const login = async () => {
    setError(null)
    if (!username || !password) return setError("Required.")
    // fake API call
    await new Promise(r => setTimeout(r, 500))
    alert(\`Logged in as \${username}\`)
  }

  return (
    <div style={{ maxWidth: 300, margin: '0 auto' }}>
      <input placeholder="Username" value={username}
        onChange={e => setUsername(e.target.value)} style={{ width: '100%', marginBottom: 8 }} />
      <input placeholder="Password" type="password" value={password}
        onChange={e => setPassword(e.target.value)} style={{ width: '100%', marginBottom: 8 }} />
      {error && <div style={{ color: 'red', marginBottom: 8 }}>{error}</div>}
      <button onClick={login} style={{ width: '100%' }}>Login</button>
    </div>
  )
}

ReactDOM.render(<LoginForm />, document.getElementById('root'));`,
    language: "javascript",
    demo: true,
    category: "Auth",
  },
}

export function CodingExamples({ showAll = true, limit = 3 }) {
  const [activeTab, setActiveTab] = useState("react")
  const [runningDemo, setRunningDemo] = useState(null)

  const displayedExamples = showAll ? codeExamples : Object.fromEntries(Object.entries(codeExamples).slice(0, limit))

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code)
    toast({
      title: "Copied!",
      description: "Code has been copied to clipboard.",
    })
  }

  const runDemo = (key: string) => {
    setRunningDemo(key)
    // In a real implementation, this would execute the code in a sandboxed environment
    toast({
      title: "Demo Running!",
      description: "Code is executing in the preview below.",
    })
  }

  const openInCodepen = (code: string, title: string) => {
    const data = {
      title: title,
      html: '<div id="root"></div>',
      js: code,
      css: "body { margin: 0; padding: 20px; font-family: Arial, sans-serif; }",
      js_external:
        "https://unpkg.com/react@18/umd/react.development.js;https://unpkg.com/react-dom@18/umd/react-dom.development.js",
    }

    const form = document.createElement("form")
    form.method = "POST"
    form.action = "https://codepen.io/pen/define"
    form.target = "_blank"

    const input = document.createElement("input")
    input.type = "hidden"
    input.name = "data"
    input.value = JSON.stringify(data)

    form.appendChild(input)
    document.body.appendChild(form)
    form.submit()
    document.body.removeChild(form)
  }

  return (
    <div className="space-y-8">
      {showAll && (
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Interactive Code</div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Live Code Examples</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
              Interactive, testable code examples you can run and modify in real-time.
            </p>
          </div>
        </div>
      )}

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-6 md:grid-cols-8">
          {Object.entries(displayedExamples).map(([key, example]) => (
            <TabsTrigger key={key} value={key} className="text-xs sm:text-sm">
              {example.title.split(" ")[0]}
            </TabsTrigger>
          ))}
        </TabsList>

        {Object.entries(displayedExamples).map(([key, example]) => (
          <TabsContent key={key} value={key} className="mt-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Code className="h-5 w-5" />
                        {example.title}
                      </CardTitle>
                      <CardDescription className="mt-2">{example.description}</CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => copyToClipboard(example.code)}>
                        <Copy className="h-4 w-4" />
                      </Button>
                      {example.demo && (
                        <Button variant="outline" size="sm" onClick={() => runDemo(key)}>
                          <Play className="h-4 w-4" />
                        </Button>
                      )}
                      <Button variant="outline" size="sm" onClick={() => openInCodepen(example.code, example.title)}>
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Badge variant="secondary">{example.language}</Badge>
                    <Badge variant="outline">{example.category}</Badge>
                    {example.demo && <Badge variant="default">Interactive</Badge>}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="relative">
                    <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm max-h-96">
                      <code>{example.code}</code>
                    </pre>
                  </div>
                </CardContent>
              </Card>

              {example.demo && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Eye className="h-5 w-5" />
                      Live Demo
                    </CardTitle>
                    <CardDescription>Interactive preview of the code in action</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="border rounded-lg p-4 bg-white min-h-[300px]">
                      {runningDemo === key ? (
                        <div className="flex items-center justify-center h-full">
                          <div className="text-center">
                            <Terminal className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                            <p className="text-sm text-muted-foreground">
                              Demo would run here in a real implementation
                            </p>
                            <p className="text-xs text-muted-foreground mt-2">
                              Click "Open in CodePen" to see it live!
                            </p>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center h-full">
                          <Button onClick={() => runDemo(key)} className="gap-2">
                            <Play className="h-4 w-4" />
                            Run Demo
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      {!showAll && (
        <div className="text-center">
          <Button asChild variant="outline" size="lg">
            <a href="/code">
              View All Code Examples
              <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>
      )}
    </div>
  )
}
