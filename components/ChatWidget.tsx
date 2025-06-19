"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  MessageCircle,
  X,
  Send,
  Bot,
  User,
  Sparkles,
  Loader2,
  Paperclip,
  Mic,
  MicOff,
  History,
  Download,
  ImageIcon,
  FileText,
  Trash2,
  Plus,
  ChevronDown,
  Volume2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Message {
  id: number
  text: string
  sender: "user" | "bot"
  timestamp: Date
  isTyping?: boolean
  fileAttachment?: {
    name: string
    type: string
    size: number
    url: string
  }
}

interface ChatHistory {
  id: string
  title: string
  messages: Message[]
  timestamp: Date
}

export default function AIChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [chatHistories, setChatHistories] = useState<ChatHistory[]>([])
  const [currentChatId, setCurrentChatId] = useState<string>("")
  const [showHistory, setShowHistory] = useState(false)
  const [audioLevel, setAudioLevel] = useState(0)

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunksRef = useRef<Blob[]>([])
  const audioContextRef = useRef<AudioContext | null>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)
  const animationFrameRef = useRef<number>()

  // Initialize chat on component mount
  useEffect(() => {
    loadChatHistory()
    if (!currentChatId) {
      startNewChat()
    }
  }, [])

  // Save messages to localStorage whenever messages change
  useEffect(() => {
    if (currentChatId && messages.length > 0) {
      saveChatHistory()
    }
  }, [messages, currentChatId])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Chat History Management
  const loadChatHistory = () => {
    try {
      const saved = localStorage.getItem("ai-chat-histories")
      if (saved) {
        const histories = JSON.parse(saved).map((h: any) => ({
          ...h,
          timestamp: new Date(h.timestamp),
          messages: h.messages.map((m: any) => ({
            ...m,
            timestamp: new Date(m.timestamp),
          })),
        }))
        setChatHistories(histories)

        // Load the most recent chat
        if (histories.length > 0) {
          const mostRecent = histories[0]
          setCurrentChatId(mostRecent.id)
          setMessages(mostRecent.messages)
        }
      }
    } catch (error) {
      console.error("Failed to load chat history:", error)
    }
  }

  const saveChatHistory = () => {
    try {
      const currentChat: ChatHistory = {
        id: currentChatId,
        title: messages.find((m) => m.sender === "user")?.text.slice(0, 30) + "..." || "New Chat",
        messages,
        timestamp: new Date(),
      }

      const updatedHistories = [currentChat, ...chatHistories.filter((h) => h.id !== currentChatId)].slice(0, 10)

      setChatHistories(updatedHistories)
      localStorage.setItem("ai-chat-histories", JSON.stringify(updatedHistories))
    } catch (error) {
      console.error("Failed to save chat history:", error)
    }
  }

  const startNewChat = () => {
    const newChatId = Date.now().toString()
    setCurrentChatId(newChatId)
    setMessages([
      {
        id: 1,
        text: "Hi! I'm your AI assistant. I can help you with questions about carbon emissions, sustainability, web development, and general inquiries. You can also upload files or use voice input. How can I assist you today?",
        sender: "bot",
        timestamp: new Date(),
      },
    ])
    setShowHistory(false)
  }

  const loadChat = (chatId: string) => {
    const chat = chatHistories.find((h) => h.id === chatId)
    if (chat) {
      setCurrentChatId(chatId)
      setMessages(chat.messages)
      setShowHistory(false)
    }
  }

  const deleteChat = (chatId: string) => {
    const updatedHistories = chatHistories.filter((h) => h.id !== chatId)
    setChatHistories(updatedHistories)
    localStorage.setItem("ai-chat-histories", JSON.stringify(updatedHistories))

    if (currentChatId === chatId) {
      startNewChat()
    }
  }

  // Enhanced Voice Input with Audio Level Detection
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder
      audioChunksRef.current = []

      // Set up audio analysis for visual feedback
      audioContextRef.current = new AudioContext()
      analyserRef.current = audioContextRef.current.createAnalyser()
      const source = audioContextRef.current.createMediaStreamSource(stream)
      source.connect(analyserRef.current)
      analyserRef.current.fftSize = 256

      const updateAudioLevel = () => {
        if (analyserRef.current && isRecording) {
          const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount)
          analyserRef.current.getByteFrequencyData(dataArray)
          const average = dataArray.reduce((a, b) => a + b) / dataArray.length
          setAudioLevel(average / 255)
          animationFrameRef.current = requestAnimationFrame(updateAudioLevel)
        }
      }
      updateAudioLevel()

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data)
      }

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/wav" })
        processVoiceInput(audioBlob)
        stream.getTracks().forEach((track) => track.stop())
        if (audioContextRef.current) {
          audioContextRef.current.close()
        }
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current)
        }
        setAudioLevel(0)
      }

      mediaRecorder.start()
      setIsRecording(true)
    } catch (error) {
      console.error("Failed to start recording:", error)
      alert("Microphone access denied or not available")
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)
    }
  }

  const processVoiceInput = async (audioBlob: Blob) => {
    setIsTyping(true)

    // Simulate speech-to-text processing with more realistic responses
    const voiceResponses = [
      "I heard you mention something about sustainability. Could you tell me more about what you're looking for?",
      "Thanks for the voice message! I'm processing what you said about carbon emissions.",
      "I caught something about web development in your message. What specific aspect would you like to discuss?",
      "Your voice input mentioned a project. I'd love to help you with the details!",
      "I heard your question about our services. Let me provide you with some information.",
    ]

    setTimeout(() => {
      const simulatedText = voiceResponses[Math.floor(Math.random() * voiceResponses.length)]
      setInputValue(simulatedText)
      setIsTyping(false)
    }, 2000)
  }

  // File Upload Functionality
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Check file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      alert("File size must be less than 10MB")
      return
    }

    const fileUrl = URL.createObjectURL(file)
    const fileMessage: Message = {
      id: messages.length + 1,
      text: `📎 Uploaded: ${file.name}`,
      sender: "user",
      timestamp: new Date(),
      fileAttachment: {
        name: file.name,
        type: file.type,
        size: file.size,
        url: fileUrl,
      },
    }

    setMessages((prev) => [...prev, fileMessage])

    // Generate AI response for file upload
    setTimeout(() => {
      const botResponse: Message = {
        id: messages.length + 2,
        text: generateFileResponse(file),
        sender: "bot",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botResponse])
    }, 1500)

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const generateFileResponse = (file: File): string => {
    const fileType = file.type.toLowerCase()

    if (fileType.includes("image")) {
      return "🖼️ I can see you've uploaded an image! While I can't analyze images directly in this demo, in a full implementation I could help you with image analysis, optimization suggestions, or discuss how images relate to web performance and carbon footprint."
    } else if (fileType.includes("pdf") || fileType.includes("document")) {
      return "📄 Thanks for uploading a document! In a complete implementation, I could analyze document content, extract key information, or help you with document-related questions about sustainability, carbon emissions, or technical specifications."
    } else if (fileType.includes("spreadsheet") || fileType.includes("csv")) {
      return "📊 I see you've shared a spreadsheet or data file! This could be great for analyzing carbon emissions data, project metrics, or sustainability KPIs. In a full version, I could help interpret the data and provide insights."
    } else {
      return `📁 I've received your file "${file.name}". While I can't process all file types directly in this demo, I'm here to help answer any questions you might have about the content or how it relates to sustainability and web development.`
    }
  }

  // Enhanced AI response logic
  const generateAIResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase()

    if (message.includes("carbon") || message.includes("emission") || message.includes("co2")) {
      const responses = [
        "🌱 Carbon emissions are typically measured in kgCO₂e/m². The 2030 target is to keep embodied carbon below 500 kgCO₂e/m² for sustainable construction.",
        "♻️ Reducing carbon emissions in construction can be achieved through material selection, energy-efficient designs, and renewable energy integration.",
        "🏗️ Embodied carbon refers to the total greenhouse gas emissions from materials and construction processes. It's crucial for achieving net-zero buildings.",
      ]
      return responses[Math.floor(Math.random() * responses.length)]
    }

    if (message.includes("sustain") || message.includes("green") || message.includes("eco")) {
      const responses = [
        "🌿 Sustainable building practices include using recycled materials, implementing energy-efficient systems, and designing for longevity.",
        "🏆 Green building certifications like LEED and BREEAM help ensure environmental standards are met in construction projects.",
        "🎯 Sustainable design focuses on minimizing environmental impact while maximizing efficiency and occupant comfort.",
      ]
      return responses[Math.floor(Math.random() * responses.length)]
    }

    if (
      message.includes("web") ||
      message.includes("development") ||
      message.includes("website") ||
      message.includes("code")
    ) {
      const responses = [
        "💻 Modern web development focuses on performance, accessibility, and user experience. Technologies like Next.js and React provide excellent foundations.",
        "⚡ For optimal web performance, consider implementing lazy loading, optimizing images, and using efficient bundling strategies.",
        "📱 Responsive design ensures your website works seamlessly across all devices and screen sizes.",
      ]
      return responses[Math.floor(Math.random() * responses.length)]
    }

    if (message.includes("project") || message.includes("business") || message.includes("service")) {
      const responses = [
        "🚀 I'd be happy to discuss your project requirements. What specific goals are you looking to achieve?",
        "💼 Our services include web development, sustainability consulting, and carbon footprint analysis. What interests you most?",
        "🎯 Every successful project starts with understanding your unique needs and objectives. Tell me more about what you're planning.",
      ]
      return responses[Math.floor(Math.random() * responses.length)]
    }

    if (message.includes("contact") || message.includes("help") || message.includes("support")) {
      return "📞 You can reach our team at hello@modernweb.com or call +1 (555) 123-4567. We're available Mon-Fri, 9AM-6PM. How else can I assist you?"
    }

    if (message.includes("price") || message.includes("cost") || message.includes("quote")) {
      return "💰 Pricing varies based on project scope and requirements. I'd recommend scheduling a consultation to discuss your specific needs and get an accurate quote. Would you like me to help you get in touch with our team?"
    }

    const defaultResponses = [
      "🤔 That's an interesting question! Could you provide more details so I can give you a more specific answer?",
      "💡 I'd be happy to help with that. Can you tell me more about what you're looking for?",
      "✨ Great question! Let me know if you need information about our services, sustainability practices, or web development.",
      "🎯 I'm here to assist you. Feel free to ask about carbon emissions, web development, or any of our services.",
    ]

    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)]
  }

  const sendMessage = async () => {
    if (!inputValue.trim()) return

    const newMessage: Message = {
      id: messages.length + 1,
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, newMessage])
    setInputValue("")
    setIsTyping(true)

    setTimeout(
      () => {
        const botResponse: Message = {
          id: messages.length + 2,
          text: generateAIResponse(inputValue),
          sender: "bot",
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, botResponse])
        setIsTyping(false)
      },
      1500 + Math.random() * 1000,
    )
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const getFileIcon = (fileType: string) => {
    if (fileType.includes("image")) return <ImageIcon className="w-4 h-4 text-blue-500" />
    return <FileText className="w-4 h-4 text-green-500" />
  }

  return (
    <TooltipProvider>
      {/* Chat Toggle Button - Bottom Right with Pinkish Background */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2 }}
      >
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={() => setIsOpen(!isOpen)}
              size="icon"
              className="h-16 w-16 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden border-2 border-white/20"
            >
              {/* Animated background pulse */}
              <motion.div
                className="absolute inset-0 bg-white/20 rounded-full"
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              />

              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="w-6 h-6 text-white" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="chat"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="relative"
                  >
                    <MessageCircle className="w-6 h-6 text-white" />
                    {/* Notification dot */}
                    <motion.div
                      className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full border border-white"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left">
            <p>AI Assistant - Chat with me!</p>
          </TooltipContent>
        </Tooltip>
      </motion.div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            transition={{ duration: 0.3, type: "spring", bounce: 0.3 }}
            className="fixed bottom-24 right-6 z-40 w-80 sm:w-96 h-[550px] max-h-[80vh]"
          >
            <Card className="h-full flex flex-col shadow-2xl border-0 bg-background/95 backdrop-blur-xl overflow-hidden">
              {/* Header */}
              <CardHeader className="bg-gradient-to-r from-pink-500 to-rose-500 text-white p-4 rounded-t-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                        <Bot className="w-5 h-5 text-white" />
                      </div>
                      <motion.div
                        className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold flex items-center gap-2">
                        AI Assistant
                        <Sparkles className="w-4 h-4" />
                      </h3>
                      <p className="text-xs opacity-90">Online • Voice & Files Enabled</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setShowHistory(!showHistory)}
                          className="h-8 w-8 text-white hover:bg-white/20"
                        >
                          <History className="w-4 h-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Chat History</p>
                      </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={startNewChat}
                          className="h-8 w-8 text-white hover:bg-white/20"
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>New Chat</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </div>
              </CardHeader>

              {/* Chat History Panel */}
              <AnimatePresence>
                {showHistory && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="border-b bg-muted/30 overflow-hidden"
                  >
                    <ScrollArea className="h-32 p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-sm font-semibold flex items-center gap-2">
                          <History className="w-4 h-4" />
                          Recent Chats
                        </h4>
                        <Button variant="ghost" size="icon" onClick={() => setShowHistory(false)} className="h-6 w-6">
                          <ChevronDown className="w-3 h-3" />
                        </Button>
                      </div>
                      <div className="space-y-2">
                        {chatHistories.map((chat) => (
                          <div
                            key={chat.id}
                            className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 transition-colors"
                          >
                            <button
                              onClick={() => loadChat(chat.id)}
                              className="flex-1 text-left text-xs truncate hover:text-primary transition-colors"
                            >
                              {chat.title}
                            </button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => deleteChat(chat.id)}
                              className="h-6 w-6 text-destructive hover:bg-destructive/20"
                            >
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                        ))}
                        {chatHistories.length === 0 && (
                          <p className="text-xs text-muted-foreground text-center py-4">No chat history yet</p>
                        )}
                      </div>
                    </ScrollArea>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Messages */}
              <CardContent className="flex-1 p-0 overflow-hidden">
                <ScrollArea className="h-full p-4">
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`flex items-start space-x-2 max-w-[85%] ${
                            message.sender === "user" ? "flex-row-reverse space-x-reverse" : ""
                          }`}
                        >
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                              message.sender === "user"
                                ? "bg-gradient-to-r from-pink-500 to-rose-500"
                                : "bg-muted border-2 border-muted-foreground/20"
                            }`}
                          >
                            {message.sender === "user" ? (
                              <User className="w-4 h-4 text-white" />
                            ) : (
                              <Bot className="w-4 h-4 text-muted-foreground" />
                            )}
                          </div>
                          <div
                            className={`p-3 rounded-2xl shadow-sm border ${
                              message.sender === "user"
                                ? "bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-br-md border-pink-300"
                                : "bg-muted text-muted-foreground rounded-bl-md border-muted-foreground/20"
                            }`}
                          >
                            <p className="text-sm leading-relaxed">{message.text}</p>

                            {/* File Attachment Display */}
                            {message.fileAttachment && (
                              <div className="mt-2 p-2 bg-background/50 rounded-lg border border-border/50">
                                <div className="flex items-center space-x-2">
                                  {getFileIcon(message.fileAttachment.type)}
                                  <div className="flex-1 min-w-0">
                                    <p className="text-xs font-medium truncate">{message.fileAttachment.name}</p>
                                    <p className="text-xs opacity-70">{formatFileSize(message.fileAttachment.size)}</p>
                                  </div>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => {
                                      const link = document.createElement("a")
                                      link.href = message.fileAttachment!.url
                                      link.download = message.fileAttachment!.name
                                      link.click()
                                    }}
                                    className="h-6 w-6"
                                  >
                                    <Download className="w-3 h-3" />
                                  </Button>
                                </div>
                              </div>
                            )}

                            <p className="text-xs opacity-70 mt-1">
                              {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    ))}

                    {/* Typing indicator */}
                    {isTyping && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex justify-start"
                      >
                        <div className="flex items-start space-x-2">
                          <div className="w-8 h-8 rounded-full bg-muted border-2 border-muted-foreground/20 flex items-center justify-center">
                            <Bot className="w-4 h-4 text-muted-foreground" />
                          </div>
                          <div className="bg-muted p-3 rounded-2xl rounded-bl-md border border-muted-foreground/20">
                            <div className="flex space-x-1">
                              <motion.div
                                className="w-2 h-2 bg-muted-foreground/60 rounded-full"
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 0.6, repeat: Number.POSITIVE_INFINITY, delay: 0 }}
                              />
                              <motion.div
                                className="w-2 h-2 bg-muted-foreground/60 rounded-full"
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 0.6, repeat: Number.POSITIVE_INFINITY, delay: 0.2 }}
                              />
                              <motion.div
                                className="w-2 h-2 bg-muted-foreground/60 rounded-full"
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 0.6, repeat: Number.POSITIVE_INFINITY, delay: 0.4 }}
                              />
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                </ScrollArea>
              </CardContent>

              {/* Input */}
              <div className="p-4 border-t bg-muted/30">
                <div className="flex space-x-2 mb-2">
                  <Input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask me anything..."
                    className="flex-1 rounded-full border-muted-foreground/20 focus:border-pink-500 bg-background"
                    disabled={isTyping}
                  />

                  {/* Voice Input Button */}
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        onClick={isRecording ? stopRecording : startRecording}
                        size="icon"
                        variant={isRecording ? "destructive" : "outline"}
                        className="rounded-full relative overflow-hidden"
                      >
                        {isRecording && (
                          <motion.div
                            className="absolute inset-0 bg-red-500/20"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 0.5, repeat: Number.POSITIVE_INFINITY }}
                          />
                        )}
                        {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                        {isRecording && (
                          <motion.div
                            className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"
                            animate={{ opacity: [1, 0, 1] }}
                            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                          />
                        )}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{isRecording ? "Stop Recording" : "Voice Input"}</p>
                    </TooltipContent>
                  </Tooltip>

                  {/* File Upload Button */}
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        onClick={() => fileInputRef.current?.click()}
                        size="icon"
                        variant="outline"
                        className="rounded-full"
                      >
                        <Paperclip className="w-4 h-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Upload File</p>
                    </TooltipContent>
                  </Tooltip>

                  {/* Send Button */}
                  <Button
                    onClick={sendMessage}
                    size="icon"
                    disabled={!inputValue.trim() || isTyping}
                    className="rounded-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 transition-all duration-200"
                  >
                    {isTyping ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                  </Button>
                </div>

                {/* Recording Indicator with Audio Level */}
                {isRecording && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center justify-center space-x-3 text-destructive text-sm bg-red-50 dark:bg-red-950/20 rounded-lg p-2"
                  >
                    <div className="flex items-center space-x-2">
                      <motion.div
                        className="w-2 h-2 bg-red-500 rounded-full"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                      />
                      <Volume2 className="w-4 h-4" />
                    </div>
                    <span>Recording... Click to stop</span>
                    <div className="flex space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="w-1 bg-red-500 rounded-full"
                          animate={{
                            height: [4, 8 + audioLevel * 20, 4],
                          }}
                          transition={{
                            duration: 0.5,
                            repeat: Number.POSITIVE_INFINITY,
                            delay: i * 0.1,
                          }}
                        />
                      ))}
                    </div>
                  </motion.div>
                )}

                <p className="text-xs text-muted-foreground mt-2 text-center">
                  AI assistant • Voice, Files & History • Press Enter to send
                </p>
              </div>

              {/* Hidden File Input */}
              <input
                ref={fileInputRef}
                type="file"
                onChange={handleFileUpload}
                className="hidden"
                accept="image/*,.pdf,.doc,.docx,.txt,.csv,.xlsx"
              />
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </TooltipProvider>
  )
}
