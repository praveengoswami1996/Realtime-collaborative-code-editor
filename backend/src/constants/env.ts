const getEnv = (key: string, defaultValue?: string) => {
    const value = process.env[key] || defaultValue;

    if(value === undefined) {
        throw Error(`Missing value for environment variable ${key}`);
    }

    return value;
}

export const NODE_ENV = getEnv("NODE_ENV", "development");
export const PORT = getEnv("PORT", "4004");
export const APP_ORIGIN = getEnv("APP_ORIGIN")
export const MONGO_URI = getEnv("MONGO_URI");
