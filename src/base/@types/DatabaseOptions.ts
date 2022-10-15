export interface DatabaseOptions {
    name: string,
    path: string,
    adapter: DatabaseTypes | number
};

export enum DatabaseTypes {
    JSON = 0,
    YAML = 1
};