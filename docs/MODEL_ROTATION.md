# AI Model Rotation System

This project uses a round-robin AI model rotation system to distribute API requests across multiple models and avoid rate limits.

## How It Works

The system automatically rotates through 7 different AI models configured in your `.env` file. Each time a request is made, it uses the next model in the sequence, wrapping back to the first model after reaching the end.

## Configuration

Add these environment variables to your `.env` file:

```env
# Model 1
OPENROUTER_API_KEY_1=your_api_key_here
OPENROUTER_MODEL_1=openai/gpt-4o-mini

# Model 2
OPENROUTER_API_KEY_2=your_api_key_here
OPENROUTER_MODEL_2=google/gemini-2.0-flash-exp:free

# Model 3
OPENROUTER_API_KEY_3=your_api_key_here
OPENROUTER_MODEL_3=anthropic/claude-3-haiku

# Model 4
OPENROUTER_API_KEY_4=your_api_key_here
OPENROUTER_MODEL_4=meta-llama/llama-3.1-8b-instruct:free

# Model 5
OPENROUTER_API_KEY_5=your_api_key_here
OPENROUTER_MODEL_5=mistralai/mistral-7b-instruct:free

# Model 6
OPENROUTER_API_KEY_6=your_api_key_here
OPENROUTER_MODEL_6=openai/gpt-3.5-turbo

# Model 7
OPENROUTER_API_KEY_7=your_api_key_here
OPENROUTER_MODEL_7=deepseek/deepseek-chat
```

## Usage

The rotation system is used automatically by default. You don't need to change any code.

### Automatic Rotation (Default)

```typescript
import { GetOpenRouterResponse } from '@/lib/OpenRouterService';

// Automatically uses the next model in rotation
const response = await GetOpenRouterResponse(prompt);
```

### Manual Model Selection (Optional)

```typescript
// Use a specific model and API key
const response = await GetOpenRouterResponse(prompt, {
  apiKey: 'your_api_key',
  model: 'openai/gpt-4o-mini',
  useRotation: false
});
```

## Rotation State

The current rotation index is stored in `data/model-rotation.json`. This file is automatically created and managed by the system.

## Benefits

1. **Avoid Rate Limits**: Distributes requests across multiple models
2. **Automatic Failover**: If one model hits rate limits, the next request uses a different model
3. **Cost Optimization**: Mix free and paid models based on your needs
4. **Zero Configuration**: Works automatically once environment variables are set

## Monitoring

Check the console logs to see which model is being used:

```
[Model Rotation] Using: Model 1 (openai/gpt-4o-mini)
[Model Rotation] Next will be: Model 2
[OpenRouter] Using rotated model: Model 1 (openai/gpt-4o-mini)
```

## Resetting Rotation

To reset the rotation back to Model 1:

```typescript
import { ModelRotation } from '@/lib/ModelRotation';

await ModelRotation.reset();
```

## Supported Models

You can use any model supported by OpenRouter. Some popular options:

### Free Models
- `google/gemini-2.0-flash-exp:free`
- `meta-llama/llama-3.1-8b-instruct:free`
- `mistralai/mistral-7b-instruct:free`
- `openai/gpt-oss-120b:free`

### Paid Models
- `openai/gpt-4o-mini`
- `openai/gpt-4o`
- `anthropic/claude-3-haiku`
- `anthropic/claude-3-sonnet`
- `deepseek/deepseek-chat`

Check [OpenRouter Models](https://openrouter.ai/models) for the complete list.
