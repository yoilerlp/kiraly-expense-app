import { User } from "./user"

export type PushToken = {
    id: string
    token: string
    deviceInfo?: string | null
    user?: User | null
    createdAt: string
}