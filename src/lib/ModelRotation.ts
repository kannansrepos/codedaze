import fs from 'fs/promises';
import path from 'path';

interface AIModel {
  name: string;
  apiKey: string;
  model: string;
}

interface RotationState {
  currentIndex: number;
  lastUsed: string;
}

export class ModelRotation {
  private static models: AIModel[] = [
    {
      name: 'Model 1',
      apiKey: process.env.OPENROUTER_API_KEY_1 || '',
      model: process.env.OPENROUTER_MODEL_1 || 'nvidia/nemotron-3-nano-30b-a3b:free'
    },
    {
      name: 'Model 2',
      apiKey: process.env.OPENROUTER_API_KEY_2 || '',
      model: process.env.OPENROUTER_MODEL_2 || 'arcee-ai/trinity-mini:free'
    },
    {
      name: 'Model 3',
      apiKey: process.env.OPENROUTER_API_KEY_3 || '',
      model: process.env.OPENROUTER_MODEL_3 || 'qwen/qwen3-4b:free'
    },
    {
      name: 'Model 4',
      apiKey: process.env.OPENROUTER_API_KEY_4 || '',
      model: process.env.OPENROUTER_MODEL_4 || 'nvidia/nemotron-nano-9b-v2:free'
    },
    {
      name: 'Model 5',
      apiKey: process.env.OPENROUTER_API_KEY_5 || '',
      model: process.env.OPENROUTER_MODEL_5 || 'nvidia/nemotron-nano-12b-v2-vl:free'
    },
    {
      name: 'Model 6',
      apiKey: process.env.OPENROUTER_API_KEY_6 || '',
      model: process.env.OPENROUTER_MODEL_6 || 'google/gemini-2.0-flash-exp:free'
    },
    {
      name: 'Model 7',
      apiKey: process.env.OPENROUTER_API_KEY_7 || '',
      model: process.env.OPENROUTER_MODEL_7 || 'xiaomi/mimo-v2-flash:free'
    }
  ];

  private static statePath = path.join(process.cwd(), 'data', 'model-rotation.json');

  /**
   * Get the current rotation state from file
   */
  private static async getState(): Promise<RotationState> {
    try {
      const data = await fs.readFile(this.statePath, 'utf-8');
      return JSON.parse(data);
    } catch {
      // If file doesn't exist, start from index 0
      return { currentIndex: 0, lastUsed: new Date().toISOString() };
    }
  }

  /**
   * Save the rotation state to file
   */
  private static async saveState(state: RotationState): Promise<void> {
    await fs.mkdir(path.dirname(this.statePath), { recursive: true });
    await fs.writeFile(this.statePath, JSON.stringify(state, null, 2));
  }

  /**
   * Get the next model in rotation and update the state
   */
  static async getNextModel(): Promise<AIModel> {
    const state = await this.getState();

    // Get current model
    const currentModel = this.models[state.currentIndex];

    // Calculate next index (wrap around to 0 if at end)
    const nextIndex = (state.currentIndex + 1) % this.models.length;

    // Save new state
    await this.saveState({
      currentIndex: nextIndex,
      lastUsed: new Date().toISOString()
    });

    console.log(`[Model Rotation] Using: ${currentModel.name} (${currentModel.model})`);
    console.log(`[Model Rotation] Next will be: ${this.models[nextIndex].name}`);

    return currentModel;
  }

  /**
   * Get current model without rotating
   */
  static async getCurrentModel(): Promise<AIModel> {
    const state = await this.getState();
    return this.models[state.currentIndex];
  }

  /**
   * Reset rotation to start from index 0
   */
  static async reset(): Promise<void> {
    await this.saveState({
      currentIndex: 0,
      lastUsed: new Date().toISOString()
    });
    console.log('[Model Rotation] Reset to Model 1');
  }

  /**
   * Get all configured models
   */
  static getAllModels(): AIModel[] {
    return this.models;
  }
}
