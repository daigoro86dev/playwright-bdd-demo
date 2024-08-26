import { Page } from "playwright";

export type GenericPageConstructor<T> = { new(page: Page): T };
