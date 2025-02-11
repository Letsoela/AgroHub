import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, Send } from "lucide-react";

interface Message {
  id: string;
  content: string;
  sender_id: string;
  timestamp: string;
  sender: {
    name: string;
    avatar: string;
  };
}

interface Chat {
  id: string;
  user: {
    id: string;
    name: string;
    avatar: string;
    business_type: string;
    last_seen: string;
  };
  last_message: {
    content: string;
    timestamp: string;
  };
  unread: number;
}

// Mock data
const mockChats: Chat[] = [
  {
    id: "1",
    user: {
      id: "1",
      name: "Fresh Farms",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=farm1",
      business_type: "Farmer",
      last_seen: "2 minutes ago",
    },
    last_message: {
      content: "The tomatoes will be ready for delivery tomorrow",
      timestamp: "10:30 AM",
    },
    unread: 2,
  },
  {
    id: "2",
    user: {
      id: "2",
      name: "Global Distribution",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=dist1",
      business_type: "Distributor",
      last_seen: "Online",
    },
    last_message: {
      content: "Can you provide a quote for bulk order?",
      timestamp: "Yesterday",
    },
    unread: 0,
  },
];

const mockMessages: Message[] = [
  {
    id: "1",
    content: "Hi, I am interested in your organic tomatoes",
    sender_id: "2",
    timestamp: "10:00 AM",
    sender: {
      name: "Global Distribution",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=dist1",
    },
  },
  {
    id: "2",
    content:
      "Sure! We have fresh organic tomatoes available. How many kg do you need?",
    sender_id: "1",
    timestamp: "10:05 AM",
    sender: {
      name: "Fresh Farms",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=farm1",
    },
  },
];

const MessagesPage = () => {
  const [selectedChat, setSelectedChat] = useState<Chat | null>(mockChats[0]);
  const [newMessage, setNewMessage] = useState("");
  const [messages] = useState<Message[]>(mockMessages);
  const [chats] = useState<Chat[]>(mockChats);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    // Add message sending logic here
    setNewMessage("");
  };

  return (
    <div className="container mx-auto py-6">
      <div className="grid grid-cols-12 gap-6 h-[calc(100vh-10rem)]">
        {/* Chat List */}
        <div className="col-span-4 bg-white rounded-lg border">
          <div className="p-4 border-b">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search messages..." className="pl-9" />
            </div>
          </div>
          <ScrollArea className="h-[calc(100vh-14rem)]">
            <div className="space-y-2 p-4">
              {chats.map((chat) => (
                <button
                  key={chat.id}
                  className={`w-full text-left p-3 rounded-lg transition-colors ${selectedChat?.id === chat.id ? "bg-green-50" : "hover:bg-gray-50"}`}
                  onClick={() => setSelectedChat(chat)}
                >
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarImage src={chat.user.avatar} />
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold truncate">
                          {chat.user.name}
                        </h3>
                        <span className="text-xs text-muted-foreground">
                          {chat.last_message.timestamp}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground truncate">
                        {chat.last_message.content}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Chat Window */}
        <div className="col-span-8 bg-white rounded-lg border flex flex-col">
          {selectedChat ? (
            <>
              <div className="p-4 border-b">
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarImage src={selectedChat.user.avatar} />
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">{selectedChat.user.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {selectedChat.user.business_type} ·{" "}
                      {selectedChat.user.last_seen}
                    </p>
                  </div>
                </div>
              </div>

              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender_id === "1" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[70%] rounded-lg p-3 ${message.sender_id === "1" ? "bg-green-500 text-white" : "bg-gray-100"}`}
                      >
                        <p>{message.content}</p>
                        <span className="text-xs opacity-70">
                          {message.timestamp}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              <div className="p-4 border-t">
                <div className="flex space-x-2">
                  <Input
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message..."
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  />
                  <Button onClick={handleSendMessage}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <p className="text-muted-foreground">
                Select a chat to start messaging
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessagesPage;
