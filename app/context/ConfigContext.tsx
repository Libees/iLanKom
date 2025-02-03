import { createContext } from "react";

export const config: IConfig = {
    ip: '',
    auth: ''
}
export const ConfigContext = createContext<{ config: IConfig, setConfig: React.Dispatch<React.SetStateAction<IConfig>> } | null>(null)