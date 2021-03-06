interface ScriptLoaderOpts {
  src: string;
  callback?: Function;
  error?: Function;
  beforeCreateScript?: (script: HTMLScriptElement) => void;
  async?: boolean;
  cache?: boolean;
}

const STATUS_LOADING = 0;

const STATUS_LOADED = 1;

const STATUS_ERROR = 2;

const cache: {
  [key: string]: {
    status: number;
    callbacks: Function[];
    errors: Function[];
  };
} = {};

export default function scriptLoader(opts: ScriptLoaderOpts): void {
  const option = {
    async: true,
    cache: true,
    callback: (): void => {
      // empty
    },
    error: (): void => {
      // empty
    },
    ...opts,
  };
  const doc = document;
  const scriptCache = cache[option.src];
  if (option.cache && scriptCache) {
    switch (scriptCache.status) {
      case STATUS_LOADING:
        scriptCache.callbacks.push(option.callback);
        scriptCache.errors.push(option.error);
        break;
      case STATUS_LOADED:
        option.callback();
        break;
      case STATUS_ERROR:
        option.error();
        break;
      default:
        break;
    }
    return;
  }

  const cacheItem = {
    callbacks: [option.callback],
    errors: [option.error],
    status: STATUS_LOADING,
  };

  if (option.cache) {
    cache[option.src] = cacheItem;
  }

  const head = doc.head || doc.getElementsByClassName('head')[0] || doc.documentElement;
  const script = doc.createElement('script');
  script.onload = (): void => {
    cacheItem.status = STATUS_LOADED;
    cacheItem.callbacks.forEach((callback) => {
      callback();
    });
  };
  script.onerror = (): void => {
    cacheItem.status = STATUS_ERROR;
    cacheItem.errors.forEach((error) => {
      error();
    });
  };
  script.async = option.async;
  script.src = option.src;
  if (option.beforeCreateScript) {
    option.beforeCreateScript(script);
  }
  head.appendChild(script);
}
