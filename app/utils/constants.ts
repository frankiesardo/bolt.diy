import Cookies from 'js-cookie';
import type { ModelInfo } from './types';
import type { ProviderInfo, IProviderSetting } from '~/types/model';
import { createScopedLogger } from './logger';
import { logStore } from '~/lib/stores/logs';

export const WORK_DIR_NAME = 'project';
export const WORK_DIR = `/home/${WORK_DIR_NAME}`;
export const MODIFICATIONS_TAG_NAME = 'bolt_file_modifications';
export const MODEL_REGEX = /^\[Model: (.*?)\]\n\n/;
export const PROVIDER_REGEX = /\[Provider: (.*?)\]\n\n/;
export const DEFAULT_MODEL = 'anthropic:claude-3-5-sonnet-v2';
export const PROMPT_COOKIE_KEY = 'cachedPrompt';

const logger = createScopedLogger('Constants');

const PROVIDER_LIST: ProviderInfo[] = [
  {
    name: 'Anthropic',
    staticModels: [
      {
        name: 'anthropic:claude-3-5-sonnet',
        label: 'anthropic:claude-3-5-sonnet',
        provider: 'Anthropic',
        maxTokenAllowed: 8000,
      },
      {
        name: 'anthropic:claude-3-5-sonnet-20240620',
        label: 'anthropic:claude-3-5-sonnet-20240620',
        provider: 'Anthropic',
        maxTokenAllowed: 8000,
      },
      {
        name: 'anthropic:claude-3-5-sonnet-20241022',
        label: 'anthropic:claude-3-5-sonnet-20241022',
        provider: 'Anthropic',
        maxTokenAllowed: 8000,
      },
      {
        name: 'anthropic:claude-3-5-sonnet-v2',
        label: 'anthropic:claude-3-5-sonnet-v2',
        provider: 'Anthropic',
        maxTokenAllowed: 8000,
      },
      {
        name: 'anthropic:claude-3-5-sonnet-v2@20241022',
        label: 'anthropic:claude-3-5-sonnet-v2@20241022',
        provider: 'Anthropic',
        maxTokenAllowed: 8000,
      },
      {
        name: 'anthropic:claude-3-5-sonnet@20240620',
        label: 'anthropic:claude-3-5-sonnet@20240620',
        provider: 'Anthropic',
        maxTokenAllowed: 8000,
      },
      {
        name: 'anthropic:claude-3-haiku',
        label: 'anthropic:claude-3-haiku',
        provider: 'Anthropic',
        maxTokenAllowed: 8000,
      },
      {
        name: 'anthropic:claude-3-haiku-20240307',
        label: 'anthropic:claude-3-haiku-20240307',
        provider: 'Anthropic',
        maxTokenAllowed: 8000,
      },
      {
        name: 'anthropic:claude-3-haiku@20240307',
        label: 'anthropic:claude-3-haiku@20240307',
        provider: 'Anthropic',
        maxTokenAllowed: 8000,
      },
      {
        name: 'anthropic:claude-3-opus',
        label: 'anthropic:claude-3-opus',
        provider: 'Anthropic',
        maxTokenAllowed: 8000,
      },
      {
        name: 'anthropic:claude-3-opus-20240229',
        label: 'anthropic:claude-3-opus-20240229',
        provider: 'Anthropic',
        maxTokenAllowed: 8000,
      },
      {
        name: 'anthropic:claude-3-opus@20240229',
        label: 'anthropic:claude-3-opus@20240229',
        provider: 'Anthropic',
        maxTokenAllowed: 8000,
      },
    ],
  },
  {
    name: 'OpenAI',
    staticModels: [
      {
        name: 'default',
        label: 'default',
        provider: 'OpenAI',
        maxTokenAllowed: 4096,
      },
      {
        name: 'expensive-but-best',
        label: 'expensive-but-best',
        provider: 'OpenAI',
        maxTokenAllowed: 4096,
      },
      {
        name: 'fast',
        label: 'fast',
        provider: 'OpenAI',
        maxTokenAllowed: 4096,
      },
      {
        name: 'gpt-3.5-turbo',
        label: 'gpt-3.5-turbo',
        provider: 'OpenAI',
        maxTokenAllowed: 4096,
      },
      {
        name: 'gpt-3.5-turbo-0125',
        label: 'gpt-3.5-turbo-0125',
        provider: 'OpenAI',
        maxTokenAllowed: 4096,
      },
      {
        name: 'gpt-3.5-turbo-1106',
        label: 'gpt-3.5-turbo-1106',
        provider: 'OpenAI',
        maxTokenAllowed: 4096,
      },
      {
        name: 'gpt-3.5-turbo-instruct',
        label: 'gpt-3.5-turbo-instruct',
        provider: 'OpenAI',
        maxTokenAllowed: 4096,
      },
      {
        name: 'gpt-4',
        label: 'gpt-4',
        provider: 'OpenAI',
        maxTokenAllowed: 4096,
      },
      {
        name: 'gpt-4-0613',
        label: 'gpt-4-0613',
        provider: 'OpenAI',
        maxTokenAllowed: 4096,
      },
      {
        name: 'gpt-4-turbo',
        label: 'gpt-4-turbo',
        provider: 'OpenAI',
        maxTokenAllowed: 4096,
      },
      {
        name: 'gpt-4o',
        label: 'gpt-4o',
        provider: 'OpenAI',
        maxTokenAllowed: 4096,
      },
      {
        name: 'gpt-4o-2024-05-13',
        label: 'gpt-4o-2024-05-13',
        provider: 'OpenAI',
        maxTokenAllowed: 4096,
      },
      {
        name: 'gpt-4o-2024-08-06',
        label: 'gpt-4o-2024-08-06',
        provider: 'OpenAI',
        maxTokenAllowed: 4096,
      },
      {
        name: 'gpt-4o-2024-11-20',
        label: 'gpt-4o-2024-11-20',
        provider: 'OpenAI',
        maxTokenAllowed: 4096,
      },
      {
        name: 'gpt-4o-mini',
        label: 'gpt-4o-mini',
        provider: 'OpenAI',
        maxTokenAllowed: 4096,
      },
      {
        name: 'gpt-4o-mini-2024-07-18',
        label: 'gpt-4o-mini-2024-07-18',
        provider: 'OpenAI',
        maxTokenAllowed: 4096,
      },
      {
        name: 'o1-mini',
        label: 'o1-mini',
        provider: 'OpenAI',
        maxTokenAllowed: 4096,
      },
      {
        name: 'o1-preview',
        label: 'o1-preview',
        provider: 'OpenAI',
        maxTokenAllowed: 4096,
      },
      {
        name: 'openai:gpt-3.5-turbo',
        label: 'openai:gpt-3.5-turbo',
        provider: 'OpenAI',
        maxTokenAllowed: 4096,
      },
      {
        name: 'openai:gpt-3.5-turbo-0125',
        label: 'openai:gpt-3.5-turbo-0125',
        provider: 'OpenAI',
        maxTokenAllowed: 4096,
      },
      {
        name: 'openai:gpt-3.5-turbo-1106',
        label: 'openai:gpt-3.5-turbo-1106',
        provider: 'OpenAI',
        maxTokenAllowed: 4096,
      },
      {
        name: 'openai:gpt-3.5-turbo-instruct',
        label: 'openai:gpt-3.5-turbo-instruct',
        provider: 'OpenAI',
        maxTokenAllowed: 4096,
      },
      {
        name: 'openai:gpt-4',
        label: 'openai:gpt-4',
        provider: 'OpenAI',
        maxTokenAllowed: 4096,
      },
      {
        name: 'openai:gpt-4-0613',
        label: 'openai:gpt-4-0613',
        provider: 'OpenAI',
        maxTokenAllowed: 4096,
      },
      {
        name: 'openai:gpt-4-turbo',
        label: 'openai:gpt-4-turbo',
        provider: 'OpenAI',
        maxTokenAllowed: 4096,
      },
      {
        name: 'openai:gpt-4o',
        label: 'openai:gpt-4o',
        provider: 'OpenAI',
        maxTokenAllowed: 4096,
      },
      {
        name: 'openai:gpt-4o-2024-05-13',
        label: 'openai:gpt-4o-2024-05-13',
        provider: 'OpenAI',
        maxTokenAllowed: 4096,
      },
      {
        name: 'openai:gpt-4o-2024-08-06',
        label: 'openai:gpt-4o-2024-08-06',
        provider: 'OpenAI',
        maxTokenAllowed: 4096,
      },
      {
        name: 'openai:gpt-4o-2024-11-20',
        label: 'openai:gpt-4o-2024-11-20',
        provider: 'OpenAI',
        maxTokenAllowed: 4096,
      },
      {
        name: 'openai:gpt-4o-mini',
        label: 'openai:gpt-4o-mini',
        provider: 'OpenAI',
        maxTokenAllowed: 4096,
      },
      {
        name: 'openai:gpt-4o-mini-2024-07-18',
        label: 'openai:gpt-4o-mini-2024-07-18',
        provider: 'OpenAI',
        maxTokenAllowed: 4096,
      },
      {
        name: 'openai:o1-mini',
        label: 'openai:o1-mini',
        provider: 'OpenAI',
        maxTokenAllowed: 4096,
      },
      {
        name: 'openai:o1-preview',
        label: 'openai:o1-preview',
        provider: 'OpenAI',
        maxTokenAllowed: 4096,
      },
      {
        name: 'openai:text-embedding-3-large',
        label: 'openai:text-embedding-3-large',
        provider: 'OpenAI',
        maxTokenAllowed: 4096,
      },
      {
        name: 'openai:text-embedding-3-small',
        label: 'openai:text-embedding-3-small',
        provider: 'OpenAI',
        maxTokenAllowed: 4096,
      },
      {
        name: 'openai:text-embedding-ada-002',
        label: 'openai:text-embedding-ada-002',
        provider: 'OpenAI',
        maxTokenAllowed: 4096,
      },
      {
        name: 'text-embedding-3-large',
        label: 'text-embedding-3-large',
        provider: 'OpenAI',
        maxTokenAllowed: 4096,
      },
      {
        name: 'text-embedding-3-small',
        label: 'text-embedding-3-small',
        provider: 'OpenAI',
        maxTokenAllowed: 4096,
      },
      {
        name: 'text-embedding-ada-002',
        label: 'text-embedding-ada-002',
        provider: 'OpenAI',
        maxTokenAllowed: 4096,
      },
    ],
  },
  {
    name: 'Google',
    staticModels: [
      {
        name: 'google:gemini-1.5-flash',
        label: 'google:gemini-1.5-flash',
        provider: 'Google',
        maxTokenAllowed: 8000,
      },
      {
        name: 'google:gemini-1.5-flash-001',
        label: 'google:gemini-1.5-flash-001',
        provider: 'Google',
        maxTokenAllowed: 8000,
      },
      {
        name: 'google:gemini-1.5-pro',
        label: 'google:gemini-1.5-pro',
        provider: 'Google',
        maxTokenAllowed: 8000,
      },
      {
        name: 'google:gemini-1.5-pro-001',
        label: 'google:gemini-1.5-pro-001',
        provider: 'Google',
        maxTokenAllowed: 8000,
      },
    ],
  },
  {
    name: 'Groq',
    staticModels: [
      {
        name: 'groq:llama3-70b',
        label: 'groq:llama3-70b',
        provider: 'Groq',
        maxTokenAllowed: 8000,
      },
    ],
  },
];

export const providerBaseUrlEnvKeys: Record<string, { baseUrlKey?: string; apiTokenKey?: string }> = {
  Anthropic: {
    apiTokenKey: 'ANTHROPIC_API_KEY',
  },
  OpenAI: {
    apiTokenKey: 'OPENAI_API_KEY',
  },
  Groq: {
    apiTokenKey: 'GROQ_API_KEY',
  },
  HuggingFace: {
    apiTokenKey: 'HuggingFace_API_KEY',
  },
  OpenRouter: {
    apiTokenKey: 'OPEN_ROUTER_API_KEY',
  },
  Google: {
    apiTokenKey: 'GOOGLE_GENERATIVE_AI_API_KEY',
  },
  OpenAILike: {
    baseUrlKey: 'OPENAI_LIKE_API_BASE_URL',
    apiTokenKey: 'OPENAI_LIKE_API_KEY',
  },
  Together: {
    baseUrlKey: 'TOGETHER_API_BASE_URL',
    apiTokenKey: 'TOGETHER_API_KEY',
  },
  Deepseek: {
    apiTokenKey: 'DEEPSEEK_API_KEY',
  },
  Mistral: {
    apiTokenKey: 'MISTRAL_API_KEY',
  },
  LMStudio: {
    baseUrlKey: 'LMSTUDIO_API_BASE_URL',
  },
  xAI: {
    apiTokenKey: 'XAI_API_KEY',
  },
  Cohere: {
    apiTokenKey: 'COHERE_API_KEY',
  },
  Perplexity: {
    apiTokenKey: 'PERPLEXITY_API_KEY',
  },
  Ollama: {
    baseUrlKey: 'OLLAMA_API_BASE_URL',
  },
};

export const getProviderBaseUrlAndKey = (options: {
  provider: string;
  apiKeys?: Record<string, string>;
  providerSettings?: IProviderSetting;
  serverEnv?: Record<string, string>;
  defaultBaseUrlKey: string;
  defaultApiTokenKey: string;
}) => {
  const { provider, apiKeys, providerSettings, serverEnv, defaultBaseUrlKey, defaultApiTokenKey } = options;
  let settingsBaseUrl = providerSettings?.baseUrl;

  if (settingsBaseUrl && settingsBaseUrl.length == 0) {
    settingsBaseUrl = undefined;
  }

  const baseUrlKey = providerBaseUrlEnvKeys[provider]?.baseUrlKey || defaultBaseUrlKey;
  const baseUrl = settingsBaseUrl || serverEnv?.[baseUrlKey] || process.env[baseUrlKey] || import.meta.env[baseUrlKey];

  const apiTokenKey = providerBaseUrlEnvKeys[provider]?.apiTokenKey || defaultApiTokenKey;
  const apiKey =
    apiKeys?.[provider] || serverEnv?.[apiTokenKey] || process.env[apiTokenKey] || import.meta.env[apiTokenKey];

  return {
    baseUrl,
    apiKey,
  };
};
export const DEFAULT_PROVIDER = PROVIDER_LIST[0];

const staticModels: ModelInfo[] = PROVIDER_LIST.map((p) => p.staticModels).flat();

export let MODEL_LIST: ModelInfo[] = [...staticModels];

export async function getModelList(options: {
  apiKeys?: Record<string, string>;
  providerSettings?: Record<string, IProviderSetting>;
  serverEnv?: Record<string, string>;
}) {
  const { apiKeys, providerSettings, serverEnv } = options;

  MODEL_LIST = [
    ...(
      await Promise.all(
        PROVIDER_LIST.filter(
          (p): p is ProviderInfo & { getDynamicModels: () => Promise<ModelInfo[]> } => !!p.getDynamicModels,
        ).map((p) => p.getDynamicModels(p.name, apiKeys, providerSettings?.[p.name], serverEnv)),
      )
    ).flat(),
    ...staticModels,
  ];

  return MODEL_LIST;
}

async function initializeModelList(options: {
  env?: Record<string, string>;
  providerSettings?: Record<string, IProviderSetting>;
  apiKeys?: Record<string, string>;
}): Promise<ModelInfo[]> {
  const { providerSettings, apiKeys: providedApiKeys, env } = options;
  let apiKeys: Record<string, string> = providedApiKeys || {};

  if (!providedApiKeys) {
    try {
      const storedApiKeys = Cookies.get('apiKeys');

      if (storedApiKeys) {
        const parsedKeys = JSON.parse(storedApiKeys);

        if (typeof parsedKeys === 'object' && parsedKeys !== null) {
          apiKeys = parsedKeys;
        }
      }
    } catch (error: any) {
      logStore.logError('Failed to fetch API keys from cookies', error);
      logger.warn(`Failed to fetch apikeys from cookies: ${error?.message}`);
    }
  }

  MODEL_LIST = [
    ...(
      await Promise.all(
        PROVIDER_LIST.filter(
          (p): p is ProviderInfo & { getDynamicModels: () => Promise<ModelInfo[]> } => !!p.getDynamicModels,
        ).map((p) => p.getDynamicModels(p.name, apiKeys, providerSettings?.[p.name], env)),
      )
    ).flat(),
    ...staticModels,
  ];

  return MODEL_LIST;
}

// initializeModelList({})
export { initializeModelList, PROVIDER_LIST };
