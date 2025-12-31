---
title: 'Build a Semantic Kernel Chatbot with Memory in .NET using ChatHistory'
subtitle: 'Learn how to create an intelligent chatbot that remembers conversations using Semantic Kernel and ChatHistory'
readTime: '12-15 minutes'
date: '2024-12-15'
language: 'dotnet'
meta_description: 'Step-by-step guide to building a chatbot with conversational memory using Microsoft Semantic Kernel and ChatHistory in C#. Complete with code examples.'
SEO_Keywords_List: 'Semantic Kernel chatbot, ChatHistory C#, conversational AI, .NET chatbot, AI memory, Semantic Kernel tutorial, OpenAI chatbot, conversational context'
---

# Build a Semantic Kernel Chatbot with Memory in .NET using ChatHistory

One of the most powerful features of modern AI applications is the ability to maintain context across conversations. In this tutorial, we'll build a chatbot using Microsoft Semantic Kernel that remembers previous interactions using the ChatHistory feature.

## Why ChatHistory Matters

Imagine having a conversation where the AI forgets everything you said just moments ago. Frustrating, right? That's where ChatHistory comes in. It allows your chatbot to:

- 🧠 **Remember context** from previous messages
- 💬 **Maintain coherent conversations** across multiple turns
- 🎯 **Provide relevant responses** based on conversation history
- 📝 **Track user preferences** and information shared during the chat

## Prerequisites

Before we begin, make sure you have:

- **.NET 7 or later** installed
- **Visual Studio 2022** or VS Code
- **OpenAI API key** or Azure OpenAI credentials
- Basic understanding of **C# and async programming**

## Setting Up Your Project

First, create a new console application and install the required NuGet packages:

```bash
dotnet new console -n ChatbotWithMemory
cd ChatbotWithMemory
dotnet add package Microsoft.SemanticKernel
dotnet add package Microsoft.Extensions.Configuration
dotnet add package Microsoft.Extensions.Configuration.UserSecrets
```

## Building the Chatbot

Let's create our chatbot step by step:

### Step 1: Initialize the Kernel

```csharp
using Microsoft.SemanticKernel;
using Microsoft.SemanticKernel.ChatCompletion;
using Microsoft.SemanticKernel.Connectors.OpenAI;

var builder = Kernel.CreateBuilder();
builder.AddOpenAIChatCompletion(
    modelId: "gpt-3.5-turbo",
    apiKey: "YOUR_API_KEY"
);

var kernel = builder.Build();
var chatService = kernel.GetRequiredService<IChatCompletionService>();
```

### Step 2: Create ChatHistory

```csharp
var chatHistory = new ChatHistory();

// Add a system message to set the chatbot's behavior
chatHistory.AddSystemMessage(
    "You are a friendly and helpful assistant. " +
    "You remember previous conversations and provide contextual responses."
);
```

### Step 3: Implement the Conversation Loop

```csharp
Console.WriteLine("Chatbot: Hello! I'm your AI assistant. How can I help you today?");
Console.WriteLine("(Type 'exit' to quit)\n");

while (true)
{
    Console.Write("You: ");
    var userInput = Console.ReadLine();

    if (string.IsNullOrWhiteSpace(userInput) ||
        userInput.Equals("exit", StringComparison.OrdinalIgnoreCase))
    {
        break;
    }

    // Add user message to history
    chatHistory.AddUserMessage(userInput);

    // Get AI response
    var response = await chatService.GetChatMessageContentAsync(
        chatHistory,
        kernel: kernel
    );

    // Add assistant response to history
    chatHistory.AddAssistantMessage(response.Content);

    Console.WriteLine($"Chatbot: {response.Content}\n");
}
```

## Advanced Features

### Adding Conversation Context Limits

To prevent the chat history from growing too large:

```csharp
public class ChatHistoryManager
{
    private const int MaxMessages = 20;
    private readonly ChatHistory _history;

    public ChatHistoryManager()
    {
        _history = new ChatHistory();
    }

    public void AddMessage(string role, string content)
    {
        if (role == "user")
            _history.AddUserMessage(content);
        else if (role == "assistant")
            _history.AddAssistantMessage(content);

        // Keep only the last N messages
        while (_history.Count > MaxMessages)
        {
            _history.RemoveAt(0);
        }
    }

    public ChatHistory GetHistory() => _history;
}
```

### Implementing Conversation Summarization

For long conversations, you can summarize older messages:

```csharp
public async Task<string> SummarizeConversation(ChatHistory history)
{
    var summaryPrompt = "Summarize the following conversation in 2-3 sentences:\n\n";

    foreach (var message in history)
    {
        summaryPrompt += $"{message.Role}: {message.Content}\n";
    }

    var summary = await kernel.InvokePromptAsync(summaryPrompt);
    return summary.ToString();
}
```

## Complete Example

Here's the full working example:

```csharp
using Microsoft.SemanticKernel;
using Microsoft.SemanticKernel.ChatCompletion;

class Program
{
    static async Task Main(string[] args)
    {
        var builder = Kernel.CreateBuilder();
        builder.AddOpenAIChatCompletion(
            modelId: "gpt-3.5-turbo",
            apiKey: Environment.GetEnvironmentVariable("OPENAI_API_KEY")
        );

        var kernel = builder.Build();
        var chatService = kernel.GetRequiredService<IChatCompletionService>();
        var chatHistory = new ChatHistory();

        chatHistory.AddSystemMessage(
            "You are a helpful assistant with memory of our conversation."
        );

        Console.WriteLine("Chatbot ready! Type 'exit' to quit.\n");

        while (true)
        {
            Console.Write("You: ");
            var input = Console.ReadLine();

            if (input?.ToLower() == "exit") break;

            chatHistory.AddUserMessage(input);

            var response = await chatService.GetChatMessageContentAsync(
                chatHistory,
                kernel: kernel
            );

            chatHistory.AddAssistantMessage(response.Content);
            Console.WriteLine($"Bot: {response.Content}\n");
        }
    }
}
```

## Best Practices

1. **Manage History Size**: Don't let the chat history grow indefinitely
2. **Use System Messages**: Set clear instructions for the AI's behavior
3. **Handle Errors Gracefully**: Implement try-catch blocks for API calls
4. **Secure API Keys**: Use environment variables or Azure Key Vault
5. **Monitor Costs**: Track token usage to manage API costs

## Testing Your Chatbot

Try these conversation flows to test memory:

```
You: My name is John
Bot: Nice to meet you, John! How can I help you today?

You: What's my name?
Bot: Your name is John.

You: I like pizza
Bot: That's great, John! Pizza is delicious. Do you have a favorite type?
```

## Conclusion

You've now built a chatbot with conversational memory using Semantic Kernel and ChatHistory! This foundation can be extended with:

- **Persistent storage** (save conversations to a database)
- **Multi-user support** (separate chat histories per user)
- **Custom plugins** (integrate with external APIs)
- **Advanced prompting** (implement RAG patterns)

The possibilities are endless. Happy coding!

## Resources

- [Semantic Kernel Documentation](https://learn.microsoft.com/en-us/semantic-kernel/)
- [ChatHistory API Reference](https://learn.microsoft.com/en-us/dotnet/api/microsoft.semantickernel.chatcompletion.chathistory)
- [OpenAI Best Practices](https://platform.openai.com/docs/guides/prompt-engineering)
