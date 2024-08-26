import { APIRequestContext } from "playwright";

export type GenericApiClientConstructor<T> = { new(apiRequestContext: APIRequestContext): T };