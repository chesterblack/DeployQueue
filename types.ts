import { User } from "next-auth"

export type Status = 'waiting'|'ready'|'deploying'|'checking'|'complete';

export type DeployItem = {
  status?: Status,
  user?: User,
  timestamp: number,
  title: string,
  link: string,
  message: string,
}